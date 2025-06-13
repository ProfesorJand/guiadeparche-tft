import React, { useEffect, useState } from "react";
import style from "./css/CrearTierListChampItem.module.css"
import { championsTFT } from "src/json/updates/constantesLatest";
import {CRAFTEABLE_ITEMS, ARTEFACTOS, OTROS_ITEMS, tierListChampionItemJSON, crearTierListChampionItemPHP} from "src/stores/dataTFT"
import { radiantsItems, emblems, itemsDataIngles, augmentsIDList } from "src/json/updates/itemsTFT";
import {traitsColors} from "src/functions/campeonestft.js"

const CrearTierListChampItem = ()=>{
const [tierList, setTierList] = useState({})
const [listaDeAumentos, setListaDeAumentos] = useState([])

useEffect(()=>{
  const dataAumentos = itemsDataIngles.filter(({apiName})=>{
    return augmentsIDList.includes(apiName)
  })
  setListaDeAumentos(dataAumentos)
  Object.keys(traitsColors).forEach((va)=>{
    console.log(va)

  })
  async function fetchingTierListChampionItem(){
    const url= tierListChampionItemJSON
    await fetch(url,{cache:"no-cache"}).then((data)=>data.json()).then((resp)=>setTierList(resp)).catch(err=>console.error(err))
    
  }
  fetchingTierListChampionItem()
}, []);

const campeonesOrdenados = [...championsTFT].filter(({cost,traits})=>cost >= 1 && cost <= 5 && traits.length).sort((a,b)=>{
if(a.cost > b.cost){
  return 1
}
if(b.cost > a.cost){
  return -1
}
if(a.name > b.name){
  return 1
}
if(b.name > a.name){
  return -1
}
return 0
})

useEffect(()=>{
  if(Object.keys(tierList).length){
    console.log(tierList)
    function addingTierListToBackEnd(tierList){
      const url= crearTierListChampionItemPHP
      const token = import.meta.env.PUBLIC_TOKEN_META
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tierList)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    }
    addingTierListToBackEnd(tierList)
  }

},[tierList]);

function addItem(e, itemSlot, apiNameChamp, cost){
  e.preventDefault();
  const value = e.target.value;
  const datalistItems = document.getElementById(`items${apiNameChamp}`);
  const optionValue = datalistItems.querySelector(`[value="${value}"]`);
  if(optionValue){
    const data = optionValue.getAttribute('data-data_item')
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], [itemSlot]:JSON.parse(data), cost}}})
  }else{
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], [itemSlot]:null}}})
  }
}

function addSinergia(e,apiNameChamp){
  e.preventDefault();
  const value = e.target.value;
  const datalistSinergia = document.getElementById(`sinergias${apiNameChamp}`);
  const optionValue = datalistSinergia.querySelector(`[value="${value}"]`);
  if(optionValue){
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], Sinergia:value}}})
  }else{
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], Sinergia:null}}})
  }
}

function addSinergiaNumber(e,apiNameChamp){
  e.preventDefault();
  const value = e.target.value;
  if(value){
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], SinergiaNumber:value}}})
  }else{
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], SinergiaNumber:null}}})
  }
}

function addAumento(e,apiNameChamp){
  e.preventDefault();
  const value = e.target.value;
  const datalistAumento = document.getElementById(`augments${apiNameChamp}`);
  const optionValue = datalistAumento.querySelector(`[value="${value}"]`);
  if(optionValue){
    const data = optionValue.getAttribute('data-data')
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], Aumento:JSON.parse(data)}}})
  }else{
    setTierList((oldObject)=>{return {...oldObject, [apiNameChamp]: {...oldObject[apiNameChamp], Aumento:null}}})
  }
}


return (
  <div className={style.containerTierList}>
  {listaDeAumentos.length > 0 && campeonesOrdenados.map(({name,squareIcon,apiName: apiNameChamp, cost},y)=>{
    const url="https://raw.communitydragon.org/latest/game/"
    const iconPNG = squareIcon.toLowerCase().replace(".tex",".png")
    return (
      <div key={apiNameChamp+y} className={style.containerChampionInfo}>
        <div className={style.containerImgCampeon}>
          <img className={style.imgCampeon} src={url+iconPNG} alt={name} loading="lazy"></img>
        </div>

        <div className={style.containerItems}>
          <input className={style.input} type="text" list={"items"+apiNameChamp} id={name+"Item1"} onChange={(e)=>{addItem(e,"item1",apiNameChamp, cost)}} placeholder="Item1" value={tierList?.[apiNameChamp]?.["item1"]?.["nombre"] || tierList?.[apiNameChamp]?.["item1"]?.["name"]}/>
          <input className={style.input} type="text" list={"items"+apiNameChamp} id={name+"Item2"} onChange={(e)=>{addItem(e,"item2",apiNameChamp, cost)}} placeholder="Item2" value={tierList?.[apiNameChamp]?.["item2"]?.["nombre"] || tierList?.[apiNameChamp]?.["item2"]?.["name"]}/>
          <input className={style.input} type="text" list={"items"+apiNameChamp} id={name+"Item3"} onChange={(e)=>{addItem(e,"item3",apiNameChamp, cost)}} placeholder="Item3" value={tierList?.[apiNameChamp]?.["item3"]?.["nombre"] || tierList?.[apiNameChamp]?.["item3"]?.["name"]}/>
          <datalist key={apiNameChamp+"datalist"} name={apiNameChamp+"datalist"} id={"items"+apiNameChamp}>
            {CRAFTEABLE_ITEMS.map((data)=>{
              const {nombre,apiName} = data;
              return (
                <option key={apiName+apiNameChamp} value={nombre} data-data_item={JSON.stringify(data)} data-api_name_champ={apiNameChamp}>{apiNameChamp}</option>
              )
            })}
            {ARTEFACTOS.map((data,i)=>{
              const {nombre,apiName} = data;
              return (
                <option key={apiName+apiNameChamp+i} value={nombre} data-data_item={JSON.stringify(data)} data-api_name_champ={apiNameChamp}>{apiNameChamp}</option>
              )
            })}
            {OTROS_ITEMS.map((data,i)=>{
              const {nombre,apiName} = data;
              return (
                <option key={apiName+apiNameChamp+i} value={nombre} data-data_item={JSON.stringify(data)} data-api_name_champ={apiNameChamp}>{apiNameChamp}</option>
              )
            })}
             {radiantsItems.map((data,i)=>{
              const {name,apiName} = data;
              return (
                <option key={apiName+apiNameChamp+i} value={name} data-data_item={JSON.stringify(data)} data-api_name_champ={apiNameChamp}>{apiNameChamp}</option>
              )
            })}
            {emblems.map((data,i)=>{
              const {name,apiName} = data;
              return (
                <option key={apiName+apiNameChamp+i} value={name} data-data_item={JSON.stringify(data)} data-api_name_champ={apiNameChamp}>{apiNameChamp}</option>
              )
            })}
          </datalist>
  

          <div className={style.containerItemsImg}>
            {tierList?.[apiNameChamp]?.["item1"] &&
            <div className={style.divItemsImg}>
              <img className={style.imgItem} src={tierList?.[apiNameChamp]?.item1.img} alt={tierList?.[apiNameChamp]?.item1.name}/>
            </div>
            }
            {tierList?.[apiNameChamp]?.["item2"] &&
            <div className={style.divItemsImg}>
              <img className={style.imgItem} src={tierList?.[apiNameChamp]?.item2.img} alt={tierList?.[apiNameChamp]?.item2.name}/>
            </div>
            }
            {tierList?.[apiNameChamp]?.["item3"] &&
            <div className={style.divItemsImg}>
              <img className={style.imgItem} src={tierList?.[apiNameChamp]?.item3.img} alt={tierList?.[apiNameChamp]?.item3.name}/>
            </div>
            }
          </div>
        
        </div>

        <div className={style.containerSinergiaAumento}>
            <input className={style.input} type="text" list={"sinergias"+apiNameChamp} id={apiNameChamp+"Sinergia"} onChange={(e)=>{addSinergia(e, apiNameChamp)}} placeholder="Sinergia" value={tierList?.[apiNameChamp]?.["Sinergia"]}/>
            <input type="number" placeholder="Numero de la Sinergia" onChange={(e)=>{addSinergiaNumber(e,apiNameChamp)}} value={tierList?.[apiNameChamp]?.["SinergiaNumber"]}/>
            <datalist name="sinergias" id={"sinergias"+apiNameChamp}>
              {Object.keys(traitsColors).map((trait,i)=>{
                return <option key={trait+i} value={trait} ></option>
              })}
            </datalist>
            <input className={style.input} type="text" list={"augments"+apiNameChamp} id={apiNameChamp+"Aumento"} onChange={(e)=>{addAumento(e, apiNameChamp)}} placeholder="Aumento" value={tierList?.[apiNameChamp]?.["Aumento"]?.["name"]}/>
            <datalist name="augments" id={"augments"+apiNameChamp}>
              { listaDeAumentos.map((dataAumento)=>{
                return <option key={dataAumento.apiName} value={dataAumento.name} data-data={JSON.stringify(dataAumento)} >{dataAumento.apiName}</option>
              })}
            </datalist>
            <div className={style.containerSAImg}>
              {tierList?.[apiNameChamp]?.["Sinergia"] &&
              <div className={style.divSAImg}>
                <img className={style.imgItem} src={`/sinergias/Trait_Icon_12_${tierList?.[apiNameChamp]?.["Sinergia"]}.svg`} alt=""/>
              </div>
              }
              {tierList?.[apiNameChamp]?.["Aumento"] &&
              <div className={style.divSAImg}>
                <img className={style.imgItem} src={"https://raw.communitydragon.org/latest/game/"+tierList?.[apiNameChamp]?.["Aumento"].icon.toLowerCase().replace(".tex",".png")} alt=""/>
              </div>
              }
            </div>
        </div>
      </div>
    )
  })}
  </div>
 )
}

export default CrearTierListChampItem;