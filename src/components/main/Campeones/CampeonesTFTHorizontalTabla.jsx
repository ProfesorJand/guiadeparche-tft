import React, {useEffect, useState} from "react";
import SinergiasTFTTabla from "./SinergiasTFTTabla.jsx";
import style from "./css/CampeonesTFTHorizontalTabla.module.css"
import HabilidadTFT from "./HabilidadTFT.jsx";
import loading from "../../../assets/loading-180-v2.svg";
const CampeonesTFTHorizontalTabla = ({imgCampeon, nombreCampeon, coste, sinergia, dano, velocidad, vida, armadura, resistenciaMagica, manaInicial, manaFinal, rango, habilidad}) =>{
  const [urlCampeon, setUrlCampeon] = useState(null)
  useEffect(()=>{
    const imgChampion = async () => {
      const url = (await import(`../../../assets/campeonesSet12/${nombreCampeon}.webp`)).default.src
      setUrlCampeon(url);
    }
    imgChampion()
  },[])
  return(
    <div className={style.containerCard}>
      <div className={style.containerImgCampeon}>
      {urlCampeon ?
        <img src={urlCampeon} alt={`${nombreCampeon} TFT`} className={style.imgCampeon} loading="lazy"/>
        :
        <img src={loading} alt="spining" loading="lazy"></img>
      }
      <span className={style.tooltip}>{nombreCampeon.charAt(0).toUpperCase() + nombreCampeon.slice(1)}</span>
      </div>
      
      <div className="containerCoste">
        {coste}
      </div>
      <div className="containerSinergia">
        {
          sinergia.map((nombreSinergia, index)=>{
            return (
              <SinergiasTFTTabla sinergia={nombreSinergia} key={index}></SinergiasTFTTabla>
            )
          })
        }
      </div>
      <div className={style.hideMobile}>
        {dano}
      </div>
      <div className={style.hideMobile}>
        {velocidad.toFixed(2)}
      </div>
      <div className={style.hideMobile}>
        {vida}
      </div>
      <div className={style.hideMobile}>
        {armadura}
      </div>
      <div className={style.hideMobile}>
        {resistenciaMagica}
      </div>
      <div className="containerMana">
        {manaInicial+ "/" + manaFinal}
      </div>
      <div className="containerRango">
        {rango}
      </div>
      <div className="containerHabilidad">
        <HabilidadTFT habilidad={habilidad}/>
      </div>
    </div>
  )
}

export default CampeonesTFTHorizontalTabla