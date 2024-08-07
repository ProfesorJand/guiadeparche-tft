import React,{useEffect, useState} from 'react';
import ComposicionPestana from './ComposicionPestana';
import style from "./css/InfoComp.module.css"

const InfoComp = ({ championsTier, index, alternativa, handleSelect, selectedAlternativa, selected }) => {
  
  const [champTier, setChampTier] = useState(null)
  const [srcCompo, setSrcCompo] = useState();
  useEffect(()=>{
    if(selectedAlternativa?.titulo || selected?.titulo)
    setChampTier(championsTier.find(({Titulo})=>{
      if(alternativa){
        return Titulo === selectedAlternativa?.titulo
      }
      return Titulo === selected?.titulo
    }))
  },[selectedAlternativa, selected])

  useEffect(()=>{
    setSrcCompo(champTier?.ImgCompo)
  },[champTier])
  const espatula = champTier?.Espatula;

  const handleImageClick = (url) => {
    setSrcCompo(url);
  };

  const handleCloseClick = () => {
    handleSelect({titulo: false, alternativa, open:false});
  };

  if(!champTier){
    return null

  }

return (
  <section
    className={[
      style.infoComp,
      selected?.titulo === champTier?.Titulo && selected?.open ? style.show : '',
      selectedAlternativa?.titulo === champTier?.Titulo && selectedAlternativa?.open ? style.show : '',
      alternativa ? style.alternativa : ''
    ].join(" ")}>
    <button className={style.btnClose} onClick={handleCloseClick}>X</button>
    <header>
      <h1 className={style.titulo}>{champTier?.Titulo}</h1>
    </header>
    <div className={style.containerCompo}>
      <div className={style.composicionDiv}>
        <img
          src={srcCompo}
          alt={`Composicion Meta ${champTier?.Titulo}`}
          className={style.composicionImg}
          // loading={(champTier?.Tier === "S" || champTier?.Tier === "Alternativa-S") ? 'eager' : 'lazy'}
          loading={"lazy"}
        />
      </div>
      <div className="containerChampEspatula">
        <img
          src={champTier?.ImgCampeon}
          alt={`Composicion Meta ${champTier?.Titulo}`}
          className={style.campeonEspatula}
          //loading={index === 0 ? 'eager' : 'lazy'}
          loading={"lazy"}
          width={50}
          height={50}
          onClick={() => handleImageClick(champTier?.ImgCompo)}
        />
        {espatula && Object.keys(espatula).map((key, espatulaIndex) => {
          if (key === "Item1" || key === "Item2") {
            return (
              <img
                key={espatulaIndex}
                src={espatula[key]}
                alt={`Composicion Meta Espatula ${champTier?.Titulo}`}
                className={style.campeonEspatula}
                // loading={index === 0 ? 'eager' : 'lazy'}
                loading={"lazy"}
                width={50}
                height={50}
                onClick={() => handleImageClick(key === "Item1" ? espatula["Comp1"] : espatula["Comp2"])}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
    <ComposicionPestana
      Titulo={champTier?.Titulo}
      Gamep={champTier?.Gamep}
      Tips={champTier?.Tips}
      Early={champTier?.Early}
      Mid={champTier?.Mid}
      Late={champTier?.Late}
      index={index}
    />
  </section>
  );
};

export default InfoComp;
