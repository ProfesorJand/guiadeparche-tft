import React, { useEffect, useState } from "react";
import style from "./css/ItemsTierList.module.css"

const ItemTierList = ()=>{
  const urlDataDragon="https://raw.communitydragon.org/latest/game/"
  const [itemsTierList,setItemsTierList] = useState({});
  const category = ["Craftable","Radiants","Emblems","Artefacts","Supports","Others"] //"Craftable","Radiants","Emblems","Artefacts","Support"
useEffect(()=>{
  (async function traerDatos(){
    const url="https://guiadeparche.com/tftdata/Set12/tierListItem.json";
    const datos = await fetch(url, {cache:"no-cache"});
    const resp = await datos.json();
    setItemsTierList(resp)
  })()

},[])


if(Object.keys(itemsTierList).length > 0){
  return (
    <>
    <h2>
      Items
    </h2>
    <div className={style.container}>
      {Object.keys(itemsTierList).map((categoryItemName, index)=>{
        if(category.includes(categoryItemName) && itemsTierList?.[categoryItemName]?.["S"].length){
          return (
          <div key={categoryItemName+index} className={style.containerTierList}>
            <div className={style.containerTierListItems}>
              <div className={style.containerTierListTiers}>
                <img className={style.tierImg} src="/tiers/Tier-S.webp" alt="Tier S" />
              </div>
              {itemsTierList?.[categoryItemName]?.["S"].map((dataItem,i)=>{
                return (
                  <div key={"S"+i} className={style.containerItem}>
                    <img className={style.imgItem} src={dataItem?.img || urlDataDragon + dataItem?.icon.replace(".tex",".png").toLowerCase()} alt={dataItem.nombre} data-from="itemBoard" data-tier="S" data-item={JSON.stringify(dataItem)} onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
                  </div>
                )
              })}
            </div>
          </div>)
        }
      })}
    </div>
    </>
  )
}

}

export default ItemTierList