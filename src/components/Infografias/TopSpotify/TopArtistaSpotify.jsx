import { useEffect, useState, useRef } from "react"
import FormularioSpotify from "./FormularioSpotify"
import InfografiasSpotifyTopArtistas from "./InfografiasSpotifyTopArtistas"

const TopArtistaSpotify = ()=>{
  const [datos, setDatos] = useState({})
  const [numberOfArtist, setNumberOfArtist] = useState(5);
  const [datosArtistas, setDatosArtistas] = useState([])
  const [artistasInfo, setArtistasInfo] = useState({}); 
  const [monthlyListener, setMonthlyListener] = useState([]) //[]
  const backgroundRef = useRef(null)

  return (
    <>
      <FormularioSpotify 
        datos={datos} 
        setDatos={setDatos} 
        numberOfArtist={numberOfArtist} 
        setNumberOfArtist={setNumberOfArtist}
        datosArtistas={datosArtistas}
        setDatosArtistas={setDatosArtistas}
        setArtistasInfo={setArtistasInfo}
        setMonthlyListener={setMonthlyListener}
        monthlyListener={monthlyListener}
        backgroundRef={backgroundRef}
      />
      <InfografiasSpotifyTopArtistas 
        backgroundRef={backgroundRef}
        datos={datos} 
        numberOfArtist={numberOfArtist} 
        datosArtistas={datosArtistas}
        artistasInfo={artistasInfo}
        monthlyListener={monthlyListener}
        />
    </>
  )
}

export default TopArtistaSpotify;