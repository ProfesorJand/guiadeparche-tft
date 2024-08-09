import React, {useEffect, useState} from "react";
import SinergiasTFTTabla from "./SinergiasTFTTabla.jsx";
import style from "./css/CampeonesTFTHorizontalTabla.module.css"
import HabilidadTFT from "./HabilidadTFT.jsx";

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
      {urlCampeon &&
      <div className={style.containerImgCampeon}>
        <img src={urlCampeon} alt={nombreCampeon} className={style.imgCampeon} />
        <span className={style.tooltip}>{nombreCampeon}</span>
      </div>
     }
      
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