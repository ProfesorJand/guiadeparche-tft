import React, { useEffect } from "react";
import style from "./css/Sinergias.module.css"
import { traitsColors, imgHex } from "src/functions/campeonestft";
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
  
      if (traitData) {
        const levels = Object.keys(traitData).map(Number).sort((a, b) => a - b);
        let maxLevel;
        let minLevel = levels[0]; // El nivel más bajo disponible
        // Si el valor es menor que el nivel más bajo, asigna 'hex-default.webp'
        if (value < levels[0]) {
          maxLevel = 'hex-default.webp';
        } else if (levels.includes(value)) {
          maxLevel = traitData[value];  // Usa el valor exacto si existe
          minLevel = value
        } else {
          // Encuentra el nivel inferior más cercano
          maxLevel = traitData[levels.reverse().find(level => level <= value)];
        }
  
        result.push({
          trait,
          min: minLevel,
          max: maxLevel
        });
      } else {
        // Si no hay datos del trait en traitsColors, asigna 'hex-default.webp'
        result.push({
          trait,
          min: 1,
          max: 'hex-default.webp'
        });
      }
    });
  
    return result;
  }

  return (

      <div className={[style.containerSinergia, orientacion==="horizontal" ? style.containerSinergiaHorizontal: ""].join(" ")}>
    {Object.keys(sinergias).length > 0 && getMinMaxTraits(sortable).map((key,i)=>{
      if(i < 6){
        if(key.max !== "hex-default.webp"){
          return (
            <div key={i} className={style.containerSinergiaHex} style={window.innerWidth < 900 ? checkColor(key.max) : {}}>
              <span className={style.borderHex} style={checkColor(key.max)}></span> 
              <img className={style.imgSinergia} src={`/sinergias/Trait_Icon_12_${key.trait}.svg`} alt="Trait_Icon" loading="lazy"/>
              <div className={style.infoSinergia}>{key.min}</div>
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