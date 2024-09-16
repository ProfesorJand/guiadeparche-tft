import React, { useEffect, useState } from "react";
import style from "./css/PosicionamientoCompos.module.css"
import Youtube from "src/components/youtube/Youtube";

const PosicionamientoCompos = ({id, titulo, originalComp, boardInfo, gameplay, spatula1, spatula2, posicionamiento, setPosicionamiento, setData, setSinergias})=>{
  const [niveles, setNiveles] = useState([posicionamiento]);
  useEffect(()=>{
    const array= Object.keys(boardInfo).filter((level)=>{
      if(level !== "early"){
        return level
      }
    })
    setNiveles(array)
  },[originalComp])
  const url = "https://guiadeparche.com/tftdata/Set12/composiciones/"

  return (
    <div className={style.containerPosicionamiento}>
      <div className={style.containerImgPosicionamiento}>

        {posicionamiento !== "gameplay" && posicionamiento !== "spatula1" && posicionamiento !== "spatula2" &&
        <div className={style.containerImgVideo}>
          <img className={style.imgPosicionamiento} src={url+id+"-"+posicionamiento+".webp"+"?v="+Date.now()} alt="" loading="lazy"/>
        </div>
      }
        {(posicionamiento === "spatula1" || posicionamiento === "spatula2") && 
        <div className={style.containerImgVideo}>
          <img className={style.imgPosicionamiento} src={url+id+"-"+posicionamiento+".webp"+"?v="+Date.now()} alt="" loading="lazy"/>
        </div>
      }
        {
          posicionamiento === "gameplay" &&
          <Youtube src={gameplay[0]} />
        }
      </div>
      <div className={style.containerBtnPosicionamiento}>
        <div className={style.containerLevels}>
        {niveles.map((nivel,i)=>{
          if(nivel === "lv7" || nivel === "lv8" || nivel == "lv9" || nivel == "lv10"){
            return (
              <div key={i} className={[style.btnLv, posicionamiento === nivel ? style.btnActive : ""].join(" ")} onClick={()=>{setPosicionamiento(nivel);setData(boardInfo[nivel].data);setSinergias(boardInfo[nivel].sinergias)}}>{nivel[0].toUpperCase()+nivel.slice(1)}</div>
            )
          }
        })}
        </div>
        <div className={style.containerSpatula}>
          {(spatula1 || spatula2) &&
           <div className={[style.btnSpat,posicionamiento === "spatula1" ? style.btnActive : ""].join(" ")}>
            {spatula1 && 
              <img className={[style.imgSpat].join(" ")} src={spatula1} onClick={()=>{setPosicionamiento("spatula1");setData(boardInfo["spatula1"].data);setSinergias(boardInfo["spatula1"].sinergias)}} loading="lazy"></img>
            }
            {spatula2 && 
              <img className={[style.imgSpat].join(" ")} src={spatula2} onClick={()=>{setPosicionamiento("spatula2");setData(boardInfo["spatula2"].data);setSinergias(boardInfo["spatula2"].sinergias)}} loading="lazy"></img>
            }  
          </div>
          }
        </div>
        <div className={style.containerYoutube}>
          {gameplay.length > 0 && 
          <img className={style.ytIcon} src="/redes/youtube.webp" alt="logo Youtube" onClick={()=>{setPosicionamiento("gameplay")}} loading="lazy"></img>
          }
        </div>
      </div>
    </div>
  )
}

export default PosicionamientoCompos;