import fs from 'fs/promises';
import path from 'path';
import https from 'https';

// The URL for the JSON data in PBE (Set 18)
const JSON_URL = 'https://raw.communitydragon.org/pbe/cdragon/tft/es_mx.json';

// Community Dragon base URL for PBE images
const CD_BASE_URL_GAME = 'https://raw.communitydragon.org/pbe/game/';

// Output directory para Set 18
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tft', 'sets', '18');

// Función para descargar un archivo usando https
const downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let body = [];
        res.on('data', (chunk) => body.push(chunk));
        res.on('end', () => {
          resolve(Buffer.concat(body));
        });
      } else {
        reject(new Error(`Falló la descarga ${url}: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const getImageUrl = (iconPath) => {
  if (!iconPath) return null;
  // Convertir al formato de CDragon: minúsculas y .tex / .dds a .png
  let normalized = iconPath.toLowerCase().replace('.tex', '.png').replace('.dds', '.png');
  
  if (normalized.startsWith('/')) {
    normalized = normalized.slice(1);
  }

  // Las rutas de los íconos de Riot normalmente son "assets/..."
  return `${CD_BASE_URL_GAME}${normalized}`;
};

const ensureDir = async (filePath) => {
  const dirname = path.dirname(filePath);
  try {
    await fs.access(dirname);
  } catch (e) {
    await fs.mkdir(dirname, { recursive: true });
  }
};

const downloadImages = async () => {
  console.log('🚀 Obteniendo datos de TFT Set 18 (PBE) desde Community Dragon...');
  
  try {
    const dataResponse = await fetch(JSON_URL);
    const data = await dataResponse.json();
    
    // Buscamos Set 18 o el último set disponible en PBE
    const set18 = data.setData.find(set => set.mutator === 'TFTSet18' || set.number === 18);
    const targetSet = set18 || (data.setData && data.setData[data.setData.length - 1]);
    
    console.log(`🎯 Set seleccionado: ${targetSet?.mutator || targetSet?.name || 'Desconocido'} (ID/Num: ${targetSet?.number})`);
    
    // targetSet.items y targetSet.augments son arrays de strings (apiNames). 
    // Los relacionamos con la lista global 'data.items' para obtener los objetos reales
    const globalItems = data.items || [];
    const setItemIds = targetSet ? (targetSet.items || []) : [];
    const setAugmentIds = targetSet ? (targetSet.augments || []) : [];
    
    const items = globalItems.filter(item => setItemIds.includes(item.apiName) && (item.icon || item.squareIcon));
    const augments = globalItems.filter(item => setAugmentIds.includes(item.apiName) && item.icon);
    
    // Lista negra: Entidades (apiNames) que NO quieres descargar
    const excludeTokens = [];
    
    // Descargamos TODOS los campeones y entidades del set, excepto los que estén en excludeTokens
    const champions = targetSet ? targetSet.champions.filter(c => 
      !excludeTokens.includes(c.apiName)
    ) : [];
    const traits = targetSet ? targetSet.traits : [];

    console.log(`📦 Encontrados: ${items.length} items, ${augments.length} aumentos, ${champions.length} campeones, ${traits.length} sinergias.`);

    const processIcon = async (iconPath, category) => {
      if (!iconPath) return;

      const url = getImageUrl(iconPath);
      if (!url) return;
      
      // Extraemos el nombre del archivo final
      const fileName = path.basename(url);
      const destPath = path.join(OUTPUT_DIR, category, fileName);

      try {
        await ensureDir(destPath);
        // Revisar si ya existe
        await fs.access(destPath);
        console.log(`[OMITIDO] ${fileName} ya existe en ${category}.`);
      } catch (e) {
        // No existe, procedemos a descargarlo
        try {
          const buffer = await downloadFile(url);
          await fs.writeFile(destPath, buffer);
          console.log(`[DESCARGADO] ${fileName} -> ${category}`);
        } catch (err) {
          console.error(`[ERROR] Falló la descarga de ${fileName} (${url}): ${err.message}`);
        }
      }
    };

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Creamos la cola de descargas
    const queue = [];
    
    // 1. Items
    items.forEach(item => queue.push(() => processIcon(item.icon || item.squareIcon, 'items')));
    
    // 2. Aumentos (Hexcore y ChoiceUI)
    augments.forEach(item => {
      if (item.icon) {
        const hasHexcore = item.icon.match(/\/hexcore\//i);
        const hasChoiceui = item.icon.match(/\/choiceui\//i);

        if (hasHexcore || hasChoiceui) {
          // Reemplazamos dinámicamente para asegurar que sacamos ambas versiones
          const hexcorePath = item.icon.replace(/\/(hexcore|choiceui)\//i, '/Hexcore/');
          const choiceuiPath = item.icon.replace(/\/(hexcore|choiceui)\//i, '/ChoiceUI/');
          queue.push(() => processIcon(hexcorePath, 'augments/hexcore'));
          queue.push(() => processIcon(choiceuiPath, 'augments/choiceui'));
        } else {
          queue.push(() => processIcon(item.icon, 'augments'));
        }
      }
    });
    
    // 3. Campeones (3 tipos de imagen en carpetas distintas)
    champions.forEach(champ => {
      if (champ.icon) queue.push(() => processIcon(champ.icon, 'champions/icon'));
      if (champ.squareIcon) queue.push(() => processIcon(champ.squareIcon, 'champions/squareIcon'));
      if (champ.tileIcon) queue.push(() => processIcon(champ.tileIcon, 'champions/tileIcon'));
    });
    
    // 4. Sinergias
    traits.forEach(trait => queue.push(() => processIcon(trait.icon, 'traits')));

    console.log(`⏳ Iniciando cola de descargas para ${queue.length} peticiones de imágenes...`);
    
    // Procesamos en lotes de 10 imágenes a la vez
    const chunkSize = 10;
    for (let i = 0; i < queue.length; i += chunkSize) {
      const chunk = queue.slice(i, i + chunkSize);
      await Promise.all(chunk.map(fn => fn()));
      await delay(200);
    }

    console.log('✅ ¡Todas las descargas de Set 18 han finalizado!');

  } catch (error) {
    console.error('❌ Error durante la descarga:', error);
  }
};

downloadImages();
