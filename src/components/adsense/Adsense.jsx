import React, { useEffect, useState } from 'react';
import style from "./Adsense.module.css"

const AdComponent = ({ direction="", dimension="cuadrado", numeracion=0 }) => {

  const [pass, setPass] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setPass(true), 10000); // Aumenta a 10 segundos
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unfilledAds = document.querySelectorAll('ins.adsbygoogle[data-ad-status="unfilled"]').length;
    if (pass && unfilledAds === 0) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [pass]);

  useEffect(() => {
    const ads = document.querySelectorAll("ins.adsbygoogle");

ads.forEach((ad) => {
    // Verifica si el elemento tiene el atributo data-ad-status
    const adStatus = ad.getAttribute("data-ad-status");
    
    // Si el atributo no es "filled" o está ausente, oculta el elemento padre
    if (adStatus !== "filled") {
      if (ad.parentNode && ad.parentNode.style) {
        ad.parentNode.style.display = "none";
      }
    }
    });

  }, [pass]);

  let right;
  let left;
  if (direction === 'left') {
    left = 0;
  } else if(direction === 'right') {
    right = 0;
  }

  let aspectRatio;
  if (dimension === 'cuadrado') {
    aspectRatio = 1 / 1;
  }
  if (dimension === 'horizontal') {
    aspectRatio = 1.91 / 1;
  }
  if (dimension === 'vertical-izquierda' || dimension === "vertical-derecha") {
    aspectRatio = 1 / 1.91;
  }

  let styleINS = { display: 'block', width: '100%' };
  let adsenseID;

  switch (dimension) {
    case 'vertical-derecha':
      adsenseID = 7127054478;
      styleINS.height = '600px';
      styleINS.top = "calc(var(--height-header) + 16px)";
      styleINS.position = "sticky";
      break;
    case 'vertical-izquierda':
    adsenseID = 7127054478;
    styleINS.height = '600px';
    styleINS.top = "calc(var(--height-header) + 16px)";
    styleINS.position = "sticky";
    break;
    case 'horizontal':
      adsenseID = 8326664156;
      styleINS.height = '150px';
      styleINS.minWidth = "250px";
      styleINS.position = "relative"
      break;
    case 'cuadrado':
    default:
      adsenseID = 4837474033;
      styleINS.height = '300px';
      break;
  }

  

  return (
    <>
      {(dimension === 'vertical-izquierda' || dimension === "vertical-derecha") && (
        <div className={[style.adsense_container, style.adsense_vertical].join(" ")} style={direction === "right" ? {right:0}: {left:0}}>
          <ins
              key={`adsense-${numeracion}-${direction}`}
              className="adsbygoogle"
              style={styleINS}
              data-ad-client="ca-pub-6116944495372863"
              data-ad-slot={adsenseID}
              data-ad-format="auto"
              data-full-width-responsive="true"
              ></ins> 
        </div>
      )}

      {dimension === 'horizontal' && (
        <div className={[style.adsense_container_relative, style.adsense_horizontal].join(" ")}>
          <ins
            key={`adsense-${numeracion}-${direction}`}
            className="adsbygoogle"
            style={styleINS}
            data-ad-client="ca-pub-6116944495372863"
            data-ad-slot={adsenseID}
            data-ad-format="auto"
            data-full-width-responsive="true"

            ></ins>
        </div>
      )}

      {dimension === 'cuadrado' && (
        <div className={[style.adsense_container_relative, style.adsense_cuadrado].join(" ")}>
          <ins
            key={`adsense-${numeracion}-${direction}`}
            className="adsbygoogle"
            style={styleINS}
            data-ad-client="ca-pub-6116944495372863"
            data-ad-slot={adsenseID}
            data-ad-format="auto"
            data-full-width-responsive="true"
            ></ins>
        </div>
      )}

    </>
  );
};

export default AdComponent;
