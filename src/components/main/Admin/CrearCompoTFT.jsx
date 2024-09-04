import React, {useEffect, useState} from "react"
import style from "./css/CrearCompoTFT.module.css"
import Builder from "./Builder.jsx"
import Champions from "./ChampionsList.jsx"
import Items from "./Items.jsx";
import {augmentsIDList, itemsData} from "../../../json/updates/constantesLatest.js"
import Youtube from "../../youtube/Youtube.jsx";
import { toBlob } from 'html-to-image';
import { BASIC_ITEMS, CRAFTEABLE_ITEMS, dataTFTItems } from "src/stores/dataTFT.js";
import { emblems } from "src/json/updates/constantesLatest";

const CrearCompoTFT = () =>{
    const urlImgAum = "https://raw.communitydragon.org/latest/game/"
    const shadowCategories = ["Fast 8","Specifics Augments","3 Stars"]
    const infographicCategories = ["Roll Lv5","Roll Lv6","Roll Lv7","Roll Lv8","Roll Lv9","Roll Lv10"]
    const [tier, setTier] = useState("S")
    const [posicion, setPosicion] = useState(1)
    const [dificultad, setDificultad] = useState("Easy")
    const [titulo, setTitulo] = useState("");
    const [shadowCategory, setShadowCategory] = useState(shadowCategories[0])
    const [infographicCategory, setInfographicCategory] = useState(infographicCategories[0])
    const [aumentos, setAumentos] = useState([]) //[{},{}]
    const [listaDeAumentos, setListaDeAumentos] = useState([])
    const [gameplay, setGameplay] = useState([])
    const [tips, setTips] = useState("");
    const [infoChampsItems, setInfoChampsItems] = useState("items");
    const [boardInfo, setBoardInfo] = useState({});
    const [showBoard, setShowBoard] = useState("early");
    const [showName, setShowName] = useState(false);
    const [takePicture, setTakePicture] = useState(false);
    const [pictureSave, setPictureSave] = useState({});
    const [carouselBasicItems, setCarouselBasicItems] = useState({});
    const [carouselItems, setCarouselItems] = useState({});
    const [spatulaItem1, setSpatulaItem1] = useState("");
    const [spatulaItem2, setSpatulaItem2] = useState("");

    useEffect(()=>{
      const dataAumentos = itemsData.filter(({apiName})=>{
        return augmentsIDList.includes(apiName)
      })
      setListaDeAumentos(dataAumentos)
      console.log(emblems)
    }, [])


    useEffect(()=>{
      if(takePicture){
        if(!titulo){
          alert("Debes añadir un titulo primero para poder guardar las imagenes")
          return
        }
        console.log("hola")
        async function captureAndConvertToWebP(id){
          const element = document.getElementById(id);
          const desiredWidth = 1920;  // Cambia esto al ancho deseado
          const desiredHeight = 1080; // Cambia esto al alto deseado
          toBlob(element)
          .then((blob) => {
              const webpBlob = new Blob([blob], { type: 'image/webp' });
              const nombreArchivo = titulo ? titulo + `-${id}` : `default-${id}`;
              // Crear un objeto FormData para enviar los datos
              const formData = new FormData();
              formData.append('file', webpBlob, `${nombreArchivo}.webp`);
        
              // Realizar la solicitud POST al servidor
              fetch('https://guiadeparche.com/tftdata/Set12/uploadImageWebp.php', {
                  method: 'POST',
                  body: formData,
              })
              .then(response => response.json())
              .then(data => {
                  if (data.status === 'success') {
                      setPictureSave((oldObject)=>{return {...oldObject,[id]:true}})
                      alert('File uploaded successfully');
                  } else {
                    alert('File upload failed:', data.message);
                  }
              })
              .catch(error => {
                alert('Error uploading file:', error);
              });
          })
          .catch((error) => {
            alert('Error generating image', error);
          });
        }
        captureAndConvertToWebP(showBoard)

        setTakePicture(false)
        
      }
      
    },[takePicture])

    function handleToogleInfo(button){
        setInfoChampsItems(button)
    }

    function handleBuilderLevel(id){
      setShowBoard(id)
    }

    function agregarAumento(e){
      e.preventDefault();
      const aumentosInput = document.getElementById("aumentos");
      const value = aumentosInput.value;
      if(aumentos.length >= 6){
        alert("Has alcanzado el limite de 6 aumentos.\nElimina un aumento para añadir uno nuevo.")
        return
      }
      const repetido = aumentos.filter(({apiName})=>{
        return apiName === value
      })
      if(repetido.length === 1){
        alert(`Aumento: ${value} está repetido, añade otro aumento`)
        return
      }

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
    function agregarGameplay(e){
      e.preventDefault();
      const gameplayURL = document.getElementById("gameplay");
      const value = gameplayURL.value
      setGameplay(oldArray=>[...oldArray, value])
      gameplayURL.value = "";
    }
    function eliminarGameplay(url){
      setGameplay((oldArray)=>oldArray.filter((value)=>value !== url))
    }

    function toggleOcultarNombre(show){
      setShowName(!show)
    }

    function handlerBasicItem(value, item){
      let combineNumber;
      switch (value) {
        case "BF Sword":
          combineNumber = 0
          break;
        case "Recurve Bow":
          combineNumber = 1
          break;
        case "Needlessly Large Rod":
          combineNumber = 2
          break;
        case "Tear of the Goddess":
          combineNumber = 3
          break;
        case "Chain Vest":
          combineNumber = 4
          break;
        case "Negatron Cloak":
          combineNumber = 5
          break;
        case "Gaints Belt":
          combineNumber = 6
          break;
        case "Sparring Gloves":
        combineNumber = 7
        break;
        case "Spatula":
        combineNumber = 8
        break;
        default:
          break;
      }
      setCarouselBasicItems((oldObject)=>{ return {...oldObject, [item]:combineNumber }})
      const [data] = BASIC_ITEMS.filter((item)=>{
        return item.nombre === value
      })
      setCarouselItems((oldObject)=>{ return {...oldObject, [item]:data }})
    }

    function handlerCompleteItem(value, item){
      const [data] = CRAFTEABLE_ITEMS.filter((item)=>{
        return item.nombre === value
      })
      setCarouselItems((oldObject)=>{ return {...oldObject, [item]:data }})
    }

    function hanlderSpatulaItem(value, number){
      const option = document.getElementById("dataListSpatulaItems").options.namedItem(`datalist-${value}`).getAttribute("data-value");
      const imgUrl = JSON.parse(option).img
      if(number === 1){
        setSpatulaItem1(imgUrl);
        document.getElementById("spatulaItems1").value= value 
      }else{
        setSpatulaItem2(imgUrl);
        document.getElementById("spatulaItems2").value= value 
      }
    }

    function mySubmit(e) { 
        e.preventDefault(); 
        // obtener datos de: tier, position, dificulty, tittle, shadowCategory, infographicCategory
        // check aumentos, boardInfo, pictureSave, carouselItems, Gameplay (opcional), Tips (opcional)
        const resultado = {
          tier,
          posicion,
          dificultad,
          titulo,
          shadowCategory,
          infographicCategory,
          aumentos,
          carouselItems,
          boardInfo,
          pictureSave,
          gameplay,
          tips,
          spatulaItem1,
          spatulaItem2
        }
        if(tier && posicion && dificultad && titulo && shadowCategory && infographicCategory && aumentos.length && Object.keys(carouselItems).length && Object.keys(boardInfo).length && Object.keys(pictureSave).length){

          fetch('https://guiadeparche.com/tftdata/Set12/crearCompoMeta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resultado),
          })
          .then(response => response.json())  // Analiza la respuesta JSON del servidor
          .then(data => {
            if (data.status === 'success') {
                alert('Composicion creada de forma exitosa:', data.message);
            } else {
                console.error('Error adding data:', data.message);
            }
          })
          .catch(error => {
              console.error('Error:', error);
          });
        }else{
          alert("Faltan campos por llenar")
          return
        }
      }
    return (
    <form className={style.containerCrearCompo} onSubmit={(e)=>mySubmit(e)}>

      <label htmlFor="tiers">Tier:
          <select
              name="tiers"
              id="tiers"
              onChange={(e)=>setTier(e.target.value)}
              required
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
          min={1}
          required
          />
      </label>

      <label htmlFor="dificulty">Dificulty:
        <select
            name="dificulty"
            id="dificulty"
            onChange={(e)=>setDificultad(e.target.value)}
            required
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
          required
        />
      </label>

      <label htmlFor="tiers">Shadow Category:
        <select name="tiers" id="tiers" onChange={(e)=>setShadowCategory(e.target.value)} required>
          {shadowCategories.map((cat)=>{
            return (
              <option key={cat} value={cat}>{cat}</option>
            )
          })}
        </select>
      </label>

      <label htmlFor="tiers">Infographic Category:
        <select name="tiers" id="tiers" onChange={(e)=>setInfographicCategory(e.target.value)} required>
          {infographicCategories.map((cat)=>{
            return (
              <option key={cat} value={cat}>{cat}</option>
            )
          })}
        </select>
      </label>

      <label htmlFor="aumentos">Aumentos:
        <input list="dataListAumentos" name="aumentos" id="aumentos"/>
        <datalist id="dataListAumentos">
          {listaDeAumentos.map((aum, i )=>{
            return <option key={"ListaDeAumentos"+aum.name+i} id={`datalist-${aum.apiName}`} data-value={JSON.stringify(aum)} value={aum.apiName}>{aum.name}</option>
          })}
        </datalist>
        <button onClick={(e)=>agregarAumento(e)}>Agregar Aumento</button>
      </label>
      <div className={style.containerAumentos}>
          
        {aumentos.map(({icon, apiName})=>{
          return (
            <div key={"ImgAumentos"+apiName} className={style.horizontalWrapper}>
              <button className={style.btnClose} onClick={()=>eliminarAumento(apiName)}>X</button>
              <img src={urlImgAum+icon.toLowerCase().replace(".tex",".png")} className={style.imgAumento}></img>
            </div>
        )
        })}
      </div>

      <div className={style.containerButtonsHorizontal}>
        <button className={[style.btn, pictureSave["early"] ? style.savePicture : ""].join(" ")} onClick={()=>{handleBuilderLevel("early")}}>Early</button>
        <button className={[style.btn, pictureSave["lv7"] ? style.savePicture : ""].join(" ")} onClick={()=>{handleBuilderLevel("lv7")}}>Lv 7</button>
        <button className={[style.btn, pictureSave["lv8"] ? style.savePicture : ""].join(" ")} onClick={()=>{handleBuilderLevel("lv8")}}>Lv 8</button>
        <button className={[style.btn, pictureSave["lv9"] ? style.savePicture : ""].join(" ")} onClick={()=>{handleBuilderLevel("lv9")}}>Lv 9</button>
        <button className={[style.btn, pictureSave["lv10"] ? style.savePicture : ""].join(" ")} onClick={()=>{handleBuilderLevel("lv10")}}>Lv 10</button>
        <button className={[style.btn, pictureSave["spatula1"] ? style.savePicture : ""].join(" ")} onClick={()=>{handleBuilderLevel("spatula1")}}>Spatula #1</button>
        <button className={[style.btn, pictureSave["spatula2"] ? style.savePicture : ""].join(" ")} onClick={()=>{handleBuilderLevel("spatula2")}}>Spatula #2</button>
      </div>
      <h2>{showBoard=== "early" ? "Early" : showBoard === "lv7" ? "Level 7": showBoard === "lv8" ? "Level 8": showBoard === "lv9" ? "Level 9" : showBoard=== "lv10" ? "Level 10": showBoard=== "spatula1" ? "Spatula #1": showBoard=== "spatula2" ? "Spatula #2" : ""}</h2>
      {showBoard === "spatula1"  &&
      <div>
        <input onChange={(e)=>hanlderSpatulaItem(e.target.value, 1)} list="dataListSpatulaItems" name="spatulaItems1" id="spatulaItems1" ></input>
        {spatulaItem1 !== "" &&
        <div>
          <img src={spatulaItem1} alt="espatulaItem"/>
        </div>
        }
      </div>}
      {showBoard === "spatula2"  &&
      <div>
        <input onChange={(e)=>hanlderSpatulaItem(e.target.value, 2)} list="dataListSpatulaItems" name="spatulaItems2" id="spatulaItems2" ></input>
        {spatulaItem2 !== "" &&
        <div>
          <img src={spatulaItem2} alt="espatulaItem"/>
        </div>
        }
      </div>}
      <datalist id="dataListSpatulaItems">
        {emblems.map((dataItem, i )=>{
          return <option key={"ListaDeEmblemas"+dataItem.nombre+i} id={`datalist-${dataItem.name}`} value={dataItem.name} data-value={JSON.stringify(dataItem)}></option>
        })}
      </datalist>

      <div className={style.builderContainer}>
      	{showBoard=== "early" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv7" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv8" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv9" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv10" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
        {showBoard=== "spatula1" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
        {showBoard=== "spatula2" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
      </div>
          
        <button className={style.ocultarNombre} onClick={()=>{toggleOcultarNombre(showName)}}>{showName ? "Mostrar Nombres" : "Ocultar Nombres" }</button>
        <button className={style.ocultarNombre} onClick={()=>{setTakePicture(true)}}>Guardar imagen</button>
      <div>
        <button onClick={()=>{handleToogleInfo("campeones")}}>Campeones</button>
        <button onClick={()=>{handleToogleInfo("items")}}>Items</button>
        {infoChampsItems === "campeones" ? <Champions/> : <Items/>}
      </div>
      
      <div className={style.containerCarousel}>
      Carousel 
      <div className={style.containerCarouselForm}>
        
        <div className={style.containerCarouselFormVertical}>
          Basic Item:
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item1" id="Carousel_Basic_Item1" onChange={(e)=>handlerBasicItem(e.target.value, "BasicItem1")}/>
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item2" id="Carousel_Basic_Item2" onChange={(e)=>handlerBasicItem(e.target.value, "BasicItem2")}/>
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item3" id="Carousel_Basic_Item3" onChange={(e)=>handlerBasicItem(e.target.value, "BasicItem3")}/>
          <datalist id="dataListItemsBasicos">
            {BASIC_ITEMS.map((item, i )=>{
              return <option key={"ListaDeItemsBasicos"+item.name+i} id={`datalist-${item.apiName}`} value={item.nombre}></option>
            })}
          </datalist>
        </div>
        <div className={style.containerCarouselFormVertical}>
          Complete Item:
          <input list="dataListItemsCrafteables1" name="Carousel_Complete_Item1" id="Carousel_Complete_Item1" onChange={(e)=>handlerCompleteItem(e.target.value, "CompleteItem1")} disabled={carouselItems["BasicItem1"] !== undefined ? false: true}/>
          <input list="dataListItemsCrafteables2" name="Carousel_Complete_Item2" id="Carousel_Complete_Item2" onChange={(e)=>handlerCompleteItem(e.target.value, "CompleteItem2")} disabled={carouselItems["BasicItem2"] !== undefined ? false: true}/>
          <input list="dataListItemsCrafteables3" name="Carousel_Complete_Item3" id="Carousel_Complete_Item3" onChange={(e)=>handlerCompleteItem(e.target.value, "CompleteItem3")} disabled={carouselItems["BasicItem3"] !== undefined ? false: true}/>
          <datalist id="dataListItemsCrafteables1">
            {CRAFTEABLE_ITEMS.filter(({combine})=>{return combine[0] === carouselBasicItems["BasicItem1"] || combine[1] === carouselBasicItems["BasicItem1"]}).map((item, i )=>{
              return <option key={"ListaDeItemsCrafteables"+item.name+i} id={`datalist-${item.apiName}`} value={item.nombre}></option>
            })}
          </datalist>
          <datalist id="dataListItemsCrafteables2">
            {CRAFTEABLE_ITEMS.filter(({combine})=>{return combine[0] === carouselBasicItems["BasicItem2"] || combine[1] === carouselBasicItems["BasicItem2"]}).map((item, i )=>{
              return <option key={"ListaDeItemsCrafteables"+item.name+i} id={`datalist-${item.apiName}`} data-value={JSON.stringify(item)} value={item.nombre}></option>
            })}
          </datalist>
          <datalist id="dataListItemsCrafteables3">
            {CRAFTEABLE_ITEMS.filter(({combine})=>{return combine[0] === carouselBasicItems["BasicItem3"] || combine[1] === carouselBasicItems["BasicItem3"]}).map((item, i )=>{
              return <option key={"ListaDeItemsCrafteables"+item.name+i} id={`datalist-${item.apiName}`} data-value={JSON.stringify(item)} value={item.nombre}></option>
            })}
          </datalist>
        </div>
      </div>
      </div>

      <label htmlFor="gameplay">Gameplay:
          <input type="text" defaultValue={gameplay} id="gameplay"></input>
          <button onClick={(e)=>agregarGameplay(e)}>Agregar Gameplay</button>
      </label>
      <div className={style.containerYoutube}>
          {gameplay.map((url,i)=>{
            return (
              <div key={"gameplaysURL"+i} className={style.containerVideos}>
                 <button className={style.btnClose} onClick={()=>eliminarGameplay(url)}>X</button>
                <Youtube src={url}></Youtube>
              </div>
          )
          })}
      </div>

      <label htmlFor="tips">Tips:
          <textarea  type="text" defaultValue={tips} onChange={(e)=>setTips(e.target.value)}></textarea>
      </label>
        <input type="submit" value="Crear Compo"/>
    </form>



    )
}

export default CrearCompoTFT