import { useEffect, useState } from "react";
import {ValorantConstantes} from "@stores/dataValorant";
import { useStore } from "@nanostores/react";
import { saveConstantes, URL_CONSTANTES_VALORANT } from "@stores/constantes.js";
import style from "./css/Contenedor.module.css";
import VersionCompo from "@components/valorant/VersionCompo";

const Contenedor = ({children})=>{
  const constantes = useStore(ValorantConstantes);
  const titulo = constantes?.titulo;
  const parrafo1 = constantes?.parrafo1;
  // const tipsForAgents = constantes?.tipsForAgents || {};
  const [tipsForAgents, setTipsForAgents] = useState(Tips);
  const tipsFlags = {};

  Object.values(Tips).forEach(categoria => {
    categoria.forEach(agente => {
      tipsFlags[`${agente.agent}Tip`] = false;
    });
  });
  console.log("tipsFlags", tipsFlags)
  const [editarBtn, setEditarBtn] = useState({
    titulo: false,
    parrafo1: false,
    ...tipsFlags
  });
  const admin = localStorage.getItem("superAdmin");

  return (
    <div className="container">
    <h1>{titulo || "Best Valorant Agents & Lineups | Mejores Agentes"}</h1>
    <VersionCompo></VersionCompo>
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
        <button onClick={()=>saveConstantes({key:"titulo",value:titulo, url:URL_CONSTANTES_VALORANT})}>Guardar Título h1</button>
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
        <button onClick={()=>saveConstantes({key:"parrafo1",value:parrafo1,url:URL_CONSTANTES_VALORANT})}>Guardar Primer Párrafo</button>
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
                <p>{constantes[agente.agent+"Tip"]}</p>
                {admin && <input className={style.btnEditVariables} type="button" value={editarBtn[agente.agent+"Tip"] ? "Ocultar Edición" :"Editar Parrafo"} onClick={()=>setEditarBtn((prev)=>({...prev, [agente.agent+"Tip"]: !prev[agente.agent+"Tip"]}))} />}
                { editarBtn[agente.agent+"Tip"] && 
                <>
                  <textarea
                    className={style.textareaTip}
                    type="text"
                    value={constantes?.[agente.agent+"Tip"] || ""}
                    onChange={
                      (e)=>
                        ValorantConstantes.set({
                          ...constantes,
                          [agente.agent+"Tip"]: e.target.value
                    })}
                    placeholder={`Tip for ${agente.agent}`}
                    rows={4} // ajusta esto para la altura inicial
                    style={{ width: "100%", resize: "vertical" }}
                        />
                  <button onClick={()=>saveConstantes(
                    {
                      key:agente.agent+"Tip",
                      value:constantes?.[agente.agent+"Tip"] || "",
                      url:URL_CONSTANTES_VALORANT
                    })}>
                    {`Guardar ${agente.agent} Tip`}
                  </button>
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
    {
      agent: "Yoru",
      tip:"Versátil y engañoso, Yoru es fuerte en mapas con ángulos cerrados como Split y Ascent. Su ultimate puede cambiar el rumbo de la ronda."
    },
    {
      agent: "Phoenix",
      tip:"Fuerte en mapas como Bind y Ascent, donde su capacidad de curarse y controlar el espacio lo hacen un duelista sólido."
    },
    {
      agent: "Waylay",
      tip:"Nuevo duelista con habilidades de movilidad y daño. Aún en desarrollo, pero promete ser fuerte en mapas como Sunset y Lotus."
    }
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
    {
      agent: "Harbor",
      tip:"Fuerte en Lotus y Sunset, donde su muro y habilidades de control de espacio son esenciales."
    },
    {
      agent: "Astra",
      tip:"Gran control de mapa en Haven y Ascent. Su ultimate puede cambiar el rumbo de la ronda."
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
    {
      agent: "Tejo",
      tip:"Nuevo iniciador con habilidades de control de espacio y info. Aún en desarrollo, pero promete ser fuerte en mapas como Sunset y Lotus."
    }
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
    {
      agent: "Sage",
      tip:"Clásica en Valorant. Su curación y muro son esenciales en mapas como Bind y Ascent."
    }
  ]
}

export default Contenedor;