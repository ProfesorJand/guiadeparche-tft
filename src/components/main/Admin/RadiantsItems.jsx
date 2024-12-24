import React, { useEffect, useState } from "react";
import style from "./css/CarouselItems.module.css";
import { getDataTFTBySet } from "src/json/updates/contantesTFT";

const RadiantsItems = ({radiantsItems}) =>{
  const [allItemsInfo, setAllItemsInfo] = useState(null);
  const url = "https://raw.communitydragon.org/latest/game/"
  console.log({radiantsItems})
  useEffect(()=>{
    const getAllItems = async ()=>{
      setAllItemsInfo((await getDataTFTBySet({})).setInfo)
    }
    getAllItems();

  },[])

  useEffect(()=>{
    if(allItemsInfo){
      console.log({allItemsInfo});
      console.log(allItemsInfo.find((radiant)=>radiantsItems?.RadiantItem1?.apiName === radiant?.apiName))
    }
  },[allItemsInfo, radiantsItems])

  return (
    <div className={style.containerGlobal}>
      {radiantsItems?.RadiantItem1 && allItemsInfo &&
      <div className={style.containerBasicItem}>
      <img className={style.imgBasicItem} src={url + allItemsInfo.find((radiant)=>radiantsItems?.RadiantItem1?.apiName === radiant?.apiName)?.icon.replace(".tex",".png").toLowerCase()} alt={radiantsItems?.RadiantItem1?.nombre} loading="lazy"></img>
      </div>
      }
      {radiantsItems?.RadiantItem2 && allItemsInfo && <span className={style.spanSeparator}>{">"}</span>}
      
      {radiantsItems?.RadiantItem2 && allItemsInfo &&
      <div className={style.containerBasicItem}>
      <img className={style.imgBasicItem} src={url + allItemsInfo.find((radiant)=>radiantsItems?.RadiantItem2?.apiName === radiant?.apiName)?.icon.replace(".tex",".png").toLowerCase()} alt={radiantsItems?.RadiantItem2?.nombre} loading="lazy"></img>
      </div>
      }
      {radiantsItems?.RadiantItem3 && allItemsInfo && <span className={style.spanSeparator}>{">"}</span>}
      {radiantsItems?.RadiantItem3 && allItemsInfo &&
      <div className={style.containerBasicItem}>
      <img className={style.imgBasicItem} src={url + allItemsInfo.find((radiant)=>radiantsItems?.RadiantItem3?.apiName === radiant?.apiName)?.icon.replace(".tex",".png").toLowerCase()} alt={radiantsItems?.RadiantItem3?.nombre} loading="lazy"></img>
      </div>
      }
    </div>
  )
}

export default RadiantsItems;