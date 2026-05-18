import React, { useState } from "react";
import style from "../main/Admin/css/Builder.module.css";
import {findTraitsStyles, dataTFTTraits} from "@stores/dataTFT";
import {traitsColors} from "@functions/campeonestft.js";
import ContextMenuBuilderNew from "./ContextMenuBuilderNew.jsx";
// Reuse builder styles or a newly created css if needed, for now we will reuse Admin/css/Builder.module.css

const championsColor = [
  "var(--color-hex-cost-default)",
  "var(--color-hex-cost-1)",
  "var(--color-hex-cost-2)",
  "var(--color-hex-cost-3)",
  "var(--color-hex-cost-4)",
  "var(--color-hex-cost-5)",
  "var(--color-hex-cost-6)",
];

const NuevoBuilderTFT = ({ composicionTFT, setComposicionTFT, campoBuilder }) => {
  const [draggedHex, setDraggedHex] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const version = "latest";
  // composicionTFT[campoBuilder] holds an object: { [hexIndex]: championData }
  const boardData = composicionTFT[campoBuilder] || {};
  const synergiesCount  = {};
  Object.values(boardData).forEach((champion) => {
    const collectedTraits = new Set();
    champion.traits.forEach((trait) => {
      collectedTraits.add(trait.apiName);
      const currentCount = synergiesCount[trait.apiName]?.count || 0;
      synergiesCount[trait.apiName] = {count: currentCount + 1, icon: trait.icon};
    });
    if (champion.items) {
      champion.items.forEach((item) => {
        if (item.traitExtra && !collectedTraits.has(item.traitExtra.apiName)) {
          collectedTraits.add(item.traitExtra.apiName);
          const currentCount = synergiesCount[item.traitExtra.apiName]?.count || 0;
          synergiesCount[item.traitExtra.apiName] = {count: currentCount + 1, icon: item.traitExtra.icon};
        }
      });
    }
  });

  const getLimit = () => {
    if (campoBuilder.includes("Lv4")) return 4;
    if (campoBuilder.includes("Lv5")) return 5;
    if (campoBuilder.includes("Lv6")) return 6;
    return 28; // default max
  };

  const handleDrop = (e, hexIndex) => {
    e.preventDefault();
    const dataCampeonRaw = e.dataTransfer.getData("campeon");
    const dataItemRaw = e.dataTransfer.getData("item");
    const itemMoveRaw = e.dataTransfer.getData("itemMove");
    const fromHexIndexItem = e.dataTransfer.getData("fromHexIndexItem");
    const fromItemIndex = e.dataTransfer.getData("fromItemIndex");
    const fromHexIndex = e.dataTransfer.getData("hexIndex");
    const isFromBoard = fromHexIndex !== "" && fromHexIndex !== null && fromHexIndex !== undefined;

    const newBoard = { ...boardData };

    if (itemMoveRaw) {
      const itemMove = JSON.parse(itemMoveRaw);
      // Validar que el drop es en un hexagono con un campeón y que tenga espacio
      if (newBoard[hexIndex] && newBoard[hexIndex].items.length < 3) {
         if (fromHexIndexItem !== hexIndex.toString()) {
            newBoard[fromHexIndexItem].items.splice(fromItemIndex, 1);
            newBoard[hexIndex].items.push(itemMove);
            setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
         }
      } else if (!newBoard[hexIndex]) {
         // Si se suelta en un hex vacío, se elimina el item
         newBoard[fromHexIndexItem].items.splice(fromItemIndex, 1);
         setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
      }
      return;
    }

    if (dataItemRaw) {
      // Adding an item to an existing champion
      const item = JSON.parse(dataItemRaw);
      if (newBoard[hexIndex] && newBoard[hexIndex].items.length < 3) {
        // Verify we are not dragging item from the board itself unless we handle swapItem
        // The prompt says "apiname de los items (maximo 3 items permitidos se pueden agregar en 1 solo campeon)"
        const itemImageUrl = item.icon.startsWith("http")
          ? item.icon.replace(".tex", ".png").toLowerCase()
          : "https://raw.communitydragon.org/latest/game/" + item.icon.replace(".tex", ".png").toLowerCase();
        
        let traitExtra = null;
        if (item.incompatibleTraits && item.incompatibleTraits.length > 0) {
          const globalTraits = dataTFTTraits.get();
          traitExtra = globalTraits.find((t) => t.apiName === item.incompatibleTraits[0]);
        }

        newBoard[hexIndex] = {
          ...newBoard[hexIndex],
          items: [...newBoard[hexIndex].items, { 
            apiName: item.apiName || item.name, 
            imagen: itemImageUrl,
            traitExtra
          }]
        };
        setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
      }
      return;
    }

    if (dataCampeonRaw) {
      const campeon = JSON.parse(dataCampeonRaw);
      const isOccupied = !!newBoard[hexIndex];
      const targetChampion = newBoard[hexIndex];
      console.log({ campeon })

      const newChampionData = {
        apiName: campeon.apiName,
        nombre: campeon.nombre || campeon.name,
        imagen: campeon.img || campeon.icon,
        coste: campeon.coste || campeon.cost || 0,
        traits: (campeon.traits || campeon.sinergia || []).map(trait => {
          const { effects, desc, ...rest } = trait;
          return rest;
        }),
        items: [],
        estrellas: 1, // default 1 star
        hexagono: hexIndex,
        extraSynergy: null // default null
      };

      if (isFromBoard) {
        // Dragging from another hex
        if (fromHexIndex === hexIndex.toString()) return; // dropped on same hex

        const sourceChampion = newBoard[fromHexIndex];

        if (isOccupied) {
          // Swap
          newBoard[hexIndex] = { ...sourceChampion, hexagono: hexIndex };
          newBoard[fromHexIndex] = { ...targetChampion, hexagono: fromHexIndex };
        } else {
          // Move
          newBoard[hexIndex] = { ...sourceChampion, hexagono: hexIndex };
          delete newBoard[fromHexIndex];
        }
      } else {
        // Dragging from outside
        if (isOccupied) {
          alert("El hexágono ya está ocupado. No puedes colocar un campeón aquí desde afuera.");
          return;
        }

        const currentCount = Object.keys(newBoard).length;
        if (currentCount >= getLimit()) {
          alert(`Solo puedes añadir un máximo de ${getLimit()} campeones en ${campoBuilder}.`);
          return;
        }

        newBoard[hexIndex] = newChampionData;
      }

      setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
    }
  };

  const handleDragStartChampion = (e, hexIndex, campeon) => {
    e.stopPropagation();
    e.dataTransfer.setData("campeon", JSON.stringify(campeon));
    e.dataTransfer.setData("hexIndex", hexIndex);
  };

  const handleDragEndChampion = (e, hexIndex) => {
    e.stopPropagation();
    // Identificamos en qué elemento se soltó el mouse
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    // Si no se soltó en un contenedor válido (un hexágono), lo eliminamos
    if (!dropTarget || !dropTarget.closest(`.${style.containerPoligon}`)) {
      const newBoard = { ...boardData };
      delete newBoard[hexIndex];
      setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
    }
  };

  const handleDragStartItem = (e, hexIndex, itemIndex, item) => {
    e.stopPropagation();
    e.dataTransfer.setData("itemMove", JSON.stringify(item));
    e.dataTransfer.setData("fromHexIndexItem", hexIndex);
    e.dataTransfer.setData("fromItemIndex", itemIndex);
  };

  const handleDragEndItem = (e, fromHexIndex, itemIndex) => {
    e.stopPropagation();
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    // Si no se soltó sobre un contenedor válido, se elimina
    if (!dropTarget || !dropTarget.closest(`.${style.containerPoligon}`)) {
      const newBoard = { ...boardData };
      if (newBoard[fromHexIndex] && newBoard[fromHexIndex].items[itemIndex]) {
        newBoard[fromHexIndex].items.splice(itemIndex, 1);
        setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
      }
    }
  };

  const handleContextMenu = (e, hexIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(activeMenu === hexIndex ? null : hexIndex);
  };

  const handleRemoveItem = (hexIndex, itemIndex) => {
    const newBoard = { ...boardData };
    newBoard[hexIndex].items.splice(itemIndex, 1);
    setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
  };

  function findClosestTraitImage(traitType, traitLevel) {
      // Primero intentamos obtener los estilos dinámicamente desde la data de TFT
      const dynamicStyles = findTraitsStyles(traitType);
      if (Object.keys(dynamicStyles).length > 0) {
        const thresholds = Object.keys(dynamicStyles)
          .map(Number)
          .sort((a, b) => b - a);
        for (const threshold of thresholds) {
          if (traitLevel >= threshold) {
            return dynamicStyles[threshold];
          }
        }
      }
  
      // Si no se encuentra en la data dinámica, usamos el mapeo manual (fallback)
      if(traitType === "BlackRose"){
        traitType = "Black Rose"
      }
      if(traitType === "FormSwapper"){
        traitType = "Form Swapper"
      }
      if(traitType === "HighRoller"){
        traitType = "High Roller"
      }
      if(traitType === "JunkerKing"){
        traitType = "Junker King"
      }
      if(traitType === "PitFighter"){
        traitType = "Pit Fighter"
      }
      if (traitsColors[traitType]) {
        const traitLevels = Object.keys(traitsColors[traitType])
          .map(Number)
          .sort((a, b) => a - b);
        for (let i = traitLevels.length - 1; i >= 0; i--) {
          if (traitLevel >= traitLevels[i]) {
            return traitsColors[traitType][traitLevels[i]];
          }
        }
        // Retornar una imagen por defecto si el traitLevel es menor que todos los disponibles
      }
      return "hex-default.webp";
    }

  const renderHexagons = () => {
    const hexes = [];
    const numberOfHexes = getLimit();

    let rows = [];
    if (numberOfHexes === 28) {
      // 4 rows of 7 hexes
      rows = [
        [11, 12, 13, 14, 15, 16, 17],
        [21, 22, 23, 24, 25, 26, 27],
        [31, 32, 33, 34, 35, 36, 37],
        [41, 42, 43, 44, 45, 46, 47]
      ];
    } else {
      // Create a single row for limits < 28
      const singleRow = [];
      for (let i = 1; i <= numberOfHexes; i++) {
        singleRow.push(10 + i);
      }
      rows = [singleRow];
    }

    rows.forEach((row, rowIndex) => {
      const hexRow = (
        <div key={`row-${rowIndex}`} className={style.hexRow}>
          {/* Offset for even rows can be handled via CSS or adding empty half polygons */}
          {rowIndex % 2 !== 0 && <div className={style.halfPoligon}></div>}

          {row.map(hexIndex => {
            const champion = boardData[hexIndex];
            const hexColor = champion ? championsColor[champion.coste] || championsColor[0] : championsColor[0];

            return (
              <div
                key={hexIndex}
                className={style.containerPoligon}
                onDrop={(e) => handleDrop(e, hexIndex)}
                onDragOver={(e) => e.preventDefault()}
                onContextMenu={(e) => handleContextMenu(e, hexIndex)}
              >
                <div className={style.poligon} style={{ backgroundColor: hexColor }}></div>

                {champion && (
                  <div
                    draggable
                    onDragStart={(e) => handleDragStartChampion(e, hexIndex, champion)}
                    onDragEnd={(e) => handleDragEndChampion(e, hexIndex)}
                    className={`${style.containerImageChampion} ${champion.estrellas === 4 ? style.estrellas4 : champion.estrellas === 3 ? style.estrellas3 : champion.estrellas === 2 ? style.estrellas2 : champion.estrellas === 1 ? style.estrellas1 : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === hexIndex ? null : hexIndex);
                    }}
                  >
                    <div className={style.containerSinergias}>
                      {champion.traits && champion.traits.map((syn, idx) => {
                        
                        const count = synergiesCount[syn.apiName]?.count || 1;
                        const traitSVG = findClosestTraitImage(syn.apiName.replace(" ", ""), count);
                        const iconUrl = syn.icon.startsWith("http")
                          ? syn.icon.toLowerCase().replace(".tex", ".png")
                          : `https://raw.communitydragon.org/${version}/game/` + syn.icon.toLowerCase().replace(".tex", ".png");

                        return (
                          <div key={idx} className={style.containerTrait}>
                            <img className={`${style.backgroundSinergia} ${syn.apiName.replace(" ", "")}`} src={`/hexagonos/${traitSVG}`} alt="hex" />
                            <img className={style.sinergia} src={iconUrl} alt={syn.name}/>
                          </div>
                        );
                      })}
                    </div>

                    <img className={style.imageCampeonBuilder} src={champion.imagen} alt={champion.nombre} />

                    <span className={style.nombreCampeon}>{champion.nombre}</span>

                    {champion.extraSynergy && (
                      <div className={style.containerSinergias}>
                        <div className={style.containerTrait} style={{ backgroundColor: "purple", color: "white", fontSize: "10px", borderRadius: "50%" }}>
                          S
                        </div>
                      </div>
                    )}

                    <div className={style.containerItems}>
                      {champion.items.map((item, i) => (
                        <div 
                          key={i} 
                          draggable
                          onDragStart={(e) => handleDragStartItem(e, hexIndex, i, item)}
                          onDragEnd={(e) => handleDragEndItem(e, hexIndex, i)}
                          className={style.containerItem} 
                          onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveItem(hexIndex, i); }}
                        >
                          <img className={style.imgItem} src={item.imagen} alt={item.apiName} />
                        </div>
                      ))}
                    </div>

                    {activeMenu === hexIndex && (
                      <ContextMenuBuilderNew
                        hexIndex={hexIndex}
                        boardData={boardData}
                        composicionTFT={composicionTFT}
                        setComposicionTFT={setComposicionTFT}
                        campoBuilder={campoBuilder}
                        setActiveMenu={setActiveMenu}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {rowIndex % 2 === 0 && <div className={style.halfPoligon}></div>}
        </div>
      );
      hexes.push(hexRow);
    });

    return hexes;
  };

  const renderTraits = () => {
    // evaluar primero si hay sinergias activas, si no, no renderizar
    
    return (
      <div className={style.containerTraitsShow}>
        {Object.keys(synergiesCount).map((trait, idx) => {
          const count = synergiesCount[trait].count || 1;
          console.log({trait})
          const traitSVG = findClosestTraitImage(trait.replace(" ", ""), count);
          console.log({traitSVG})
          if (traitSVG === "hex-default.webp") return null;
           const iconUrl = synergiesCount[trait]?.icon.startsWith("http")
              ? synergiesCount[trait]?.icon.toLowerCase().replace(".tex", ".png")
              : `https://raw.communitydragon.org/${version}/game/` + synergiesCount[trait]?.icon.toLowerCase().replace(".tex", ".png");

          return(
          <div key={idx} className={style.containerTraitShow}>
            <div className={style.containerTraitShowIcon}>
            <img className={style.backgroundSinergiaShow} src={`/hexagonos/${traitSVG}`} alt="hex" />
            <img className={style.sinergiaShow} src={iconUrl} alt={trait} />
            </div>
            <span>{count}</span>
          </div>
        )})}
      </div>
    );
  }

  return (
    <div className={style.containerBuilder} style={{ marginBottom: "20px" }} onClick={() => setActiveMenu(null)}>
      {renderTraits()}
      {renderHexagons()}
    </div>
  );
};

export default NuevoBuilderTFT;
