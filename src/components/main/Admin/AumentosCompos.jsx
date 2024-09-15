import React from "react";
import style from "./css/AumentosCompos.module.css"

const AumentosCompos =({aumentos})=>{
  const url = "https://raw.communitydragon.org/latest/game/";
  return (
    <div className={style.containerAumentos}>
      {aumentos.map((aumento, index)=>{
        var urlImg = url+aumento.icon.toLowerCase().replace(".tex",".png").replace("hexcore","choiceui")
        if(urlImg.includes("crest_")){
          urlImg = urlImg.replace("1","")
        }
        return (
          <div className={style.containerAumento} key={`aumentos`+index}>
            <div className={style.tooltip}>
              <div className={style.tooltipTitle}>{aumento.name}</div>
              <div className={style.tooltipDesc}>{aumento.desc}</div>
              {Object.keys(aumento.effects).length > 0 && Object.keys(aumento.effects).map((variable, index)=>{
                return (
                 <div key={index} className={style.effects}>
                  <span className={style.variableName}>{variable}</span> : <span>{aumento.effects[variable]}</span>
                  </div>
                )
              })}
              
            </div>
            <img className={style.imgAumento} src={urlImg} alt={`aumento ${aumento.name}`}/>
          </div>
      )
      })}
    </div>
  )
}

export default AumentosCompos;