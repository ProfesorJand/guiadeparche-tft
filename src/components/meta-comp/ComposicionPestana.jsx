import React, { useEffect, useState } from 'react';
import datosSet11Latino from './datosSet11Latino.json';
import Youtube from '@components/youtube/Youtube.jsx';
import style from "./css/ComposicionPestana.module.css"

//const aumentos = datosSet11Latino.objetos;



const Aumentos = ({ info }) => {
  const [aumentos, setAumentos] = useState();
  const url = "https://raw.communitydragon.org/latest/game/";
  useEffect(()=>{
    const fecthingDataAumentos = async ()=>{
      const urlData = "https://raw.communitydragon.org/latest/cdragon/tft/es_ar.json"
      const data = await fetch(urlData,{cache: "reload"})
      const {items} = await data.json();
      setAumentos(items);
    }
    fecthingDataAumentos();
  },[]);

  function encontrarAumento(id) {
    const aumentoInfo = aumentos?.find((aumento) => aumento.apiName === id);
    return {
      icon: aumentoInfo?.icon || 'assets/maps/tft/icons/augments/hexcore/pandoras-bench-i.png',
      desc: replaceVariables({desc: aumentoInfo?.desc  || 'actualizando...', effects: aumentoInfo?.effects, id:aumentoInfo?.apiName}),
      name: aumentoInfo?.name || 'Upss',
    };
  }

  function replaceVariables({desc, effects, id}) {
    return desc.replace(/@(\w+)(\*100)?@%?/g, (match, variable, multiply) => {
      let value = effects[variable];
      
      if (value === undefined) {
        return match; // Si la variable no está en effects, devolver el match sin cambios
      }
  
      if (multiply) {
        value *= 100;
      }
  
      if (typeof value === 'number' && value % 1 !== 0) {
        value = Math.round(value); // Redondear a entero si es decimal
      }
  
      return multiply ? `${value}%` : value;
    }).replaceAll(/<(\/?[^>]+)>/g, '\n \n').replaceAll("&nbsp;"," ");
  }


  return (
  <>
    {info.Aum && Object.keys(info.Aum).map((key) => (
      <div className={style.containerAumentos} key={key}>
        {info.Aum[key].map((aum, index) => {
          const aumento = encontrarAumento(aum);
          return (
            <div className={style.tooltip} key={index}>
              <img
                src={url + aumento.icon.replace(".tft_set12", "").replace(".tex",".png").toLowerCase()}
                alt={`Aumento ${aumento.name}`}
                className={style.aumentoImg}
                loading="lazy"
                width={50}
                height={50}
              />
              <div className={style.containerTooltip}>
                <h1 className={style.tituloTooltip}>{aumento.name}</h1>
                <p>{aumento.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    ))}
    {info && (
      <div className={style.containerPestanaInfoComp}>
        {info.Comp1 && info.Nivel1 && (
          <div className={style.containerCompsNivel}>
            <h2 className={style.nivelCompH2}>Level {info.Nivel1}</h2>
            <img
              className={style.InfoCompImg}
              loading="lazy"
              src={info.Comp1}
              alt={`Early Comp ${info.Titulo}`}
              width={16 * 25}
              height={9 * 25}
            />
          </div>
        )}
        {info.Comp2 && info.Nivel2 && (
          <div className={style.containerCompsNivel}>
            <h2 className={style.nivelCompH2}>Level {info.Nivel2}</h2>
            <img
              className={style.InfoCompImg}
              loading="lazy"
              src={info.Comp2}
              alt={`Early Comp ${info.Titulo}`}
              width={16 * 25}
              height={9 * 25}
            />
          </div>
        )}
      </div>
    )}
  </>
)};

const ComposicionPestana = ({ Titulo, Gamep, Tips, Early, Mid, Late, index }) => {
  const [selectedTab, setSelectedTab] = useState(null);
  useEffect(()=>{
    const pestanaAbierta = Early && Object.keys(Early).length > 0 ? 0 : Mid && Object.keys(Mid).length > 0 ? 1 : Late && Object.keys(Late).length > 0 ? 2 : Tips ? 3 : Gamep ? 4 : null;
    setSelectedTab(pestanaAbierta)
  },[])
  const handleTabClick = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div className={style.composicionPestanas}>
      <div className={style.containerPestanas}>
        {Early && Object.keys(Early).length > 0 && <button onClick={() => handleTabClick(0)} className={[selectedTab === 0 ? style.selected : '',style.pestanas].join(" ")}>Early</button>}
        {Mid && Object.keys(Mid).length > 0 && <button onClick={() => handleTabClick(1)} className={[selectedTab === 1 ? style.selected : '',style.pestanas].join(" ")}>Mid</button>}
        {Late && Object.keys(Late).length > 0 && <button onClick={() => handleTabClick(2)} className={[selectedTab === 2 ? style.selected : '',style.pestanas].join(" ")}>Late</button>}
        {Tips && <button onClick={() => handleTabClick(3)} className={[selectedTab === 3 ? style.selected : '',style.pestanas].join(" ")}>Tips</button>}
        {Gamep && Object.keys(Gamep).length > 0 && <button onClick={() => handleTabClick(4)} className={[selectedTab === 4 ? style.selected : '',style.pestanas].join(" ")}>Gameplay</button>}
      </div>
      <div className={style.contenido}>
        {Early && Object.keys(Early).length > 0 && selectedTab === 0 && <Aumentos info={Early} client:load/>}
        {Mid && Object.keys(Mid).length > 0 && selectedTab === 1 && <Aumentos info={Mid} client:load/>}
        {Late && Object.keys(Late).length > 0 && selectedTab === 2 && <Aumentos info={Late} client:load/>}
        {Tips && selectedTab === 3 && <p className={style.textoTips}>{Tips}</p>}
        {Gamep && Object.keys(Gamep).length > 0 && selectedTab === 4 && 
          Object.keys(Gamep).map((key, index)=>{
            return <Youtube src={Gamep[key]} loading={"lazy"} client:load key={key}/>
          })

        }
      </div>
    </div>
  );
};

export default ComposicionPestana;
