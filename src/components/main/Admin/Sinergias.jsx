import React, { useEffect } from "react";
import style from "./css/Sinergias.module.css"
import { traitsColors, imgHex } from "src/functions/campeonestft";
import sinergiasData from "src/json/updates/sinergiasData";
const Sinergias = ({sinergias, orientacion})=>{

  function checkColor(hexColor){
    if(hexColor === "hex-prismatic.webp"){
      return colorHex.prismatic
    }
    return {backgroundColor:colorHex[hexColor.replace("hex-","").replace(".webp","")]}
  }

  const colorHex = {
    bronze:"#a16f44",
    silver:"#909090",
    gold:"gold",
    // prismatic:"radial-gradient(#ffffff 20%, #4c16af 100%)",
    prismatic: {backgroundImage:"url(/hexagonos/hex-prismatic.webp)",backgroundSize: "125%", backgroundPosition:"center"},
    default:"grey"
   }

  const sortable = Object.entries(sinergias)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  // Función que busca el nivel más cercano por debajo del valor actual
  function findClosestLower(trait, value) {
    const traitData = traitsColors[trait];
    if (!traitData) return null;

    const levels = Object.keys(traitData)
      .map(Number)
      .sort((a, b) => a - b);

    // Busca el nivel más bajo o igual al valor actual
    let closest = levels[0];
    for (let i = 0; i < levels.length; i++) {
      if (levels[i] <= value) {
        closest = levels[i];
      } else {
        break;
      }
    }

    return traitData[closest];
  }

  function getMinMaxTraits(traits) {
    const result = [];
    Object.entries(traits).forEach(([trait, value]) => {
      const traitData = traitsColors[trait];
      const data = sinergiasData.find(({apiName})=>{
        return apiName === trait
      })
      if (traitData) {
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
          icon:data?.icon.replace(".tex",".png").toLowerCase()
        });
      }else{
        result.push({
          trait:data?.name,
          min: 0,
          max: 0,
          hexColor: "hex-default.webp",
          hexLevel: 0,
          icon:data?.icon.replace(".tex",".png").toLowerCase()
        });
      }
    });
  
    return result;
  }

  return (

      <div className={[style.containerSinergia, orientacion==="horizontal" ? style.containerSinergiaHorizontal: ""].join(" ")}>
    {Object.keys(sinergias).length > 0 && getMinMaxTraits(sortable).map((key,i)=>{
      if(i < 6){
        if(key.hexColor !== "hex-default.webp"){
          return (
            <div key={i} className={style.containerSinergiaHex} style={window.innerWidth < 900 ? checkColor(key.hexColor) : {}}>
              <span className={style.borderHex} style={checkColor(key.hexColor)}></span> 
              <img className={style.imgSinergia} src={`https://raw.communitydragon.org/latest/game/${key.icon}`} alt="Trait_Icon" loading="lazy"/>
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