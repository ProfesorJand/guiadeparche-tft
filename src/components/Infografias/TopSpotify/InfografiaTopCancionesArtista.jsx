import TopArtistaSpotify from "./TopArtistaSpotify"
import styles from "./InfografiaTopCancionesArtista.module.css";
import { useEffect } from "react";

const InfografiaTopCancionesArtista = ({topTracksArtist,urlBannerArtista, numberMonthlyListener, backgroundRef})=>{
  const cantidadDeLogos = "calc(100%/4)"
  const parseMonthlyListener = (value) => {
    if (!value) return 0;

    let cleaned = value.toString().trim().toUpperCase();

    // Reemplazar coma por punto
    cleaned = cleaned.replace(",", ".");

    let multiplier = 1;

    if (cleaned.endsWith("K")) {
      multiplier = 1_000;
      cleaned = cleaned.slice(0, -1);
    } else if (cleaned.endsWith("M")) {
      multiplier = 1_000_000;
      cleaned = cleaned.slice(0, -1);
    } else if (cleaned.endsWith("B")) {
      multiplier = 1_000_000_000;
      cleaned = cleaned.slice(0, -1);
    }

    const number = parseFloat(cleaned);

    return isNaN(number) ? 0 : number * multiplier;
  };

  const tracksOrdenados = topTracksArtist?.tracks
  ?.map((track, index) => ({
    ...track,
    monthlyListenerRaw: numberMonthlyListener[index] || "",
    monthlyListener: parseMonthlyListener(numberMonthlyListener[index])
  }))
  ?.sort((a, b) => b.monthlyListener - a.monthlyListener);



  return (
    <div ref={backgroundRef} className={styles.containerTopCanciones}>
        {/* <img className={styles.imgBanner} src={urlBannerArtista} /> */}
      <div className={styles.header}>
        <span className={styles.artistName}>{topTracksArtist.artistName} </span>
        <span className={styles.titulo2}>SUS CANCIONES MÁS POPULARES - OYENTES MENSUALES EN SPOTIFY 🟢</span>
      </div>
      <div className={styles.contenido}>
        <div className={styles.containerPerfil}>
          <img className={styles.imgPerfil} src={topTracksArtist.artistImage} /> 
        </div>
        <div className={styles.containerListadoMusica}>
          {/* map */
            tracksOrdenados?.map((value, index)=>{
              return (
                // style= {{height: calc(100%/tracksOrdenados.length)}}
              <div key={index} className={styles.containerMusicas} style= {{height: `calc(100%/${tracksOrdenados.length})`}}> 
                <div className={styles.numeracion}>
                  {Number(index) + 1}
                </div>

                <div className={styles.containerInfoCancion}>
                  <div className={styles.containerImgAlbum}>
                    <img className={styles.imgAlbum} src={value?.album_image} />
                  </div>
                  <div className={styles.containerNombreCancion}>
                      <span className={styles.nombreCancion}>
                        {value.name}
                      </span>
                    <div className={styles.containerNombreArtistas}>
                      <span className={styles.nombreArtistas}>
                        {value?.artists?.map(a => a.name).join(" - ")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.monthlyListener}>
                  <span> 
                    {value.monthlyListenerRaw}
                  </span>
                </div>

              </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.footer}>
        {/* <div className={styles.containerLogo}>
          <img className={styles.logo} src="/redes/Spotify_logo.png" alt="2"></img>
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

export default InfografiaTopCancionesArtista