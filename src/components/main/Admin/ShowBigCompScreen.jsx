import React, {useEffect} from "react";
import { useStore } from "@nanostores/react";
import {MetaComps as compos, loadCompsMeta} from "src/stores/menuFiltradoAdmin.js";
import Composicion from "./Composicion.jsx";
import style from "./css/ShowBigCompScreen.module.css"
const ShowBigCompScreen = ({id, setShowBigComp}) => {
  const composMeta = useStore(compos);
  function findObjectById(id, composMeta) {
    for (const array of composMeta) {
      const found = array.find(obj => obj.id === id);
      if (found) {
        return found; // Retorna el objeto si se encuentra
      }
    }
    return null; // Retorna null si no encuentra el objeto
  }
  
  const CompToShow = findObjectById(id, composMeta);
  const admin = localStorage.getItem("superAdmin") || false;
  function closeComp(e){
    e.stopPropagation();
    setShowBigComp((valor)=>!valor);
  }
  if(admin){
    return (
      <div className={style.compToShow} onClick={(e)=>{closeComp(e)}}>
        <div className={style.aspectWrapper}>
        <Composicion compo={CompToShow} showHide={true} admin={false} show={false} allwaysOpen={true}/>
        </div>
      </div>
    )
  }
}

export default ShowBigCompScreen