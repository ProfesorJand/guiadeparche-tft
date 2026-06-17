import React from "react";
import style from "./css/ContextMenuBuilder.module.css";
import { dataTFTTraits } from "@stores/dataTFT.js";

const ContextMenuBuilderNew = ({
  hexIndex,
  boardData,
  updateTablero,
  setActiveMenu
}) => {
  const champion = boardData[hexIndex];
  if (!champion) return null;

  const traits = dataTFTTraits.get();
  // Traits extras específicos para la mecánica de TFT17_MissFortune (adaptar según set)
  const extraOptions = ["Conduit", "Challenger", "Replicator"];
  
  const findExtraOptions = extraOptions.flatMap((traitName) => {
    return traits.filter(({ name }) => name === traitName);
  });

  const OPTIONS_BASE = ["★ 4 stars", "★ 3 stars", "★ 2 stars", "★ 1 star", "X Remove"];
  let OPTIONS = [...OPTIONS_BASE];

  // Regla especial para Miss Fortune
  if (champion.apiName === "TFT17_MissFortune") {
    OPTIONS.splice(4, 0, ...extraOptions);
  }

  const handleMenu = (opcion) => {
    const newBoard = { ...boardData };
    const currentChampion = { ...newBoard[hexIndex] };

    switch (opcion) {
      case "★ 4 stars":
        currentChampion.estrellas = 4;
        break;
      case "★ 3 stars":
        currentChampion.estrellas = 3;
        break;
      case "★ 2 stars":
        currentChampion.estrellas = 2;
        break;
      case "★ 1 star":
        currentChampion.estrellas = 1;
        break;
      case "X Remove":
        delete newBoard[hexIndex];
        updateTablero(newBoard);
        setActiveMenu(null);
        return;
      default:
        // Manejar selecciones de sinergias extras
        const extraTrait = findExtraOptions.find((t) => t.name === opcion);
        if (extraTrait) {
          if (currentChampion.extraSynergy === extraTrait.apiName || currentChampion.extraSynergy === extraTrait.name) {
             currentChampion.extraSynergy = null;
          } else {
             currentChampion.extraSynergy = extraTrait.apiName;
          }
        }
        break;
    }

    newBoard[hexIndex] = currentChampion;
    updateTablero(newBoard);
    setActiveMenu(null);
  };

  return (
    <div 
      className={style.contextMenuBuilder} 
    >
      <ul>
        {OPTIONS.map((opcion, i) => (
          <li
            key={i}
            className={style.optionsMenu}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMenu(opcion);
            }}
          >
            {opcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenuBuilderNew;
