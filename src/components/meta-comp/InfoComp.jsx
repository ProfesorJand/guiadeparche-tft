import React,{useEffect, useState} from 'react';
import ComposicionPestana from './ComposicionPestana';

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
      "infoComp",
      selected?.titulo === champTier?.Titulo && selected?.open ? 'show' : '',
      selectedAlternativa?.titulo === champTier?.Titulo && selectedAlternativa?.open ? 'show' : '',
      alternativa ? 'alternativa' : ''
    ].join(" ")}>
    <button className="btnClose" onClick={handleCloseClick}>X</button>
    <header>
      <h1 className="titulo">{champTier?.Titulo}</h1>
    </header>
    <div className="containerCompo">
      <div className="composicionDiv">
        <img
          src={srcCompo}
          alt={`Composicion Meta ${champTier?.Titulo}`}
          className={`composicionImg`}
          loading={(champTier?.Tier === "S" || champTier?.Tier === "Alternativa-S") ? 'eager' : 'lazy'}
        />
      </div>
      <div className="containerChampEspatula">
        <img
          src={champTier?.ImgCampeon}
          alt={`Composicion Meta ${champTier?.Titulo}`}
          className={`campeonEspatula`}
          loading={index === 0 ? 'eager' : 'lazy'}
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
                className="campeonEspatula"
                loading={index === 0 ? 'eager' : 'lazy'}
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
    <style jsx>{`
      .infoComp {
        display:none;
        flex-direction: column;
        position: relative;
        gap: 5px;
        margin: 5px 0px;
        width: 100%;
        border: 2px solid var(--border-color);
        box-sizing: border-box;
      }

      .btnClose {
        display: flex;
        position: static;
        width: 20px;
        height: auto;
        text-align: center;
        margin: 0;
        top: 0;
        left: 0;
        background-color: var(--border-color);
        border: 1px solid var(--border-color);
        padding: 0px 5px;
        border-radius: 0px;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }

      .btnClose:hover {
        background-color: var(--bg-secondary);
        color: white;
      }

      .titulo {
        color: white;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        font-size: larger;
        margin: 0;
        padding: 0;
        text-align: center;
      }

      .sinergiasText {
        color: white;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        margin: 0;
        width: 100%;
        padding: 0 20px;
        text-align: center;
        box-sizing: border-box;
      }

      .sinergiasSpan {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 1rem;
      }

      .composicionDiv {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        margin: 0;
        width: 100%;
      }

      .composicionImg {
        display: flex;
        position: relative;
        width: 100%;
        height: auto;
        aspect-ratio: 1.81 / 1;
      }

      .containerCompo {
        display: flex;
        flex-direction: row;
      }

      .containerChampEspatula {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        width: 10%;
      }

      .campeonEspatula {
        width: 100%;
        height: auto;
        transform: scale(0.9);
        transition: 0.5s;
      }

      .campeonEspatula:hover {
        transform: scale(1);
      }

      .infoComp.show {
        display:flex;
      }

      .selected {
        transform: scale(1);
      }

      @media only screen and (min-width: 900px) {
        .titulo {
          font-size: 2rem;
        }
        .composicionDiv {
          width: 90%;
        }
      }
    `}</style>
  </section>
  );
};

export default InfoComp;
