import styles from "./InfografiaSpotify.module.css"
const InfografiasSpotifyTopArtistas = ({backgroundRef, datos, numberOfArtist, datosArtistas, artistasInfo, monthlyListener}) =>{
const cantidadDeLogos = `calc(100% / 4)`;
  return (
    <div ref={backgroundRef} className={styles.infografiaContainer}>
      <div className={styles.header}>
        <span className={styles.titulo }>{datos.titulo || "TOP 10 ARTISTAS VENEZOLANOS"}</span>
        <span className={styles.titulo2 }>{datos.titulo2 || "MÁS ESCUCHADOS EN SPOTIFY"}</span>
      </div>
      <span className={styles.fecha}>{"OYENTES MENSUALES EN LOS ÚLTIMO 30 DÍAS EN SPOTIFY 🟢"}</span>
      <div className={styles.containerAllArtist}>
       {
          Object.keys(artistasInfo).length > 0 && Object.entries(artistasInfo).map(([key,value], index)=>{
            if(artistasInfo[key] && artistasInfo[key].images?.length > 0){
              return (
                <div 
                key={`Elemento-${index}`} 
                className={styles.containerArtista} 
                style={{ height: `calc(100% / ${numberOfArtist} * 2)`, background: `linear-gradient(#737373, #171717)` }}
                >
                {/* <img 
                  src={value?.bannerUrl} 
                  className={styles.backgroundArtista} 
                  style={{
                    transform: `
                      translate(
                        calc(-50% + ${datosArtistas[index]?.offsetX || 0}%),
                        calc(-50% + ${datosArtistas[index]?.offsetY || 0}%)
                      )
                      scale(${datosArtistas[index]?.zoom || 1})
                    `
                  }}
                  /> */}
                <div className={styles.containerNumeracion}>
                  {Number(key) + 1}
                </div>
                <div className={styles.containerPerfilArtista}>
                  <div className={styles.circle}>
                    <img 
                      src={value?.images?.[0]?.url} 
                      className={styles.perfilArtista}
                    />
                  </div>
                </div>
                <div className={styles.containerInfoArtista}>
                  <span className={styles.nameOfArtist}>{(value?.name).toUpperCase()}</span>
                  <span className={styles.monthlyListener}>{monthlyListener?.[index]}</span>
                </div>
              </div>
            )
          }
        })
       }
      </div>
      <div className={styles.footer}>
        {/* <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
         <img className={styles.logo} src="/redes/Spotify_logo.png" alt=""></img>
        </div> */}
         <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
          <img className={styles.logo} src="/redes/indus3Pro_logo.png" alt=""></img>
        </div>
        <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
         <img className={styles.logo} src="/redes/La_Mega_recortado.png" alt=""></img>
        </div>
        <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
         <img className={styles.logo} src="/redes/logo_miragua_azul_recortado.png" alt=""></img>
        </div>
         <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
          <img className={styles.logo} src="/redes/logo_santa_teresa_texto.png" alt=""></img>
        </div>
      </div>
    </div>
  )
}

export default InfografiasSpotifyTopArtistas
// style={{ height:  height: `calc(100% / ${Object.keys(artistasInfo).length})` }}