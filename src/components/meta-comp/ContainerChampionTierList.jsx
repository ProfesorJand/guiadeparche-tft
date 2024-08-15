import React from 'react';
import CampeonesBordeTFTMeta from './CampeonesBordeTFTMeta.jsx';
import styles from "./css/ContainerChampionTierList.module.css";

const ContainerChampionTierList = ({ championsTier, index, pbe, alternativa, handleSelect, selected, selectedAlternativa }) => {
  return (
    <div className={styles.containerChampionTierList}>
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
    </div>
  );
};

export default ContainerChampionTierList;
