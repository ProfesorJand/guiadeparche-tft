import React from "react";
import style from "./css/AumentosCompos.module.css"

const AumentosCompos =({aumentos})=>{
  const url = "https://raw.communitydragon.org/latest/game/";
  return (
    <div className={style.containerAumentos}>
      {aumentos.map((aumento, index)=>{
        var urlImg = url+aumento.icon.toLowerCase().replace(".tex",".png").replace("hexcore","choiceui")
        // if(urlImg.includes("crest_") && !urlImg.includes("arcana")){
        //   urlImg = urlImg.replace("1","")
        // }
        return (
          <div className={style.containerAumento} key={`containerTooltips`+index}>
            <div className={style.tooltip}>
              <div className={style.tooltipTitle}>{aumento.name}</div>
              <div className={style.tooltipDesc}>{aumento.desc}</div>
              {Object.keys(aumento.effects).length > 0 && Object.keys(aumento.effects).map((variable, i)=>{
                return (
                 <div key={i} className={style.effects}>
                  <span className={style.variableName}>{variable}</span> : <span>{aumento.effects[variable]}</span>
                  </div>
                )
              })}
              
            </div>
            <img className={style.imgAumento} src={urlImg} alt={`aumento ${aumento.name}`} loading="lazy"/>
          </div>
      )
      })}
    </div>
  )
}

export default AumentosCompos;