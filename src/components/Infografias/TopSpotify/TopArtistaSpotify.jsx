import { useEffect, useState, useRef } from "react"
import FormularioSpotify from "./FormularioSpotify"
import InfografiasSpotifyTopArtistas from "./InfografiasSpotifyTopArtistas";
import styles from "./InfografiaSpotify.module.css"

const TopArtistaSpotify = ()=>{
  const fecha = new Date();
  const mes = fecha.toLocaleDateString('es-ES', { month: 'long' }); // Ejemplo: "marzo"
  const dia = fecha.getDate();
  const año = fecha.getFullYear();
  const [datos, setDatos] = useState({
    titulo:"TOP 10 ARTISTAS VENEZOLANOS",
    titulo2:"MÁS ESCUCHADOS EN SPOTIFY",
    fecha:`${dia} DE ${mes.toUpperCase()} ${año} (OYENTES MENSUALES)`
  });
  const numberOfTopArtist = 10;
  const [startNumberOfArtist, setStartNumberOfArtist] = useState(1);
  const [datosArtistas, setDatosArtistas] = useState([])
  const [artistasInfo, setArtistasInfo] = useState({}); 
  const [musicInfo, setMusicInfo] = useState([])
  const [monthlyListener, setMonthlyListener] = useState([]) //[]
  const backgroundRef = useRef(null)

  return (
    <div className={styles.container}>
      <FormularioSpotify 
        datos={datos} 
        setDatos={setDatos} 
        numberOfTopArtist={numberOfTopArtist}
        startNumberOfArtist={startNumberOfArtist} 
        setStartNumberOfArtist={setStartNumberOfArtist}
        datosArtistas={datosArtistas}
        setDatosArtistas={setDatosArtistas}
        artistasInfo={artistasInfo}
        setArtistasInfo={setArtistasInfo}
        musicInfo={musicInfo}
        setMusicInfo={setMusicInfo}
        setMonthlyListener={setMonthlyListener}
        monthlyListener={monthlyListener}
        backgroundRef={backgroundRef}
      />
      <InfografiasSpotifyTopArtistas 
        backgroundRef={backgroundRef}
        datos={datos} 
        numberOfTopArtist={numberOfTopArtist}
        startNumberOfArtist={startNumberOfArtist} 
        datosArtistas={datosArtistas}
        artistasInfo={artistasInfo}
        monthlyListener={monthlyListener}
        musicInfo={musicInfo}
        />
    </div>
  )
}

export default TopArtistaSpotify;