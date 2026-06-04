import { urlDragon, urlComposiciones } from "@stores/dataTFT";
import style from "./css/GuiaFreeTFTMeta.module.css";
import Sinergias from "@components/main/Admin/Sinergias";
import { useState, useRef, useEffect } from "react";
const GuiaFreeTFTMeta = ({comp, isInfografia=false, edit=false}) => {
  const [hoveredAugment, setHoveredAugment] = useState(null);
  const augmentRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
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

  return(
    <div className={style.container}>
      <Header1 comp={comp}></Header1>
      <Header2 comp={comp} setHoveredAugment={setHoveredAugment} augmentRef={augmentRef}></Header2>
      <FooterTooltip augment={hoveredAugment} tooltipRef={tooltipRef} edit={edit} isInfografia={isInfografia}></FooterTooltip>
    </div>
  );
};

export default GuiaFreeTFTMeta;

const Header1 = ({comp})=>{
  const earlyChampions = Object.keys(comp?.boardInfo?.early?.data || []).map(
  (key) => {
  const { dataCampeon, dataItem } = comp?.boardInfo?.early?.data[key];
  const campeonInfo = JSON.parse(dataCampeon?.campeon || "{}");
    return {
      campeon: campeonInfo,
      items: dataItem.map((item) => JSON.parse(item?.item || "{}")),
    };
  },
  );
    return (
      <div className={style.blockBody}>
        <div className={`${style.blockEarlyGame} ${style.borderBlock}`}>
          {/* Early Game */}
          <h4>Early Game</h4>
          <div className={style.earlyChampionsContainer}>
            {
              earlyChampions?.map((data, index) => (

                  <div key={`earlyChampion-${index}`} className={style.championImgItems}>
                    <div
                      className={`${style.championImageWrapper} ${style[`champSquareCost${data?.campeon?.coste}`]}`}
                    >
                      <img
                        className={style.championImg}
                        src={data?.campeon?.img}
                        alt={data?.campeon?.nombre}
                      />
                    </div>
                    {data?.items && data.items.length > 0 && (
                      <div className={style.itemsContainer}>
                        {data.items.map((item, idx) => (
                          <img
                            key={`item-earlyChampion-${index}-${idx}`}
                            className={style.itemImg}
                            src={
                              item?.icon?.includes("http")
                                ? item?.icon
                                : urlDragon() +
                                  item?.icon
                                    ?.toLowerCase()
                                    .replace(".tex", ".png")
                            }
                            alt={item?.nombre}
                          />
                        ))}
                      </div>
                    )}
                    <div className={style.championInfo}>
                      <span className={style.championName}>
                        {data?.campeon?.nombre}
                      </span>
                    </div>
                </div>
              ))
            }
          </div>
        </div>
        {/* Dos columnas: Items Prio y Best Radiant */}
        <div className={`${style.blockItems} ${style.borderBlock}`}>
            <h4>Items Prio</h4>
            <div className={style.itemsCarouselContainer}>
              <div className={style.carouselItem}>
              {
                comp?.carouselItems?.CompleteItem1?.icon && 
                <img className={style.bigItemImg} src={
                  comp?.carouselItems?.CompleteItem1?.icon?.includes("http")
                  ? comp?.carouselItems?.CompleteItem1?.icon
                  : urlDragon() +
                  comp?.carouselItems?.CompleteItem1?.icon
                  ?.toLowerCase()
                  .replace(".tex", ".png")
                } alt={comp?.carouselItems?.CompleteItem1?.nombre} />
              }
              {
                comp?.carouselItems?.BasicItem1?.icon && 
                <img className={comp?.carouselItems?.CompleteItem1?.icon ? style.littleItemImg : style.bigItemImg} src={
                  comp?.carouselItems?.BasicItem1?.icon?.includes("http")
                                    ? comp?.carouselItems?.BasicItem1?.icon
                                    : urlDragon() +
                                    comp?.carouselItems?.BasicItem1?.icon
                                        ?.toLowerCase()
                                        .replace(".tex", ".png")
                } alt={comp?.carouselItems?.BasicItem1?.nombre} />
              }
              </div>
              <div className={style.mayorQue}>{">"}</div>
              <div className={style.carouselItem}>

            {
              comp?.carouselItems?.CompleteItem2?.icon  && 
              <img className={style.bigItemImg} src={
                comp?.carouselItems?.CompleteItem2?.icon?.includes("http")
                ? comp?.carouselItems?.CompleteItem2?.icon
                : urlDragon() +
                comp?.carouselItems?.CompleteItem2?.icon
                ?.toLowerCase()
                .replace(".tex", ".png")
              } alt={comp?.carouselItems?.CompleteItem2?.nombre} />
            }
            {
              comp?.carouselItems?.BasicItem2?.icon  && 
              <img className={comp?.carouselItems?.CompleteItem2?.icon ? style.littleItemImg : style.bigItemImg} src={
                comp?.carouselItems?.BasicItem2?.icon?.includes("http")
                ? comp?.carouselItems?.BasicItem2?.icon
                : urlDragon() +
                comp?.carouselItems?.BasicItem2?.icon
                ?.toLowerCase()
                .replace(".tex", ".png")
              } alt={comp?.carouselItems?.BasicItem2?.nombre} />
            }
            </div>
            <div className={style.mayorQue}>{">"}</div>
            <div className={style.carouselItem}>

            {
              comp?.carouselItems?.CompleteItem3?.icon  && 
              <img className={style.bigItemImg} src={
                comp?.carouselItems?.CompleteItem3?.icon?.includes("http")
                ? comp?.carouselItems?.CompleteItem3?.icon
                : urlDragon() +
                comp?.carouselItems?.CompleteItem3?.icon
                ?.toLowerCase()
                .replace(".tex", ".png")
              } alt={comp?.carouselItems?.CompleteItem3?.nombre} />
            }
            {
              comp?.carouselItems?.BasicItem3?.icon  && 
              <img className={comp?.carouselItems?.CompleteItem3?.icon ? style.littleItemImg : style.bigItemImg} src={
                comp?.carouselItems?.BasicItem3?.icon?.includes("http")
                ? comp?.carouselItems?.BasicItem3?.icon
                : urlDragon() +
                comp?.carouselItems?.BasicItem3?.icon
                ?.toLowerCase()
                .replace(".tex", ".png")
              } alt={comp?.carouselItems?.BasicItem3?.nombre} />
            }
            </div>
            </div>
            {/* <CarouselItems carouselItems={comp?.carouselItems} /> */}
        </div>
        <div className={`${style.blockBestRadiant} ${style.borderBlock}`}>
            <h4>Best Radiant</h4>
            {/* <!-- radiantsItems:{RadiantItem1: {…}} --> */}
            <div className={style.containerRadiantItem}>

            {
              (
                <img
                className={style.itemBestRadiant}
                src={
                  urlDragon() +
                  comp?.radiantsItems?.RadiantItem1?.icon
                  .toLowerCase()
                  .replace(".tex", ".png")
                }
                />
              )
            }
            </div>
          </div>
      </div>
  )
}

const Header2 = ({comp, setHoveredAugment, augmentRef})=>{
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
      <div className={`${style.borderBlock} ${style.containerAugmentsBlock}`}>
        
        <h4>Aumentos</h4>
        <div ref={augmentRef} className={style.containerAugments}>
          {
            comp?.aumentos?.map((augment, index) => (
              <div 
                className={style.augmentContainer} 
                key={index}
                onMouseEnter={() => handleMouseEnter(augment)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(augment)}
              >
                <img 
                  className={style.augmentImg} 
                  src={
                    urlDragon() +
                    augment?.icon
                    .toLowerCase()
                    .replace(".tex", ".png")
                  } 
                  alt={augment?.name}
                />
              </div>
            ))
          }
        </div>
      </div>
      <Posicionamiento comp={comp}/>

    </div>
  )
}

const Posicionamiento = ({comp})=>{
  return (
    <div className={`${style.borderBlock} ${style.containerPosicionamientoBlock}`}>
      <h4>Sinergias</h4>
      <div className={style.containerSinergiasActivas}>
        <Sinergias sinergias={comp?.boardInfo?.[comp?.originalComp]?.sinergias} orientacion={"vertical"} show={true} version={comp?.version} />
      </div>
      <h4>Posicionamiento</h4>
      <img className={style.posicionamientoImg} src={`${urlComposiciones}${comp?.id}-${comp?.originalComp}${comp?.version === "pbe" ? "-pbe" : ""}.webp`} alt={`Posicionamiento de ${comp.titulo}`}/>
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
      <div ref={tooltipRef} className={`${style.footerTooltipPlaceholder} ${!isInfografia && edit ? "adminOptions" : ""}`}>
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