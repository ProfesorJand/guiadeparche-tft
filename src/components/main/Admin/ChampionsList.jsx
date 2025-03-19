import React, { useEffect, useState } from "react";
import style from "./css/ChampionsList.module.css";
// import {listaCampeones} from "../../../functions/campeonestft.js";
// import { fetchingDataTFT } from "src/json/updates/constantesPBE.js";
import { championsTFTIngles, traitsTFTIngles } from "src/json/updates/contantesTFT.js";

const Champions = ({version = "pbe"})=>{
    const [championsList, setChampionsList]=useState(null);
    const [sortBy, setSortBy] = useState("coste")

    function handleDragStart(e){
        e.dataTransfer.setData("campeon", e.target.getAttribute("data-campeon"));
        e.dataTransfer.setData("from", e.target.getAttribute("data-from"));
    }

    function handleFilter(filtro){
        if(championsList){
            if(filtro === "coste"){
                const cambios = [...championsList].sort((a,b)=>a[filtro] - b[filtro])
                setChampionsList(cambios);
                setSortBy("coste")
            }
            if(filtro === "nombre"){
                const cambios = [...championsList].sort((a,b)=>{
                    if(a[filtro] < b[filtro]) {return -1}
                    if(a[filtro] > b[filtro]) {return 1}
                    return 0;
                })
                setChampionsList(cambios);
                setSortBy("nombre")
            }
        }
    }
    useEffect(()=>{
        const activador = async ()=>{
            const championsList = [];
            (await championsTFTIngles({version, set:version === "pbe" ? "14":"13"})).forEach(({ability, apiName, name, cost, characterName, tileIcon, stats, traits})=>{
                if(traits.length > 0){
                    const traitsData = ()=>{
                        const resp = traits.map((trait)=>{
                            const data = traitsTFTIngles.find(({name})=>{
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
                if(apiName === "TFT13_JayceSummon" || apiName === "TFT13_Sion"){
                    const data = {
                        apiName,
                        nombre:name,
                        characterName,
                        coste:cost,
                        sinergia:traits,
                        stats,
                        img: `https://raw.communitydragon.org/${version}/game/`+ tileIcon.replace(".tex",".png").toLowerCase(),
                        ability,
                    }
                    championsList.push(data)
                }
            })
            setChampionsList(championsList.sort((a,b)=>{
                if(a["coste"] < b["coste"]) {return -1}
                if(a["coste"] > b["coste"]) {return 1}
                return 0;
            }))
            //setResultado(response)
        }
        activador();
        handleFilter("coste")
    },[version])

    return(
        <>
        <div>
            <select onChange={(e)=>{handleFilter(e.target.value)}}>
                <option value="coste">Coste</option>
                <option value="nombre">Nombre</option>
            </select>
            
        </div>
        <div className={[style.containerChampionsList, sortBy === "coste" ? style.containerChampionsListByCost:""].join(" ")}>
            {championsList && sortBy === "nombre" && championsList.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            {championsList && sortBy === "coste" && 
                <div className={style.containerChampionsByCost}>
                {championsList?.filter(({coste})=>coste===1)?.map((campeon, index)=>{
                    return (
                        <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            }
            {championsList && sortBy === "coste" &&
            <div className={style.containerChampionsByCost}>
            {championsList?.filter(({coste})=>coste===2)?.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            }
            {championsList && sortBy === "coste" &&
            <div className={style.containerChampionsByCost}>
            {championsList?.filter(({coste})=>coste===3)?.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            }
            {championsList && sortBy === "coste" &&
            <div className={style.containerChampionsByCost}>
            {championsList?.filter(({coste})=>coste===4)?.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            }
            {championsList && sortBy === "coste" && 
            <div className={style.containerChampionsByCost}>
            {championsList?.filter(({coste})=>coste===5)?.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            }
            {championsList && sortBy === "coste" &&
            <div className={style.containerChampionsByCost}>
            {championsList?.filter(({coste})=>coste===6)?.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            }
            {championsList && sortBy === "coste" &&
            <div className={style.containerChampionsByCost}>
            {championsList?.filter(({coste})=>coste===11)?.map((campeon, index)=>{
                return (
                    <div className={style.containerChampion} key={`key${index}`} style={{"borderColor":`var(--color-hex-cost-${campeon.coste})`}}>
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
            }
        </div>
        </>
    )
}

export default Champions