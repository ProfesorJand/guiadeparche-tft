import React, { useEffect, useState } from "react";
import style from "./css/PosicionamientoCompos.module.css"
import Youtube from "src/components/youtube/Youtube";

const PosicionamientoCompos = ({titulo, originalComp, boardInfo, gameplay, spatula1, spatula2})=>{
  const [niveles, setNiveles] = useState(["lv8"]);
  const [posicionamiento, setPosicionamiento] = useState(originalComp)
  console.log(originalComp)
  console.log(spatula1)
  console.log(spatula2)
  useEffect(()=>{
    const array= Object.keys(boardInfo).filter((level)=>{
      if(level !== "early"){
        return level
      }
    })
    setNiveles(array)
  },[])

  useEffect(()=>{
    console.log(posicionamiento)
  },[posicionamiento])
  const url = "https://guiadeparche.com/tftdata/Set12/"
  console.log(url+titulo+"-"+posicionamiento+".webp")
  return (
    <div className={style.containerPosicionamiento}>
      <div className={style.containerImgPosicionamiento}>
        {posicionamiento !== "gameplay" && 
        <img className={style.imgPosicionamiento} src={url+titulo+"-"+originalComp+".webp"+"?v="+Date.now()} alt=""/>
        }
        {
          posicionamiento === "gameplay" &&
          <Youtube src={gameplay[0]} />
        }
      </div>
      <div className={style.containerBtnPosicionamiento}>
        <div className={style.containerLevels}>
        {niveles.map((nivel,i)=>{
          return (
            <div key={i} className={[style.btnLv, posicionamiento === nivel ? style.btnActive : ""].join(" ")} onClick={()=>{setPosicionamiento(nivel)}}>{nivel[0].toUpperCase()+nivel.slice(1)}</div>
          )
          
        })}
        <div className={[style.btnLv]}>Lv9</div>
        <div className={[style.btnLv]}>Lv10</div>
        </div>
        <div className={style.containerSpatula}>
          {(spatula1 || spatula2) &&
           <div className={[style.btnSpat]}>
            {spatula1 && 
              <img className={[style.imgSpat,posicionamiento === spatula1 ? style.btnActive : ""]} src={`/items/tft_set12_emblem_${spatula1}.webp`} onClick={()=>{setPosicionamiento(spatula1)}}></img>
            }
            {spatula2 && 
              <img className={[style.imgSpat,posicionamiento === spatula2 ? style.btnActive : ""]} src={`/items/tft_set12_emblem_${spatula2}.webp`} onClick={()=>{setPosicionamiento(spatula2)}}></img>
            }
            
          </div>
          }
          <div className={style.btnSpat}>

          <img className={[style.imgSpat,posicionamiento === spatula1 ? style.btnActive : ""].join(" ")} src="/items/tft_set12_emblem_honeymancy.webp" alt="" onClick={()=>{setPosicionamiento(spatula1)}}></img>
          </div>
          <div className={style.btnSpat}>

          <img className={[style.imgSpat]} src="/items/tft_set12_emblem_warrior.webp" alt=""></img>
          </div>
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