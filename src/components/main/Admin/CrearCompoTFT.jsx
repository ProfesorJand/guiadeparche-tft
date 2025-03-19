import React, {useEffect, useState} from "react"
import style from "./css/CrearCompoTFT.module.css"
import Builder from "./Builder.jsx"
import Champions from "./ChampionsList.jsx"
import Sinergias from "./Sinergias.jsx"
import Items from "./Items.jsx";
import Youtube from "../../youtube/Youtube.jsx";
import { toBlob } from 'html-to-image';
import { BASIC_ITEMS, CRAFTEABLE_ITEMS, ARTEFACTOS } from "src/stores/dataTFT.js";
import { emblems, radiantsItems as listOfRadiantsItems} from "src/json/updates/itemsTFT";
import CarouselItems from "./CarouselItems.jsx";
import RadiantsItems from "./RadiantsItems.jsx";
import { championsTFT } from "src/json/updates/constantesLatest.js";
import { listaCampeones } from "src/functions/campeonestft.js";
import { itemsDataIngles, getDataTFTBySet, championsTFTIngles  as getAllChampions} from "src/json/updates/contantesTFT.js"
import ChampTierList from "@components/TFT/ChampTierList.jsx"
import { versionTFT } from "src/stores/dataTFT.js"
import { useStore } from "@nanostores/react"


const CrearCompoTFT = ({edit=false,editId, edittier,editposicion,editdificultad,edittitulo,editshadowCategory,editinfographicCategory,editaumentos,editgameplay,edittips,editboardInfo,editpictureSave,editcarouselItems,editradiantItem,editspatulaItem1,editspatulaItem2,editoriginalComp, editCampeonTierList, editAugmentTierList, editCampeonItemTierList =[{},{},{}], editCampeonTraitTierList = [{}], editVersion=null }) =>{
    const currentVersion= useStore(versionTFT);
    const [version, setVersion] = useState(currentVersion)
    const [allItemsInfo, setAllItemsInfo] = useState(null);
    const [allItemsApiNames, setAllItemsApiNames] = useState(null);
    const [allEmblemsItemsApiNames, setAllEmblemsItemsApiName] = useState(null)
    const [allSupportsItems, setAllSupportsItems] = useState(null)
    const [allChemBaronItems, setAllChemBaronItems] = useState(null)
    const urlImgAum = "https://raw.communitydragon.org/pbe/game/";
    const urlDataDragonLatestGame = "https://raw.communitydragon.org/latest/game/";
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
    //const [tips, setTips] = useState(""); //ya no va tips
    const [infoChampsItems, setInfoChampsItems] = useState("campeones");
    const [boardInfo, setBoardInfo] = useState({});
    const [showBoard, setShowBoard] = useState("early");
    const [showName, setShowName] = useState(false);
    const [takePicture, setTakePicture] = useState(false);
    const [pictureSave, setPictureSave] = useState({});
    const [carouselBasicItems, setCarouselBasicItems] = useState({});
    const [carouselItems, setCarouselItems] = useState({});
    const [radiantsItems, setRadiantsItems] = useState({})
    const [spatulaItem1, setSpatulaItem1] = useState("");
    const [spatulaItem2, setSpatulaItem2] = useState("");
    const [originalComp, setOriginalComp] = useState("lv8");
    const [id, setId] =useState(generadorID());
    const [isHide, setIsHide] = useState(false);
    const [campeonTierList, setCampeonTierList] = useState({});
    const [augmentTierList, setAugmentTierList] = useState({});
    const [champItem, setChampItem] = useState([{}])
    const [champTrait, setChampTrait] = useState([{}])
    const [allChampions, setAllChampions] = useState([])
    const championsColor = [
      "var(--color-hex-cost-default)",
      "var(--color-hex-cost-1)",
      "var(--color-hex-cost-2)",
      "var(--color-hex-cost-3)",
      "var(--color-hex-cost-4)",
      "var(--color-hex-cost-5)",
    ];
    
    useEffect(()=>{
      const buscarAumentos = async() =>{
        const url= `https://raw.communitydragon.org/${version}/cdragon/tft/en_us.json`;
        const items = await fetch(url);
        const itemsDataIngles1 = await items.json();
        const setDataFiltrado = itemsDataIngles1.setData.find(
          (set) => set.mutator === (version === "pbe" ? "TFTSet14" : "TFTSet13")
        );
        if (!setDataFiltrado) {
          console.warn("No se encontró el set con mutator 'TFTSet14'");
          return;
        }
        const dataAumentos = itemsDataIngles1.items.filter(({ apiName }) =>
          setDataFiltrado.augments.includes(apiName)
        );
        setListaDeAumentos(dataAumentos)
      }
      
      const getAllItems = async ()=>{
        setAllItemsApiNames((await getDataTFTBySet({version,set:version === "pbe" ? "14": "13"})).setData); //apiName de todos los items del set
        setAllItemsInfo((await getDataTFTBySet({version,set:version === "pbe" ? "14": "13"})).setInfo)
        setAllEmblemsItemsApiName((await getDataTFTBySet({version,set:version === "pbe" ? "14": "13"})).setData.items.filter((apiName)=>{
          return apiName.includes("EmblemItem")
        }))
        setAllSupportsItems((await getDataTFTBySet({version,set:version === "pbe" ? "14": "13"})).setInfo.filter(({apiName})=>{
          const apiNameOfSupportsItems = [
            "TFT_Item_BansheesVeil",
            "TFT_Item_AegisOfTheLegion",
            "TFT_Item_Chalice",
            "TFT_Item_SupportKnightsVow",
            "TFT_Item_LocketOfTheIronSolari",
            "TFT_Item_Moonstone",
            "TFT7_Item_ShimmerscaleHeartOfGold",
            "TFT4_Item_OrnnObsidianCleaver",
            "TFT4_Item_OrnnRanduinsSanctum",
            "TFT_Item_Shroud",
            "TFT_Item_Spite",
            "TFT_Item_EternalFlame",
            "TFT_Item_UnstableTreasureChest",
            "TFT_Item_RadiantVirtue",
            "TFT_Item_ZekesHerald",
            "TFT_Item_Zephyr",
            "TFT5_Item_ZzRotPortalRadiant"
          ]
          return apiNameOfSupportsItems.some((item)=> item.includes(apiName))
        }))
        setAllChemBaronItems((await getDataTFTBySet({version,set:version === "pbe" ? "14": "13"})).setInfo.filter(({apiName})=>{
          const apiNameOfChemBaronItems = [
            "TFT13_Crime_Bronze_ChemGrips",
            "TFT13_Crime_Bronze_MageGuard",
            "TFT13_Crime_Bronze_MiningGauntlet",
            "TFT13_Crime_Silver_DestabilizedChemtank",
            "TFT13_Crime_Gold_DestabilizedChemtank",
            "TFT13_Crime_Prismatic_DestabilizedChemtank",
            "TFT13_Crime_Silver_ExecutionersVorpalblade",
            "TFT13_Crime_Gold_ExecutionersVorpalblade",
            "TFT13_Crime_Prismatic_ExecutionersVorpalblade",
            "TFT13_Crime_Silver_FleshRipper",
            "TFT13_Crime_Gold_FleshRipper",
            "TFT13_Crime_Prismatic_FleshRipper",
            "TFT13_Crime_Silver_PiltovenHexplating",
            "TFT13_Crime_Gold_PiltovenHexplating",
            "TFT13_Crime_Prismatic_PiltovenHexplating",
            "TFT13_Crime_Silver_ShimmerBloom",
            "TFT13_Crime_Gold_ShimmerBloom",
            "TFT13_Crime_Prismatic_ShimmerBloom",
            "TFT13_Crime_Silver_UnleashedToxins",
            "TFT13_Crime_Gold_UnleashedToxins",
            "TFT13_Crime_Prismatic_UnleashedToxins",
            "TFT13_Crime_Silver_VirulentVirus",
            "TFT13_Crime_Gold_VirulentVirus",
            "TFT13_Crime_Prismatic_VirulentVirus",
            "TFT13_Crime_Silver_VoltaicSaber",
            "TFT13_Crime_Gold_VoltaicSaber",
            "TFT13_Crime_Prismatic_VoltaicSaber"
          ]
          return apiNameOfChemBaronItems.some((item) => item === apiName);
        }))  
      }
      buscarAumentos();
      getAllItems();
    }, [version]);
    
    useEffect(()=>{
      const gettingAllChampions = async ()=>{
        const respuestaGettingAllChampions = await getAllChampions({version,set:version === "pbe" ? "14" : "13"})
        setAllChampions(respuestaGettingAllChampions)  
      }
      gettingAllChampions();
    },[version])

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
        //setTips(edittips) // ya no va tips
        setBoardInfo(editboardInfo)
        setPictureSave(editpictureSave)
        setCarouselItems(editcarouselItems)
        setRadiantsItems(editradiantItem)
        setSpatulaItem1(editspatulaItem1)
        setSpatulaItem2(editspatulaItem2)
        setOriginalComp(editoriginalComp)
        setCampeonTierList(editCampeonTierList)
        setAugmentTierList(editAugmentTierList)
        setChampItem(editCampeonItemTierList)
        setChampTrait(editCampeonTraitTierList)
        setVersion(editVersion)
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
              formData.append('file', webpBlob, `${nombreArchivo}-${version}.webp`);
        
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


    function seleccionarAumentoTierList(e){
      
      const aumentosInput = document.getElementById("aumentos2");
      const value = aumentosInput.value;
      if(!value){
        setAugmentTierList({})
      }
      const dataList = document.getElementById("dataListAumentos2");
      const dataValue = dataList.options.namedItem(`datalist-${value}`)?.dataset.value;
      if(dataValue){
        setAugmentTierList(JSON.parse(dataValue));
      }
    }

    function addItemChampion(e, itemNumber){
      const value = e.target.value;
      if(!value){
        setChampItem((oldValue)=>{
          oldValue[itemNumber] = {}
          return [...oldValue]
        })
      }
      const dataList = document.getElementById("dataListChampsItems");
      const dataValue = dataList.options.namedItem(`datalist-${value}`)?.dataset.value;
      if(dataValue){
        setChampItem((oldValue)=>{
          oldValue[itemNumber] = JSON.parse(dataValue)
          return [...oldValue]
        })
      }
    }

    function addChampTrait(e, traitNumber){
      const value = e.target.value;
    
      setChampTrait((oldValue) => {
        const newValue = Array.isArray(oldValue) ? [...oldValue] : []; // Garantiza que sea un array
        
        if (!value) {
          newValue[traitNumber] = {}; // Aseguramos que el índice exista
          return newValue;
        }
    
        const dataList = document.getElementById("dataListChampsTraits");
        const dataValue = dataList.options.namedItem(`datalist-${value}`)?.dataset.value;
    
        if (dataValue) {
          newValue[traitNumber] = JSON.parse(dataValue); // Asignamos el nuevo valor
        }
        
        return newValue;
      });
    }

    function handleBuilderLevel(e,id){
      e.preventDefault()
      setShowBoard(id)
    }

    function agregarAumento(e){
      e.preventDefault();
      const aumentosInput = document.getElementById("aumentos");
      const value = aumentosInput.value;
      if(aumentos.length >= 8){
        alert("Has alcanzado el limite de 8 aumentos.\nElimina un aumento para añadir uno nuevo.")
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

    function handlerRadiantItem(value, item){
      const [data] = listOfRadiantsItems.filter((item)=>{
        return item.name === value
      })
      setRadiantsItems((oldObject)=>{ return {...oldObject, [item]:data }})
    }

    function handlerCompleteItem(value, item){
      const [data] = CRAFTEABLE_ITEMS.filter((item)=>{
        return item.nombre === value
      })
      setCarouselItems((oldObject)=>{ return {...oldObject, [item]:data }})
    }

    function hanlderSpatulaItem(value, number){
      const option = document.getElementById("dataListSpatulaItems").options.namedItem(`datalist-${value}`)?.getAttribute("data-value");
      
      if(option){
        const data  = JSON.parse(option);
        let imgUrl;
        const url = "https://raw.communitydragon.org/latest/game/"
        if(data.img){
          imgUrl = data.img
        }else if(data.icon && data.tileIcon){
          imgUrl = url+data.tileIcon.replace(".tex",".png").toLowerCase();
        }else{
          imgUrl = url+data.icon.replace(".tex",".png").toLowerCase();
        }
        if(number === 1){
          setSpatulaItem1({...data, icon: imgUrl});
          document.getElementById("spatulaItems1").value= value 
        }else{
          setSpatulaItem2({...data, icon: imgUrl});
          document.getElementById("spatulaItems2").value= value 
        }
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
          radiantsItems,
          boardInfo,
          pictureSave,
          gameplay,
          //tips, ya no va tips
          spatulaItem1,
          spatulaItem2,
          originalComp,
          isHide,
          campeonTierList,
          augmentTierList,
          champItem,
          champTrait,
          version
        }
        if(tier && posicion && dificultad && titulo && shadowCategory && infographicCategory && aumentos.length && Object.keys(carouselItems).length && Object.keys(boardInfo).length && Object.keys(campeonTierList).length){
          const token = import.meta.env.PUBLIC_TOKEN_META
          fetch('https://guiadeparche.com/tftdata/Set12/crearCompoMeta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
          if(!Object.keys(campeonTierList).length){
            mensaje += "\nSelect Champion Tier List"
          }
          alert(mensaje)
          return
        }
      }
    return (
    <form className={style.containerCrearCompo} onSubmit={(e)=>mySubmit(e)}>
      <div className={style.containerFirst}>
      <label htmlFor="version">
        <span>Version:</span>
          <select
              name="versions"
              id="versions"
              onChange={(e)=>setVersion(e.target.value)}
              defaultValue={editVersion || version}
              required
          >
              <option value="pbe">pbe</option>
              <option value="latest">latest</option>
          </select>
      </label>

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
        <select onChange={(e)=>{setOriginalComp(e.target.value)}} defaultValue={editoriginalComp || originalComp}>
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
        <select onChange={(e)=>{setIsHide(e.target.value)}} defaultValue={isHide.toString()}>
          <option value={false}>FALSE</option>
          <option value={true}>TRUE</option>
        </select>
      </label>

      <br></br>
      <div className={style.containerFormChampTierList}>
        <div className={style.containerOptionsChampTierList}>
          <span>Tier List Data:</span>
          <label htmlFor="title">
            <span>Champion:</span>
            <select onChange={(e)=>{setCampeonTierList(JSON.parse(e.target.options[e.target.selectedIndex].dataset.value))}} defaultValue={editCampeonTierList?.name || campeonTierList?.name}>
              {
                allChampions.map((campeon,index)=>{
                  return (
                    <option key={index} value={campeon.name} data-value={JSON.stringify(campeon)}>{campeon.name}</option>
                  )
                })
              }
            </select>
          </label>
          <label htmlFor="aumentos">
            Augments:
            <input list="dataListAumentos2" onChange={(e)=>seleccionarAumentoTierList(e)} name="aumentos2" id="aumentos2" defaultValue={editAugmentTierList?.name ||augmentTierList?.name } placeholder="Select Augment"/>
            <datalist id="dataListAumentos2">
              {listaDeAumentos.map((aum, i )=>{
                return <option key={"TierListAumentos"+aum.name+i} id={`datalist-${aum.apiName}`} data-value={JSON.stringify(aum)} value={aum.apiName}>{aum.name}</option>
              })}
            </datalist>
          </label>
                    
          <label>
            Trait:
            <input className={style.input} onChange={(e)=>addChampTrait(e, 0)} list="dataListChampsTraits" name="dataListChampsTraits" id="dataListChampsTraits1" defaultValue={editCampeonTraitTierList?.[0]?.name || champTrait?.[0]?.name } placeholder="Select Trait to Show"></input>
            <datalist id="dataListChampsTraits">
            {allItemsInfo?.length > 0 && allEmblemsItemsApiNames?.length && allItemsInfo.map((dataItem, i )=>{
              if(allEmblemsItemsApiNames?.includes(dataItem.apiName)){
                return (
                  <option key={"ListaDeEmblemas"+dataItem.name+i} id={`datalist-${dataItem.apiName}`} value={dataItem.apiName} data-value={JSON.stringify(dataItem)}>
                    {dataItem.name}
                  </option>
                )
              }
            })}
          </datalist>
          </label>

          <label htmlFor="championItem1">
            Item 1:
            <input className={style.input} onChange={(e)=>addItemChampion(e, 0)} list="dataListChampsItems" name="dataListChampsItems" id="dataListChampsItems1" defaultValue={editCampeonItemTierList?.[0]?.name || champItem?.[0]?.name } placeholder="Select First Item"></input>
          </label>
          <label htmlFor="championItem2">
            Item 2:
            <input className={style.input} onChange={(e)=>addItemChampion(e, 1)} list="dataListChampsItems" name="dataListChampsItems" id="dataListChampsItems2" defaultValue={editCampeonItemTierList?.[1]?.name || champItem?.[1]?.name } placeholder="Select Second Item"></input>
          </label>
          <label htmlFor="championItem3">
            Item 3:
            <input className={style.input} onChange={(e)=>addItemChampion(e, 2)} list="dataListChampsItems" name="dataListChampsItems" id="dataListChampsItems3" defaultValue={editCampeonItemTierList?.[2]?.name || champItem?.[2]?.name } placeholder="Select Third Item"></input>
          </label>

          <datalist id="dataListChampsItems">
            {itemsDataIngles.map((dataItem, i )=>{
              return (
                <option key={"ListaDeEmblemas"+dataItem.nombre+i} id={`datalist-${dataItem.apiName}`} value={dataItem.apiName} data-value={JSON.stringify(dataItem)}>
                  {dataItem.name}
                </option>
              )
            })}
          </datalist>
          
        </div>
        <div className={style.champTierListSample}>
          <ChampTierList
            campeonTierList={campeonTierList}
            augmentTierList={augmentTierList}
            champItem={champItem}
            champTrait={champTrait}
            isSample={true}
            version={version || "latest"}
            />
        </div>
      </div>
    
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

      <h2 className={style.titulo}>{showBoard=== "early" ? "Early" : showBoard === "lv7" ? "Level 7": showBoard === "lv8" ? "Level 8": showBoard === "lv9" ? "Level 9" : showBoard=== "lv10" ? "Level 10": showBoard=== "spatula1" ? "Spatula #1": showBoard=== "spatula2" ? "Spatula #2" : ""}</h2>
      {showBoard === "spatula1"  &&
      <div className={style.containerSpatulaSearch}>
        <input className={style.inputSpatulaSearch} onChange={(e)=>hanlderSpatulaItem(e.target.value, 1)} list="dataListSpatulaItems" name="spatulaItems1" id="spatulaItems1" placeholder="Select Spatula"></input>
        {spatulaItem1 !== "" &&
        <div className={style.containerImgSpatula}>
          <img className={style.imgSpatula} src={spatulaItem1.icon} alt="espatulaItem" loading="lazy"/>
        </div>
        }
      </div>}
      {showBoard === "spatula2"  &&
      <div className={style.containerSpatulaSearch}>
        <input className={style.inputSpatulaSearch} onChange={(e)=>hanlderSpatulaItem(e.target.value, 2)} list="dataListSpatulaItems" name="spatulaItems2" id="spatulaItems2" placeholder="Select Spatula"></input>
        {spatulaItem2 !== "" &&
        <div className={style.containerImgSpatula}>
          <img className={style.imgSpatula} src={spatulaItem2.icon} alt="espatulaItem" loading="lazy"/>
        </div>
        }
      </div>}
      <datalist id="dataListSpatulaItems">
        {emblems.map((dataItem, i )=>{
          return <option key={"ListaDeEmblemas"+dataItem.nombre+i} id={`datalist-${dataItem.name}`} value={dataItem.name} data-value={JSON.stringify(dataItem)}></option>
        })}
        {championsTFT.map((dataItem, i )=>{
          return <option key={"ListaDeEmblemas"+dataItem.name+i} id={`datalist-${dataItem.name}`} value={dataItem.name} data-value={JSON.stringify(dataItem)}></option>
        })}
        {listaDeAumentos.map((dataItem, i )=>{
          return <option key={"ListaDeEmblemas"+dataItem.name+i} id={`datalist-${dataItem.name}`} value={dataItem.name} data-value={JSON.stringify(dataItem)}></option>
        })}
        {ARTEFACTOS.map((dataItem, i )=>{
          return <option key={"ListaDeEmblemas"+dataItem.nombre+i} id={`datalist-${dataItem.name}`} value={dataItem.name} data-value={JSON.stringify(dataItem)}></option>
        })}
      </datalist>
        <Sinergias sinergias={boardInfo[showBoard]?.sinergias ? boardInfo[showBoard]?.sinergias : {}} orientacion={"horizontal"}></Sinergias>
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
        <div className={[style.btnHandlerBuilder, infoChampsItems === "campeones" ? style.btnActive : ""].join(" ")} onClick={(e)=>{handleToogleInfo("campeones")}}>Campeones</div>
        <div className={[style.btnHandlerBuilder, infoChampsItems === "items" ? style.btnActive : ""].join(" ")} onClick={(e)=>{handleToogleInfo("items")}}>Items</div>
        <div className={style.btnHandlerBuilder} onClick={(e)=>{toggleOcultarNombre(e,showName)}}>{showName ? "Mostrar Nombres" : "Ocultar Nombres" }</div>
        <div className={style.btnHandlerBuilder} onClick={(e)=>{setTakePicture(true)}}>Guardar imagen</div>
      </div>
        
        
      <div className={style.containerSecond}>
        {infoChampsItems === "campeones" ? <Champions allChampions={allChampions} version={version}/> : <Items version={version}/>}
      </div>
      
      <div className={style.containerCarousel}>
      Carousel 
      <div className={style.containerCarouselForm}>
        
        <div className={style.containerCarouselFormVertical}>
          Basic Item:
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item1" id="Carousel_Basic_Item1" onChange={(e)=>{handlerBasicItem(e.target.value, "BasicItem1")}} defaultValue={carouselItems.BasicItem1 ? carouselItems.BasicItem1.nombre : "" }/>
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item2" id="Carousel_Basic_Item2" onChange={(e)=>{handlerBasicItem(e.target.value, "BasicItem2")}} defaultValue={carouselItems.BasicItem2 ? carouselItems.BasicItem2.nombre : "" }/>
          <input list="dataListItemsBasicos" name="Carousel_Basic_Item3" id="Carousel_Basic_Item3" onChange={(e)=>{handlerBasicItem(e.target.value, "BasicItem3")}} defaultValue={carouselItems.BasicItem3 ? carouselItems.BasicItem3.nombre : "" }/>
          <datalist id="dataListItemsBasicos">
            {BASIC_ITEMS.map((item, i )=>{
              return <option key={"ListaDeItemsBasicos"+item.name+i} id={`datalist-${item.apiName}`} value={item.nombre}></option>
            })}
          </datalist>
        </div>
        <div className={style.containerCarouselFormVertical}>
          Complete Item:
          <input list="dataListItemsCrafteables1" name="Carousel_Complete_Item1" id="Carousel_Complete_Item1" onChange={(e)=>{handlerCompleteItem(e.target.value, "CompleteItem1")}} defaultValue={carouselItems.CompleteItem1 ? carouselItems.CompleteItem1.nombre : "" } disabled={carouselItems["BasicItem1"] !== undefined ? false: true} autoComplete="off"/>
          <input list="dataListItemsCrafteables2" name="Carousel_Complete_Item2" id="Carousel_Complete_Item2" onChange={(e)=>{handlerCompleteItem(e.target.value, "CompleteItem2")}} defaultValue={carouselItems.CompleteItem2 ? carouselItems.CompleteItem2.nombre : "" } disabled={carouselItems["BasicItem2"] !== undefined ? false: true} autoComplete="off"/>
          <input list="dataListItemsCrafteables3" name="Carousel_Complete_Item3" id="Carousel_Complete_Item3" onChange={(e)=>{handlerCompleteItem(e.target.value, "CompleteItem3")}} defaultValue={carouselItems.CompleteItem3 ? carouselItems.CompleteItem3.nombre : "" } disabled={carouselItems["BasicItem3"] !== undefined ? false: true} autoComplete="off"/>
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
      <div className={style.containerBestRadiants}>
        Best Radiants
        <div className={style.containerBestRadiantsReact}>
        <RadiantsItems radiantsItems={radiantsItems}/>
        </div>
        <div>
          <input list="dataListItemsRadiants" name="Radiant_Item1" id="Radiant_Item1" onChange={(e)=>{handlerRadiantItem(e.target.value, "RadiantItem1")}} defaultValue={radiantsItems?.RadiantItem1 ? radiantsItems?.RadiantItem1.nombre : "" } autoComplete="off"/>
          {/* <input list="dataListItemsRadiants" name="Radiant_Item2" id="Radiant_Item2" onChange={(e)=>{handlerRadiantItem(e.target.value, "RadiantItem2")}} defaultValue={radiantsItems.RadiantItem2 ? radiantsItems.RadiantItem2.nombre : "" } autoComplete="off"/>
          <input list="dataListItemsRadiants" name="Radiant_Item3" id="Radiant_Item3" onChange={(e)=>{handlerRadiantItem(e.target.value, "RadiantItem3")}} defaultValue={radiantsItems.RadiantItem3 ? radiantsItems.RadiantItem3.nombre : "" } autoComplete="off"/> */}
          <datalist id="dataListItemsRadiants">
            {listOfRadiantsItems.map((item, i )=>{
              return <option key={"ListaDeItemsRadiantes"+item.name+i} id={`datalist-${item.apiName}`} value={item.name}></option>
            })}
          </datalist>
        </div>
      </div>
      <div className={style.containerSecond}>
      <label htmlFor="aumentos">Augments:
        <input list="dataListAumentos" name="aumentos" id="aumentos" placeholder="Select Augments - Max 8"/>
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
              <img src={urlImgAum+icon.toLowerCase().replace(".tex",".png")} className={style.imgAumento} loading="lazy"></img>
            </div>
        )
        })}
      </div>
        <label htmlFor="gameplay">Gameplay:
            <input type="text" defaultValue={gameplay} id="gameplay" placeholder="YT Video Right Clic - Copy URL - Paste Here"></input>
            <div className={style.btnAgregar} onClick={(e)=>{agregarGameplay(e)}}>Agregar Gameplay</div>
        </label>
        <div className={style.containerYoutube}>
            {gameplay.map((url,i)=>{
              return (
                <div key={"gameplaysURL"+i} className={style.containerVideos}>
                  <button className={style.btnClose} onClick={(e)=>{eliminarGameplay(url)}}>X</button>
                  <Youtube src={url}></Youtube>
                </div>
            )
          })}
        </div>

        {/* <label htmlFor="tips">Tips:
            <input  type="text" defaultValue={edittips || tips} onChange={(e)=>{setTips(e.target.value)}} placeholder="Write Tips Text" name="tips"></input>
        </label> */}
      </div>
        <input className={style.btnSubmit} type="submit" value={`${edit ? "Guardar" : "Crear"} Compo`}/>
    </form>



    )
}

export default CrearCompoTFT