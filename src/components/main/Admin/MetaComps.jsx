import React, {useEffect, useState} from "react";
import { useStore } from "@nanostores/react";
import Composicion from "./Composicion.jsx";
import style from "./css/EditarCompoTFT.module.css"
import {MetaComps as compos, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js"
import FantasmaComposiciones from "./FantasmaComposiciones.jsx";
const MetaComps = ({showHide})=>{
  const composMeta = useStore(compos);
  const [allFast8, setAllFast8] = useState([]);
  const [all3Stars, setAll3Stars] = useState([]);
  const [allAugmentsHero, setAllAugmentsHero] = useState([]);
  const admin = localStorage.getItem("superAdmin") || false;
  const title = {
    fast8:"Standard Comps - Fast 8/9",
    stars3:"Reroll Comps - 3 Star",
    specificsAugments:"Situational Comps - Augments / Emblem+1 / Artifacts"
  }

  useEffect(()=>{
    loadCompsMeta()
  },[])

  useEffect(()=>{
    if(composMeta){
      const fast8 = [...composMeta].map((tier)=>{
         return tier.filter((compo)=>{
          return compo.shadowCategory === "Fast 8"
         })
      })
      const stars3 = [...composMeta].map((tier)=>{
        return tier.filter((compo)=>{
         return compo.shadowCategory === "3 Stars"
        })
      })
      const SpecificsAugments = [...composMeta].map((tier)=>{
        return tier.filter((compo)=>{
         return compo.shadowCategory === "Specifics Augments"
        })
      })
      
      setAllFast8(fast8)
      setAll3Stars(stars3)
      setAllAugmentsHero(SpecificsAugments)
    }
  },[composMeta])


  if(composMeta.length === 0){
    return (
      <div className={style.containerMeta}>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
        <FantasmaComposiciones></FantasmaComposiciones>
      </div>
    )
  }

  if(allFast8 || all3Stars || allAugmentsHero){
    return (
      <div className={style.containerMeta}>
        {allFast8.length > 0 && 
        <>
        <h2>{title.fast8}</h2>
        {
        allFast8.map((tier,index)=>{
          return (
            tier.map((compo,i)=>{
              return (
                <div key={`containerMetaAugmentsHero`+i} className={[style.containerMetaTier, compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide && !admin ? style.isHide : ""].join(" ")}>
                  <Composicion compo={compo} showHide={showHide} admin={admin}/>
                </div>
              )
            })
          )
        })
      }
      </>
      }
      {all3Stars.length > 0 && 
        <>
        <h2>{title.stars3}</h2>
        {
        all3Stars.map((tier,index)=>{
          return (
            tier.map((compo,i)=>{
              return (
                <div key={`containerMetaAugmentsHero`+i} className={[style.containerMetaTier, compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide && !admin ? style.isHide : ""].join(" ")}>
                  <Composicion compo={compo} showHide={showHide} admin={admin}/>
                </div>
              )
            })
          )
        })
      }
      </>
      }
      {allAugmentsHero.length > 0 && 
        <>
        <h2>{title.specificsAugments}</h2>
        {
        allAugmentsHero.map((tier,index)=>{
          return (
            tier.map((compo,i)=>{
              return (
                <div key={`containerMetaAugmentsHero`+i} className={[style.containerMetaTier, compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide && !admin ? style.isHide : ""].join(" ")}>
                  <Composicion compo={compo} showHide={showHide} admin={admin}/>
                </div>
              )
            })
          )
        })
      }
      </>
      }

      </div>
    )
  }

  
}

export default MetaComps;