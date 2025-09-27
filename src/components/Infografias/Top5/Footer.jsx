import Style from './InfografiaTop5.module.css';
import { Template } from './utils';
const Footer = ({infografia, containerLogosRef})=>{
  console.log(Template.Top5.FooterHeight)
  console.log(infografia.heightContainerFooter)
return (
  <div 
    className={Style.Footer}
    style={{ 
      justifyContent: infografia.justifyContentFooter,
      height:Template.Top5.FooterHeight
    }}
    ref={containerLogosRef}
    >
      {infografia.tieneAsterisco  && infografia.textoAsterisco && 
        <div
          style={{
            height:(infografia.logoJupeson && infografia.textoAsterisco)? "50%": "100%",
            width:"100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <span style={{whiteSpace: "pre-line"}}>
            {infografia.textoAsterisco}
          </span>
        </div>
      }
      {
        (infografia.logoJupeson || infografia.logoMovilnet) && 
        <div
        style={{
          height:(infografia.tieneAsterisco && infografia.textoAsterisco) ? "50%": "100%",
          width:"100%",
          display:"flex",
          position:"relative",
          flexDirection:"row",
          justifyContent:infografia.justifyContentFooter
        }}
        >
          {infografia.logoJupeson && 
            <div
              className={[
                Style.LogoContainer,
              ]}
              style={{
                width: infografia.widthLogoJupeson,
                left: infografia.leftLogoJupeson,
                height:"100%"
              }}
            >
                <img 
                  src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" 
                  alt="Logo" className={Style.Logo} 
                  style={{
                    transform: `scale(${infografia.scaleLogoJupeson})`,
                    height: "auto",
                    width: "100%",
                    objectFit: "contain",
                    opacity: infografia.logoJupesonAlpha,
                    filter: `brightness(${infografia.BrilloLogoJupeson || 1})`
                  }}
                />
            </div>
          }
          {infografia.logoMovilnet && 
            <div
              className={[
                Style.LogoContainer,
              ]}
              style={{
                width: infografia.widthLogoMovilnet,
                height: "100%",
                left: infografia.leftLogoMovilnet,
              }}
            >
              <img src="/tft/assets/logoMovilnet-e-letras-blancas.png" 
                alt="Sponsor" 
                className={Style.Logo}
                style={{
                  transform: `scale(${infografia.scaleLogoMovilnet})`,
                  height: "auto",
                  width: "100%",
                  objectFit: "contain",
                  opacity: infografia.logoMovilnetAlpha,
                  filter: `brightness(${infografia.BrilloLogoMovilnet || 1})`
                }}
              />
            </div>
          }
        </div>
      }
  </div>
)
}

export default Footer;