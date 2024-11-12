import React, { useEffect, useState } from "react";
import style from "./css/ChampionsList.module.css";
import {listaCampeones} from "../../../functions/campeonestft.js";
import { fetchingDataTFT } from "src/json/updates/constantesPBE.js";

const Champions = ()=>{

    const [championsList, setChampionsList]=useState([...listaCampeones])
    const [resultado, setResultado] = useState(null)

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
        handleFilter("coste")
        const activador = async ()=>{
            const version="pbe"
            const response =  await fetchingDataTFT({version:"pbe", idioma:"en",pais:"us"})
            const {items, sets} = response;
            const championsList = [];
            sets["13"].champions.forEach(({ability, apiName, name, cost, characterName, tileIcon, stats, traits})=>{
                if(traits.length > 0){
                    const traitsData = ()=>{
                        const resp = traits.map((trait)=>{
                            const data = sets["13"].traits.find(({name})=>{
                                return name === trait
                            })
                            return data
                        })
                        return resp
                    }
                    const data = {
                        apiName,
                        nombre:name,
                        characterName,
                        coste:cost,
                        sinergia:traitsData(),
                        stats,
                        img: `https://raw.communitydragon.org/${version}/game/`+ tileIcon.replace(".tex",".png").toLowerCase(),
                        ability,
                    }
                    championsList.push(data)
                }
            })
            setChampionsList(championsList)
            setResultado(response)
        }
        activador();
    },[])

    return(
        <>
        <div>
            <select onChange={(e)=>{handleFilter(e.target.value)}}>
                <option value="coste">Coste</option>
                <option value="nombre">Nombre</option>
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