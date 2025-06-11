import style from "./css/TierListValorant.module.css";
const TierListValorant= ({localMetaValorant, backgroundRef})=>{
  return (
    <div className={style.container} ref={backgroundRef}>
      <div className={style.imgBackgroundWrapper}>
        <img className={style.imgBackground} src={"valorant/bgTierList2.webp"} alt={"background de fondo"}></img>
      </div>
      <div className={style.header}>
        <div className={style.cLogoV}>
          <img
            src={"valorant/logos/v.png"}
            className={style.logoV}
          />
        </div>
        <div className={style.title}>
          TOP RANKED LINEUPS - TIER S+
        </div>
        <div className={style.cVersion}>
          10.10
        </div>
      </div>
      <div className={style.body}>
        <div className={style.bordeIzqDer}>
          <div className={[style.cBox, style.firstLine].join(" ")}>
            <div className={style.box}>
              <span className={[style.line, style.topLeft].join(" ")}></span>
              <span className={[style.line, style.topRight].join(" ")}></span>
              <span className={[style.line, style.bottomLeft].join(" ")}></span>
              <span className={[style.line, style.bottomRight].join(" ")}></span>
            </div>
          </div>
          <div className={[style.cBox, style.secondLine].join(" ")}>
            <div className={style.box}>
              <span className={[style.line, style.topLeft].join(" ")}></span>
              <span className={[style.line, style.topRight].join(" ")}></span>
              <span className={[style.line, style.bottomLeft].join(" ")}></span>
              <span className={[style.line, style.bottomRight].join(" ")}></span>
            </div>
          </div>
          <div className={[style.cBox, style.thirdLine].join(" ")}>
            <div className={style.box}>
              <span className={[style.line, style.topLeft].join(" ")}></span>
              <span className={[style.line, style.topRight].join(" ")}></span>
              <span className={[style.line, style.bottomLeft].join(" ")}></span>
              <span className={[style.line, style.bottomRight].join(" ")}></span>
            </div>
          </div>
        </div>
        {Object.keys(localMetaValorant).map((map,iMap)=>{
          if(!localMetaValorant[map].every(element => element === null)){
          return (
          <div key={`cMetaByMap${iMap}`} className={style.cMetaByMap}>
            <div className={style.cMap}>
              <img
                src={`valorant/maps/${map}.webp`}
                className={style.imgMap}
              />
              <div className={style.bgBlurred}>
                <p className={style.nameInBlur}>{map?.charAt(0).toUpperCase()+map?.slice(1)}</p>
              </div>
            </div>
            <div className={style.cMetaByMapAgent}>
              {
                localMetaValorant[map].map((agent, iAgent)=>{
                  return (
                    <div key={`agent${iMap}${iAgent}`} className={style.cAgent}>
                      <img 
                        src={`valorant/agents/${agent}-square.webp`}
                        className={style.imgAgent}
                      />
                      <div className={style.bgBlurred}>
                        <p className={style.nameInBlur}>{agent?.charAt(0).toUpperCase()+agent?.slice(1)}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>)
          }
        })}
      </div>
      <div className={style.footer}>
            <img src="/tft/assets/logoMovilnet-e-letras-blancas.png" alt="logo Movilnet" ></img>
            <img src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" alt="logo Jupeson" style={{transform:"scale(0.6)"}}></img>
            <img src="/valorant/logos/text-white.png" style={{transform:"scale(1)"}} alt="logo League of Legends"></img>
      </div>
    </div>
  )
}

export default TierListValorant