import { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "@nanostores/react";
import { toPng } from 'html-to-image';
import TierListValorant from "./TierListValorant";
import {fetchAgentsMeta, ValorantAgentsMeta} from "@stores/dataValorant"
const FormularioTierListValorant = () => {
  const backgroundRef = useRef(null)
  const [localMetaValorant, setLocalMetaValorant] = useState({})
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

  const handleAgent = ({agent, map, iAgentSpot})=>{
    console.log("handleAgent")
    console.log({agent})
    const updateMapAgent = localMetaValorant?.[map] ? localMetaValorant[map] : []
    updateMapAgent[iAgentSpot] = agent;
    console.log({updateMapAgent})
    setLocalMetaValorant((prev)=>{
      return ({
        ...prev,
        [map]:updateMapAgent
      })
    })
  }

  const saveChanges = async () => {
    try {
      const response = await fetch("https://guiadeparche.com/val/saveMetaVal.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
        },
        body: JSON.stringify(localMetaValorant),
      });
  
      if (!response.ok) {
        throw new Error("Error saving MetaLOL");
      }
  
      console.log("%cMetaLOL saved successfully", "background:green;color:white");
  
      // 🔄 Actualizar el store con la versión más reciente desde el servidor
      const updatedMeta = await fetchAgentsMeta();
      ValorantAgentsMeta.set(updatedMeta);
  
      console.log("%cMetaLOL updated from server", "background:blue;color:white");
  
    } catch (error) {
      console.error("Error saving or updating MetaLOL:", error);
    }
  };

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
      })
      .catch((err) => {
        console.error("❌ Error al capturar imagen:", err);
      });
  }, [backgroundRef]);


  return (
    <div>
      <div>
        {maps.length > 0 && maps.map((map,iMap)=>{
          return (
            <div key={`ValorantMap${iMap}`}>
              <label>{map}</label>
              <img src={`/valorant/maps/${map}.webp`} style={{width:"30%"}}></img>
              {Array.from({ length: numbersOfAgentsInMeta}, (_, iAgentSpot)=>{
                return (
                  <div key={`inputsAgents${iAgentSpot}`}>
                    <input
                      list="agentsList"
                      placeholder="Find Agent"
                      value={localMetaValorant[map]?.[iAgentSpot] || ""}
                      onChange={(e)=>{
                        const agent = e.target.value;
                        if(agent===""){
                          handleAgent({
                            agent:null,
                            map,
                            iAgentSpot
                          })
                        }else{
                          handleAgent({
                            agent,
                            map,
                            iAgentSpot
                          })
                        }
                      }}
                    />
                    <datalist id="agentsList">
                      {agents.map((agent,iAgentOption)=>{
                        return (
                          <option key={`agentInputs${iMap}${iAgentSpot}${iAgentOption}`} value={agent}>{agent}</option>
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
      <div>
        <input type="button" onClick={()=>{saveChanges()}} defaultValue="Guardar Cambios"/>
        <input type="button" onClick={()=>{onButtonClick()}} defaultValue="Capturar Imagen"/>
      </div>
      <TierListValorant localMetaValorant={localMetaValorant} backgroundRef={backgroundRef}/>
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