import { urlDragon, urlComposiciones, dataTFTChampions, dataTFTAllItems } from "@stores/dataTFT";
import style from "./css/GuiaFreeTFTMeta.module.css";
import Sinergias from "@components/main/Admin/Sinergias";
import { useState, useRef, useEffect } from "react";
import { useStore } from "@nanostores/react";
import NuevoBuilderTFT from "./NuevoBuilderTFT";
import Tooltip from "@components/tooltips";
import CampeonesNivel from "@components/TFT/elementosInfografia/CampeonesNivel"
import ImgItem from "./ImgItem";
const GuiaFreeTFTMeta = ({comp, isInfografia=false, edit=false, isIndividual=false}) => {
  const [hoveredAugment, setHoveredAugment] = useState(null);
  const augmentRef = useRef(null);
  const tooltipRef = useRef(null);
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    function handleClickOutside(event) {
      // Si se hace clic fuera del contenedor de aumentos Y fuera del tooltip, limpiamos el estado
      if (
        augmentRef.current && !augmentRef.current.contains(event.target) &&
        (!tooltipRef.current || !tooltipRef.current.contains(event.target))
      ) {
        setHoveredAugment(null);
      }
    }

    // Escucha clics (PC) y toques (Móviles)
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const safeChampionsTFT = isMounted ? allChampionsTFT : [];
  const safeItemsTFT = isMounted ? allItemsTFT : [];

  return(
    <div className={style.container}>
      <Header1 comp={comp} allChampionsTFT={safeChampionsTFT} allItemsTFT={safeItemsTFT} ></Header1>
      <Header2 comp={comp} setHoveredAugment={setHoveredAugment} augmentRef={augmentRef} allChampionsTFT={safeChampionsTFT} allItemsTFT={safeItemsTFT} ></Header2>
      {/* <FooterTooltip augment={hoveredAugment} tooltipRef={tooltipRef} edit={edit} isInfografia={isInfografia}></FooterTooltip> */}
      <FooterBuild comp={comp}></FooterBuild>
      <FooterLogos edit={edit} ></FooterLogos>
    </div>
  );
};

export default GuiaFreeTFTMeta;

const Header1 = ({comp, allChampionsTFT, allItemsTFT})=>{


  // 1. Campeones Early
  const niveles = comp?.niveles?.[0]?.campeones || [];

  // 2. Items Prio
  const itemsPrio = comp?.itemsPrio?.slice(0, 4) || [];

  // 3. Condicion OP
  const condiciones = comp?.condiciones || [];
  let condicionOP = condiciones.find(c => c.early && c.op);
  if (!condicionOP) {
    condicionOP = condiciones.find(c => c.early);
  }

  return (
    <div className={style.blockBody}>
      <div className={`${style.blockEarlyGame} ${style.borderBlock}`}>
        <h4>Mejores Salida de Campeones Early</h4>
        <div className={style.earlyChampionsContainer}>
          <CampeonesNivel comp={comp} isEarly={true}/>
          {/* {
            niveles?.map((data, index) => {
              const championData = allChampionsTFT.find(c => c.apiName === data?.apiNameCampeon || data.apiName);
              if (!championData) return null;
              return (
                <div key={`earlyChampion-${index}`} className={style.championImgItems}>
                  <div
                    className={`${style.championImageWrapper} ${style[`champSquareCost${championData?.coste}`]}`}
                  >
                    <img
                      className={style.championImg}
                      src={urlDragon() + championData?.tileIcon?.toLowerCase()?.replace(".tex", ".png")}
                      alt={championData?.name}
                    />
                  </div>
                  {data?.apiNameItemsDelCampeon && data?.apiNameItemsDelCampeon.length > 0 && (
                    <div className={style.itemsContainer}>
                      {data.apiNameItemsDelCampeon.map((itemName, idx) => {
                        const itemData = allItemsTFT.find(i => i.apiName === itemName);
                        return itemData && (
                          <img
                            key={`item-earlyChampion-${index}-${idx}`}
                            className={style.itemImg}
                            src={
                              itemData?.icon?.includes("http")
                                ? itemData?.icon
                                : urlDragon() + itemData?.icon?.toLowerCase().replace(".tex", ".png")
                            }
                            alt={itemData?.name}
                          />
                        )
                      })}
                    </div>
                  )}
                  <div className={style.championInfo}>
                    <span className={style.championName}>
                      {championData?.name}
                    </span>
                  </div>
              </div>
              )
            })
          } */}
        </div>
      </div>
      
      {/* Condicion OP */}
      <div className={`${style.blockBestRadiant} ${style.borderBlock}`}>
          <h4>Condiciones OP (Early)</h4>
          <div className={style.containerCondicion}>
            {condicionOP && (() => {
                let busquedaGrande;
                let busquedaPequeno;
                const extras = ["Win Streak","Loss Streak","Orbe","3 estrellas","4 estrellas"];
                
                // API NAME GRANDE
                if(extras.includes(condicionOP.apiNameGrande)){
                  busquedaGrande = `/tft/assets/${condicionOP.apiNameGrande.replace(" ","")}.webp`;
                }else{
                  const filtrado = allItemsTFT.find((x) => x.apiName === condicionOP.apiNameGrande)?.icon || allChampionsTFT.find((x) => x.apiName === condicionOP.apiNameGrande)?.tileIcon;
                  busquedaGrande = filtrado ? urlDragon()+filtrado.toLowerCase().replace(".tex",".png").replace("/augments/hexcore/","/augments/choiceui/") : "";
                }
                
                // API NAME PEQUENO
                if(extras.includes(condicionOP.apiNamePequeno)){
                  busquedaPequeno = `/tft/assets/${condicionOP.apiNamePequeno.replace(" ","")}.webp`;
                }else{
                  const filtrado = allItemsTFT.find((x) => x.apiName === condicionOP.apiNamePequeno)?.icon || allChampionsTFT.find((x) => x.apiName === condicionOP.apiNamePequeno)?.tileIcon;
                  busquedaPequeno = filtrado ? urlDragon()+filtrado.toLowerCase().replace(".tex",".png").replace("/augments/hexcore/","/augments/choiceui/") : "";
                }

                return (
                  <div className={style.condicionOpEarly}>
                    {condicionOP.apiNameGrande && busquedaGrande && 
                      <img className={style.condicionGrandeImg} src={busquedaGrande} alt="condicion grande"/>
                    }
                    {condicionOP.apiNamePequeno && busquedaPequeno &&
                      <img className={style.condicionPequenoImg} src={busquedaPequeno} alt="condicion pequeña"/>
                    }
                  </div>
                );
            })()}
            <a href="/login" target="_blank" className={style.condicionOpEarly}>
              <Tooltip type="default" text="Master Plan">
              <img src="/web/logoGPMP.webp" alt="Master Plan" className={style.imgMasterPlan}/>
              </Tooltip>
            </a>
          </div>
      </div>

      {/* Items Prio */}
      <div className={`${style.blockItems} ${style.borderBlock}`}>
          <h4>Prioridad de Objetos</h4>
          <div className={style.itemsCarouselContainer}>
            {itemsPrio.map((itemName, index) => {
              const itemData = allItemsTFT.find(i => i.apiName === itemName);
              return itemData ? [
                <div key={`itemPrio-${index}`} className={style.carouselItem}>
                  {/* <Tooltip type="item" item={itemData}>
                    <img
                      className={style.bigItemImg}
                      src={itemData?.icon?.includes("http") ? itemData?.icon : urlDragon() + itemData?.icon?.toLowerCase().replace(".tex", ".png")}
                      alt={itemData?.name}
                      />
                  </Tooltip> */}
                  <ImgItem item={itemData} />
                </div>,
                index < itemsPrio.length - 1 ? <span key={`itemPrio-gt-${index}`} className={style.mayorQue}>{'>'}</span> : null
              ] : null;
            })}
          </div>
      </div>
    </div>
  )
}

const Header2 = ({comp, setHoveredAugment, augmentRef,  allChampionsTFT, allItemsTFT})=>{

  // 3. Condicion OP
  const condiciones = comp?.condiciones || [];
  let condicionOP = condiciones.find(c => !c.early && c.op);
  if (!condicionOP) {
    condicionOP = condiciones.find(c => !c.early);
  }

  // Aumentos
  const aumentosVisibles = comp?.aumentos?.slice(0, 5) || [];

  // Solo aplicamos el hover si el dispositivo tiene capacidades de puntero (PC)
  const handleMouseEnter = (augment) => {
    if (window.matchMedia('(hover: hover)').matches) {
      setHoveredAugment(augment);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setHoveredAugment(null);
    }
  };

  const handleClick = (augment) => {
    // Al hacer click/tap, alternamos (toggle) para que también se pueda cerrar al volver a pulsar
    setHoveredAugment((prev) => (prev?.name === augment?.name ? null : augment));
  };

  return (
    <div className={`${style.blockBody} ${style.containerAugmentsPosition}`}>
      <div className={`${style.containerSideBlock}`}> 


        <div className={`${style.borderBlock} ${style.blockColumn}`}>
            <h4>Aumentos</h4>
          <div ref={augmentRef} className={style.containerAugments} style={{display:"flex", gap:"5px", flexWrap:"wrap", alignItems:"center"}}>
            {
              aumentosVisibles?.map((augmentRaw, index) => {
                const augment = allItemsTFT.find(x => x.apiName === augmentRaw?.apiNameGrande) || augmentRaw;
                if (!augment?.icon) {
                  // Fallback para strings especiales como "Win Streak" si es que existen
                  const extras = ["Win Streak", "Loss Streak", "Orbe"];
                  if(extras.includes(augmentRaw?.apiNameGrande)){
                    return (
                      <div className={style.augmentContainer} key={index}>
                        <ImgItem item={augmentRaw}></ImgItem>
                      </div>
                    )
                  }
                  return null;
                }
                return (
                  <div 
                    className={style.augmentContainer} 
                    key={index}
                    onMouseEnter={() => handleMouseEnter(augment)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(augment)}
                  >
                    <ImgItem item={augment}/>
                  </div>
                )
              })
            }
              <a href="/login" target="_blank"className={style.augmentContainer}>
            <Tooltip type="default" text="Master Plan">
                <img src={"/web/logoGPMP.webp"} className={style.imgMasterPlan}/>
            </Tooltip>
              </a>
          </div>
        </div>
        <div className={`${style.borderBlock} ${style.blockColumn}`}>
            <h4>Condiciones OP</h4>
            <div className={style.containerCondicionesOP}>

            {condicionOP && (() => {
              let busquedaGrande;
              let busquedaPequeno;
              const extras = ["Win Streak","Loss Streak","Orbe"];
              
              // API NAME GRANDE
              if(extras.includes(condicionOP.apiNameGrande)){
                busquedaGrande = `/tft/assets/${condicionOP.apiNameGrande.replace(" ","")}.webp`;
              }else{
                const filtrado = allItemsTFT.find((x) => x.apiName === condicionOP.apiNameGrande)?.icon || allChampionsTFT.find((x) => x.apiName === condicionOP.apiNameGrande)?.tileIcon;
                busquedaGrande = filtrado ? urlDragon()+filtrado.toLowerCase().replace(".tex",".png").replace("/augments/hexcore/","/augments/choiceui/") : "";
              }
              
              // API NAME PEQUENO
              if(extras.includes(condicionOP.apiNamePequeno)){
                busquedaPequeno = `/tft/assets/${condicionOP.apiNamePequeno.replace(" ","")}.webp`;
              }else{
                const filtrado = allItemsTFT.find((x) => x.apiName === condicionOP.apiNamePequeno)?.icon || allChampionsTFT.find((x) => x.apiName === condicionOP.apiNamePequeno)?.tileIcon;
                busquedaPequeno = filtrado ? urlDragon()+filtrado.toLowerCase().replace(".tex",".png").replace("/augments/hexcore/","/augments/choiceui/") : "";
              }

              return (
                <div className={style.containerOp}>
                  {condicionOP.apiNameGrande && busquedaGrande && 
                    <img className={style.condicionGrandeImg} src={busquedaGrande} alt="condicion grande"/>
                  }
                  {condicionOP.apiNamePequeno && busquedaPequeno &&
                    <img className={style.condicionPequenoImg} src={busquedaPequeno} alt="condicion pequeña"/>
                  }
                </div>
              );
            })()}
            <a href="/login" target="_blank" className={style.containerOp}>
              <Tooltip type="default" text="Master Plan">
              <img src="/web/logoGPMP.webp" alt="Master Plan" className={style.imgMasterPlan}/>
              </Tooltip>
            </a>
          </div>
        </div>
        {/* boton de plan B */}
        <div className={`${style.borderBlock} ${style.blockRow}`}>
          <h4>Plan B</h4>
          <a href="/login" target="_blank" className={style.planBContainer}>
            <Tooltip type="default" text="Master Plan">
            <img src="/web/logoGPMP.webp" alt="Master Plan" className={style.imgMasterPlan}/>
            </Tooltip>
          </a>
        </div>
      </div>
      <Posicionamiento comp={comp}/>

    </div>
  )
}

const Posicionamiento = ({comp})=>{
  return (
    <div className={`${style.borderBlock} ${style.containerPosicionamientoBlock}`}>
      <h4>Posicionamiento</h4>
      <div className={style.containerSinergiasActivas}>
        <Sinergias sinergias={comp?.posicionamiento?.[0]?.tablero} orientacion={"vertical"} show={true} version={"latest" || comp?.version} />
      </div>
      <NuevoBuilderTFT customTablero={comp?.posicionamiento?.[0]?.tablero} readOnly={true} />
    </div>
  )
}

const formatAugmentDescription = (desc, effects) => {
  if (!desc) return "";
  if (!effects) return desc;

  // CONFIGURACIÓN: Elige el comportamiento para los decimales
  // 'toFixed' -> Máximo 2 decimales sin ceros inútiles al final (ej: 35.53 o 35.5)
  // 'round'   -> Redondear al entero más cercano (ej: 36)
  const decimalMode = "toFixed"; 

  // 1. Reemplazar las variables encerradas en @
  let formatted = desc.replace(/@([^@]+)@/g, (match, formula) => {
    let variableName = formula;
    let operator = null;
    let operand = 1;

    // Buscar operadores (* o /)
    if (formula.includes("*")) {
      const parts = formula.split("*");
      variableName = parts[0].trim();
      operator = "*";
      operand = parseFloat(parts[1]) || 1;
    } else if (formula.includes("/")) {
      const parts = formula.split("/");
      variableName = parts[0].trim();
      operator = "/";
      operand = parseFloat(parts[1]) || 1;
    }

    // Buscar el valor en effects (búsqueda exacta o insensible a mayúsculas/minúsculas)
    let rawValue = undefined;
    if (effects[variableName] !== undefined) {
      rawValue = effects[variableName];
    } else {
      const matchedKey = Object.keys(effects).find(
        (key) => key.toLowerCase() === variableName.toLowerCase()
      );
      if (matchedKey) {
        rawValue = effects[matchedKey];
      }
    }

    // Si no existe en los efectos, devolvemos vacío ("") para no mostrar el tag crudo
    if (rawValue === undefined) {
      return ""; 
    }

    let calculatedValue = parseFloat(rawValue);
    if (isNaN(calculatedValue)) return rawValue; 

    if (operator === "*") {
      calculatedValue = calculatedValue * operand;
    } else if (operator === "/") {
      calculatedValue = calculatedValue / operand;
    }

    if (decimalMode === "round") {
      return Math.round(calculatedValue).toString();
    } else {
      return (Number(calculatedValue.toFixed(2))).toString();
    }
  });

  // 2. Limpieza de etiquetas de tracking vacías (ej: <tftitemrules>Damage dealt: </tftitemrules>)
  // Esto elimina cualquier etiqueta personalizada que haya quedado huérfana debido a variables no encontradas
  formatted = formatted.replace(/<([a-z0-9_-]+)>[^<]*:\s*<\/\1>/gi, "");

  // 3. Eliminar saltos de línea sobrantes/huérfanos al final de la descripción
  formatted = formatted.replace(/(<br\s*\/?>)+$/gi, "");

  return formatted;
};

const FooterTooltip = ({augment, tooltipRef, edit=false, isInfografia=false})=>{
  if (!augment) {
    return (
      <div ref={tooltipRef} className={`${style.footerTooltipPlaceholder} ${!isInfografia && edit ? "hideForCapture" : ""}`}>
        <p className={style.placeholderText}>
          Pasa el cursor sobre un aumento para ver su descripción y efectos
        </p>
      </div>
    );
  }

  return (
    <div ref={tooltipRef} className={`${style.footerTooltipContainer}`}>
      <div className={style.footerTooltipHeader}>
        <img 
          className={style.footerTooltipIcon} 
          src={
            urlDragon() +
            augment?.icon
            .toLowerCase()
            .replace(".tex", ".png")
          } 
          alt={augment?.name}
        />
        <h5 className={style.footerTooltipName}>{augment?.name}</h5>
      </div>
      <div className={style.footerTooltipBody}>
        <p 
          className={style.footerTooltipDesc}
          dangerouslySetInnerHTML={{
            __html: formatAugmentDescription(augment?.desc, augment?.effects)
          }}
        />
        {Object.keys(augment?.effects || {}).length > 0 && (
          <div className={style.footerTooltipEffects}>
            {Object.keys(augment.effects).map((variable, i)=>(
              <span className={style.footerTooltipEffectItem} key={i}>
                <strong>{variable}:</strong> {augment.effects[variable]}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const FooterBuild = ({comp})=>{
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const safeChampionsTFT = isMounted ? allChampionsTFT : [];
  const safeItemsTFT = isMounted ? allItemsTFT : [];

  return (
    <div className={`${style.containerFooterBuild} ${style.borderBlock} ${style.blockColumn}`}>
      <h4>Mejores Builds/Objetos para Carry y Tanque</h4>
      <div className={style.containerBuilders}>
      {
        comp?.bestBuild?.length > 0 &&
        comp?.bestBuild.map((data,index)=>{
          const buildChampionData = safeChampionsTFT.find(c => c.apiName === data?.apiNameCampeon);
          
          // Flatten first arrays of BIS and Special BIS to render in the Footer
          const bisItemsData = (data.apiNameItemsBisDelCampeon?.[0] || []).slice(0, 3).map(itemName => safeItemsTFT.find(i => i.apiName === itemName)).filter(Boolean);
          const specialBisItemsData = (data.apiNameItemsSpecialBisDelCampeon?.[0] || []).slice(0, 3).map(itemName => safeItemsTFT.find(i => i.apiName === itemName)).filter(Boolean);

          return (
            <div key={index} className={style.containerBuild}>
              <div className={style.containerBuildCard}>
                <h4>{buildChampionData?.name}</h4>
                {buildChampionData && (
                  <div className={style.buildCampeonItems}>
                    <img 
                      src={urlDragon() + buildChampionData?.icon?.toLowerCase().replace(".tex", ".png")} 
                      alt={buildChampionData?.name} 
                      className={style.buildChampionImg}
                      title="BIS"
                    />
                    <div className={style.containerBuildItemImg}>
                      {/* {bisItemsData.length > 0 && <span className={style.buildItemText}>BIS</span>} */}
                      {bisItemsData.map((item, idx) => (
                        <div key={`build-item-${idx}`} className={style.cItemBuild}>
                          <ImgItem item={item}/>                      
                        </div>
                      ))}
                    </div>
                    <div className={style.containerBuildItemImg}>
                      {/* {specialBisItemsData.length > 0 && <span className={style.buildItemText}>BIS ESPECIAL</span>} */}
                      {specialBisItemsData.map((item, idx) => (
                        <div key={`build-item-special-${idx}`} className={style.cItemBuild}>
                          <ImgItem item={item} />
                        </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })
      }
      <a href="/login" target="_blank" className={`${style.containerVerMasBuilds} ${style.containerBuild}`}>
        <Tooltip type="default" text="Master Plan">
        <img src="/web/logoGPMP.webp" alt="Logo Guiadeparche Master Plan" className={`${style.imgMasterPlan}`} />
        </Tooltip>
      </a>
      </div>
    </div>
  )
}

const FooterLogos = ({edit})=>{
  if(!edit) return null;
  const [logos, setLogos] = useState([{
    label: "Jupeson",
    url:"/Jupeson_LOGO_Sin_Publicidad_Sin_Bordes.png",
    show: true
  },{
    label: "Guiadeparche",
    url:"/web/logoGPSinFondo2026.webp",
    show: true
  },{
    label: "Movilnet",
    url:"/tft/assets/logoMovilnet-e-letras-blancas.png",
    show: false
  },{
    label: "SetTFT",
    url:"/tft/sets/17/logo2.webp",
    show: true
  }])
  
  return (
    <div className={style.panelControlLogos}>
      <div className={`hideForCapture ${style.controlesLogos}`}>
        {logos.map((logo, index) => (
          <div className={style.containerInputsLogo} key={index}>
            <input 
              type="checkbox" 
              checked={logo.show} 
              onChange={(e) => setLogos(logos.map((l, i) => i === index ? { ...l, show: e.target.checked } : l))}
            />
            <span>{logo.label}</span>
          </div>
        ))}
      </div>
      <div className={style.containersLogos}>
      {logos.filter(logo => logo.show).map((logo, index) => (
        <div key={index} className={style.containerLogo}>
          <img className={`${style.imgLogo} ${logo.label === "SetTFT" ? style.imgLogoSetTFT : ''}`} src={logo.url} alt={logo.label} />
          {logo.label === "Guiadeparche" && <img src="/textoGuiadeparcheSinEspacios.png" className={style.logoTextGuiadeparche}/>}
        </div>
      ))}
      </div>
    </div>
  )
}