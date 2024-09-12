import React, {useEffect, useState} from "react"
import style from "./css/CrearCompoTFT.module.css"
import Builder from "./Builder.jsx"
import Champions from "./ChampionsList.jsx"
import Items from "./Items.jsx";
import {augmentsIDList, itemsDataIngles} from "../../../json/updates/constantesLatest.js"
import Youtube from "../../youtube/Youtube.jsx";
import { toBlob } from 'html-to-image';
import { BASIC_ITEMS, CRAFTEABLE_ITEMS, dataTFTItems } from "src/stores/dataTFT.js";
import { emblems } from "src/json/updates/constantesLatest";
import CarouselItems from "./CarouselItems.jsx";

const CrearCompoTFT = ({edit=false,editId, edittier,editposicion,editdificultad,edittitulo,editshadowCategory,editinfographicCategory,editaumentos,editgameplay,edittips,editboardInfo,editpictureSave,editcarouselItems,editspatulaItem1,editspatulaItem2,editoriginalComp}) =>{
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
    const [infoChampsItems, setInfoChampsItems] = useState("campeones");
    const [boardInfo, setBoardInfo] = useState({});
    const [showBoard, setShowBoard] = useState("early");
    const [showName, setShowName] = useState(false);
    const [takePicture, setTakePicture] = useState(false);
    const [pictureSave, setPictureSave] = useState({});
    const [carouselBasicItems, setCarouselBasicItems] = useState({});
    const [carouselItems, setCarouselItems] = useState({});
    const [spatulaItem1, setSpatulaItem1] = useState("");
    const [spatulaItem2, setSpatulaItem2] = useState("");
    const [originalComp, setOriginalComp] = useState("lv8");
    const [id, setId] =useState(generadorID())
    const [isHide, setIsHide] = useState(false)

    useEffect(()=>{
      const dataAumentos = itemsDataIngles.filter(({apiName})=>{
        return augmentsIDList.includes(apiName)
      })
      setListaDeAumentos(dataAumentos)
    }, []);

    useEffect(() => {
      // Configurar el listener dragover cuando el componente se monte
      const handleDragOver = (event) => {
        const mouseY = event.clientY;
        const windowHeight = window.innerHeight;
        const scrollThreshold = 200;  // Margen desde el borde superior/inferior
        const scrollSpeed = 2;       // Velocidad de desplazamiento
    
        // Desplazarse hacia arriba si el ratón está cerca del borde superior
        if (mouseY < scrollThreshold) {
          window.scrollBy(0, -scrollSpeed);
        }
    
        // Desplazarse hacia abajo si el ratón está cerca del borde inferior
        if (mouseY > windowHeight - scrollThreshold) {
          window.scrollBy(0, scrollSpeed);
        }
      };
    
      document.addEventListener('dragover', handleDragOver);
    
      // Limpia el listener cuando el componente se desmonte
      return () => {
        document.removeEventListener('dragover', handleDragOver);
      };
    }, []);
    

    useEffect(()=>{
      if(edit){
        setId(editId)
        setTier(edittier);
        setPosicion(editposicion);
        setDificultad(editdificultad)
        setTitulo(edittitulo)
        setShadowCategory(editshadowCategory);
        setInfographicCategory(editinfographicCategory)
        setAumentos(editaumentos)
        setGameplay(editgameplay)
        setTips(edittips)
        setBoardInfo(editboardInfo)
        setPictureSave(editpictureSave)
        setCarouselItems(editcarouselItems)
        setSpatulaItem1(editspatulaItem1)
        setSpatulaItem2(editspatulaItem2)
        setOriginalComp(editoriginalComp)
      }
    },[edit])


    useEffect(()=>{
      if(takePicture){
        async function captureAndConvertToWebP(showBoardID){
          const element = document.getElementById(showBoardID);
          const desiredWidth = 1920;  // Cambia esto al ancho deseado
          const desiredHeight = 1080; // Cambia esto al alto deseado
          toBlob(element)
          .then((blob) => {
              const webpBlob = new Blob([blob], { type: 'image/webp' });
              const nombreArchivo = id + `-${showBoardID}`;
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
                      setPictureSave((oldObject)=>{return {...oldObject,[showBoardID]:true}})
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
            alert('Error generating image'+ error.message);
          });
        }
        captureAndConvertToWebP(showBoard)

        setTakePicture(false)
        
      }
      
    },[takePicture])

    function handleToogleInfo(button){
        setInfoChampsItems(button)
    }

    function handleBuilderLevel(e,id){
      e.preventDefault()
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

    function toggleOcultarNombre(e,show){
      e.preventDefault();
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
        case "Frying Pan":
          combineNumber = 9
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

    function generadorID(){
      const a = Date.now().toString(30);
      const b = Math.random().toString(30).substring(2);
      return a+b
    }

    function mySubmit(e) { 
      if(edit){

      }else{
        e.preventDefault(); 
      }
        // obtener datos de: tier, position, dificulty, tittle, shadowCategory, infographicCategory
        // check aumentos, boardInfo, pictureSave, carouselItems, Gameplay (opcional), Tips (opcional)
        const resultado = {
          id:id === null ? generadorID() : id,
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
          spatulaItem2,
          originalComp,
          isHide
        }
        if(tier && posicion && dificultad && titulo && shadowCategory && infographicCategory && aumentos.length && Object.keys(carouselItems).length && Object.keys(boardInfo).length){
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
          var mensaje = "Faltan campos por llenar: "
          if(!tier){
            mensaje += "\nTier" 
          }
          if(!posicion){
            mensaje += "\nPosición" 
          }
          if(!dificultad){
            mensaje += "\nDificultad" 
          }
          if(!titulo){
            mensaje += "\nTitulo" 
          }
          if(!shadowCategory){
            mensaje += "\nShadow Category" 
          }
          if(!infographicCategory){
            mensaje += "\nInfographic Category" 
          }
          if(!aumentos.length){
            mensaje += "\nAumentos" 
          }
          alert(mensaje)
          return
        }
      }
    return (
    <form className={style.containerCrearCompo} onSubmit={(e)=>mySubmit(e)}>
      <div className={style.containerFirst}>
      <label htmlFor="tiers">
        <span>Tier:</span>
          <select
              name="tiers"
              id="tiers"
              onChange={(e)=>setTier(e.target.value)}
              defaultValue={edittier || tier}
              required
          >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="MEME">MEME</option>
          </select>
      </label>

      <label htmlFor="position">
        <span>Position:</span>
      <input
          name="position"
          type="number"
          defaultValue={editposicion || posicion}
          onChange={(e)=>setPosicion(Number(e.target.value))}
          min={1}
          required
          />
      </label>

      <label htmlFor="dificulty">
        <span>Dificulty:</span>
        <select
            name="dificulty"
            id="dificulty"
            onChange={(e)=>setDificultad(e.target.value)}
            defaultValue={editdificultad || dificultad}
            required
        >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
      </label>

      <label htmlFor="title">
        <span>Title:</span>
        <input
          name="title"
          type="text"
          defaultValue={edittitulo || titulo}
          onChange={(e)=>setTitulo(e.target.value)}
          placeholder="Type Tittle"
          required
        />
      </label>

      <label htmlFor="shadowcategory">
      <span>Shadow Category:</span>
        <select name="shadowcategory" id="shadowcategory" onChange={(e)=>setShadowCategory(e.target.value)} defaultValue={editshadowCategory || shadowCategories} required>
          {shadowCategories.map((cat)=>{
            return (
              <option key={cat} value={cat}>{cat}</option>
            )
          })}
        </select>
      </label>

      <label htmlFor="infographiccategory">
      <span>Infographic Category:</span>
        <select name="infographiccategory" id="infographiccategory" onChange={(e)=>setInfographicCategory(e.target.value)}  defaultValue={editinfographicCategory || infographicCategory} required>
          {infographicCategories.map((cat)=>{
            return (
              <option key={cat} value={cat}>{cat}</option>
            )
          })}
        </select>
      </label>

      <label>
        <span>Original Comp to Show:</span>
        <select onChange={(e)=>{e.preventDefault();setOriginalComp(e.target.value)}} defaultValue={originalComp}>
          <option value="lv7">Level 7</option>
          <option value="lv8">Level 8</option>
          <option value="lv9">Level 9</option>
          <option value="lv10">Level 10</option>
          <option value="spatula1">Spatula #1</option>
          <option value="spatula2">Spatula #2</option>
        </select>
      </label>

      <label>
        <span>Hide Comp:</span>
        <select onChange={(e)=>{e.preventDefault();setIsHide(e.target.value)}} defaultValue={isHide}>
          <option value={false}>FALSE</option>
          <option value={true}>TRUE</option>
        </select>
      </label>
    
      <div className={style.containerButtonsHorizontal}>
        <div className={[style.btn, showBoard=== "early" ? style.btnActive: "", pictureSave["early"] ? style.savePicture : ""].join(" ")} onClick={(e)=>{handleBuilderLevel(e,"early")}}>Early</div>
        <div className={[style.btn, showBoard=== "lv7" ? style.btnActive: "", pictureSave["lv7"] ? style.savePicture : ""].join(" ")} onClick={(e)=>{handleBuilderLevel(e,"lv7")}}>Lv 7</div>
        <div className={[style.btn, showBoard=== "lv8" ? style.btnActive: "", pictureSave["lv8"] ? style.savePicture : ""].join(" ")} onClick={(e)=>{handleBuilderLevel(e,"lv8")}}>Lv 8</div>
        <div className={[style.btn, showBoard=== "lv9" ? style.btnActive: "", pictureSave["lv9"] ? style.savePicture : ""].join(" ")} onClick={(e)=>{handleBuilderLevel(e,"lv9")}}>Lv 9</div>
        <div className={[style.btn, showBoard=== "lv10" ? style.btnActive: "", pictureSave["lv10"] ? style.savePicture : ""].join(" ")} onClick={(e)=>{handleBuilderLevel(e,"lv10")}}>Lv 10</div>
        <div className={[style.btn, showBoard=== "spatula1" ? style.btnActive: "", pictureSave["spatula1"] ? style.savePicture : ""].join(" ")} onClick={(e)=>{handleBuilderLevel(e,"spatula1")}}>Spatula #1</div>
        <div className={[style.btn, showBoard=== "spatula2" ? style.btnActive: "", pictureSave["spatula2"] ? style.savePicture : ""].join(" ")} onClick={(e)=>{handleBuilderLevel(e,"spatula2")}}>Spatula #2</div>
      </div>
      
      </div>

      <h2>{showBoard=== "early" ? "Early" : showBoard === "lv7" ? "Level 7": showBoard === "lv8" ? "Level 8": showBoard === "lv9" ? "Level 9" : showBoard=== "lv10" ? "Level 10": showBoard=== "spatula1" ? "Spatula #1": showBoard=== "spatula2" ? "Spatula #2" : ""}</h2>
      {showBoard === "spatula1"  &&
      <div className={style.containerSpatulaSearch}>
        <input className={style.inputSpatulaSearch} onChange={(e)=>hanlderSpatulaItem(e.target.value, 1)} list="dataListSpatulaItems" name="spatulaItems1" id="spatulaItems1" placeholder="Select Spatula"></input>
        {spatulaItem1 !== "" &&
        <div className={style.containerImgSpatula}>
          <img className={style.imgSpatula} src={spatulaItem1} alt="espatulaItem"/>
        </div>
        }
      </div>}
      {showBoard === "spatula2"  &&
      <div className={style.containerSpatulaSearch}>
        <input className={style.inputSpatulaSearch} onChange={(e)=>hanlderSpatulaItem(e.target.value, 2)} list="dataListSpatulaItems" name="spatulaItems2" id="spatulaItems2" placeholder="Select Spatula"></input>
        {spatulaItem2 !== "" &&
        <div className={style.containerImgSpatula}>
          <img className={style.imgSpatula} src={spatulaItem2} alt="espatulaItem"/>
        </div>
        }
      </div>}
      <datalist id="dataListSpatulaItems">
        {emblems.map((dataItem, i )=>{
          return <option key={"ListaDeEmblemas"+dataItem.nombre+i} id={`datalist-${dataItem.name}`} value={dataItem.name} data-value={JSON.stringify(dataItem)}></option>
        })}
      </datalist>

      <div className={showBoard=== "early" ? style.builderContainerEarly : style.builderContainer}>
      	{showBoard=== "early" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv7" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv8" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv9" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
				{showBoard=== "lv10" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
        {showBoard=== "spatula1" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
        {showBoard=== "spatula2" && <Builder setBoardInfo={setBoardInfo} boardInfo={boardInfo} id={showBoard} showName={showName}/>}
      </div>
      <div className={style.containerBtnHandlerBuilder}>
        <div className={style.btnHandlerBuilder} onClick={(e)=>{toggleOcultarNombre(e,showName)}}>{showName ? "Mostrar Nombres" : "Ocultar Nombres" }</div>
        <div className={style.btnHandlerBuilder} onClick={(e)=>{setTakePicture(true)}}>Guardar imagen</div>
      </div>
        
        
      <div className={style.containerSecond}>
        <div className={style.containerRow}>
        <div className={[style.btnHandlerBuilder, infoChampsItems === "campeones" ? style.btnActive : ""].join(" ")} onClick={(e)=>{e.preventDefault();handleToogleInfo("campeones")}}>Campeones</div>
        <div className={[style.btnHandlerBuilder, infoChampsItems === "items" ? style.btnActive : ""].join(" ")} onClick={(e)=>{e.preventDefault();handleToogleInfo("items")}}>Items</div>
        </div>
        {infoChampsItems === "campeones" ? <Champions/> : <Items/>}
      </div>
      
      <div className={style.containerCarousel}>
      Carousel 
      <div className={style.containerCarouselForm}>
        
        <div className={style.containerCarouselFormVertical}>
          Basic Item:
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item1" id="Carousel_Basic_Item1" onChange={(e)=>{e.preventDefault();handlerBasicItem(e.target.value, "BasicItem1")}} defaultValue={carouselItems.BasicItem1 ? carouselItems.BasicItem1.nombre : "" }/>
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item2" id="Carousel_Basic_Item2" onChange={(e)=>{e.preventDefault();handlerBasicItem(e.target.value, "BasicItem2")}} defaultValue={carouselItems.BasicItem2 ? carouselItems.BasicItem2.nombre : "" }/>
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item3" id="Carousel_Basic_Item3" onChange={(e)=>{e.preventDefault();handlerBasicItem(e.target.value, "BasicItem3")}} defaultValue={carouselItems.BasicItem3 ? carouselItems.BasicItem3.nombre : "" }/>
          <datalist id="dataListItemsBasicos">
            {BASIC_ITEMS.map((item, i )=>{
              return <option key={"ListaDeItemsBasicos"+item.name+i} id={`datalist-${item.apiName}`} value={item.nombre}></option>
            })}
          </datalist>
        </div>
        <div className={style.containerCarouselFormVertical}>
          Complete Item:
          <input list="dataListItemsCrafteables1" name="Carousel_Complete_Item1" id="Carousel_Complete_Item1" onChange={(e)=>{e.preventDefault();handlerCompleteItem(e.target.value, "CompleteItem1")}} defaultValue={carouselItems.CompleteItem1 ? carouselItems.CompleteItem1.nombre : "" } disabled={carouselItems["BasicItem1"] !== undefined ? false: true} autoComplete="off"/>
          <input list="dataListItemsCrafteables2" name="Carousel_Complete_Item2" id="Carousel_Complete_Item2" onChange={(e)=>{e.preventDefault();handlerCompleteItem(e.target.value, "CompleteItem2")}} defaultValue={carouselItems.CompleteItem2 ? carouselItems.CompleteItem2.nombre : "" } disabled={carouselItems["BasicItem2"] !== undefined ? false: true} autoComplete="off"/>
          <input list="dataListItemsCrafteables3" name="Carousel_Complete_Item3" id="Carousel_Complete_Item3" onChange={(e)=>{e.preventDefault();handlerCompleteItem(e.target.value, "CompleteItem3")}} defaultValue={carouselItems.CompleteItem3 ? carouselItems.CompleteItem3.nombre : "" } disabled={carouselItems["BasicItem3"] !== undefined ? false: true} autoComplete="off"/>
          <datalist id="dataListItemsCrafteables1">
            {[...CRAFTEABLE_ITEMS].filter(({combine})=>{return combine[0] === carouselBasicItems["BasicItem1"] || combine[1] === carouselBasicItems["BasicItem1"]}).map((item, i )=>{
              return <option key={"ListaDeItemsCrafteables"+item.name+i} id={`datalist-${item.apiName}`} value={item.nombre}></option>
            })}
          </datalist>
          <datalist id="dataListItemsCrafteables2">
            {[...CRAFTEABLE_ITEMS].filter(({combine})=>{return combine[0] === carouselBasicItems["BasicItem2"] || combine[1] === carouselBasicItems["BasicItem2"]}).map((item, i )=>{
              return <option key={"ListaDeItemsCrafteables"+item.name+i} id={`datalist-${item.apiName}`} data-value={JSON.stringify(item)} value={item.nombre}></option>
            })}
          </datalist>
          <datalist id="dataListItemsCrafteables3">
            {[...CRAFTEABLE_ITEMS].filter(({combine})=>{return combine[0] === carouselBasicItems["BasicItem3"] || combine[1] === carouselBasicItems["BasicItem3"]}).map((item, i )=>{
              return <option key={"ListaDeItemsCrafteables"+item.name+i} id={`datalist-${item.apiName}`} data-value={JSON.stringify(item)} value={item.nombre}></option>
            })}
          </datalist>
        </div>
      </div>
      <div className={style.containerCarouselReact}>
        <CarouselItems carouselItems={carouselItems}/>
      </div>
      </div>
      <div className={style.containerSecond}>
      <label htmlFor="aumentos">Augments:
        <input list="dataListAumentos" name="aumentos" id="aumentos" placeholder="Select Augments - Max 6"/>
        <datalist id="dataListAumentos">
          {listaDeAumentos.map((aum, i )=>{
            return <option key={"ListaDeAumentos"+aum.name+i} id={`datalist-${aum.apiName}`} data-value={JSON.stringify(aum)} value={aum.apiName}>{aum.name}</option>
          })}
        </datalist>
        <div className={style.btnAgregar} onClick={(e)=>agregarAumento(e)}>Agregar Aumento</div>
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
        <label htmlFor="gameplay">Gameplay:
            <input type="text" defaultValue={gameplay} id="gameplay" placeholder="YT Video Right Clic - Copy URL - Paste Here"></input>
            <div className={style.btnAgregar} onClick={(e)=>{e.preventDefault();agregarGameplay(e)}}>Agregar Gameplay</div>
        </label>
        <div className={style.containerYoutube}>
            {gameplay.map((url,i)=>{
              return (
                <div key={"gameplaysURL"+i} className={style.containerVideos}>
                  <button className={style.btnClose} onClick={(e)=>{e.preventDefault();eliminarGameplay(url)}}>X</button>
                  <Youtube src={url}></Youtube>
                </div>
            )
          })}
        </div>

        <label htmlFor="tips">Tips:
            <input  type="text" defaultValue={tips} onChange={(e)=>{e.preventDefault();setTips(e.target.value)}} placeholder="Write Tips Text"></input>
        </label>
      </div>
        <input className={style.btnSubmit} type="submit" value={`${edit ? "Guardar" : "Crear"} Compo`}/>
    </form>



    )
}

export default CrearCompoTFT