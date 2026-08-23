import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CampeonImgInTierList from "@components/TFT/meta/CampeonImgInTierList.jsx";
import { crearCompoMetaPHP } from "src/stores/dataTFT.js";
import { versionTFT } from "src/stores/dataTFT.js";
import style from "./css/DragDropTierListEditor.module.css";
import { useStore } from "@nanostores/react";

const TIERS = ["S", "A", "B", "C", "D", "MEME"];

const DragDropTierListEditor = ({ comps = [] }) => {
  const currentVersion = useStore(versionTFT);
  const [data, setData] = useState({ items: {}, columns: {} });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Inicializar los datos del drag and drop
    const items = {};
    const columns = {};

    TIERS.forEach(tier => {
      columns[tier] = {
        id: tier,
        title: `Tier ${tier}`,
        compIds: []
      };
    });

    // Añadir comps a los items y a sus respectivas columnas
    const sortedComps = [...comps].sort((a, b) => (a.posicion || 0) - (b.posicion || 0));
    
    sortedComps.forEach(comp => {
      const tier = comp.tier || "B"; // Fallback a B si no tiene tier
      const compIdStr = String(comp.id);
      
      items[compIdStr] = { ...comp, id: compIdStr };
      
      if (!columns[tier]) {
        columns[tier] = { id: tier, title: `Tier ${tier}`, compIds: [] };
      }
      columns[tier].compIds.push(compIdStr);
    });

    setData({ items, columns });
    setHasChanges(false);
  }, [comps]);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];

    if (sourceColumn === destColumn) {
      // Reordenar en el mismo tier
      const newCompIds = Array.from(sourceColumn.compIds);
      newCompIds.splice(source.index, 1);
      newCompIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        compIds: newCompIds
      };

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn
        }
      }));
    } else {
      // Mover entre tiers
      const sourceCompIds = Array.from(sourceColumn.compIds);
      sourceCompIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        compIds: sourceCompIds
      };

      const destCompIds = Array.from(destColumn.compIds);
      destCompIds.splice(destination.index, 0, draggableId);
      const newDestColumn = {
        ...destColumn,
        compIds: destCompIds
      };

      setData(prev => ({
        ...prev,
        items: {
          ...prev.items,
          [draggableId]: {
            ...prev.items[draggableId],
            tier: destColumn.id
          }
        },
        columns: {
          ...prev.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestColumn.id]: newDestColumn
        }
      }));
    }
    
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const token = import.meta.env.PUBLIC_TOKEN_META;
    
    // Obtener todas las composiciones actualizadas con sus nuevas posiciones
    const updatedComps = [];
    
    Object.keys(data.columns).forEach(tierId => {
      const column = data.columns[tierId];
      column.compIds.forEach((compId, index) => {
        const item = data.items[compId];
        // Solo añadir si cambió de tier o de posición
        const originalComp = comps.find(c => String(c.id) === String(compId));
        
        if (!originalComp || originalComp.tier !== item.tier || originalComp.posicion !== index) {
           updatedComps.push({
             ...item,
             tier: tierId,
             posicion: index
           });
        }
      });
    });

    if (updatedComps.length === 0) {
      alert("No hay cambios que guardar.");
      setIsSaving(false);
      setHasChanges(false);
      return;
    }

    try {
      // Importar set numbers desde dataTFT.js
      const { setNumberLatest, setNumberPBE } = await import("src/stores/dataTFT.js");
      
      // Se envían secuencialmente para evitar posibles problemas de concurrencia al leer/escribir el JSON
      for (const comp of updatedComps) {
        const bodyData = {
          ...comp,
          set_number: currentVersion === "latest" ? setNumberLatest : setNumberPBE
        };
        
        const response = await fetch("https://api.guiadeparche.com/tft/composicionesBD.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(bodyData)
        });
        
        const result = await response.json();
        if (result.status !== "success") {
          console.error(`Error guardando comp ${comp.id}:`, result.message);
        }
      }
      
      alert(`¡Se han guardado ${updatedComps.length} composiciones correctamente!`);
      setHasChanges(false);
      
      // Forzar recarga de los datos si es necesario
      try {
        const { fetchAndSortComps, composMetaPBEJSON, composMetaJSON } = await import("src/stores/dataTFT.js");
        await fetchAndSortComps(currentVersion === "pbe" ? composMetaPBEJSON : composMetaJSON);
      } catch(e) {
        console.error("Error recargando la store:", e);
      }
      
    } catch (error) {
      console.error("Error al guardar las composiciones:", error);
      alert("Error al guardar cambios. Revisa la consola.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={style.tierListContainer}>
      <div className={style.saveButtonContainer}>
        <button 
          className={style.saveButton} 
          onClick={handleSave} 
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {TIERS.map(tier => {
          const column = data.columns[tier];
          if (!column) return null;
          
          return (
            <Droppable droppableId={column.id} key={column.id} direction="horizontal">
              {(provided, snapshot) => (
                <div 
                  className={`${style.tierInfo} ${style[`tierCard${column.id}`] || ''} ${snapshot.isDraggingOver ? style.isDraggingOver : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className={style.tierHeader}>
                    <div className={style.containerTierText}>
                      <span className={`${style.tierNumber} ${style[`tierNumber${column.id}`] || ''}`}>
                        {column.id}
                      </span>
                    </div>
                  </h3>
                  
                  <div className={style.containerChampsTier}>
                    {column.compIds.map((compId, index) => {
                      const comp = data.items[compId];
                      return (
                        <Draggable draggableId={compId} index={index} key={compId}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${style.draggableItem} ${snapshot.isDragging ? style.isDragging : ''}`}
                              style={{
                                ...provided.draggableProps.style,
                                ...(snapshot.isDragging ? {
                                  zIndex: 99999,
                                  transform: provided.draggableProps.style?.transform 
                                    ? `${provided.draggableProps.style.transform} scale(1.1)`
                                    : 'scale(1.1)'
                                } : {})
                              }}
                            >
                              <CampeonImgInTierList
                                id={comp.id}
                                apiNameCampeon={comp?.campeonMeta?.apiNameCampeon}
                                apiNameItems={comp?.campeonMeta?.apiNameItemsDelCampeon}
                                estrellas={comp?.campeonMeta?.estrellas}
                                aumento={comp?.campeonMeta?.aumento}
                                emblema={comp?.campeonMeta?.emblema}
                                compUrl={comp.urlSEO}
                                isDraggable={true}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default DragDropTierListEditor;
