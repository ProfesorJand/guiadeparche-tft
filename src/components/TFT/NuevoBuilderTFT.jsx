import React, { useState } from "react";
import style from "../main/Admin/css/Builder.module.css";
import { useStore } from "@nanostores/react";
import { dataTFTChampions, dataTFTAllItems, dataTFTTraits, findTraitsStyles, urlDragon } from "@stores/dataTFT";
import { composicionTFT as datosCompos, actualizarComposicionTFT } from "@stores/tft/dataFormularioCrear.js";
import { traitsColors } from "@functions/campeonestft.js";
import ContextMenuBuilderNew from "./ContextMenuBuilderNew.jsx";

const championsColor = [
  "var(--color-hex-cost-default)",
  "var(--color-hex-cost-1)",
  "var(--color-hex-cost-2)",
  "var(--color-hex-cost-3)",
  "var(--color-hex-cost-4)",
  "var(--color-hex-cost-5)",
  "var(--color-hex-cost-6)",
];

const NuevoBuilderTFT = ({ posicionIndex, customTablero, readOnly = false }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const version = "latest";
  
  const globalChampions = useStore(dataTFTChampions) || [];
  const globalItems = useStore(dataTFTAllItems) || [];
  const globalTraits = useStore(dataTFTTraits) || [];
  const globalComposicion = useStore(datosCompos);

  const tableroArray = customTablero || globalComposicion.posicionamiento?.[posicionIndex]?.tablero || [];
  
  // Reconstruct boardData from state array
  const boardData = {};
  tableroArray.forEach(champ => {
    const hexIndex = champ.fila * 10 + champ.col;
    
    const champData = globalChampions.find(c => c.apiName === champ?.apiNameCampeon);
    if (!champData) return;

    const itemsData = (champ.apiNameItemsDelCampeon || []).map(apiNameItem => {
      if (!apiNameItem) return null;
      const itemData = globalItems.find(i => i.apiName === apiNameItem);
      if (!itemData) return null;
      
      let traitExtra = null;
      if (itemData.incompatibleTraits && itemData.incompatibleTraits.length > 0) {
        traitExtra = globalTraits.find((t) => t.apiName === itemData.incompatibleTraits[0]);
      }

      return {
        apiName: itemData.apiName || itemData.name,
        imagen: itemData.icon.startsWith("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : urlDragon() + itemData.icon.toLowerCase().replace(".tex", ".png"),
        traitExtra
      };
    }).filter(Boolean);

    const resolvedTraits = (champData.traits || []).map(traitName => {
      const traitObj = globalTraits.find(t => t.name === traitName || t.apiName === traitName);
      if (traitObj) {
        const { effects, desc, ...rest } = traitObj;
        return rest;
      }
      return { apiName: traitName, name: traitName, icon: "hex-default.webp" }; // fallback
    }).filter(Boolean);

    boardData[hexIndex] = {
      apiName: champData.apiName,
      nombre: champData.name,
      imagen: champData.tileIcon.includes("http") ? champData.tileIcon.toLowerCase().replace(".tex", ".png") : urlDragon() + champData.tileIcon.toLowerCase().replace(".tex", ".png"),
      coste: champData.cost,
      traits: resolvedTraits,
      items: itemsData,
      estrellas: champ.estrella || 1,
      extraSynergy: champ.sinergiaExtraMissFortune || null,
      hexagono: hexIndex
    };
  });

  const synergiesCount = {};
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
    // Caso especial Miss Fortune
    if (champion.extraSynergy) {
      const mfTrait = globalTraits.find(t => t.apiName === champion.extraSynergy || t.name === champion.extraSynergy);
      if (mfTrait && !collectedTraits.has(mfTrait.apiName)) {
        collectedTraits.add(mfTrait.apiName);
        const currentCount = synergiesCount[mfTrait.apiName]?.count || 0;
        synergiesCount[mfTrait.apiName] = {count: currentCount + 1, icon: mfTrait.icon};
      }
    }
  });

  const updateTablero = (newBoard) => {
    if (readOnly) return;
    const newTablero = Object.entries(newBoard).map(([hex, champ]) => {
      const hexNum = parseInt(hex);
      return {
        fila: Math.floor(hexNum / 10),
        col: hexNum % 10,
        apiNameCampeon: champ.apiName,
        apiNameItemsDelCampeon: champ.items.map(i => i.apiName),
        estrella: champ.estrellas || 1,
        sinergiaExtraMissFortune: champ.extraSynergy || ""
      };
    });

    actualizarComposicionTFT(prev => {
      const newPos = [...(prev.posicionamiento || [])];
      newPos[posicionIndex] = { ...newPos[posicionIndex], tablero: newTablero };
      return { ...prev, posicionamiento: newPos };
    });
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
      if (newBoard[hexIndex] && newBoard[hexIndex].items.length < 3) {
         if (fromHexIndexItem !== hexIndex.toString()) {
            newBoard[fromHexIndexItem].items.splice(fromItemIndex, 1);
            newBoard[hexIndex].items.push(itemMove);
            updateTablero(newBoard);
         }
      } else if (!newBoard[hexIndex]) {
         newBoard[fromHexIndexItem].items.splice(fromItemIndex, 1);
         updateTablero(newBoard);
      }
      return;
    }

    if (dataItemRaw) {
      const item = JSON.parse(dataItemRaw);
      if (newBoard[hexIndex] && newBoard[hexIndex].items.length < 3) {
        const itemImageUrl = item.icon.startsWith("http")
          ? item.icon.replace(".tex", ".png").toLowerCase()
          : "https://raw.communitydragon.org/latest/game/" + item.icon.replace(".tex", ".png").toLowerCase();
        
        let traitExtra = null;
        if (item.incompatibleTraits && item.incompatibleTraits.length > 0) {
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
        updateTablero(newBoard);
      }
      return;
    }

    if (dataCampeonRaw) {
      const campeon = JSON.parse(dataCampeonRaw);
      const isOccupied = !!newBoard[hexIndex];
      const targetChampion = newBoard[hexIndex];

      const newChampionData = {
        apiName: campeon.apiName,
        nombre: campeon.nombre || campeon.name,
        imagen: campeon.img || campeon.icon,
        coste: campeon.coste || campeon.cost || 0,
        traits: (campeon.traits || campeon.sinergia || []).filter(Boolean).map(trait => {
          const { effects, desc, ...rest } = trait;
          return rest;
        }),
        items: [],
        estrellas: 1,
        hexagono: hexIndex,
        extraSynergy: null
      };

      if (isFromBoard) {
        if (fromHexIndex === hexIndex.toString()) return;

        const sourceChampion = newBoard[fromHexIndex];

        if (isOccupied) {
          newBoard[hexIndex] = { ...sourceChampion, hexagono: hexIndex };
          newBoard[fromHexIndex] = { ...targetChampion, hexagono: fromHexIndex };
        } else {
          newBoard[hexIndex] = { ...sourceChampion, hexagono: hexIndex };
          delete newBoard[fromHexIndex];
        }
      } else {
        if (isOccupied) {
          alert("El hexágono ya está ocupado. No puedes colocar un campeón aquí desde afuera.");
          return;
        }

        newBoard[hexIndex] = newChampionData;
      }

      updateTablero(newBoard);
    }
  };

  const handleDragStartChampion = (e, hexIndex, campeon) => {
    e.stopPropagation();
    e.dataTransfer.setData("campeon", JSON.stringify(campeon));
    e.dataTransfer.setData("hexIndex", hexIndex);
  };

  const handleDragEndChampion = (e, hexIndex) => {
    e.stopPropagation();
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    if (!dropTarget || !dropTarget.closest(`.${style.containerPoligon}`)) {
      const newBoard = { ...boardData };
      delete newBoard[hexIndex];
      updateTablero(newBoard);
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
    if (!dropTarget || !dropTarget.closest(`.${style.containerPoligon}`)) {
      const newBoard = { ...boardData };
      if (newBoard[fromHexIndex] && newBoard[fromHexIndex].items[itemIndex]) {
        newBoard[fromHexIndex].items.splice(itemIndex, 1);
        updateTablero(newBoard);
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
    updateTablero(newBoard);
  };

  function findClosestTraitImage(traitType, traitLevel) {
    const dynamicStyles = findTraitsStyles(traitType);
    if (Object.keys(dynamicStyles).length > 0) {
      const thresholds = Object.keys(dynamicStyles).map(Number).sort((a, b) => b - a);
      for (const threshold of thresholds) {
        if (traitLevel >= threshold) {
          return dynamicStyles[threshold];
        }
      }
    }

    if(traitType === "BlackRose") traitType = "Black Rose";
    if(traitType === "FormSwapper") traitType = "Form Swapper";
    if(traitType === "HighRoller") traitType = "High Roller";
    if(traitType === "JunkerKing") traitType = "Junker King";
    if(traitType === "PitFighter") traitType = "Pit Fighter";

    if (traitsColors[traitType]) {
      const traitLevels = Object.keys(traitsColors[traitType]).map(Number).sort((a, b) => a - b);
      for (let i = traitLevels.length - 1; i >= 0; i--) {
        if (traitLevel >= traitLevels[i]) {
          return traitsColors[traitType][traitLevels[i]];
        }
      }
    }
    return "hex-default.webp";
  }

  const renderHexagons = () => {
    const hexes = [];
    
    const rows = [
      [11, 12, 13, 14, 15, 16, 17],
      [21, 22, 23, 24, 25, 26, 27],
      [31, 32, 33, 34, 35, 36, 37],
      [41, 42, 43, 44, 45, 46, 47]
    ];

    rows.forEach((row, rowIndex) => {
      const hexRow = (
        <div key={`row-${rowIndex}`} className={style.hexRow}>
          {rowIndex % 2 !== 0 && <div className={style.halfPoligon}></div>}

          {row.map(hexIndex => {
            const champion = boardData[hexIndex];
            const hexColor = champion ? championsColor[champion.coste] || championsColor[0] : championsColor[0];

            return (
              <div
                key={hexIndex}
                className={style.containerPoligon}
                onDrop={readOnly ? undefined : (e) => handleDrop(e, hexIndex)}
                onDragOver={readOnly ? undefined : (e) => e.preventDefault()}
                onContextMenu={readOnly ? undefined : (e) => handleContextMenu(e, hexIndex)}
              >
                <div className={style.poligon} style={{ backgroundColor: hexColor }}></div>

                {champion && (
                  <div
                    draggable={!readOnly}
                    onDragStart={readOnly ? undefined : (e) => handleDragStartChampion(e, hexIndex, champion)}
                    onDragEnd={readOnly ? undefined : (e) => handleDragEndChampion(e, hexIndex)}
                    style={{ cursor: readOnly ? 'default' : 'grab' }}
                    className={`${style.containerImageChampion} ${champion.estrellas === 4 ? style.estrellas4 : champion.estrellas === 3 ? style.estrellas3 : champion.estrellas === 2 ? style.estrellas2 : champion.estrellas === 1 ? style.estrellas1 : ""}`}
                    onClick={(e) => {
                      if (readOnly) return;
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
                        <div className={style.containerTrait} style={{ backgroundColor: "purple", color: "white", fontSize: "10px", borderRadius: "50%", padding: "2px 4px" }}>
                          MF
                        </div>
                      </div>
                    )}

                    {/* <div className={style.containerItems}>
                      {champion.items.map((item, i) => (
                        <div 
                          key={i} 
                          draggable={!readOnly}
                          onDragStart={readOnly ? undefined : (e) => handleDragStartItem(e, hexIndex, i, item)}
                          onDragEnd={readOnly ? undefined : (e) => handleDragEndItem(e, hexIndex, i)}
                          className={style.containerItem} 
                          style={{ cursor: readOnly ? 'default' : 'grab' }}
                          onContextMenu={(e) => { if (readOnly) return; e.preventDefault(); e.stopPropagation(); handleRemoveItem(hexIndex, i); }}
                        >
                          <img className={style.imgItem} src={item.imagen} alt={item.apiName} />
                        </div>
                      ))}
                    </div> */}

                    {activeMenu === hexIndex && (
                      <ContextMenuBuilderNew
                        hexIndex={hexIndex}
                        boardData={boardData}
                        updateTablero={updateTablero}
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
    return (
      <div className={style.containerTraitsShow}>
        {Object.keys(synergiesCount).map((trait, idx) => {
          const count = synergiesCount[trait].count || 1;
          const traitSVG = findClosestTraitImage(trait.replace(" ", ""), count);
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
    <div className={style.containerBuilder} onClick={() => setActiveMenu(null)}>
      {!readOnly && renderTraits()}
      {renderHexagons()}
    </div>
  );
};

export default NuevoBuilderTFT;

