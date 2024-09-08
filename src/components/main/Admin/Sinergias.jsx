import React from "react";
import style from "./css/Sinergias.module.css"
import { traitsColors, imgHex } from "src/functions/campeonestft";
const Sinergias = ({sinergias})=>{

  function checkColor(hexColor){
    if(!hexColor){
      return {backgroundColor:colorHex.default};
    }
    if(hexColor === "hex-prismatic.webp"){
      return {background:colorHex.prismatic};
    }
    return {backgroundColor:colorHex[hexColor.replace("hex-","").replace(".webp","")]}
  }

  const colorHex = {
    bronze:"#a16f44",
    silver:"#909090",
    gold:"gold",
    prismatic:"radial-gradient(#ffffff, #9198e5);",
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

  function checkActiveTrait(trait, min){

  }

  return (

      <div className={style.containerSinergia}>
    {getMinMaxTraits(sortable).map((key,i)=>{
      if(i < 6){
        if(checkColor(traitsColors[key.trait][key.min])?.backgroundColor !== colorHex.default){
  
          return (
            <div key={i} className={style.containerSinergiaHex} style={checkColor(traitsColors[key.trait][key.min])}>
              <img className={style.imgSinergia} src={`/sinergias/Trait_Icon_12_${key.trait}.svg`} alt="Trait_Icon"/>
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