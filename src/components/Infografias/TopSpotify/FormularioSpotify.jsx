import { useState } from "react";
import {buscarArtistas} from "@stores/dataSpotify"
import { CapturarImagen } from "@functions/CapturarImagen";
import styles from "./FormularioSpotify.module.css"

const FormularioSpotify = ({
  datos,
  setDatos,
  numberOfArtist,
  setNumberOfArtist,
  datosArtistas,
  setDatosArtistas,
  setArtistasInfo,
  monthlyListener,
  setMonthlyListener,
  backgroundRef
})=>{

  const [inputSeleccionado, setInputSeleccionado] = useState(0)

  return (
    <div className={styles.containerFormulario}>
      <label>
        Titulo:
        <textarea
          placeholder="Escribe el título..."
          value={datos.titulo || "TOP 10 ARTISTAS VENEZOLANOS"}
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
          value={datos.titulo2 || "MÁS ESCUCHADOS EN SPOTIFY"}
          rows={3}
          onChange={(e) => {
            setDatos((prev) => ({
              ...prev,
              titulo2: e.target.value
            }));
          }}
        />
      </label>

      <label>Cantidad de Artistas:
        <input
          type="number"
          value={numberOfArtist}
          onChange={(e)=>{
            setNumberOfArtist(Number(e.target.value))
          }}  
        />
      </label>
      
      {/* {
        Array.from({ length:numberOfArtist }, (_, i) => i + 1).map((elemento, key)=>{
          return (
          <input 
            key={`seleccion-artista-${key}`} 
            type="button"
            value={elemento}
            onClick={()=>{
              setInputSeleccionado(key)
            }}
          />
        )
        })
      } */}

      {
        Array.from({ length:numberOfArtist }, (_, i) => i + 1).map((elemento, key)=>{
          return (
          <div 
            key={`formulario-artista-${key}`} 
          >
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

          </div>
        )
        })
      }

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