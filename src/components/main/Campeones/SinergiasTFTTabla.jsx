import React, {useEffect, useState} from "react";
import style from "./css/SinergiasTFTTabla.module.css"

const SinergiasTFTTabla = ({sinergia}) =>{
  const [urlSinergia, setUrlSinergia] = useState(null)
  const SinergiasEspanol = {
    Arcana:"Arcana",
    Ascendente:"Ascendant",
    Bastión:"Bastion",
    Reina_Murciélago:"BatQueen",
    Mejores_Amigos:"Best_Friends",
    Pistolero:"Blaster",
    Crono:"Chrono",
    Dragón:"Dragon",
    Druida:"Druid",
    Sobrenatural:"Eldritch",
    Feérico:"Faerie",
    Escarcha:"Frost",
    Melimancia:"Honeymancy",
    Cazador:"Hunter",
    Incantum:"Incantor",
    Mago:"Mage",
    Multiatacante:"Multistriker",
    Portal:"Portal",
    Preservador:"Preserver",
    Piromancia:"Pyro",
    Voraz:"Ravenous",
    Erudito:"Scholar",
    Cambiaformas:"Shapeshifter",
    Glucomancia:"Sugarcraft",
    Vanguardia:"Vanguard",
    Guerrero:"Warrior",
    Brujería:"Witchcraft"
  }

  useEffect(()=>{
    const imgSinergia = async () => {
      const url = (await import(`../../../assets/sinergiasSet12/Trait_Icon_12_${SinergiasEspanol[sinergia.replace(" ","_")]}.svg`)).default.src  
      setUrlSinergia(url);
    }  
    imgSinergia()
  },[])    

  return(
    <>
      {urlSinergia && 
      <div className={style.containerTooltip}>
        <img src={urlSinergia} alt={`sinergia TFT ${sinergia}`} className={style.imgSinergia} loading="lazy"/>
          <span className={style.tooltip}>{sinergia}</span>
      </div>
      }
    </>
  )

}

export default SinergiasTFTTabla;