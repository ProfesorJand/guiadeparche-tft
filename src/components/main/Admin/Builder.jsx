import React, {useCallback, useEffect, useState} from "react";
import style from "./css/Builder.module.css";
import {traitsColors, imgHex} from "../../../functions/campeonestft.js"
const Builder = ({boardInfo, setBoardInfo})=>{
    const urlHex = "/hexagonos/";
    const [traits, setTraits] = useState({})
    const [campeonesEnBoard, setCampeonesEnBoard] = useState([]);
    const addSinergia = useCallback((sinergia, contadorActual)=>{
        setTraits((oldTraits) => {return({...oldTraits,[sinergia]:contadorActual+1})});
    },[traits]);
    const addChampionBoard = useCallback(({dataCampeon,hexId})=>{
        setCampeonesEnBoard((oldArray)=>[...oldArray, {dataCampeon, hexId, campeonId:dataCampeon.nombre}])
    })
    const championsColor =["var(--color-hex-cost-default)","var(--color-hex-cost-1)","var(--color-hex-cost-2)","var(--color-hex-cost-3)","var(--color-hex-cost-4)","var(--color-hex-cost-5)"]

    useEffect(()=>{
        Object.keys(traits).forEach((sinergia)=>{
            const allTraits = document.querySelectorAll(`.${sinergia}`);
            allTraits.forEach((element)=>{
                const traitSVG = findClosestTraitImage(sinergia, traits[sinergia])
                element.src = urlHex + traitSVG;
                if(traitSVG !== "hex-default.webp"){
                    element.nextSibling.style.filter = "" 
                }
            })  
        })
				console.log({traits, campeonesEnBoard})
    },[traits, campeonesEnBoard]);

		const updateBoardInfo = useCallback(()=>{
			const containerImageChampion = document.getElementsByClassName(style.containerImageChampion);
			const data = {};
			for( let i = 0; i < containerImageChampion.length; i++){
				const dataCampeon = containerImageChampion[i].dataset;
				const imgItem = containerImageChampion[i].getElementsByClassName(style.imgItem) 
				const hexId = dataCampeon.hexId;
				data[hexId] = {dataCampeon:dataCampeon}
				let dataItems = []; 
				for(let y = 0; y < imgItem.length; y++){
					dataItems.push(imgItem[y].dataset)
				}
				data[hexId].dataItem = dataItems;
			}
			setBoardInfo({...boardInfo, ...data})

		})


    function swap(e){
        const hexSwap = e.currentTarget;
        const hexSwapId = e.currentTarget.id;
        const hexArrastradoId = e.dataTransfer.getData("hexId")
        const hexArrastrado = document.getElementById(hexArrastradoId);
        const dataCampeonArrastrado = JSON.parse(e.dataTransfer.getData("campeon"));
        const dataCampeonSwap = JSON.parse(hexSwap.children[1].dataset.campeon);
        hexArrastrado.children[1].dataset.hexId = hexSwapId;
        const hexSwapClon = hexSwap.children[1];
        hexSwapClon.dataset.hexId = hexArrastradoId;
        hexSwap.replaceChild(hexArrastrado.children[1], hexSwap.children[1] );
        hexArrastrado.appendChild(hexSwapClon);
        hexArrastrado.children[0].style.backgroundColor = championsColor[dataCampeonSwap.coste];
        hexSwap.children[0].style.backgroundColor = championsColor[dataCampeonArrastrado.coste]
				updateBoardInfo();
    }

    function move(e){
        const hexArrastrado = document.getElementById(e.dataTransfer.getData("hexId"));
        const hexDesocupado = e.currentTarget;
        const dataCampeon = JSON.parse(e.dataTransfer.getData("campeon"));
        hexDesocupado.appendChild(hexArrastrado.children[1]);
        hexDesocupado.children[0].style.backgroundColor= championsColor[dataCampeon.coste];
        hexArrastrado.children[0].style.backgroundColor = championsColor[0];
        hexDesocupado.children[1].dataset.hexId = e.currentTarget.id;
				updateBoardInfo();
    }

    function moveChampionListToBoard(e){
        /*Crear contenedor del Campeon dentro de Hex y hermano del Poligono */
        var dataCampeon = JSON.parse(e.dataTransfer.getData("campeon"));
        const containerImageChampion = document.createElement("div");
        containerImageChampion.setAttribute("draggable",true);
        containerImageChampion.dataset.campeon = JSON.stringify(dataCampeon);
        containerImageChampion.dataset.from = "Board";
        containerImageChampion.dataset.hexId = e.currentTarget.id;
        containerImageChampion.ondrop = function(e){handleDrop(e)};
        //containerImageChampion.ondragend = function(e){handleDragEnd(e)};
        containerImageChampion.ondragstart = function(e){handleDragStart(e)};
        containerImageChampion.className=style.containerImageChampion;

        /*Crear Imagen del Campeon en el hex */
        const image = document.createElement("img");
        image.className = style.imageCampeonBuilder;
        image.src= dataCampeon.img;
        image.alt= dataCampeon.nombre;

        containerImageChampion.appendChild(image)
        e.currentTarget.appendChild(containerImageChampion); 

        /* añadimos sinergias*/
        const existeCampeon = campeonesEnBoard.some(({campeonId}) => {
            return(campeonId === dataCampeon.nombre)
        })
        if(dataCampeon.sinergia.length > 0){
            const containerSinergias = document.createElement("div"); /* contenedor de todas sinergias*/
            containerSinergias.className=style.containerSinergias;

            dataCampeon.sinergia.forEach((siner)=>{
                const containerTrait = document.createElement("div"); /* contenedor de 1 sinergia con su background*/
                containerTrait.className = style.containerTrait;

                const sinergia = document.createElement("img"); /* img de la sinergia*/
                sinergia.className = style.sinergia;
                sinergia.style.filter = "invert(1)"
                sinergia.src = `/sinergias/Trait_Icon_12_${siner}.svg`;
                sinergia.alt = siner;
                
                /* background de la sinergia*/
                const backgroundSinergia = document.createElement("img"); 
                backgroundSinergia.classList.add(style.backgroundSinergia);
                backgroundSinergia.classList.add(siner);
                backgroundSinergia.src= urlHex + imgHex[0];
                backgroundSinergia.alt = imgHex[0];

                containerTrait.appendChild(backgroundSinergia);
                containerTrait.appendChild(sinergia);
                containerSinergias.appendChild(containerTrait);

                /* corrector de aumentos si ya existe el campeon en el tablero*/
                if(!existeCampeon){
                    const contadorActual = traits[siner] ? traits[siner] : 0;
                    addSinergia(siner,contadorActual);
                }
            })
            containerImageChampion.appendChild(containerSinergias)
        }
        const nombreCampeon = document.createElement("span");
        nombreCampeon.className = style.nombreCampeon;
        nombreCampeon.innerHTML=dataCampeon.nombre;
        containerImageChampion.appendChild(nombreCampeon);
        const containerItems = document.createElement("div");
        containerItems.className = style.containerItems;
        containerImageChampion.appendChild(containerItems);
        e.currentTarget.getElementsByClassName(style.poligon)[0].style.backgroundColor= championsColor[dataCampeon.coste];
        /* ver si la key campeon se cambia por dataCampeon o dataCampeon.nombre solamente*/
        const hexId = e.target.parentNode.id;
        addChampionBoard({dataCampeon, hexId})
				updateBoardInfo();
    }

    function crearItem(e){
			const dataItem = JSON.parse(e.dataTransfer.getData("item"))
			if(dataItem.sinergia){
				const contadorActual = traits[dataItem.sinergia] ? traits[dataItem.sinergia] : 0;
				addSinergia(dataItem.sinergia,contadorActual);
			}
			const containerItems = e.currentTarget.getElementsByClassName(style.containerItems)[0];
			const containerItem = document.createElement("div");
			containerItem.className = style.containerItem;
			const imgItem = document.createElement("img");
			imgItem.className = style.imgItem;
			imgItem.src = dataItem.img;
			imgItem.alt = dataItem.nombre;
			imgItem.setAttribute("draggable",true);
			imgItem.dataset.item = JSON.stringify(dataItem);
			imgItem.dataset.from = "itemBoard";
			imgItem.dataset.hexId = e.currentTarget.id;
			imgItem.ondrop = function(e){handleDrop(e)};
			imgItem.ondragstart = function(e){handleDragStart(e)};
			containerItem.appendChild(imgItem)
			containerItems.appendChild(containerItem)
			updateBoardInfo()

    }

    function swapItem(e){
        const hexArrastradoId = e.dataTransfer.getData("hexId")
        const hexArrastrado = document.getElementById(hexArrastradoId);
        const dataItem = e.dataTransfer.getData("item");
        const itemSeleccionado = hexArrastrado.querySelector(`[data-item=${JSON.stringify(dataItem)}]`);
        crearItem(e)
        itemSeleccionado.parentNode.remove()
    }


    // function handleDragEnd(e){
    //     const dataItem =e.currentTarget.getAttribute("data-item");
    //     if(dataItem){
    //         e.currentTarget.parentNode.parentNode.parentNode.ondragstart(function(e){handleDragStart(e)})
    //         e.currentTarget.parentNode.parentNode.parentNode.ondrop(function(e){handleDrop(e)})
    //     }
    // }

    function handleDragStart(e){
        e.stopPropagation();
        if(e.currentTarget?.hasAttribute("data-campeon")){
            e.dataTransfer.setData("campeon", e.currentTarget.getAttribute("data-campeon"));
        }
        if(e.currentTarget?.hasAttribute("data-item")){
            e.dataTransfer.setData("item", e.currentTarget.getAttribute("data-item"));
        }
        e.dataTransfer.setData("from", e.currentTarget.getAttribute("data-from"));
        e.dataTransfer.setData("hexId", e.currentTarget.getAttribute("data-hex-id"));
    }

    function handleDragOver(e){
        e.preventDefault()
    }

    function handleDrop(e){
        e.preventDefault();
        const hex = e.currentTarget.getElementsByClassName(style.containerImageChampion);
        const dataHexId = e.dataTransfer.getData("hexId");
        const dataFrom = e.dataTransfer.getData("from");
        const dataCampeon = e.dataTransfer.getData("campeon");
        const dataItem = e.dataTransfer.getData("item");
        if(hex.length > 0 && e.currentTarget.id !== dataHexId && dataFrom === "Board" && dataCampeon && !dataItem){
            //se intercambia con otro campeon en el board
            swap(e)
            return
        }
        
        if( e.currentTarget.id === dataHexId && dataCampeon && !dataItem){
            //se arrastra el mismo al mismo punto
            return
        }

        if(hex.length === 0 && dataFrom === "Board" && e.currentTarget.id && dataCampeon && !dataItem){
            // se desplaza a un hex vacio o desocupado
            move(e)
            return
        }

        if(hex.length === 0 && dataFrom === "championList" && e.currentTarget.id && dataCampeon && !dataItem){
            /* se arrastra a un hex vacio desde el ChampionList*/
            moveChampionListToBoard(e)
            return
        }

        if(hex.length !== 0 && (dataFrom === "itemList") && dataItem){
            crearItem(e)
        }

        if(hex.length !== 0 && dataFrom === "itemBoard" && dataItem){
            swapItem(e)
        }

    }

    function findClosestTraitImage(traitType, traitLevel) {
        if(traitsColors[traitType]){
            const traitLevels = Object.keys(traitsColors[traitType]).map(Number).sort((a, b) => a - b);
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