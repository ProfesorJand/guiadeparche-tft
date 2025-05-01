import React, {useEffect, useState, useRef, useCallback} from "react";
import { useStore } from "@nanostores/react";
import {MetaComps as compos, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js";
import Composicion from "./Composicion.jsx";
import style from "./css/ShowBigCompScreen.module.css";
import { MetaCompVersion } from "src/stores/menuFiltradoAdmin.js";
import { toPng } from 'html-to-image';
// import html2canvas from "html2canvas";

const ShowBigCompScreen = ({id, setShowBigComp}) => {
  const colorDificulty= {Easy:"#008000",Medium:"#ffa500",Hard:"#ff0000"};
  const [showMovilnetLogo, setShowMovilnetLogo] = useState(false);
  const backgroundRef = useRef(null);
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

  const loadAllImages = (container) => {
    const images = container.querySelectorAll("img");
    const promises = [];
  
    images.forEach((img) => {
      if (!img.complete) {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          })
        );
      }
    });
  
    return Promise.all(promises);
  };

  const onButtonClick = useCallback(() => {
    if (backgroundRef.current === null) return;
  
    loadAllImages(backgroundRef.current)
      .then(() => {
        return toPng(backgroundRef.current, {
          cacheBust: true,
          pixelRatio: 2, // mejora calidad (escala la resolución)
        });
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${CompToShow.titulo}.png`;
        link.href = dataUrl;
        link.click();
        console.log("📸 Imagen capturada");
      })
      .catch((err) => {
        console.error("❌ Error al capturar imagen:", err);
      });
  }, [backgroundRef]);
  
  
  if(admin){
    return (
      <div className={style.compToShow}>
        <div style={{ position: "relative"}}>
          <button onClick={(e)=>onButtonClick(e)}>📸 Capturar</button>
          <button onClick={(e)=>{closeComp(e)}}>❌ Close</button>
          <button onClick={() => setShowMovilnetLogo(prev => !prev)}>
            {showMovilnetLogo ? "🔁 Mostrar TFT Logo" : "🔁 Mostrar Movilnet Logo"}
          </button>
        </div>
        <div className={style.background} ref={backgroundRef}>
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
                  {`SET 14 META COMP [${version}]`}
                </div>
                <div className={style.titutloSecundario}>
                <span className={[style.titulo, style.tituloComp].join(" ")}>{CompToShow.titulo}</span>
                </div>
              </div>
              <div className={style.tags}>
                <div
                  className={style.dificultad}
                  style={{
                    border:`1px solid ${colorDificulty[CompToShow.dificultad]}`,
                    color:`${colorDificulty[CompToShow.dificultad]}`
                }}>
                  {CompToShow.dificultad}
                </div>
                <div className={style.category}>{CompToShow.infographicCategory}</div>
              </div>
            </div>
            <Composicion compo={CompToShow} showHide={true} admin={false} show={false} allwaysOpen={true}/>
            <div className={style.lowerStyle}>
              <div className={style.divJupesonLogo}>
                <img className={style.imgJupesonLogo} src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" alt=""></img>
              </div>
              {
                !showMovilnetLogo && 
              <div className={style.divWebLogo}>
                <img className={style.divWebLogo} src="/tft/assets/GP_logo.png" alt="logo Guiadeparche"></img>
                  <span className={style.textoWeb}>
                    TFT.GUIADEPARCHE.COM
                  </span>
              </div>
              }
              <div className={style.divSetTFTLogo}>
                <img className={style.imgSetTFTLogo} src="/tft/sets/14/logo.png" alt="TFT LOGO" />
              </div>
               {/* Mostrar logo según el estado */}
               {showMovilnetLogo && 
                <div className={style.divWebMovilnetLogo}>
                  <img className={style.imgMovilnetLogo} src="/tft/assets/logoMovilnet-eBlanco.png" alt="logo Guiadeparche" />
                </div>
               }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowBigCompScreen