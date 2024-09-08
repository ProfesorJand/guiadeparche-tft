import React, { useEffect, useState } from "react";
import style from "./css/PosicionamientoCompos.module.css"
import Youtube from "src/components/youtube/Youtube";

const PosicionamientoCompos = ({titulo, originalComp, boardInfo, gameplay, spatula1, spatula2})=>{
  const [niveles, setNiveles] = useState(["lv8"]);
  const [posicionamiento, setPosicionamiento] = useState(originalComp)

  useEffect(()=>{
    const array= Object.keys(boardInfo).filter((level)=>{
      if(level !== "early"){
        return level
      }
    })
    setNiveles(array)
  },[])
  const url = "https://guiadeparche.com/tftdata/Set12/"

  return (
    <div className={style.containerPosicionamiento}>
      <div className={style.containerImgPosicionamiento}>

        {posicionamiento !== "gameplay" && posicionamiento !== "spatula1" && posicionamiento !== "spatula2" &&
        <div className={style.containerImgVideo}>
          <img className={style.imgPosicionamiento} src={url+titulo+"-"+posicionamiento+".webp"+"?v="+Date.now()} alt=""/>
        </div>
      }
        {(posicionamiento === "spatula1" || posicionamiento === "spatula2") && 
        <div className={style.containerImgVideo}>
          <img className={style.imgPosicionamiento} src={url+titulo+"-"+posicionamiento+".webp"+"?v="+Date.now()} alt=""/>
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
              <div key={i} className={[style.btnLv, posicionamiento === nivel ? style.btnActive : ""].join(" ")} onClick={()=>{setPosicionamiento(nivel)}}>{nivel[0].toUpperCase()+nivel.slice(1)}</div>
            )
          }
        })}
        </div>
        <div className={style.containerSpatula}>
          {(spatula1 || spatula2) &&
           <div className={[style.btnSpat]}>
            {spatula1 && 
              <img className={[style.imgSpat,posicionamiento === "spatula1" ? style.btnActive : ""].join(" ")} src={spatula1} onClick={()=>{setPosicionamiento("spatula1")}}></img>
            }
            {spatula2 && 
              <img className={[style.imgSpat,posicionamiento === "spatula2" ? style.btnActive : ""].join(" ")} src={spatula2} onClick={()=>{setPosicionamiento("spatula2")}}></img>
            }  
          </div>
          }
        </div>
        <div className={style.containerYoutube}>
          {gameplay.length > 0 && 
          <img className={style.ytIcon} src="/redes/youtube.webp" alt="logo Youtube" onClick={()=>{setPosicionamiento("gameplay")}}></img>
          }
        </div>
      </div>
    </div>
  )
}

export default PosicionamientoCompos;