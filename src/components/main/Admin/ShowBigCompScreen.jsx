import React, {useEffect, useState, useRef, useCallback} from "react";
import { useStore } from "@nanostores/react";
import {MetaComps as compos, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js";
import Composicion from "./Composicion.jsx";
import style from "./css/ShowBigCompScreen.module.css";
import { MetaCompVersion } from "src/stores/menuFiltradoAdmin.js";
import { setNumberLatest, setNumberPBE, versionTFT, constantesJSON } from "@stores/dataTFT.js";
import { toPng } from 'html-to-image';
// import html2canvas from "html2canvas";

const ShowBigCompScreen = ({id, setShowBigComp}) => {
  const colorDificulty= {Easy:"#008000",Medium:"#ffa500",Hard:"#ff0000"};
  const [showMovilnetLogo, setShowMovilnetLogo] = useState(true);
  const backgroundRef = useRef(null);
  const composMeta = useStore(compos);
  const [constantes, setConstantes] = useState({});
  const currentVersion = useStore(versionTFT);
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
      // ⚠️ Eliminar el lazy loading para forzar la carga inmediata
      if (img.loading === "lazy") {
        img.loading = "eager";
        img.src = img.src; // 🔥 fuerza recarga
      }
      if (img.complete && img.naturalWidth === 0) {
        console.warn("⚠️ Imagen rota:", img, img.src);
      }
      if (img.complete) {
        if (img.naturalWidth === 0) {
          promises.push(Promise.reject(`❌ Falló imagen: ${img.src}`));
        }
      } else {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () =>{
              reject(`❌ Falló imagen: ${img.src}`)};
          })
        );
      }
    });

    return Promise.allSettled(promises).then(results => {
      const errors = results.filter(r => r.status === "rejected");
      if (errors.length > 0) {
        throw new Error(`❌ ${errors.length} imágenes fallaron`);
      }
    });
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
  
  useEffect(() => {
  const preload = (src) => {
    const img = new Image();
    img.src = src;
  };

  preload(`/tiers/Tier-${CompToShow.tier}.webp`);
  preload("/tft/assets/Jupeson_LOGO_Sin_Publicidad.png");
  preload("/tft/assets/GP_logo.png");
  preload("/tft/sets/14/logo.png");
  preload("/tft/assets/logoMovilnet-e-rojo-con-blanco.png");
}, [CompToShow]);

useEffect(()=>{
  const fetchConstantes = async () => {
    try {
      const response = await fetch(constantesJSON, {cache:"reload"});
      const data = await response.json();
      console.log({constantes:data})
      setConstantes(data);
    } catch (error) {
      console.error("Error obteniendo constantes:", error);
    }
  };

  fetchConstantes();
},[])
  
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
          <div className={currentVersion === "pbe" ? style.backgroundPBE : style.background } ref={backgroundRef}>
            <div className={style.aspectWrapper}>
              <div className={style.upperStyle}>
                <div className={style.containerTierImg}>
                  <img
                  className={style.tierImg}
                  src={`/tiers/Tier-${CompToShow.tier}.webp`}
                  alt="Tier TFT" 
                  
                  />
                </div>
                <div className={style.titulos}>
                  <div className={style.tituloPrincipal}>
                    {`SET ${currentVersion === "pbe" ? setNumberPBE : setNumberLatest} META COMP [${currentVersion === "pbe" ? constantes.MetaCompVersionPBE : constantes.MetaCompVersion}]`}
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
                {showMovilnetLogo && 
                  <div className={style.divWebMovilnetLogo}>
                    <img className={style.imgMovilnetLogo} src="/tft/assets/logoMovilnet-e-letras-blancas.png" alt="logo Guiadeparche" />
                  </div>
                }
                <div className={style.divJupesonLogo}>
                  <img className={style.imgJupesonLogo} src="/tft/assets/Jupeson_LOGO_Sin_Publicidad_Sin_Bordes.png" alt=""></img>
                </div>
                {
                  !showMovilnetLogo && 
                <div className={style.divWebLogo}>
                  <img className={style.divWebLogo} src="/tft/assets/GP_logo.png" alt="logo Guiadeparche"></img>
                    <span className={style.textoWeb}>
                      GUIADEPARCHE.COM/TFT
                    </span>
                </div>
                }
                <div className={style.divSetTFTLogo}>
                  <img className={style.imgSetTFTLogo} src={`/tft/sets/${currentVersion === "pbe" ? setNumberPBE : setNumberLatest}/logo2.png`} alt="TFT LOGO" />
                </div>
                {/* Mostrar logo según el estado */}
                
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default ShowBigCompScreen