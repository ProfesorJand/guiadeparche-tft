import React from 'react';
import CampeonesBordeTFTMeta from './CampeonesBordeTFTMeta.jsx';

const ContainerChampionTierList = ({ championsTier, index, pbe, alternativa, handleSelect, selected, selectedAlternativa }) => {
  return (
    <div className="containerChampionTierList">
      {championsTier.map((champTier, i) => (
        <CampeonesBordeTFTMeta
          key={i}
          meta={champTier}
          nombreCampeon={champTier.Campeon}
          imgCampeon={champTier.ImgCampeon}
          tresEstrellas={champTier.imgEstrellas}
          titulo={champTier.Titulo}
          IconoSuperior={champTier.imgRecuadro}
          coste={champTier.CosteCampeon}
          alternativa={alternativa}
          index={index}
          i={i}
          handleSelect={handleSelect}
          selected={selected}
          selectedAlternativa={selectedAlternativa}
        />
      ))}
      <style>{`
        .containerChampionTierList {
              display: flex;
              position: relative;
              width: 100%;
              box-sizing: border-box;
              align-items: center;
              justify-content: flex-start;
          }

        .imgChampionTierList:hover {
            cursor: pointer;
            transform: scale(1);
        }

        .imgChampionTierList {
            width: var(--number-champ-meta);
            height: auto;
            box-sizing: border-box;
            transition: 0.5s;
            transform: scale(0.9);
        }

        .imgSelected {
            filter: grayscale(0%);
            -webkit-filter: grayscale(0%);
            transform: scale(1);
            transition: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default ContainerChampionTierList;
