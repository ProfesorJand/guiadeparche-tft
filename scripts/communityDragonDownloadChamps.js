import fs from 'fs/promises';
import path from 'path';

// URL base de Community Dragon para personajes del PBE
const BASE_URL = 'https://raw.communitydragon.org/pbe/game/assets/characters/';

// Directorio de salida donde se guardarán las imágenes descargadas (.png)
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tft', 'sets', '18', 'champions', 'tileIcon');

// Función auxiliar para crear directorio si no existe
const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (e) {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

// Función auxiliar para esperar una pequeña pausa (evitar saturar el servidor)
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const downloadCommunityDragonChamps = async () => {
  console.log('🚀 Iniciando búsqueda de carpetas de campeones (tft18_) en Community Dragon...');
  console.log(`🌐 URL Base: ${BASE_URL}`);

  try {
    await ensureDir(OUTPUT_DIR);

    // 1. Obtener el HTML del listado del directorio principal
    const mainResponse = await fetch(BASE_URL);
    if (!mainResponse.ok) {
      throw new Error(`No se pudo acceder al directorio principal: HTTP ${mainResponse.status}`);
    }

    const mainHtml = await mainResponse.text();

    // 2. Buscar todas las carpetas que contengan "tft18_" en el href
    // Coincide con enlaces como <a href="tft18_ahri/">tft18_ahri/</a>
    const folderMatches = [...mainHtml.matchAll(/href="([^"]*tft18_[^"/]+)\/"/gi)];
    const folders = [...new Set(folderMatches.map(match => match[1]))];

    if (folders.length === 0) {
      console.warn('⚠️ No se encontraron carpetas con "tft18_" en la página.');
      return;
    }

    console.log(`📦 Se encontraron ${folders.length} carpetas de campeones del Set 18:`);
    console.log(folders.join(', '));

    const queue = [];

    // 3. Explorar cada carpeta tft18_ para buscar archivos .png
    for (const folder of folders) {
      const folderUrl = `${BASE_URL}${folder}/`;
      try {
        const folderResponse = await fetch(folderUrl);
        if (!folderResponse.ok) {
          console.error(`[ERROR] No se pudo leer la carpeta ${folder}: HTTP ${folderResponse.status}`);
          continue;
        }

        const folderHtml = await folderResponse.text();

        // Buscar todos los archivos terminados en .png en esta carpeta
        const pngMatches = [...folderHtml.matchAll(/href="([^"]+\.png)"/gi)];
        const pngFiles = [...new Set(pngMatches.map(match => match[1]))];

        if (pngFiles.length === 0) {
          console.log(`[AVISO] No se encontraron archivos .png en la carpeta ${folder}`);
        } else {
          for (const pngFile of pngFiles) {
            const imgUrl = `${folderUrl}${pngFile}`;
            const destPath = path.join(OUTPUT_DIR, pngFile);

            queue.push(async () => {
              try {
                await fs.access(destPath);
                console.log(`[OMITIDO] ${pngFile} ya existe.`);
              } catch {
                try {
                  const imgRes = await fetch(imgUrl);
                  if (imgRes.ok) {
                    const buffer = Buffer.from(await imgRes.arrayBuffer());
                    await fs.writeFile(destPath, buffer);
                    console.log(`[DESCARGADO] ${pngFile}`);
                  } else {
                    console.error(`[ERROR] Falló la descarga de ${pngFile}: HTTP ${imgRes.status}`);
                  }
                } catch (err) {
                  console.error(`[ERROR] Excepción descargando ${pngFile}: ${err.message}`);
                }
              }
            });
          }
        }
      } catch (folderErr) {
        console.error(`[ERROR] Error procesando carpeta ${folder}: ${folderErr.message}`);
      }
    }

    console.log(`\n⏳ Cola preparada: ${queue.length} archivos .png para descargar. Procesando en lotes...`);

    // 4. Procesar descargas en lotes para no sobrecargar la conexión
    const chunkSize = 10;
    for (let i = 0; i < queue.length; i += chunkSize) {
      const chunk = queue.slice(i, i + chunkSize);
      await Promise.all(chunk.map(fn => fn()));
      await delay(200);
    }

    console.log(`\n✅ ¡Proceso completado! Todas las imágenes de campeones están guardadas en:\n   ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('❌ Error general ejecutando el script:', error);
  }
};

downloadCommunityDragonChamps();
