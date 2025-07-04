import { useEffect, useState } from "react";
import {ValorantConstantes} from "@stores/dataValorant";
import { useStore } from "@nanostores/react";
import style from "./css/Contenedor.module.css";

const Contenedor = ({children})=>{
  const constantes = useStore(ValorantConstantes);
  const titulo = constantes?.titulo;
  const parrafo1 = constantes?.parrafo1;
  // const tipsForAgents = constantes?.tipsForAgents || {};
  const [tipsForAgents, setTipsForAgents] = useState(Tips);
  const [editarBtn, setEditarBtn] = useState({
    titulo: false,
    parrafo1: false,
    tips: {
      "Duelistas": false,
      "Controladores": false,
      "Iniciadores": false,
      "Centinelas": false
    }
  });
  const admin = localStorage.getItem("superAdmin");

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
  return (
    <div className="container">
    <h1>{titulo}</h1>
    {admin && <input className={style.btnEditVariables} type="button" value={editarBtn.titulo ? "Ocultar Edición" :"Editar Título"} onClick={()=>setEditarBtn((prev)=>({...prev, titulo: !prev.titulo}))} />}
    {editarBtn.titulo && (
      <div>
        <textarea
          value={titulo}
          onChange={
            (e)=> ValorantConstantes.set({
              ...constantes,
              titulo: e.target.value
          })}
          placeholder="Título del h1"
          rows={4} // ajusta esto para la altura inicial
          style={{ width: "100%", resize: "vertical" }} // podés ajustar el ancho y si se puede redimensionar
        />
        <button onClick={()=>saveContantes({key:"titulo",value:titulo})}>Guardar Título h1</button>
      </div>
    )}
    <p>{parrafo1}</p>
    {admin && <input className={style.btnEditVariables} type="button" value={editarBtn.parrafo1 ? "Ocultar Edición" :"Editar Parrafo"} onClick={()=>setEditarBtn((prev)=>({...prev, parrafo1: !prev.parrafo1}))} />}
     {editarBtn.parrafo1 && (
      <div>
        <textarea
          value={parrafo1}
          onChange={
            (e) => ValorantConstantes.set({
              ...constantes,
              parrafo1: e.target.value
          })
          }
          placeholder="Primer párrafo"
          rows={4} // ajusta esto para la altura inicial
          style={{ width: "100%", resize: "vertical" }} // podés ajustar el ancho y si se puede redimensionar
        />
        <button onClick={()=>saveContantes({key:"parrafo1",value:parrafo1})}>Guardar Primer Párrafo</button>
      </div>
    )}
    {children}
    {Object.keys(Tips).map((rol, iRol)=>{
      return (
        <div key={iRol} >
          <h2>{rol}</h2>
          {Tips?.[rol].map((agente, iAgente)=>{
            return (
              <div key={iAgente}>
                <h3>{agente.agent}</h3>
                <p>{agente.tip || ValorantConstantes[agente.agent+"Tip"] || ""}</p>
                { admin && 
                <>
                  <input
                    type="text"
                    value={constantes?.[rol]?.[agente.agent+"Tip"] || ""}
                    onChange={
                      (e)=>
                        ValorantConstantes.set({
                          ...constantes,
                          [rol]: constantes[rol]?.map((a) => {
                            if (a.agent === agente.agent) {
                              return {...a, tip: e.target.value};
                            }
                            return a;
                          })
                    })}
                        placeholder={`Tip for ${agente.agent}`}
                        />
                  <button onClick={()=>saveContantes(
                    {
                      key:rol,
                      value:[
                        ...constante?.[rol] || [],
                        constantes?.[rol].map((a)=>{
                          if(a.agent === agente.agent){
                            return {...a, tip: constantes?.[rol]?.[agente.agent+"Tip"] || ""}
                          }
                          return a;
                        })]
                    })}>
                        {`Guardar ${agente.agent} Tip`}</button>
                </>
                }
              </div>
            )
          })}
        </div>
      )
    })}
    </div>
  )
}

const Tips = {
  "Duelistas": [
    {
      agent: "Jett",
      tip:"Versátil y letal, Jett domina en mapas abiertos con ángulos agresivos. Ideal para operadores y entradas rápidas. Meta sólida en casi todos los mapas."
    },
    {
      agent: "Reyna",
      tip:"Duelista autosuficiente que brilla en rankeds y situaciones clutch. Popular en mapas con muchos 1v1s, como Ascent, Split y Haven."
    },
    {
      agent: "Neon",
      tip:"Velocidad extrema y control del espacio. Neon es clave en mapas con entradas rápidas como Fracture y Lotus."
    },
    {
      agent: "Raze",
      tip:"Explosiva y dominante en Bind, donde su movilidad y daño en espacios cerrados hacen estragos. Gran control de zonas."
    },
    {
      agent: "Iso",
      tip:"Gran presencia en Haven por sus trades y presión constante en duelos. Su ultimate cambia el ritmo de la ronda."
    },
  ],
  "Controladores":[
    {
      agent: "Clove",
      tip:"Con utilidades post-muerte y smokes flexibles, Clove se adapta a cualquier mapa. Meta top por su impacto constante."
    },
    {
      agent: "Omen",
      tip:"El controlador más versátil. Su TP y smokes a largo plazo lo hacen vital en casi todos los mapas."
    },
    {
      agent: "Brimstone",
      tip:"Ideal en Bind: sus smokes rápidas, molotov y stim lo hacen perfecto para ejecutar o denegar zonas."
    },
    {
      agent: "Viper",
      tip:"Clave en Icebox por su muro y setup defensivo. Excelente control de planta y retake."
    },
  ],
  "Iniciadores":[
    {
      agent: "Sova",
      tip:"El maestro del scouting. Sus dardos y dron lo hacen esencial en mapas abiertos como Haven, Ascent y Icebox."
    },
     {
      agent: "Skye",
      tip:"Perfecta para mapas como Bind, donde sus flashes y curas aportan en entradas coordinadas."
    },
     {
      agent: "Fade",
      tip:"Gran control de info en Corrode y Lotus. Sus rastros y ultimate limpian zonas con facilidad."
    },
     {
      agent: "KAY/O",
      tip:"Fuerte en Ascent por su capacidad de cancelar habilidades clave y apoyar con flashes."
    },
     {
      agent: "Breach",
      tip:"Dominante en Haven y Lotus, donde sus stuns y ultimate controlan el espacio cerrado con precisión."
    },
    {
      agent: "Gekko",
      tip:"Útil en Icebox y Sunset, gracias a su versatilidad, flashes y utilidad de planta/retake."
    },
  ],
  "Centinelas":[
    {
      agent: "Cypher",
      tip:"Fuerte control defensivo. Sus trampas y cámaras siguen siendo meta en casi todos los mapas."
    },
    {
      agent: "Chamber",
      tip:"Letal en manos hábiles. Su teleport y arma personalizada lo hacen fuerte en mapas de largos ángulos."
    },
    {
      agent: "Killjoy",
      tip:"Gran control de zonas y setups. Esencial en sitios cerrados como Split, Lotus o Ascent."
    },
    {
      agent: "Vyse",
      tip:"Viable en Lotus y Sunset, donde sus trampas activas y mapa cerrado maximizan su potencial."
    },
    {
      agent: "Deadlock",
      tip:"Poco frecuente, pero útil en Corrode con setups de control y bloqueo de espacio en zonas estrechas."
    },
  ]
}

export default Contenedor;