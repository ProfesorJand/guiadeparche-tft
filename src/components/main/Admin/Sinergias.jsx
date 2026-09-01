import React, { useEffect } from "react";
import style from "./css/Sinergias.module.css"
import { traitsColors, imgHex } from "src/functions/campeonestft";
//import sinergiasData from "src/json/updates/sinergiasData";
import { dataTFTTraits, versionTFT, setNumberLatest, setNumberPBE, findTraitsStyles, dataTFTChampions, dataTFTAllItems } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import { getLocalTftImage } from "@utils/images";
const Sinergias = ({ sinergias, orientacion, show, version }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => { setIsMounted(true); }, []);
  const sinergiasData = useStore(dataTFTTraits) || [];
  const globalChampions = useStore(dataTFTChampions) || [];
  const globalItems = useStore(dataTFTAllItems) || [];
  const currentVersion = useStore(versionTFT);
  const versionNumber = currentVersion === "latest" ? setNumberLatest : setNumberPBE

  const safeSinergiasData = isMounted ? sinergiasData : [];
  const safeGlobalChampions = isMounted ? globalChampions : [];
  const safeGlobalItems = isMounted ? globalItems : [];

  function checkColor(hexColor) {
    if (!hexColor) return { backgroundColor: colorHex.default };
    if (hexColor === "hex-prismatic.webp") {
      return colorHex.prismatic
    }
    const colorKey = hexColor.replace("hex-", "").replace(".webp", "");
    return { backgroundColor: colorHex[colorKey] || colorHex.default }
  }

  const colorHex = {
    bronze: "#a16f44",
    silver: "#909090",
    gold: "gold",
    // prismatic:"radial-gradient(#ffffff 20%, #4c16af 100%)",
    prismatic: { backgroundImage: "url(/hexagonos/hex-prismatic.webp)", backgroundSize: "125%", backgroundPosition: "center" },
    default: "grey"
  }

  let calculatedSinergias = {};
  if (Array.isArray(sinergias)) {
    const processedChampionTraits = new Set();
    
    // 1. Simular la estructura de boardData de NuevoBuilderTFT para asegurar 100% compatibilidad
    const boardData = {};
    sinergias.forEach((champ, index) => {
      if (!champ) return;
      const isEspinaNegra = champ.sinergiaExtraMissFortune === "Espina Negra";
      const champData = safeGlobalChampions.find(c => c.apiName === champ?.apiNameCampeon);
      
      if (!champData && !isEspinaNegra) return;

      let itemsData = [];
      if (champData) {
        itemsData = (champ.apiNameItemsDelCampeon || []).map(apiNameItem => {
          if (!apiNameItem) return null;
          const apiNameStr = typeof apiNameItem === 'object' ? apiNameItem.apiName : apiNameItem;
          const itemData = safeGlobalItems.find(i => i.apiName === apiNameStr);
          if (!itemData) return null;

          let traitExtra = null;
          if (itemData.incompatibleTraits && itemData.incompatibleTraits.length > 0) {
            traitExtra = safeSinergiasData.find((t) => t.apiName === itemData.incompatibleTraits[0]);
          }

          return {
            apiName: itemData.apiName || itemData.name,
            traitExtra
          };
        }).filter(Boolean);
      }

      let resolvedTraits = [];
      if (champData) {
        resolvedTraits = (champData.traits || []).map(traitName => {
          const traitObj = safeSinergiasData.find(t => t.name === traitName || t.apiName === traitName);
          return traitObj ? traitObj : { apiName: traitName, name: traitName };
        }).filter(Boolean);

        // Si tiene sinergiaExtra (Doble sinergia / Lux / Headliner)
        if (champ.sinergiaExtraMissFortune && champ.sinergiaExtraMissFortune !== "Espina Negra") {
          resolvedTraits = resolvedTraits.filter(t => !t.apiName.toLowerCase().includes("undetermined"));
          const extraTraitObj = safeSinergiasData.find(t => t.apiName === champ.sinergiaExtraMissFortune || t.name === champ.sinergiaExtraMissFortune);
          if (extraTraitObj) {
            resolvedTraits.push(extraTraitObj);
          }
        }
      }

      boardData[index] = {
        apiName: champData ? champData.apiName : null,
        traits: resolvedTraits,
        items: itemsData,
        extraSynergy: champ.sinergiaExtraMissFortune || null,
      };
    });

    // Constante para campeones que aplican x2 en su sinergia
    // Formato: { "apiName_del_campeon": ["apiName_de_la_sinergia"] }
    const doubleTraitChampions = {
      "tft18_lux_coven": ["DA_18_Coven"],
      "tft18_lux_inferno":["DA_18_Inferno"],
      "tft18_lux_blackthorn":["DA_18_Blackthorn"],
      "tft18_lux_blossom":["DA_18_Blossom"],
      "tft18_lux_elderwood":["DA_18_Elderwood"],
      "tft18_lux_fae":["DA_18_Fae"],
      "tft18_lux_lunar":["DA_18_Lunar"],
      "tft18_lux_primal":["DA_Primal18"],
      "tft18_lux_solar":["DA_18_Solar"],
      "tft18_elderdragon":["DA_Riftbeast18"],
    };

    // 2. Iterar boardData de la misma forma que NuevoBuilderTFT para contar
    Object.values(boardData).forEach(champ => {
      if (!champ.apiName) return;

      const collectedTraits = new Set();
      
      champ.traits.forEach(trait => {
        collectedTraits.add(trait.apiName);
        
        // Evitamos doble conteo de copias del mismo campeón
        const uniqueKey = `${champ.apiName}_${trait.apiName}`;
        if (!processedChampionTraits.has(uniqueKey)) {
          processedChampionTraits.add(uniqueKey);
          
          // Verifica si el campeón tiene la sinergia marcada como x2 en la constante
          const isDouble = doubleTraitChampions[champ.apiName]?.includes(trait.apiName);
          const countToAdd = isDouble ? 2 : 1;
          calculatedSinergias[trait.apiName] = (calculatedSinergias[trait.apiName] || 0) + countToAdd;
        }
      });

      if (champ.items) {
        champ.items.forEach(item => {
          if (item.traitExtra) {
            // Un item sí puede sumar sinergia incluso si es copia, pero no si ya la tiene nativamente?
            // NuevoBuilderTFT dice: && !collectedTraits.has(item.traitExtra.apiName)
            if (!collectedTraits.has(item.traitExtra.apiName)) {
              collectedTraits.add(item.traitExtra.apiName);
              calculatedSinergias[item.traitExtra.apiName] = (calculatedSinergias[item.traitExtra.apiName] || 0) + 1;
            }
          }
        });
      }
    });

  } else {
    calculatedSinergias = sinergias || {};
  }

  const sortable = Object.entries(calculatedSinergias)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});


  function getMinMaxTraits(traits) {
    const result = [];
    Object.entries(traits).forEach(([trait, value]) => {
      const traitData = findTraitsStyles(trait);
      const data = safeSinergiasData.find(({ apiName }) => {
        return apiName === trait
      })
      const hasLevels = traitData && Object.keys(traitData).length > 0;
      if (hasLevels) {
        const levels = Object.keys(traitData).map(Number).sort((a, b) => a - b);
        let maxLevel = levels[levels.length - 1];
        let minLevel = levels[0]; // El nivel más bajo disponible
        let hexColor;
        let hexLevel;
        // Si el valor es menor que el nivel más bajo, asigna 'hex-default.webp'
        if (value < minLevel) {
          hexColor = 'hex-default.webp';
          hexLevel = value;
        } else if (value > levels[levels.length - 1]) {
          hexColor = traitData[levels[levels.length - 1]];  // Usa el valor exacto si existe
          hexLevel = levels[levels.length - 1];
        } else {
          // Encuentra el nivel inferior más cercano
          loopFor:
          for (let i = value; i >= 0; i--) {
            if (levels.includes(i)) {
              hexColor = traitData[levels[levels.indexOf(i)]];
              hexLevel = levels[levels.indexOf(i)];
              break loopFor;
            }
          }
        }
        result.push({
          trait: data?.name,
          min: minLevel,
          max: maxLevel,
          hexColor,
          hexLevel,
          icon: data?.icon ? data.icon.replace(".tex", ".png").toLowerCase() : ""
        });
      } else {
        result.push({
          trait: data?.name,
          min: 0,
          max: 0,
          hexColor: "hex-default.webp",
          hexLevel: 0,
          icon: data?.icon ? data.icon.replace(".tex", ".png").toLowerCase() : ""
        });
      }
    });
    return result;
  }

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={show ? [style.containerSinergia, orientacion === "horizontal" ? style.containerSinergiaHorizontal : ""].join(" ") : style.containerSinergiaOculto}>
      {Object.keys(calculatedSinergias).length > 0 && getMinMaxTraits(sortable).map((key, i) => {
        if (show ? i < 9 : i < 9) {
          if (key.hexColor !== "hex-default.webp") {
            return (
              <div key={i} className={show ? style.containerSinergiaHex : style.containerSinergiaHexOculto} style={isMobile ? checkColor(key.hexColor) : {}}>
                <span className={style.borderHex} style={checkColor(key.hexColor)}></span>
                <img className={style.imgSinergia} src={getLocalTftImage(key.icon, 'traits', versionNumber)} alt="Trait_Icon" loading="lazy" />
                <div className={style.infoSinergia}>{key.hexLevel}</div>
              </div>
            )
          }
        }
      })
      }
    </div>

  )
}

export default Sinergias;