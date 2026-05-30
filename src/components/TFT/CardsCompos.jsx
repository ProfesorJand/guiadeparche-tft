import React, {useEffect, useRef} from "react";
import style from "./css/CardsCompos.module.css";
import { urlDragon } from "@stores/dataTFT";
import GuiaFreeTFTMeta  from "./GuiaFreeTFTMeta.jsx";
import { navigate } from "astro:transitions/client";
import { saveScrollPosition } from "../../utils/scrollRestoration";

// Añade aquí manualmente los apiName de los campeones que NO quieres que se muestren
const EXCLUDED_API_NAMES = [
  "TFT17_Summon",
  "TFT15_ShenSword"
];

const CardsCompos = ({ comp, numeracion, isActive }) => {
  console.log({comp})
  const containerRef = useRef(null);
  const dificultadEspañol = {
  Easy: "Fácil",
  Medium: "Medio",
  Hard: "Difícil",
};

const infographicCategoriesEspañol = {
  "Roll Lv5": "Rolear Lv5",
  "Roll Lv6": "Rolear Lv6",
  "Roll Lv7": "Rolear Lv7",
  "Roll Lv8": "Rolear Lv8",
  "Roll Lv8 y Lv9": "Rolear Lv8 y Lv9",
  "Roll Lv9": "Rolear Lv9",
  "Roll Lv10": "Rolear Lv10",
};

  useEffect(() => {
  if (!isActive) return;

  const restoreAndAdjust = async () => {

    // Restaurar posición inmediatamente
    const savedPosition = sessionStorage.getItem(
      "tft-scroll-position"
    );

    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }

    // Esperar render/layout
    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        if (!containerRef.current) return;

        const headerHtml =
          document.getElementsByClassName("bodyHeader");

        const headerHeight =
          headerHtml[0]
            ? headerHtml[0].clientHeight
            : 80;

        const elementPosition =
          containerRef.current.getBoundingClientRect().top
          + window.scrollY;

        window.scrollTo({
          top: elementPosition - headerHeight - 15,
          behavior: "smooth"
        });

      });

    });

  };

  restoreAndAdjust();

}, [isActive]);

  const handleToggle = async (e) => {
  e.preventDefault();

  saveScrollPosition();

  const targetUrl = isActive
    ? "/tft/nueva-pagina"
    : `/tft/nueva-pagina/${comp.id}`;

  await navigate(targetUrl, {
    scroll: false
  });
};

  // Mapear, parsear y filtrar campeones
  const campeones = Object.keys(comp?.boardInfo?.[comp?.originalComp]?.data || {})
    .map((key) => {
      const { dataCampeon, dataItem, estrellas } = comp?.boardInfo?.[comp?.originalComp]?.data[key];
      const campeonInfo = JSON.parse(dataCampeon?.campeon || "{}");

      // Si el campeón está en la lista de excluidos, no lo agregamos
      if (EXCLUDED_API_NAMES.includes(campeonInfo?.apiName)) {
        return null;
      }
      return {
        campeon: campeonInfo,
        items: dataItem.map((item) => JSON.parse(item?.item || "{}")),
        estrellas: estrellas
      };
    })
    .filter(Boolean); // Omitir campeones excluidos (los null)

  return (
    <div ref={containerRef} className={style.container}>
      <div className={style.cardContainer}>
        <img className={style.imgBackground} src="" alt=""></img>
        <div className={style.leftContainer}>

          <div className={style.header}>
            
            <div className={style.tierContainer}>
              <span className={style.tierNumber}>{comp?.tier}</span>
            </div>
            <div className={style.nameContainer}>
              <h3><span className={style.numeracion}>{numeracion}.</span> {comp?.titulo}</h3>
            </div>

            <div className={style.headerControls}>
              {
                comp?.dificultad && (
                  <span className={`${style.dificultad} ${style[`dificultad-${comp?.dificultad}`]}`}>{dificultadEspañol[comp?.dificultad]}</span>
                )
              }
              {
                comp?.shadowCategory && (
                  <span className={style.shadowCategory}>{comp?.shadowCategory}</span>
                )
              }
              {
                comp?.infographicCategory && (
                  <span className={style.infographicCategory}>{infographicCategoriesEspañol[comp?.infographicCategory]}</span>
                )
              }
            </div>
          </div>

          <div className={style.championsContainer}>
            {
              campeones?.map((data, index) => {
                return (
                  <div key={`champInit-${index}`} className={style.championContainer}>
                    <div className={`${style.championImgItems}`}>
                      {data?.estrellas == 3 && <img src="/tft/assets/3-estrellas.webp" className={style.champThreeStars} alt="3-estrellas"></img>}
                      <div className={`${style.championImageWrapper} ${style[`champSquareCost${data?.campeon?.coste}`]}`}>
                        <img className={style.championImg} src={data?.campeon?.img} alt={data?.campeon?.nombre}></img>
                      </div>
                      <div className={style.championInfo}>
                        <span className={style.championName}>{data?.campeon?.nombre}</span>
                      </div>

                    </div>
                    {
                      data?.items.length > 0 &&
                      <div className={style.itemsContainer}>
                        {
                          data?.items?.map((item, index) => (
                            <img key={`champ-items-${index}`} className={style.itemImg} src={item?.icon.includes("http") ? item?.icon : urlDragon() + item?.icon.toLowerCase().replace(".tex", ".png")} alt={item?.nombre}></img>
                          ))
                        }
                      </div>
                    }
                  </div>
                )
              })
            }

          </div>
        </div>
        <div className={style.rightContainer}>
          <p className={style.tipSeo}>{comp.tipSeo}</p>
          <a
            href={isActive ? "/tft/nueva-pagina" : `/tft/nueva-pagina/${comp.id}`}
            className={style.buttonLink}
            onClick={handleToggle}
          >
            {isActive ? "Cerrar" : "Ver"}
          </a>
        </div>
      </div>
      {isActive && (
        <div className={style.detailsWrapper}>
          <GuiaFreeTFTMeta comp={comp} />
        </div>
      )}

    </div>
  )
}

export default CardsCompos;