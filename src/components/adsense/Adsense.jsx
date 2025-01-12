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
      const checkAdsByGoogle = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkAdsByGoogle); // Detiene el intervalo una vez que el script está disponible
          (window.adsbygoogle = window.adsbygoogle || []).push({}); // Inicializa el anuncio
  
          // const handleAdStatus = () => {
          //   const ads = document.querySelectorAll('ins.adsbygoogle');
          //   ads.forEach((ad) => {
          //     const adStatus = ad.getAttribute('data-ad-status');
          //     const parent = ad.parentNode;
          //     if (parent) {
          //       if (adStatus !== 'filled') {
          //         parent.style.maxHeight = '1px';
          //       } else {
          //         parent.style.minHeight = '100px';
          //         parent.style.maxHeight = '600px';
          //       }
          //     }
          //   });
          // };
  
          // handleAdStatus();
        }
      }, 100); // Verifica cada 100ms
      return () => clearInterval(checkAdsByGoogle); // Limpia el intervalo cuando se desmonte el componente
    }
  }, [pass]);

  let adsenseID;
  let styleINS = { display: 'flex', width: '100%', minWidth: "90px", minHeight:"90px", justifyContent: "center", maxWidth: "100%"};

  switch (dimension) {
    case 'vertical-derecha':
    case 'vertical-izquierda':
      adsenseID = 7127054478;
      styleINS.height = '600px';
      styleINS.minWidth = '100px';
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

  if(pass){
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
              data-ad-format="horizontal"
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
  }
};

export default AdComponent;
