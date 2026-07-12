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
      cache: "reload"
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

let composDBPBECache = null;
export async function getComposFromDB() {
  if (composDBPBECache) return composDBPBECache;

  try {
    const response = await fetch('https://api.guiadeparche.com/tft/composicionesBD.php', {
      headers: FETCH_HEADERS,
      cache: "reload"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    
    const allComposArray = result.data || [];
    
    // Agrupamos por tier para que sea compatible con la función sortComps original
    const groupedByTier = {};
    allComposArray.forEach(compo => {
      if (compo.ocultar) return; // Si la compo está oculta, no la añadimos
      const tier = compo.tier || "B";
      if (!groupedByTier[tier]) {
        groupedByTier[tier] = [];
      }
      groupedByTier[tier].push(compo);
    });
    
    composDBPBECache = sortComps(groupedByTier);
    return composDBPBECache;
  } catch (err) {
    console.error("Error fetching composicionesBD.php remotely:", err);
    throw err;
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
      cache: "reload"
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
      cache: "reload"
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

export async function getLastUpdateDate(url = 'https://api.guiadeparche.com/tft/composMetaPBETest.json') {
  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'reload' });
    const lastModified = response.headers.get('Last-Modified');
    if (lastModified) {
      const date = new Date(lastModified);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  } catch (err) {
    console.warn("Could not get Last-Modified header, using today...", err.message);
  }
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
}

export async function getMetadata() {
  if (metadataCache) return metadataCache;

  if (typeof window === 'undefined') {
    try {
      const fileContent = await fetch('https://api.guiadeparche.com/tft/composMetaPBETest.json');
      const data = await fileContent.json();
      metadataCache = data;
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
  
  const filePath = path.join(process.cwd(), 'src/data/tftDataPBE.json');

  if (typeof window === 'undefined') {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      tftDataPBECache = JSON.parse(fileContent);
      return tftDataPBECache;
    } catch (err) {
      // Si el archivo local no existe, continuamos para hacer fetch y guardarlo
      console.warn("Archivo tftDataPBE.json local no encontrado, procediendo a descargar...");
    }
  }

  try {
    const response = await fetch('https://raw.communitydragon.org/pbe/cdragon/tft/es_ar.json');
    const data = await response.json();
    
    if (typeof window === 'undefined') {
      try {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(data), 'utf-8');
        console.log("Datos de TFT PBE descargados y guardados localmente con éxito.");
      } catch (writeErr) {
        console.warn("No se pudo guardar tftDataPBE.json localmente:", writeErr.message);
      }
    }
    
    tftDataPBECache = data;
    return tftDataPBECache;
  } catch (err) {
    console.error("Error fetching TFT PBE data remotely:", err);
    return null;
  }
}

