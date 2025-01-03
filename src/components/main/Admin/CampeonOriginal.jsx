import React from "react";
import style from "./css/CampeonOriginal.module.css"

const CampeonOriginal = ({dataCampeon, dataItem, estrellas, show}) =>{
  const dataCampeonParseado = JSON.parse(dataCampeon)
  const itemsCampeon = dataItem.map(({item})=>JSON.parse(item))
  return (
    <div className={style.containerCampeon} style={{order:dataCampeonParseado.coste}}>
      <div className={[style.containerCampeonImg, estrellas === 3 ? style.estrellas3 : estrellas === 4 ? style.estrellas4 : ""].join(" ")}>
        <img className={style.imgCampeon} src={dataCampeonParseado.img} style={{border:`2px solid var(--color-hex-cost-${dataCampeonParseado.coste})`}} loading="lazy"></img>
      </div>
      {itemsCampeon.length > 0 &&
      <div className={style.containerItems}>
      {itemsCampeon.map(({nombre,img},index)=>{
        return (
          <div className={style.containerItem} key={"itemsCampeon"+index} >
            <img className={style.imgItem} src={img} alt={nombre} loading="lazy"></img>
          </div>
        )
      })}
      </div>
      }
      <span className={show ? style.nombreCampeon : style.nombreCampeonOculto}>{dataCampeonParseado.nombre}</span>
    </div>
  )
}

export default CampeonOriginal;