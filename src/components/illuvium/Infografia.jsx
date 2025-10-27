import style from "./Infografia.module.css";
const Infografia = ({data})=>{
  return (
    <div className={style.container}>
      {/* posicionamiento */}
      <div className={style.containerImgPosicionamiento}>
        <img 
        className={style.imgPosicionamiento}
          src={`https://api.guiadeparche.com/`+data.imgPosicionamiento}></img>
      </div>
      {/* Carries & Augments Itemization */}
        <span className={style.textoCarries}>CARRIES & AUGMENT'S ITEMIZATION</span>
      <div className={style.containerCarriesItemization}>
      {
        data.carriesItemization.map((carrie, i)=>{
          return (
            <div
              key={`containerCarries${i}`}
              className={style.containerCarriesInfo}
            >
              <div
                className={style.containerCarrie}
              >
                <img
                  className={style.imgCarrie}
                  src={"https://api.guiadeparche.com"+data.carriesItemization[i]}></img>
              </div>
              <div className={style.containerCarriesAugments}>
                {
                  data.basicsAugments?.[i]?.length > 0 && 
                  data.basicsAugments[i].map((basicAugment, ba)=>{
                    if(basicAugment){
                      return (
                        <div key={`containerBasicAugments${ba}`} className={style.containerAugmentsInfoBasico}>
                        <img 
                          className={style.imgAumentoBasico}
                          src={`https://api.guiadeparche.com/illuvium/assets/aumentos/basicos/`+basicAugment}></img>
                        <span className={style.textoAumentoBasico}>
                          {basicAugment.replace("T_","").replace("_preview","").replace(".png","").replaceAll("_"," ")}
                        </span>
                      </div>
                    )
                  }
                  })
                }
                {
                  data.legendsAugments?.[i]?.length > 0 && 
                  data.legendsAugments?.[i].map((legendAugment, ba)=>{
                    if(legendAugment){
                      return (
                        <div key={`containerLegendAugments${ba}`} className={style.containerAugmentsInfoLegendario}>
                        <img 
                          className={style.imgAumentoLegendario}
                          src={`https://api.guiadeparche.com/illuvium/assets/aumentos/legendarios/`+legendAugment}></img>
                        <span className={style.textoAumentoLegendario}>
                          {legendAugment.replace("T_LegendaryAugment_","").replace(".png","").replaceAll("_"," ")}
                        </span>
                      </div>
                    )
                  }
                  })
                }
              </div>
            </div>
          )
        })
      }
      </div>
      <div className={style.containerSuitsDrones}>
        <div className={style.containerSuitAmplifiers}>
          {/* SuitAmplifiers */}
          <span className={style.TextoSuitAmplifiers}>Suits Amplifiers</span>
          <div className={style.containerSuits}>
          {
            data.suitAmplifier.map((suit,k)=>{
              return (
                <div key={`suitAmplifiers${k}`} className={style.containerSuit}>
                  <img 
                  className={style.suitAmplifierImg}
                  src={`https://api.guiadeparche.com/illuvium/assets/suits_amplifiers/`+suit}
                  >
                  </img>
                  <span className={style.textoSuit}>{suit.replace("suit_amplifier_","").replace(".PNG","").replace("_"," ")}</span>
                </div>
              )
            })
          }
          </div>
        </div>
        {/* Weapon Amplifier Augments */}
        <div className={style.containerWeaponAmplifier}>
          <span className={style.TextoSuitAmplifiers}>Weapon Amplifier</span>
          <div className={style.containerWeaponAmplifierImg}>
              <img 
              className={style.weaponAmplifierImg}
              src={`https://api.guiadeparche.com/illuvium/assets/weapons_amplifiers/`+data.weaponAmplifier}
              >
              </img>
              <span className={style.textoSuit}>{data.weaponAmplifier.replaceAll("weapon_amplifier_"," ").replace(".webp","")}</span>
          </div>
        </div>
        {/* Drones Augments */}
        <div className={style.containerDronesAumgents}>
          <span className={style.TextoSuitAmplifiers}>Drones Augment</span>
          <div className={style.containerDrones}>
          {
            data.droneAugment.map((drone, k)=>{
              return (
                <div key={`droneAugment${k}`} className={style.containerDroneImg}>
                  <img 
                  className={style.droneAugmentImg}
                  src={`https://api.guiadeparche.com/illuvium/assets/drones_augments/`+drone}
                  >
                  </img>
                  <span className={style.textoSuit}>{drone.replaceAll("_"," ").replace(".png","")}</span>
                </div>
              )
            })
          }
          </div>
        </div>

      </div>

      {/*Gameplan */}
      <div className={style.containerGameplan}>
        <span className={style.TextoGameplan}>
          GAMEPLAN: STRATEGY, CARRY & AUGMENT'S ITEMIZATION
        </span>
        <div className={style.containerEarlyMidLate}>
          { data.earlyGame && 
            <div className={style.containerGame}>
            <span>EARLY GAME:</span>
            <span>{data.earlyGame}</span>
          </div>}
          { data.midGame && 
            <div className={style.containerGame}>
            <span>MID GAME:</span>
            <span>{data.midGame}</span>
          </div>}
          { data.lateGame &&
            <div className={style.containerGame}>
            <span>LATE GAME:</span>
            <span>{data.lateGame}</span>
          </div>}

        </div>

      </div>
    </div>
  )
}

export default Infografia;