import styles from "./TopCancionesArtista.module.css";
import { useEffect, useState, useRef } from "react";
import InfografiaTopCancionesArtista from "./InfografiaTopCancionesArtista";
import { getTopTracksArtist, getSpotifyArtistId } from "@stores/dataSpotify";
import { CapturarImagen } from "@functions/CapturarImagen";
const TopCancionesArtista = ()=>{
  const [urlTopMusicArtist, setUrlTopMusicArtist] = useState("");
  const [urlBannerArtista, setUrlBannerArtista] = useState("");
  const [topTracksArtist, setTopTracksArtist] = useState([]);
  const [numberMonthlyListener, setNumberMonthlyListener] = useState([])
  const backgroundRef = useRef(null);


  return (
    <div className={styles.containerTopCancionesArtista}>
      <div className={styles.containerFormulario}>
        <input 
          placeholder="Url del Artista"
          type="text"
          value={urlTopMusicArtist}
          onChange={(e)=>{
            setUrlTopMusicArtist(e.target.value)
          }}
        />
        <input 
          type="button"
          value="Buscar"
          onClick={(e)=>{
            getTopTracksArtist({id:getSpotifyArtistId(urlTopMusicArtist), setTopTracksArtist})
          }}
        />
        <input 
          placeholder="Url del Banner del Artista"
          type="text"
          value={urlBannerArtista}
          onChange={(e)=>{
            setUrlBannerArtista(e.target.value)
          }}
        />
        <input 
          type="button"
          value="Capturar"
          onClick={(e)=>{
            CapturarImagen({backgroundRef, nombre:"top-tracks-artist"+topTracksArtist?.artistName})
          }}
        />
        {
          topTracksArtist?.tracks?.map((value,index)=>{
            return (
              <input 
                key={index} 
                type="text" 
                placeholder={topTracksArtist?.tracks?.[index]?.name}
                onChange={(e)=>{
                  setNumberMonthlyListener((prev)=>{
                    const nuevo = [...prev];
                    nuevo[index] = e.target.value;
                    console.log({nuevo})
                    return nuevo
                  })
                }}
              />
            )
          })
        }
      </div>
    <InfografiaTopCancionesArtista urlBannerArtista={urlBannerArtista} topTracksArtist={topTracksArtist} numberMonthlyListener={numberMonthlyListener} backgroundRef={backgroundRef}/>
    </div>
  )
}

export default TopCancionesArtista;