// Utilidades compartidas para normalizar slugs, filtrar entidades jugables
// y agrupar composiciones por set en las páginas SEO de TFT.

/**
 * Convierte cualquier nombre de ítem, campeón o sinergia en un slug SEO limpio.
 * Ejemplo: "Mano de la Justicia" -> "mano-de-la-justicia"
 */
export const slugifyTftEntity = (text) => {
  if (!text) return "";
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Normaliza un apiName de ítem para hacer match entre formatos clásicos (TFT_Item_)
 * y formatos de Data Assets nuevos (DA_Component_).
 */
export const normalizeItemApiName = (apiName) => {
  if (!apiName) return "";
  const raw = typeof apiName === "object" ? apiName.apiName || apiName.name || "" : String(apiName);
  return raw.trim().replace(/^DA_Component_/i, "TFT_Item_").toLowerCase();
};

const BASE_COMPONENT_API_NAMES = new Set([
  "tft_item_bfsword",
  "tft_item_recurvebow",
  "tft_item_needlesslylargerod",
  "tft_item_tearofthegoddess",
  "tft_item_chainvest",
  "tft_item_negatroncloak",
  "tft_item_giantsbelt",
  "tft_item_sparringgloves",
  "tft_item_spatula",
  "tft_item_fryingpan",
]);

/**
 * Determina si un objeto de la data de TFT es un ítem jugable digno de página SEO
 * (componentes base, crafteables, emblemas, artefactos, radiantes, soporte y especiales de set).
 */
export const isPlayableTftItem = (item) => {
  if (!item || !item.apiName) return false;
  if (item.url_seo && String(item.url_seo).trim() !== "") return true;

  const api = String(item.apiName);
  const apiLower = api.toLowerCase();
  const name = String(item.name || "").trim();

  if (!name || !item.icon) return false;
  // Descartar claves internas sin traducir ni nombres de depuración
  if (/^(tft\d*_item_|da_|item_|@|debug|placeholder|armory)/i.test(name)) return false;
  if (/(consumable|armorykey|debug|dummy|empty|tutorial|augment|encounter|quest|reward|loot|anvil|duplicator|remover|reforger|tome)/i.test(apiLower)) {
    return false;
  }

  const normalized = normalizeItemApiName(api);
  if (BASE_COMPONENT_API_NAMES.has(normalized)) return true;

  const composition = Array.isArray(item.composition) ? item.composition : [];
  if (composition.length === 2) return true;

  if (
    /emblem/i.test(api) ||
    /artifact/i.test(api) ||
    /ornn/i.test(api) ||
    /shimmerscale/i.test(api) ||
    /radiant/i.test(api) ||
    /support/i.test(api) ||
    /^da_heavenscale19_/i.test(api) ||
    /^tft\d+_item_artifact_/i.test(api)
  ) {
    return true;
  }

  return false;
};

/**
 * Parsea de forma segura un campo que puede venir como string JSON o como array/objeto.
 */
export const safeJsonParse = (value, fallback = null) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

/**
 * Extrae todos los apiNames de ítems usados en una composición (tablero, carry, prioridad, bestBuild y niveles).
 */
export const extractItemApiNamesFromComp = (comp) => {
  const found = new Set();
  if (!comp) return found;

  const addItem = (entry) => {
    if (!entry) return;
    const raw = typeof entry === "object" ? entry.apiName || entry.name : entry;
    if (!raw) return;
    found.add(String(raw).toLowerCase());
    found.add(normalizeItemApiName(raw));
  };

  const pos = safeJsonParse(comp.posicionamiento, []);
  if (Array.isArray(pos)) {
    pos.forEach((variant) => {
      if (variant && Array.isArray(variant.tablero)) {
        variant.tablero.forEach((cell) => {
          if (cell && Array.isArray(cell.apiNameItemsDelCampeon)) {
            cell.apiNameItemsDelCampeon.forEach(addItem);
          }
          if (cell && Array.isArray(cell.items)) {
            cell.items.forEach(addItem);
          }
        });
      }
    });
  }

  const champMeta = safeJsonParse(comp.campeonMeta, null);
  if (champMeta && Array.isArray(champMeta.apiNameItemsDelCampeon)) {
    champMeta.apiNameItemsDelCampeon.forEach(addItem);
  }

  const itemsPrio = safeJsonParse(comp.itemsPrio, []);
  if (Array.isArray(itemsPrio)) itemsPrio.forEach(addItem);

  const itemsPrioTanque = safeJsonParse(comp.itemsPrioTanque, []);
  if (Array.isArray(itemsPrioTanque)) itemsPrioTanque.forEach(addItem);

  const bestBuild = safeJsonParse(comp.bestBuild, []);
  if (Array.isArray(bestBuild)) bestBuild.forEach(addItem);

  return found;
};

/**
 * Verifica si una composición utiliza alguno de los ítems objetivo (soportando equivalencias entre sets).
 */
export const compUsesItem = (comp, targetApiNames = []) => {
  if (!comp || !targetApiNames.length) return false;
  const targets = new Set();
  targetApiNames.forEach((api) => {
    if (!api) return;
    targets.add(String(api).toLowerCase());
    targets.add(normalizeItemApiName(api));
  });

  const compItems = extractItemApiNamesFromComp(comp);
  for (const t of targets) {
    if (compItems.has(t)) return true;
  }
  return false;
};

/**
 * Verifica si una composición incluye alguno de los campeones objetivo (por apiName en cualquier tablero).
 */
export const compUsesChampion = (comp, targetApiNames = []) => {
  if (!comp || !targetApiNames.length) return false;
  const targets = new Set(targetApiNames.filter(Boolean).map((a) => String(a).toLowerCase()));

  const pos = safeJsonParse(comp.posicionamiento, []);
  if (Array.isArray(pos)) {
    const inBoard = pos.some((variant) => {
      if (!variant || !Array.isArray(variant.tablero)) return false;
      return variant.tablero.some((cell) => {
        if (!cell) return false;
        const api = String(cell.apiNameCampeon || cell.campeon || "").toLowerCase();
        return api && targets.has(api);
      });
    });
    if (inBoard) return true;
  }

  const champMeta = safeJsonParse(comp.campeonMeta, null);
  if (champMeta?.apiNameCampeon && targets.has(String(champMeta.apiNameCampeon).toLowerCase())) {
    return true;
  }

  return false;
};

const DOUBLE_TRAIT_CHAMPIONS = {
  tft18_lux_coven: ["DA_18_Coven"],
  tft18_lux_inferno: ["DA_18_Inferno"],
  tft18_lux_blackthorn: ["DA_18_Blackthorn"],
  tft18_lux_blossom: ["DA_18_Blossom"],
  tft18_lux_elderwood: ["DA_18_Elderwood"],
  tft18_lux_fae: ["DA_18_Fae"],
  tft18_lux_lunar: ["DA_18_Lunar"],
  tft18_lux_primal: ["DA_Primal18"],
  tft18_lux_solar: ["DA_18_Solar"],
  tft18_elderdragon: ["DA_Riftbeast18"],
};

/**
 * Calcula las sinergias activas de un tablero usando el catálogo del set correspondiente.
 */
export const calculateBoardSynergies = (tablero, setChampions = [], setItems = [], setTraits = []) => {
  const counts = {};
  const processedChampionTraits = new Set();
  if (!Array.isArray(tablero)) return counts;

  const champMap = new Map();
  setChampions.forEach((c) => {
    if (c?.apiName) champMap.set(c.apiName.toLowerCase(), c);
  });

  const itemMap = new Map();
  setItems.forEach((i) => {
    if (i?.apiName) itemMap.set(i.apiName.toLowerCase(), i);
  });

  const traitByApi = new Map();
  const traitByName = new Map();
  setTraits.forEach((t) => {
    if (t?.apiName) traitByApi.set(t.apiName.toLowerCase(), t);
    if (t?.name) traitByName.set(t.name.toLowerCase(), t);
  });

  const findTrait = (key) => {
    if (!key) return null;
    const low = String(key).toLowerCase();
    return traitByApi.get(low) || traitByName.get(low) || null;
  };

  tablero.forEach((cell) => {
    if (!cell) return;
    const rawApi = String(cell.apiNameCampeon || cell.campeon || "").toLowerCase();
    const champData = champMap.get(rawApi);
    if (!champData) return;

    const champTraitsRaw = safeJsonParse(champData.traits, champData.traits) || [];
    const resolvedTraits = [];
    if (Array.isArray(champTraitsRaw)) {
      champTraitsRaw.forEach((tKey) => {
        const tObj = findTrait(tKey);
        resolvedTraits.push(tObj ? tObj.apiName : String(tKey));
      });
    }

    if (cell.sinergiaExtraMissFortune && cell.sinergiaExtraMissFortune !== "Espina Negra") {
      const extraTrait = findTrait(cell.sinergiaExtraMissFortune);
      if (extraTrait) resolvedTraits.push(extraTrait.apiName);
    }

    if (Array.isArray(cell.sinergiasExtraKhazix)) {
      cell.sinergiasExtraKhazix.forEach((kt) => {
        const extraTrait = findTrait(kt);
        if (extraTrait) resolvedTraits.push(extraTrait.apiName);
      });
    }

    const collectedOnUnit = new Set();
    resolvedTraits.forEach((traitApi) => {
      if (!traitApi) return;
      const traitLow = traitApi.toLowerCase();
      collectedOnUnit.add(traitLow);
      const uniqueKey = `${rawApi}_${traitLow}`;
      if (!processedChampionTraits.has(uniqueKey)) {
        processedChampionTraits.add(uniqueKey);
        const doubles = DOUBLE_TRAIT_CHAMPIONS[rawApi] || [];
        const isDouble = doubles.some((d) => d.toLowerCase() === traitLow);
        counts[traitLow] = (counts[traitLow] || 0) + (isDouble ? 2 : 1);
      }
    });

    const rawItems = cell.apiNameItemsDelCampeon || [];
    if (Array.isArray(rawItems)) {
      rawItems.forEach((itemEntry) => {
        const itemApi = typeof itemEntry === "object" ? itemEntry?.apiName : itemEntry;
        if (!itemApi) return;
        const itemData = itemMap.get(String(itemApi).toLowerCase());
        const incompat = safeJsonParse(itemData?.incompatibleTraits, itemData?.incompatibleTraits);
        if (Array.isArray(incompat) && incompat.length > 0) {
          const emblemTrait = findTrait(incompat[0]);
          const emblemApi = (emblemTrait?.apiName || String(incompat[0])).toLowerCase();
          if (emblemApi && !collectedOnUnit.has(emblemApi)) {
            collectedOnUnit.add(emblemApi);
            counts[emblemApi] = (counts[emblemApi] || 0) + 1;
          }
        }
      });
    }
  });

  return counts;
};

/**
 * Agrupa composiciones por número de set en orden descendente (set más reciente primero).
 * Devuelve [{ setNumber: "19", comps: [...] }, { setNumber: "18", comps: [...] }]
 */
export const groupCompsBySet = (comps = [], fallbackSet = "19") => {
  const bySet = new Map();

  comps.forEach((comp) => {
    const setNum = String(comp?.set_number || fallbackSet);
    if (!bySet.has(setNum)) {
      bySet.set(setNum, []);
    }
    bySet.get(setNum).push(comp);
  });

  return Array.from(bySet.entries())
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([setNumber, list]) => ({
      setNumber,
      comps: list,
    }));
};
