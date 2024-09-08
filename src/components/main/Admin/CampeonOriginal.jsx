import React from "react";
import style from "./css/CampeonOriginal.module.css"

const CampeonOriginal = ({dataCampeon, dataItem, estrellas}) =>{
  const dataCampeonParseado = JSON.parse(dataCampeon)
  const itemsCampeon = dataItem.map(({item})=>JSON.parse(item))
  console.log(itemsCampeon)
  return (
    <div className={style.containerCampeon} style={{order:dataCampeonParseado.coste}}>
      <div className={[style.containerCampeonImg, estrellas === 3 ? style.estrellas3 : estrellas === 4 ? style.estrellas4 : ""].join(" ")}>
        <img className={style.imgCampeon} src={dataCampeonParseado.img} style={{border:`4px solid var(--color-hex-cost-${dataCampeonParseado.coste})`}}></img>
      </div>
      {itemsCampeon.length > 0 &&
      <div className={style.containerItems}>
      {itemsCampeon.map(({nombre,img})=>{
        return (
          <div className={style.containerItem} >
        <img className={style.imgItem} src={img} alt={nombre}></img>
          </div>
        )
      })}
      </div>
      }
      <span className={style.nombreCampeon}>{dataCampeonParseado.nombre}</span>
    </div>
  )
}

export default CampeonOriginal;