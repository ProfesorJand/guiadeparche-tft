import fs from 'fs/promises';
import path from 'path';

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Referer': 'https://guiadeparche.com/'
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

let metaEntidadesCache = {};
export async function getMetaEntidades(tableName) {
  if (metaEntidadesCache[tableName]) return metaEntidadesCache[tableName];

  try {
    const response = await fetch(`https://api.guiadeparche.com/tft/getMetaEntidades.php?table=${tableName}`, {
      headers: FETCH_HEADERS,
      cache: "reload"
    });
    // Si la API aún no existe o hay error, no rompemos el build
    if (!response.ok) return []; 
    
    // Suponemos que la API retorna { data: [...] } o simplemente [...]
    const text = await response.text();
    if (!text) return [];
    
    const result = JSON.parse(text);
    const parsedList = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    metaEntidadesCache[tableName] = parsedList;
    return metaEntidadesCache[tableName];
  } catch (err) {
    console.error(`Error fetching ${tableName} remotely:`, err);
    return [];
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

let constantesCacheTimestamp = 0;
let fetchingConstantesPromise = null;

export async function getConstantes() {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.DEV : process.env.NODE_ENV !== 'production';
  // En dev: TTL de 3 segundos para ver cambios inmediatamente al recargar. En build/prod: TTL de 60 segundos para no saturar la API en la generación estática.
  const TTL = isDev ? 3000 : 60000;

  if (constantesCache && (Date.now() - constantesCacheTimestamp < TTL)) {
    return constantesCache;
  }

  // Deduplicación: si ya hay una petición en vuelo, devolvemos la misma promesa
  if (fetchingConstantesPromise) {
    return fetchingConstantesPromise;
  }

  fetchingConstantesPromise = (async () => {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        // Añadimos cache-busting (?_t=...) y cabeceras para que proxys intermedios entreguen el valor fresco
        const url = `https://api.guiadeparche.com/tft/constantes.php?_t=${Date.now()}`;
        const response = await fetch(url, {
          headers: {
            ...FETCH_HEADERS,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          cache: "reload"
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        constantesCache = data;
        constantesCacheTimestamp = Date.now();
        return constantesCache;
      } catch (err) {
        lastError = err;
        console.warn(`⚠️ Intento ${attempt} falló al obtener constantes.json:`, err.message);
        if (attempt < 3) {
          // Esperar 2 segundos antes de reintentar
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    
    console.error("❌ Error fatal fetching constantes.json remotely después de 3 intentos:", lastError);
    // Fallback seguro al caché en memoria si la petición falla
    if (constantesCache) return constantesCache;
    throw lastError; // Solo falla el build si nunca se ha podido obtener datos
  })().finally(() => {
    fetchingConstantesPromise = null;
  });

  return fetchingConstantesPromise;
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

export async function getLastUpdateDate(tableName = 'composiciones_tft') {
  try {
    const url = `https://api.guiadeparche.com/tft/getLastUpdate.php?table=${tableName}`;
    const response = await fetch(url, { cache: 'reload' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    if (data.status === 'success' && data.lastUpdate) {
      const date = new Date(data.lastUpdate);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  } catch (err) {
    console.warn(`Could not get Last-Modified for table ${tableName}, using today...`, err.message);
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

const setDataBuildCache = {};
/**
 * Obtiene los campeones, sinergias e ítems de un set concreto durante SSR/Build,
 * priorizando el backend PHP (getDataTFT.php) y usando el JSON local de respaldo si existe.
 */
export async function getSetDataForBuild(setNumber) {
  const key = String(setNumber);
  if (setDataBuildCache[key]) return setDataBuildCache[key];

  let apiPayload = null;
  try {
    const response = await fetch(`https://api.guiadeparche.com/tft/getDataTFT.php?set=${key}`, {
      headers: FETCH_HEADERS,
      cache: "reload"
    });
    if (response.ok) {
      const json = await response.json();
      apiPayload = json?.data || json;
    }
  } catch (err) {
    console.warn(`⚠️ No se pudo obtener getDataTFT.php?set=${key}:`, err.message);
  }

  let localPayload = null;
  if (typeof window === 'undefined') {
    const localCandidates = [
      path.join(process.cwd(), `src/data/set${key}_es_MX.json`),
      path.join(process.cwd(), `src/data/set${key}.json`),
    ];
    for (const candidate of localCandidates) {
      try {
        const raw = await fs.readFile(candidate, 'utf-8');
        const parsed = JSON.parse(raw);
        localPayload = parsed?.data || parsed;
        break;
      } catch {
        // Probar siguiente candidato
      }
    }
  }

  const pickList = (field) => {
    const fromApi = Array.isArray(apiPayload?.[field]) ? apiPayload[field] : [];
    const fromLocal = Array.isArray(localPayload?.[field]) ? localPayload[field] : [];
    // Si la API trae la lista poblada, la usamos; si no, caemos al JSON local del set
    return fromApi.length > 0 ? fromApi : fromLocal;
  };

  const result = {
    setNumber: key,
    champions: pickList('champions').map((c) => ({ ...c, tft_set: String(c.tft_set || key) })),
    traits: pickList('traits').map((t) => ({ ...t, tft_set: String(t.tft_set || key) })),
    items: pickList('items').map((i) => ({ ...i, tft_set: String(i.tft_set || key) })),
  };

  setDataBuildCache[key] = result;
  return result;
}

const DEFAULT_EXCLUDED_SEO_RULES = [
  { pattern: '/admin', match_type: 'prefix' },
  { pattern: '/perfil', match_type: 'prefix' },
  { pattern: '/login', match_type: 'prefix' },
];

let excludedSeoRulesCache = null;

/**
 * Obtiene desde el backend las rutas marcadas como "No indexar" en el panel de Admin.
 * Se cachea una sola vez por build para inyectar <meta name="robots" content="noindex, nofollow" />.
 */
export async function getExcludedSeoRules() {
  if (excludedSeoRulesCache) return excludedSeoRulesCache;

  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 4000) : null;
    const response = await fetch('https://api.guiadeparche.com/seo/manage_exclusions.php', {
      headers: FETCH_HEADERS,
      signal: controller ? controller.signal : undefined,
    });
    if (timer) clearTimeout(timer);

    if (response.ok) {
      const json = await response.json();
      if (json && Array.isArray(json.rules) && json.rules.length > 0) {
        excludedSeoRulesCache = json.rules;
        return excludedSeoRulesCache;
      }
    }
  } catch (err) {
    console.warn('⚠️ No se pudieron cargar las reglas SEO de exclusión, usando defaults:', err.message);
  }

  excludedSeoRulesCache = DEFAULT_EXCLUDED_SEO_RULES;
  return excludedSeoRulesCache;
}

export function isPathExcludedBySeoRules(pathname = '/', rules = []) {
  if (!pathname || !Array.isArray(rules) || rules.length === 0) return false;
  const cleanPath = String(pathname).toLowerCase().replace(/\/+$/, '') || '/';

  return rules.some((rule) => {
    const rawPattern = typeof rule === 'string' ? rule : rule?.pattern;
    const matchType = typeof rule === 'object' ? (rule?.match_type || 'prefix') : 'prefix';
    if (!rawPattern) return false;
    const cleanPattern = String(rawPattern).toLowerCase().replace(/\/+$/, '') || '/';
    if (cleanPattern === '/') return false;
    if (matchType === 'exact') {
      return cleanPath === cleanPattern;
    }
    return cleanPath === cleanPattern || cleanPath.startsWith(cleanPattern + '/');
  });
}

