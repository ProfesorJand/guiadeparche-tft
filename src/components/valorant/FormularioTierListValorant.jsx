import { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "@nanostores/react";
import { toPng } from 'html-to-image';
import TierListValorant from "./TierListValorant";
import style from "./css/FormularioTierListValorant.module.css"
import {fetchAgentsMeta, ValorantAgentsMeta, ValorantConstantes} from "@stores/dataValorant"

const FormularioTierListValorant = () => {
  const backgroundRef = useRef(null);
  const ConstantesValorant = useStore(ValorantConstantes);
  const [localMetaValorant, setLocalMetaValorant] = useState({})
  const [version, setVersion] = useState("10.10");
  const [titulo, setTitulo] = useState("TOP RANKED LINEUPS - TIER S+")
  const admin = localStorage.getItem("user") || false;
  const numbersOfAgentsInMeta= 5;
   const ValorantAgentsMetaStore = useStore(ValorantAgentsMeta);
   
  useEffect(()=>{
    const fetching = async () =>{
      const uploadMeta = await fetchAgentsMeta();
      setLocalMetaValorant(uploadMeta)
    }
    fetching()
  },[])

  useEffect(()=>{
    setLocalMetaValorant(JSON.parse(JSON.stringify(ValorantAgentsMetaStore)))
  },[ValorantAgentsMetaStore])

  useEffect(()=>{
  if (ConstantesValorant) {
    setVersion(ConstantesValorant.versionVisualizadorMeta)
    setTitulo(ConstantesValorant.tituloVisualizadorMeta)
  }
  },[ConstantesValorant])

  useEffect(()=>{
    console.log({localMetaValorant})
  },[localMetaValorant])

  const handleAgent = ({agent, map, iAgentSpot, rol})=>{
    console.log("handleAgent")
    console.log({agent})
   
    const updateMap = localMetaValorant?.[map] ? {...localMetaValorant[map]} : {};
    updateMap[rol] = updateMap?.[rol] ? [...updateMap[rol]] : [] 
    updateMap[rol][iAgentSpot] = agent;
    console.log({updateMapRol:updateMap[rol]})
    const sonTodosNulls = updateMap[rol].every((value)=>value === null)
    if(sonTodosNulls){
      delete updateMap[rol]
    }
    const updateMapTieneKeys = Object.keys(updateMap).length > 0;
    setLocalMetaValorant(prev => {
    const newMeta = { ...prev };
    if (updateMapTieneKeys) {
      newMeta[map] = updateMap;
    } else {
      delete newMeta[map];
    }
    return newMeta;
  });
     //const updateMapAgent = localMetaValorant?.[map] ? localMetaValorant[map] : [];
    // updateMapAgent[iAgentSpot] = agent;
    // console.log({updateMapAgent})
    // setLocalMetaValorant((prev)=>{
    //   return ({
    //     ...prev,
    //     [map]:updateMapAgent
    //   })
    // })
  }

  const saveChanges = async () => {
    try {
      const response = await fetch("https://api.guiadeparche.com/val/saveMetaVal.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
        },
        body: JSON.stringify(localMetaValorant),
      });
  
      if (!response.ok) {
        throw new Error("Error saving MetaValorant");
      }
  
      console.log("%cMetaValorant saved successfully", "background:green;color:white");
  
      // 🔄 Actualizar el store con la versión más reciente desde el servidor
      const updatedMeta = await fetchAgentsMeta();
      ValorantAgentsMeta.set(updatedMeta);
  
      console.log("%cMetaValorant updated from server", "background:blue;color:white");
  
    } catch (error) {
      console.error("Error saving or updating MetaLOL:", error);
    }
  };

  const saveContantes = async ({key,value})=>{
    console.log({key,value})
    try{
      const response = await fetch("https://api.guiadeparche.com/val/constantes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
        },
        body: JSON.stringify({key,value}),
      });
      alert(`${key} se ha guardado`)
    }catch(err){
      console.error("Error saving or updating constantes Valorant:", err)
      alert(`${key} NO se ha guardado`)
    }
  }

  const loadAllImages = (container) => {
    const images = container.querySelectorAll("img");
    const promises = [];

    images.forEach((img) => {
      // ⚠️ Eliminar el lazy loading para forzar la carga inmediata
      if (img.loading === "lazy") {
        img.loading = "eager";
      }
      if (img.complete && img.naturalWidth === 0) {
        console.warn("⚠️ Imagen rota:", img, img.src);
      }
      if (img.complete) {
        if (img.naturalWidth === 0) {
          promises.push(Promise.reject(`❌ Falló imagen: ${img.src}`));
        }
      } else {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () =>{
              reject(`❌ Falló imagen: ${img.src}`)};
          })
        );
      }
    });

    return Promise.allSettled(promises).then(results => {
      const errors = results.filter(r => r.status === "rejected");
      if (errors.length > 0) {
        throw new Error(`❌ ${errors.length} imágenes fallaron`);
      }
    });
  };


  const onButtonClick = useCallback(() => {
    if (backgroundRef.current === null) return;
  
    loadAllImages(backgroundRef.current)
      .then(() => {
        return toPng(backgroundRef.current, {
          cacheBust: true,
          pixelRatio: 2, // mejora calidad (escala la resolución)
        });
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `Mejores-Agentes-Valorant${10.10}.png`;
        link.href = dataUrl;
        link.click();
        console.log("📸 Imagen capturada");
        alert("📸 Imagen capturada")
      })
      .catch((err) => {
        console.error("❌ Error al capturar imagen:", err);
      });
  }, [backgroundRef]);


  return (
    <div>
      {
        admin &&
        <>
      <div>
        {maps.length > 0 && maps.map((map,iMap)=>{
          return (
            <div key={`ValorantMap${iMap}`}>
              <label>{map}</label>
              <img src={`/valorant/maps/${map}.webp`} style={{width:"30%"}}></img>
              {Object.keys(agentsRols).map((rol)=>{
                return (
                  <div>
                    <img src={`/valorant/rols/${rol}.svg`} style={{ filter: "brightness(0) invert(1)" }}></img>
                    {rol}
                    {Array.from({ length: 2}, (_, iAgentSpot)=>{
                      return (
                        <div key={`inputsAgents${iAgentSpot}`}>
                          <input
                            list={`agentsList${rol}`}
                            placeholder="Find Agent"
                            value={localMetaValorant[map]?.[rol]?.[iAgentSpot] || ""}
                            onChange={(e)=>{
                              const agent = e.target.value;
                              if(agent===""){
                                handleAgent({
                                  agent:null,
                                  map,
                                  rol,
                                  iAgentSpot
                                })
                              }else{
                                handleAgent({
                                  agent,
                                  map,
                                  rol,
                                  iAgentSpot
                                })
                              }
                            }}
                          />
                          <datalist id={`agentsList${rol}`}>
                            {agentsRols[rol].map((agent,iAgentOption)=>{
                              return (
                                <option key={`agentInputs${iMap}${iAgentSpot}${iAgentOption}${rol}`} value={agent}>{agent}</option>
                              )
                            })}
                          </datalist>
                        </div>
                      )
                    })}
                  </div>
                  )
                })}
            </div>
          )
        })}
      </div>
      <div className={style.botones}>
        <input type="button" onClick={()=>{saveChanges()}} defaultValue="Guardar Cambios"/>
        <input type="text"  id={"titulo"} onChange={(e)=>{setTitulo(e.target.value)}} value={titulo} className={style.inputText}/>
        <input type="button" onClick={(e)=>{saveContantes({key:"tituloVisualizadorMeta",value:document.getElementById("titulo").value})}} value={"Guardar Titulo"}></input>
        <input type="text" id={"version"} onChange={(e)=>{setVersion(e.target.value)}} value={version} className={style.inputText}/>
         <input type="button" onClick={(e)=>{saveContantes({key:"versionVisualizadorMeta",value:document.getElementById("version").value})}} value={"Guardar Version"}></input>
        <input type="button" onClick={()=>{onButtonClick()}} defaultValue="Capturar Imagen"/>
      </div>
        </>
      }
      <TierListValorant localMetaValorant={localMetaValorant} backgroundRef={backgroundRef} rols={rols} version={version} titulo={titulo}/>
    </div>
  )
}

const maps = [
  "ascent",
  "bind",
  "breeze",
  "fracture",
  "heaven",
  "icebox",
  "lotus",
  "pearl",
  "split",
  "sunset"
];

const agentsRols = {
  "controller":["clove","omen","brimstone","viper","astra","harbor"],
  "duelist":["reyna","jett","raze","pheonix","neon","iso","yoru","waylay"],
  "initiator":["sova","gekko","fade","breach","skye","kayo","tejo"],
  "sentinel":["cypher","sage","chamber","killjoy","vyse","deadlock"],
};

const rols = [
  "controller",
  "duelist",
  "initiator",
  "sentinel"
];

const agents = [
  "astra",
  "breach",
  "brimstone",
  "chamber",
  "clove",
  "cypher",
  "deadlock",
  "fade",
  "gekko",
  "harbor",
  "iso",
  "jett",
  "kayo",
  "killjoy",
  "neon",
  "omen",
  "pheonix",
  "raze",
  "reyna",
  "sage",
  "skye",
  "sova",
  "tejo",
  "viper",
  "vyse",
  "waylay",
  "yoru"
];
export default FormularioTierListValorant