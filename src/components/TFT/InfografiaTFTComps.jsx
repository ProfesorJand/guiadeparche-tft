import MiniInfoComp from "@components/TFT/MiniInfoComp.jsx";
import { useStore  } from "@nanostores/react";
import { useEffect,useState} from "react";
import { MetaComps as compos, loadCompsMeta, isLoadingDataTFTFromApi } from "src/stores/menuFiltradoAdmin.js";
import {constantesJSON, constantesTFT, versionTFT, setNumberPBE, setNumberLatest} from "@stores/dataTFT.js"
import LogoGuiadeparche from "@components/logo/LogoGuiadeparche";
import  CardCompos from "@components/TFT/CardsCompos.jsx";
import style from "./css/InfografiaTFTComps.module.css";

const InfografiaTFTComps = ({backgroundRef, setTituloInfografiaTFT, tituloInfografiaTFT, logoMovilnet, logoGuiadeparche, webInfografia = false}) =>{
  const colorDificulty= {Easy:"green",Medium:"orange",Hard:"red"}
  const composMeta = useStore(compos);
  const [composInInfographic, setComposInInfographic] = useState([]);
  // const [constantes, setConstantes] = useState({});
  const currentVersion = useStore(versionTFT);
  const constantes = useStore(constantesTFT);

  // useEffect(() => {
  //   // Obtener las constantes actuales
  //   const fetchConstantes = async () => {
  //     try {
  //       const response = await fetch(constantesJSON,{cache:"no-cache"});
  //       const data = await response.json();
  //       setConstantes(data);
  //     } catch (error) {
  //       console.error("Error obteniendo constantes:", error);
  //     }
  //   };

  //   fetchConstantes();
  // }, []);

  const heightContainers = {
    header: "8%",
    body: "82%",
    footer: "10%",
  }

useEffect(() => {
  if (!composMeta) return;

  // 1️⃣ Aplanamos todos los tiers en un solo array
  const todos = composMeta.flat();

  // 2️⃣ Filtramos solo los que tengan isInInfographic === true
  const filtrados = todos.filter(c => c.isInInfographic === true);

  // 3️⃣ Nos quedamos con los primeros 10
  const cantidadDeCompos = filtrados.slice(0, 4);

  setComposInInfographic(cantidadDeCompos);
}, [composMeta]);
      


  return (
    <div ref={backgroundRef} className={style.container}>
      {/* Background */}
      <div className={style.backgroundContainer}>
        <img 
          className={style.backgroundImage}
          src="/tft/sets/17/backgroundWrapperSet17.webp" 
          alt="Fondo Infografía TFT" 
          loading="lazy"/>
      </div>
      
      {/* header */}
      <div className={style.header}>
        {/* logo */}
        <img 
          className={style.headerLogo}
          src="/tft/assets/t-logo.png"
          alt="Logo Infografía TFT"
          loading="lazy"/>
        {/* titulo */}
        <span className={style.title}>{tituloInfografiaTFT}</span>
        {/* version */}
        <span className={style.version}>{constantes?.MetaCompVersionPBE}</span>
      </div>

      {/* compos metas */}
      <div className={style.body}>
        {/* mostrar max 10 compos y que tengan el compo.isInInfographic en true */}
        {
  composInInfographic.map((compo, i) => {
    // const dataCampeones = Object.keys(compo.boardInfo[compo.originalComp].data).map((key) => {
    //   const { dataCampeon, dataItem, estrellas } = compo.boardInfo[compo.originalComp].data[key];
    //   return {
    //     dataCampeon: dataCampeon.campeon,
    //     dataItem,
    //     estrellas
    //   };
    // });

    return (
      // <MiniInfoComp
      //   key={i}
      //   show={true}
      //   open={open}
      //   isOpen={false}
      //   compo={compo}
      //   admin={true}
      //   onToggle={() => {}}
      //   copyToClipboard={() => {}}
      //   generatorCodeBuilder={() => {}}
      //   colorDificulty={colorDificulty}
      //   dataCampeones={dataCampeones}
      //   handleEditID={() => {}}
      //   ShowBigComp={() => {}}
      //   deleteId={() => {}}
      //   forInfografia={true}
      //   webInfografia={webInfografia}
      // />
      <CardCompos comp={compo} numeracion={i+1} isInfografia={true} edit={false}/>
    );
  })
}
      </div>

      {/* Footer */}
      <div className={style.footer}>
        {/* Logo movilnet */}
        {
          logoMovilnet && 
          <div className={style.logoWrapper}>
          <img 
            src="/tft/assets/logoMovilnet-e-letras-blancas.png" 
            alt="Sponsor" 
            className={style.logoImage}
          />
        </div>}
        {/* logo jupeson */}
        <div className={style.logoWrapper}>
          <img 
            src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" 
            alt="Logo" 
            className={style.logoImage}
          />
        </div>
        {
          logoGuiadeparche && 
          <div className={style.logoWrapper}>
            <LogoGuiadeparche/>
          </div>
        }

        {/* logo ko coliseum tft */}
        <div className={style.logoWrapper}>
          <img 
            src={`/tft/sets/${currentVersion === "pbe" ? setNumberPBE : setNumberLatest}/logo2.${currentVersion === "pbe" ? "webp" : "png"}`}
            alt="Logo" 
            className={style.logoImage}
          />
        </div>
      </div>
    </div>
  )

}

export default InfografiaTFTComps