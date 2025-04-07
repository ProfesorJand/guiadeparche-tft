import { MetaComps as compos } from "src/stores/menuFiltradoAdmin.js";
import { useStore } from "@nanostores/react";
import style from "./css/TierListMetaComps.module.css";
import ChampTierList from "./ChampTierList.jsx";
import { useEffect, useRef } from "react";

const TierListMetaComps = () => {
  const composMeta = useStore(compos);
  const scrollContainersRef = useRef([]);
  const numberOfChampsInTierList = 6; // Puedes modificar este valor según necesites

  useEffect(() => {
    console.log({composMeta})
    console.log({composMetaSort: composMeta.sort((a,b)=>a.posicion - b.posicion)})
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
  }, [composMeta]);

  return (
    <div className={style.containerTierListMetaComps}>
      {composMeta.length > 0 ? (
        composMeta.map((comps, index) => {
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
  );
};

export default TierListMetaComps;
