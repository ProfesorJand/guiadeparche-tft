import React, { useEffect } from "react";
import style from "./css/ContextMenuBuilder.module.css";
import styleBuilder from "./css/Builder.module.css"
const ContextMenuBuilder = ({hexId, setHexId, updateBoardInfo })=>{
  const OPTIONS = ["★ 4 stars","★ 3 stars","★ 2 stars","Power Up","X Remove"];

  function handleMenu(opcion){
    const hexagono = document.getElementById(hexId);
    const campeon = hexagono.getElementsByClassName(styleBuilder.containerImageChampion)[0];
    switch (opcion) {
      case OPTIONS[0]:
        campeon.classList.toggle(styleBuilder.estrellas4, true)
        campeon.classList.toggle(styleBuilder.estrellas3, false)
        campeon.classList.toggle(styleBuilder.estrellas2, false)
        updateBoardInfo()
        break;
      case OPTIONS[1]:
        campeon.classList.toggle(styleBuilder.estrellas4, false)
        campeon.classList.toggle(styleBuilder.estrellas3, true)
        campeon.classList.toggle(styleBuilder.estrellas2, false)
        updateBoardInfo()
        break;
      case OPTIONS[2]:
        campeon.classList.toggle(styleBuilder.estrellas4, false)
        campeon.classList.toggle(styleBuilder.estrellas3, false)
        campeon.classList.toggle(styleBuilder.estrellas2, true)
        updateBoardInfo()
        break;
      case OPTIONS[3]:
        campeon.classList.toggle(styleBuilder.powerUp, true)
        updateBoardInfo()
        break;
      default:
        campeon.classList.toggle(styleBuilder.estrellas4, false)
        campeon.classList.toggle(styleBuilder.estrellas3, false)
        campeon.classList.toggle(styleBuilder.estrellas2, false)
        campeon.classList.toggle(styleBuilder.powerUp, false)
        updateBoardInfo()
        break;
    }
    
    setHexId(null);
  }
  return(
    <div className={style.contextMenuBuilder}>
      <ul>
        {OPTIONS.map((opcion,i)=>{
          return <li key={i} className={style.optionsMenu} onClick={(e)=>{ e.preventDefault(); handleMenu(opcion); return false}}>{opcion}</li>
        })}
      </ul>
    </div>
  ) 
}

export default ContextMenuBuilder;