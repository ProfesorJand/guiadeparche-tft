import MiniInfoComp from "@components/TFT/MiniInfoComp.jsx";
import { useStore  } from "@nanostores/react";
import { useEffect,useState} from "react";
import { MetaComps as compos, loadCompsMeta, isLoadingDataTFTFromApi } from "src/stores/menuFiltradoAdmin.js";
import {constantesJSON} from "@stores/dataTFT.js"
import LogoGuiadeparche from "@components/logo/LogoGuiadeparche";
const InfografiaTFTComps = ({backgroundRef, setTituloInfografiaTFT, tituloInfografiaTFT, logoMovilnet, logoGuiadeparche}) =>{
  const colorDificulty= {Easy:"green",Medium:"orange",Hard:"red"}
  const composMeta = useStore(compos);
  const [composInInfographic, setComposInInfographic] = useState([]);
  const [constantes, setConstantes] = useState({});

  useEffect(() => {
    // Obtener las constantes actuales
    const fetchConstantes = async () => {
      try {
        const response = await fetch(constantesJSON,{cache:"no-cache"});
        const data = await response.json();
        setConstantes(data);
      } catch (error) {
        console.error("Error obteniendo constantes:", error);
      }
    };

    fetchConstantes();
  }, []);

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
    <div ref={backgroundRef} style={{
      width: "100%",
      aspectRatio: "4/5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 10px 20px 10px",
      boxSizing: "border-box",
      gap: "10px",
      position: "relative",
      zIndex: 0, // 👈 esto
    }}>
      {/* Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#000000",
        display: "flex",
        width: "100%",
        height: "100%",
        zIndex: -1, // 👈 esto
      }}>
        <img 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
            filter: "blur(4px)"
          }}
          src="/tft/assets/backgroundWrapperSet15.webp" 
          alt="Fondo Infografía TFT" 
          loading="lazy"/>
      </div>
      
      {/* header */}
      <div style={{
       width:"100%",
       height:heightContainers.header,
       display:"flex",
       flexDirection:"row",
       position:"relative",
      }}>
        {/* logo */}
        <img 
          src="/tft/assets/t-logo.png"
          alt="Logo Infografía TFT"
          loading="lazy"/>
        {/* titulo */}
        <span
          style={{
            position:"absolute",
            left:"50%",
            top:"50%",
            transform:"translate(-50%, -44%)",
            fontSize:"2rem",
            textAlign:"center",
            fontFamily:"'ObvioslyWideBold', sans-serif",
            fontWeight:"bold",
            width:"100%",
            lineHeight: 1,
            textTransform: "uppercase",
            textShadow: `0 0 5px #000000, 0 0 10px #000000, 0 0 15px #000000, 0 0 20px #000000`
          }}
        >{tituloInfografiaTFT}</span>
        {/* version */}
        <span
          style={{
            position:"absolute",
            right:"5px",
            top:"50%",
            transform:"translate(0, -50%)",
            fontSize:"1rem",
            textAlign:"center",
            fontFamily:"'ObvioslyWideBold', sans-serif",
            fontWeight:"bold",
            // textShadow: `0 0 5px #000000, 0 0 10px #000000, 0 0 15px #000000, 0 0 20px #000000`
          }}
        >{constantes?.MetaCompVersionPBE}</span>
      </div>

      {/* compos metas */}
      <div 
        style={{
          display:"flex",
          flexDirection:"column",
          width:"100%",
          height:heightContainers.body,
          justifyContent:"space-around",
        }}
      >
        {/* mostrar max 10 compos y que tengan el compo.isInInfographic en true */}
        {
  composInInfographic.map((compo, i) => {
    const dataCampeones = Object.keys(compo.boardInfo[compo.originalComp].data).map((key) => {
      const { dataCampeon, dataItem, estrellas } = compo.boardInfo[compo.originalComp].data[key];
      return {
        dataCampeon: dataCampeon.campeon,
        dataItem,
        estrellas
      };
    });

    return (
      <MiniInfoComp
        key={i}
        show={true}
        open={open}
        isOpen={false}
        compo={compo}
        admin={true}
        onToggle={() => {}}
        copyToClipboard={() => {}}
        generatorCodeBuilder={() => {}}
        colorDificulty={colorDificulty}
        dataCampeones={dataCampeones}
        handleEditID={() => {}}
        ShowBigComp={() => {}}
        deleteId={() => {}}
        forInfografia={true}
      />
    );
  })
}
      </div>

      {/* Footer */}
      <div style={{
        width:"100%",
        height:heightContainers.footer,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        position:"relative",
        bottom:0,
      }}>
            {/* logo jupeson */}
            <div
            style={{
                width: "30%",
                height:"100%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <img 
                src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" 
                alt="Logo" 
                style={{
                  transform: `scale(1)`,
                  height: "auto",
                  width: "100%",
                  objectFit: "contain",
                  opacity: "0.8"
                }}
              />
            </div>
        {/* Logo movilnet */}
        {
          logoMovilnet && 
          <div
          style={{
            width: "30%",
            height:"100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img 
            src="/tft/assets/logoMovilnet-e-letras-blancas.png" 
            alt="Sponsor" 
            style={{
              transform: `scale(1)`,
              height: "auto",
              width: "100%",
              objectFit: "contain",
              opacity: "0.8"
            }}
          />
        </div>}
        {
          logoGuiadeparche && 
          <div
        style={{
            width: "30%",
            height:"100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
        
          <LogoGuiadeparche/>
        </div>
        }

        {/* logo ko coliseum tft */}
        <div
        style={{
            width: "30%",
            height:"100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img 
            src="/tft/sets/16/logo2.png" 
            alt="Logo" 
            style={{
              transform: `scale(0.6)`,
              height: "auto",
              width: "100%",
              objectFit: "fit",
              opacity: "0.8"
            }}
          />
        </div>
      </div>
    </div>
  )

}

export default InfografiaTFTComps