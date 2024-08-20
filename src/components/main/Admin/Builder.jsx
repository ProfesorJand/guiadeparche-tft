import React from "react";
import style from "./css/Builder.module.css";
const Builder = ({info="", setInfo=""})=>{
    
    function handleDrop(e){
        e.preventDefault();
        const hex = e.currentTarget.getElementsByTagName("img");
        var data = e.dataTransfer.getData("campeon");
        if(!hex.length){
            e.target.appendChild(document.getElementById(data).cloneNode(true));  
        }else{
            const padre = hex[0].parentNode;
            console.log({padre})
            padre.replaceChild(document.getElementById(data).cloneNode(true) , padre.firstChild)
            console.log("exito")
        }
        console.log({data})
    }

    function handleDragOver(e){
        e.preventDefault();
    }

    return (
        <>
        <div className={style.containerBuilder}>
            <div className={style.hexRow}>
                    
                    <div id="hex11" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex12" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex13" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex14" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex15" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex16" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex17" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div className={style.halfPoligon}>
                    </div>
            </div>
            <div className={style.hexRow}>
                    <div className={style.halfPoligon}>
                    </div>
                    <div id="hex21" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex22" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex23" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex24" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex25" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex26"className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex27"className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
            </div>
            <div className={style.hexRow}>
                    <div id="hex31"className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex32"className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex33" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex34"className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex35"className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex36" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex37" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div className={style.halfPoligon}></div>
            </div>
            <div className={style.hexRow}>
                    <div className={style.halfPoligon}></div>
                    <div id="hex41" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex42" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex43" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex44" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex45" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex46" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>
                    <div id="hex47" className={style.poligon} onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}>
                    </div>    
            </div>
            
        </div>
    </>
    )
}

export default Builder