import React, {useEffect} from "react";
import { useStore } from "@nanostores/react";
import {MetaComps as compos, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js";
import Composicion from "./Composicion.jsx";
import style from "./css/ShowBigCompScreen.module.css";
import { MetaCompVersion } from "src/stores/menuFiltradoAdmin.js";
const ShowBigCompScreen = ({id, setShowBigComp}) => {
  const colorDificulty= {Easy:"green",Medium:"orange",Hard:"red"}
  const composMeta = useStore(compos);
  const version = useStore(MetaCompVersion)
  function findObjectById(id, composMeta) {
    for (const array of composMeta) {
      const found = array.find(obj => obj.id === id);
      if (found) {
        return found; // Retorna el objeto si se encuentra
      }
    }
    return null; // Retorna null si no encuentra el objeto
  }
  
  const CompToShow = findObjectById(id, composMeta);
  const admin = localStorage.getItem("superAdmin") || false;
  function closeComp(e){
    e.stopPropagation();
    setShowBigComp((valor)=>!valor);
  }
  if(admin){
    return (
      <div className={style.compToShow} onClick={(e)=>{closeComp(e)}}>
        <div className={style.background}>
          <div className={style.aspectWrapper}>
            <div className={style.upperStyle}>
              <div className={style.containerTierImg}>
                <img
                className={style.tierImg}
                src={`/tiers/Tier-${CompToShow.tier}.webp`}
                alt="Tier TFT" 
                loading="lazy"
                />
              </div>
              <div className={style.titulos}>
                <div className={style.tituloPrincipal}>
                  {`SET 13 META COMP [${version}]`}
                </div>
                <div className={style.titutloSecundario}>
                <span className={[style.titulo, style.tituloComp].join(" ")}>{CompToShow.titulo}</span>
                </div>
              </div>
              <div className={style.tags}>
                <div className={style.dificultad} style={{border:`1px solid ${colorDificulty[CompToShow.dificultad]}`, color:`${colorDificulty[CompToShow.dificultad]}`}}>{CompToShow.dificultad}</div>
                <div className={style.category}>{CompToShow.infographicCategory}</div>
              </div>
            </div>
            <Composicion compo={CompToShow} showHide={true} admin={false} show={false} allwaysOpen={true}/>
            <div className={style.lowerStyle}>
              <div className={style.divJupesonLogo}>
                <img className={style.imgJupesonLogo} src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" alt=""></img>
              </div>
              <div className={style.divWebLogo}>
                <img className={style.divWebLogo} src="/tft/assets/GP_logo.png" alt="logo Guiadeparche"></img>
                  <span className={style.textoWeb}>
                    TFT.GUIADEPARCHE.COM
                  </span>
              </div>
              <div className={style.divSetTFTLogo}>
                <img className={style.imgSetTFTLogo} src="/tft/sets/13/logo.png" alt="TFT LOGO"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowBigCompScreen