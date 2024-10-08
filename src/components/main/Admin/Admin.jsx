import React, {useEffect, useState} from "react";
import Login from "./Login.jsx";
import CrearCompoTFT from "./CrearCompoTFT.jsx";
import { loadDataTFTFromAPI } from "src/stores/dataTFT.js";
import EditarCompoTFT from "./EditarCompoTFT.jsx";
import ItemsTierList from "./CreateItemsTierList.jsx";

const AdminPanel = ({allAdmins})=>{
    const [isLoged, setIsLoged] = useState(localStorage.getItem("login") || false)
    const [adminName, setAdminName] = useState(localStorage.getItem("user") || "");
    const [action, setAction] = useState("editar");
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
            <div slot="hola">
                <button onClick={()=>setAction("crear")}>Crear compo tft</button>
            </div>
            <div slot="hola">
                <button onClick={()=>setAction("editar")}>Editar compo tft</button>
            </div>
            <div slot="hola">
                <button onClick={()=>setAction("itemsTierList")}>Items Tier List</button>
            </div>
            <div>
                {action === "crear" && <CrearCompoTFT />}
                {action === "editar" && <EditarCompoTFT />}
                {action === "itemsTierList" && <ItemsTierList />}
            </div>
            <button onClick={()=>cerrarSesion()}>cerrar sesión</button>
            </>
        )
    }
}

export default AdminPanel;