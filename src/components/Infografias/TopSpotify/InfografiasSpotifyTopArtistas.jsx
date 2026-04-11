import styles from "./InfografiaSpotify.module.css"
const InfografiasSpotifyTopArtistas = ({sourceType, backgroundRef, datos,numberOfTopArtist, startNumberOfArtist, datosArtistas, artistasInfo, monthlyListener, musicInfo, topMusic}) =>{
const cantidadDeLogos = `calc(100% / 3)`;
const fecha = new Date();
const mes = fecha.toLocaleDateString('es-ES', { month: 'long' }); // Ejemplo: "marzo"
const dia = fecha.getDate();
const año = fecha.getFullYear();
  return (
    <div ref={backgroundRef} className={styles.infografiaContainer}>
      <div className={styles.containerFondo}>
        {
          sourceType === "venezolanos" ? (
            <img className={styles.fondo} src="/indus3/fondo-de-artistas-venezolanos-spotify.png"></img>
          ) : (
            <img className={styles.fondo} src="/indus3/fondo-global.webp"></img>
          )
        }
      </div>
      <div className={styles.header}>
        <div className={styles.containerTitulo}>
          <span className={styles.titulo }>{datos.titulo}</span>
          <span className={styles.titulo2 }>{datos.titulo2}</span>
        </div>
        <div className={styles.containerFecha}>
          <div className={styles.blurryBackgroundFecha}></div>
          <span className={styles.fecha}>{datos.fecha} {" "} <img className={styles.spotifyMiniLogo} src="/redes/Spotify_Primary_Green.png"></img></span>
        </div>
      </div>
      <div className={styles.containerAllArtist}>
       {
          Object.keys(artistasInfo).length > 0 && Object.entries(artistasInfo).map(([key,value], index)=>{
            if(artistasInfo[key] && artistasInfo[key].images?.length > 0){
              return (
                <div 
                key={`Elemento-${index}`} 
                className={styles.containerArtista} 
                style={{ height: `calc(100% / ${numberOfTopArtist} * 2)` }}
                >
                  <div className={styles.blurryBackgroundArtist}>
                  </div>
                <div className={styles.containerNumeracion}>
                  <span className={styles.numeracion}>
                    {Number(key) + startNumberOfArtist}
                  </span>
                </div>
                <div className={styles.containerPerfilArtista}>
                  <div className={styles.circle}>
                    <img 
                      src={value?.nuevaImagen || value?.images?.[0]?.url} 
                      className={styles.perfilArtista}
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
                <div className={`${styles.containerInfoArtista} ${topMusic ? styles.containerInfoArtistaMusic : ""}`}>
                  {
                    topMusic ? (
                      <>
                        <div className={styles.containerNameOfSong}>
                          <span 
                            className={styles.nameOfSong}
                            style={{ 
                              fontSize: musicInfo?.[index]?.name?.length < 22 ? '55cqh' : 
                                        musicInfo?.[index]?.name?.length < 35 ? '40cqh' : 
                                        '40cqh' 
                            }}
                          >
                            {musicInfo?.[index]?.name.toUpperCase()}
                          </span>
                        </div>
                        <div className={styles.containerNameOfArtistMusic}>
                          <span className={`${styles.nameOfArtist} ${styles.nameOfArtistMusic}`}>
                            {(value?.name).toUpperCase()}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className={`${styles.containerNameOfArtist}`}>
                        <span className={styles.nameOfArtist}>
                          {(value?.name).toUpperCase()}
                        </span>
                      </div>
                    )
                  }

                  <div className={styles.containerMonthlyListener}>
                    <span className={`${styles.monthlyListener} ${topMusic ? styles.monthlyListenerMusic : ""}`}>
                      {monthlyListener?.[index]}
                    </span>
                  </div>
                </div>
              </div>
            )
          }
        })
       }
      </div>
      <div className={styles.footer} style={{ padding: sourceType !== "venezolanos" ? "3.5rem 5px" : "" }}>
        {
          sourceType !== "venezolanos" && 
          <span className={styles.footerText}>(*) con al menos un tema en el top 50 global de Spotify</span>
        }
        <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
         <img className={styles.logo} src="/redes/Spotify_logo.png" alt=""></img>
        </div>
         <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
          <img className={styles.logo} src="/indus3/indus3-logo.png" alt=""></img>
        </div>
        {/* <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
         <img className={styles.logo} src="/redes/La_Mega_recortado.png" alt=""></img>
        </div>
        <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
         <img className={styles.logo} src="/redes/logo_miragua_azul_recortado.png" alt=""></img>
        </div>
         <div className={styles.containerLogo} style={{width: cantidadDeLogos}}>
          <img className={styles.logo} src="/redes/logo_santa_teresa_texto.png" alt=""></img>
        </div> */}
      </div>
    </div>
  )
}

export default InfografiasSpotifyTopArtistas
