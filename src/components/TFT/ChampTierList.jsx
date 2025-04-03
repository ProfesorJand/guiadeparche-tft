import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import style from "./css/ChampTierList.module.css";
import estrellas3 from "../../assets/3-estrellas.webp";
import { openCompoId, setOpenCompo, scrollToComposicion } from "src/stores/openCompoById";
const ChampTierList = ({id,isSample,campeonTierList, augmentTierList, champItem, champTrait,version, champ3Stars})=>{
  const championsColor = [
    "var(--color-hex-cost-default)",
    "var(--color-hex-cost-1)",
    "var(--color-hex-cost-2)",
    "var(--color-hex-cost-3)",
    "var(--color-hex-cost-4)",
    "var(--color-hex-cost-5)",
  ];
  const urlDataDragonLatestGame = `https://raw.communitydragon.org/${version}/game/`;
  const compId = useStore(openCompoId)
  useEffect(()=>{
    scrollToComposicion()
  },[compId])
  return (
    <div className={[isSample ? style.containerSampleChampTierList : style.containerChampTierList, (compId === id && !isSample)? style.isActive : ""].join(" ")} onClick={()=>setOpenCompo(id)}>
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
        champ3Stars==="true" && 
        <div className={[style.container3estrellas].join(" ")}> 
          <img className={style.img3estrellas} src={estrellas3.src} alt="3 estrellas"></img>
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