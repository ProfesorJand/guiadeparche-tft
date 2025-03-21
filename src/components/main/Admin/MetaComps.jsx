import React, { useEffect, useState, useRef } from "react";
import { useStore } from "@nanostores/react";
import Composicion from "./Composicion.jsx";
import style from "./css/EditarCompoTFT.module.css";
import { MetaComps as compos, loadCompsMeta, isLoadingDataTFTFromApi } from "src/stores/menuFiltradoAdmin.js";
import FantasmaComposiciones from "./FantasmaComposiciones.jsx";
import { scrollToComposicion, setOpenCompo, openCompoId } from "src/stores/openCompoById.js";
import { versionTFT } from "src/stores/dataTFT.js";


const MetaComps = ({ showHide,admin }) => {
  const composMeta = useStore(compos);
  const currentVersion = useStore(versionTFT);
  const [isLoading, setIsLoading] = useState(true)
  const [allFast8, setAllFast8] = useState([]);
  const [all3Stars, setAll3Stars] = useState([]);
  const [allAugmentsHero, setAllAugmentsHero] = useState([]);
  const openCompId = useStore(openCompoId)
  const refs = useRef({});

  const title = {
    fast8: "Standard Comps - Fast 8/9",
    stars3: "Reroll Comps - 3 Star",
    specificsAugments: "Situational Comps - Augments / Emblem+1 / Artifacts",
  };

  const toggleCompo = (id) => {
    //setOpenCompo((prevId) => (prevId === id ? null : id));
    //scrollToComposicion(id);
    setOpenCompo(id);
  };
  useEffect(()=>{
    (async function(){
      if (versionTFT.get()) {
         await loadCompsMeta();
      }
    })();
  },[currentVersion])

  useEffect(()=>{
    scrollToComposicion();
  },[openCompoId])


  

  // const scrollToComposicion = (id) => {
  //   const element = refs.current[id];
  //   if (element) {
  //     const offsetTop = element.offsetTop;
  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: offsetTop,
  //         behavior: "smooth",
  //       });
  //     }, 150);
  //   }
  // };

  // useEffect(() => {
  //   loadCompsMeta();
  // }, []);

  useEffect(() => {
    isLoadingDataTFTFromApi.set(true);
    if (composMeta.length > 0) {
      const allFast8 = [];
      const all3Stars = [];
      const allAugmentsHero = [];
  
      composMeta.forEach((tier) => {
        const fast8 = [];
        const stars3 = [];
        const specificsAugments = [];
  
        tier.forEach((compo) => {
          if (compo.shadowCategory === "Fast 8") {
            fast8.push(compo);
          } else if (compo.shadowCategory === "3 Stars") {
            stars3.push(compo);
          } else if (compo.shadowCategory === "Specifics Augments") {
            specificsAugments.push(compo);
          }
        });
  
        allFast8.push(fast8);
        all3Stars.push(stars3);
        allAugmentsHero.push(specificsAugments);
      });
  
      setAllFast8(allFast8);
      setAll3Stars(all3Stars);
      setAllAugmentsHero(allAugmentsHero);
      setIsLoading(false)
      isLoadingDataTFTFromApi.set(false);
    }
  }, [composMeta]);

  // Mostrar los componentes "fantasma" si está cargando
  if (isLoading) {
    return (
      <div className={style.containerMeta}>
        {Array.from({ length: 10 }).map((_, i) => (
          <FantasmaComposiciones key={`fantasma-${i}`} />
        ))}
      </div>
    );
  }

  // Mostrar composiciones si ya cargaron
  return (
    <div className={style.containerMeta}>
      {allFast8.some((innerArray) => innerArray.length > 0) && (
        <>
          <h2>{title.fast8}</h2>
          {allFast8.map((tier, index) =>
            tier.map((compo, i) => (
              <div
                ref={(el) => (refs.current[compo.id] = el)}
                key={`fast8-${i}`}
                className={[
                  style.containerMetaTier,
                  compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide ? style.isHide : "",
                ].join(" ")}
              >
                <Composicion
                  compo={compo}
                  showHide={showHide}
                  admin={admin}
                  onToggle={() => toggleCompo(compo.id)}
                  isOpen={openCompId === compo.id}
                  id={compo.id}
                />
              </div>
            ))
          )}
        </>
      )}

      {all3Stars.some((innerArray) => innerArray.length > 0) && (
        <>
          <h2>{title.stars3}</h2>
          {all3Stars.map((tier, index) =>
            tier.map((compo, i) => (
              <div
                ref={(el) => (refs.current[compo.id] = el)}
                key={`stars3-${i}`}
                className={[
                  style.containerMetaTier,
                  compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide ? style.isHide : "",
                ].join(" ")}
              >
                <Composicion
                  compo={compo}
                  showHide={showHide}
                  admin={admin}
                  onToggle={() => toggleCompo(compo.id)}
                  isOpen={openCompId === compo.id}
                  id={compo.id}
                />
              </div>
            ))
          )}
        </>
      )}

      {allAugmentsHero.some((innerArray) => innerArray.length > 0) && (
        <>
          <h2>{title.specificsAugments}</h2>
          {allAugmentsHero.map((tier, index) =>
            tier.map((compo, i) => (
              <div
                ref={(el) => (refs.current[compo.id] = el)}
                key={`augments-${i}`}
                className={[
                  style.containerMetaTier,
                  compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide ? style.isHide : "",
                ].join(" ")}
                
              >
                <Composicion
                  compo={compo}
                  showHide={showHide}
                  admin={admin}
                  onToggle={() => toggleCompo(compo.id)}
                  isOpen={openCompId === compo.id}
                  id={compo.id}
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default MetaComps;
