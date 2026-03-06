import { useEffect, useState, useRef } from "react"
import FormularioSpotify from "./FormularioSpotify"
import InfografiasSpotifyTopArtistas from "./InfografiasSpotifyTopArtistas";
import styles from "./InfografiaSpotify.module.css"

const TopArtistaSpotify = ()=>{
  const [datos, setDatos] = useState({});
  const numberOfTopArtist = 10;
  const [startNumberOfArtist, setStartNumberOfArtist] = useState(1);
  const [datosArtistas, setDatosArtistas] = useState([])
  const [artistasInfo, setArtistasInfo] = useState({}); 
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
        />
    </div>
  )
}

export default TopArtistaSpotify;