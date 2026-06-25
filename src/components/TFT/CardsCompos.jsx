import React, { useEffect, useRef, useState } from "react";
import style from "./css/CardsCompos.module.css";
import { urlDragon, crearCompoMetaPHP, composTest, dataTFTAllItems, composMetaPBETest, teamPlannerCode, versionTFT, setNumberPBE, setMutatorPBE, setMutatorLatest, dataTFTChampions, compActiveId } from "@stores/dataTFT";
import GuiaFreeTFTMeta from "./GuiaFreeTFTMeta.jsx";
import { navigate } from "astro:transitions/client";
import { saveScrollPosition } from "../../utils/scrollRestoration";
import CrearCompoTFT from "@components/main/Admin/CrearCompoTFT.jsx";
import { CapturarImagen } from "@functions/CapturarImagen.js";
import FormularioCrearCompoTFT from "./FormularioCrearCompoTFT.jsx";
import { useStore } from "@nanostores/react";

import CardsMasterPlanCompos from "./master-plan/CardsMasterPlanCompos.jsx";
// Añade aquí manualmente los apiName de los campeones que NO quieres que se muestren
const EXCLUDED_API_NAMES = [
  "TFT17_Summon",
  "TFT15_ShenSword"
];

const CardsCompos = ({ comp, numeracion, isActive, edit = false, isInfografia = false }) => {
  const composTestB = useStore(composTest);
  const currentVersion = useStore(versionTFT);
  const codeOfChampions = useStore(teamPlannerCode);
  const championsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  useEffect(() => {
    // Si la tienda está vacía (no se llenó en el SSR/Layout), obtenla:
    if (Object.keys(composTestB).length === 0) {
      composMetaPBETest();
    }
  }, [composTestB]);

  function copyToClipboard(e, codigo) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(codigo);
    alert("Copied Code: " + codigo);
  }

  function championsCodeBuilder(allChampions) {
    const priorityNames = ['TFT13_MissMage', 'TFT13_Viktor', 'TFT13_Warwick'];
    const sortedArray = allChampions.sort((a, b) => {
      if (priorityNames.includes(a.apiName) && priorityNames.includes(b.apiName)) {
        return priorityNames.indexOf(a.apiName) - priorityNames.indexOf(b.apiName);
      }
      if (priorityNames.includes(a.apiName)) return 1;
      if (priorityNames.includes(b.apiName)) return -1;
      return a.apiName.localeCompare(b.apiName);
    });
    const result = { "empty_slot": "00" };
    const sequence = [];
    let i = 0;
    while (sequence.length <= sortedArray.length) {
      let hex = i.toString(16).padStart(2, "0");
      sequence.push(hex);
      i++;
    }
    sortedArray.forEach((item, index) => {
      if (item.apiName !== "TFT13_Rammus") {
        result[item.apiName] = sequence[index + 1];
      }
    });
    return result;
  }

  function generatorCodeBuilder(allChampionsApiName) {
    let sinDuplicados = [...new Set(allChampionsApiName)];
    const championsList = [];
    championsTFT.forEach(({ apiName, traits }) => {
      if (traits.length > 0) {
        championsList.push({ apiName });
      }
    });
    const RulesChampionsCode = championsCodeBuilder(championsList);
    let championsCode = "01";
    for (let i = 0; i < 10; i++) {
      if (sinDuplicados[i]) {
        championsCode = championsCode.concat(RulesChampionsCode[sinDuplicados[i].apiName]);
      } else {
        championsCode = championsCode.concat("00");
      }
    }
    championsCode = championsCode.concat("TFTSet13");
    return championsCode;
  }

  function codeForPBE(allChampionsApiName) {
    let sinDuplicados = [...new Set(allChampionsApiName)];
    let championsCode = "02";
    let cantidadDeCampeones = sinDuplicados.length;
    sinDuplicados.forEach(({ apiName }) => {
      championsCode = championsCode.concat(codeOfChampions[apiName] || "");
    });
    let espaciosVacios = 10 - cantidadDeCampeones;
    if (espaciosVacios > 0) {
      championsCode = championsCode.concat("000".repeat(espaciosVacios));
    }
    championsCode = championsCode.concat(currentVersion === "pbe" ? setMutatorPBE : setMutatorLatest);
    return championsCode;
  }

  const [openForEdit, setOpenForEdit] = useState(false);
  const activeEditId = useStore(compActiveId);
  const showFormForEdit = activeEditId === comp.id;
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
    // Si esta es la tarjeta que el usuario acaba de clickear (para abrirla o cerrarla)
    const targetId = sessionStorage.getItem("tft-target-id");

    if (targetId === comp.id.toString()) {
      const restoreAndAdjust = async () => {
        const savedOffset = sessionStorage.getItem("tft-target-offset");

        if (savedOffset && containerRef.current) {
          // Obtenemos la posición absoluta actual del elemento
          const elementAbsoluteTop = containerRef.current.getBoundingClientRect().top + window.scrollY;

          // Ajustamos el scroll al instante para que el elemento aparezca en el mismo lugar exacto de la pantalla
          const html = document.documentElement;
          const originalScrollBehavior = html.style.scrollBehavior;
          html.style.scrollBehavior = "auto";
          window.scrollTo(0, elementAbsoluteTop - parseFloat(savedOffset));
          html.style.scrollBehavior = originalScrollBehavior;

          // Limpiamos los datos guardados
          sessionStorage.removeItem("tft-target-offset");
          sessionStorage.removeItem("tft-target-id");
        }

        // Si se está abriendo (isActive), animamos hacia su posición final debajo del header
        if (isActive) {
          setTimeout(() => {
            if (!containerRef.current) return;

            const headerHtml = document.getElementsByClassName("bodyHeader");
            const headerHeight = headerHtml[0] ? headerHtml[0].clientHeight : 80;

            const finalPosition = containerRef.current.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
              top: finalPosition - headerHeight - 15,
              behavior: "smooth"
            });
          }, 250); // Tiempo para que termine la transición de Astro
        }
      };

      restoreAndAdjust();
    } else if (isActive) {
      // Caso de carga directa o desde otro enlace (como el CampeonImgInTierList)
      const tierlistScroll = sessionStorage.getItem("tft-tierlist-scroll");
      if (tierlistScroll) {
        // Restauramos instantáneamente el scroll de la página anterior para que no haya salto visual
        const html = document.documentElement;
        const originalScrollBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, parseFloat(tierlistScroll));
        html.style.scrollBehavior = originalScrollBehavior;
        sessionStorage.removeItem("tft-tierlist-scroll");
      }

      setTimeout(() => {
        if (!containerRef.current) return;

        const headerHtml = document.getElementsByClassName("bodyHeader");
        const headerHeight = headerHtml[0] ? headerHtml[0].clientHeight : 80;

        const finalPosition = containerRef.current.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: finalPosition - headerHeight - 15,
          behavior: "smooth"
        });
      }, 500); // Un poco más de tiempo para asegurar que todo haya cargado
    }
  }, [isActive, comp.id]);

  const handleToggle = async (e) => {
    e.preventDefault();

    if (containerRef.current) {
      // Guardar siempre a qué distancia de la pantalla estaba este elemento al hacer click
      // y guardar el ID para saber cuál tarjeta debe reajustar el scroll en la siguiente página
      const offsetTop = containerRef.current.getBoundingClientRect().top;
      sessionStorage.setItem("tft-target-offset", offsetTop.toString());
      sessionStorage.setItem("tft-target-id", comp.id.toString());
    }

    const targetUrl = isActive
      ? "/tft/meta-comps-tier-list-teamfight-tactics"
      : `/tft/meta-comps-tier-list-teamfight-tactics/${comp.urlSEO}`;

    await navigate(targetUrl, {
      scroll: false
    });
  };

  const handleToggleCardContainer = (e) => {
    // Ignorar el click si se hizo sobre un botón, un enlace, una imagen (campeones/items) o el contenedor de la imagen
    if (
      e.target.closest('button') ||
      e.target.closest('a') ||
      e.target.closest('img') ||
      e.target.closest(`.${style.championImageWrapper}`)
    ) {
      return;
    }
    handleToggle(e);
  };

  const deleteComp = ({ id, tier, version }) => {
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

  // Mapear, parsear y filtrar campeones, y debe ordenarse por "cost" que se obtiene en campeonInfo
  const campeones = (comp?.posicionamiento?.[0]?.tablero || []).map((data) => {
    const rawChamp = championsTFT?.find(champ => champ?.apiName === data.apiNameCampeon);

    // Si no encuentra al campeón en la store, retornamos null
    if (!rawChamp) return null;

    const iconPath = rawChamp.squareIcon || rawChamp.tileIcon || "";
    const cleanIconPath = iconPath.startsWith('/') ? iconPath.slice(1) : iconPath;

    // Mapeamos los datos a las propiedades que el JSX espera más abajo (nombre, coste, img)
    const campeon = {
      nombre: rawChamp.name,
      apiName: rawChamp.apiName,
      coste: rawChamp.cost,
      img: `${urlDragon()}${cleanIconPath.toLowerCase().replace(".tex", ".png")}`
    };

    let itemsData = [];
    const build = (comp?.bestBuild || []).find(({ apiNameCampeon }) => apiNameCampeon === campeon.apiName);

    if (build && build.apiNameItemsBisDelCampeon) {
      // apiNameItemsBisDelCampeon suele ser un array de arrays: [["item1", "item2", "item3"]]
      // Verificamos si es un array de arrays y tomamos el primero, o lo usamos directamente si es plano
      const itemsToMap = Array.isArray(build.apiNameItemsBisDelCampeon[0])
        ? build.apiNameItemsBisDelCampeon[0]
        : build.apiNameItemsBisDelCampeon;

      itemsData = itemsToMap.map(apiNameItem => {
        const item = allItemsTFT.find(item => item?.apiName === apiNameItem);
        if (item) {
          // El JSX más abajo espera item.nombre
          return {
            nombre: item.name,
            apiName: item.apiName,
            icon: item.icon
          };
        }
        return null;
      }).filter(Boolean);
    }

    // Si el campeón está en la lista de excluidos, no lo agregamos
    if (EXCLUDED_API_NAMES.includes(data.apiNameCampeon)) {
      return null;
    }

    return {
      campeon: campeon,
      items: itemsData,
      estrellas: data?.estrella || 1
    };
  })
    .filter(Boolean) // Omitir campeones excluidos o no encontrados (los null)
    .sort((a, b) => a?.campeon?.coste - b?.campeon?.coste);

  const allChampionsApiName = campeones.map(({ campeon }) => {
    return { apiName: campeon.apiName }
  });

  return (
    <div ref={containerRef} className={`${style.container} ${isInfografia ? style.containerInfografia : ''}`}>
      <div className={style.cardContainer} onClick={edit? null : handleToggleCardContainer}>
        <div className={`${style.leftContainer} ${isInfografia ? style.leftContainerInfografia : ''} ${!isInfografia && edit ? style.leftContainerFullWidth : ""}`}>

          <div className={style.header}>

            <div className={style.tierContainer}>
              <span className={`${style.tierNumber} ${style[`tier-card-${comp?.tier}`]}`}>{comp?.tier}</span>
            </div>
            <div className={style.nameContainer}>
              <h3>{numeracion}. {comp?.nombre}</h3>
            </div>

            <div className={style.headerControls}>
              {
                comp?.dificultad && (
                  <span className={`${style.dificultad} ${style?.[`dificultad-${comp?.dificultad}`]}`}>{comp?.dificultad?.toUpperCase()}</span>
                )
              }
              {
                comp?.categoria && (
                  <span className={style.shadowCategory}>{comp?.categoria?.toUpperCase()}</span>
                )
              }
              {
                comp?.infographicCategory && (
                  <span className={style.infographicCategory}>{comp?.infographicCategory?.toUpperCase()}</span>
                )
              }
            </div>
          </div>
          {!isInfografia && <p className={`${style.tipSeo} hideForCapture`}>{comp.tipSEO}</p>}

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
                          loading="lazy"
                          decoding="async"
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
          <div className={`${style.rightContainer} ${!isInfografia ? "hideForCapture" : ""}`}>
            {
              edit ? (
                <div className={`${style.btnAdmins} ${!isInfografia ? "hideForCapture" : ""}`}>

                  <button onClick={() => setOpenForEdit(!openForEdit)}>{isActive ? "TFT Meta" : `${comp?.urlSEO?.replace("-", " ")?.toUpperCase()} TFT`}</button>
                  <button onClick={(e) => copyToClipboard(e, (currentVersion === "pbe" ? codeForPBE(allChampionsApiName) : generatorCodeBuilder(allChampionsApiName)))}>Copiar Código</button>
                  <button onClick={() => {
                    if (showFormForEdit) {
                      compActiveId.set(null);
                    } else {
                      compActiveId.set(comp.id);
                    }
                  }}>
                    {showFormForEdit ? "Cerrar Edición" : "Editar"}
                  </button>
                  <button onClick={() => deleteComp({ id: comp.id, tier: comp.tier, version: comp.version || "latest" })}>
                    Eliminar
                  </button>
                  <button
                    onClick={
                      () => CapturarImagen({
                        backgroundRef: containerRef,
                        nombre: `TFT_MetaComp_${comp.tier}_${comp.urlSEO}`,
                      })
                    }
                  >
                    Descargar
                  </button>
                </div>
              ) : (
                <div className={`${style.btnAdmins} ${!isInfografia ? "hideForCapture" : ""}`}>
                  <button className={`${style.buttonLink} ${style.buttonLinkCopy}`} onClick={(e) => copyToClipboard(e, (currentVersion === "pbe" ? codeForPBE(allChampionsApiName) : generatorCodeBuilder(allChampionsApiName)))}>
                    Copiar Código
                  </button>
                  <a
                    href={edit && isActive ? "/tft/meta-comps-tier-list-teamfight-tactics" : `/tft/meta-comps-tier-list-teamfight-tactics/${comp.urlSEO}`}
                    className={style.buttonLink}
                    onClick={handleToggle}
                  >
                    {isActive ? "TFT Meta ⬆" : `${comp?.urlSEO?.replace("-", " ")?.toUpperCase()} TFT ⬇`}
                  </a>
                </div>
              )
            }
          </div>}
      </div>
      {(isActive || openForEdit) && (
        <div className={style.detailsWrapper}>
          {/* <GuiaFreeTFTMeta comp={composTestB?.S?.[0]} isInfografia={false} edit={false} /> */}
          <GuiaFreeTFTMeta comp={comp} isInfografia={isInfografia} edit={edit} />
        </div>
      )}
      {showFormForEdit &&

          <FormularioCrearCompoTFT
            compo={comp}
          />
      }

    </div>
  )
}

export default CardsCompos;