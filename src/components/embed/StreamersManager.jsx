import { useStore } from "@nanostores/react";
import { STREAMERS } from "src/stores/menuFiltradoAdmin";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { constantesPHP } from "@stores/dataTFT";

const actualizarStreamers = async (updatedStreamers) => {
  const url = constantesPHP;
  const token = import.meta.env.PUBLIC_TOKEN_META;

  const bodyData = {
    key: "Streamers",
    value: updatedStreamers,
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

const StreamersManager = () => {
  const streamers = useStore(STREAMERS);
  const [updatedStreamers, setUpdatedStreamers] = useState([...streamers]);
  const [newStreamerName, setNewStreamerName] = useState("");
  const [newStreamerPlatform, setNewStreamerPlatform] = useState("twitch");

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedStreamers = Array.from(updatedStreamers);
    const [movedStreamer] = reorderedStreamers.splice(result.source.index, 1);
    reorderedStreamers.splice(result.destination.index, 0, movedStreamer);

    setUpdatedStreamers(reorderedStreamers);
  };

  const addStreamer = () => {
    const newStreamer = {
      name: newStreamerName.trim(),
      platform: newStreamerPlatform,
    };

    if (!newStreamer.name || updatedStreamers.some(s => s.name === newStreamer.name && s.platform === newStreamer.platform)) return;

    setUpdatedStreamers([...updatedStreamers, newStreamer]);
    setNewStreamerName("");
    setNewStreamerPlatform("twitch");
  };

  const removeStreamer = (streamerToRemove) => {
    setUpdatedStreamers(updatedStreamers.filter((s) => s !== streamerToRemove));
  };

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
          value={newStreamerName}
          onChange={(e) => setNewStreamerName(e.target.value)}
          placeholder="Nombre del streamer"
        />
        <select
          value={newStreamerPlatform}
          onChange={(e) => setNewStreamerPlatform(e.target.value)}
        >
          <option value="twitch">Twitch</option>
          <option value="kick">Kick</option>
        </select>
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
                <Draggable
                  key={`${streamer.name}-${streamer.platform}`}
                  draggableId={`${streamer.name}-${streamer.platform}`}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="streamer-item"
                    >
                      <span className="drag-handle">☰</span>
                      {streamer.name} ({streamer.platform})
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

export default StreamersManager;
