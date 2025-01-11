import React, {useEffect, useState, useRef} from "react";
import { useStore } from "@nanostores/react";
import Composicion from "./Composicion.jsx";
import style from "./css/EditarCompoTFT.module.css"
import {MetaComps as compos, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js"
import FantasmaComposiciones from "./FantasmaComposiciones.jsx";
import Adsense from "@components/adsense/Adsense.jsx";
const MetaComps = ({showHide})=>{
  const composMeta = useStore(compos);
  const [allFast8, setAllFast8] = useState([]);
  const [all3Stars, setAll3Stars] = useState([]);
  const [allAugmentsHero, setAllAugmentsHero] = useState([]);
  const [openCompoId, setOpenCompoId] = useState(null);
  const refs = useRef({});
  const admin = localStorage.getItem("superAdmin") || false;
  const title = {
    fast8:"Standard Comps - Fast 8/9",
    stars3:"Reroll Comps - 3 Star",
    specificsAugments:"Situational Comps - Augments / Emblem+1 / Artifacts"
  }

  const toggleCompo = (id) => {
    console.log("toogleCompo", id)
    setOpenCompoId((prevId) => (prevId === id ? null : id));
    scrollToComposicion(id)
  };

  const scrollToComposicion = (id) => {
    console.log("currentId", id);
  
    // Obtén la referencia del elemento a desplazarte
    // const element = refs.current[id];
    // const offsetTop = element.offsetTop;
    
    // window.scrollTo({
    //   top: offsetTop,
    //   behavior: "smooth",
    // });
  
      // Ajusta manualmente el desplazamiento para evitar que el elemento quede oculto detrás del header
      //const headerHeight = window.innerHeight * 0.08; // 8vh convertido a píxeles
       setTimeout(() => {
      //   window.scrollBy(0, -headerHeight);
      // Obtén la referencia del elemento a desplazarte
        const element = refs.current[id];
        const offsetTop = element.offsetTop;
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }, 150); // Un pequeño retraso para asegurarte de que `scrollIntoView` haya terminado
  };

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
        {/* <Adsense direction='' dimension="horizontal" numeracion={2} client:only="react"/> */}
        {allFast8.some(innerArray => innerArray.length > 0) && 
        <>
        <h2>{title.fast8}</h2>
        {
        allFast8.map((tier,index)=>{
          return (
            tier.map((compo,i)=>{
              return (
                <div ref={(el) => (refs.current[compo.id] = el)} key={`containerMetaAugmentsHero`+i} className={[style.containerMetaTier, compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide && !admin ? style.isHide : ""].join(" ")}>
                  <Composicion compo={compo} showHide={showHide} admin={admin} onToggle={() => toggleCompo(compo.id)} isOpen={openCompoId === compo.id}/>
                </div>
              )
            })
          )
        })
      }
      </>
      }
      {/* <Adsense direction='' dimension="horizontal" numeracion={3} client:only="react"/> */}
      {all3Stars.some(innerArray => innerArray.length > 0) && 
        <>
        <h2>{title.stars3}</h2>
        {
        all3Stars.map((tier,index)=>{
          return (
            tier.map((compo,i)=>{
              return (
                <div ref={(el) => (refs.current[compo.id] = el)} key={`containerMetaAugmentsHero`+i} className={[style.containerMetaTier, compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide && !admin ? style.isHide : ""].join(" ")}>
                  <Composicion compo={compo} showHide={showHide} admin={admin} onToggle={() => toggleCompo(compo.id)} isOpen={openCompoId === compo.id}/>
                </div>
              )
            })
          )
        })
      }
      </>
      }
      {/* <Adsense direction='' dimension="horizontal" numeracion={4} client:only="react"/> */}
      {allAugmentsHero.some(innerArray => innerArray.length > 0) && 
        <>
        <h2>{title.specificsAugments}</h2>
        {
        allAugmentsHero.map((tier,index)=>{
          return (
            tier.map((compo,i)=>{
              return (
                <div ref={(el) => (refs.current[compo.id] = el)} key={`containerMetaAugmentsHero`+i} className={[style.containerMetaTier, compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide && !admin ? style.isHide : ""].join(" ")}>
                  <Composicion compo={compo} showHide={showHide} admin={admin} onToggle={() => toggleCompo(compo.id)} isOpen={openCompoId === compo.id}/>
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