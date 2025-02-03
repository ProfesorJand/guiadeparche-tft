import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import style from "./css/ChampTierList.module.css";
import { openCompoId, setOpenCompo, scrollToComposicion } from "src/stores/openCompoById";

const ChampTierList = ({id,isSample,campeonTierList, augmentTierList, champItem, champTrait})=>{
  const championsColor = [
    "var(--color-hex-cost-default)",
    "var(--color-hex-cost-1)",
    "var(--color-hex-cost-2)",
    "var(--color-hex-cost-3)",
    "var(--color-hex-cost-4)",
    "var(--color-hex-cost-5)",
  ];
  const urlDataDragonLatestGame = "https://raw.communitydragon.org/latest/game/";
  const compId = useStore(openCompoId)
  useEffect(()=>{
    scrollToComposicion()
  },[compId])
  return (
    <div className={isSample ? style.containerSampleChampTierList : style.containerChampTierList} onClick={()=>setOpenCompo(id)}>
      {
        Object.keys(campeonTierList || {})?.length > 0 && 
        // añadir color del borde
      <div className={[style.poligonChampTierList].join(" ")} style={{backgroundColor: championsColor[campeonTierList?.coste || campeonTierList?.cost]}}> 
        <img className={style.imgCampeonBuilder} src={urlDataDragonLatestGame + campeonTierList?.tileIcon.replace(".tex",".png").toLowerCase()} alt="campeonTierList"></img>
      </div>
      }
      {
        Object.keys(campeonTierList || {})?.length > 0 && Object.keys(augmentTierList || {}).length > 0 &&
      <div className={style.containerAumChampTierList} style={{borderColor: championsColor[campeonTierList?.coste || campeonTierList?.cost]}}>
        <img className={style.imgAumChampTierList}src={urlDataDragonLatestGame+augmentTierList?.icon.replace(".tex",".png").toLowerCase()}></img>
      </div>
      }
      {
        Object.keys(campeonTierList || {})?.length > 0 && champItem?.length > 0 && 
        <div className={style.containerItemsChampTierList}>
          {champItem.map((item,index)=>{
            if(item.name){
              return (
                <div key={`champItem-${index}`} className={style.itemsChampTierList}>
                  <img className={style.imgItemChampTierList} src={urlDataDragonLatestGame + item.icon.replace(".tex",".png").toLowerCase()} alt={item.name}></img>
                </div>
              )
            }
          })}
        </div>
      }
      {
        Object.keys(campeonTierList || {})?.length > 0 && champTrait?.length > 0 && 
          champTrait.map((trait,index)=>{
            if(trait.name){
              return (
                <div key={`champTrait-${index}`} className={style.containerTraitChampTierList} style={{borderColor: championsColor[campeonTierList?.coste || campeonTierList?.cost || 0]}}>
                  <img className={style.imgTraitChampTierList} src={urlDataDragonLatestGame + trait.icon.replace(".tex",".png").toLowerCase()} alt={trait.name}></img>
                </div>  
              )
            }
          })
      }
    </div>
  )
}

export default ChampTierList