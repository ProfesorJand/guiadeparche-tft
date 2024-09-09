import React, {useEffect, useState, Fragment} from "react"
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
  const hierarchy = ["S","A","B","C","Meme"];
  useEffect(()=>{
    fetch("https://guiadeparche.com/tftdata/Set12/composMeta.json",{cache:"reload"})
    .then((response)=>response.json())
    .then((data)=>{
      const sortableArray =  Object.keys(data).map((tier,i)=>{
        const testing = data[tier].sort((a,b)=>{
          // console.log(hierarchy.indexOf(b.tier))
          // if(hierarchy.indexOf(a.tier) > hierarchy.indexOf(b.tier)){
          //   console.log(a.tier)
          //   console.log(b.tier)
          //   return -1
          // }
          // if(hierarchy.indexOf(a.tier) < hierarchy.indexOf(b.tier)){
          //   console.log(a.tier)
          //   console.log(b.tier)
          //   return 1
          // }
          if(a.posicion < b.posicion){
            console.log(a.posicion)
            console.log(b.posicion)
            return -1
          }
          if(a.posicion > b.posicion){
            console.log(a.posicion)
            console.log(b.posicion)
            return 1
          }
          return 0
        })
        return testing
      })

      setComposMeta(sortableArray)
    })
    .catch((err)=>{
      console.error(err)
    })
  },[])

    return (
    <div className={style.containerMeta}>
    {
      composMeta.length > 0 && composMeta.map((tier,index)=>{
        return(
          <Fragment key={index}>
          {tier.map((compo,i)=>{
            return (
              <div key={`containerMeta`+i} className={style.containerMetaTier}>
                <Composicion compo={compo}/>
              </div>
            )
          })}
          </Fragment>
        )
      })
    }
    </div>

    )
}

export default EditarCompoTFT