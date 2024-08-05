import React from 'react';

const ImgTier = ({ llave, index }) => {
  let src = `https://guiadeparche.com/tftdata/Set11/metaComps/tier/Tier-${llave}.jpg`;

  if (llave.includes("Alternativa")) {
    const valor = llave.split("-")[1];
    src = `https://guiadeparche.com/tftdata/Set11/metaComps/tier/Tier-${valor}.jpg`;
  }

  return (
    <div className="Tier">
      <img 
        src={src}
        alt={`TFT Tier-${llave}`}
        className="imgTier"
        loading="lazy"
      />
      <style>{`
        .Tier {
          margin: 0;
          font-weight: 600;
          font-size: xx-large;
          width: var(--number-champ-meta);
          display: block;
        }
        .imgTier {
            display: flex;
            position: relative;
            width: 100%;
            height: auto;
            box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default ImgTier;
