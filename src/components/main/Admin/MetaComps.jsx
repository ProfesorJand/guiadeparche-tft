import React, {useEffect} from "react";
import { useStore } from "@nanostores/react";
import Composicion from "./Composicion.jsx";
import style from "./css/EditarCompoTFT.module.css"
import {MetaComps as compos, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js"
import FantasmaComposiciones from "./FantasmaComposiciones.jsx";
const MetaComps = ({showHide})=>{
  const composMeta = useStore(compos);
  const admin = localStorage.getItem("superAdmin") || false;
  useEffect(()=>{
    loadCompsMeta()
  },[])
  return (
    <div className={style.containerMeta}>
      {
        composMeta.length === 0 &&
        <>
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
        </>
      }
    {
      composMeta.length > 0 && composMeta.map((tier,index)=>{
        return(
          tier.map((compo,i)=>{
            return (
              <div key={`containerMeta`+i} className={[style.containerMetaTier, compo?.isHide && admin ? style.isHideForAdmin : compo?.isHide && !admin ? style.isHide : ""].join(" ")}>
                <Composicion compo={compo} showHide={showHide} admin={admin}/>
              </div>
            )
          })
        )
      })
    }
    </div>
  )
}

export default MetaComps;