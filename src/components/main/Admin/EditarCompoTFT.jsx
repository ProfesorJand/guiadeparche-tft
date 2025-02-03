import React, {useEffect, useState, } from "react";
import MetaComps from "./MetaComps.jsx";
import TierListMetaComps from "@components/TFT/TierListMetaComps.jsx";

const EditarCompoTFT = () =>{
  const [metaCompVersion, setMetaCompVersion] = useState(null)
  useEffect(()=>{
    //get constantes de metaComps

  },[])

  const actualizarConstantes = () =>{
    return null
  }
 return (
  <>
  <TierListMetaComps/>
  <label>
    <span>Meta Comps Version</span>
    <input type="text" placeholder={metaCompVersion}/>
  </label>
  <MetaComps showHide={true} client:only="react"/>
  </>
 )
}

export default EditarCompoTFT