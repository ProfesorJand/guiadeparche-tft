import React from "react";
import style from "./css/ContextMenuBuilder.module.css";
import { dataTFTTraits } from "@stores/dataTFT.js";

const ContextMenuBuilderNew = ({
  hexIndex,
  boardData,
  composicionTFT,
  setComposicionTFT,
  campoBuilder,
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
        setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
        setActiveMenu(null);
        return;
      default:
        // Manejar selecciones de sinergias extras
        const extraTrait = findExtraOptions.find((t) => t.name === opcion);
        if (extraTrait) {
          let newTraits = [...currentChampion.traits];
          const undeterminedTraitApiName = "TFT17_MissFortuneUndeterminedTrait";
          
          const hasTrait = newTraits.some((t) => t.apiName === extraTrait.apiName);
          if (hasTrait) {
            // Si ya la tiene, se la quitamos
            newTraits = newTraits.filter((t) => t.apiName !== extraTrait.apiName);
            // Volvemos a agregar el trait indefinido si está disponible en la base de datos de traits
            const undeterminedTrait = traits.find((t) => t.apiName === undeterminedTraitApiName);
            if (undeterminedTrait && !newTraits.some(t => t.apiName === undeterminedTraitApiName)) {
              newTraits.push(undeterminedTrait);
            }
          } else {
            // Si no la tiene, removemos cualquier otra sinergia extra antes de agregar la nueva
            newTraits = newTraits.filter(
              (t) => !findExtraOptions.some((et) => et.apiName === t.apiName)
            );
            // Removemos explícitamente el trait indefinido
            newTraits = newTraits.filter((t) => t.apiName !== undeterminedTraitApiName);
            // Y finalmente agregamos la nueva seleccionada
            newTraits.push(extraTrait);
          }
          currentChampion.traits = newTraits;
        }
        break;
    }

    newBoard[hexIndex] = currentChampion;
    setComposicionTFT({ ...composicionTFT, [campoBuilder]: newBoard });
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
