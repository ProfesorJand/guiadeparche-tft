import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

// URLs to download
const DOWNLOADS = [
  // {
  //   url: 'https://api.guiadeparche.com/tft/composMeta.json',
  //   filename: 'composMeta.json',
  //   isCritical: true,
  //   saveHeader: 'lastUpdate'
  // },
  {
    url: 'https://api.guiadeparche.com/tft/composMetaPBETest.json',
    filename: 'composMetaPBETest.json',
    isCritical: true,
    saveHeader: 'lastUpdatePBE'
  },
  {
    url: 'https://api.guiadeparche.com/tft/constantes.json',
    filename: 'constantes.json',
    isCritical: true
  },
  {
    url: 'https://api.guiadeparche.com/val/constantes.json',
    filename: 'valorantConstantes.json',
    isCritical: true
  }
];

const CDRAGON_URL = 'https://raw.communitydragon.org/pbe/cdragon/tft/en_us.json';

// Format date to dia/mes/año
function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  } catch (e) {
    return null;
  }
}

// Fetch URL using Node's native fetch API
async function fetchUrl(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}, status code: ${response.status}`);
  }

  const data = await response.text();
  return { data, headers: response.headers };
}

async function run() {
  console.log('--- Starting TFT Pre-Build Data Download ---');

  // Create data directory if it doesn't exist
  if (!fs.existsSync(DATA_DIR)) {
    console.log(`Creating directory: ${DATA_DIR}`);
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const metadata = {
    lastUpdate: formatDate(new Date()),
    lastUpdatePBE: formatDate(new Date())
  };

  // 1. Download regular JSON files
  console.log('Downloading static API files...');
  try {
    const downloadPromises = DOWNLOADS.map(async (item) => {
      try {
        console.log(`Downloading ${item.url} -> ${item.filename}`);
        const { data, headers } = await fetchUrl(item.url);
        
        // Try parsing JSON to ensure it is valid
        JSON.parse(data);

        // Save file
        fs.writeFileSync(path.join(DATA_DIR, item.filename), data, 'utf-8');
        console.log(`Successfully saved ${item.filename}`);

        // Extract last-modified header if requested
        if (item.saveHeader && headers['last-modified']) {
          const formatted = formatDate(headers['last-modified']);
          if (formatted) {
            metadata[item.saveHeader] = formatted;
            console.log(`Found Last-Modified for ${item.filename}: ${formatted}`);
          }
        }
      } catch (err) {
        console.error(`Error downloading ${item.filename}:`, err);
        if (err.cause) {
          console.error(`Cause:`, err.cause);
        }
        if (item.isCritical) {
          throw err; // Re-throw to fail fast
        }
      }
    });

    await Promise.all(downloadPromises);
  } catch (err) {
    console.error('Critical download failed. Aborting build pre-requisites.');
    process.exit(1);
  }

  // 2. Download and process Community Dragon TFT JSON
  console.log(`Downloading Community Dragon TFT data: ${CDRAGON_URL}`);
  try {
    const { data } = await fetchUrl(CDRAGON_URL);
    console.log('Parsing Community Dragon JSON...');
    const cdragonData = JSON.parse(data);
    fs.writeFileSync(
        path.join(DATA_DIR, 'cdragonData.json'),
        JSON.stringify(cdragonData, null, 2),
        'utf-8'
      );

    // Extract items
    if (cdragonData.items) {
      console.log('Saving items.json...');
      fs.writeFileSync(
        path.join(DATA_DIR, 'items.json'),
        JSON.stringify(cdragonData.items, null, 2),
        'utf-8'
      );
    }

    // Extract traits, champions and setData
    if (cdragonData.sets) {
      const setNumbers = Object.keys(cdragonData.sets).map(Number);
      const maxSet = Math.max(...setNumbers);
      console.log(`Detected latest set in Community Dragon data: Set ${maxSet}`);

      if (cdragonData.sets[maxSet]) {
        if (cdragonData.sets[maxSet].traits) {
          console.log('Saving traits.json...');
          fs.writeFileSync(
            path.join(DATA_DIR, 'traits.json'),
            JSON.stringify(cdragonData.sets[maxSet].traits, null, 2),
            'utf-8'
          );
        }
        if (cdragonData.sets[maxSet].champions) {
          console.log('Saving champions.json...');
          fs.writeFileSync(
            path.join(DATA_DIR, 'champions.json'),
            JSON.stringify(cdragonData.sets[maxSet].champions, null, 2),
            'utf-8'
          );
        }
      }
    }

    if (cdragonData.setData) {
      console.log('Saving setData.json...');
      fs.writeFileSync(
        path.join(DATA_DIR, 'setData.json'),
        JSON.stringify(cdragonData.setData, null, 2),
        'utf-8'
      );
    }

    console.log('Community Dragon processing complete.');
  } catch (err) {
    console.error('Failed to download or parse Community Dragon data:', err.message);
    console.log('Warning: Falling back to dummy or empty arrays for items/traits to avoid complete failure.');
    // Write fallbacks if files don't exist
    if (!fs.existsSync(path.join(DATA_DIR, 'items.json'))) {
      fs.writeFileSync(path.join(DATA_DIR, 'items.json'), '[]', 'utf-8');
    }
    if (!fs.existsSync(path.join(DATA_DIR, 'traits.json'))) {
      fs.writeFileSync(path.join(DATA_DIR, 'traits.json'), '[]', 'utf-8');
    }
  }

  // 3. Save metadata
  try {
    fs.writeFileSync(path.join(DATA_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf-8');
    console.log('Successfully saved metadata.json:', metadata);
  } catch (err) {
    console.error('Failed to save metadata.json:', err.message);
  }

  console.log('--- TFT Pre-Build Data Download Finished Successfully ---');
}

run();
