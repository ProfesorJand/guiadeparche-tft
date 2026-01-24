import React, {useEffect, useState, } from "react";
import Login from "./Login.jsx";
import CrearCompoTFT from "./CrearCompoTFT.jsx";
import { loadDataTFTFromAPI } from "src/stores/dataTFT.js";
import EditarCompoTFT from "./EditarCompoTFT.jsx";
import CreateItemsTierList from "./CreateItemsTierList.jsx";
import FormularioMetaLOL from "@components/leagueOfLegends/FormularioMetaLOL.jsx";
//import CrearTierListChampItem from "./crearTierListChampItem.jsx"
import CreateAugmentsTierList from "./CreateAugmentsTierList.jsx";
import style from "./css/Admin.module.css";
import StreamersManager from "@components/embed/StreamersManager.jsx";
import InfografiaTFT from "@components/Infografias/TopTFT/InfografiaTFT.jsx";
import FormularioTierListValorant from "@components/valorant/FormularioTierListValorant.jsx";
import FormularioMetaWildrift from "@components/wildrift/FormularioMetaWildrift.jsx";
import InfografiaTFTComps from "@components/TFT/InfografiaTFTComps.jsx";
import InfografiaTop5 from '@components/Infografias/Top5/InfografiaTop5.jsx';
import Formulario2XKO from "@components/2xko/Formulario2XKO.jsx";
import DeckBuilder from "@components/riftbound/DeckBuilder.jsx"
// import Formulario2XKO from "@components/2xko/Formulario2XKO.jsx";
const AdminPanel = ({allAdmins})=>{
    const [isLoged, setIsLoged] = useState(localStorage.getItem("login") || false)
    const [adminName, setAdminName] = useState(localStorage.getItem("user") || "");
    const pestanas = [
      {
        primario:"TFT",
        secundario:["Crear","Editar","Infografia Comps", "Tier List Items", "Tier List Augments"],
      },{
        primario:"LOL",
        secundario:["Meta"],
      },{
        primario:"VALORANT",
        secundario:["Meta"],
      },{
        primario:"Wild Rift",
        secundario:["Meta"]
      },{
        primario:"2XKO",
        secundario:["Meta"]
      },{
        primario:"Infografia Zero",
        secundario:["Crear"]
      },{
        primario:"Streamer",
        secundario:["Editar"]
      },{
        primario:"Riftbound",
        secundario:["Redes Deck"]
      }
    ]
    const [pestana, setPestana] = useState(pestanas[1].primario);
    const [action, setAction] = useState(pestanas[1].primario);

    function cerrarSesion(){
        setIsLoged(false)
        localStorage.removeItem("user");
        localStorage.removeItem("login");
        localStorage.removeItem("superAdmin");
    }

    if(!isLoged || !adminName){
        return (
            <>
            <Login allAdmins={allAdmins} setIsLoged={setIsLoged} setAdminName={setAdminName}/>
            </>
        )
    }else if(isLoged && adminName){
        return (
            <>
            <div>{adminName}</div>
            <div className={style.navegador}>
                {
                  pestanas.map(({primario,secundario},index)=>{
                    return (
                      <div className={style.container}>
                        <input 
                          type="button"
                          value={primario}
                          onClick={()=>{
                            if(primario !== "Infografia Zero" && primario !== "Riftbound"){
                              setPestana(primario)
                            }
                            else if(primario === "Infografia Zero"){
                              window.location.href = "/crearInfografia"
                            }
                             else if(primario === "Riftbound"){
                              window.location.href = "/riftbound/create-deck"
                            }
                          }}
                          className={pestana.includes(primario) ? style.btnActive: ""}
                          ></input>
                        
                      </div>
                    )
                  })
                }     
            </div>

            { pestanas.map(({primario,secundario},index)=>{
              if(pestana?.includes(primario))
              return (
                <div className={style.containerPestanaSecundario}>
                  {
                    secundario.map((value,j)=>{
                      return (
                        <div className={style.compos}>
                            <button 
                              className={pestana === primario.concat(value) ? style.btnActive: ""} 
                              onClick={()=>{
                                setAction(`${primario}-${value}`);
                                setPestana(primario.concat(value))
                              }}
                            >
                              {value}
                            </button>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })}
            
            <div>
                {action === "TFT-Crear" && <CrearCompoTFT />}
                {action === "TFT-Editar" && <EditarCompoTFT />}
                {action === "TFT-Infografia Comps" && <InfografiaTFT/>}
                {/* {action === "InfografiaTFTCompo" && <InfografiaTFTComps/>} */}
                {action === "TFT-Tier List Items" && <CreateItemsTierList />}
                {action === "TFT-Tier List Augments" && <CreateAugmentsTierList admin={true}/>}
                {action.includes(pestanas[1].primario) && <FormularioMetaLOL />}
                {action.includes(pestanas[2].primario) && <FormularioTierListValorant />}
                {action.includes(pestanas[3].primario) && <FormularioMetaWildrift/>}
                {action.includes(pestanas[4].primario) && <Formulario2XKO/>}
                {action.includes(pestanas[5].primario) && <InfografiaTop5/>}
                {action.includes(pestanas[6].primario) && <StreamersManager/>}
                {action.includes(pestanas[7].primario) && <DeckBuilder/>}
                {/* {action === "champsItemsTierList" && <CrearTierListChampItem />} */}
            </div>
            <button onClick={()=>cerrarSesion()}>cerrar sesión</button>
            </>
        )
    }
}

export default AdminPanel;