import React, {useEffect, useState, version} from "react";
import style from "./css/Composicion.module.css";
import CampeonOriginal from "./CampeonOriginal";
import CampeonEarly from "./CampeonEarly";
import CarouselItems from "./CarouselItems";
import Sinergias from "./Sinergias";
import AumentosCompos from "./AumentosCompos";
import PosicionamientoCompos from "./PosicionamientoCompos";
import CrearCompoTFT from "./CrearCompoTFT";
//import { championsTFT as otrosChampions} from "src/json/updates/constantesLatest.js";
import { teamPlannerCode, dataTFTChampions, versionTFT, loadDataTFTFromAPI, getTeamPlannerCodeAPI, crearCompoMetaPHP, setMutatorPBE, setMutatorLatest } from "@stores/dataTFT";
import ShowBigCompScreen from "./ShowBigCompScreen"; 
import RadiantsItems from "./RadiantsItems";
import { useStore } from "@nanostores/react";
import MiniInfoComp from "@components/TFT/MiniInfoComp";

const Composicion = ({id, compo, admin=false, show=true, allwaysOpen=false, onToggle, isOpen})=>{
  const championsTFT = useStore(dataTFTChampions);
  const currentVersion = useStore(versionTFT);
  const codeOfChampions = useStore(teamPlannerCode);
  const [open,setOpen]=useState(allwaysOpen);
  const [editId, setEditId] = useState(null)
  const colorDificulty= {Easy:"green",Medium:"orange",Hard:"red"}
  const [posicionamiento, setPosicionamiento] = useState(compo.originalComp)
  const [data, setData] = useState(compo.boardInfo[compo.originalComp].data);
  const [sinergias, setSinergias] = useState(compo.boardInfo[compo.originalComp].sinergias);
  const [showBigComp, setShowBigComp] = useState(false);
  const [bigCompId, setBigCompId] = useState(null);
  const textoPosicionamiento = (texto)=>{
    if(texto === "spatula1"){
    
      texto = compo.spatulaItem1.name;
      return texto?.[0]?.toUpperCase() + texto?.slice(1)
    }
    if(texto === "spatula2"){
      texto = compo.spatulaItem2.name;
      return texto?.[0]?.toUpperCase() + texto?.slice(1)
    }
    return texto?.[0]?.toUpperCase() + texto?.slice(1)
  }
  useEffect(()=>{
    setPosicionamiento(compo.originalComp)
    setData(compo.boardInfo[compo.originalComp].data)
    setSinergias(compo.boardInfo[compo.originalComp].sinergias)
  },[compo])
  const earlyComp = Object.keys(compo.boardInfo.early.data).map((key)=>{
    const {dataCampeon, dataItem} = compo?.boardInfo?.early?.data?.[key]
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
    const priorityNames = ['TFT13_MissMage', 'TFT13_Viktor', 'TFT13_Warwick'];
    const sortedArray = allChampions.sort((a, b) => {
      // Si ambos están en la lista de prioridad
      if (priorityNames.includes(a.apiName) && priorityNames.includes(b.apiName)) {
          return priorityNames.indexOf(a.apiName) - priorityNames.indexOf(b.apiName);
      }
      // Si 'a' está en la lista de prioridad, lo mueve al final
      if (priorityNames.includes(a.apiName)) {
          return 1;
      }
      // Si 'b' está en la lista de prioridad, lo mueve al final
      if (priorityNames.includes(b.apiName)) {
          return -1;
      }
      // De lo contrario, ordena alfabéticamente
      return a.apiName.localeCompare(b.apiName);
  });
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
      if(item.apiName !=="TFT13_Rammus"){
        result[item.apiName] = sequence[index + 1]; // +1 para empezar después de "empty_slot"
      }
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

  function codeForPBE(allChampionsApiName){
    let sinDuplicados = [...new Set(allChampionsApiName)];
    let championsCode = "02";
    let cantidadDeCampeones = sinDuplicados.length;
    sinDuplicados.forEach(({apiName})=>{
      championsCode = championsCode.concat(codeOfChampions[apiName])
    })
    let espaciosVacios = 10 - cantidadDeCampeones;
    if (espaciosVacios > 0) {
        championsCode = championsCode.concat("000".repeat(espaciosVacios));
    }
    championsCode = championsCode.concat(currentVersion === "pbe" ? setMutatorPBE : setMutatorLatest)
    return championsCode
  }

  

  function handleEditID(e,id){
    e.stopPropagation()
    if(id === editId){
      setEditId(null)
    }else{
      setEditId(id)
    }
  }

  function deleteId(id, tier, version = "latest") { // Agregamos version por defecto
    let password = prompt('Write DELETE to continue');
    if (password === "DELETE") {
        let token;
        if (import.meta.env.SSR) {
            token = import.meta.env.TOKEN_META;
        } else {
            token = import.meta.env.PUBLIC_TOKEN_META;
        }
        fetch(crearCompoMetaPHP, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: `id=${id}&tier=${tier}&version=${version}`, // Se envía la versión
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(`ID: ${id} eliminado correctamente`);
                console.log('ID eliminado correctamente:', data.message);
            } else {
                console.error('Error al eliminar el ID:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

  function copyToClipboard(e,codigo) {
    e.stopPropagation();
    navigator.clipboard.writeText(codigo);
    alert("Copied Code: " + codigo);
  }

  function ShowBigComp(e,id){
    e.stopPropagation();
    setShowBigComp((valor)=>!valor);
    setBigCompId(id);
  }

  if (!compo) {
    return <div>Composición no disponible</div>;
  }

  return (
    <div id={id} className={[show ? style.containerInfoGlobal: style.containerInfoGlobalOculto].join(" ")}>
      <MiniInfoComp
        show={show}
        open={open}
        isOpen={isOpen}
        compo={compo}
        admin={admin}
        onToggle={onToggle}
        copyToClipboard={copyToClipboard}
        generatorCodeBuilder={generatorCodeBuilder}
        colorDificulty={colorDificulty}
        dataCampeones={dataCampeones}
        handleEditID={handleEditID}
        ShowBigComp={ShowBigComp}
        deleteId={deleteId}
        forInfografia={false}
      />
    <div className={[show ? style.containerInfoSecundario : style.containerInfoSecundarioOculto, (open || isOpen) ? "": style.hide, (open || isOpen) && style.upBorder].join(" ")}>
      <div className={[show ? style.containerECT : style.containerECTOculto].join(" ")}>
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
        {compo.radiantsItems && 
        <div className={style.containerR}>
        <h3 className={style.titulo}>Best Radiant</h3>
          <RadiantsItems radiantsItems={compo?.radiantsItems}/>    
        </div>
        }
        {/* <div className={style.containerT}>
        <h3 className={style.titulo}>Traits</h3>
          <Sinergias sinergias={sinergias} posicionamiento={posicionamiento}/>
          </div> */}
      </div>
      <div className={[show ? style.containerAP: style.containerAPOculto].join(" ")}> 
        {show ?
        <>
        <h3 className={[style.titulo, style.tituloCentrado].join(" ")}>Late Game - {textoPosicionamiento(posicionamiento)}</h3>     
        <div className={style.containerT}>
          <Sinergias sinergias={sinergias} posicionamiento={posicionamiento} show={show} version={compo?.version || "latest"}/>
        </div>
        </>
         :
          <div className={style.containerTOculto}>
          {/* <h3 className={show ? [style.titulo, style.tituloCentrado].join(" ") : style.tituloCentradoOculto}>Late Game - {textoPosicionamiento(posicionamiento)}</h3>     */}
          <Sinergias sinergias={sinergias} posicionamiento={posicionamiento} show={show} version={compo?.version || "latest"}/> 
          </div>
        }
        <div className={style.containerPosicionamiento}>
          <PosicionamientoCompos id={compo.id} boardInfo={compo.boardInfo} titulo={compo.titulo}  originalComp={compo.originalComp} gameplay={compo.gameplay} spatula1={compo.spatulaItem1.icon} spatula2={compo.spatulaItem2.icon} setPosicionamiento={setPosicionamiento} posicionamiento={posicionamiento} setData={setData} setSinergias={setSinergias} show={show} version={compo.version}/>
        </div>
      </div>
      <div className={[show ? style.containerAumentos : style.containerAumentosOculto].join(" ")}>
        {/*<h3 className={style.titulo}>Augments</h3>*/}
        <AumentosCompos aumentos={compo.aumentos}/>
      </div>
      {show && 
      <div className={style.containerTips}>
        <div className={style.containerTextoInfoPrimarioCode} onClick={(e)=>copyToClipboard(e,(currentVersion === "pbe" ? codeForPBE(allChampionsApiName) : generatorCodeBuilder(allChampionsApiName)))}>
          {"COPY TEAM CODE: " + (currentVersion === "pbe" ? codeForPBE(allChampionsApiName) : generatorCodeBuilder(allChampionsApiName)) + " 📋"}
        </div>
      </div>
      }
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
      editisInInfographic={compo.isInInfographic}
      editCampeonTierList={compo.campeonTierList}
      editAugmentTierList={compo.augmentTierList}
      editCampeonItemTierList={compo.champItem}
      editCampeonTraitTierList={compo.champTrait}
      editChamp3Stars={compo?.champ3Stars}
      editVersion={compo.version}
      editradiantItem={compo?.radiantsItems || []}
    />}
    {
      showBigComp &&
      <ShowBigCompScreen 
        id={bigCompId}
        setShowBigComp={setShowBigComp}
      />
    }
    </div>
    
  )
}

export default Composicion;