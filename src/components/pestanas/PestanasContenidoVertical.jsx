import React, {useState} from "react";
import style from "./css/PestanaContenidoVertical.module.css"
const PestanaContenidoVertical = ({titulo, defaultOpen=false})=>{
    const [open, setOpen] = useState(defaultOpen);
    function handleToogle(index){
        setIndex({[index]:!open})
        setOpen(!open)
    }
    return (
        <div className={style.pestanaPrincipal}>
            <div className={style.flecha} onClick={()=>{handleToogle(index)}}>flecha</div>
            {titulo}
        </div>
    )
}

export default PestanaContenidoVertical;