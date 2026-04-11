import { useState, useRef } from "react";
import { buscarArtistas, buscarArtista, buscarCanciones } from "@stores/dataSpotify"
import { CapturarImagen } from "@functions/CapturarImagen";
import styles from "./FormularioSpotify.module.css";
import spotifyDataGlobal from "@spotify-data-global"
import spotifyData from "@spotify-data"

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
  topMusic,
  setTopMusic,
  monthlyListener,
  setMonthlyListener,
  backgroundRef,
  sourceType,
  setSourceType
}) => {

  const cargarDatosAuto = () => {
    const dataToUse = sourceType === "venezolanos" ? spotifyData : spotifyDataGlobal;

    // 1. Ordenar por listeners de mayor a menor
    const sortedData = [...dataToUse].sort((a, b) => (b.listeners || 0) - (a.listeners || 0));

    // 2. Tomar los artistas según el inicio y el total permitido
    const startIndex = (startNumberOfArtist || 1) - 1;
    const selectedArtists = sortedData.slice(startIndex, startIndex + numberOfTopArtist);

    const newDatosArtistas = {};
    const newArtistasInfo = {};
    const newMusicInfo = {};
    const newMonthlyListener = [];

    selectedArtists.forEach((artist, index) => {
      newDatosArtistas[index] = {
        urlArtista: artist.url,
        urlMusic: artist.topTracks?.[0]?.link || "",
        bannerUrl: artist.backgroundArtistImage || "",
        offsetY: 0,
        offsetX: 0,
        zoom: 1
      };

      newArtistasInfo[index] = {
        nuevaImagen: artist.artistImage || artist.artistImageHistory || "",
        name: artist.name,
        href: artist.url,
        images: [{ url: artist.artistImage }]
      };

      if (artist.topTracks?.[0]) {
        newMusicInfo[index] = {
          name: artist.topTracks[0].title || "Unknown",
          album: { images: [{ url: artist.topTracks[0].image }] }
        };
      }

      // Formatear listeners: 14671882 -> 14.671.882 o dejarlo en string si prefieres
      // El componente parece esperar un string que ya tiene el formato M o K tal vez?
      // En spotify-data.js hay strings como "47M", "6.7M".
      // Vamos a convertir el numero a un formato similar (M o K)
      const formattedListeners = artist.listeners >= 1000000
        ? (artist.listeners / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 }) + "M"
        : artist.listeners >= 1000
          ? (artist.listeners / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 }) + "K"
          : artist.listeners.toString();

      newMonthlyListener[index] = formattedListeners;
    });

    setDatosArtistas(newDatosArtistas);
    setArtistasInfo(newArtistasInfo);
    setMusicInfo(newMusicInfo);
    setMonthlyListener(newMonthlyListener);
  };
  console.log({ datosArtistas, artistasInfo, datos, urlArtista: Object.values(datosArtistas).map(item => item?.urlArtista), musicInfo })

  const fileInputRef = useRef(null);

  const exportarDatos = () => {
    const infoToExport = {
      datos,
      startNumberOfArtist,
      topMusic,
      datosArtistas,
      artistasInfo,
      musicInfo,
      monthlyListener
    };
    const blob = new Blob([JSON.stringify(infoToExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `formulario_spotify_${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importarDatos = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = JSON.parse(e.target.result);
        if (result.datos) setDatos(result.datos);
        if (result.startNumberOfArtist !== undefined) setStartNumberOfArtist(result.startNumberOfArtist);
        if (result.topMusic !== undefined) setTopMusic(result.topMusic);
        if (result.datosArtistas) setDatosArtistas(result.datosArtistas);
        if (result.artistasInfo) setArtistasInfo(result.artistasInfo);
        if (result.musicInfo) setMusicInfo(result.musicInfo);
        if (result.monthlyListener) setMonthlyListener(result.monthlyListener);
      } catch (error) {
        alert("Error al intentar procesar el archivo. Asegúrese de que sea un JSON válido.");
      }
    };
    reader.readAsText(file);
    event.target.value = null; // Reiniciar el input
  };

  return (
    <div className={styles.containerFormulario}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
        <button type="button" onClick={exportarDatos}>
          Exportar Configuración
        </button>
        <button type="button" onClick={() => fileInputRef.current?.click()}>
          Importar Configuración
        </button>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={importarDatos}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', padding: '5px 10px', borderRadius: '5px' }}>
          <label style={{ margin: 0, fontSize: '12px' }}>Fuente:</label>
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            style={{ padding: '2px', borderRadius: '3px', background: '#222', color: '#fff', border: '1px solid #555' }}
          >
            <option value="venezolanos">Venezolanos</option>
            <option value="globales">Globales</option>
          </select>
          <button type="button" onClick={cargarDatosAuto} style={{ padding: '2px 10px', background: '#1db954', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
            Autocargar desde Repo
          </button>
        </div>
      </div>
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
          onChange={(e) => {
            setStartNumberOfArtist(Number(e.target.value))
          }}
          placeholder={"1 o 10"}
        />
      </label>
      <label>
        es Top Musica de Artistas?
        <select
          onChange={(e) => {
            setTopMusic(e.target.value === "true")
          }}
          value={topMusic.toString()}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>

      {
        Array.from({ length: numberOfTopArtist }, (_, i) => i + 1).map((elemento, key) => {
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
                topMusic &&
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
                onChange={(e) => {
                  const value = e.target.value;
                  console.log({ value })
                  setMonthlyListener((prev) => {
                    const anterior = [...prev];
                    anterior[key] = value;
                    console.log({ anterior })
                    return anterior;
                  })
                }}
              />



            </div>
          )
        })
      }

      <button type="button" onClick={() => {
        buscarArtista({ urlArtista: Object.values(datosArtistas).map(item => item?.urlArtista), setArtistasInfo })
        buscarCanciones({ urlCanciones: Object.values(datosArtistas).map(item => item?.urlMusic), setMusicInfo })
      }}>
        Buscar artista
      </button>

      <button type="button" onClick={() => buscarArtistas({ datosArtistas, setArtistasInfo })}>
        Buscar artistas
      </button>

      <button type="button" onClick={() => CapturarImagen({ backgroundRef, nombre: "Top10MusicaSpotify" })}>
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