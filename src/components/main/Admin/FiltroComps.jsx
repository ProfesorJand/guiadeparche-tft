import React, { useEffect } from "react";
import {useStore} from "@nanostores/react"
import {handlerfilterMetaComp, initialStateMetaCompFilter} from "src/stores/menuFiltradoAdmin.js"

const FiltroComps = ()=>{
  const estadosFiltros = useStore(initialStateMetaCompFilter)

  return (
    <>
      <div>
        <span>{"Fast 8 (4/5 cost carry)"}</span>
        <input type="checkbox" id="fast8" onClick={()=>{handlerfilterMetaComp("fast8")}} defaultChecked={estadosFiltros.fast8}></input>
      </div>
      <div>
        <span>{"Reroll (3 star)"}</span>
        <input type="checkbox" id="reroll" onClick={()=>{handlerfilterMetaComp("reroll")}} defaultChecked={estadosFiltros.reroll}></input>
      </div>
      <div>
        <span>{"Specific Augment (Hero, Built Diff)"}</span>
        <input type="checkbox" id="specificAugment" onClick={()=>{handlerfilterMetaComp("specificAugment")}}defaultChecked={estadosFiltros.reroll} ></input>
      </div>
      {/* <div>
        <span>{"Fast 8 (4/5 cost carry)"}</span>
        <input type="check"></input>
      </div>
      <div>
        <span>{"Fast 8 (4/5 cost carry)"}</span>
        <input type="check"></input>
      </div> */}
    </>
  )
}

export default FiltroComps;