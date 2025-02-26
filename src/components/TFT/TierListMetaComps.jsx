import { MetaComps as compos } from "src/stores/menuFiltradoAdmin.js";
import { useStore } from "@nanostores/react";
import style from "./css/TierListMetaComps.module.css";
import ChampTierList from "./ChampTierList.jsx";
import { useEffect, useState, useRef } from "react";

const TierListMetaComps = () => {
  const composMeta = useStore(compos);
  const scrollContainersRef = useRef([]);
  const numberOfChampsInTierList = 6; // Puedes modificar este valor según necesites

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
  }, [composMeta]);

  return (
    <div className={style.containerTierListMetaComps}>
      {composMeta.length > 0 ? (
        composMeta.map((comps, index) => {
          // Dividir comps en grupos de numberOfChampsInTierList
          const chunkedComps = [];
          for (let i = 0; i < comps.length; i += numberOfChampsInTierList) {
            chunkedComps.push(comps.slice(i, i + numberOfChampsInTierList));
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
                {compGroup.map(({ id, isHide, campeonTierList, augmentTierList, champItem, champTrait }) => {
                  if (!isHide && campeonTierList?.name) {
                    return (
                      <ChampTierList
                        key={id}
                        id={id}
                        campeonTierList={campeonTierList}
                        augmentTierList={augmentTierList}
                        champItem={champItem}
                        champTrait={champTrait}
                      />
                    );
                  }
                  return null;
                })}
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
