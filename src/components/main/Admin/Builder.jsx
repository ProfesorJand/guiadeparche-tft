import React from "react";
import style from "./css/Builder.module.css";
const Builder = ({info="", setInfo=""})=>{
    
    function handleDrop(e){
        e.preventDefault();
        const hex = e.currentTarget.getElementsByClassName("containerImageChampion");
        var dataCampeon = JSON.parse(e.dataTransfer.getData("campeon"));
        const dataFrom = e.dataTransfer.getData("from")
        console.log({hex, target: e.currentTarget})
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
            console.log("lenght = 0",{hex,dataCampeon})
            e.currentTarget.appendChild(containerImageChampion);  

            if(dataCampeon.sinergia.length > 0){
                const containerSinergias = document.createElement("div");
                containerSinergias.className=style.containerSinergias;
                dataCampeon.sinergia.forEach((siner)=>{
                    const sinergia = document.createElement("img");
                    sinergia.className = style.sinergia;
                    sinergia.src = `/sinergias/Trait_Icon_12_${siner}.svg`;
                    sinergia.alt = siner;
                    containerSinergias.appendChild(sinergia)
                })
                containerImageChampion.appendChild(containerSinergias)
            }
            console.log(dataCampeon.coste)
        }else{
            console.log("lenght > 0",{hex,dataCampeon})
            const padre = hex[0].parentNode;
            console.log({padre})
            padre.replaceChild(image , padre.firstChild)
            console.log("exito")
        }
        console.log({dataCampeon})
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