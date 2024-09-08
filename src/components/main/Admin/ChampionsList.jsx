import React, { useEffect, useState } from "react";
import style from "./css/ChampionsList.module.css";
import {listaCampeones} from "../../../functions/campeonestft.js";

const Champions = ()=>{

    const [championsList, setChampionsList]=useState([...listaCampeones])

    function handleDragStart(e){
        e.dataTransfer.setData("campeon", e.target.getAttribute("data-campeon"));
        e.dataTransfer.setData("from", e.target.getAttribute("data-from"));
    }

    function handleFilter(filtro){
        if(filtro === "coste"){
            const cambios = [...championsList].sort((a,b)=>a[filtro] - b[filtro])
            setChampionsList(cambios);
        }
        if(filtro === "nombre"){
            const cambios = [...championsList].sort((a,b)=>{
                if(a[filtro] < b[filtro]) {return -1}
                if(a[filtro] > b[filtro]) {return 1}
                return 0;
            })
            setChampionsList(cambios);
        }
    }

    useEffect(()=>{
        console.log(championsList)
    },[championsList])

    return(
        <>
        <div>
            <select onChange={(e)=>{handleFilter(e.target.value)}}>
                <option value="nombre">Nombre</option>
                <option value="coste">Coste</option>
            </select>
            
        </div>
        <div className={style.containerChampionsList}>
            {championsList.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste}`}}>
                            <img
                                id={`campeon-${campeon.nombre}`}
                                src={campeon.img}
                                alt={campeon.nombre}
                                data-campeon={JSON.stringify(campeon)}
                                data-from={"championList"}
                                onDragStart={(e)=>{handleDragStart(e)}}
                                draggable="true"
                                />
                            <span>{campeon.nombre}</span>
                        </div>
                    )    
                })}
        </div>
        </>
    )
}

export default Champions