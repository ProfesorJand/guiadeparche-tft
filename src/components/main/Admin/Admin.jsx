import React, {useEffect, useState} from "react";
import Login from "./Login.jsx";
import CrearCompoTFT from "./CrearCompoTFT.jsx";
import { dataTFT, loadDataTFTFromAPI } from "src/stores/dataTFT.js";

const AdminPanel = ({allAdmins})=>{
    const [isLoged, setIsLoged] = useState(localStorage.getItem("login") || false)
    const [adminName, setAdminName] = useState(localStorage.getItem("user") || "")
    useEffect(()=>{
        loadDataTFTFromAPI({version:"latest", idioma:"es", pais:"ar"})
    },[])

    console.log({dataTFT})
    
    function cerrarSesion(){
        setIsLoged(false)
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
            <div slot="hola">
                <button>crear compo tft</button>
            </div>
            <div>
                <CrearCompoTFT />
            </div>
            <button onClick={()=>cerrarSesion()}>cerrar sesión</button>
            </>
        )
    }
}

export default AdminPanel;