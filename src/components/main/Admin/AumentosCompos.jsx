import React from "react";
import style from "./css/AumentosCompos.module.css"

const AumentosCompos =({aumentos})=>{
  const url = "https://raw.communitydragon.org/latest/game/";
  return (
    <div className={style.containerAumentos}>
      {aumentos.map((aumento)=>{
        return (
          <div className={style.containerAumento}>
            <img className={style.imgAumento} src={url+aumento.icon.toLowerCase().replace(".tex",".png").replace("hexcore","choiceui")} alt={`aumento ${aumento.name}`}/>
          </div>
      )
      })}
    </div>
  )
}

export default AumentosCompos;