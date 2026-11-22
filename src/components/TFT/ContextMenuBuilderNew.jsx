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

  const traits = dataTFTTraits.get();
  // Traits extras específicos para la mecánica de TFT17_MissFortune (adaptar según set)
  const extraOptions = ["Conduit", "Challenger", "Replicator"];
  
  const findExtraOptions = extraOptions.flatMap((traitName) => {
    return traits.filter(({ name }) => name === traitName);
  });

  const OPTIONS_BASE = champion && champion.apiName ? ["★ 4 stars", "★ 3 stars", "★ 2 stars", "★ 1 star", "X Remove"] : [];
  let OPTIONS = [...OPTIONS_BASE];

  // Regla especial para Miss Fortune
  if (champion && champion.apiName === "TFT17_MissFortune") {
    OPTIONS.splice(4, 0, ...extraOptions);
  }

  // Regla especial para Sona (Set 19 - Productor: elige 1 de las 5 bandas oficiales)
  const sonaBandOptions = [
    { label: "Heartsteel", apiName: "DA_Heartsteel19" },
    { label: "Ionic Spark", apiName: "DA_IonicSpark19" },
    { label: "K/DA", apiName: "DA_KDA19" },
    { label: "Pentakill", apiName: "DA_Pentakill19" },
    { label: "True Damage", apiName: "DA_TrueDamage19" },
  ];

  if (champion && champion.apiName === "tft19_sona") {
    const sOptions = sonaBandOptions.map((opt) => {
      const isSelected = champion.extraSynergy === opt.apiName;
      return isSelected ? `Quitar ${opt.label}` : `Añadir ${opt.label}`;
    });
    OPTIONS.splice(4, 0, ...sOptions);
  }

  // Regla especial para Collab (Set 19): permitir añadir/quitar Collab (DA_Collab19) a campeones del Set 19
  const isSet19Champ = Boolean(champion && champion.apiName && champion.apiName.startsWith("tft19_") && champion.apiName !== "tft19_aatrox");
  const hasNativeCollab = Boolean(champion?.traits?.some((t) => t.apiName === "DA_Collab19") && !champion?.extraSynergyKhazix?.includes("DA_Collab19"));
  if (isSet19Champ && !hasNativeCollab) {
    const hasCollab = champion.extraSynergyKhazix?.includes("DA_Collab19");
    OPTIONS.splice(4, 0, hasCollab ? "Quitar Collab" : "Añadir Collab");
  }

  // Regla especial para Heartsteel (Set 19): Selectores de Bufo Naranja (#1) y Azul (#2)
  const heartsteelSelectorOptions = [
    {
      key: "selector1",
      label: "Heartsteel Naranja",
      icon: "/tft/sets/19/traits/heartsteel_selector1.png",
    },
    {
      key: "selector2",
      label: "Heartsteel Azul",
      icon: "/tft/sets/19/traits/heartsteel_selector2.png",
    },
  ];
  const isHeartsteelChamp = Boolean(
    champion &&
    champion.apiName &&
    (
      champion.traits?.some((t) => t.apiName === "DA_Heartsteel19" || t.name?.toLowerCase() === "heartsteel") ||
      champion.items?.some((it) => it.traitExtra?.apiName === "DA_Heartsteel19" || it.apiName === "DA_19_EmblemHeartsteel")
    )
  );
  if (isHeartsteelChamp) {
    const hsOptions = heartsteelSelectorOptions.map((opt) =>
      champion.heartsteelSelector === opt.key ? `Quitar ${opt.label}` : `Añadir ${opt.label}`
    );
    OPTIONS.splice(4, 0, ...hsOptions);
  }

  // Regla especial para Khazix (Set 13)
  const khazixOptions = [
    { label: "Rapidfire", apiName: "DA_18_Rapidfire" },
    { label: "Spellweaver", apiName: "DA_18_Spellweaver" },
    { label: "Ravager", apiName: "DA_18_Slayer" },
    { label: "Executioner", apiName: "DA_18_Executioner" }
  ];

  if (champion && champion.apiName === "tft18_khazix") {
    const kOptions = khazixOptions.map(opt => {
      const isSelected = champion.extraSynergyKhazix?.includes(opt.apiName);
      return isSelected ? `Quitar ${opt.label}` : `Añadir ${opt.label}`;
    });
    OPTIONS.splice(4, 0, ...kOptions);
  }
  
  const hasEspinaNegra = champion && champion.extraSynergy === "Espina Negra";
  OPTIONS.push(hasEspinaNegra ? "Quitar Espina Negra" : "Espina Negra");

  const hasRiftbeast = champion && champion.isRiftbeast;
  OPTIONS.push(hasRiftbeast ? "Quitar Riftbeast" : "Añadir Riftbeast");

  const handleMenu = (opcion) => {
    const newBoard = { ...boardData };
    let currentChampion = newBoard[hexIndex] ? { ...newBoard[hexIndex] } : { apiName: null, items: [], traits: [], extraSynergyKhazix: [] };
    if (!currentChampion.extraSynergyKhazix) currentChampion.extraSynergyKhazix = [];

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
      case "Espina Negra":
        currentChampion.extraSynergy = "Espina Negra";
        break;
      case "Quitar Espina Negra":
        if (!currentChampion.apiName) {
           delete newBoard[hexIndex];
           updateTablero(newBoard);
           setActiveMenu(null);
           return;
        } else {
           currentChampion.extraSynergy = null;
        }
        break;
      case "Añadir Riftbeast":
        currentChampion.isRiftbeast = true;
        break;
      case "Quitar Riftbeast":
        currentChampion.isRiftbeast = false;
        break;
      default:
        if (opcion === "Añadir Collab") {
          if (!currentChampion.extraSynergyKhazix.includes("DA_Collab19")) {
            currentChampion.extraSynergyKhazix.push("DA_Collab19");
          }
          break;
        }
        if (opcion === "Quitar Collab") {
          currentChampion.extraSynergyKhazix = currentChampion.extraSynergyKhazix.filter((x) => x !== "DA_Collab19");
          break;
        }

        if (opcion.startsWith("Añadir ") || opcion.startsWith("Quitar ")) {
          const label = opcion.replace("Añadir ", "").replace("Quitar ", "");

          // Selectores de Heartsteel (Naranja / Azul)
          const hsOpt = heartsteelSelectorOptions.find((opt) => opt.label === label);
          if (hsOpt) {
            currentChampion.heartsteelSelector = opcion.startsWith("Añadir ") ? hsOpt.key : "";
            break;
          }

          // Bandas de Sona (Productor Set 19)
          const sonaOpt = sonaBandOptions.find((opt) => opt.label === label);
          if (sonaOpt && currentChampion.apiName === "tft19_sona") {
            currentChampion.extraSynergy = opcion.startsWith("Añadir ") ? sonaOpt.apiName : null;
            break;
          }

          const khazixOpt = khazixOptions.find(opt => opt.label === label);
          if (khazixOpt) {
            if (opcion.startsWith("Añadir ")) {
              currentChampion.extraSynergyKhazix.push(khazixOpt.apiName);
            } else {
              currentChampion.extraSynergyKhazix = currentChampion.extraSynergyKhazix.filter(x => x !== khazixOpt.apiName);
            }
            break;
          }
        }

        // Manejar selecciones de sinergias extras (Miss Fortune)
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
        {OPTIONS.map((opcion, i) => {
          const hsMatch = heartsteelSelectorOptions.find((opt) => opcion.endsWith(opt.label));
          return (
            <li
              key={i}
              className={style.optionsMenu}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleMenu(opcion);
              }}
            >
              {hsMatch && (
                <img
                  src={hsMatch.icon}
                  alt={hsMatch.label}
                  className={style.optionIcon}
                />
              )}
              <span>{opcion}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContextMenuBuilderNew;
