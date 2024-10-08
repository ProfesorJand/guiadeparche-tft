import React, { useEffect, useState } from "react";
import style from "./css/ItemsTierList.module.css"

const ItemTierList = ()=>{
  const [tierList,setTierList] = useState({});
  const [pestana, setPestana] = useState(0)
  const category = ["Craftable","Radiants","Emblems","Artefacts"]
useEffect(()=>{
  (async function traerDatos(){
    const url="https://guiadeparche.com/tftdata/Set12/tierListItem.json";
    const datos = await fetch(url, {cache:"no-cache"});
    const resp = await datos.json();
    setTierList(resp)
  })()
},[])


if(Object.keys(tierList).length > 0){
  return (
    <>
    <div className={style.container}>
      <div className={style.btn}>
        <button className={pestana === 0 ? style.btnActive : ""} onClick={()=>setPestana(0)}>Craftable</button>
        <button className={pestana === 1 ? style.btnActive : ""} onClick={()=>setPestana(1)}>Radiants</button>
        <button className={pestana === 2 ? style.btnActive : ""} onClick={()=>setPestana(2)}>Emblems</button>
        <button className={pestana === 3 ? style.btnActive : ""} onClick={()=>setPestana(3)}>Artefacts</button>
      </div>
      <div className={style.containerTierList}>
        <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-S.webp" alt="Tier S" />
        </div>
        <div
          className={style.containerTierListItems}
          id="S"
        >
          {tierList[category[pestana]]["S"].map((dataItem,i)=>{
              return (
                <div key={"S"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem.img} alt={dataItem.nombre} data-from="itemBoard" data-tier="S" data-item={JSON.stringify(dataItem)} onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
                </div>
              )
            })}
        </div>
        </div>
        <div className={style.containerTierList}>
          <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-A.webp" alt="Tier A" />
          </div>
          <div
            className={style.containerTierListItems}
            id="A"
            >
            {tierList[category[pestana]]["A"].map((dataItem,i)=>{
              return (
                <div key={"A"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem.img} alt={dataItem.nombre} data-from="itemBoard" data-tier="A" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className={style.containerTierList}>
          <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-B.webp" alt="Tier B" />
          </div>
          <div
            className={style.containerTierListItems}
            id="B"
            >
            {tierList[category[pestana]]["B"].map((dataItem,i)=>{
              return (
                <div key={"B"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem.img} alt={dataItem.nombre} data-from="itemBoard" data-tier="B" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className={style.containerTierList}>
          <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-C.webp" alt="Tier C" />
          </div>
          <div
            className={style.containerTierListItems}
            id="C"
            >
            {tierList[category[pestana]]["C"].map((dataItem,i)=>{
              return (
                <div key={"C"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem.img} alt={dataItem.nombre} data-from="itemBoard" data-tier="C" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className={style.containerTierList}>
          <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-D.webp" alt="Tier D" />
          </div>
          <div
            className={style.containerTierListItems}
            id="D"
            >
            {tierList[category[pestana]]["D"].map((dataItem,i)=>{
              return (
                <div key={"D"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem.img} alt={dataItem.nombre} data-from="itemBoard" data-tier="D" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </>
  )
}

}

export default ItemTierList