import { chromium } from "playwright";
import fs from "fs";

const TOP_50_GLOBAL = "https://open.spotify.com/playlist/37i9dQZEVXbMDoHDwVN2tF";

const BATCH_SIZE = 2;
const DELAY_BETWEEN_BATCHES = 3000;

const today = new Date();
const monthDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;

// 🔹 limpiar número
function parseNumber(text) {
  return Number(text.replace(/[^\d]/g, ""));
}

async function scrollUntil50Tracks(page) {
  let attempts = 0;
  let tracks = await page.locator('[data-testid="tracklist-row"]').all();
  
  while (tracks.length < 50 && attempts < 20) {
    const lastTrack = tracks[tracks.length - 1];
    if (lastTrack) {
      await lastTrack.scrollIntoViewIfNeeded();
      await page.mouse.wheel(0, 500);
    }
    await page.waitForTimeout(1500);
    tracks = await page.locator('[data-testid="tracklist-row"]').all();
    console.log(`⏳ Cargando tracks... (${tracks.length}/50)`);
    attempts++;
  }
}

async function scrapePlaylist(browser, url) {
  const page = await browser.newPage();
  console.log(`🔍 Accediendo a la playlist: ${url}`);
  const top50 = [];

  try {
    await page.goto(url + "?locale=en", { waitUntil: "networkidle", timeout: 60000 });
    
    // Esperar a que el contenedor de la lista esté presente
    await page.waitForSelector('[data-testid="playlist-tracklist"]', { timeout: 15000 });

    // Scroll para cargar todas las canciones
    await scrollUntil50Tracks(page);
    
    const tracks = await page.locator('[data-testid="tracklist-row"]').all();
    console.log(`📑 Tracks detectados: ${tracks.length}`);

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      
      let title = null;
      let albumImage = null;
      let albumName = null;
      let artists = [];
      let plays = null; 
      
      // 🎵 Título de la canción
      try {
        title = await track.locator('[data-testid="internal-track-link"]').textContent();
      } catch {
        console.log(`⚠️ Título no encontrado en track ${i+1}`);
      }

      // 🖼️ Imagen del álbum
      try {
        albumImage = await track.locator("img").first().getAttribute("src");
      } catch {
        console.log(`⚠️ Imagen del álbum no encontrada en track ${i+1}`);
      }

      // 💿 Nombre del álbum
      try {
        const albumLink = await track.locator('a[href*="/album/"]').first();
        if (albumLink) {
          albumName = await albumLink.textContent();
        }
      } catch {
        console.log(`⚠️ Álbum no encontrado en track ${i+1}`);
      }

      // 🎤 Artistas
      try {
        const artistLinks = await track.locator('a[href*="/artist/"]').all();
        for (const link of artistLinks) {
          const artistName = await link.textContent();
          const href = await link.getAttribute("href");
          const artistUrl = href ? (href.startsWith("http") ? href : "https://open.spotify.com" + href) : null;
          
          artists.push({
            name: artistName,
            url: artistUrl
          });
        }
      } catch {
        console.log(`⚠️ Artistas no encontrados en track ${i+1}`);
      }

      // 🎧 Plays
      try {
        const div = await track.locator(".F_VvNCRKZ2cKj1a9 > div").textContent();
        plays = parseNumber(div);
      } catch {
        console.log(`⚠️ Plays no encontrados en track ${i+1}`);
      }

      top50.push({
        position: i + 1,
        title,
        albumName,
        albumImage,
        artists,
        plays,
        month: monthDate,
      });
    }

  } catch (e) {
    console.log("⚠️ Error procesando la playlist:", e.message);
  } finally {
    if (!page.isClosed()) await page.close();
  }

  return top50;
}

async function scrapeArtistBasicInfo(browser, url) {
  const page = await browser.newPage();
  let listeners = null;
  let artistImageHistory = null;
  let backgroundArtistImage = null;

  try {
    await page.goto(url + "?locale=en", { waitUntil: "networkidle", timeout: 60000 });

    try {
      const listenersText = await page.locator('span:has-text("monthly listeners")').first().textContent();
      listeners = parseNumber(listenersText);
    } catch {}

    try {
      const styleValue = await page.locator('.J8g7rZ2MDknxmiYP.GUhu8mqqIMM0sZzG').getAttribute("style");
      const match = styleValue.match(/url\("(.*?)"\)/);
      artistImageHistory = match ? match[1] : null;
    } catch {}

    try {
      const styleValue = await page.locator('.jiWxWueoicolJZnS.jX9OuHoZE8EC2SYi').getAttribute("style");
      const match = styleValue.match(/url\("(.*?)"\)/);
      backgroundArtistImage = match ? match[1] : null;
    } catch {}

  } catch (error) {
    console.log(`❌ Error cargando página de artista: ${url}`);
  } finally {
    if (!page.isClosed()) await page.close();
  }

  return { url, listeners, artistImageHistory, backgroundArtistImage };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  const results = await scrapePlaylist(browser, TOP_50_GLOBAL);

  // Extraer todos los artistas únicos para no visitar la misma página dos veces
  const uniqueArtistUrls = new Set();
  results.forEach(track => {
    track.artists.forEach(a => {
      if (a.url) uniqueArtistUrls.add(a.url);
    });
  });

  const artistUrlsArray = Array.from(uniqueArtistUrls);
  console.log(`🎵 Se procesarán ${artistUrlsArray.length} artistas únicos para obtener su info...`);

  const artistDataMap = {};

  for (let i = 0; i < artistUrlsArray.length; i += BATCH_SIZE) {
    const batch = artistUrlsArray.slice(i, i + BATCH_SIZE);
    console.log(`📦 Procesando lote de artistas ${Math.floor(i / BATCH_SIZE) + 1} de ${Math.ceil(artistUrlsArray.length / BATCH_SIZE)}...`);

    const batchResults = await Promise.all(
      batch.map((url) => scrapeArtistBasicInfo(browser, url))
    );

    for (const r of batchResults) {
      artistDataMap[r.url] = r;
    }

    if (i + BATCH_SIZE < artistUrlsArray.length) {
      await new Promise((r) => setTimeout(r, DELAY_BETWEEN_BATCHES));
    }
  }

  // Ahora enriquecemos los resultados de la playlist
  for (const track of results) {
    for (const artist of track.artists) {
      if (artist.url && artistDataMap[artist.url]) {
        const extra = artistDataMap[artist.url];
        artist.listeners = extra.listeners;
        artist.artistImageHistory = extra.artistImageHistory;
        artist.backgroundArtistImage = extra.backgroundArtistImage;
      }
    }
  }

  await browser.close();
  saveResults(results);
}

function saveResults(data) {
  const filePath = "./spotify-data-global-top-50.json";

  let existingData = [];

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8").trim();
      if (raw) existingData = JSON.parse(raw);
    }
  } catch {
    existingData = [];
  }

  // Filtrar los datos anteriores que no sean de este mes (para reemplazarlos)
  const newData = existingData.filter(item => item.month !== monthDate);
  
  // Agregar los nuevos de este mes
  newData.push(...data);

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

  console.log("💾 Guardado OK en", filePath);
}

run();
