import React, {useEffect, useState} from "react";
import style from "./css/Composicion.module.css";
import CampeonOriginal from "./CampeonOriginal";
import CampeonEarly from "./CampeonEarly";
import CarouselItems from "./CarouselItems";
import Sinergias from "./Sinergias";
import AumentosCompos from "./AumentosCompos";
import PosicionamientoCompos from "./PosicionamientoCompos";
import CrearCompoTFT from "./CrearCompoTFT";
import { championsTFT } from "src/json/updates/constantesPBE.js";

const Composicion = ({compo, admin=false})=>{
  const [open,setOpen]=useState(false);
  const [editId, setEditId] = useState(null)
  const colorDificulty= {Easy:"green",Medium:"orange",Hard:"red"}
  const [posicionamiento, setPosicionamiento] = useState(compo.originalComp)
  const [data, setData] = useState(compo.boardInfo[compo.originalComp].data);
  const [sinergias, setSinergias] = useState(compo.boardInfo[compo.originalComp].sinergias)
  const textoPosicionamiento = (texto)=>{
    if(texto === "spatula1"){
      texto = compo.spatulaItem1.split("_").pop().replace(".png","");
      return texto[0]?.toUpperCase() + texto.slice(1)
    }
    if(texto === "spatula2"){
      texto = compo.spatulaItem2.split("_").pop().replace(".png","");
      return texto[0]?.toUpperCase() + texto.slice(1)
    }
    return texto[0]?.toUpperCase() + texto.slice(1)
  }
  useEffect(()=>{
    setPosicionamiento(compo.originalComp)
    setData(compo.boardInfo[compo.originalComp].data)
    setSinergias(compo.boardInfo[compo.originalComp].sinergias)
  },[compo])
  const earlyComp = Object.keys(compo.boardInfo.early.data).map((key)=>{
    const {dataCampeon, dataItem} = compo.boardInfo.early.data[key]
    return {dataCampeon:dataCampeon.campeon, dataItem}
  })
  var dataCampeones = Object.keys(data).map((key)=>{
    const {dataCampeon, dataItem} = data[key];
    return {dataCampeon:dataCampeon.campeon, dataItem, estrellas:data[key]?.estrellas ? data[key].estrellas : 1}
  })
  const allChampionsApiName = dataCampeones.map(({dataCampeon})=>{
    return {apiName:JSON.parse(dataCampeon).apiName}
  })
  
  function championsCodeBuilder(allChampions){
    // Ordena el array por apiName en orden ascendente
    const sortedArray = allChampions.sort((a, b) => a.apiName.localeCompare(b.apiName));

    // Define el objeto resultado y la primera clave
    const result = { "empty_slot": "00" };

    // Genera la secuencia en el formato requerido
    const sequence = [];
    let i = 0;
    while (sequence.length <= sortedArray.length) {
        // Convertimos i a hexadecimal y lo formateamos a dos caracteres
        let hex = i.toString(16).padStart(2, "0");

        // Solo agregamos a la secuencia si es un valor válido
        sequence.push(hex);

        // Incrementamos i
        i++;
    }

    // Asigna cada apiName como clave en el objeto resultado, con su valor correspondiente en la secuencia
    sortedArray.forEach((item, index) => {
        result[item.apiName] = sequence[index + 1]; // +1 para empezar después de "empty_slot"
    });

    return result;
  }

  function generatorCodeBuilder(allChampionsApiName){
    let sinDuplicados = [...new Set(allChampionsApiName)];
    const championsList = [];
    championsTFT.forEach(({apiName, traits})=>{
        if(traits.length > 0){
            const allChampions = {
                apiName,
            }
            championsList.push(allChampions)
        }
    })
    const RulesChampionsCode = championsCodeBuilder(championsList);   
    let championsCode = "01"
    for (let i = 0; i < 10; i++) {
      if(sinDuplicados[i]){
        championsCode = championsCode.concat(RulesChampionsCode[sinDuplicados[i].apiName]);
      }else{
        championsCode = championsCode.concat("00")
      }
    }
    championsCode = championsCode.concat("TFTSet13")
    return championsCode;
  }

  function handleEditID(e,id){
    e.stopPropagation()
    if(id === editId){
      setEditId(null)
    }else{
      setEditId(id)
    }
  }

  function deleteId(id, tier) {
    let password= prompt('Write DELETE to continue');
    if(password === "DELETE"){
      let token;
      if(import.meta.env.SSR){
        token = import.meta.env.TOKEN_META;
      }else{
        token = import.meta.env.PUBLIC_TOKEN_META;
      }
      fetch('https://guiadeparche.com/tftdata/Set12/crearCompoMeta.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Cambiado a x-www-form-urlencoded para enviar datos con DELETE
          'Authorization': `Bearer ${token}`
        },
        body: `id=${id}&tier=${tier}`, // Enviar los datos como parte del cuerpo de la solicitud
      })
      .then(response => response.json()) // Parsear la respuesta como JSON
      .then(data => {
        if (data.status === 'success') {
          alert(`ID: ${id} eliminado correctamente:`)
          console.log('ID eliminado correctamente:', data.message);
        } else {
          console.error('Error al eliminar el ID:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    if(password === "OCULTAR"){

    }
  }

  function copyToClipboard(e,codigo) {
    e.stopPropagation();
    navigator.clipboard.writeText(codigo);
    alert("Copied Code: " + codigo);
  }

  return (
    <div className={style.containerInfoGlobal}>

    <div className={[style.containerInfoPrincipal, open ? style.downBorder: "" ].join(" ")} onClick={()=>{setOpen(!open)}}>
    <div className={style.containerTextoInfoPrimario}>
      <div className={style.containerTextoInfoPrimarioTier}>
        <div className={style.containerTierImg}>
          <img
            className={style.tierImg}
            src={`/tiers/Tier-${compo.tier}.webp`}
            alt="Tier TFT" 
            loading="lazy"
            />
        </div>
        <div className={style.containerInfoComp}>
          <div className={[style.titulo, style.tituloComp].join(" ")}>{compo.titulo}</div>
          <div className={style.containerDificultadCategory}>
            <div
              className={style.teamCodeMobile}
              onClick={(e)=>copyToClipboard(e,generatorCodeBuilder(allChampionsApiName))}>
                {"📋"}
            </div>
            <div className={style.dificultad} style={{border:`1px solid ${colorDificulty[compo.dificultad]}`, color:`${colorDificulty[compo.dificultad]}`}}>{compo.dificultad}</div>
            <div className={style.category}>{compo.infographicCategory}</div>
          </div>
        </div>
      </div>
      <div className={style.containerTextoInfoPrimarioCode} onClick={(e)=>copyToClipboard(e,generatorCodeBuilder(allChampionsApiName))}>
        {"COPY TEAM CODE: " + generatorCodeBuilder(allChampionsApiName) + " 📋"}
      </div>
      </div>
      
      <div className={style.containerLowerChamps}>
      <div className={style.containerInfoChamp}>
      {dataCampeones.map(({dataCampeon, dataItem, estrellas},i)=>{
        return (
          <CampeonOriginal  key={`OriginalCampeon`+i} dataCampeon={dataCampeon} dataItem={dataItem} estrellas={estrellas}/>
        )
      })}
      </div>
      <div className={style.containerFlecha}>
        {
          admin &&
          <div className={style.btn} onClick={(e)=>{handleEditID(e,compo.id)}}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0,0,256,256">
              <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(4,4)"><path transform="translate(23.78985,-32.40979) rotate(45)" d="M46.2,7.92h9.63c2.20914,0 4,1.79086 4,4v5.18h-17.63v-5.18c0,-2.20914 1.79086,-4 4,-4z" fill="#eb104e"></path><path transform="translate(27.11019,-25.06978) rotate(45)" d="M32.5,15.51h22.63v9.36h-22.63z" fill="#131721"></path><path transform="translate(34.35993,-7.5702) rotate(45)" d="M17.12,17.45h18.38v40.48h-18.38z" fill="#000000"></path><path transform="translate(38.60963,-9.3299) rotate(45)" d="M27.38,21.7h6.36v40.48h-6.36z" fill="#000000"></path><path d="M5,57l1,-11l7,1l1,3l2.92,1.5l2.08,7.5h-12z" fill="#000000"></path><path transform="translate(30.10993,-5.80979) rotate(45)" d="M18.88,13.2h6.36v40.48h-6.36z" fill="#000000"></path><path d="M60.59,15.9c0.00083,-1.06119 -0.42005,-2.07921 -1.17,-2.83l-8.49,-8.48c-1.58204,-1.51623 -4.07796,-1.51623 -5.66,0l-4.27,4.24c-0.37514,-0.37555 -0.88418,-0.58657 -1.415,-0.58657c-0.53082,0 -1.03986,0.21102 -1.415,0.58657l-5.66,5.66c-0.37555,0.37514 -0.58657,0.88418 -0.58657,1.415c0,0.53082 0.21102,1.03986 0.58657,1.415l0.05,0.05l-27.04,27.03c-0.50403,0.50349 -0.81242,1.16991 -0.87,1.88l-0.65,8.4l-0.7,4.92c-0.04081,0.2885 0.04625,0.58045 0.23839,0.79949c0.19214,0.21904 0.47026,0.34339 0.76161,0.34051h0.1l4.92,-0.74l8.45,-0.62c0.71713,-0.05292 1.3914,-0.36166 1.9,-0.87l27.08,-27c0.77391,0.74289 1.99609,0.74289 2.77,0l5.66,-5.66c0.37555,-0.37514 0.58657,-0.88418 0.58657,-1.415c0,-0.53082 -0.21102,-1.03986 -0.58657,-1.415l4.24,-4.24c0.76234,-0.763 1.18424,-1.80152 1.17,-2.88zM11.9,47.9l0.58,2.88c0.08012,0.39286 0.38714,0.69988 0.78,0.78l2.88,0.58l1.07,5.34l-7.62,0.52l-3.59,-3.59l0.61,-7.6zM19,56.35l-1,-4.77l16.67,-16.58c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244l-16.6,16.58l-2.36,-0.47l-0.47,-2.36l13.76,-13.76c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244l-13.76,13.76l-4.67,-0.93l26.25,-26.22l11.32,11.31zM52.34,25.8v0c-0.39004,-0.38772 -1.01996,-0.38772 -1.41,0l-1.41,1.41c-0.38772,0.39004 -0.38772,1.01996 0,1.41v0l-1.42,1.38v0l-14.1,-14.1l1.41,-1.41c0.39004,0.38772 1.01996,0.38772 1.41,0l1.41,-1.41c0.38772,-0.39004 0.38772,-1.01996 0,-1.41l1.41,-1.41l0.71,0.71l12.7,12.71l0.71,0.71zM58,17.31l-4.24,4.24l-11.32,-11.31l4.25,-4.24c0.37514,-0.37555 0.88418,-0.58657 1.415,-0.58657c0.53082,0 1.03986,0.21102 1.415,0.58657l8.48,8.49c0.37555,0.37514 0.58657,0.88418 0.58657,1.415c0,0.53082 -0.21102,1.03986 -0.58657,1.415z" fill="#cfcfcf"></path><path d="M40.32,15.19l-1.41,1.41c-0.30031,0.24027 -0.43621,0.63148 -0.34953,1.00618c0.08667,0.3747 0.38055,0.6665 0.75586,0.7505c0.37531,0.084 0.76554,-0.05468 1.00367,-0.35669l1.41,-1.41c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244zM43.86,18.73l-1.41,1.41c-0.28538,0.24439 -0.40968,0.62812 -0.32181,0.99342c0.08787,0.3653 0.37309,0.65052 0.73839,0.73839c0.3653,0.08787 0.74903,-0.03643 0.99342,-0.32181l1.41,-1.41c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244zM47.39,22.26l-1.39,1.42c-0.28538,0.24439 -0.40968,0.62812 -0.32181,0.99342c0.08787,0.3653 0.37309,0.65052 0.73839,0.73839c0.3653,0.08787 0.74903,-0.03643 0.99342,-0.32181l1.41,-1.41c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244zM31.84,26.51l-2.84,2.82c-0.28538,0.24439 -0.40968,0.62812 -0.32181,0.99342c0.08787,0.3653 0.37309,0.65052 0.73839,0.73839c0.3653,0.08787 0.74903,-0.03643 0.99342,-0.32181l2.83,-2.83c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244z" fill="#cfcfcf"></path></g></g>
            </svg>
          </div>
        
      }
        {
          admin &&
          <div className={[style.btn, style.btnDelete].join(" ")} onClick={()=>{deleteId(compo.id, compo.tier)}}>
        </div>
        }
        <div className={[style.btn, style.btnClose, open ? style.btnOpen: ""].join(" ")} >  
        </div>
      </div>
    </div>
    </div>
    <div className={[style.containerInfoSecundario, open ? "": style.hide, open && style.upBorder].join(" ")}>
      <div className={style.containerECT}>
        <div className={style.containerEGlobal}>
          <h3 className={style.titulo}>Early Game</h3>
          <div className={style.containerE}>
          {earlyComp.map(({dataCampeon, dataItem, estrellas},i)=>{
            return (
              <CampeonEarly key={`earlyCampeon`+i} dataCampeon={dataCampeon} dataItem={dataItem} estrellas={estrellas}/>
            )
          })}
          </div>
        </div>
        <div className={style.containerC}>
        <h3 className={style.titulo}>Items Prio</h3>
          <CarouselItems carouselItems={compo.carouselItems}/>    
        </div>
        {/* <div className={style.containerT}>
        <h3 className={style.titulo}>Traits</h3>
          <Sinergias sinergias={sinergias} posicionamiento={posicionamiento}/>
          </div> */}
      </div>
      <div className={style.containerAP}> 
      <h3 className={[style.titulo, style.tituloCentrado].join(" ")}>Late Game - {textoPosicionamiento(posicionamiento)}</h3>     
        <div className={style.containerT}>
        <Sinergias sinergias={sinergias} posicionamiento={posicionamiento}/>
        </div>
        <div className={style.containerPosicionamiento}>
          <PosicionamientoCompos id={compo.id} boardInfo={compo.boardInfo} titulo={compo.titulo}  originalComp={compo.originalComp} gameplay={compo.gameplay} spatula1={compo.spatulaItem1} spatula2={compo.spatulaItem2} setPosicionamiento={setPosicionamiento} posicionamiento={posicionamiento} setData={setData} setSinergias={setSinergias}/>
        </div>
        <div className={style.containerAumentos}>
          {/*<h3 className={style.titulo}>Augments</h3>*/}
          <AumentosCompos aumentos={compo.aumentos}/>
        </div>
      </div>
      {compo.tips && <div className={style.containerTips}>
        Tip: {compo.tips}
      </div>}
    </div>
    {editId === compo.id && 
    <CrearCompoTFT
      edit={true}
      editId={compo.id}
      edittier={compo.tier}
      editposicion={compo.posicion}
      editdificultad={compo.dificultad}
      edittitulo={compo.titulo}
      editshadowCategory={compo.shadowCategory}
      editinfographicCategory={compo.infographicCategory}
      editaumentos={compo.aumentos}
      editgameplay={compo.gameplay}
      edittips={compo.tips}
      editboardInfo={compo.boardInfo}
      editpictureSave={compo.pictureSave}
      editcarouselItems={compo.carouselItems}
      editspatulaItem1={compo.spatulaItem1}
      editspatulaItem2={compo.spatulaItem2}
      editoriginalComp={compo.originalComp}
      editisHide={compo.isHide}
    />}

    </div>
  )
}

export default Composicion;