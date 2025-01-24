import React, { useState } from "react";
import style from "./css/CampeonOriginal.module.css";
import TooltipItem from "@components/tooltips/items";

const CampeonOriginal = ({dataCampeon, dataItem, estrellas, show}) =>{
  const dataCampeonParseado = JSON.parse(dataCampeon)
  const itemsCampeon = dataItem.map(({item})=>JSON.parse(item))
  const [tooltipData, setTooltipData] = useState(null)
  return (
    <div className={style.containerCampeon} style={{order:dataCampeonParseado.coste}}>
      <div className={[style.containerCampeonImg, estrellas === 3 ? style.estrellas3 : estrellas === 4 ? style.estrellas4 : ""].join(" ")}>
        <img className={style.imgCampeon} src={dataCampeonParseado.img} style={{border:`2px solid var(--color-hex-cost-${dataCampeonParseado.coste})`}} loading="lazy"></img>
      </div>
      {itemsCampeon.length > 0 &&
      <div className={style.containerItems}>
      {itemsCampeon.map(({nombre,img,icon, name, desc, effects},index)=>{
        return (
          <div
            className={style.containerItem}
            key={"itemsCampeon"+index}
            onMouseEnter={() => {
              if (desc) {
                setTooltipData(index);
              }
            }}
            onMouseLeave={() => {
              setTooltipData(null)
            }}
          >
            <TooltipItem
              desc={desc}
              effects={effects}
              name={name}
              nombre={nombre}
              isVisible={tooltipData === index}
            />  
            <img className={style.imgItem} src={img ? img : "https://raw.communitydragon.org/latest/game/"+icon.toLowerCase().replace(".tex",".png")} alt={nombre} loading="lazy"></img>
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