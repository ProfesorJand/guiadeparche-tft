import React, { Fragment } from "react";
import style from "./css/ChampionsList.module.css";
import {listaCampeones} from "../../../functions/campeonestft.js";

const Champions = ()=>{

    function handleDragStart(e){
        e.dataTransfer.setData("campeon", e.target.getAttribute("data-campeon"));
        e.dataTransfer.setData("from", e.target.getAttribute("data-from"));
    }

    function handleDragEnd(e){
        console.log("dragEnd", e.target)
    }
    return(
        <div className={style.containerChampionsList}>
            {listaCampeones.map((campeon, index)=>{
                
                    return (
                        <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste}`}}>
                            <img
                                id={`campeon-${campeon.nombre}`}
                                src={campeon.img}
                                alt={campeon.nombre}
                                data-campeon={JSON.stringify(campeon)}
                                data-from={"championList"}
                                onDragEnd={(e)=>{handleDragEnd(e)}}
                                onDragStart={(e)=>{handleDragStart(e)}}
                                draggable="true"
                            />
                            <span>{campeon.nombre}</span>
                        </div>
                    )    

            })}

        </div>
    )
}

export default Champions