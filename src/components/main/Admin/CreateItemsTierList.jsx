import React, {useState, useEffect} from "react"
import Items from "./Items.jsx"
import style from "./css/ItemsTierList.module.css";
import ItemsTierList from "./ItemTierList.jsx";
import { crearTierListItemPHP, tierListItemJSON, versionTFT } from "@stores/dataTFT.js";
import { useStore } from "@nanostores/react";
const CreateItemsTierList = ()=>{
  //localStorage.getItem("login")
  const currentVersion = useStore(versionTFT)
  const urlDataDragon=`https://raw.communitydragon.org/${currentVersion}/game/`
  const [tierList, setTierList] = useState({
    Craftable:{
      "S":[],
      "A":[],
      "B":[],
      "C":[],
      "D":[]
    },
    Radiants:{
      "S":[],
      "A":[],
      "B":[],
      "C":[],
      "D":[]
    },
    Emblems:{
      "S":[],
      "A":[],
      "B":[],
      "C":[],
      "D":[]
    },
    Artefacts:{
      "S":[],
      "A":[],
      "B":[],
      "C":[],
      "D":[]
    },
    Supports:{
      "S":[],
      "A":[],
      "B":[],
      "C":[],
      "D":[],
    },
    Others:{
      "S":[],
      "A":[],
      "B":[],
      "C":[],
      "D":[],
    }
  });
  const [pestana, setPestana] = useState(0)
  const category = ["Craftable", "Radiants", "Emblems", "Chemtech", "Artefacts", "Supports", "Chembaron", "GarenMod","Others"]; // Categorías a incluir

  useEffect(()=>{
    (async function traerDatos(){
      const url=tierListItemJSON;
      const datos = await fetch(url, {cache:"no-cache"});
      const resp = await datos.json();
      setTierList(resp)
    })()
  },[]);


  function handleDropOutside(e, elemento) {
    e.stopPropagation();
    // const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    // var item = e.currentTarget;
    const tier = e.currentTarget.getAttribute("data-tier")
    const dataItem = JSON.parse(e.currentTarget.getAttribute("data-item"))
    var rectS = document.getElementById("S").getBoundingClientRect();
    // var rectA = document.getElementById("A").getBoundingClientRect();
    // var rectB = document.getElementById("B").getBoundingClientRect();
    // var rectC = document.getElementById("C").getBoundingClientRect();
    var rectD = document.getElementById("D").getBoundingClientRect();
    if(e.clientX > rectS.right || e.clientX < rectS.left || e.clientY < rectS.top ||  e.clientY > rectD.bottom){
      console.log("entre")
      setTierList((oldObject)=>{return {
        ...oldObject,
        [category[pestana]]: {
          ...oldObject[category[pestana]],
          [tier]: [...oldObject[category[pestana]][tier].filter(({apiName})=>apiName !== dataItem.apiName)]
        }
      }})
    }
  }

  function handleDragStart(e) {
    e.stopPropagation();
    if (e.currentTarget?.hasAttribute("data-item")) {
      e.dataTransfer.setData("item", e.currentTarget.getAttribute("data-item"));
    }
    e.dataTransfer.setData("from", e.currentTarget.getAttribute("data-from"));
    e.dataTransfer.setData("tier", e.currentTarget.getAttribute("data-tier"));
  }

  function crearItem(e) {
    const dataItem = JSON.parse(e.dataTransfer.getData("item"));
    var tier = e.currentTarget.id
    if(!tier){
      tier = e.currentTarget.parentNode.parentNode.id;
    }
    if(checkDuplicate(dataItem)){
      alert("hay un duplicado")
    }else{
      setTierList((oldObject)=>{
        return {
          ...oldObject,
          [category[pestana]]:{
            ...oldObject[category[pestana]],
            [tier] : [...oldObject[category[pestana]][tier],dataItem] 
            }
          }
        })
    }
  }

  function swapItem(e) {
    const fromTier = e.dataTransfer.getData("tier");
    var newTier = e.currentTarget.id;
    if(!newTier){
      newTier = e.currentTarget.parentNode.parentNode.id;
    }
    const dataItem = JSON.parse(e.dataTransfer.getData("item"));
    if(fromTier === newTier){
      setTierList((oldObject)=>{
        return {
          ...oldObject,
          [category[pestana]]:{
            ...oldObject[category[pestana]],
            [newTier]: [...oldObject[category[pestana]][fromTier].filter(({apiName})=>apiName !== dataItem.apiName).map((item) => structuredClone(item)),dataItem],
          },
        }
      })
    }else{
      setTierList((oldObject)=>{
        return {
          ...oldObject,
          [category[pestana]]:{
            ...oldObject[category[pestana]],
            [fromTier]: [...oldObject[category[pestana]][fromTier]].filter(({apiName})=>apiName !== dataItem.apiName).map((item) => structuredClone(item)),
            [newTier]:[...oldObject[category[pestana]][newTier],dataItem],
          },
        }
      })
    }
  }

  function checkDuplicate(dataItem){
    return Object.values(tierList[category[pestana]]).flat(Infinity).some(({apiName})=>apiName === dataItem.apiName)
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    // const hex = e.currentTarget;
    const dataFrom = e.dataTransfer.getData("from");
    const dataItem = e.dataTransfer.getData("item");
    const dataTier = e.dataTransfer.getData("tier");
    if (dataFrom === "itemList" && dataItem) {
      crearItem(e);
    }

    if (dataFrom === "itemBoard" && dataItem) {
      swapItem(e);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function saveTierList(){
    const url = crearTierListItemPHP
    const token = import.meta.env.PUBLIC_TOKEN_META
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',  // Definir que el cuerpo es JSON
              'Authorization': `Bearer ${token}`,  // Enviar el token en el encabezado
            },
            body: JSON.stringify({[category[pestana]]:tierList[category[pestana]]}),  // Convertir los datos a formato JSON
        });

        const resultado = await response.json();  // Parsear la respuesta como JSON
        if (response.ok) {
           alert('Éxito:', resultado);
        } else {
           alert('Error en el servidor:', resultado);
        }
    } catch (error) {
        console.log('Error al hacer la solicitud:', error);
    }
  }

  
  return (
    <>
    <div className={style.container}>
      <div className={style.btn}>
      {category.map((name, index)=>{
          return <button key={name+index} className={pestana === index ? style.btnActive : ""} onClick={()=>setPestana(index)}>{name}</button>
        })}
      </div>
      <div className={style.containerTierList}>
        <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-S.webp" alt="Tier S" />
        </div>
        <div
          className={style.containerTierListItems}
          id="S"
          onDrop={(e)=>{handleDrop(e)}}
          onDragOver={(e) => {
              handleDragOver(e);
            }}
          draggable
        >
          {tierList?.[category?.[pestana]]?.["S"].map((dataItem,i)=>{
              return (
                <div key={"S"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} alt={dataItem?.nombre} data-from="itemBoard" data-tier="S" data-item={JSON.stringify(dataItem)} onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
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
            onDrop={(e)=>{handleDrop(e)}}
            onDragOver={(e) => {
                handleDragOver(e);
              }}
            draggable
            >
            {tierList?.[category?.[pestana]]?.["A"].map((dataItem,i)=>{
              return (
                <div key={"A"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} alt={dataItem.nombre} data-from="itemBoard" data-tier="A" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
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
            onDrop={(e)=>{handleDrop(e)}}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
            draggable
            >
            {tierList?.[category?.[pestana]]?.["B"].map((dataItem,i)=>{
              return (
                <div key={"B"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} alt={dataItem.nombre} data-from="itemBoard" data-tier="B" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
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
            onDrop={(e)=>{handleDrop(e)}}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
            draggable
            >
            {tierList?.[category?.[pestana]]?.["C"].map((dataItem,i)=>{
              return (
                <div key={"C"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} alt={dataItem.nombre} data-from="itemBoard" data-tier="C" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
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
            onDrop={(e)=>{handleDrop(e)}}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
            draggable
            >
            {tierList?.[category?.[pestana]]?.["D"].map((dataItem,i)=>{
              return (
                <div key={"D"+i} className={style.containerItem}>
                  <img className={style.imgItem} src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} alt={dataItem.nombre} data-from="itemBoard" data-tier="D" data-item={JSON.stringify(dataItem)}  onDrop={(e)=>handleDrop(e)} onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDropOutside(e,"item")}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <button onClick={()=>{saveTierList()}}>SAVE</button>
      <Items version={currentVersion}/>
      <ItemsTierList/>
    </>
  )
}

export default CreateItemsTierList