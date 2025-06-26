import style from "./css/TierListDota2.module.css";
const TierListDota2= ({localMetaDota2, backgroundRef, rols, version, titulo, logoMovilnet})=>{
  return (
    <div className={style.container} ref={backgroundRef}>
      <div className={style.imgBackgroundWrapper}>
        <img className={style.imgBackground} src={"/valorant/bgTierList2.webp"} alt={"background de fondo"}></img>
      </div>
      <div className={style.header}>
        <div className={style.cLogoV}>
          <img
            src={"/valorant/logos/v.png"}
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
                <p>{rol}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className={style.body}>
        <div className={style.verticalLine}>
          <span className={[style.vline, style.vleft].join(" ")}></span>
          <span className={[style.vline, style.vmid].join(" ")}></span>
          <span className={[style.vline, style.vright].join(" ")}></span>
        </div>
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
        <div className={style.cMetaByMapAgent}>
          {Object.keys(localMetaDota2).map((rol, iRol)=>{
            return (
              <div key={`hero${iRol}`} className={style.cRol}> {/* cambiar clase a cRol */}
                {localMetaDota2?.[rol].length > 0 && localMetaDota2?.[rol].map((hero, iHero)=>{
                  return (
                    <div key={`hero${hero?.id}`} className={style.cAgent}>
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
            <img src="/valorant/logos/text-white.png" style={{transform:"scale(1)"}} alt="logo League of Legends"></img>
      </div>
    </div>
  )
}

export default TierListDota2