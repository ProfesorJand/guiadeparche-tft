import { useEffect, useState } from "react";
import {
  fetchCampeones2xkoMeta, 
  ChampsMeta2xko, 
  Constantes2xko, 
  urlSaveConstantes2xko, 
  urlSaveMeta2xko,
} from "@stores/data2xko";

import { useStore } from "@nanostores/react";
import Infografia from "./Infografia";

const Formulario2XKO = ()=>{
  const constantes2xko = useStore(Constantes2xko);
  const champsMeta2xko = useStore(ChampsMeta2xko);
  const [titulo, setTitulo] = useState("");
  const [version, setVersion] = useState("");
  const [logoMovilnet, setLogoMovilnet] = useState(true);
  const [tierSeleccionado, setTierSeleccionado] = useState("S");

  const tiers = ["S", "A+", "A", "A-", "B", "C"];
  const dificultades = ["Easy, Medium, Hard"];
  const campeones = ["Ahri", "Blitzcrank", "Braum","Darius",  "Ekko", "Illaoi","Jinx", "Vi", "Yasuo" ]
  
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
        <h2>Selecciona los 5 campeones duos para el tier {tierSeleccionado}</h2>
        {
          Array(5).fill(0).map((_, posicion)=>{
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
                    nuevoMeta[tierSeleccionado][posicion].imagenPrincipal = `/2xko/campeones/cuadrados/${nuevoPrimario}-2xko.png`
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
                    nuevoMeta[tierSeleccionado][posicion].imagenSecundario = `/2xko/campeones/cuadrados/${nuevoSecundario}-2xko.png`
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
                <img src={meta2xko[tierSeleccionado]?.[posicion]?.imagenPrincipal} alt={""}></img>
                <img src={meta2xko[tierSeleccionado]?.[posicion]?.imagenSecundario} alt={""}></img>
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



      </div>
      <Infografia
        meta2xko={meta2xko}
        titulo={titulo}
        version={version}
        logoMovilnet={logoMovilnet}
      ></Infografia>
    </div>
  )
}

export default Formulario2XKO;