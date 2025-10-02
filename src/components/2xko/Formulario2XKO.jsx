import { useEffect, useRef, useState, useCallback } from "react";
import { toPng } from 'html-to-image';
import {
  fetchCampeones2xkoMeta, 
  ChampsMeta2xko, 
  Constantes2xko, 
  urlSaveConstantes2xko, 
  urlSaveMeta2xko,
} from "@stores/data2xko";

import { useStore } from "@nanostores/react";
import Infografia from "./Infografia";
import SliderButtom from "@components/inputs/SliderButtom";
import SliderButtomLogoGuiadeparche from "@components/inputs/SliderButtomLogoGuiadeparche";

const Formulario2XKO = ()=>{
  const constantes2xko = useStore(Constantes2xko);
  const champsMeta2xko = useStore(ChampsMeta2xko);
  const [titulo, setTitulo] = useState("");
  const [version, setVersion] = useState("");
  const [logoMovilnet, setLogoMovilnet] = useState(true);
  const [logoGuiadeparche, setLogoGuiadeparche] = useState(false);
  const [tierSeleccionado, setTierSeleccionado] = useState("S");
  const backgroundRef = useRef(null)

  const tiers = ["S", "A+", "A", "A-"];
  const dificultades = ["Easy, Medium, Hard"];
  const campeones = ["Ahri", "Blitzcrank", "Braum","Darius", "Ekko", "Illaoi","Jinx","Teemo", "Vi", "Yasuo" ]
  const fuses = ["2X_Assist","Double_Down", "Freestyle", "Juggernaut", "Sidekick"]
  const fuseColor= {
    [fuses[0]]: "#00dde5",
    [fuses[1]]: "#ffbe00",
    [fuses[2]]: "#6970ff",
    [fuses[3]]: "#ff0008",
    [fuses[4]]: "#fa00e5",

  }
  const [meta2xko, setMeta2xko] = useState({})

  const guardarCambiosMeta2xko = ()=>{
    console.log("Guardando cambios en meta2xko:", meta2xko);
    fetch(urlSaveMeta2xko,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`
      },
      body:JSON.stringify(meta2xko)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Datos guardados correctamente", data)
      alert("Datos guardados correctamente")
    })
    .catch(error=>{
      console.error("Error al guardar los datos", error)
      alert("Error al guardar los datos")
    })
  }

const saveConstantes2xko = async () => {
  try {
    // Guardar título
    await fetch(urlSaveConstantes2xko, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
      },
      body: JSON.stringify({
        key: "tituloVisualizadorMeta",
        value: titulo,
      }),
    });

    // Guardar versión
    await fetch(urlSaveConstantes2xko, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
      },
      body: JSON.stringify({
        key: "versionVisualizadorMeta",
        value: version,
      }),
    });

    alert("Constantes guardadas correctamente");
  } catch (error) {
    console.error("Error al guardar las constantes", error);
    alert("Error al guardar las constantes");
  }
};

  
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await fetchCampeones2xkoMeta();
      console.log({data})
      setMeta2xko(data);
    }
    fetchData();
  },[])

  useEffect(()=>{
    setMeta2xko(champsMeta2xko);
  },[champsMeta2xko])
  useEffect(()=>{
    setTitulo(constantes2xko.tituloVisualizadorMeta || "2xKO - Guía de Parche");
    setVersion(constantes2xko.versionVisualizadorMeta || "13.12");
  },[constantes2xko])

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
      {/* Seleccionar para editar por tier */}
      <h2>Selecciona el tier que quieres editar:</h2>
      {
        Object.keys(meta2xko).map((tier, index)=>{
          return (
            <input 
              key={`input-tier-${tier}`}
              type="button" 
              value={`Tier ${tiers[index]}`} 
              onClick={()=>setTierSeleccionado(tier)}
              style={{
                backgroundColor: tierSeleccionado === tier ? "green" : "white",
                color: tierSeleccionado === tier ? "white" : "black"
              }}
              ></input>
          )
        })
      }
      {/*Seleccionar 5 campeones duos por tier Seleccionado */}
      <div>
        <h2>Selecciona los 4 campeones duos para el tier {tierSeleccionado}</h2>
        {
          Array(4).fill(0).map((_, posicion)=>{
            return (
              <div 
                key={tierSeleccionado+posicion}
                style={{
                display:"flex",
                gap:"10px",
              }}
              >
                <select
                  key={posicion+"primario"}
                  onChange={(e)=>{
                    const nuevoPrimario = e.target.value;
                    const nuevoMeta = {...meta2xko};
                    nuevoMeta[tierSeleccionado] = nuevoMeta[tierSeleccionado] || []
                    nuevoMeta[tierSeleccionado][posicion] = nuevoMeta[tierSeleccionado][posicion] || {}
                    nuevoMeta[tierSeleccionado][posicion].nombrePrincipal = nuevoPrimario;
                    nuevoMeta[tierSeleccionado][posicion].imagenPrincipal = `https://api.guiadeparche.com/2xko/assets/campeones/cuadrados/${nuevoPrimario}_2xko_v2.webp`
                    setMeta2xko(nuevoMeta);
                  }}
                >
                  <option value="" disabled selected hidden>Campeon Primario</option>
                  {campeones.map((campeon, i)=>{
                    return (
                      <option key={`seleccionarPrincipal ${tierSeleccionado} ${i}`} value={campeon}>{campeon}</option>
                    )
                  })}
                </select>
                <select
                  key={posicion +"secundario"}
                  onChange={(e)=>{
                    const nuevoSecundario = e.target.value;
                    const nuevoMeta = {...meta2xko};
                    nuevoMeta[tierSeleccionado] = nuevoMeta[tierSeleccionado] || []
                    nuevoMeta[tierSeleccionado][posicion] = nuevoMeta[tierSeleccionado][posicion] || {}
                    nuevoMeta[tierSeleccionado][posicion].nombreSecundario = nuevoSecundario;
                    nuevoMeta[tierSeleccionado][posicion].imagenSecundario = `https://api.guiadeparche.com/2xko/assets/campeones/cuadrados/${nuevoSecundario}_2xko_v2.webp`
                    setMeta2xko(nuevoMeta);
                  }}
                >
                  <option value="" disabled selected hidden>Campeon Secundario</option>
                  {campeones.map((campeon, i)=>{
                    return (
                      <option key={`seleccionarSecundario ${tierSeleccionado} ${i}`} value={campeon}>{campeon}</option>
                    )
                  })}
                </select>
                <select
                  key={posicion +"fuses"}
                  onChange={(e)=>{
                    console.log({VEEEER:e.target.value})
                    const nuevoFuse = e.target.value === "remover" ? null : e.target.value ;
                    const nuevoMeta = {...meta2xko};
                    nuevoMeta[tierSeleccionado] = nuevoMeta[tierSeleccionado] || []
                    nuevoMeta[tierSeleccionado][posicion] = nuevoMeta[tierSeleccionado][posicion] || {}
                    nuevoMeta[tierSeleccionado][posicion].fuse = nuevoFuse;
                    nuevoMeta[tierSeleccionado][posicion].imagenFuse = `/2xko/fuses/2xko_${nuevoFuse}_fuse.webp`
                    nuevoMeta[tierSeleccionado][posicion].fuseColor = fuseColor[nuevoFuse];
                    setMeta2xko(nuevoMeta);
                  }}
                >
                  <option value="" disabled selected hidden>Fuses</option>
                  {fuses.map((fuse, i)=>{
                    return (
                      <option key={`seleccionarFuses ${tierSeleccionado} ${i}`} value={fuse}>{fuse}</option>
                    )
                  })}
                  <option value={"remover"}>remover</option>
                </select>
                <img src={meta2xko[tierSeleccionado]?.[posicion]?.imagenPrincipal} alt={""}></img>
                <img src={meta2xko[tierSeleccionado]?.[posicion]?.imagenSecundario} alt={""}></img>
                <img src={meta2xko[tierSeleccionado]?.[posicion]?.imagenFuse} alt={""}></img>
              </div>
            )
          })
        }
      </div>
      <div>
        <input 
          type="button" 
          value="Guardar Cambios"
          onClick={()=>{
            guardarCambiosMeta2xko()
          }}
          ></input>
      </div>
      <div>
        <label>Título Visualizador Meta 2xKO:</label>
        <input 
          type="text" 
          value={titulo}
          onChange={(e)=>{
            setTitulo(e.target.value) 
          }}
        ></input>
        <input 
          type="text" 
          value={version}
          onChange={(e)=>{
            setVersion(e.target.value) 
          }}
        ></input>
          
        <input 
          type="button" 
          value="Guardar Titulo y Version"
          onClick={()=>{
            saveConstantes2xko()
          }}
        ></input>
        <SliderButtom setLogoMovilnet={setLogoMovilnet} logoMovilnet={logoMovilnet}/>
        <SliderButtomLogoGuiadeparche setLogoGuiadeparche={setLogoGuiadeparche} logoGuiadeparche={logoGuiadeparche}/>

         <input type="button" onClick={()=>{onButtonClick()}} defaultValue="Capturar Imagen"/> 

      </div>
      <Infografia
        backgroundRef={backgroundRef}
        meta2xko={meta2xko}
        titulo={titulo}
        version={version}
        logoMovilnet={logoMovilnet}
        logoGuiadeparche={logoGuiadeparche}
      ></Infografia>
    </div>
  )
}

export default Formulario2XKO;