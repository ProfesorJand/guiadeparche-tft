/**
 * Utilidades de clasificación de ítems TFT, generación de claves canónicas
 * independientes del orden y derivación de datos para Master Plan e Infografías.
 */

const normalizeComponentApi = (c = '') => String(c || '').replace('DA_Component_', 'TFT_Item_');

/**
 * Orden canónico de los 8 componentes básicos de combate (sin Espátula ni Sartén)
 */
export const ORDERED_COMBAT_COMPONENTS = [
  'TFT_Item_BFSword',            // 0 - Espadón
  'TFT_Item_RecurveBow',         // 1 - Arco
  'TFT_Item_NeedlesslyLargeRod', // 2 - Vara
  'TFT_Item_TearOfTheGoddess',   // 3 - Lágrima
  'TFT_Item_ChainVest',          // 4 - Cota de Malla
  'TFT_Item_NegatronCloak',      // 5 - Capa de Negatrón
  'TFT_Item_GiantsBelt',         // 6 - Cinturón de Gigante
  'TFT_Item_SparringGloves',     // 7 - Guantes
];

const BASE_COMBAT_COMPONENTS = new Set(ORDERED_COMBAT_COMPONENTS);

const SUPPORT_ORNN_API_NAMES = new Set([
  'TFT4_Item_OrnnObsidianCleaver',
  'TFT4_Item_OrnnRanduinsSanctum',
]);

/**
 * Genera una clave canónica para una combinación de ítems sin importar su orden.
 * Conserva duplicados si una build usa dos veces el mismo ítem (ej. doble Rabadon).
 */
export const buildComboKey = (items = []) => {
  if (!Array.isArray(items)) return '';
  const clean = items
    .map((v) => String(v || '').trim())
    .filter(Boolean);
  if (clean.length === 0) return '';
  return [...clean].sort((a, b) => a.localeCompare(b)).join('|');
};

/**
 * Normaliza una fila a exactamente 3 slots de string
 */
export const normalizeTriplet = (row = []) => [
  String(row?.[0] || '').trim(),
  String(row?.[1] || '').trim(),
  String(row?.[2] || '').trim(),
];

/**
 * Comprueba si una fila tiene al menos 1 ítem asignado
 */
export const hasAnyItemInRow = (row = []) =>
  Array.isArray(row) && row.some((item) => Boolean(String(item || '').trim()));

/**
 * Clasifica un ítem de TFT en:
 * 'emblem' | 'radiant' | 'artifact' | 'craftable' | 'other'
 */
export const classifyTftItem = (itemOrApiName, allItems = [], craftableApiSet = null) => {
  const itemObj =
    typeof itemOrApiName === 'string'
      ? allItems.find((i) => i?.apiName === itemOrApiName) || { apiName: itemOrApiName }
      : itemOrApiName;

  if (!itemObj || !itemObj.apiName) return 'other';

  const apiName = String(itemObj.apiName);
  const apiLower = apiName.toLowerCase();
  const nameLower = String(itemObj.name || '').toLowerCase();

  // 1. Emblemas (prioridad máxima para excluirlos de crafteables normales)
  if (
    apiLower.includes('emblem') ||
    nameLower.includes('emblem') ||
    nameLower.includes('emblema')
  ) {
    return 'emblem';
  }

  // 2. Radiantes
  if (apiLower.includes('radiant') || nameLower.includes('radiante')) {
    return 'radiant';
  }

  // 3. Artefactos (Ornn, Artifact, Shimmerscale, DA_Artifact)
  if (
    !SUPPORT_ORNN_API_NAMES.has(apiName) &&
    (apiLower.includes('artifact') ||
      apiLower.includes('ornn') ||
      apiLower.includes('shimmerscale'))
  ) {
    return 'artifact';
  }

  // 4. Crafteables normales (combinando los 8 componentes básicos de combate, sin espátula/sartén)
  if (craftableApiSet && craftableApiSet.has(apiName)) {
    return 'craftable';
  }

  const comp = Array.isArray(itemObj.composition)
    ? itemObj.composition.map(normalizeComponentApi)
    : [];
  if (
    comp.length === 2 &&
    BASE_COMBAT_COMPONENTS.has(comp[0]) &&
    BASE_COMBAT_COMPONENTS.has(comp[1])
  ) {
    return 'craftable';
  }

  return 'other';
};

/**
 * Determina si un ítem es crafteable normal (válido para la columna BIS estándar sin emblemas)
 */
export const isCraftableWithoutEmblems = (itemOrApiName, allItems = [], craftableApiSet = null) =>
  classifyTftItem(itemOrApiName, allItems, craftableApiSet) === 'craftable';

/**
 * Construye el Set de apiNames crafteables normales (sin emblemas) a partir de un catálogo de ítems
 */
export const buildCraftableApiSet = (allItems = [], knownCraftables = []) => {
  const set = new Set();

  (knownCraftables || []).forEach((item) => {
    const apiName = typeof item === 'string' ? item : item?.apiName;
    if (!apiName) return;
    const lower = apiName.toLowerCase();
    const nameLower = String(item?.name || '').toLowerCase();
    if (lower.includes('emblem') || nameLower.includes('emblem') || nameLower.includes('emblema')) {
      return;
    }
    const comp = Array.isArray(item?.composition)
      ? item.composition.map(normalizeComponentApi)
      : [];
    if (
      comp.length === 2 &&
      (!BASE_COMBAT_COMPONENTS.has(comp[0]) || !BASE_COMBAT_COMPONENTS.has(comp[1]))
    ) {
      return;
    }
    set.add(apiName);
  });

  (allItems || []).forEach((item) => {
    if (!item?.apiName) return;
    const comp = Array.isArray(item.composition)
      ? item.composition.map(normalizeComponentApi)
      : [];
    if (
      comp.length === 2 &&
      BASE_COMBAT_COMPONENTS.has(comp[0]) &&
      BASE_COMBAT_COMPONENTS.has(comp[1])
    ) {
      const lower = item.apiName.toLowerCase();
      const nameLower = String(item.name || '').toLowerCase();
      if (!lower.includes('emblem') && !nameLower.includes('emblem') && !nameLower.includes('emblema')) {
        set.add(item.apiName);
      }
    }
  });

  return set;
};

/**
 * Deriva automáticamente el objeto `mejoresItems` (Artefactos, Radiantes, Emblemas, Especiales)
 * ESTRICTAMENTE a partir de las combinaciones presentes en el `bestBuild` activo de una composición.
 * Si se quitan filas de 3 ítems de un campeón en la composición, los objetos exclusivos de esas filas
 * desaparecen de sus indicadores automáticamente.
 */
export const deriveMejoresItemsFromBestBuild = (
  bestBuild = [],
  allItems = [],
  craftableApiSet = null
) => {
  const result = {
    Artefactos: [],
    Radiantes: [],
    Emblemas: [],
    Especiales: [],
  };

  if (!Array.isArray(bestBuild)) return result;

  const champMap = new Map();

  bestBuild.forEach((buildRow) => {
    const champApi = String(buildRow?.apiNameCampeon || '').trim();
    if (!champApi) return;

    if (!champMap.has(champApi)) {
      champMap.set(champApi, {
        Artefactos: new Set(),
        Radiantes: new Set(),
        Emblemas: new Set(),
        Especiales: new Set(),
      });
    }

    const bucket = champMap.get(champApi);
    const allTriplets = [
      ...(Array.isArray(buildRow?.apiNameItemsBisDelCampeon) ? buildRow.apiNameItemsBisDelCampeon : []),
      ...(Array.isArray(buildRow?.apiNameItemsSpecialBisDelCampeon) ? buildRow.apiNameItemsSpecialBisDelCampeon : []),
    ];

    allTriplets.forEach((triplet) => {
      if (!Array.isArray(triplet)) return;
      triplet.forEach((rawApiName) => {
        const itemApi = String(rawApiName || '').trim();
        if (!itemApi) return;

        const category = classifyTftItem(itemApi, allItems, craftableApiSet);
        if (category === 'artifact') bucket.Artefactos.add(itemApi);
        else if (category === 'radiant') bucket.Radiantes.add(itemApi);
        else if (category === 'emblem') bucket.Emblemas.add(itemApi);
        else if (category === 'other') bucket.Especiales.add(itemApi);
      });
    });
  });

  champMap.forEach((bucket, champApi) => {
    ['Artefactos', 'Radiantes', 'Emblemas', 'Especiales'].forEach((catKey) => {
      const itemsArr = Array.from(bucket[catKey]);
      if (itemsArr.length > 0) {
        result[catKey].push({
          apiNameCampeon: champApi,
          apiNameItemsDelCampeon: itemsArr,
        });
      }
    });
  });

  return result;
};

/**
 * Busca el registro de itemización de un campeón en el mapa del set (con fallback case-insensitive)
 */
export const findChampionItemizacion = (setMap = {}, champApiName = '') => {
  if (!setMap || !champApiName) return null;
  if (setMap[champApiName]) return setMap[champApiName];

  const targetLower = String(champApiName).toLowerCase();
  const matchedKey = Object.keys(setMap).find((k) => k.toLowerCase() === targetLower);
  return matchedKey ? setMap[matchedKey] : null;
};

/**
 * Filtra las combinaciones de 3 ítems que fueron eliminadas (activo = 0) en "Itemizacion Campeones"
 * para que nunca vuelvan a mostrarse en una composición ni se re-inserten al editarla.
 */
export const filterDeletedCombosFromBestBuild = (bestBuild = [], setItemizacionMap = {}) => {
  if (!Array.isArray(bestBuild)) return [];
  if (!setItemizacionMap || Object.keys(setItemizacionMap).length === 0) return bestBuild;

  return bestBuild.map((buildRow) => {
    const champApi = buildRow?.apiNameCampeon;
    const record = findChampionItemizacion(setItemizacionMap, champApi);
    if (!record || !record.deleted_keys) return buildRow;

    const deletedBis = new Set(record.deleted_keys.bis || []);
    const deletedSpecial = new Set(record.deleted_keys.special_bis || []);

    if (deletedBis.size === 0 && deletedSpecial.size === 0) return buildRow;

    const filteredBis = (buildRow.apiNameItemsBisDelCampeon || []).filter((triplet) => {
      const key = buildComboKey(triplet);
      return !key || !deletedBis.has(key);
    });

    const filteredSpecial = (buildRow.apiNameItemsSpecialBisDelCampeon || []).filter((triplet) => {
      const key = buildComboKey(triplet);
      return !key || !deletedSpecial.has(key);
    });

    return {
      ...buildRow,
      apiNameItemsBisDelCampeon: filteredBis,
      apiNameItemsSpecialBisDelCampeon: filteredSpecial,
    };
  });
};

/**
 * Ordena ítems candidatos por frecuencia descendente y luego por orden de aparición
 */
const rankItemsByPriority = (occurrences = []) => {
  const stats = new Map();
  occurrences.forEach((apiName, idx) => {
    if (!apiName) return;
    if (!stats.has(apiName)) {
      stats.set(apiName, { apiName, count: 0, firstIdx: idx });
    }
    stats.get(apiName).count += 1;
  });

  return Array.from(stats.values())
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.firstIdx - b.firstIdx;
    })
    .map((entry) => entry.apiName);
};

/**
 * Deriva todos los bloques necesarios de una fila de la Infografía de Itemización:
 * - bisPrincipal (3 slots)
 * - alternativos (5 o 6 ítems crafteables de BIS secundarios y BIS Especiales sin repetir el BIS principal)
 * - radiantes (extraídos de BIS Especiales + extras opcionales del campeón)
 * - artefactos (extraídos de BIS Especiales + extras opcionales del campeón)
 * - emblemas (extraídos de BIS Especiales + extras opcionales del campeón)
 */
export const deriveInfographicRow = (
  champ,
  champRecord = null,
  allItems = [],
  options = {}
) => {
  const {
    maxAlternativos = 6,
    maxRadiantes = 3,
    maxArtefactos = 4,
    maxEmblemas = 3,
    craftableApiSet = null,
  } = options;

  const bisRows = Array.isArray(champRecord?.bis) ? champRecord.bis : [];
  const specialRows = Array.isArray(champRecord?.special_bis) ? champRecord.special_bis : [];
  const extras = champRecord?.extras || { radiantes: [], artefactos: [], emblemas: [] };

  // 1. BIS Principal: primera fila de BIS
  const bisPrincipal = (bisRows[0] || [])
    .map((v) => String(v || '').trim())
    .filter(Boolean)
    .slice(0, 3);
  const bisPrincipalSet = new Set(bisPrincipal);

  // 2. Recopilar candidatos de filas secundarias BIS y de todas las filas BIS Especiales
  const altCandidates = [];
  const radiantCandidates = [];
  const artifactCandidates = [];
  const emblemCandidates = [];

  // Filas BIS secundarias (desde índice 1 en adelante)
  bisRows.slice(1).forEach((triplet) => {
    if (!Array.isArray(triplet)) return;
    triplet.forEach((raw) => {
      const apiName = String(raw || '').trim();
      if (!apiName) return;
      const cat = classifyTftItem(apiName, allItems, craftableApiSet);
      if (cat === 'craftable' && !bisPrincipalSet.has(apiName)) {
        altCandidates.push(apiName);
      }
    });
  });

  // Todas las filas de BIS Especiales
  specialRows.forEach((triplet) => {
    if (!Array.isArray(triplet)) return;
    triplet.forEach((raw) => {
      const apiName = String(raw || '').trim();
      if (!apiName) return;
      const cat = classifyTftItem(apiName, allItems, craftableApiSet);
      if (cat === 'craftable' && !bisPrincipalSet.has(apiName)) {
        altCandidates.push(apiName);
      } else if (cat === 'radiant') {
        radiantCandidates.push(apiName);
      } else if (cat === 'artifact') {
        artifactCandidates.push(apiName);
      } else if (cat === 'emblem') {
        emblemCandidates.push(apiName);
      }
    });
  });

  const mergeWithExtras = (rankedFromCombos, extraList, limit) => {
    const merged = [];
    const seen = new Set();
    [...rankedFromCombos, ...(Array.isArray(extraList) ? extraList : [])].forEach((apiName) => {
      const clean = String(apiName || '').trim();
      if (!clean || seen.has(clean)) return;
      seen.add(clean);
      merged.push(clean);
    });
    return merged.slice(0, limit);
  };

  const alternativos = rankItemsByPriority(altCandidates).slice(0, maxAlternativos);
  const radiantes = mergeWithExtras(rankItemsByPriority(radiantCandidates), extras.radiantes, maxRadiantes);
  const artefactos = mergeWithExtras(rankItemsByPriority(artifactCandidates), extras.artefactos, maxArtefactos);
  const emblemas = mergeWithExtras(rankItemsByPriority(emblemCandidates), extras.emblemas, maxEmblemas);

  return {
    champ,
    bisPrincipal,
    alternativos,
    thiefGloves: Boolean(champRecord?.thief_gloves),
    radiantes,
    artefactos,
    emblemas,
    hasAnyData:
      bisPrincipal.length > 0 ||
      alternativos.length > 0 ||
      Boolean(champRecord?.thief_gloves) ||
      radiantes.length > 0 ||
      artefactos.length > 0 ||
      emblemas.length > 0,
  };
};

/**
 * Obtiene metadatos de rol y grupo visual para ordenar y colorear filas en la Infografía
 */
export const getChampionRoleMeta = (champ = {}) => {
  const rawRole = String(champ.role || champ.role_en || champ.role_legacy || '').trim();
  const lower = `${rawRole} ${champ.role_en || ''} ${champ.role_id || ''}`.toLowerCase();

  if (lower.includes('tank') || lower.includes('tanque')) {
    return { label: rawRole || 'Tanque', group: 'tank', order: 1 };
  }
  if (lower.includes('fighter') || lower.includes('luchador') || lower.includes('bruiser')) {
    return { label: rawRole || 'Luchador', group: 'fighter', order: 2 };
  }
  if (lower.includes('assassin') || lower.includes('asesino') || lower.includes('reaper')) {
    return { label: rawRole || 'Asesino', group: 'assassin', order: 3 };
  }
  if (lower.includes('caster') || lower.includes('hechicero') || lower.includes('mago') || lower.includes('mage')) {
    return { label: rawRole || 'Hechicero', group: 'caster', order: 4 };
  }
  if (lower.includes('marksman') || lower.includes('tirador') || lower.includes('carry')) {
    return { label: rawRole || 'Tirador', group: 'marksman', order: 5 };
  }
  if (lower.includes('specialist') || lower.includes('especialista')) {
    return { label: rawRole || 'Especialista', group: 'specialist', order: 6 };
  }

  return { label: rawRole || 'Flex', group: 'default', order: 7 };
};
