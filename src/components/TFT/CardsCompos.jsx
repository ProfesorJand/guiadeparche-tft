import React, {useEffect, useRef, useState} from "react";
import style from "./css/CardsCompos.module.css";
import { urlDragon, crearCompoMetaPHP } from "@stores/dataTFT";
import GuiaFreeTFTMeta  from "./GuiaFreeTFTMeta.jsx";
import { navigate } from "astro:transitions/client";
import { saveScrollPosition } from "../../utils/scrollRestoration";
import CrearCompoTFT from "@components/main/Admin/CrearCompoTFT.jsx";

// Añade aquí manualmente los apiName de los campeones que NO quieres que se muestren
const EXCLUDED_API_NAMES = [
  "TFT17_Summon",
  "TFT15_ShenSword"
];

const CardsCompos = ({ comp, numeracion, isActive, edit = false, isInfografia = false }) => {
  const [openForEdit, setOpenForEdit] = useState(false);
  const [showFormForEdit, setShowFormForEdit] = useState(false);
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

      // Usar un pequeño retraso para permitir que la composición anterior se colapse
      // y la actual se renderice por completo antes de calcular la posición exacta.
      setTimeout(() => {
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
      }, 500);
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

const deleteComp = ({id, tier, version})=>{
  let password = prompt('Write DELETE to continue');
  if (password === "DELETE") {
    let token;
    if (import.meta.env.SSR) {
      token = import.meta.env.TOKEN_META;
    } else {
      token = import.meta.env.PUBLIC_TOKEN_META;
    }
    fetch(crearCompoMetaPHP, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      body: `id=${id}&tier=${tier}&version=${version}`, // Se envía la versión
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert(`ID: ${id} eliminado correctamente`);
          console.log('ID eliminado correctamente:', data.message);
        } else {
          console.error('Error al eliminar el ID:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

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
    <div ref={containerRef} className={`${style.container} ${isInfografia ? style.containerInfografia : ''}`}>
      <div className={style.cardContainer}>
        <div className={`${style.leftContainer} ${isInfografia ? style.leftContainerInfografia : ''}`}>

          <div className={style.header}>

            <div className={style.tierContainer}>
              <span className={`${style.tierNumber} ${style[`tier-card-${comp?.tier}`]}`}>{comp?.tier}</span>
            </div>
            <div className={style.nameContainer}>
              <h3>{numeracion}. {comp?.titulo}</h3>
            </div>

            <div className={style.headerControls}>
              {
                comp?.dificultad && (
                  <span className={`${style.dificultad} ${style[`dificultad-${comp?.dificultad}`]}`}>{dificultadEspañol[comp?.dificultad].toUpperCase()}</span>
                )
              }
              {
                comp?.shadowCategory && (
                  <span className={style.shadowCategory}>{comp?.shadowCategory.toUpperCase()}</span>
                )
              }
              {
                comp?.infographicCategory && (
                  <span className={style.infographicCategory}>{infographicCategoriesEspañol[comp?.infographicCategory].toUpperCase()}</span>
                )
              }
            </div>
          </div>

          <div className={`${style.championsContainer} ${isInfografia ? style.championsContainerInfografia : ''}`}>
            {
              campeones?.map((data, index) => {
                return (
                  <div key={`champInit-${index}`} className={style.championContainer}>
                    <div className={`${style.championImgItems}`}>
                      {data?.estrellas == 3 && <img src="/tft/assets/3-estrellas.webp" className={style.champThreeStars} alt="3-estrellas"></img>}
                      <div className={`${style.championImageWrapper} ${style[`champSquareCost${data?.campeon?.coste}`]}`}>
                        <img 
                          className={style.championImg} 
                          src={data?.campeon?.img} 
                          alt={data?.campeon?.nombre}
                          crossOrigin="anonymous"
                          ></img>
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
        {
          !isInfografia && 
          <div className={style.rightContainer}>
          <p className={style.tipSeo}>{comp.tipSeo}</p>
          {
            edit ? (
              <div className={style.btnAdmins}>
                <button onClick={()=> setOpenForEdit(!openForEdit)}>{isActive ? "Cerrar" : "Ver"}</button>
                <button onClick={()=> setShowFormForEdit(!showFormForEdit)}>
                  {showFormForEdit ? "Cerrar Edición" : "Editar"}
                </button>
                <button onClick={()=> deleteComp({id:comp.id, tier:comp.tier, version:comp.version || "latest"})}>
                  Eliminar
                </button>
              </div>
            ):(

            <a
              href={edit && isActive ? "/tft/nueva-pagina" : `/tft/nueva-pagina/${comp.id}`}
              className={style.buttonLink}
              onClick={handleToggle}
            >
              {isActive ? "Cerrar" : "Ver"}
            </a>
            )
          }
        </div>}
      </div>
      {(isActive || openForEdit) && (
        <div className={style.detailsWrapper}>
          <GuiaFreeTFTMeta comp={comp} />
        </div>
      )}
      {showFormForEdit &&
        <CrearCompoTFT
          edit={true}
          editId={comp.id}
          edittier={comp.tier}
          editposicion={comp.posicion}
          editdificultad={comp.dificultad}
          edittitulo={comp.titulo}
          editshadowCategory={comp.shadowCategory}
          editinfographicCategory={comp.infographicCategory}
          editaumentos={comp.aumentos}
          editgameplay={comp.gameplay}
          edittips={comp.tips}
          editboardInfo={comp.boardInfo}
          editpictureSave={comp.pictureSave}
          editcarouselItems={comp.carouselItems}
          editspatulaItem1={comp.spatulaItem1}
          editspatulaItem2={comp.spatulaItem2}
          editoriginalComp={comp.originalComp}
          editisHide={comp?.isHide === "true" ? true : false}
          editisInInfographic={comp.isInInfographic}
          editCampeonTierList={comp.campeonTierList}
          editAugmentTierList={comp.augmentTierList}
          editCampeonItemTierList={comp.champItem}
          editCampeonTraitTierList={comp.champTrait}
          editChamp3Stars={comp?.champ3Stars}
          editVersion={comp.version}
          editradiantItem={comp?.radiantsItems || []}
          editTipSeo={comp.tipSeo}
          editCuandoJugar={comp.cuandoJugar}
          editCondicionVictoria={comp.condicionVictoria}
        />}

    </div>
  )
}

export default CardsCompos;