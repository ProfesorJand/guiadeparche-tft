import React, {useEffect, useState} from "react";
import style from "./css/Builder.module.css";
const Builder = ({info="", setInfo=""})=>{
    const urlHex = "/hexagonos/"
    const imgHex = ["hex-bronze.webp", "hex-silver.webp", "hex-gold.webp", "hex-prismatic.webp"]
    const [traits, setTraits] = useState({})
    const [campeonesEnBoard, setCampeonesEnBoard] = useState([]);
    const championsColor =["var(--color-hex-cost-default)","var(--color-hex-cost-1)","var(--color-hex-cost-2)","var(--color-hex-cost-3)","var(--color-hex-cost-4)","var(--color-hex-cost-5)"]
    const traitsColors = {
        Scholar:{
            2:imgHex[0],
            4:imgHex[1],
            6:imgHex[2]
        },
        Warrior:{
            1:imgHex[0],
            4:imgHex[3]
        }
    }

    useEffect(()=>{
       const keys =  Object.keys(traits);
       console.log({keys})
       if(keys.length !== 0){
        keys.forEach((sinergias)=>{
            console.log(sinergias)
        })
       }
    },[traits])


    function handleDrop(e){
        e.preventDefault();
        const hex = e.currentTarget.getElementsByClassName("containerImageChampion");
        var dataCampeon = JSON.parse(e.dataTransfer.getData("campeon"));
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
            if(dataCampeon.sinergia.length > 0){
                const containerSinergias = document.createElement("div"); /* contenedor de todas sinergias*/
                containerSinergias.className=style.containerSinergias;
                const lastCount = dataCampeon.sinergia.length - 1;
                let count = 0;
                dataCampeon.sinergia.forEach((siner)=>{
                    console.log({count})
                    console.log({lastCount})
                    const containerTrait = document.createElement("div"); /* contenedor de 1 sinergia con su background*/
                    containerTrait.className = style.containerTrait;

                    const sinergia = document.createElement("img"); /* img de la sinergia*/
                    sinergia.className = style.sinergia;
                    sinergia.src = `/sinergias/Trait_Icon_12_${siner}.svg`;
                    sinergia.alt = siner;
                    
                    /* contador inicial del campeon y sinergia añadida al tablero*/
                    
        
                    const backgroundSinergia = document.createElement("img"); /* background de la sinergia*/
                    backgroundSinergia.classList.add(style.backgroundSinergia);
                    backgroundSinergia.classList.add(style[siner]);
                    backgroundSinergia.src= urlHex + imgHex[0];
                    backgroundSinergia.alt = imgHex[0];

                    containerTrait.appendChild(backgroundSinergia);
                    containerTrait.appendChild(sinergia);
                    containerSinergias.appendChild(containerTrait);

                    /* corrector de suma de aumentos si ya existe el campeon en el tablero*/

                        const existeCampeon = campeonesEnBoard.some((campeon) => campeon === dataCampeon.nombre)
                        if(!existeCampeon){
                            console.log("no existe campeon");
                            const contadorActual = traits[siner] ? traits[siner] : 0;
                            setTraits({...traits,[siner]:contadorActual+1});
                            console.log(siner)

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
            setCampeonesEnBoard((oldArray)=>[...oldArray, dataCampeon.nombre])
        }else{

            const padre = hex[0].parentNode;

            padre.replaceChild(image , padre.firstChild)

        }

    }

    function handleDragOver(e){
        e.preventDefault();
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