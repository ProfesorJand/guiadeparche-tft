import React, {useCallback, useEffect, useState} from "react";
import style from "./css/Builder.module.css";
const Builder = ({info="", setInfo=""})=>{
    const urlHex = "/hexagonos/"
    const imgHex = ["hex-bronze.webp", "hex-silver.webp", "hex-gold.webp", "hex-prismatic.webp"]
    const [traits, setTraits] = useState({})
    const [campeonesEnBoard, setCampeonesEnBoard] = useState([]);
    const addSinergia = useCallback((sinergia, contadorActual)=>{
        setTraits((oldTraits) => {return({...oldTraits,[sinergia]:contadorActual+1})});
    },[traits]);
    const addChampionBoard = useCallback(({dataCampeon,hexId})=>{
        setCampeonesEnBoard((oldArray)=>[...oldArray, {dataCampeon, hexId, campeonId:dataCampeon.nombre}])
    })
    const championsColor =["var(--color-hex-cost-default)","var(--color-hex-cost-1)","var(--color-hex-cost-2)","var(--color-hex-cost-3)","var(--color-hex-cost-4)","var(--color-hex-cost-5)"]
    const traitsColors = {
        Arcana:{
            2:imgHex[0],
            3:imgHex[1],
            4:imgHex[2]
        },
        Ascendant:{
            1:imgHex[3],
        },
        Bastion:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2],
            8:imgHex[3]
        },
        BatQueen:{
            1:imgHex[3],
        },
        Best_Friends:{
            1:imgHex[3],
        },
        Blaster:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2]
        },
        Chrono:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2]
        },
        Dragon:{
            2:imgHex[0],
            3:imgHex[2],
        },
        Druid:{
            1:imgHex[3],
        },
        Eldritch:{
            3:imgHex[0],
            5:imgHex[1],
            7:imgHex[2],
            10:imgHex[3]
        },
        Fearie:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2],
            9:imgHex[3]
        },
        Frost:{
            3:imgHex[0],
            5:imgHex[1],
            7:imgHex[2],
            9:imgHex[3]
        },
        Honeymancy:{
            3:imgHex[0],
            5:imgHex[2],
            7:imgHex[3]
        },
        Hunter:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2]
        },
        Incantor:{
            2:imgHex[0],
            4:imgHex[2],
        },
        Mage:{
            3:imgHex[0],
            5:imgHex[1],
            7:imgHex[2],
            9:imgHex[3]
        },
        Multistriker:{
            3:imgHex[0],
            5:imgHex[1],
            7:imgHex[2],
            9:imgHex[3]
        },
        Preserver:{
            2:imgHex[0],
            3:imgHex[1],
            4:imgHex[2],
            5:imgHex[3]
        },
        Portal:{
            3:imgHex[0],
            6:imgHex[1],
            8:imgHex[2],
            10:imgHex[3]
        },
        Pyro:{
            2:imgHex[0],
            3:imgHex[1],
            4:imgHex[2],
            5:imgHex[3]
        },
        Ravenous:{
            1:imgHex[3],
        },
        Scholar:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2]
        },
        Shapeshifter:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2],
            8:imgHex[3]
        },
        Sugarcraft:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2]
        },
        Vanguard:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2],
        },
        Warrior:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2]
        },
        Witchcraft:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2],
            8:imgHex[3]
        },
    }

    useEffect(()=>{
        console.log({traits, campeonesEnBoard})
        Object.keys(traits).forEach((sinergia)=>{
            const allTraits = document.querySelectorAll(`.${sinergia}`);
            allTraits.forEach((element)=>{
                console.log({sinergia, traitsSinergias : traits[sinergia]})
                console.log(element)
                console.log(urlHex + findClosestTraitImage(sinergia, traits[sinergia]))
                element.src = urlHex + findClosestTraitImage(sinergia, traits[sinergia]);
            })  
        })
    },[traits, campeonesEnBoard])


    function handleDrop(e){
        e.preventDefault();
        const hex = e.currentTarget.getElementsByClassName("containerImageChampion");
        var dataCampeon = JSON.parse(e.dataTransfer.getData("campeon"));
        console.log({dataCampeon})
        const dataFrom = e.dataTransfer.getData("from")
        const containerImageChampion = document.createElement("div");
        containerImageChampion.setAttribute("draggable",true);
        containerImageChampion.setAttribute("data-campeon",JSON.stringify(dataCampeon))
        containerImageChampion.setAttribute("data-from","board");
        containerImageChampion.className=style.containerImageChampion;
        const image = document.createElement("img");
        image.className = style.imageCampeonBuilder;
        image.src= dataCampeon.img;
        image.alt= dataCampeon.nombre;
        
        containerImageChampion.appendChild(image)
        
        if(!hex.length && dataFrom === "championList"){
            e.currentTarget.appendChild(containerImageChampion);  
            /* añadimos sinergias*/
            const existeCampeon = campeonesEnBoard.some(({campeonId}) => {
                console.log({campeonId, dataCampeonNombre: dataCampeon.nombre})
                return(campeonId === dataCampeon.nombre)
            })
            console.log("Prueba",existeCampeon)
            if(dataCampeon.sinergia.length > 0){
                const containerSinergias = document.createElement("div"); /* contenedor de todas sinergias*/
                containerSinergias.className=style.containerSinergias;
                const lastCount = dataCampeon.sinergia.length - 1;
                let count = 0;
                dataCampeon.sinergia.forEach((siner)=>{
                    const containerTrait = document.createElement("div"); /* contenedor de 1 sinergia con su background*/
                    containerTrait.className = style.containerTrait;

                    const sinergia = document.createElement("img"); /* img de la sinergia*/
                    sinergia.className = style.sinergia;
                    sinergia.src = `/sinergias/Trait_Icon_12_${siner}.svg`;
                    sinergia.alt = siner;
                    
                    /* contador inicial del campeon y sinergia añadida al tablero*/
                    
        
                    const backgroundSinergia = document.createElement("img"); /* background de la sinergia*/
                    backgroundSinergia.classList.add(style.backgroundSinergia);
                    backgroundSinergia.classList.add(siner);
                    backgroundSinergia.src= urlHex + imgHex[0];
                    backgroundSinergia.alt = imgHex[0];

                    containerTrait.appendChild(backgroundSinergia);
                    containerTrait.appendChild(sinergia);
                    containerSinergias.appendChild(containerTrait);

                    /* corrector de suma de aumentos si ya existe el campeon en el tablero*/

                        
                        if(!existeCampeon){
                            console.log("no existe campeon");
                            const contadorActual = traits[siner] ? traits[siner] : 0;
                            addSinergia(siner,contadorActual);
 

                    }else{
                        console.log({traits})
                    }
                    count = count +1;
                })
                containerImageChampion.appendChild(containerSinergias)
            }
            const nombreCampeon = document.createElement("span");
            nombreCampeon.className = style.nombreCampeon;
            nombreCampeon.innerHTML=dataCampeon.nombre;
            containerImageChampion.appendChild(nombreCampeon);
            e.currentTarget.getElementsByClassName(style.poligon)[0].style.backgroundColor= championsColor[dataCampeon.coste];
            /* ver si la key campeon se cambia por dataCampeon o dataCampeon.nombre solamente*/
            const hexId = e.target.parentNode.id;
            addChampionBoard({dataCampeon, hexId})
            
        }else{

            const padre = hex[0].parentNode;

            padre.replaceChild(image , padre.firstChild)

        }

    }

    function handleDragOver(e){
        e.preventDefault();
    }

    function findClosestTraitImage(traitType, traitLevel) {
        console.log({traitsColors, traitType, traitLevel});
        console.log(traitsColors[traitType])
        if(traitsColors[traitType]){
            const traitLevels = Object.keys(traitsColors[traitType]).map(Number).sort((a, b) => a - b);
            console.log("entre")
            for (let i = traitLevels.length - 1; i >= 0; i--) {
                if (traitLevel >= traitLevels[i]) {
                    return traitsColors[traitType][traitLevels[i]];
                }
            }
        
            // Retornar una imagen por defecto si el traitLevel es menor que todos los disponibles
        }
        return "hex-default.webp";
    }

    return (
        <>
        <div className={style.containerBuilder}>
            <div className={style.hexRow}>
                    
                    <div id="hex11" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex12" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex13" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex14" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex15" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex16" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex17" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div className={style.halfPoligon}>
                    </div>
            </div>
            <div className={style.hexRow}>
                    <div className={style.halfPoligon}>
                    </div>
                    <div id="hex21" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex22" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex23" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex24" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex25" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex26"className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex27"className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
            </div>
            <div className={style.hexRow}>
                    <div id="hex31"className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex32"className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex33" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex34"className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex35"className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex36" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex37" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div className={style.halfPoligon}></div>
            </div>
            <div className={style.hexRow}>
                    <div className={style.halfPoligon}></div>
                    <div id="hex41" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex42" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex43" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex44" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex45" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex46" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>
                    <div id="hex47" className={style.containerPoligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                        <div className={style.poligon}></div>
                    </div>    
            </div>
            
        </div>
    </>
    )
}

export default Builder