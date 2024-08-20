import React from "react";
import style from "./css/Champions.module.css"
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

    function dragStartCampeon(){
        console.log("hol")
    }
    return(
        <div className={style.containerChampionsList}>
            {listaCampeones.map((campeon)=>{
                return (
                    <img src={campeon.img} alt={campeon.nombre} onDragStart={()=>{dragStartCampeon}}/>
                )
            })}

        </div>
    )
}

export default Champions