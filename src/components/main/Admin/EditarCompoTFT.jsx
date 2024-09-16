import React, {useEffect, useState, Fragment} from "react";
import { useStore } from "@nanostores/react";
import style from "./css/EditarCompoTFT.module.css"
import Composicion from "./Composicion.jsx";
import MetaComps from "./MetaComps.jsx";

const EditarCompoTFT = () =>{
 return (
  <MetaComps showHide={true} client:only="react"/>
 )
}

export default EditarCompoTFT