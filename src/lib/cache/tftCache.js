import fs from 'fs/promises';
import path from 'path';

const FETCH_HEADERS = {
  'User-Agent': 'Astro-Build-Process/1.0',
  'Accept': 'application/json, text/plain, */*'
};

let composMetaPBECache = null;
let composMetaCache = null;
let constantesCache = null;
let valorantConstantesCache = null;
let metadataCache = null;

const hierarchy = ["S", "A", "B", "C", "D", "MEME"];

function sortComps(data) {
  if (!data) return [];
  const allSorted = [];
  hierarchy.forEach(tier => {
    if (data[tier]) {
      const tierComps = [...data[tier]].sort((a, b) => (a.posicion || 0) - (b.posicion || 0));
      allSorted.push(...tierComps);
    }
  });
  return allSorted;
}

export async function getComposMetaPBE() {
  if (composMetaPBECache) return composMetaPBECache;

  // if (typeof window === 'undefined') {
  //   try {
  //     const filePath = path.join(process.cwd(), 'src/data/composMetaPBE.json');
  //     const fileContent = await fs.readFile(filePath, 'utf-8');
  //     const data = JSON.parse(fileContent);
  //     console.log({data:data['S']})
  //     composMetaPBECache = sortComps(data);
  //     return composMetaPBECache;
  //   } catch (err) {
  //     console.warn("Could not read local composMetaPBE.json, fetching remote...", err.message);
  //   }
  // }

  try {
    const response = await fetch('https://api.guiadeparche.com/tft/composMetaPBETest.json', {
      headers: FETCH_HEADERS,
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    composMetaPBECache = sortComps(data);
    return composMetaPBECache;
  } catch (err) {
    console.error("Error fetching composMetaPBE.json remotely:", err);
    throw err; // Hacemos que el build falle si no hay datos
  }
}

export async function getComposMeta() {
  if (composMetaCache) return composMetaCache;

  if (typeof window === 'undefined') {
    try {
      const filePath = path.join(process.cwd(), 'src/data/composMeta.json');
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      composMetaCache = sortComps(data);
      return composMetaCache;
    } catch (err) {
      console.warn("Could not read local composMeta.json, fetching remote...", err.message);
    }
  }

  try {
    const response = await fetch('https://api.guiadeparche.com/tft/composMeta.json', {
      headers: FETCH_HEADERS,
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    composMetaCache = sortComps(data);
    return composMetaCache;
  } catch (err) {
    console.error("Error fetching composMeta.json remotely:", err);
    throw err; // Hacemos que el build falle si no hay datos
  }
}

export async function getConstantes() {
  if (constantesCache) return constantesCache;

  // if (typeof window === 'undefined') {
  //   try {
  //     const filePath = path.join(process.cwd(), 'src/data/constantes.json');
  //     const fileContent = await fs.readFile(filePath, 'utf-8');
  //     constantesCache = JSON.parse(fileContent);
  //     return constantesCache;
  //   } catch (err) {
  //     console.warn("Could not read local constantes.json, fetching remote...", err.message);
  //   }
  // }

  try {
    const response = await fetch('https://api.guiadeparche.com/tft/constantes.json', {
      headers: FETCH_HEADERS,
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    constantesCache = data;
    return constantesCache;
  } catch (err) {
    console.error("Error fetching constantes.json remotely:", err);
    throw err; // Hacemos que el build falle si no hay datos
  }
}

export async function getValorantConstantes() {
  if (valorantConstantesCache) return valorantConstantesCache;

  if (typeof window === 'undefined') {
    try {
      const filePath = path.join(process.cwd(), 'src/data/valorantConstantes.json');
      const fileContent = await fs.readFile(filePath, 'utf-8');
      valorantConstantesCache = JSON.parse(fileContent);
      return valorantConstantesCache;
    } catch (err) {
      console.warn("Could not read local valorantConstantes.json, fetching remote...", err.message);
    }
  }

  try {
    const response = await fetch('https://api.guiadeparche.com/val/constantes.json');
    const data = await response.json();
    valorantConstantesCache = data;
    return valorantConstantesCache;
  } catch (err) {
    console.error("Error fetching valorantConstantes.json remotely:", err);
    throw err; // Hacemos que el build falle si no hay datos
  }
}

export async function getMetadata() {
  if (metadataCache) return metadataCache;

  if (typeof window === 'undefined') {
    try {
      const filePath = path.join(process.cwd(), 'src/data/metadata.json');
      const fileContent = await fs.readFile(filePath, 'utf-8');
      metadataCache = JSON.parse(fileContent);
      return metadataCache;
    } catch (err) {
      console.warn("Could not read local metadata.json, using defaults...", err.message);
    }
  }

  // Default fallback dates if not available
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  return {
    lastUpdate: formattedDate,
    lastUpdatePBE: formattedDate
  };
}

let tftDataPBECache = null;
export async function getTFTDataPBE() {
  if (tftDataPBECache) return tftDataPBECache;
  try {
    const response = await fetch('https://raw.communitydragon.org/pbe/cdragon/tft/es_mx.json');
    tftDataPBECache = await response.json();
    return tftDataPBECache;
  } catch (err) {
    console.error("Error fetching TFT PBE data remotely:", err);
    return null;
  }
}

