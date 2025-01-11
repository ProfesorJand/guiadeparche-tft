import React, { useEffect, useState } from 'react';
import style from './Adsense.module.css';

const AdComponent = ({ direction = '', dimension = 'cuadrado', numeracion = 0 }) => {
  const [pass, setPass] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPass(true),5000); // Aumenta a 5 segundos
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (pass) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [pass]);

  const handleAdStatus = () => {
    const ads = document.querySelectorAll('ins.adsbygoogle');
    ads.forEach((ad) => {
      const adStatus = ad.getAttribute('data-ad-status');
      if (adStatus !== 'filled') {
        const parent = ad.closest(`.${style.adsense_container}`);
        if (parent) parent.style.display = 'none';
      }
    });
  };

  useEffect(() => {
    handleAdStatus();
  }, [pass]);

  let adsenseID;
  let styleINS = { display: 'block', width: '100%' };

  switch (dimension) {
    case 'vertical-derecha':
    case 'vertical-izquierda':
      adsenseID = 7127054478;
      styleINS.height = '600px';
      styleINS.minWidth = '250px';
      break;
    case 'horizontal':
      adsenseID = 3557613428;
      styleINS.maxHeight = '100px';
      styleINS.minWidth = '100px';
      break;
    case 'cuadrado':
    default:
      adsenseID = 4837474033;
      styleINS.height = '300px';
      styleINS.minWidth = '300px';
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
            key={`adsense-${numeracion}-left`}
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
            key={`adsense-${numeracion}-right`}
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
            key={`adsense-${numeracion}-horizontal`}
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
            key={`adsense-${numeracion}-cuadrado`}
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
