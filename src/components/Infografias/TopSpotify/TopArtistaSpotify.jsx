import { useEffect, useState, useRef } from "react"
import FormularioSpotify from "./FormularioSpotify"
import InfografiasSpotifyTopArtistas from "./InfografiasSpotifyTopArtistas";
import styles from "./InfografiaSpotify.module.css"


const TopArtistaSpotify = () => {
  const fecha = new Date();
  const mes = fecha.toLocaleDateString('es-ES', { month: 'long' }); // Ejemplo: "marzo"
  const dia = fecha.getDate();
  const año = fecha.getFullYear();
  const numberOfTopArtist = 10;
  const [startNumberOfArtist, setStartNumberOfArtist] = useState(1);
  const [datosArtistas, setDatosArtistas] = useState([])
  const [artistasInfo, setArtistasInfo] = useState({});
  const [topMusic, setTopMusic] = useState(true);
  const [musicInfo, setMusicInfo] = useState([])
  const [monthlyListener, setMonthlyListener] = useState([]) //[]
  const backgroundRef = useRef(null);
  const [sourceType, setSourceType] = useState("venezolanos");
  const [datos, setDatos] = useState({
    titulo: "TOP 30 ARTISTAS VENEZOLANOS",
    titulo2: "MÁS ESCUCHADOS EN SPOTIFY",
    fecha: `${dia} DE ${mes.toUpperCase()} ${año} (OYENTES MENSUALES)`,
    fechaArchivo: `${dia}-${mes}-${año}`
  });

  useEffect(() => {
    setDatos(prev => ({
      ...prev,
      fecha: `${dia} DE ${mes.toUpperCase()} ${año} (${sourceType === "venezolanos" || sourceType === "globales" ? "OYENTES MENSUALES" : "REPRODUCCIONES ÚLTIMAS 24 H"})`
    }));
  }, [sourceType, dia, mes, año]);


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
        topMusic={topMusic}
        setTopMusic={setTopMusic}
        musicInfo={musicInfo}
        setMusicInfo={setMusicInfo}
        setMonthlyListener={setMonthlyListener}
        monthlyListener={monthlyListener}
        backgroundRef={backgroundRef}
        sourceType={sourceType}
        setSourceType={setSourceType}
      />
      <InfografiasSpotifyTopArtistas
        backgroundRef={backgroundRef}
        datos={datos}
        numberOfTopArtist={numberOfTopArtist}
        startNumberOfArtist={startNumberOfArtist}
        datosArtistas={datosArtistas}
        artistasInfo={artistasInfo}
        topMusic={topMusic}
        musicInfo={musicInfo}
        monthlyListener={monthlyListener}
        sourceType={sourceType}
      />
    </div>
  )
}

export default TopArtistaSpotify;