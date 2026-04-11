import { chromium } from "playwright";
import fs from "fs";

const TOP_50_GLOBAL ="https://open.spotify.com/playlist/37i9dQZEVXbMDoHDwVN2tF"


const BATCH_SIZE = 2;
const DELAY_BETWEEN_BATCHES = 3000;

const today = new Date();
const monthDate = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-01`;

// 🔹 limpiar número
function parseNumber(text) {
  return Number(text.replace(/[^\d]/g, ""));
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 500;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Si hemos bajado suficiente o ya no hay más espacio
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

// Alternativa más robusta para Spotify que carga muy lento
async function scrollUntil50Tracks(page) {
  let attempts = 0;
  let tracks = await page.locator('[data-testid="tracklist-row"]').all();
  
  while (tracks.length < 50 && attempts < 20) {
    // Desplazarse al último track encontrado para forzar la carga de los siguientes
    const lastTrack = tracks[tracks.length - 1];
    if (lastTrack) {
      await lastTrack.scrollIntoViewIfNeeded();
      // También un pequeño scroll extra hacia abajo
      await page.mouse.wheel(0, 500);
    }
    
    await page.waitForTimeout(1500);
    tracks = await page.locator('[data-testid="tracklist-row"]').all();
    console.log(`⏳ Cargando tracks... (${tracks.length}/50)`);
    attempts++;
  }
}

async function getArtistUrlsFromPlaylist(browser, url) {
  const page = await browser.newPage();
  console.log(`🔍 Accediendo a la playlist: ${url}`);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    
    // Esperar a que el contenedor de la lista esté presente
    await page.waitForSelector('[data-testid="playlist-tracklist"]', { timeout: 15000 });

    // ⚡ Scroll más robusto
    await scrollUntil50Tracks(page);
    
    const tracks = await page.locator('[data-testid="tracklist-row"]').all();
    console.log(`📑 Tracks detectados: ${tracks.length}`);
    
    const artistUrls = new Set();

    for (const track of tracks) {
      const artistLinks = await track.locator('a[href*="/artist/"]').all();
      for (const link of artistLinks) {
        const href = await link.getAttribute("href");
        if (href) {
          const absoluteUrl = href.startsWith("http") ? href : "https://open.spotify.com" + href;
          artistUrls.add(absoluteUrl);
        }
      }
    }

    await page.close();
    const uniqueArtists = Array.from(artistUrls);
    console.log({uniqueArtists})
    console.log(`✅ Se encontraron ${uniqueArtists.length} artistas únicos.`);
    return uniqueArtists;
  } catch (e) {
    console.log("⚠️ No se pudieron obtener los artistas de la playlist:", e.message);
    if (!page.isClosed()) await page.close();
    return [];
  }
}

// 🔹 scraper principal
async function scrapeArtist(browser, url) {
  const page = await browser.newPage();

  let name = null;
  let listeners = null; // quitar
  let artistImage = null; // quitar
  let artistImageHistory = null; // quitar
  let backgroundArtistImage = null; // quitar
  let songs = [];

  try {
    await page.goto(url + "?locale=en", {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    // 🎤 Nombre
    try {
      // 1. Get the full title string from the page
      const fullTitle = await page.title(); 

      // 2. Split by the pipe character and take the first part
      name = fullTitle.split('|')[0].trim();

    } catch (e) {
      console.log("⚠️ Nombre no encontrado:", e.message);
    }

    // 👥 Monthly listeners
    try {
      const listenersText = await page
        .locator('span:has-text("monthly listeners")')
        .first()
        .textContent();

      listeners = parseNumber(listenersText);
    } catch (e) {
      console.log("⚠️ Monthly listeners no encontrado");
    }

    // 🖼️ Imagen artista Historia (mejor selector)
    try {
      const styleValue = await page
        .locator('.J8g7rZ2MDknxmiYP.GUhu8mqqIMM0sZzG') 
        .getAttribute("style");
      
      const match = styleValue.match(/url\("(.*?)"\)/);
      artistImageHistory = match ? match[1] : null;
    } catch (e) {
      console.log("⚠️ Imagen artista no encontrada");
    }

    // 🖼️ background Imagen artista (mejor selector)
    try {
      const styleValue = await page
        .locator('.jiWxWueoicolJZnS.jX9OuHoZE8EC2SYi') 
        .getAttribute("style");
      
      const match = styleValue.match(/url\("(.*?)"\)/);
      backgroundArtistImage = match ? match[1] : null;
    } catch (e) {
      console.log("⚠️ Imagen artista no encontrada");
    }

    // 🖼️ Imagen perfil artista (Cargamos esta fuera del loop de tracks para ahorrar tiempo)
    try {
      // Intentar obtener la imagen circular de perfil (la más común)
      artistImage = await page.locator('img[data-testid="entity-image"]').first().getAttribute("src");
    } catch (e) {
      console.log("⚠️ Imagen de perfil no encontrada directly");
    }

    // 🎵 Tracks
    try {
      //await page.locator('.sL0wneoReggMaCXb').click();
      const tracks = await page.locator('[data-testid="tracklist-row"]').all();
      for (let i = 0; i < Math.min(10, tracks.length); i++) {
        const track = tracks[i];

        let title = null;
        let link = null;
        let image = null;
        let plays = null;

        try {
          title = await track
            .locator('[data-testid="internal-track-link"]')
            .textContent();
        } catch {
          console.log("⚠️ Nombre no encontrado")
        }

        try {
          const href = await track.locator("a").first().getAttribute("href");
          link = href ? "https://open.spotify.com" + href : null;
          
          // Se elimina el llamado a getArtistImageFromTrackPage porque es muy lento
          // La imagen del artista la sacaremos directamente de su perfil abajo
        } catch {
          console.log("⚠️ Link de musica no encontrado")
        }

        try {
          image = await track.locator("img").first().getAttribute("src");
        } catch {
          console.log("⚠️ Imagen de musica no encontrada")
        }

        try {
          const div = await track.locator(".F_VvNCRKZ2cKj1a9 > div").textContent();
          plays = parseNumber(div);
          console.log({plays})
        } catch {}

        songs.push({ title, link, image, plays });
      }
    } catch (e) {
      console.log("⚠️ Tracks no encontrados");
    }

    console.log(`✅ ${name || "Sin nombre"} (${listeners || "sin datos"})`);

  } catch (error) {
    console.error("❌ Error cargando página:", url);
  } finally {
    if (!page.isClosed()) {
      await page.close();
    }
  }

  return {
    name,
    url,
    listeners,
    backgroundArtistImage,
    artistImage,
    artistImageHistory,
    topTracks: songs,
    month: monthDate,
  };
}

// Se eliminó la función getArtistImageFromTrackPage por ser ineficiente

// 🔹 batches
async function run() {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-http2'] // A veces ayuda con la carga en Spotify
  });
  
  const playlists = [TOP_50_GLOBAL]; 
  const allArtistUrls = new Set();

  console.log("🚀 Iniciando extracción de artistas de las playlists...");

  for (const playlistUrl of playlists) {
    const artists = await getArtistUrlsFromPlaylist(browser, playlistUrl);
    artists.forEach(url => allArtistUrls.add(url));
  }

  const uniqueArtistUrls = Array.from(allArtistUrls);
  console.log(`🎵 Se procesarán ${uniqueArtistUrls.length} artistas en total.`);

  const results = [];

  // 💡 BATCH_SIZE determina cuántas pestañas de artistas se abren en paralelo.
  // 2 es seguro para PCs modestas. Si tienes mucha RAM/CPU, puedes subirlo a 5 o 10.
  for (let i = 0; i < uniqueArtistUrls.length; i += BATCH_SIZE) {
    const batch = uniqueArtistUrls.slice(i, i + BATCH_SIZE);
    console.log(`📦 Procesando lote ${Math.floor(i / BATCH_SIZE) + 1} de ${Math.ceil(uniqueArtistUrls.length / BATCH_SIZE)}...`);

    const batchResults = await Promise.all(
      batch.map((url) => scrapeArtist(browser, url))
    );

    results.push(...batchResults.filter(r => r && r.name)); // Filtrar fallidos

    if (i + BATCH_SIZE < uniqueArtistUrls.length) {
      await new Promise((r) => setTimeout(r, DELAY_BETWEEN_BATCHES));
    }
  }

  await browser.close();
  saveResults(results);
}

// 💾 guardar JSON seguro
function saveResults(data) {
  const filePath = "./spotify-data-global.json";

  let existingData = [];

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8").trim();
      if (raw) existingData = JSON.parse(raw);
    }
  } catch {
    existingData = [];
  }

  const newData = [...existingData];

  for (const newItem of data) {
    const index = newData.findIndex(
      (item) =>
        item.url === newItem.url &&
        item.month === newItem.month
    );

    if (index !== -1) {
      // 🔁 reemplazar si ya existe
      newData[index] = newItem;
    } else {
      // ➕ agregar si no existe
      newData.push(newItem);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

  console.log("💾 Guardado OK");
}

run();