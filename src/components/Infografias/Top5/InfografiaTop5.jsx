import Style from './InfografiaTop5.module.css';
import { useEffect, useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import InfografiaForm from './InfografiaForm';
import Preview from './Preview';



const InfografiaTop5 = () => {
  const [isLoged, setIsLoged] = useState(localStorage.getItem("login") || false);
  const backgroundRef = useRef(null);
  const containerTituloRef = useRef(null)
  const containerLogosRef = useRef(null);
  const itemsRefs = useRef(null)

  const [infografia, setInfografia] = useState({
    titulo: "Título de la Infografía",
    defaultTituloSize: "50px",
    tituloSize: "50px",
    defaultTituloAling: "center",
    tituloAling:"center",
    colorTitulo: "white",
    defaultTituloHorizontal: "0px",
    defaultTituloVertical:"0px",
    backgroundMiniLeyenda:  "#000000",
    paddingMiniLeyenda: "5px",
    defaultMiniLeyendaHorizontal:"2%",
    defaultMiniLeyendaVertical:"60%",
    imgBackground: "https://cdn.communitydragon.org/latest/champion/Aatrox/splash-art/centered",
    logoJupeson: true,
    logoMovilnet: true,
    justifyContentFooter: "space-around",
    fontSizeNumber: "48px",
    colorNumber: "white",
    backgroundColorNumber: "rgba(0,0,0,0.5)",
    backgroundColorBase: "#000000",   // color sólido
    backgroundColorAlpha: 0.5,        // opacidad
    widthNumber: "80px",
    heightNumber: "80px",
    borderRadiusNumber: "50%",
    Top5Data: [
      { info: "Info 1", defaultColorInfo:"#000000", defaultInfoBackgroundColor:null, defaultTextInfo:"24px", defaultHorizontalInfo:"30px", defaultTextWeightInfo:400, value: "Value 1", defaultColorValue:"#ffffff", defaultValueBackgroundColor:null, defaultTextSize:"50px", defaultHorizontalSize:"90px", defaultTextWeightSize:800, image: null, top: "0px", left: "0px", width: "100%", height: "100%", widthFather:"100%", objectFit: "cover", colorBorderBaseLogo: "#000000", colorBorderLogo: "rgba(0,0,0,1)", alphaBorderLogo:1  },
      { info: "Info 2", defaultColorInfo:"#000000", defaultInfoBackgroundColor:null, defaultTextInfo:"24px", defaultHorizontalInfo:"30px", defaultTextWeightInfo:400, value: "Value 2", defaultColorValue:"#ffffff", defaultValueBackgroundColor:null, defaultTextSize:"50px", defaultHorizontalSize:"90px", defaultTextWeightSize:800, image: null, top: "0px", left: "0px", width: "100%", height: "100%", widthFather:"100%", objectFit: "cover", colorBorderBaseLogo: "#000000", colorBorderLogo: "rgba(0,0,0,1)", alphaBorderLogo:1 },
      { info: "Info 3", defaultColorInfo:"#000000", defaultInfoBackgroundColor:null, defaultTextInfo:"12px", defaultHorizontalInfo:"30px", defaultTextWeightInfo:400, value: "Value 3", defaultColorValue:"#ffffff", defaultValueBackgroundColor:null, defaultTextSize:"50px", defaultHorizontalSize:"90px", defaultTextWeightSize:800, image: null, top: "0px", left: "0px", width: "100%", height: "100%", widthFather:"100%", objectFit: "cover", colorBorderBaseLogo: "#000000", colorBorderLogo: "rgba(0,0,0,1)", alphaBorderLogo:1 },
      { info: "Info 4", defaultColorInfo:"#000000", defaultInfoBackgroundColor:null, defaultTextInfo:"12px", defaultHorizontalInfo:"30px", defaultTextWeightInfo:400, value: "Value 4", defaultColorValue:"#ffffff", defaultValueBackgroundColor:null, defaultTextSize:"50px", defaultHorizontalSize:"90px", defaultTextWeightSize:800, image: null, top: "0px", left: "0px", width: "100%", height: "100%", widthFather:"100%", objectFit: "cover", colorBorderBaseLogo: "#000000", colorBorderLogo: "rgba(0,0,0,1)", alphaBorderLogo:1 },
      { info: "Info 5", defaultColorInfo:"#000000", defaultInfoBackgroundColor:null, defaultTextInfo:"12px", defaultHorizontalInfo:"30px", defaultTextWeightInfo:400, value: "Value 5", defaultColorValue:"#ffffff", defaultValueBackgroundColor:null, defaultTextSize:"50px", defaultHorizontalSize:"90px", defaultTextWeightSize:800, image: null, top: "0px", left: "0px", width: "100%", height: "100%", widthFather:"100%", objectFit: "cover", colorBorderBaseLogo: "#000000", colorBorderLogo: "rgba(0,0,0,1)", alphaBorderLogo:1 },
    ],
    // Logos
    defaultScaleLogoJupeson:1,
    defaultScaleLogoMovilnet:1,
    scaleLogoJupeson:1,
    scaleLogoMovilnet:1,
    defaultWidthLogoJupeson: "100%",
    defaultWidthLogoMovilnet: "100%",
    widthLogoJupeson: "30%",
    widthLogoMovilnet: "50%",
    defaultLogoLeftJupeson:"20%",
    defaultLogoLeftMovilnet:"63%",
    leftLogoJupeson: null,
    leftLogoMovilnet: null,
    defaulttopLogoJupeson: "50%",
    defaulttopLogoMovilnet: "50%",
    topLogoJupeson: "50%",
    topLogoMovilnet: "50%",
    translateLogoJupeson: "translate(-50%, -50%)",
    translateLogoMovilnet: "translate(-50%, -50%)",
    defaultLogoJupesonAlpha: 1,
    defaultLogoMovilnetAlpha: 1,
    hideNumber: false
    
  }
);

  useEffect(() => {
    const admin = localStorage.getItem("user") || false;
    setIsLoged(!!admin);
  }, []);

  useEffect(()=>{
    if(!isLoged) window.location.href = "https://guaideparche.com";
  },[isLoged])

  useEffect(()=>{
    setInfografia(prev=>({...prev, 
      widthContainer:backgroundRef.current.offsetWidth,
      heightContainer:backgroundRef.current.offsetHeight
    }))
    console.log({widthContainer:backgroundRef.current.offsetWidth,
      heightContainer:backgroundRef.current.offsetHeight})
  },[backgroundRef])

    useEffect(()=>{
    setInfografia(prev=>({...prev, 
      widthContainerTitulo:containerTituloRef.current.offsetWidth,
      heightContainerTitulo:containerTituloRef.current.offsetHeight
    }))
    // console.log({widthContainerTitulo:containerTituloRef.current.offsetWidth,
    //   heightContainerTitulo:containerTituloRef.current.offsetHeight})
  },[containerTituloRef])

    useEffect(()=>{
    setInfografia(prev=>({...prev, 
      widthItemsContainer:itemsRefs.current.offsetWidth,
      heightItemsContainer:itemsRefs.current.offsetHeight
    }))
    // console.log({widthItemsContainer:itemsRefs.current.offsetWidth,
    //   heightItemsContainer:itemsRefs.current.offsetHeight})
  },[itemsRefs])

  useEffect(()=>{
    setInfografia(prev=>({...prev, 
      widthContainerFooter:containerTituloRef.current.offsetWidth,
      heightContainerFooter:containerTituloRef.current.offsetHeight
    }))
    console.log({widthContainerFooter:containerTituloRef.current.offsetWidth,
      heightContainerFooter:containerTituloRef.current.offsetHeight})
  },[containerLogosRef])

  // 🔹 Asegurar que todas las imágenes están cargadas
  const loadAllImages = (container) => {
    const images = container.querySelectorAll("img");
    const promises = [];

    images.forEach((img) => {
      if (img.loading === "lazy") img.loading = "eager";
      if (!img.complete) {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () => reject(`❌ Falló imagen: ${img.src}`);
          })
        );
      }
    });

    return Promise.allSettled(promises).then(results => {
      const errors = results.filter(r => r.status === "rejected");
      if (errors.length > 0) throw new Error(`❌ ${errors.length} imágenes fallaron`);
    });
  };

  // 🔹 Exportar como PNG
  const onButtonClick = useCallback(() => {
    if (!backgroundRef.current) return;

    loadAllImages(backgroundRef.current)
      .then(() => toPng(backgroundRef.current, { cacheBust: true, pixelRatio: 2 }))
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Prueba-Infografia.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("❌ Error al capturar imagen:", err));
  }, [backgroundRef]);

  return (
    <div className={Style.FullContainer}>
      <InfografiaForm infografia={infografia} setInfografia={setInfografia} onButtonClick={onButtonClick} />
      <Preview infografia={infografia} backgroundRef={backgroundRef} setInfografia={setInfografia} containerLogosRef={containerLogosRef} containerTituloRef={containerTituloRef} itemsRefs={itemsRefs}/>  
    </div>
  );
};

export default InfografiaTop5;
