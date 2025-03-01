import React, {useEffect, useState} from "react";
import Login from "./Login.jsx";
import CrearCompoTFT from "./CrearCompoTFT.jsx";
import { loadDataTFTFromAPI } from "src/stores/dataTFT.js";
import EditarCompoTFT from "./EditarCompoTFT.jsx";
import CreateItemsTierList from "./CreateItemsTierList.jsx";
//import CrearTierListChampItem from "./crearTierListChampItem.jsx"
import CreateAugmentsTierList from "./CreateAugmentsTierList.jsx";
import style from "./css/Admin.module.css";
import TwitchStreamersManager from "@components/embed/TwitchStreamersManager.jsx";

const AdminPanel = ({allAdmins})=>{
    const [isLoged, setIsLoged] = useState(localStorage.getItem("login") || false)
    const [adminName, setAdminName] = useState(localStorage.getItem("user") || "");
    const [action, setAction] = useState("editar");
    const [pestana, setPestana] = useState(1)
    useEffect(()=>{
       loadDataTFTFromAPI({version:"latest", idioma:"es", pais:"ar"})
    },[])

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
                    </div>
                </div>
                <div className={style.container}>
                    Tier List TFT
                    <div className={style.tierList}>
                        <div slot="hola">
                            <button className={pestana === 2 ? style.btnActive: ""}onClick={()=>{setAction("itemsTierList"); setPestana(2)}}>Items</button>
                        </div>
                        <div slot="hola">
                            <button className={pestana === 3 ? style.btnActive: ""} onClick={()=>{setAction("augmentsTierList"); setPestana(3)}}>Augments</button>
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
                            <button className={pestana === 4 ? style.btnActive: ""}onClick={()=>{setAction("twitch"); setPestana(4)}}>Twitch</button>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div>
                {action === "crear" && <CrearCompoTFT />}
                {action === "editar" && <EditarCompoTFT />}
                {action === "itemsTierList" && <CreateItemsTierList />}
                {action === "augmentsTierList" && <CreateAugmentsTierList admin={true}/>}
                {action === "twitch" && <TwitchStreamersManager/>}
                {/* {action === "champsItemsTierList" && <CrearTierListChampItem />} */}
            </div>
            <button onClick={()=>cerrarSesion()}>cerrar sesión</button>
            </>
        )
    }
}

export default AdminPanel;