import React, { useEffect, useState } from "react";
import style from "./css/Builder.module.css";
import ContextMenuBuilder from "./ContextMenuBuilder.jsx";
import { traitsColors, imgHex } from "../../../functions/campeonestft.js";
const Builder = ({ boardInfo, setBoardInfo, id, showName }) => {
  const [hexId, setHexId] = useState(null);
  const urlHex = "/hexagonos/";
  const championsColor = [
    "var(--color-hex-cost-default)",
    "var(--color-hex-cost-1)",
    "var(--color-hex-cost-2)",
    "var(--color-hex-cost-3)",
    "var(--color-hex-cost-4)",
    "var(--color-hex-cost-5)",
  ];

  useEffect(()=>{
    const allNames = document.getElementsByClassName(style.nombreCampeon);
      Array.prototype.forEach.call(allNames, function(elemento) {
        // Do stuff here
        elemento.classList.toggle(style.hideNombreCampeon, showName)
    });
  },[showName])

 
  useEffect(() => {
    function llenarBoard(info) {
      info &&
        Object.keys(info).forEach((key) => {
          const hexagono = document.getElementById(key);
          hexagono.firstChild.style.backgroundColor = championsColor[JSON.parse(info[key].dataCampeon.campeon).coste];
          if (!hexagono.firstChild.nextSibling) {
            const containerImageChampion = document.createElement("div");
            containerImageChampion.setAttribute("draggable", true);
            containerImageChampion.dataset.campeon =
              info[key].dataCampeon.campeon;
            containerImageChampion.dataset.from = "Board";
            containerImageChampion.dataset.hexId = key;
            containerImageChampion.ondrop = function (e) {
              handleDrop(e);
            };
            containerImageChampion.ondragstart = function (e) {
              handleDragStart(e);
            };
            containerImageChampion.ondragend = function (e) {
              handleDropOutside(e, "campeon");
            };
            containerImageChampion.className = style.containerImageChampion;
            switch (info[key].estrellas) {
              case 4:
                containerImageChampion.classList.toggle(style.estrellas4,true);
                break;
              case 3:
                containerImageChampion.classList.toggle(style.estrellas3,true);
                break;
              case 2:
                containerImageChampion.classList.toggle(style.estrellas2,true);
                break;
              default:
                break;
            }
     
            /*Crear Imagen del Campeon en el hex */
            const image = document.createElement("img");
            image.className = style.imageCampeonBuilder;
            image.src = JSON.parse(info[key].dataCampeon.campeon).img;
            image.alt = JSON.parse(info[key].dataCampeon.campeon).nombre;

            containerImageChampion.appendChild(image);
            hexagono.appendChild(containerImageChampion);
            containerImageChampion.onclick = function () {
                crearContextMenu(containerImageChampion.dataset.hexId);
            };

            /*sinergias*/
            if (JSON.parse(info[key].dataCampeon.campeon).sinergia.length > 0) {
                const containerSinergias =
                  document.createElement("div"); /* contenedor de todas sinergias*/
                containerSinergias.className = style.containerSinergias;
          
                JSON.parse(info[key].dataCampeon.campeon).sinergia.forEach((siner) => {
                  const containerTrait =
                    document.createElement(
                      "div"
                    ); /* contenedor de 1 sinergia con su background*/
                  containerTrait.className = style.containerTrait;
          
                  const sinergia = document.createElement("img"); /* img de la sinergia*/
                  sinergia.className = style.sinergia;
                  sinergia.style.filter = "invert(1)";
                  sinergia.src = "https://raw.communitydragon.org/pbe/game/"+siner.icon.toLowerCase().replace(".tex",".png");
                  sinergia.alt = siner.name;
          
                  /* background de la sinergia*/
                  const backgroundSinergia = document.createElement("img");
                  backgroundSinergia.classList.add(style.backgroundSinergia);
                  backgroundSinergia.classList.add(siner.apiName);
                  backgroundSinergia.src = urlHex + imgHex[0];
                  backgroundSinergia.alt = imgHex[0];
          
                  containerTrait.appendChild(backgroundSinergia);
                  containerTrait.appendChild(sinergia);
                  containerSinergias.appendChild(containerTrait);
                });
                containerImageChampion.appendChild(containerSinergias);
                Object.keys(boardInfo[id]?.sinergias).forEach((sinergia) => {
                    const allTraits = document.querySelectorAll(`.${sinergia}`);
                    allTraits.forEach((element) => {
                      const traitSVG = findClosestTraitImage(sinergia, boardInfo[id]?.sinergias[sinergia]);
                      element.src = urlHex + traitSVG;
                      element.nextElementSibling.style.filter = "invert(1)";
                      if (traitSVG !== "hex-default.webp") {
                        element.style.filter = "";
                        element.nextElementSibling.style.filter = "";
                      }
                    });
                  });
              }

              /*Nombre del campeon */
              const nombreCampeon = document.createElement("span");
              nombreCampeon.classList.add(style.nombreCampeon);
              nombreCampeon.classList.toggle(style.hideNombreCampeon, showName);
              nombreCampeon.innerHTML = JSON.parse(info[key].dataCampeon.campeon).nombre;
              containerImageChampion.appendChild(nombreCampeon);

              /* Crear Items */
              const containerItems = document.createElement("div");
              containerItems.className = style.containerItems;
              info[key].dataItem.forEach((data)=>{
                const dataItem = JSON.parse(data.item);
                const containerItem = document.createElement("div");
                containerItem.className = style.containerItem;
                const imgItem = document.createElement("img");
                imgItem.className = style.imgItem;
                imgItem.src = dataItem.img;
                imgItem.alt = dataItem.nombre;
                imgItem.setAttribute("draggable", true);
                imgItem.dataset.item = JSON.stringify(dataItem);
                imgItem.dataset.from = "itemBoard";
                imgItem.dataset.hexId = key;
                imgItem.ondrop = function (e) {
                  handleDrop(e);
                };
                imgItem.ondragstart = function (e) {
                  handleDragStart(e);
                };
                imgItem.ondragend = function (e) {
                  handleDropOutside(e, "item");
                };
                containerItem.appendChild(imgItem);
                containerItems.appendChild(containerItem);
              })
              containerImageChampion.appendChild(containerItems);
              
            }
          });
      }

    llenarBoard(boardInfo[id]?.data);
  }, [boardInfo]);
  

  function updateBoardInfo(from = "null") {
    const containerBuilder = document.getElementById(id);
    const containerImageChampion = containerBuilder.getElementsByClassName(
      style.containerImageChampion
    );
    const data = {};
    const sinergias = {};
    const noRepeatChampions = [];
    for (let i = 0; i < containerImageChampion.length; i++) {
      const dataCampeon = containerImageChampion[i].dataset;
      const imgItem = containerImageChampion[i].getElementsByClassName(
        style.imgItem
      );
      var estrellas = 1;
      switch (true) {
        case containerImageChampion[i].classList.contains(style.estrellas4):
          estrellas = 4;
          break;
        case containerImageChampion[i].classList.contains(style.estrellas3):
          estrellas = 3;
          break;
        case containerImageChampion[i].classList.contains(style.estrellas2):
          estrellas = 2;
          break;
        default:
          estrellas = 1;
          break;
      }
      const hexId = dataCampeon.hexId;
      const newCampeon = JSON.parse(dataCampeon.campeon).nombre;
      if (!noRepeatChampions.some((campeon) => campeon === newCampeon)) {
        noRepeatChampions.push(newCampeon);
        const sinergiasCampeon = JSON.parse(dataCampeon.campeon).sinergia;
        sinergiasCampeon.forEach((nombreSinergia) => {
          sinergias[nombreSinergia.apiName] = (sinergias[nombreSinergia.apiName] || 0) + 1;
        });
      }
      data[hexId] = { dataCampeon: dataCampeon, estrellas };
      let dataItems = [];
      for (let y = 0; y < imgItem.length; y++) {
        dataItems.push(imgItem[y].dataset);
        const sinergiasItem = JSON.parse(imgItem[y].dataset.item).sinergia;
        if (sinergiasItem) {
          sinergias[sinergiasItem] = (sinergias[sinergiasItem] || 0) + 1;
        }
      }
      data[hexId].dataItem = dataItems;
    }
    if (Object.keys(data).length) {
      setBoardInfo({ ...boardInfo, [id]: {data,sinergias} });
      Object.keys(sinergias).forEach((sinergia) => {
        const allTraits = document.querySelectorAll(`.${sinergia.replace(" ","")}`);
        allTraits.forEach((element) => {
          const traitSVG = findClosestTraitImage(sinergia.replace(" ",""), sinergias[sinergia.replace(" ","")]);
          element.src = urlHex + traitSVG;
          element.nextElementSibling.style.filter = "invert(1)";
          if (traitSVG !== "hex-default.webp") {
            element.style.filter = "";
            element.nextElementSibling.style.filter = "";
          }
        });
      });
    }else{
      setBoardInfo(({ [id]:value, ...boardInfo})=>boardInfo)
    }
  }

  function findClosestTraitImage(traitType, traitLevel) {
    console.log({traitLevel, traitType})
    if(traitType === "BlackRose"){
      traitType = "Black Rose"
    }
    if(traitType === "FormSwapper"){
      traitType = "Form Swapper"
    }
    if(traitType === "HighRoller"){
      traitType = "High Roller"
    }
    if(traitType === "JunkerKing"){
      traitType = "Junker King"
    }
    if(traitType === "PitFighter"){
      traitType = "Pit Fighter"
    }
    if (traitsColors[traitType]) {
      const traitLevels = Object.keys(traitsColors[traitType])
        .map(Number)
        .sort((a, b) => a - b);
      for (let i = traitLevels.length - 1; i >= 0; i--) {
        if (traitLevel >= traitLevels[i]) {
          return traitsColors[traitType][traitLevels[i]];
        }
      }
      // Retornar una imagen por defecto si el traitLevel es menor que todos los disponibles
    }
    return "hex-default.webp";
  }

  function swap(e) {
    const hexSwap = e.currentTarget;
    const hexSwapId = e.currentTarget.id;
    const hexArrastradoId = e.dataTransfer.getData("hexId");
    const hexArrastrado = document.getElementById(hexArrastradoId);
    const dataCampeonArrastrado = JSON.parse(e.dataTransfer.getData("campeon"));
    const dataCampeonSwap = JSON.parse(hexSwap.children[1].dataset.campeon);
    hexArrastrado.children[1].dataset.hexId = hexSwapId;
    const hexSwapClon = hexSwap.children[1];
    hexSwapClon.dataset.hexId = hexArrastradoId;
    hexSwap.replaceChild(hexArrastrado.children[1], hexSwap.children[1]);
    hexArrastrado.appendChild(hexSwapClon);
    hexArrastrado.children[0].style.backgroundColor =
      championsColor[dataCampeonSwap.coste];
    hexSwap.children[0].style.backgroundColor =
      championsColor[dataCampeonArrastrado.coste];
    updateBoardInfo("swap");
  }

  function move(e) {
    const hexArrastrado = document.getElementById(
      e.dataTransfer.getData("hexId")
    );
    const hexDesocupado = e.currentTarget;
    const dataCampeon = JSON.parse(e.dataTransfer.getData("campeon"));
    hexDesocupado.appendChild(hexArrastrado.children[1]);
    hexDesocupado.children[0].style.backgroundColor =
      championsColor[dataCampeon.coste];
    hexArrastrado.children[0].style.backgroundColor = championsColor[0];
    hexDesocupado.children[1].dataset.hexId = e.currentTarget.id;
    updateBoardInfo("move");
  }

  function moveChampionListToBoard(e) {
    /*Crear contenedor del Campeon dentro de Hex y hermano del Poligono */
    var dataCampeon = JSON.parse(e.dataTransfer.getData("campeon"));
    const containerImageChampion = document.createElement("div");
    containerImageChampion.setAttribute("draggable", true);
    containerImageChampion.dataset.campeon = JSON.stringify(dataCampeon);
    containerImageChampion.dataset.from = "Board";
    containerImageChampion.dataset.hexId = e.currentTarget.id;
    containerImageChampion.ondrop = function (e) {
      handleDrop(e);
    };
    containerImageChampion.ondragstart = function (e) {
      handleDragStart(e);
    };
    containerImageChampion.ondragend = function (e) {
      handleDropOutside(e, "campeon");
    };
    containerImageChampion.className = style.containerImageChampion;

    /*Crear Imagen del Campeon en el hex */
    const image = document.createElement("img");
    image.className = style.imageCampeonBuilder;
    image.src = dataCampeon.img;
    image.alt = dataCampeon.nombre;

    containerImageChampion.appendChild(image);
    e.currentTarget.appendChild(containerImageChampion);
    containerImageChampion.onclick = function () {
      crearContextMenu(containerImageChampion.dataset.hexId);
    };

    if (dataCampeon.sinergia.length > 0) {
      const containerSinergias =
        document.createElement("div"); /* contenedor de todas sinergias*/
      containerSinergias.className = style.containerSinergias;

      dataCampeon.sinergia.forEach((siner) => {
        const containerTrait =
          document.createElement(
            "div"
          ); /* contenedor de 1 sinergia con su background*/
        containerTrait.className = style.containerTrait;

        const sinergia = document.createElement("img"); /* img de la sinergia*/
        sinergia.className = style.sinergia;
        sinergia.style.filter = "invert(1)";
        sinergia.src = "https://raw.communitydragon.org/pbe/game/"+siner.icon.toLowerCase().replace(".tex",".png");
        sinergia.alt = siner.name;

        /* background de la sinergia*/
        const backgroundSinergia = document.createElement("img");
        backgroundSinergia.classList.add(style.backgroundSinergia);
        backgroundSinergia.classList.add(siner.apiName);
        backgroundSinergia.src = urlHex + imgHex[0];
        backgroundSinergia.alt = imgHex[0];

        containerTrait.appendChild(backgroundSinergia);
        containerTrait.appendChild(sinergia);
        containerSinergias.appendChild(containerTrait);
      });
      containerImageChampion.appendChild(containerSinergias);
    }
    const nombreCampeon = document.createElement("span");
    nombreCampeon.classList.add(style.nombreCampeon);
    nombreCampeon.classList.toggle(style.hideNombreCampeon, showName);
    nombreCampeon.innerHTML = dataCampeon.nombre;
    containerImageChampion.appendChild(nombreCampeon);
    const containerItems = document.createElement("div");
    containerItems.className = style.containerItems;
    containerImageChampion.appendChild(containerItems);
    e.currentTarget.getElementsByClassName(
      style.poligon
    )[0].style.backgroundColor = championsColor[dataCampeon.coste];

    /*imagen de 3 estrellas */

    updateBoardInfo("moveChampion");
  }

  function crearItem(e) {
    const dataItem = JSON.parse(e.dataTransfer.getData("item"));
    const containerItems = e.currentTarget.getElementsByClassName(
      style.containerItems
    )[0];
    const containerItem = document.createElement("div");
    containerItem.className = style.containerItem;
    const imgItem = document.createElement("img");
    imgItem.className = style.imgItem;
    imgItem.src = dataItem.img;
    imgItem.alt = dataItem.nombre;
    imgItem.setAttribute("draggable", true);
    imgItem.dataset.item = JSON.stringify(dataItem);
    imgItem.dataset.from = "itemBoard";
    imgItem.dataset.hexId = e.currentTarget.id;
    imgItem.ondrop = function (e) {
      handleDrop(e);
    };
    imgItem.ondragstart = function (e) {
      handleDragStart(e);
    };
    imgItem.ondragend = function (e) {
      handleDropOutside(e, "item");
    };
    containerItem.appendChild(imgItem);
    containerItems.appendChild(containerItem);
    updateBoardInfo("crearItem");
  }

  function swapItem(e) {
    const hexArrastradoId = e.dataTransfer.getData("hexId");
    const hexArrastrado = document.getElementById(hexArrastradoId);
    const dataItem = e.dataTransfer.getData("item");
    const itemSeleccionado = hexArrastrado.querySelector(
      `[data-item=${JSON.stringify(dataItem)}]`
    );
    itemSeleccionado.parentNode.remove();
    crearItem(e);
  }

  function handleDragStart(e) {
    e.stopPropagation();
    if (e.currentTarget?.hasAttribute("data-campeon")) {
      e.dataTransfer.setData(
        "campeon",
        e.currentTarget.getAttribute("data-campeon")
      );
    }
    if (e.currentTarget?.hasAttribute("data-item")) {
      e.dataTransfer.setData("item", e.currentTarget.getAttribute("data-item"));
    }
    e.dataTransfer.setData("from", e.currentTarget.getAttribute("data-from"));
    e.dataTransfer.setData(
      "hexId",
      e.currentTarget.getAttribute("data-hex-id")
    );
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDropOutside(e, elemento) {
    e.stopPropagation();
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    if (elemento === "item") {
      const item = e.currentTarget.parentNode;
      if (!dropTarget.ondrop) {
        item.remove();
        updateBoardInfo();
      }
    }
    if (elemento === "campeon") {
      const campeon = e.currentTarget;
      const hexBackground = campeon.previousElementSibling;
      if (!dropTarget.ondrop) {
        hexBackground.style.backgroundColor = championsColor[0];
        campeon.remove();
        updateBoardInfo();
      }
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const hex = e.currentTarget.getElementsByClassName(
      style.containerImageChampion
    );
    const dataHexId = e.dataTransfer.getData("hexId");
    const dataFrom = e.dataTransfer.getData("from");
    const dataCampeon = e.dataTransfer.getData("campeon");
    const dataItem = e.dataTransfer.getData("item");
    if (
      hex.length > 0 &&
      e.currentTarget.id !== dataHexId &&
      dataFrom === "Board" &&
      dataCampeon &&
      !dataItem
    ) {
      //se intercambia con otro campeon en el board
      swap(e);
      return;
    }

    if (e.currentTarget.id === dataHexId && dataCampeon && !dataItem) {
      //se arrastra el mismo al mismo punto
      return;
    }

    if (
      hex.length === 0 &&
      dataFrom === "Board" &&
      e.currentTarget.id &&
      dataCampeon &&
      !dataItem
    ) {
      // se desplaza a un hex vacio o desocupado
      move(e);
      return;
    }

    if (
      hex.length === 0 &&
      dataFrom === "championList" &&
      e.currentTarget.id &&
      dataCampeon &&
      !dataItem
    ) {
      /* se arrastra a un hex vacio desde el ChampionList*/
      moveChampionListToBoard(e);
      return;
    }

    if (hex.length !== 0 && dataFrom === "itemList" && dataItem) {
      crearItem(e);
    }

    if (hex.length !== 0 && dataFrom === "itemBoard" && dataItem) {
      swapItem(e);
    }
  }

  function crearContextMenu(hexId) {
    setHexId(hexId);
  }

  return (
    <>
      <div id={id} className={style.containerBuilder}>
        <div className={style.hexRow}>
          <div
            id="hex11"
            className={style.containerPoligon}
            onDrop={(e) => {
              handleDrop(e);
            }}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
          >
            <div className={style.poligon}></div>
            {hexId === "hex11" && (
              <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
            )}
          </div>
          <div
            id="hex12"
            className={style.containerPoligon}
            onDrop={(e) => {
              handleDrop(e);
            }}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
          >
            <div className={style.poligon}></div>
            {hexId === "hex12" && (
              <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
            )}
          </div>
          <div
            id="hex13"
            className={style.containerPoligon}
            onDrop={(e) => {
              handleDrop(e);
            }}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
          >
            <div className={style.poligon}></div>
            {hexId === "hex13" && (
              <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
            )}
          </div>
          <div
            id="hex14"
            className={style.containerPoligon}
            onDrop={(e) => {
              handleDrop(e);
            }}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
          >
            <div className={style.poligon}></div>
            {hexId === "hex14" && (
              <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
            )}
          </div>
          <div
            id="hex15"
            className={style.containerPoligon}
            onDrop={(e) => {
              handleDrop(e);
            }}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
          >
            <div className={style.poligon}></div>
            {hexId === "hex15" && (
              <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
            )}
          </div>
          {id !== "early" && (
            <>
              <div
                id="hex16"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex16" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex17"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex17" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div className={style.halfPoligon}></div>
            </>
          )}
        </div>
        {id !== "early" && (
          <>
            <div className={style.hexRow}>
              <div className={style.halfPoligon}></div>
              <div
                id="hex21"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex21" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex22"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex22" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex23"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex23" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex24"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex24" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex25"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex25" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex26"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex26" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex27"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex27" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
            </div>
            <div className={style.hexRow}>
              <div
                id="hex31"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex31" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex32"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex32" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex33"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex33" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex34"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex34" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex35"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex35" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex36"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex36" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex37"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex37" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div className={style.halfPoligon}></div>
            </div>
            <div className={style.hexRow}>
              <div className={style.halfPoligon}></div>
              <div
                id="hex41"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex41" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex42"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex42" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex43"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex43" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex44"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex44" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex45"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex45" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex46"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex46" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
              <div
                id="hex47"
                className={style.containerPoligon}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={(e) => {
                  handleDragOver(e);
                }}
              >
                <div className={style.poligon}></div>
                {hexId === "hex47" && (
                  <ContextMenuBuilder hexId={hexId} setHexId={setHexId} updateBoardInfo={updateBoardInfo}/>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Builder;
