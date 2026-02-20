const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Obtener token usando Client Credentials (server-side)
export async function getSpotifyToken() {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

  // Codificar clientId:clientSecret en Base64
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // Hacer POST para obtener access_token
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Ejemplo: obtener datos de un artista por ID
export async function getArtist(artistId) {
  const response = await fetch(
    `https://api.guiadeparche.com/spotify/getArtist.php?id=${artistId}`
  );

  return await response.json();
}


export const buscarArtistas = async ({datosArtistas, setArtistasInfo}) => {
  console.log({datosArtistas})
  try {
    const urls = Object.values(datosArtistas)
    .map(obj => obj.urlArtista)
    .filter(Boolean);
    console.log({urls})

    if (urls.length === 0) {
      alert("No hay URLs");
      return;
    }
    const formData = new FormData();
    formData.append("urls", JSON.stringify(urls));

    const response = await fetch(`https://api.guiadeparche.com/spotify/getAllArtists.php`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    console.log(data);

    if (data.artists) {
      const nuevoEstado = {};

      data.artists.forEach((artist, index) => {
        nuevoEstado[index] = artist;
      });

      setArtistasInfo(nuevoEstado);
    }

  } catch (error) {
    console.error("Error:", error);
  }
};

export const urlArtistasPrueba= [
  "https://open.spotify.com/artist/329e4yvIujISKGKz1BZZbO", //1
  "https://open.spotify.com/artist/5dbaLmK5SHLLg8Z4CcTJpX", //2
  "https://open.spotify.com/artist/29b16XDtyMXDrfo2hZ69wf", //3 ADSO 678K
  "https://open.spotify.com/artist/1BCfXYvYcVKfcNNV7h3TKJ", //4 465K
  "https://open.spotify.com/artist/3tQrRoZiGXR5uMkaCYf8S4", //5
  "https://open.spotify.com/artist/5FXxWnN3DpfSS4vbcoqvbs", //6
  "https://open.spotify.com/artist/4WJqqNKVi1tYJCHnyPejkU", //7
  "https://open.spotify.com/artist/2DkGM4NApbipL1vtLORXr6", //8 Crips 14K
  //"https://open.spotify.com/artist/35HNwIg9J75QAhmT3eE1Uo", //5 Nawal
  //"https://open.spotify.com/artist/5KdRTyCAYB6P4uq5KewrMn", //9 Stenafo Zimbardi 
  //"https://open.spotify.com/artist/2emybgPyhsby8rRbec7EWH", //10 Marco Allen
  // "https://open.spotify.com/artist/0EMCLd5tzoPP35uUw23Pxz", //5 Neomai
  // "https://open.spotify.com/artist/0kHEttD7XzMjXbZtMq6XYo", //9 Anakena
  //"https://open.spotify.com/artist/3Ck3vFMhKeATG84kib0IUT",
  // "https://open.spotify.com/artist/4uoz4FUMvpeyGClFTTDBsD",
  // "https://open.spotify.com/artist/3SCOuAxngTC1yGjKMcIPEd",
  // "https://open.spotify.com/artist/3smfreCkyJt7bShaTYpG77",
  // "https://open.spotify.com/artist/5NS0854TqZQVoRmJKSWtFZ",
  // "https://open.spotify.com/artist/2ayNSoKPCRAfjp6hQ76hRu",
]

export const mountlyListenerPrueba = [
  "47M",
  "6.7M",
  "465K",
  "268K",
  "163K",
  "92K",
  "14K",
  "862",
  "105"
  //"235K",
  // "683K",
  // "367K",
  // "94K",
  
  //"9K",

  // "7.3M",
  // "7.1M",
  // "7.0M",
  // "6.7M",
  // "5.7M"
]

export const getTopTracksArtist = async ({id, setTopTracksArtist})=>{
  const response = await fetch(
    "https://api.guiadeparche.com/spotify/getTopTracksArtist.php",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist_id: id })
    }
  );
  const data = await response.json();
  setTopTracksArtist(data)
} 

export const getSpotifyArtistId = (url) => {
  const match = url.match(/artist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export const getAvailableGenreSeeds= ()=>{
  
}