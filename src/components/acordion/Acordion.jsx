import React, {useState} from "react";
import style from "./css/Acordion.module.css"
const Acordion = ({children, open=false})=>{
    const [isOpen, setOpen] = useState(open);
    function handleToogle(){
        setOpen(!isOpen)
    }
    const regex = /<([a-z1-6]+)[^>]*>[\s\S]*?<\/\1>/g;
    const Childrens = children.props.value.match(regex)
    return (
        <div className={style.pestanaPrincipal} >
            
            {Childrens.map((child,i)=>{
                if(i !== 0){
                    return (
                        <div key={i} className={[style.contenedorTexto, isOpen ? style.show:""].join(" ")} dangerouslySetInnerHTML={{ __html: child }} />
                    )
                }else{
                    return (
                        <div key={i} className={style.contenedorTitulo} onClick={()=>{handleToogle()}}>
                        <div className={style.titulo} dangerouslySetInnerHTML={{ __html: child }} />
                        <div className={style.flecha}>{isOpen ? "🔼" : "🔽"}</div>
                        </div>

                )
                }
             })}
        </div>
    )
}

export default Acordion;