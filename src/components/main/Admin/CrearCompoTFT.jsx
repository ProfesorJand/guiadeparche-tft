import React, {useCallback, useContext, useEffect, useState} from "react"
import style from "./css/CrearCompoTFT.module.css"
import Builder from "./Builder.jsx"
import Champions from "./ChampionsList.jsx"
import Items from "./Items.jsx";
import {listaCampeones} from "../../../functions/campeonestft.js";
import {augmentsIDList, itemsData} from "../../../json/updates/constantesLatest.js"
import Youtube from "../../youtube/Youtube.jsx"
const CrearCompoTFT = () =>{
    const urlImgAum = "https://raw.communitydragon.org/latest/game/"
    const [tier, setTier] = useState("S")
    const [posicion, setPosicion] = useState(1)
    const [dificultad, setDificultad] = useState("Easy")
    const [titulo, setTitulo] = useState("")
    const [categoria, setCategoria] = useState([])
    const [campeones, setCampeones] = useState([]) //[{},{}]
    const [earlyComp, setEarlyComp] = useState([]) //[{},{}]
    const [carousel, setCarousel] = useState([]) //[{},{}]
    const [traits, setTraits] = useState([]) //[{},{}]
    const [aumentos, setAumentos] = useState([]) //[{},{}]
    const [listaDeAumentos, setListaDeAumentos] = useState([])
    const [gameplay, setGameplay] = useState([])
    const [composiciones, setComposiciones] = useState([]) //[{},{}]
    const [tips, setTips] = useState("");
    const [infoChampsItems, setInfoChampsItems] = useState("items");
    const [boardInfo, setBoardInfo] = useState({});

    useEffect(()=>{
      const dataAumentos = itemsData.filter(({apiName})=>{
        return augmentsIDList.includes(apiName)
      })
      setListaDeAumentos(dataAumentos)

    }, [])

    useEffect(()=>{
        console.log(listaDeAumentos)
    }, [listaDeAumentos])

    function handleToogleInfo(button){
        setInfoChampsItems(button)
    }

    function agregarEarlyComp(){
      const campeonEarlyComp = document.getElementById("earlyCompChoice");
      const value = campeonEarlyComp.value;
      const dataList = document.getElementById("earlyComp");
      const dataValue = dataList.options.namedItem(`datalist-${value}`)?.dataset.value;
      if(dataValue){
        setEarlyComp((oldArray)=>[...oldArray, JSON.parse(dataValue) ]);
        campeonEarlyComp.value = "";
      }else{
        alert("Selecciona o Escribe el nombre completo del campeón")
      }
    }
    function eliminarChampEarlyComp(nombreCampeon){
        setEarlyComp((oldArray)=> oldArray.filter(data=>data.nombre !== nombreCampeon ))
    }

    function agregarAumento(){
      const aumentosInput = document.getElementById("aumentos");
      const value = aumentosInput.value;
      const dataList = document.getElementById("dataListAumentos");
      const dataValue = dataList.options.namedItem(`datalist-${value}`)?.dataset.value;
      if(dataValue){
        setAumentos((oldArray)=>[...oldArray, JSON.parse(dataValue) ]);
        aumentosInput.value = "";
      }else{
        alert("Selecciona o Escribe el nombre completo del campeón")
      }
    } 
    function eliminarAumento(apiName){
      setAumentos((oldArray)=> oldArray.filter(data=>data.apiName !== apiName ))
    }
    function agregarGameplay(){
      const gameplayURL = document.getElementById("gameplay");
      const value = gameplayURL.value
      setGameplay(oldArray=>[...oldArray, value])
      gameplayURL.value = "";
    }


    function mySubmit(e) { 
        e.preventDefault(); 
        
        return false;
      }
    return (
    <form className={style.containerCrearCompo} onSubmit={(e)=>mySubmit(e)}>

      <label htmlFor="tiers">Tier:
          <select
              name="tiers"
              id="tiers"
              onChange={(e)=>setTier(e.target.value)}
          >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="MEME">MEME</option>
          </select>
      </label>

      <label htmlFor="position">Position:
      <input
          name="position"
          type="number"
          defaultValue={posicion}
          onChange={(e)=>setPosicion(e.target.value)}
          min={1}/>
      </label>

      <label htmlFor="dificulty">Dificulty:
        <select
            name="dificulty"
            id="dificulty"
            onChange={(e)=>setDificultad(e.target.value)}
        >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
      </label>

      <label htmlFor="title">Title:
        <input
          name="title"
          type="text"
          defaultValue={titulo}
          onChange={(e)=>setTitulo(e.target.value)}
        />
      </label>

      <label htmlFor="tiers">Category:
        <select name="tiers" id="tiers">
            <option value="3 Stars | Roll Lv4-6">3 Stars | Roll Lv4-6</option>
            <option value="Legendary">Legendary</option>
            <option value="Augment">Augment</option>
        </select>
      </label>

      <label htmlFor="earlyCompChoice">Early Comp:
        <input list="earlyComp" name="earlyCompChoice" id="earlyCompChoice"/>
        <datalist id="earlyComp">
            {listaCampeones && listaCampeones.map((dataCampeon)=>{
              return (<option key={"listaCampeones"+dataCampeon.nombre} id={`datalist-${dataCampeon.nombre}`} data-value={JSON.stringify(dataCampeon)} value={dataCampeon.nombre}></option>)
            })}
        </datalist>
        <button onClick={()=>agregarEarlyComp()}>Agregar Campeon</button>
      </label>
      <div className={style.containerEarlyComp}>
      {earlyComp.map((dataCampeon)=>{
        return (
          <div key={"EarlyCompChamp"+dataCampeon.nombre} className={style.containerEarlyCompWrapper}>
            <button className={style.btnClose} onClick={()=>eliminarChampEarlyComp(dataCampeon.nombre)}>X</button>
            <img src={dataCampeon.img} alt={dataCampeon.nombre} className={style.imgEarlyComp}></img>
          </div>
        )
      })}
      </div>
      <label htmlFor="aumentos">Aumentos:
        <input list="dataListAumentos" name="aumentos" id="aumentos"/>
        <datalist id="dataListAumentos">
          {listaDeAumentos.map((aum)=>{
            return <option key={"ListaDeAumentos"+aum.name} id={`datalist-${aum.apiName}`} data-value={JSON.stringify(aum)} value={aum.apiName}>{aum.name}</option>
          })}
        </datalist>
        <button onClick={()=>agregarAumento()}>Agregar Aumento</button>
      </label>
      <div className={style.containerAumentos}>
          
        {aumentos.map(({icon, apiName})=>{
          return (
            <div key={"ImgAumentos"+apiName} className={style.horizontalWrapper}>
              <button className={style.btnClose} onClick={()=>eliminarAumento(aum.apiName)}>X</button>
              <img src={urlImgAum+icon.toLowerCase().replace(".tex",".png")} className={style.imgAumento}></img>
            </div>
        )
        })}
      </div>

      <label htmlFor="gameplay">Gameplay:
          <input type="text" defaultValue={gameplay} id="gameplay"></input>
          <button onClick={()=>agregarGameplay()}>Agregar Gameplay</button>
      </label>
      <div className={style.containerYoutube}>
          {gameplay.map((url,i)=>{
            return (
              <div key={"gameplaysURL"+i}>
                 <button className={style.btnClose} onClick={()=>eliminarGameplay(url)}>X</button>
                <Youtube src={url}></Youtube>
              </div>
          )
          })}
      </div>

      <label htmlFor="tips">Tips:
          <textarea  type="text" defaultValue={tips}></textarea>
      </label>
      <div className={style.builderContainer}>
        <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} />
      </div>

      <div>
        <button onClick={()=>{handleToogleInfo("campeones")}}>Campeones</button>
        <button onClick={()=>{handleToogleInfo("items")}}>Items</button>
        {infoChampsItems === "campeones" ? <Champions/> : <Items/>}
      </div>
        {/* <input type="submit" value="Crear Compo"/> */}
    </form>



    )
}

export default CrearCompoTFT