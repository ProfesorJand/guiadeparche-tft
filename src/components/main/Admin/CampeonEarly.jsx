import React from "react";
import style from "./css/CampeonEarly.module.css"

const CampeonEarly = ({dataCampeon, dataItem, estrellas}) =>{
  const dataCampeonParseado = JSON.parse(dataCampeon)
  console.log(dataCampeon)
  console.log(dataItem)
  console.log(estrellas)
  const itemsCampeon = dataItem.map(({item})=>JSON.parse(item))
  console.log(itemsCampeon)
  return (
    <div className={style.containerCampeon}>
      <div className={[style.containerCampeonImg, estrellas === 3 ? style.estrellas3 : estrellas === 4 ? style.estrellas4 : ""].join(" ")}>
        <img className={style.imgCampeon} src={dataCampeonParseado.img} style={{border:`2px solid var(--color-hex-cost-${dataCampeonParseado.coste})`}}></img>
      {itemsCampeon.length > 0 &&
      <div className={style.containerItems}>
      {itemsCampeon.map(({nombre,img})=>{
        return (
          <div className={style.containerItem}>
            <img className={style.imgItem} src={img} alt={nombre}></img>
          </div>
        )
      })}
      </div>
      }
      <span className={style.nombreCampeon}>{dataCampeonParseado.nombre}</span>
      </div>
    </div>
  )
}

export default CampeonEarly;