import React from "react"
import style from "./css/FantasmaComposiciones.module.css";
import styleLoading from "src/components/meta-comp/css/StyleLoading.module.css"

const FantasmaComposiciones = ()=>{
  return (
    <div className={[style.fantasmaComposiciones, styleLoading.skeleton].join(" ") }>

    </div>
  )
}

export default FantasmaComposiciones;