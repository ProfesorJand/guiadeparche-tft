import style from "./css/TierListDota2.module.css";
const TierListDota2= ({localMetaDota2, backgroundRef, rols, version, titulo, logoMovilnet})=>{
  return (
    <div className={style.container} ref={backgroundRef}>
      <div className={style.imgBackgroundWrapper}>
        <img className={style.imgBackground} src={"/dota-2/background.jpg"} alt={"background de fondo"}></img>
      </div>
      <div className={style.header}>
        <div className={style.cLogoV}>
          <img
            src={"/dota-2/logo-dota-2.png"}
            className={style.logoV}
          />
        </div>
        <div className={style.title}>
          {titulo}
        </div>
        <div className={style.cVersion}>
          {version}
        </div>
      </div>
      <div className={style.cRols}>
        <div className={style.rols}>
          {rols.map((rol)=>{
            return (
              <div key={`rols${rol}`} className={style.rol}>
                {/* <span>Best</span> colocar iconos*/}
                <span>{rol}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className={style.body}>
        <div className={style.verticalLine}>
          {
            Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className={style.vline}
                style={{
                  // left: `calc(((100% / 5) - ${(i+1)*5/2}px) * ${i}) )`,
                  // left: `calc((((100% / 5) *${i}) - 5/2px))`,
                }}
              />
            ))
          }
          {/* <span className={style.vline} style={{left:"0px"}}></span>
          <span className={[style.vline, style.vleft].join(" ")}></span>
          <span className={[style.vline, style.vleft].join(" ")}></span>
          <span className={[style.vline, style.vmid].join(" ")}></span>
          <span className={[style.vline, style.vright].join(" ")}></span> */}
        </div>
        {/* <div className={style.bordeIzqDer}>
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
        </div> */}
        <div className={style.cMetaByMapAgent}>
          {Object.keys(localMetaDota2).map((rol, iRol)=>{
            return (
              <div key={`hero${iRol}`} className={style.cRol}> {/* cambiar clase a cRol */}
                {localMetaDota2?.[rol].length > 0 && localMetaDota2?.[rol].map((hero, iHero)=>{
                  return (
                    <div key={`hero${iHero}`} className={style.cAgent}>
                      <img 
                        src={hero?.image}
                        className={style.imgAgent}
                      />
                      <div className={[style.bgBlurred, style.agente].join(" ")}>
                        <p className={style.nameInBlur}>
                          <span class={style.truncated}>{hero?.name}</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <div className={style.footer}>
            {logoMovilnet && <img src="/tft/assets/logoMovilnet-e-letras-blancas.png" alt="logo Movilnet" ></img>}
            <img src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" alt="logo Jupeson" style={{transform:"scale(0.6)"}}></img>
      </div>
    </div>
  )
}

export default TierListDota2