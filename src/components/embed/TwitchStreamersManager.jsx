import { useStore } from "@nanostores/react";
import { STREAMERS } from "src/stores/menuFiltradoAdmin";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const actualizarStreamers = async (updatedStreamers) => {
  const url = "https://guiadeparche.com/tftdata/Set12/constantes.php";
  const token = import.meta.env.PUBLIC_TOKEN_META;

  const bodyData = {
    key: "Streamers", // Clave que queremos actualizar en el JSON
    value: updatedStreamers, // Enviamos el array de streamers actualizado
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();
    alert("Streamers actualizado correctamente");
    STREAMERS.set(updatedStreamers); // Actualiza en nanostores
  } catch (error) {
    console.error("Error actualizando streamers:", error);
    alert("Hubo un error al actualizar los streamers.");
  }
};

const TwitchStreamersManager = () => {
  const streamers = useStore(STREAMERS);
  const [updatedStreamers, setUpdatedStreamers] = useState([...streamers]);
  const [newStreamer, setNewStreamer] = useState("");

  // Mover elementos en el array después de un drag & drop
  const onDragEnd = (result) => {
    if (!result.destination) return; // Si no se soltó en una posición válida, no hacer nada

    const reorderedStreamers = Array.from(updatedStreamers);
    const [movedStreamer] = reorderedStreamers.splice(result.source.index, 1);
    reorderedStreamers.splice(result.destination.index, 0, movedStreamer);

    setUpdatedStreamers(reorderedStreamers);
  };

  // Agregar streamer
  const addStreamer = () => {
    if (!newStreamer.trim() || updatedStreamers.includes(newStreamer)) return;
    setUpdatedStreamers([...updatedStreamers, newStreamer]);
    setNewStreamer("");
  };

  // Eliminar streamer
  const removeStreamer = (streamerToRemove) => {
    setUpdatedStreamers(updatedStreamers.filter((s) => s !== streamerToRemove));
  };

  // Guardar cambios en el backend
  const saveChanges = async () => {
    await actualizarStreamers(updatedStreamers);
  };

  return (
    <div className="container">
      <h2>Administrar Streamers</h2>

      {/* Input para agregar streamers */}
      <div className="input-group">
        <input
          type="text"
          value={newStreamer}
          onChange={(e) => setNewStreamer(e.target.value)}
          placeholder="Agregar nuevo streamer"
        />
        <button onClick={addStreamer}>Agregar</button>
      </div>

      {/* Drag & Drop List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="streamersList">
          {(provided) => (
            <ul
              className="streamers-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {updatedStreamers.map((streamer, index) => (
                <Draggable key={streamer} draggableId={streamer} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="streamer-item"
                    >
                      <span className="drag-handle">☰</span>
                      {streamer}
                      <button onClick={() => removeStreamer(streamer)}>❌</button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {/* Botón para guardar cambios */}
      <button onClick={saveChanges} className="save-button">Guardar Cambios</button>

      <style>{`
        .container {
          width: 300px;
          margin: auto;
          padding: 10px;
          text-align: center;
        }
        .input-group {
          display: flex;
          gap: 5px;
          margin-bottom: 10px;
        }
        .streamers-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .streamer-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          margin-bottom: 5px;
          background: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 5px;
          cursor: grab;
          color: black;
        }
        .drag-handle {
          cursor: grab;
          margin-right: 10px;
        }
        .save-button {
          margin-top: 10px;
          padding: 8px;
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .save-button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default TwitchStreamersManager;
