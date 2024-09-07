import React, {useEffect, useState} from "react"
import style from "./css/EditarCompoTFT.module.css"
import Builder from "./Builder.jsx"
import Champions from "./ChampionsList.jsx"
import Items from "./Items.jsx";
import {augmentsIDList, itemsData} from "../../../json/updates/constantesLatest.js"
import Youtube from "../../youtube/Youtube.jsx";
import { toBlob } from 'html-to-image';
import { BASIC_ITEMS, CRAFTEABLE_ITEMS } from "src/stores/dataTFT.js";
import Composicion from "./Composicion.jsx";

const EditarCompoTFT = () =>{

  const [composMeta, setComposMeta] = useState({});
  useEffect(()=>{
    fetch("https://guiadeparche.com/tftdata/Set12/composMeta.json",{cache:"reload"})
    .then((response)=>response.json())
    .then((data)=>{
      setComposMeta(data)
    })
    .catch((err)=>{
      console.error(err)
    })
  },[])

    return (
    <div className={style.containerMeta}>
      {Object.keys(composMeta).length > 0 && Object.keys(composMeta).map((tier,i)=>{
        return (
          <div key={`containerMeta`+i} className={style.containerMetaTier}>
                {composMeta[tier].map((compo,index)=>{
                  return (
                    <Composicion key={index} compo={compo}/>
                  )
                })}
           </div>
          )
        })}
    </div>

    )
}

export default EditarCompoTFT