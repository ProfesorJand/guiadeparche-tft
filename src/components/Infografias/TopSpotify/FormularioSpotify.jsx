import { useState, useRef } from "react";
import { buscarArtistas, buscarArtista, buscarCanciones } from "@stores/dataSpotify"
import { CapturarImagen } from "@functions/CapturarImagen";
import styles from "./FormularioSpotify.module.css";
import spotifyDataGlobal from "@spotify-data-global";
import spotifyDataGlobalMusic from "@spotify-data-global-music";
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
    let sortedData = [];
    
    if (sourceType === "globalesMusic") {
      // Agrupar canciones por link para evitar duplicados y capturar colaboraciones
      const tracksMap = new Map();
      
      spotifyDataGlobalMusic.forEach(artist => {
        if (artist.topTracks && Array.isArray(artist.topTracks)) {
          artist.topTracks.forEach(track => {
            const correctImage = Array.isArray(artist.artistImage)
              ? (artist.artistImage.find(imgObj => imgObj.name?.toLowerCase() === artist.name?.toLowerCase())?.img || artist.artistImage[0]?.img || artist.artistImageHistory || "")
              : (artist.artistImage || artist.artistImageHistory || "");

            const artistInfo = {
              name: artist.name,
              image: correctImage,
              url: artist.url,
              background: artist.backgroundArtistImage || ""
            };

            if (tracksMap.has(track.link)) {
              const existingTrack = tracksMap.get(track.link);
              // Evitar duplicar el mismo artista en la misma canción
              if (!existingTrack.artists.some(a => a.name === artist.name)) {
                existingTrack.artists.push(artistInfo);
              }
            } else {
              tracksMap.set(track.link, {
                ...track,
                artists: [artistInfo]
              });
            }
          });
        }
      });

      // Convertir el mapa a un array y procesar nombres/imágenes combinados
      const allTracks = Array.from(tracksMap.values()).map(track => {
        const names = track.artists.map(a => a.name).join(" & ");
        const images = track.artists.map(a => a.image).filter(img => img);
        
        return {
          ...track,
          artistName: names,
          artistImages: images,
          artistUrl: track.artists[0]?.url || "",
          backgroundArtistImage: track.artists.find(a => a.background)?.background || ""
        };
      });

      // Ordenar canciones por plays de mayor a menor
      sortedData = allTracks.sort((a, b) => (b.plays || 0) - (a.plays || 0));
      setTopMusic(true);
    } else {
      const dataToUse = sourceType === "venezolanos" ? spotifyData : sourceType === "globales" ? spotifyDataGlobal : spotifyDataGlobalMusic;
      // necesito que solo tome los que tengan el mes de hoy en el campo month 
      // Ordenar por listeners de mayor a menor (por artista)
      
      sortedData = [...dataToUse.filter(item => item.month === "2026-05-01")].sort((a, b) => (b.listeners || 0) - (a.listeners || 0));
    }

    // 2. Tomar los elementos según el inicio y el total permitido
    const startIndex = (startNumberOfArtist || 1) - 1;
    const selectedItems = sortedData.slice(startIndex, startIndex + numberOfTopArtist);

    const newDatosArtistas = {};
    const newArtistasInfo = {};
    const newMusicInfo = {};
    const newMonthlyListener = [];

    selectedItems.forEach((item, index) => {
      if (sourceType === "globalesMusic") {
        // Caso de canciones (tracks)
        newDatosArtistas[index] = {
          urlArtista: item.artistUrl,
          urlMusic: item.link || "",
          bannerUrl: item.backgroundArtistImage || "",
          offsetY: 0,
          offsetX: 0,
          zoom: 1
        };

        newArtistasInfo[index] = {
          nuevaImagen: item.artistImages?.[0] || "",
          artistImages: item.artistImages || [],
          name: item.artistName,
          href: item.artistUrl,
          images: (item.artistImages || []).map(url => ({ url }))
        };

        newMusicInfo[index] = {
          name: item.title || "Unknown",
          album: { images: [{ url: item.image }] }
        };

        const plays = item.plays || 0;
        const formattedPlays = plays >= 1000000000
          ? (plays / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "B"
          : plays >= 1000000
            ? (plays / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "M"
            : plays >= 1000
              ? (plays / 1000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "K"
              : plays.toString();

        newMonthlyListener[index] = formattedPlays;
      } else {
        // Caso de artistas
        const artist = item;
        newDatosArtistas[index] = {
          urlArtista: artist.url,
          urlMusic: artist.topTracks?.[0]?.link || "",
          bannerUrl: artist.backgroundArtistImage || "",
          offsetY: 0,
          offsetX: 0,
          zoom: 1
        };

        const correctImage = Array.isArray(artist.artistImage)
          ? (artist.artistImage.find(imgObj => imgObj.name?.toLowerCase() === artist.name?.toLowerCase())?.img || artist.artistImage[0]?.img || artist.artistImageHistory || "")
          : (artist.artistImage || artist.artistImageHistory || "");

        newArtistasInfo[index] = {
          nuevaImagen: correctImage,
          name: artist.name,
          href: artist.url,
          images: [{ url: correctImage }]
        };

        if (artist.topTracks?.[0]) {
          newMusicInfo[index] = {
            name: artist.topTracks[0].title || "Unknown",
            album: { images: [{ url: artist.topTracks[0].image }] }
          };
        }

        const listeners = artist.listeners || 0;
        const formattedListeners = listeners >= 1000000
          ? (listeners / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "M"
          : listeners >= 1000
            ? (listeners / 1000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "K"
            : listeners.toString();

        newMonthlyListener[index] = formattedListeners;
      }
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
            <option value="globalesMusic">Globales Music</option>
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