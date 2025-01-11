import React, { useEffect, useState } from 'react';
import style from './Adsense.module.css';

const AdComponent = ({ direction = '', dimension = 'cuadrado', numeracion = 0 }) => {
  const [pass, setPass] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPass(true),10000); // Aumenta a 10 segundos
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (pass) {
      // Activa el script de adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log({window:window.adsbygoogle})
      // Verifica el estado de los anuncios
      const handleAdStatus = () => {
        const ads = document.querySelectorAll('ins.adsbygoogle');
        ads.forEach((ad) => {
          const adStatus = ad.getAttribute('data-ad-status');
          if (adStatus !== 'filled') {
            const parent = ad.closest(`.${style.adsense_container}`) || ad.closest(`.${style.adsense_container_relative}`);
            console.log({parent})
            if (parent) {
              parent.style.maxHeight = '1px';
            }
          }
        });
      };

      handleAdStatus();
    }
  }, [pass]);

  let adsenseID;
  let styleINS = { display: 'block', width: '100%', minWidth: "90px", minHeight:"90px" };

  switch (dimension) {
    case 'vertical-derecha':
    case 'vertical-izquierda':
      adsenseID = 7127054478;
      styleINS.height = '600px';
      styleINS.minWidth = '250px';
      styleINS.maxWidth = "100%"
      break;
    case 'horizontal':
      adsenseID = 3557613428;
      styleINS.maxHeight = '100px';
      styleINS.minWidth = '100px';
      styleINS.maxWidth = "100%"
      break;
    case 'cuadrado':
    default:
      adsenseID = 4837474033;
      styleINS.height = '300px';
      styleINS.minWidth = '300px';
      styleINS.maxWidth = "100%"
      break;
  }

  return (
    <>
      {dimension === 'vertical-izquierda' && (
        <div
          className={`${style.adsense_container} ${style.adsense_vertical} ${style.left}`}
          style={{ left: 0 }}
        >
          <ins
            data-key={`adsense-${numeracion}-left`}
            className="adsbygoogle"
            style={styleINS}
            data-ad-client="ca-pub-6116944495372863"
            data-ad-slot={adsenseID}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}
      {dimension === 'vertical-derecha' && (
        <div
          className={`${style.adsense_container} ${style.adsense_vertical} ${style.right}`}
          style={{ right: 0 }}
        >
          <ins
            data-key={`adsense-${numeracion}-right`}
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
        <div className={`${style.adsense_container_relative} ${style.adsense_horizontal}`}>
          <ins
            data-key={`adsense-${numeracion}-horizontal`}
            className="adsbygoogle"
            style={styleINS}
            data-ad-client="ca-pub-6116944495372863"
            data-ad-slot={adsenseID}
            data-ad-format="fluid"
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}
      {dimension === 'cuadrado' && (
        <div className={`${style.adsense_container_relative} ${style.adsense_cuadrado}`}>
          <ins
            data-key={`adsense-${numeracion}-cuadrado`}
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
