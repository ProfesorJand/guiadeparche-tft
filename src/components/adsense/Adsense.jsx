import React, { useEffect, useState } from 'react';

const AdComponent = ({ direction, dimension }) => {

  const [pass, setPass] = useState(false);
  useEffect(()=>{
    setTimeout(() => {
      setPass(true)
    }, 5000);
  },[])

  useEffect(() => {
    if(pass) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [pass]);

  let right;
  let left;
  if (direction === 'left') {
    left = 0;
  } else {
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

  let style = { display: 'block', width: '100%' };
  let adsenseID;

  switch (dimension) {
    case 'vertical-derecha':
      adsenseID = 7127054478;
      style.height = '600px';
      break;
    case 'vertical-izquierda':
    adsenseID = 7127054478;
    style.height = '600px';
    break;
    case 'horizontal':
      adsenseID = 8326664156;
      style.height = '90px';
      break;
    case 'cuadrado':
    default:
      adsenseID = 4837474033;
      style.height = '300px';
      break;
  }

  

  return (
    <div>
      {(dimension === 'vertical-izquierda' || dimension === "vertical-derecha") && (
        <div className={`adsense-container adsense-vertical ${right ? right : left}`}>
          <ins
              className="adsbygoogle"
              style={style}
              data-ad-client="ca-pub-6116944495372863"
              data-ad-slot={adsenseID}
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins> 
        </div>
      )}

      {dimension === 'horizontal' && (
        <div className="adsense-container adsense-horizontal">
          <ins
            className="adsbygoogle"
            style={style}
            data-ad-format="fluid"
            data-ad-layout-key="-f9+4w+7x-eg+3a"
            data-ad-client="ca-pub-6116944495372863"
            data-ad-slot="8326664156"
          ></ins>
        </div>
      )}

      {dimension === 'cuadrado' && (
        <div className="adsense-container adsense-cuadrado">
          <ins
            className="adsbygoogle"
            style={style}
            data-ad-client="ca-pub-6116944495372863"
            data-ad-slot="4837474033"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}
      <style>{`
        .adsense-container {
          display: flex;
          position: relative;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 1rem 0;
        }
        .adsense-vertical {
          display: none;
        }
        .adsense-horizontal {
          display: flex;
        }
        @media only screen and (min-width: 900px) {
          .adsense-container {
            position: fixed;
            width: 25%;
            right: ${right};
          }
          .right{
            right: ${right};
          }
          .left{
           left: ${left};
           }
          .adsense-vertical {
            display: flex;
            height: calc(100% - 10rem);
          }
          .adsense-horizontal {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdComponent;
