import React, { useEffect, useState } from 'react';
import datosSet11Latino from './datosSet11Latino.json';
import Youtube from '@components/youtube/Youtube.jsx';

//const aumentos = datosSet11Latino.objetos;



const Aumentos = ({ info }) => {
  const [aumentos, setAumentos] = useState();
  const url = "https://raw.communitydragon.org/latest/game/";
  useEffect(()=>{
    const fecthingDataAumentos = async ()=>{
      const urlData = "https://raw.communitydragon.org/latest/cdragon/tft/es_ar.json"
      const data = await fetch(urlData)
      const {items} = await data.json();
      setAumentos(items);
    }
    fecthingDataAumentos();
  },[]);

  function encontrarAumento(id) {
    const aumentoInfo = aumentos?.find((aumento) => aumento.apiName === id);
    return {
      icon: aumentoInfo?.icon || 'https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/pandoras-bench-i.png',
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
      <div className="containerAumentos" key={key}>
        {info.Aum[key].map((aum, index) => {
          const aumento = encontrarAumento(aum);
          return (
            <div className="tooltip" key={index}>
              <img
                src={url + aumento.icon.replace(".tft_set12", "").replace(".tex",".png").toLowerCase()}
                alt={`Aumento ${aumento.name}`}
                className="aumentoImg"
                loading="lazy"
                width={50}
                height={50}
              />
              <div className="containerTooltip">
                <h1 className="tituloTooltip">{aumento.name}</h1>
                <p>{aumento.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    ))}
    {info && (
      <div className="containerPestanaInfoComp">
        {info.Comp1 && info.Nivel1 && (
          <div className="containerCompsNivel">
            <h2 className="nivelCompH2">Level {info.Nivel1}</h2>
            <img
              className="InfoCompImg"
              loading="lazy"
              src={info.Comp1}
              alt={`Early Comp ${info.Titulo}`}
              width={16 * 25}
              height={9 * 25}
            />
          </div>
        )}
        {info.Comp2 && info.Nivel2 && (
          <div className="containerCompsNivel">
            <h2 className="nivelCompH2">Level {info.Nivel2}</h2>
            <img
              className="InfoCompImg"
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
    <div className="composicionPestanas">
      <div className="containerPestanas">
        {Early && Object.keys(Early).length > 0 && <button onClick={() => handleTabClick(0)} className={[selectedTab === 0 ? 'selected' : '',"pestanas"].join(" ")}>Early</button>}
        {Mid && Object.keys(Mid).length > 0 && <button onClick={() => handleTabClick(1)} className={[selectedTab === 1 ? 'selected' : '',"pestanas"].join(" ")}>Mid</button>}
        {Late && Object.keys(Late).length > 0 && <button onClick={() => handleTabClick(2)} className={[selectedTab === 2 ? 'selected' : '',"pestanas"].join(" ")}>Late</button>}
        {Tips && <button onClick={() => handleTabClick(3)} className={[selectedTab === 3 ? 'selected' : '',"pestanas"].join(" ")}>Tips</button>}
        {Gamep && Object.keys(Gamep).length > 0 && <button onClick={() => handleTabClick(4)} className={[selectedTab === 4 ? 'selected' : '',"pestanas"].join(" ")}>Gameplay</button>}
      </div>
      <div className="contenido">
        {Early && Object.keys(Early).length > 0 && selectedTab === 0 && <Aumentos info={Early} client:load/>}
        {Mid && Object.keys(Mid).length > 0 && selectedTab === 1 && <Aumentos info={Mid} client:load/>}
        {Late && Object.keys(Late).length > 0 && selectedTab === 2 && <Aumentos info={Late} client:load/>}
        {Tips && selectedTab === 3 && <p className='textoTips'>{Tips}</p>}
        {Gamep && Object.keys(Gamep).length > 0 && selectedTab === 4 && 
          Object.keys(Gamep).map((key, index)=>{
            return <Youtube src={Gamep[key]} loading={"lazy"} client:load key={key}/>
          })

        }
      </div>
      <style>{`
            .contenido{
              display:flex;
              flex-direction:column;
              width:100%;
              position:relative;
              gap:5px;
              margin-top:1rem;
            }
            .containerTooltip {
              margin-left: -150px;
              bottom: 120%;
              left: 50%;
              display: none;
              width: 300px;
              background-color: var(--bg-primary);
              color: white;
              text-align: center;
              border-radius: 3px;
              padding: 6px 6px;
              position: absolute;
              z-index: 50;
              box-shadow: 0 5px 10px rgba(221, 241, 39, 0.534);
              box-sizing: border-box;
            }
            .tituloTooltip{
              font-size:larger;
            }
            .containerAumentos {
              width: 100%;
              box-sizing: border-box;
              display: flex;
              position: relative;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
            }
            .aumentoImg {
              width: 100%;
              height: auto;
            }
            .containerPestanaInfoComp{
              display:flex;
              flex-direction:row;
              position:relative;
              width:100%;
              gap:5px;
            }
            .containerCompsNivel{
            display:flex;
            position:relative;
            gap:5px;
            flex-direction:column;
            justify-content: center;
            align-items:center;
            flex:1;
            }
            .tooltip {
              display: flex;
              position:initial;
              width: 10%;
              align-items: center;
              justify-content: center;
            }

            .tooltip:hover .containerTooltip {
              display: flex;
              flex-direction: column;
            }
            .nivelCompH2{
              font-size:larger;
              text-align:center;
              margin:0;
            }
            .InfoCompImg{
              display:flex;
              position:relative;
              width:100%;
              height:auto;
            }
            .containerPestanas {
              display: flex;
              width: 100%;
              gap: 5px;
              flex-wrap: nowrap;
              justify-content: flex-start;
              flex-direction: row;
              position: relative;
              color: white;
              align-items: center;
              list-style-type: none;
              margin: 0;
              box-sizing: border-box;
            }
            .pestanas {
              list-style: none;
              background-color: var(--bg-secondary);
              width: max-content;
              padding: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              font-size: 1rem;
              flex-grow: 1;
              color: white
            }
            .pestanas:hover {
              cursor: pointer;
              background-color: var(--bg-primary);
            }
            .selected {
              background-color: var(--bg-primary);
              border-bottom-color: var(--bg-primary);
            }
            .containerInfoPestanas{
              display: none;
              padding: 1rem;
              flex-direction: column;
              box-sizing: border-box;
            }
            .show {
              display: flex;
            }
            p {
              font-size: 1rem;
              margin: 5px;
            } 
            @media only screen and (min-width: 900px) {
              .containerPestanas {
                justify-content: center;
              }
              .tooltip{
                position: relative;
              }
            }
          `}</style>
    </div>
  );
};

export default ComposicionPestana;
