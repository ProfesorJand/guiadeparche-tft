import React from 'react';
import style from "./css/ImgTier.module.css";

const ImgTier = ({ llave, index }) => {
  let src = `https://guiadeparche.com/tftdata/Set11/metaComps/tier/Tier-${llave}.jpg`;

  if (llave.includes("Alternativa")) {
    const valor = llave.split("-")[1];
    src = `https://guiadeparche.com/tftdata/Set11/metaComps/tier/Tier-${valor}.jpg`;
  }

  return (
    <div className={style.Tier}>
      <img 
        src={src}
        alt={`TFT Tier-${llave}`}
        className={style.imgTier}
        loading="lazy"
      />
    </div>
  );
};

export default ImgTier;
