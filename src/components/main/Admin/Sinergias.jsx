import React, { useEffect } from "react";
import style from "./css/Sinergias.module.css"
import { traitsColors, imgHex } from "src/functions/campeonestft";
//import sinergiasData from "src/json/updates/sinergiasData";
import { dataTFTTraits, versionTFT, setNumberLatest, setNumberPBE, findTraitsStyles, dataTFTChampions, dataTFTAllItems } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import { getLocalTftImage } from "@utils/images";
const Sinergias = ({sinergias, orientacion, show, version})=>{
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

  function checkColor(hexColor){
    if (!hexColor) return { backgroundColor: colorHex.default };
    if(hexColor === "hex-prismatic.webp"){
      return colorHex.prismatic
    }
    const colorKey = hexColor.replace("hex-","").replace(".webp","");
    return {backgroundColor: colorHex[colorKey] || colorHex.default}
  }

  const colorHex = {
    bronze:"#a16f44",
    silver:"#909090",
    gold:"gold",
    // prismatic:"radial-gradient(#ffffff 20%, #4c16af 100%)",
    prismatic: {backgroundImage:"url(/hexagonos/hex-prismatic.webp)",backgroundSize: "125%", backgroundPosition:"center"},
    default:"grey"
   }

  let calculatedSinergias = {};
  if (Array.isArray(sinergias)) {
    const processedChampionTraits = new Set();
    sinergias.forEach(champObj => {
      const champData = safeGlobalChampions.find(c => c.apiName === champObj.apiNameCampeon);
      if (!champData) return;

      let resolvedTraits = (champData.traits || []).map(traitName => {
        const traitObj = safeSinergiasData.find(t => t.name === traitName || t.apiName === traitName);
        return traitObj ? traitObj.apiName : traitName;
      });

      if (champObj.sinergiaExtraMissFortune) {
        resolvedTraits = resolvedTraits.filter(t => !t.toLowerCase().includes("undetermined"));
        const extraObj = safeSinergiasData.find(t => t.name === champObj.sinergiaExtraMissFortune || t.apiName === champObj.sinergiaExtraMissFortune);
        if(extraObj) resolvedTraits.push(extraObj.apiName);
        else resolvedTraits.push(champObj.sinergiaExtraMissFortune);
      }

      resolvedTraits.forEach(traitApiName => {
        const uniqueKey = `${champData.apiName}_${traitApiName}`;
        if (!processedChampionTraits.has(uniqueKey)) {
          processedChampionTraits.add(uniqueKey);
          calculatedSinergias[traitApiName] = (calculatedSinergias[traitApiName] || 0) + 1;
        }
      });

      const itemsData = (champObj.apiNameItemsDelCampeon || []).map(apiNameItem => safeGlobalItems.find(i => i.apiName === apiNameItem)).filter(Boolean);
      itemsData.forEach(item => {
        if (item.incompatibleTraits && item.incompatibleTraits.length > 0) {
          const traitExtra = item.incompatibleTraits[0];
          calculatedSinergias[traitExtra] = (calculatedSinergias[traitExtra] || 0) + 1;
        }
      });
    });
  } else {
    calculatedSinergias = sinergias || {};
  }

  const sortable = Object.entries(calculatedSinergias)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});


  function getMinMaxTraits(traits) {
    const result = [];
    Object.entries(traits).forEach(([trait, value]) => {
      const traitData = findTraitsStyles(trait);
      const data = safeSinergiasData.find(({apiName})=>{
        return apiName === trait
      })
      const hasLevels = traitData && Object.keys(traitData).length > 0;
      if (hasLevels) { 
        const levels = Object.keys(traitData).map(Number).sort((a, b) => a - b);
        let maxLevel = levels[levels.length -1];
        let minLevel = levels[0]; // El nivel más bajo disponible
        let hexColor;
        let hexLevel;
        // Si el valor es menor que el nivel más bajo, asigna 'hex-default.webp'
        if (value  < minLevel) {
          hexColor = 'hex-default.webp';
          hexLevel = value ;
        } else if (value > levels[levels.length -1]) {
          hexColor = traitData[levels[levels.length -1]];  // Usa el valor exacto si existe
          hexLevel = levels[levels.length -1];
        } else {
          // Encuentra el nivel inferior más cercano
          loopFor:
          for(let i = value; i >= 0 ; i--){
            if(levels.includes(i)){
              hexColor = traitData[levels[levels.indexOf(i)]]; 
              hexLevel = levels[levels.indexOf(i)];
              break loopFor;
            }
          }
        }
        result.push({
          trait:data?.name,
          min: minLevel,
          max: maxLevel,
          hexColor,
          hexLevel,
          icon: data?.icon ? data.icon.replace(".tex",".png").toLowerCase() : ""
        });
      }else{
        result.push({
          trait:data?.name,
          min: 0,
          max: 0,
          hexColor: "hex-default.webp",
          hexLevel: 0,
          icon: data?.icon ? data.icon.replace(".tex",".png").toLowerCase() : ""
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
      <div className={show ? [style.containerSinergia, orientacion==="horizontal" ? style.containerSinergiaHorizontal: ""].join(" ") : style.containerSinergiaOculto }>
    {Object.keys(calculatedSinergias).length > 0 && getMinMaxTraits(sortable).map((key,i)=>{
      if(show ? i < 9 : i < 9){
        if(key.hexColor !== "hex-default.webp"){
          return (
            <div key={i} className={show ? style.containerSinergiaHex : style.containerSinergiaHexOculto} style={isMobile ? checkColor(key.hexColor) : {}}>
              <span className={style.borderHex} style={checkColor(key.hexColor)}></span> 
              <img className={style.imgSinergia} src={getLocalTftImage(key.icon, 'traits', versionNumber)} alt="Trait_Icon" loading="lazy"/>
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