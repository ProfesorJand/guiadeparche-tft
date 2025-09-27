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
// import Formulario2XKO from "@components/2xko/Formulario2XKO.jsx";
const AdminPanel = ({allAdmins})=>{
    const [isLoged, setIsLoged] = useState(localStorage.getItem("login") || false)
    const [adminName, setAdminName] = useState(localStorage.getItem("user") || "");
    const [action, setAction] = useState("editar");
    const [pestana, setPestana] = useState(1)

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
                <div className={style.container}>
                    Compos TFT
                    <div className={style.compos}>
                        <div slot="hola">
                            <button className={pestana === 0 ? style.btnActive: ""} onClick={()=>{setAction("crear"); setPestana(0)}}>Crear</button>
                        </div>
                        <div slot="hola">
                            <button className={pestana === 1 ? style.btnActive: ""} onClick={()=>{setAction("editar"); setPestana(1)}}>Editar</button>
                        </div>
                        <div slot="hola">
                            <button className={pestana === 2 ? style.btnActive: ""} onClick={()=>{setAction("Infografia"); setPestana(2)}}>Infografia</button>
                        </div>
                        <div slot="hola">
                            <button className={pestana === 2 ? style.btnActive: ""} onClick={()=>{setAction("InfografiaTFTCompo"); setPestana(2)}}>Info... TFT Compo</button>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    Tier List TFT
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 3 ? style.btnActive: ""}onClick={()=>{setAction("itemsTierList"); setPestana(3)}}>Items</button>
                        </div>
                        <div slot="hola">
                            <button className={pestana === 4 ? style.btnActive: ""} onClick={()=>{setAction("augmentsTierList"); setPestana(4)}}>Augments</button>
                        </div>
                        {/* <div slot="hola">
                            <button className={pestana === 0 ? style.btnActive: ""} onClick={()=>{setAction("champsItemsTierList"); setPestana(0)}}>Champions Items Tier List</button>
                        </div> */}
                    </div>
                </div>
                {adminName !== "relic" && 
                <div className={style.container}>
                    Streamers
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 5 ? style.btnActive: ""}onClick={()=>{setAction("twitch/kick"); setPestana(5)}}>Twitch / Kick</button>
                        </div>
                    </div>
                </div>
                }
                <div className={style.container}>
                    League of Legends
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 6 ? style.btnActive: ""} onClick={()=>{setAction("lol"); setPestana(6)}}>Meta</button>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    Valorant
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 7 ? style.btnActive: ""} onClick={()=>{setAction("val"); setPestana(7)}}>Meta</button>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    Wildrift
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 8 ? style.btnActive: ""} onClick={()=>{setAction("wildrift"); setPestana(8)}}>Meta</button>
                        </div>
                    </div>
                </div>
                {/* <div className={style.container}>
                    2XKO
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 9 ? style.btnActive: ""} onClick={()=>{setAction("2xko"); setPestana(9)}}>Infografia</button>
                        </div>
                    </div>
                </div> */}
                <div className={style.container}>
                    Infografia
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 10 ? style.btnActive: ""} onClick={()=>{window.location.href = "/crearInfografia"}}>Crear</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {action === "crear" && <CrearCompoTFT />}
                {action === "editar" && <EditarCompoTFT />}
                {action === "Infografia" && <InfografiaTFT/>}
                {/* {action === "InfografiaTFTCompo" && <InfografiaTFTComps/>} */}
                {action === "itemsTierList" && <CreateItemsTierList />}
                {action === "augmentsTierList" && <CreateAugmentsTierList admin={true}/>}
                {action === "twitch/kick" && <StreamersManager/>}
                {action === "lol" && <FormularioMetaLOL />}
                {action === "val" && <FormularioTierListValorant />}
                {action === "wildrift" && <FormularioMetaWildrift/>}
                {/* {action === "2xko" && <Formulario2XKO/>} */}
                {/* {action === "champsItemsTierList" && <CrearTierListChampItem />} */}
            </div>
            <button onClick={()=>cerrarSesion()}>cerrar sesión</button>
            </>
        )
    }
}

export default AdminPanel;