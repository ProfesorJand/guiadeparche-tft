import React, {useEffect, useState, Fragment} from "react";
import { useStore } from "@nanostores/react";
import style from "./css/EditarCompoTFT.module.css"
import Composicion from "./Composicion.jsx";
import {MetaComps, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js"

const EditarCompoTFT = () =>{


  const composMeta = useStore(MetaComps);

  useEffect(()=>{
    loadCompsMeta()
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
                <Composicion compo={compo} admin={true}/>
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