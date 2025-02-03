import { MetaComps as compos, loadCompsMeta, initialStateMetaComps } from "src/stores/menuFiltradoAdmin.js";
import { useStore } from "@nanostores/react";
import style from "./css/TierListMetaComps.module.css";
import ChampTierList from "./ChampTierList.jsx";
import { useEffect, useState } from "react";
const TierListMetaComps = ()=>{
  const composMeta = useStore(initialStateMetaComps);
  const [sortedCompsMeta, setSortedComps] = useState([])
  const hierarchy = ["Fast 8","Specifics Augments","3 Stars"];
  useEffect(()=>{
    if(composMeta.length > 0){
      const sortedComps = [...composMeta].map((tier) => tier.sort((a, b) => {
        return hierarchy.indexOf(a?.shadowCategory) - hierarchy.indexOf(b?.shadowCategory)
      }))
      setSortedComps(sortedComps)
    }
  },[composMeta])

  return (
    <div className={style.containerTierListMetaComps}>
      {
        composMeta.length > 0 && composMeta.map((comps, index)=>{
          return (
            <div key={index} className={style.containerMetaCompByTier}>
              <div className={style.containerImgTier}>
                <img className={style.imgTier} src={`/tiers/Tier-${comps?.[index]?.tier}.webp`} alt={`Tier-${[comps[index].tier]}`}></img>
              </div>
              <div className={style.containerChampTierList}>
              { comps.map(({id, isHide,dificultad, gameplay, shadowCategory, infographicCategory, titulo, posicion, campeonTierList, augmentTierList, champItem, champTrait})=>{
                if(!isHide && campeonTierList?.name){
                  return (
                    <ChampTierList
                      key={id}
                      id={id}
                      campeonTierList={campeonTierList}
                      augmentTierList={augmentTierList}
                      champItem={champItem}
                      champTrait={champTrait}
                    />
                  )
                }
              })}
              </div>
            </div>  
          )
          }
        )
      }
    </div>
  )
} 


export default TierListMetaComps