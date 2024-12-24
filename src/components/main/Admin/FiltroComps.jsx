import React, { useEffect, useState } from "react";
import {useStore} from "@nanostores/react"
import {handlerfilterMetaComp, initialStateMetaCompFilter, filterByCategory} from "src/stores/menuFiltradoAdmin.js"
import style from "./css/FiltroComps.module.css"
const FiltroComps = ()=>{
  const estadosFiltros = useStore(initialStateMetaCompFilter)
  const [openDificulty, setOpenDificulty] = useState(true) // true para que este abierto - false para que este cerrado
  const [openTier, setOpenTier] = useState(true) // true para que este abierto - false para que este cerrado

  return (
    <div className={style.containerAside}>
      <div className={style.containerAsideFilter} onClick={()=>{handlerfilterMetaComp("Fast 8"); filterByCategory()}}>
        <span>{"Fast 8 (4/5 cost carry)"}</span>
        <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="fast8" checked={estadosFiltros["Fast 8"]}></input>
      </div>
      <div className={style.containerAsideFilter} onClick={()=>{handlerfilterMetaComp("3 Stars");filterByCategory()}}>
        <span>{"Reroll (3 star)"}</span>
        <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="reroll" checked={estadosFiltros["3 Stars"]}></input>
      </div>
      <div className={style.containerAsideFilter} onClick={()=>{handlerfilterMetaComp("Specifics Augments");filterByCategory()}}>
        <span>{"Specific Augment (Hero, Built Diff)"}</span>
        <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="specificAugment" checked={estadosFiltros["Specifics Augments"]} ></input>
      </div>
      <div className={style.containerAsideFilter} onClick={(e)=>{setOpenDificulty(!openDificulty)}}>
        <span>{"Select Dificulty"}</span>
        <div className={style.checkboxToggle} id="dificultyToggle" >{openDificulty ? "+" : "-"}</div>
      </div>
      {openDificulty &&
      <div className={style.containerOpens}>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Easy");filterByCategory()}}>
          <span>Easy</span>
          <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="dificultyEasy" checked={estadosFiltros["Easy"]} ></input>
        </div>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Medium");filterByCategory()}}>
          <span>Medium</span>
          <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="dificultyMedium" checked={estadosFiltros["Medium"]} ></input>
        </div>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Hard");filterByCategory()}}>
          <span>Hard</span>
          <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="dificultyHard" checked={estadosFiltros["Hard"]} ></input>
        </div>
        
      </div>
      }
      <div className={style.containerAsideFilter} onClick={(e)=>{setOpenTier(!openTier)}}>
        <span>{"Select Tier"}</span>
        <div className={style.checkboxToggle} id="tierToggle" >{openTier ? "+" : "-"}</div>
      </div>
      {openTier && 
      <div className={style.containerOpens}>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Tier S");filterByCategory()}}>
          <span>Tier S</span>
          <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="tierS" checked={estadosFiltros["Tier S"]} ></input>
        </div>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Tier A");filterByCategory()}}>
          <span>Tier A</span>
          <input className={style.btnCheckbox} readOnly={true}type="checkbox" id="tierA" checked={estadosFiltros["Tier A"]} ></input>
        </div>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Tier B");filterByCategory()}}>
          <span>Tier B</span>
          <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="tierB" checked={estadosFiltros["Tier B"]} ></input>
        </div>  
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Tier C");filterByCategory()}}>
          <span>Tier C</span>
          <input className={style.btnCheckbox} readOnly={true}type="checkbox" id="tierC" checked={estadosFiltros["Tier C"]} ></input>
        </div>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Tier D");filterByCategory()}}>
          <span>Tier D</span>
          <input className={style.btnCheckbox} readOnly={true}type="checkbox" id="tierD" checked={estadosFiltros["Tier D"]} ></input>
        </div>
        <div className={style.containerOptionBox} onClick={()=>{handlerfilterMetaComp("Tier MEME");filterByCategory()}}>
          <span>Tier Meme</span>
          <input className={style.btnCheckbox} readOnly={true} type="checkbox" id="tierMeme" checked={estadosFiltros["Tier MEME"]} ></input>
        </div>
      </div>
      }
    </div>
  )
}

export default FiltroComps;