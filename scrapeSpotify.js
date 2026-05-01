import { chromium } from "playwright";
import fs from "fs";

// 🔹 SOLO URLs ahora
const ARTISTS = [
  "https://open.spotify.com/artist/5H1nN1SzW0qNeUEZvuXjAj",
  "https://open.spotify.com/artist/3DeOmVSmpv7WknXoo1OS8p",
  "https://open.spotify.com/artist/4eq1q0o9XPyNq9RG3fNDD1",
  "https://open.spotify.com/artist/0zO8yNnw5GQgutcIyXfGBY",
  "https://open.spotify.com/artist/1aWJsBQa67l72j1VT3D6Ow",
  "https://open.spotify.com/artist/70nxnxEqDQIEWneRjg2Q4O",
  "https://open.spotify.com/artist/2AbQwU2cuEGfD465wCXlg2",
  "https://open.spotify.com/artist/2wkoKEfS6dXwThbyTnZWFU",
  "https://open.spotify.com/artist/1wGIhYkKWSq4yACtTkCkSX",
  "https://open.spotify.com/artist/4NEYQeEYBUjfaXgDQGvFvu",
  "https://open.spotify.com/artist/4uoz4FUMvpeyGClFTTDBsD",
  "https://open.spotify.com/artist/3smfreCkyJt7bShaTYpG77",
  "https://open.spotify.com/artist/3SCOuAxngTC1yGjKMcIPEd",
  "https://open.spotify.com/artist/5NS0854TqZQVoRmJKSWtFZ",
  "https://open.spotify.com/artist/7uQ1D2NNHs5cUL3CLKRbia",
  "https://open.spotify.com/artist/2ayNSoKPCRAfjp6hQ76hRu",
  "https://open.spotify.com/artist/1c84wItoiAe1pEbpJMqUmQ",
  "https://open.spotify.com/artist/2nrSPPSfNesng85eRV4W4m",
  "https://open.spotify.com/artist/52qzWdNUp6ebjcNsvgZSiC",
  "https://open.spotify.com/artist/2pvyE8W9RWESQxkyAWZqgY",
  "https://open.spotify.com/artist/5wUO3A6DT4tO5UDz21kE2Y",
  "https://open.spotify.com/artist/7f02bxFbZIOVdSbYRNYvLT",
  "https://open.spotify.com/artist/2TQ4CGgxxCWHqa9yYIGDoU",
  "https://open.spotify.com/artist/6fMZytDgX1Q9OV6ndSugym",
  "https://open.spotify.com/artist/6i3DxIlAqnDkwELLw4aVrx",
  "https://open.spotify.com/artist/15YnmlNukYCFvwaFnoDwwV",
  "https://open.spotify.com/artist/5x3mrCTZmkoTXURN7pWdGN",
  "https://open.spotify.com/artist/2IdDxiUkjLI0WfypRO1Rh3",
  "https://open.spotify.com/artist/1LU7BxbUvvuA4eNDdEO22D",
  "https://open.spotify.com/artist/7mXfsy3lF4kU0f2KTNKSr8",
  "https://open.spotify.com/artist/1JHgX0v8Dx86wpfQkZuJFg",
  "https://open.spotify.com/artist/54NBSkiOmMBEfacGfefPq0",
  "https://open.spotify.com/artist/6Ud6RjvNXVe39mKiGUb7zE",
  "https://open.spotify.com/artist/1PNgAcUW6UgN59okEaTpvG",
  "https://open.spotify.com/artist/2sU7vdIXtvChlnXIcUliVe",
  "https://open.spotify.com/artist/3b2zi4PtiILG4Iyswyk4LW",
  "https://open.spotify.com/artist/3B53VdSraW2MeEeLYAvEs1",
  "https://open.spotify.com/artist/4SQdUpG4f7UbkJG3cJ2Iyj",
  "https://open.spotify.com/artist/0qHbO3z6lgLE6ZYCkQBo1K",
  "https://open.spotify.com/artist/0OluGbRuQQEcYyttGww517",
  "https://open.spotify.com/artist/1YZEoYFXx4AxVv13OiOPvZ",
  "https://open.spotify.com/artist/34OLInsXImlQpjzmQw9Wd3",
  "https://open.spotify.com/artist/4LdArZAC1QPQdyz8JNOYVW",
  "https://open.spotify.com/artist/29b16XDtyMXDrfo2hZ69wf",
  "https://open.spotify.com/artist/0cxXnDhpgxcMMkKddhORHY",
  "https://open.spotify.com/artist/081F5qgtVMfcHZKDY1IEa0",
  "https://open.spotify.com/artist/38zyliF0xdJKS7k1BIEuL6",
  "https://open.spotify.com/artist/4u1dsEB1FKbGcdG0EAvxP8",
  "https://open.spotify.com/artist/1BCfXYvYcVKfcNNV7h3TKJ",
  "https://open.spotify.com/artist/1VrWc8r4AjrR8YfT0vlsc7",
  "https://open.spotify.com/artist/3KaNWDYObY73SDpcZBRzuw",
  "https://open.spotify.com/artist/3LzBrsUL9GilMqdTaKaKL7",
  "https://open.spotify.com/artist/6jEjSPxnwsibG6vPOjkeER",
  "https://open.spotify.com/artist/0oxb3uhVq0HQLq3Oi7OIp7",
  "https://open.spotify.com/artist/2pg6yxVpoNN8yJSKHUgRw8",
  "https://open.spotify.com/artist/3tQrRoZiGXR5uMkaCYf8S4",
  "https://open.spotify.com/artist/1c8m6rFeA6QIhImbIaZ7k2",
  "https://open.spotify.com/artist/29GjVRVQSln078FWYOX4r4",
  "https://open.spotify.com/artist/55IzEzlyUcBFqGgyam2Seo",
  "https://open.spotify.com/artist/44clbgZfF4GkBAyduMPE2W",
  "https://open.spotify.com/artist/4OMnvxQdSJeobzinrEjTpO",
  "https://open.spotify.com/artist/0kyQwKHCZnKE7kTXkxXjrB",
  "https://open.spotify.com/artist/316XlJTSEuNi2LaH6I2x7y",
  "https://open.spotify.com/artist/6hgiVWraSMs9mbUrhPq8Oh",
  "https://open.spotify.com/artist/2J6w7AO0a1hghIqa6cO7pg",
  "https://open.spotify.com/artist/7rQgfDLAHgLGCmgQAZTUN7",
  "https://open.spotify.com/artist/1Kh1ez0McTFCo8s4Z8Q8S0",
  "https://open.spotify.com/artist/0lO6av16Xf5O2O39jHdyHx",
];


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

// 🔹 scraper principal
async function scrapeArtist(browser, url) {
  const page = await browser.newPage();

  let name = null;
  let listeners = null;
  let artistImage = null;
  let artistImageHistory = null;
  let backgroundArtistImage = null;
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
      console.log("⚠️ Imagen artista History no encontrada");
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

    // 🎵 Tracks
    try {
      await page.locator('.sL0wneoReggMaCXb').click();
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
          /* hacer un scraper con este link primero para obtener la imagen del artista con class = obD7rdENNc2n3fC0 eaeL4RTunr0p3ojT qIwhHcbG780QDz68 */
          if (!artistImage && link && i === 0) {
            try {
              artistImage = await scraptArtistImageFromMusic(browser, link);
            } catch (e) {
              console.log("⚠️ Falló obtención de imagen desde track");
            }
          }

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
          console.log({ plays })
        } catch { }

        songs.push({ title, link, image, plays });
      }
    } catch (e) {
      console.log("⚠️ Tracks no encontrados");
    }

    console.log(`✅ ${name || "Sin nombre"} (${listeners || "sin datos"})`);

  } catch (error) {
    console.error("❌ Error cargando página:", url);
  }

  try {
    await page.close();
  } catch (e) {}

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

async function scraptArtistImageFromMusic(browser, url) {
  // Reutilizamos el navegador, solo creamos una nueva página
  console.log("scraptArtistImageFromMusic")
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

    const seeAllButton = page.locator('button:has-text("See all artists")');
    if (await seeAllButton.isVisible({ timeout: 3000 })) {
      await seeAllButton.click();
      await page.waitForTimeout(1000);
    }

    await page.waitForSelector('[data-testid="track-artist-link-card"] img', { timeout: 5000 }).catch(() => {});

    const imgs = await page.locator('[data-testid="track-artist-link-card"] img').all();
    let getSRC = [];
    for (const img of imgs) {
      getSRC.push({
        img: await img.getAttribute("src"),
        name: await img.getAttribute("alt")
      });
    }
    console.log({ getSRC })
    return getSRC;
  } catch (e) {
    console.log("no se encontro la imagen del artista")
    return null;
  } finally {
    try {
      await page.close();
    } catch (e) {}
  }
}

// 🔹 batches
async function run() {
  const browser = await chromium.launch({ headless: true });

  const results = [];

  for (let i = 0; i < ARTISTS.length; i += BATCH_SIZE) {
    const batch = ARTISTS.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map((url) => scrapeArtist(browser, url))
    );

    results.push(...batchResults);

    if (i + BATCH_SIZE < ARTISTS.length) {
      await new Promise((r) =>
        setTimeout(r, DELAY_BETWEEN_BATCHES)
      );
    }
  }

  await browser.close();

  saveResults(results);
}

// 💾 guardar JSON seguro
function saveResults(data) {
  const filePath = "./spotify-data.json";

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