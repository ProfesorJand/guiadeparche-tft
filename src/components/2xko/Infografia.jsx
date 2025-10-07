import LogoGuiadeparche from "@components/logo/LogoGuiadeparche";
import style from "./Infografia.module.css"
const Infografia = ({meta2xko, titulo, version, logoMovilnet, logoGuiadeparche, backgroundRef, admin})=>{
  const urlImgBackground= "/2xko/fondos/Background_RedV2.png";
  const urlImgBackground2 = "/2xko/fondos/Background_Red.png";
  console.log({meta2xko})
  return (
    <div className={style.container} ref={backgroundRef}>
      {/* Imagen Background */}
      <img className={style.imgBackground}
      src={urlImgBackground} 
      alt={""}/>
      
      {/* Header */}
      <div className={style.header}>
        <img 
            src="/2xko/logo/2xko-verde.webp" 
            alt="Logo" 
            className={style.imgLogo2xko}
          />
        <span className={style.titulo}>{titulo}</span>
        <span className={style.version}>{version}</span>
      </div>

      {/* Contenido */}
      <div className={style.containerInfo}>

      {
        Object.keys(meta2xko).map((tier, i)=>{
          return(
            <div className={[style.infoMetaContianer,  i % 2 === 0 ? style.infoMetaContianerImpar : style.infoMetaContianerPar].join(" ")}>
              {/*imagen tier*/}
              <div className={style.containerTier}>
                <img
                  src={`/tiers/Tier-${tier}.webp`}
                  className={style.imgTier}
                  ></img> 
              </div>
              <div 
                className={[style.containerChamps,  i % 2 === 0 ? style.containerChampsImpar : style.containerChampsPar].join(" ")}
                style={{
                      alignItems: meta2xko[tier].fuse ? "flex-end" : "center"
                }}
                >
                {/* Lineas */}
                <div className={style.verticalLine}>
                    <span className={[style.vline, style.vline1].join(" ")}></span>
                    <span className={[style.vline, style.vline2].join(" ")}></span>
                    <span className={[style.vline, style.vline3].join(" ")}></span>
                    <span className={[style.vline, style.vline4].join(" ")}></span>
                    <span className={[style.vline, style.vline5].join(" ")}></span>
                    <span className={[style.hline, style.hline1].join(" ")}></span>
                    <span className={[style.hline, Object.keys(meta2xko).length === (i+1) && style.hline2].join(" ")}></span>
                    <span className={[style.hline, style.hline3].join(" ")}></span>
                    <span className={[style.hline, Object.keys(meta2xko).length === (i+1) && style.hline4].join(" ")}></span>

                </div>
              {
                meta2xko[tier].map((data, posicion)=>{
                  return (
                    <div
                    key={`infografia ${tier} ${posicion}`}
                    className={style.containerInfoChamps}
                    style={{
                      alignItems: data.fuse ? "flex-end" : "center"
                    }}
                    >
                      {/* Campeon Principal */}
                      <div className={style.containerCampeonPrincipal}>
                        <img 
                          src={data.imagenPrincipal}
                          className={style.imgCampeonPrincipal}
                          ></img>
                        {/* nombre del campeon absoluto debajo con fondo oscuro semitransparente con letras blancas*/}
                        <div className={style.nombreCampeonPrincipal}>
                          {data.nombrePrincipal === "Blitzcrank" ? "Blitz" : data.nombrePrincipal}
                        </div>
                      </div>
                      {/* Campeon Secundario */}
                      <div className={style.containerCampeonPrincipal}>
                        <img 
                          src={data.imagenSecundario}
                          className={style.imgCampeonPrincipal}
                          ></img>
                        <div className={style.nombreCampeonPrincipal} >
                        {data.nombreSecundario  === "Blitzcrank" ? "Blitz" : data.nombreSecundario }
                      </div>
                    </div>
                      {/* Fuse */}
                      {
                        data.fuse &&
                        <div className={style.containerImgFuse}>
                          <img 
                            className={style.imgFuse}
                            src={data.imagenFuse}
                            style={{
                              filter: `drop-shadow(1px 1px 5px ${data.fuseColor})`,
                            }}
                            > 
                          </img>
                        </div>
                      }
                    </div>
                  )
                })
              }
              </div>
            </div>
          )
        })
      }
      </div>
      

      {/* Footer */}
      <div className={style.footer}>
        {/* logo jupeson */}
          <div className={style.containerLogoJupeson}>
            <img 
              src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" 
              alt="Logo"
              className={style.imgLogoJupeson}/>
          </div>
        {/* Logo movilnet */}
        {
          logoMovilnet && admin &&
          <div className={style.containerLogoMovilnet}>
            <img 
              src="/tft/assets/logoMovilnet-e-letras-blancas.png" 
              alt="Sponsor" 
              className={style.imgLogoMovilnet}
            />
          </div>}
          {/* Logo Guiadeparche */}
        {
          logoGuiadeparche || !admin &&  
          <div className={style.containerLogoMovilnet}>
            <LogoGuiadeparche/>
          </div>}
      </div>
    </div>
  )
}

export default Infografia;