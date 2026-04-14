import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useStore } from "@nanostores/react";
import style from "./css/TierListMetaComps.module.css";
import ChampTierList from "./ChampTierList.jsx";
import { toPng } from 'html-to-image';
import { $admin } from "@stores/auth.js";
import { versionTFT } from "@stores/dataTFT.js";

const TierListMetaComps = ({todasLasComps = [], todasLasCompsPBE = []}) => {
  const currentVersion = useStore(versionTFT);
  const activeComps = currentVersion === "pbe" ? todasLasCompsPBE : todasLasComps;

  // Agrupar por tier para mantener la estructura visual
  const groupedComps = useMemo(() => {
    const hierarchy = ["S", "A", "B", "C", "D", "MEME"];
    return hierarchy.map(tierName => 
      activeComps.filter(c => c.tier === tierName)
    ).filter(group => group.length > 0);
  }, [activeComps]);

  const scrollContainersRef = useRef([]);
  const numberOfChampsInTierList = 6;
  const admin = useStore($admin);
  const backgroundRef = useRef(null);
  useEffect(() => {
    scrollContainersRef.current.forEach((scrollContainer) => {
      if (!scrollContainer) return;

      const handleWheelScroll = (event) => {
        event.preventDefault(); // Evita el scroll vertical
        scrollContainer.scrollLeft += event.deltaY; // Convierte el scroll vertical en horizontal
      };

      scrollContainer.addEventListener("wheel", handleWheelScroll);

      return () => {
        scrollContainer.removeEventListener("wheel", handleWheelScroll);
      };
    });
  }, [groupedComps]);

  const loadAllImages = (container) => {
    const images = container.querySelectorAll("img");
    const promises = [];

    images.forEach((img) => {
      // ⚠️ Eliminar el lazy loading para forzar la carga inmediata
      if (img.loading === "lazy") {
        img.loading = "eager";
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

      const containerElements = backgroundRef.current.querySelectorAll(`.${style.containerMetaCompByTier}`);
      const originalBackgrounds = [];

      // Guardamos los estilos originales y los cambiamos a 'transparent'
      containerElements.forEach((el, i) => {
        originalBackgrounds[i] = el.style.backgroundColor;
        el.style.backgroundColor = 'transparent';
      });
          
      loadAllImages(backgroundRef.current)
        .then(() => {
          return toPng(backgroundRef.current, {
            cacheBust: true,
            pixelRatio: 2, // mejora calidad (escala la resolución)
          });
        })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `ComposMetaTFT.png`;
          link.href = dataUrl;
          link.click();
          console.log("📸 Imagen capturada");
        })
        .catch((err) => {
          console.error("❌ Error al capturar imagen:", err);
        }).finally(() => {
          // Restauramos los backgrounds originales
          containerElements.forEach((el, i) => {
            el.style.backgroundColor = originalBackgrounds[i];
          });
        });
    }, [backgroundRef]);
  

  return (
    <>
    {admin && <button onClick={(e)=>{onButtonClick(e)}}>Guardar Meta</button>}
    <div className={style.containerTierListMetaComps} ref={backgroundRef}>
      {groupedComps.length > 0 ? (
        groupedComps.map((comps, index) => {
          // Filtrar los campeones donde isHide es false
          const visibleComps = comps.sort((a,b)=>a.posicion - b.posicion).filter((comp) => comp.isHide !== "true");
          
          // Dividir visibleComps en grupos de numberOfChampsInTierList
          const chunkedComps = [];
          for (let i = 0; i < visibleComps.length; i += numberOfChampsInTierList) {
            chunkedComps.push(visibleComps.slice(i, i + numberOfChampsInTierList));
          }
          
          return chunkedComps.map((compGroup, groupIndex) => (
            <div key={`${index}-${groupIndex}`} className={style.containerMetaCompByTier}>
              <div className={style.containerImgTier}>
                <img
                  className={style.imgTier}
                  loading="lazy"
                  src={`/tiers/Tier-${comps?.[0]?.tier}.webp`}
                  alt={`Tier-${comps?.[0]?.tier}`}
                  />
              </div>
              <div className={style.containerChampTierList} ref={(el) => (scrollContainersRef.current[index] = el)}>
                {compGroup.map(({ id, campeonTierList, augmentTierList, champItem, champTrait,version, champ3Stars }) => (
                  <ChampTierList
                  key={id}
                  id={id}
                  campeonTierList={campeonTierList}
                  augmentTierList={augmentTierList}
                  champItem={champItem}
                  champTrait={champTrait}
                  version={version || "latest"}
                  champ3Stars={champ3Stars}
                  />
                ))}
              </div>
            </div>
          ));
        })
      ) : (
        <p>Cargando...</p>
      )}
    </div>
    </>
  );
};

export default TierListMetaComps;
