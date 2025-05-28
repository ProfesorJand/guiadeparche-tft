import React, { useEffect, useState } from "react";
import style from "./css/PosicionamientoCompos.module.css"
import Youtube from "@components/youtube/Youtube.jsx";
import loadingSpinner from 'src/assets/loading-180-v2.svg';

const PosicionamientoCompos = ({id, titulo, originalComp, boardInfo, gameplay, spatula1, spatula2, posicionamiento, setPosicionamiento, setData, setSinergias, show, version})=>{
  const [niveles, setNiveles] = useState([posicionamiento]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  useEffect(()=>{
    const array= Object.keys(boardInfo).filter((level)=>{
      if(level !== "early"){
        return level
      }
    })
    setNiveles(array)
  },[originalComp])

 useEffect(() => {
  setImageReady(false); // Siempre reinicia el estado de carga
  if (posicionamiento === "gameplay") {
    setIsLoading(false);
  } else {
    setIsLoading(true);
  }
}, [posicionamiento]);

  const url = "https://guiadeparche.com/tftdata/Set12/composiciones/"

  return (
    <div className={style.containerPosicionamiento}>
      <div className={style.containerImgPosicionamiento}>
        <div className={show ? style.containerImgVideo : style.containerImgVideoOculto}>
          {isLoading && 
          <img 
          src={loadingSpinner.src} 
          alt="Loading..." 
          style={{ width: '60px', height: '60px', position: 'absolute', justifyContent:'center', alignItems:'center', zIndex: 10 }} 
          />}
          {posicionamiento === "gameplay" ? 
            <Youtube 
              src={gameplay[0]} 
              titulo={titulo}
            />
            :
          <img
            key={posicionamiento}
            className={show ? style.imgPosicionamiento : style.imgPosicionamientoOculto}
            src={`${url}${id}-${posicionamiento}${version === "pbe" ? "-pbe" : ""}.webp`}
            alt=""
            loading="lazy"
            onLoad={() => {
              setImageReady(true);
              setIsLoading(false);
            }}
            onError={() => {
              setImageReady(false);
              setIsLoading(false);
            }}
            style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
          />
          }
        </div>
      </div>
      {show && 
      <div className={style.containerBtnPosicionamiento}>
        <div className={style.containerLevels}>
        {niveles.map((nivel,i)=>{
          if(nivel === "lv7" || nivel === "lv8" || nivel == "lv9" || nivel == "lv10"){
            return (
              <div key={i} className={[style.btnLv, posicionamiento === nivel ? style.btnActive : ""].join(" ")} onClick={()=>{setPosicionamiento(nivel);setData(boardInfo[nivel].data);setSinergias(boardInfo[nivel].sinergias);setIsLoading(true)}}>{nivel[0].toUpperCase()+nivel.slice(1)}</div>
            )
          }
        })}
        </div>

        <div className={style.containerSpatula}>
          {(spatula1) &&
           <div className={[style.btnSpat,posicionamiento === "spatula1" ? style.btnActive : ""].join(" ")}>
            {spatula1 && 
              <img className={[style.imgSpat].join(" ")} src={spatula1} onClick={()=>{setPosicionamiento("spatula1");setData(boardInfo["spatula1"].data);setSinergias(boardInfo["spatula1"].sinergias);setIsLoading(true)}} loading="lazy"></img>
            }
          </div>
          }
          {(spatula2) &&
           <div className={[style.btnSpat,posicionamiento === "spatula2" ? style.btnActive : ""].join(" ")}>
            {spatula2 && 
              <img className={[style.imgSpat].join(" ")} src={spatula2} onClick={()=>{setPosicionamiento("spatula2");setData(boardInfo["spatula2"].data);setSinergias(boardInfo["spatula2"].sinergias);setIsLoading(true)}} loading="lazy"></img>
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
      }
    </div>
  )
}

export default PosicionamientoCompos;