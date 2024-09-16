import React, { useEffect } from "react";
import style from "./css/Sinergias.module.css"
import { traitsColors, imgHex } from "src/functions/campeonestft";
const Sinergias = ({sinergias, orientacion})=>{
  function checkColor(hexColor){
   console.log(window.innerWidth)
    if(hexColor === "hex-prismatic.webp"){
      console.log(hexColor)
      return colorHex.prismatic
    }
    if(!hexColor){
      return {backgroundColor:colorHex.default};
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


  function getMinMaxTraits(traits) {
    const result = [];
  
    Object.entries(traits).forEach(([trait, value]) => {
      const traitData = traitsColors[trait];
      if (traitData) {
        const levels = Object.keys(traitData).map(Number).sort((a, b) => a - b);
  
        let maxLevel;
        
        if (levels.includes(value)) {
          // Si el valor 'min' ya existe en traitsColors, max será igual al valor de min
          maxLevel = value;
        } else {
          // Encuentra el nivel superior más cercano o toma el mayor disponible
          maxLevel = levels.find(level => level > value) || levels[levels.length - 1];
        }
  
        result.push({
          trait,
          min: value,
          max: maxLevel
      });
      } else {
        // Si no hay datos del trait en traitsColors, el máximo es el mismo que el mínimo
        result.push({
            trait,
            min: value,
            max: value
        });
      }
    });
  
    return result;
  }

  return (

      <div className={[style.containerSinergia, orientacion==="horizontal" ? style.containerSinergiaHorizontal: ""].join(" ")}>
    {Object.keys(sinergias).length > 0 && getMinMaxTraits(sortable).map((key,i)=>{
      if(i < 6){
        if(checkColor(traitsColors[key.trait][key.min])?.backgroundColor !== colorHex.default){
  
          return (
            <div key={i} className={style.containerSinergiaHex} style={window.innerWidth < 900 ? checkColor(traitsColors[key.trait][key.min]) : {}}>
              <span className={style.borderHex} style={checkColor(traitsColors[key.trait][key.min])}></span> 
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