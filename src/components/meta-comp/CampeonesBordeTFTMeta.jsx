import React, { useEffect } from 'react';
import { BorderColorCampeon } from '../../json/updates/constantesCampeones';

const CampeonesBordeTFTMeta = ({ nombreCampeon, titulo, tresEstrellas, IconoSuperior, index, i, imgCampeon, meta, coste, alternativa, handleSelect, selected, selectedAlternativa }) => {
  const borderColor = BorderColorCampeon[coste];

  return (
    <div
    className={[
      "imgChampionTierList",
      selected?.titulo === titulo && selected?.open ? 'imgSelected' : '',
      selectedAlternativa?.titulo === titulo && selectedAlternativa?.open ? 'imgSelected' : '',
      alternativa ? 'alternativa' : ''
    ].join(" ")}
    data-alt={titulo}
    onClick={() => {
      if(!alternativa){
        handleSelect({titulo: selected?.titulo === titulo ? false : titulo, alternativa, open:selected?.titulo === titulo ? false: true})
      }else{
        handleSelect({titulo: selectedAlternativa?.titulo === titulo ? false : titulo, alternativa, open:selectedAlternativa?.titulo === titulo ? false: true})
      }
    }}
      
    
    >
      <div className="borderChampion" style={{ borderColor }}>
        <img
          src={imgCampeon}
          alt={titulo}
          className="imgChampionBorderTierList"
          width={100}
          height={100}
        />
        {tresEstrellas && (
          <img
            src="https://guiadeparche.com/tftdata/assets/3-estrellas.webp"
            alt="3-estrella"
            className="tresEstrellas"
            width={100}
            height={100}
          />
        )}
        {IconoSuperior && (
          <div className="containerUpperIcon">
            <img
              src={IconoSuperior}
              alt="Icono de identificacion"
              className="iconoSuperior"
              width={100}
              height={100}
              style={{ backgroundColor: borderColor }}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .containerChampionTierList {
            display: flex;
            position: relative;
            width: 100%;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
          }
          .borderChampion{
            display: flex;
            width: 100%;
            height: 100%;
            position: relative;
            border: 4px solid;
            box-sizing: border-box;
          }
          .imgChampionBorderTierList{
            width: 100%;
            height: 100%;
          }
          .imgChampionTierList:hover {
            cursor: pointer;
            transform: scale(1);
          }
        
          .imgChampionTierList {
            width: 20%;
            height: auto;
            box-sizing: border-box;
            transition: 0.5s;
            transform: scale(0.9);
          }

          .iconoSuperior{
            display: flex;
            position: absolute;
            top:-1px;
            right: -1px;
            width: 25%;
            height: 25%;
          }
        
          .imgSelected {
            filter: grayscale(0%);
            -webkit-filter: grayscale(0%);
            transform: scale(1);
            transition: 0.5s;
          }
          .tresEstrellas{
            display: flex;
            position: absolute;
            top:-12px;
            left:-12px;
            filter: contrast(160%);
            width: 100%;
            height: 100%;
          }

          @media only screen and (min-width:900px){
            .borderChampion{
              border: 4px solid;
            }
          }
        `}</style>
    </div>
  );
};

export default CampeonesBordeTFTMeta;
