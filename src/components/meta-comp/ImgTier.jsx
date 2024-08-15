import React from 'react';
import style from "./css/ImgTier.module.css";

const ImgTier = ({ llave, index, alternativa }) => {
  let src = `/Tier-${llave}.png`;

  if (llave.includes("Alternativa")) {
    const valor = llave.split("-")[1];
    src = `/Tier-${valor}.png`;
  }

  return (
    <div className={style.Tier}>
      <img 
        src={src}
        alt={`TFT Tier-${llave}`}
        className={style.imgTier}
        loading={alternativa ? "lazy" : "eager"}
      />
    </div>
  );
};

export default ImgTier;
