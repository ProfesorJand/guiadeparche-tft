import { useState } from "react";
import {buscarArtistas, buscarArtista, buscarCanciones} from "@stores/dataSpotify"
import { CapturarImagen } from "@functions/CapturarImagen";
import styles from "./FormularioSpotify.module.css"

const FormularioSpotify = ({
  datos,
  setDatos,
  numberOfTopArtist,
  startNumberOfArtist,
  setStartNumberOfArtist,
  datosArtistas,
  setDatosArtistas,
  artistasInfo,
  setArtistasInfo,
  musicInfo,
  setMusicInfo,
  monthlyListener,
  setMonthlyListener,
  backgroundRef
})=>{
  console.log({datosArtistas, artistasInfo, datos, urlArtista: Object.values(datosArtistas).map(item => item?.urlArtista),musicInfo})

  return (
    <div className={styles.containerFormulario}>
      <label>
        Titulo:
        <textarea
          placeholder="Escribe el título..."
          value={datos.titulo}
          rows={3}
          onChange={(e) => {
            setDatos((prev) => ({
              ...prev,
              titulo: e.target.value
            }));
          }}
        />
      </label>

      <label>
        Titulo2:
        <textarea
          placeholder="Escribe el título2..."
          value={datos.titulo2}
          rows={3}
          onChange={(e) => {
            setDatos((prev) => ({
              ...prev,
              titulo2: e.target.value
            }));
          }}
        />
      </label>

      <label>
        Fecha:
        <textarea
          placeholder="Escribe la Fecha..."
          value={datos.fecha}
          rows={3}
          onChange={(e) => {
            setDatos((prev) => ({
              ...prev,
              fecha: e.target.value
            }));
          }}
        />
      </label>

      <label>Empieza en el numero:
        <input
          type="number"
          value={startNumberOfArtist}
          onChange={(e)=>{
            setStartNumberOfArtist(Number(e.target.value))
          }}  
          placeholder={"1 o 10"}
        />
      </label>
      <label>
        es Top Musica de Artistas?
        <select 
          onChange={(e) => {
            setDatos((prev) => ({
              ...prev,
              topMusic: e.target.value === "true"
            }));
          }}
          >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
      
      {
        Array.from({ length:numberOfTopArtist }, (_, i) => i + 1).map((elemento, key)=>{
          return (
          <div 
            key={`formulario-artista-${key}`} 
          >
            {
              artistasInfo?.[0]?.images.length && 
              <input 
              placeholder="imagen url"
              type="text"
              value={artistasInfo?.[key]?.nuevaImagen}
              onChange={(e) => {
                const value = e.target.value;

                setArtistasInfo((prev) => ({
                  ...prev,
                  [key]: {
                    ...(prev[key] || {}),
                    nuevaImagen: value,
                  },
                }));
              }} 
               />
            }
            {
              artistasInfo?.[0]?.href && 
              <input 
              placeholder="Nombre Artista"
              type="text"
              value={artistasInfo?.[key]?.name}
              onChange={(e) => {
                const value = e.target.value;

                setArtistasInfo((prev) => ({
                  ...prev,
                  [key]: {
                    ...(prev[key] || {}),
                    name: value,
                  },
                }));
              }} 
               />
            }
            <input 
              placeholder="perfilUrl"
              type="text"
              value={datosArtistas?.[key]?.urlArtista}
              onChange={(e) => {
                const value = e.target.value;

                setDatosArtistas((prev) => ({
                  ...prev,
                  [key]: {
                    ...(prev[key] || {}),
                    urlArtista: value,
                  },
                }));
              }} 
               />

              {
                datos?.topMusic &&
                <input 
                  placeholder="MusicUrl"
                  type="text"
                  value={datosArtistas?.[key]?.urlMusic}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDatosArtistas((prev) => ({
                      ...prev,
                      [key]: {
                        ...(prev[key] || {}),
                        urlMusic: value,
                      },
                    }));
                  }} 
                />
              }

              <input 
                type="text"
                value={monthlyListener[key]}
                onChange={(e)=>{
                  const value = e.target.value;
                  console.log({value})
                  setMonthlyListener((prev) => {
                    const anterior = [...prev];
                    anterior[key]= value;
                    console.log({anterior})
                    return anterior;
                    })
                  }}
              />



          </div>
        )
        })
      }

      <button type="button" onClick={()=>{
        buscarArtista({urlArtista: Object.values(datosArtistas).map(item => item?.urlArtista), setArtistasInfo})
        buscarCanciones({urlCanciones: Object.values(datosArtistas).map(item => item?.urlMusic), setMusicInfo})
        }}>
        Buscar artista
      </button>

      <button type="button" onClick={()=>buscarArtistas({datosArtistas, setArtistasInfo})}>
        Buscar artistas
      </button>

      <button type="button" onClick={()=>CapturarImagen({backgroundRef,nombre:"Top10MusicaSpotify"})}>
        Capturar
      </button>


    </div>


  )
}

export default FormularioSpotify

              {/* <input 
              placeholder="bannerUrl"
              type="text"
              onChange={(e) => {
                const value = e.target.value;

                setDatosArtistas((prev) => ({
                  ...prev,
                  [key]: {
                    ...(prev[key] || {}),
                    bannerUrl: value,
                  },
                }));
              }}  /> */}

              {/* <button
                type="button"
                onClick={() => {
                  setDatosArtistas((prev) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key] || {}),
                      offsetY: (prev[key]?.offsetY || 0) - 1,
                    },
                  }));
                }}
              >
                ⬆️ Subir
              </button>

              <button
                type="button"
                onClick={() => {
                  setDatosArtistas((prev) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key] || {}),
                      offsetY: (prev[key]?.offsetY || 0) + 1,
                    },
                  }));
                }}
              >
                ⬇️ Bajar
              </button>
              <button
                type="button"
                onClick={() => {
                  setDatosArtistas((prev) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key] || {}),
                      offsetX: (prev[key]?.offsetX || 0) - 1,
                    },
                  }));
                }}
              >
                ⬅️
              </button>

              <button
                type="button"
                onClick={() => {
                  setDatosArtistas((prev) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key] || {}),
                      offsetX: (prev[key]?.offsetX || 0) + 1,
                    },
                  }));
                }}
              >
                ➡️
              </button>

              <button
                type="button"
                onClick={() => {
                  setDatosArtistas((prev) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key] || {}),
                      zoom: (prev[key]?.zoom || 1) + 0.05,
                    },
                  }));
                }}
              >
                zoom +
              </button>
              <button
                type="button"
                onClick={() => {
                  setDatosArtistas((prev) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key] || {}),
                      zoom: (prev[key]?.zoom || 1) - 0.05,
                    },
                  }));
                }}
              >
                zoom -
              </button> */}