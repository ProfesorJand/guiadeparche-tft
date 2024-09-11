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
            <img className={style.imgAumento} src={urlImg} alt={`aumento ${aumento.name}`}/>
          </div>
      )
      })}
    </div>
  )
}

export default AumentosCompos;