import React from 'react';
import { BorderColorCampeon } from '../../json/updates/constantesCampeones';
import styles from "./css/CampeonesBordeTFTMeta.module.css";

const CampeonesBordeTFTMeta = ({ titulo, tresEstrellas, IconoSuperior, imgCampeon, coste, alternativa, handleSelect, selected, selectedAlternativa }) => {
  const borderColor = BorderColorCampeon[coste];

  return (
    <div
      className={[
        styles.imgChampionTierList,
        selected?.titulo === titulo && selected?.open ? styles.imgSelected : '',
        selectedAlternativa?.titulo === titulo && selectedAlternativa?.open ? styles.imgSelected : ''
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
      <div className={styles.borderChampion} style={{ borderColor }}>
        <img
          src={imgCampeon}
          alt={titulo}
          className={styles.imgChampionBorderTierList}
          width={100}
          height={100}
          loading={alternativa ? "lazy": "eager"}
        />
        {tresEstrellas && (
          <img
            src="https://guiadeparche.com/tftdata/assets/3-estrellas.webp"
            alt="3-estrella"
            className={styles.tresEstrellas}
            width={100}
            height={100}
            loading={alternativa ? "lazy": "eager"}
          />
        )}
        {IconoSuperior && (
          <div className="containerUpperIcon">
            <img
              src={IconoSuperior}
              alt="Icono de identificacion"
              className={styles.iconoSuperior}
              width={100}
              height={100}
              loading={alternativa ? "lazy": "eager"}
              style={{ backgroundColor: borderColor }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampeonesBordeTFTMeta;
