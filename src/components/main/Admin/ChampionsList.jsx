import React, { Fragment } from "react";
import style from "./css/ChampionsList.module.css"
const Champions = ()=>{
    const listaCampeones = [
        {
            nombre:"Ashe",
            img:"/campeones/set12/ashe.webp",
            coste:1,
            sinergia:["Eldritch","Multistriker"]
        },
        {
            nombre:"Ahri",
            img:"/campeones/set12/ahri.webp",
            coste:2,
            sinergia:["Arcana","Scholar"]
        },
        {
            nombre:"Bard",
            img:"/campeones/set12/bard.webp",
            coste:3,
            sinergia:["Sugarcraft","Preserver","Scholar"]
        },
        {
            nombre:"Fiora",
            img:"/campeones/set12/fiora.webp",
            coste:4,
            sinergia:["Witchcraft","Warrior"]
        },
        {
            nombre:"Briar",
            img:"/campeones/set12/briar.webp",
            coste:5,
            sinergia:["Ravenaous","Eldritch","Shapeshifter"]
        },
    ]


    function handleDragStart(e){
        const campeon = e.dataTransfer.setData("campeon", e.target.id);
    }

    function handleDragEnd(e){
        console.log("dragEnd", e.target)
    }
    return(
        <div className={style.containerChampionsList}>
            {listaCampeones.map((campeon)=>{
                return (
                    <img
                        key={campeon.nombre}
                        id={`campeon-${campeon.nombre}`}
                        src={campeon.img}
                        alt={campeon.nombre}
                        onDragEnd={(e)=>{handleDragEnd(e)}}
                        onDragStart={(e)=>{handleDragStart(e)}}
                        draggable="true"
                    />

                )
            })}

        </div>
    )
}

export default Champions