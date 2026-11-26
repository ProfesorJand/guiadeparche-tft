import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import style from './css/AdminTFTItemizacion.module.css';
import {
  dataTFTChampions,
  dataTFTAllItems,
  dataTFTItemsBySetMap,
  AllCraftableItems,
  versionTFT,
  swapVersionTFT,
  setNumberLatest,
  setNumberPBE,
  loadDataTFTFromAPI,
} from '@stores/dataTFT';
import {
  $itemizacionPorSet,
  $itemizacionLoading,
  loadItemizacionBySet,
  saveChampionItemizacion,
  saveBulkItemizacion,
} from '@stores/tft/itemizacionCampeones';
import { getLocalTftImage } from '@utils/images';
import {
  ORDERED_COMBAT_COMPONENTS,
  buildCraftableApiSet,
  classifyTftItem,
  isCraftableWithoutEmblems,
  hasAnyItemInRow,
  normalizeTriplet,
  findChampionItemizacion,
  getChampionRoleMeta,
} from '@utils/tftItemClassifier';
import InfografiaItemizacionTFT from '@components/Infografias/ItemizacionTFT/InfografiaItemizacionTFT.jsx';

// Orden canónico de los 36 Radiantes únicos (ordenados por componente base, sin duplicados)
const CANONICAL_RADIANTS = [
  'TFT5_Item_DeathbladeRadiant',
  'TFT5_Item_GiantSlayerRadiant',
  'TFT5_Item_HextechGunbladeRadiant',
  'TFT5_Item_SpearOfShojinRadiant',
  'TFT5_Item_GuardianAngelRadiant',
  'TFT5_Item_BloodthirsterRadiant',
  'TFT5_Item_SteraksGageRadiant',
  'TFT5_Item_InfinityEdgeRadiant',
  'TFT5_Item_RapidFirecannonRadiant',
  'TFT5_Item_GuinsoosRagebladeRadiant',
  'TFT5_Item_StatikkShivRadiant',
  'TFT5_Item_TitansResolveRadiant',
  'TFT5_Item_RunaansHurricaneRadiant',
  'TFT5_Item_LeviathanRadiant',
  'TFT5_Item_LastWhisperRadiant',
  'TFT5_Item_RabadonsDeathcapRadiant',
  'TFT5_Item_ArchangelsStaffRadiant',
  'TFT5_Item_CrownguardRadiant',
  'TFT5_Item_IonicSparkRadiant',
  'TFT5_Item_MorellonomiconRadiant',
  'TFT5_Item_JeweledGauntletRadiant',
  'TFT5_Item_BlueBuffRadiant',
  'TFT5_Item_FrozenHeartRadiant',
  'TFT5_Item_AdaptiveHelmRadiant',
  'TFT5_Item_RedemptionRadiant',
  'TFT5_Item_HandOfJusticeRadiant',
  'TFT5_Item_BrambleVestRadiant',
  'TFT5_Item_GargoyleStoneplateRadiant',
  'TFT5_Item_SunfireCapeRadiant',
  'TFT5_Item_NightHarvesterRadiant',
  'TFT5_Item_DragonsClawRadiant',
  'TFT5_Item_SpectralGauntletRadiant',
  'TFT5_Item_QuicksilverRadiant',
  'TFT5_Item_WarmogsArmorRadiant',
  'TFT5_Item_TrapClawRadiant',
  'TFT5_Item_ThiefsGlovesRadiant',
];

// Lista canónica de Artefactos activos (evita duplicados por versiones antiguas de Ornn/Set)
const CANONICAL_ARTIFACTS = [
  'TFT_Item_Artifact_AegisOfDawn',
  'TFT_Item_Artifact_AegisOfDusk',
  'TFT_Item_Artifact_HellfireHatchet',
  'TFT_Item_Artifact_CappaJuice',
  'TFT_Item_Artifact_Dawncore',
  'TFT_Item_Artifact_EternalPact',
  'TFT_Item_Artifact_VoidGauntlet',
  'TFT_Item_Artifact_TheIndomitable',
  'TFT_Item_Artifact_NavoriFlickerblades',
  'TFT_Item_Artifact_StatikkShiv',
  'TFT_Item_Artifact_TitanicHydra',
  'TFT_Item_Artifact_BlightingJewel',
  'TFT4_Item_OrnnDeathsDefiance',
  'TFT_Item_Artifact_Fishbones',
  'TFT_Item_Artifact_ForbiddenIdol',
  'TFT7_Item_ShimmerscaleGamblersBlade',
  'TFT4_Item_OrnnTheCollector',
  'DA_Artifact_HorizonFocus',
  'TFT9_Item_OrnnHorizonFocus',
  'TFT9_Item_OrnnHullbreaker',
  'TFT4_Item_OrnnInfinityForce',
  'TFT_Item_Artifact_LichBane',
  'TFT_Item_Artifact_LightshieldCrest',
  'TFT_Item_Artifact_LudensTempest',
  'TFT4_Item_OrnnMuramana',
  'TFT_Item_Artifact_Mittens',
  'TFT7_Item_ShimmerscaleMogulsMail',
  'TFT_Item_Artifact_RapidFirecannon',
  'TFT_Item_Artifact_SeekersArmguard',
  'TFT_Item_Artifact_SilvermereDawn',
  'TFT_Item_Artifact_TalismanOfAscension',
  'TFT_Item_Artifact_WitsEnd',
  'TFT4_Item_OrnnZhonyasParadox',
];

// Ítems crafteables recomendados agrupados por Rol de campeón para agilizar el armado de builds
const ROLE_RECOMMENDED_ITEMS = {
  tank: {
    label: 'Tanque',
    items: [
      'TFT_Item_GargoyleStoneplate',
      'TFT_Item_WarmogsArmor',
      'TFT_Item_Redemption',
      'TFT_Item_NightHarvester',
      'TFT_Item_FrozenHeart',
      'TFT_Item_AdaptiveHelm',
      'TFT_Item_Crownguard',
      'TFT_Item_RedBuff',
      'TFT_Item_BrambleVest',
      'TFT_Item_DragonsClaw',
      'TFT_Item_IonicSpark',
      'TFT_Item_SpectralGauntlet',
    ],
  },
  attack_fighter: {
    label: 'Peleador AD',
    items: [
      'TFT_Item_Bloodthirster',
      'TFT_Item_SteraksGage',
      'TFT_Item_TitansResolve',
      'TFT_Item_GuardianAngel',
      'TFT_Item_Quicksilver',
      'TFT_Item_UnstableConcoction',
      'TFT_Item_InfinityEdge',
      'TFT_Item_RunaansHurricane',
      'TFT_Item_PowerGauntlet',
      'TFT_Item_Deathblade',
      'TFT_Item_MadredsBloodrazor',
      'TFT_Item_LastWhisper',
    ],
  },
  magic_fighter: {
    label: 'Peleador AP',
    items: [
      'TFT_Item_Bloodthirster',
      'TFT_Item_UnstableConcoction',
      'TFT_Item_TitansResolve',
      'TFT_Item_JeweledGauntlet',
      'TFT_Item_Crownguard',
      'TFT_Item_GuardianAngel',
      'TFT_Item_IonicSpark',
      'TFT_Item_ArchangelsStaff',
      'TFT_Item_RabadonsDeathcap',
      'TFT_Item_HextechGunblade',
      'TFT_Item_PowerGauntlet',
      'TFT_Item_Quicksilver',
    ],
  },
  attack_marksman: {
    label: 'Tirador AD',
    items: [
      'TFT_Item_GuinsoosRageblade',
      'TFT_Item_RunaansHurricane',
      'TFT_Item_InfinityEdge',
      'TFT_Item_LastWhisper',
      'TFT_Item_MadredsBloodrazor',
      'TFT_Item_Deathblade',
      'TFT_Item_RapidFireCannon',
      'TFT_Item_SpearOfShojin',
      'TFT_Item_PowerGauntlet',
      'TFT_Item_Quicksilver',
      'TFT_Item_UnstableConcoction',
      'TFT_Item_HextechGunblade',
    ],
  },
  magic_caster: {
    label: 'Lanzador AP',
    items: [
      'TFT_Item_SpearOfShojin',
      'TFT_Item_BlueBuff',
      'TFT_Item_JeweledGauntlet',
      'TFT_Item_StatikkShiv',
      'TFT_Item_RabadonsDeathcap',
      'TFT_Item_ArchangelsStaff',
      'TFT_Item_Leviathan',
      'TFT_Item_Morellonomicon',
      'TFT_Item_HextechGunblade',
      'TFT_Item_GuinsoosRageblade',
      'TFT_Item_MadredsBloodrazor',
      'TFT_Item_PowerGauntlet',
      'TFT_Item_AdaptiveHelm',
      'TFT_Item_RapidFireCannon',
    ],
  },
  attack_assassin: {
    label: 'Asesino AD',
    items: [
      'TFT_Item_InfinityEdge',
      'TFT_Item_GuardianAngel',
      'TFT_Item_UnstableConcoction',
      'TFT_Item_Bloodthirster',
      'TFT_Item_SteraksGage',
      'TFT_Item_PowerGauntlet',
      'TFT_Item_MadredsBloodrazor',
      'TFT_Item_LastWhisper',
      'TFT_Item_Deathblade',
      'TFT_Item_Quicksilver',
      'TFT_Item_TitansResolve',
    ],
  },
  utility: {
    label: 'Utilidad / Debuff',
    items: [
      'TFT_Item_RedBuff',
      'TFT_Item_Morellonomicon',
      'TFT_Item_RapidFireCannon',
      'TFT_Item_LastWhisper',
      'TFT_Item_SpectralGauntlet',
      'TFT_Item_StatikkShiv',
      'TFT_Item_IonicSpark',
      'TFT_Item_HextechGunblade',
      'TFT_Item_ThiefsGloves',
    ],
  },
};

// Mapea el rol de un campeón a la sub-pestaña correspondiente de "Por Rol"
const detectRoleSubTabForChamp = (champ = {}) => {
  const lower = `${champ.role || ''} ${champ.role_en || ''} ${champ.role_id || ''}`.toLowerCase();
  if (lower.includes('tank') || lower.includes('tanque')) return 'tank';
  if (lower.includes('assassin') || lower.includes('asesino')) {
    return lower.includes('magic') || lower.includes('mágic') || lower.includes('magi')
      ? 'magic_fighter'
      : 'attack_assassin';
  }
  if (lower.includes('fighter') || lower.includes('peleador') || lower.includes('luchador')) {
    return lower.includes('magic') || lower.includes('mágic') || lower.includes('magia')
      ? 'magic_fighter'
      : 'attack_fighter';
  }
  if (lower.includes('marksman') || lower.includes('tirador')) {
    return lower.includes('magic') || lower.includes('magia') ? 'magic_caster' : 'attack_marksman';
  }
  if (lower.includes('caster') || lower.includes('lanzador') || lower.includes('hechicero')) {
    return lower.includes('attack') || lower.includes('ataque') ? 'attack_marksman' : 'magic_caster';
  }
  if (lower.includes('attack') || lower.includes('ataque')) return 'attack_marksman';
  if (lower.includes('magic') || lower.includes('magia')) return 'magic_caster';
  return 'utility';
};

const normalizeDedupName = (name = '') =>
  String(name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

const normalizeIconFilename = (icon = '') => {
  const clean = String(icon || '').toLowerCase().split('/').pop() || '';
  return clean.replace(/\.(tex|png|webp|jpg)$/i, '').replace(/\.tft_set\d+$/i, '');
};

const COST_COLORS = {
  1: '#94a3b8',
  2: '#22c55e',
  3: '#38bdf8',
  4: '#a855f7',
  5: '#f59e0b',
};

const createEmptyDraft = () => ({
  bis: [['', '', '']],
  special_bis: [['', '', '']],
  thief_gloves: false,
  extras: {
    radiantes: [],
    artefactos: [],
    emblemas: [],
  },
});

const cloneChampRecordToDraft = (record) => {
  if (!record) return createEmptyDraft();
  const bis =
    Array.isArray(record.bis) && record.bis.length > 0
      ? record.bis.map((r) => normalizeTriplet(r))
      : [['', '', '']];
  const specialBis =
    Array.isArray(record.special_bis) && record.special_bis.length > 0
      ? record.special_bis.map((r) => normalizeTriplet(r))
      : [['', '', '']];
  return {
    bis,
    special_bis: specialBis,
    thief_gloves: Boolean(record.thief_gloves),
    extras: {
      radiantes: [...(record.extras?.radiantes || [])],
      artefactos: [...(record.extras?.artefactos || [])],
      emblemas: [...(record.extras?.emblemas || [])],
    },
  };
};

/**
 * Pestaña Admin "TFT → Itemizacion Campeones".
 * Permite gestionar combinaciones BIS (3 ítems crafteables sin emblemas),
 * BIS Especiales (3 ítems con emblemas/artefactos/radiantes), extras opcionales
 * para la infografía y alternar directamente al generador de Infografías por Coste.
 */
const AdminTFTItemizacion = () => {
  const currentVersion = useStore(versionTFT);
  const allChampions = useStore(dataTFTChampions) || [];
  const allItems = useStore(dataTFTAllItems) || [];
  const itemsBySetMap = useStore(dataTFTItemsBySetMap) || {};
  const storeItemizacion = useStore($itemizacionPorSet) || {};
  const isLoadingStore = useStore($itemizacionLoading);

  const targetSetNumber = String(currentVersion === 'pbe' ? setNumberPBE : setNumberLatest);

  // Modo de vista (Opción A: Tabla de Itemización | Infografía por Coste)
  const [viewMode, setViewMode] = useState('editor'); // 'editor' | 'infografia'

  // Filtros de la tabla
  const [costFilter, setCostFilter] = useState('all'); // 'all' | 1 | 2 | 3 | 4 | 5
  const [champSearch, setChampSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'configured' | 'empty'
  const [showSummons, setShowSummons] = useState(false);

  // Paleta de ítems
  const [paletteTab, setPaletteTab] = useState('craftable'); // 'craftable' | 'byRole' | 'radiant' | 'artifact' | 'emblem' | 'other'
  const [roleSubTab, setRoleSubTab] = useState('tank');
  const [itemSearch, setItemSearch] = useState('');

  // Estado local editable por campeón y control de cambios pendientes
  const [drafts, setDrafts] = useState({});
  const [dirtyChamps, setDirtyChamps] = useState({});
  const [openExtras, setOpenExtras] = useState({});
  const [savingMap, setSavingMap] = useState({});
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: 'info' });

  // Slot seleccionado para asignar con un solo clic desde la paleta
  // { mode: 'combo', champApi, tipo: 'bis'|'special_bis', rowIdx, slotIdx }
  // o { mode: 'extra', champApi, categoria: 'radiantes'|'artefactos'|'emblemas' }
  const [activeTarget, setActiveTarget] = useState(null);

  const showFeedback = (text, type = 'info', autoHideMs = 4500) => {
    setFeedback({ text, type });
    if (autoHideMs > 0) {
      setTimeout(() => {
        setFeedback((prev) => (prev.text === text ? { text: '', type: 'info' } : prev));
      }, autoHideMs);
    }
  };

  // Asegurar que los datos del Set activo y su itemización estén cargados
  useEffect(() => {
    const hasSetChamps = allChampions.some(
      (c) =>
        String(c.tft_set || '') === targetSetNumber ||
        c.apiName?.toLowerCase().startsWith(`tft${targetSetNumber}_`)
    );
    if (!hasSetChamps) {
      loadDataTFTFromAPI({ version: currentVersion });
    }
    loadItemizacionBySet(targetSetNumber, true);
    setDrafts({});
    setDirtyChamps({});
    setActiveTarget(null);
  }, [currentVersion, targetSetNumber]);

  const setDbMap = storeItemizacion[targetSetNumber] || {};

  // Obtener el draft actual de un campeón (o leerlo del store de BD si aún no se modificó)
  const getChampDraft = (champApiName) => {
    if (drafts[champApiName]) return drafts[champApiName];
    const dbRec = findChampionItemizacion(setDbMap, champApiName);
    return cloneChampRecordToDraft(dbRec);
  };

  const updateChampDraft = (champApiName, updaterFn) => {
    setDrafts((prev) => {
      const current = prev[champApiName] || cloneChampRecordToDraft(findChampionItemizacion(setDbMap, champApiName));
      const next = updaterFn(current);
      return { ...prev, [champApiName]: next };
    });
    setDirtyChamps((prev) => ({ ...prev, [champApiName]: true }));
  };

  // Catálogo de campeones del set activo
  const championsOfSet = useMemo(() => {
    const filtered = allChampions.filter((c) => {
      if (!c?.apiName) return false;
      if (!showSummons && (c.isOther || Number(c.cost) <= 0)) return false;
      return (
        String(c.tft_set || '') === targetSetNumber ||
        c.apiName.toLowerCase().startsWith(`tft${targetSetNumber}_`)
      );
    });

    const unique = new Map();
    filtered.forEach((c) => {
      if (!unique.has(c.apiName)) unique.set(c.apiName, c);
    });

    return Array.from(unique.values()).sort((a, b) => {
      if (Number(a.cost) !== Number(b.cost)) return Number(a.cost) - Number(b.cost);
      return String(a.name || '').localeCompare(String(b.name || ''));
    });
  }, [allChampions, targetSetNumber, showSummons]);

  // Campeones filtrados en la vista
  const visibleChampions = useMemo(() => {
    const q = champSearch.trim().toLowerCase();
    return championsOfSet.filter((c) => {
      if (costFilter !== 'all' && Number(c.cost) !== Number(costFilter)) return false;
      if (q && !String(c.name || '').toLowerCase().includes(q) && !c.apiName.toLowerCase().includes(q)) {
        return false;
      }

      if (statusFilter !== 'all') {
        const d = getChampDraft(c.apiName);
        const configured =
          d.bis.some(hasAnyItemInRow) ||
          d.special_bis.some(hasAnyItemInRow) ||
          Boolean(d.thief_gloves) ||
          d.extras.radiantes.length > 0 ||
          d.extras.artefactos.length > 0 ||
          d.extras.emblemas.length > 0;
        if (statusFilter === 'configured' && !configured) return false;
        if (statusFilter === 'empty' && configured) return false;
      }

      return true;
    });
  }, [championsOfSet, costFilter, champSearch, statusFilter, drafts, setDbMap]);

  // Catálogo de ítems clasificados para la paleta derecha
  const craftableApiSet = useMemo(() => {
    const known = AllCraftableItems(allItems);
    return buildCraftableApiSet(allItems, known);
  }, [allItems]);

  const itemsByApiName = useMemo(() => {
    const map = new Map();
    allItems.forEach((item) => {
      if (item?.apiName) map.set(item.apiName, item);
    });
    return map;
  }, [allItems]);

  const categorizedPalette = useMemo(() => {
    const activeSetItems =
      itemsBySetMap[targetSetNumber]?.length > 0
        ? itemsBySetMap[targetSetNumber]
        : allItems.filter((i) => !i.tft_set || String(i.tft_set) === targetSetNumber);

    // 1. Matriz 8x8 de Crafteables (Espadón, Arco, Vara, Lágrima, Cota, Capa, Cinturón, Guantes — sin Espátula ni Sartén)
    const compLookup = new Map();
    const registerCraftableCandidate = (item) => {
      if (!item?.apiName || !Array.isArray(item.composition) || item.composition.length !== 2) return;
      if (!isCraftableWithoutEmblems(item, allItems, craftableApiSet)) return;
      const norm = item.composition
        .map((c) => String(c || '').replace('DA_Component_', 'TFT_Item_'))
        .sort();
      const pairKey = norm.join('+');
      const existing = compLookup.get(pairKey);
      // Preferir apiName estándar TFT_Item_* o del set activo
      if (!existing) {
        compLookup.set(pairKey, item);
      } else if (
        !existing.apiName.startsWith('TFT_Item_') &&
        item.apiName.startsWith('TFT_Item_')
      ) {
        compLookup.set(pairKey, item);
      }
    };

    activeSetItems.forEach(registerCraftableCandidate);
    AllCraftableItems(allItems).forEach(registerCraftableCandidate);
    allItems.forEach(registerCraftableCandidate);

    const baseComponents = ORDERED_COMBAT_COMPONENTS.map((compApi) => {
      return (
        activeSetItems.find((i) => i.apiName === compApi || i.apiName === compApi.replace('TFT_Item_', 'DA_Component_')) ||
        allItems.find((i) => i.apiName === compApi || i.apiName === compApi.replace('TFT_Item_', 'DA_Component_')) || {
          apiName: compApi,
          name: compApi,
        }
      );
    });

    const craftableMatrix = ORDERED_COMBAT_COMPONENTS.map((rowComp) =>
      ORDERED_COMBAT_COMPONENTS.map((colComp) => {
        const pairKey = [rowComp, colComp].sort().join('+');
        return compLookup.get(pairKey) || null;
      })
    );

    const uniqueCraftables = [];
    const seenCraftApi = new Set();
    craftableMatrix.flat().forEach((item) => {
      if (!item?.apiName || seenCraftApi.has(item.apiName)) return;
      seenCraftApi.add(item.apiName);
      uniqueCraftables.push(item);
    });

    // 2. Radiantes deduplicados (estrictamente 1 por objeto, siguiendo el orden canónico)
    const radiants = [];
    const seenRadApi = new Set();
    const seenRadName = new Set();
    const seenRadIcon = new Set();

    const tryAddRadiant = (item) => {
      if (!item?.apiName || !item.icon || !item.name) return;
      const normName = normalizeDedupName(item.name);
      const normIcon = normalizeIconFilename(item.icon);
      if (
        seenRadApi.has(item.apiName) ||
        (normName && seenRadName.has(normName)) ||
        (normIcon && seenRadIcon.has(normIcon))
      ) {
        return;
      }
      seenRadApi.add(item.apiName);
      if (normName) seenRadName.add(normName);
      if (normIcon) seenRadIcon.add(normIcon);
      radiants.push(item);
    };

    CANONICAL_RADIANTS.forEach((apiName) => {
      const found = itemsByApiName.get(apiName);
      if (found) tryAddRadiant(found);
    });
    // Agregar cualquier radiante nuevo del set activo que no estuviera en la lista canónica
    activeSetItems.forEach((item) => {
      if (classifyTftItem(item, allItems, craftableApiSet) === 'radiant') {
        tryAddRadiant(item);
      }
    });

    // 3. Artefactos deduplicados (estrictamente 1 por nombre/ícono usando lista canónica primero)
    const artifacts = [];
    const seenArtApi = new Set();
    const seenArtName = new Set();
    const seenArtIcon = new Set();

    const tryAddArtifact = (item) => {
      if (!item?.apiName || !item.icon || !item.name) return;
      const normName = normalizeDedupName(item.name);
      const normIcon = normalizeIconFilename(item.icon);
      if (
        seenArtApi.has(item.apiName) ||
        (normName && seenArtName.has(normName)) ||
        (normIcon && seenArtIcon.has(normIcon))
      ) {
        return;
      }
      seenArtApi.add(item.apiName);
      if (normName) seenArtName.add(normName);
      if (normIcon) seenArtIcon.add(normIcon);
      artifacts.push(item);
    };

    CANONICAL_ARTIFACTS.forEach((apiName) => {
      const found = itemsByApiName.get(apiName);
      if (found) tryAddArtifact(found);
    });
    activeSetItems.forEach((item) => {
      if (classifyTftItem(item, allItems, craftableApiSet) === 'artifact') {
        tryAddArtifact(item);
      }
    });
    artifacts.sort((a, b) => String(a.name || a.apiName).localeCompare(String(b.name || b.apiName)));

    // 4. Emblemas del set activo (deduplicados por apiName y nombre)
    const emblems = [];
    const seenEmbApi = new Set();
    const seenEmbName = new Set();
    activeSetItems.forEach((item) => {
      if (!item?.apiName || !item.icon) return;
      if (classifyTftItem(item, allItems, craftableApiSet) !== 'emblem') return;
      const normName = normalizeDedupName(item.name || item.apiName);
      if (seenEmbApi.has(item.apiName) || (normName && seenEmbName.has(normName))) return;
      seenEmbApi.add(item.apiName);
      if (normName) seenEmbName.add(normName);
      emblems.push(item);
    });
    emblems.sort((a, b) => String(a.name || a.apiName).localeCompare(String(b.name || b.apiName)));

    // 5. Otros ítems especiales / soporte del set activo (deduplicados)
    const others = [];
    const seenOtherApi = new Set();
    const seenOtherName = new Set();
    allItems.forEach((item) => {
      if (!item?.apiName || !item.icon || !item.name) return;
      const cat = classifyTftItem(item, allItems, craftableApiSet);
      if (cat !== 'other') return;
      const isRelevant =
        item.apiName.includes(`TFT${targetSetNumber}_`) ||
        item.apiName.includes('Support') ||
        item.apiName.includes('LocketOfTheIronSolari') ||
        item.apiName.includes('ZekesHerald') ||
        item.apiName.includes('Zephyr');
      if (!isRelevant) return;
      const normName = normalizeDedupName(item.name);
      if (seenOtherApi.has(item.apiName) || (normName && seenOtherName.has(normName))) return;
      seenOtherApi.add(item.apiName);
      if (normName) seenOtherName.add(normName);
      others.push(item);
    });
    others.sort((a, b) => String(a.name || a.apiName).localeCompare(String(b.name || b.apiName)));

    return {
      baseComponents,
      craftableMatrix,
      craftable: uniqueCraftables,
      radiant: radiants,
      artifact: artifacts,
      emblem: emblems,
      other: others,
    };
  }, [allItems, itemsBySetMap, targetSetNumber, craftableApiSet, itemsByApiName]);

  const currentPaletteItems = useMemo(() => {
    let list = [];
    if (paletteTab === 'byRole') {
      const roleDef = ROLE_RECOMMENDED_ITEMS[roleSubTab] || ROLE_RECOMMENDED_ITEMS.tank;
      const seenRole = new Set();
      list = (roleDef.items || [])
        .map((apiName) => {
          const direct = itemsByApiName.get(apiName);
          if (direct) return direct;
          // Fallback por nombre corto si el set usa prefijo DA_
          const shortKey = apiName.replace(/^TFT_Item_/, '');
          return (
            categorizedPalette.craftable.find(
              (c) => c.apiName === `DA_${shortKey}` || c.apiName.endsWith(shortKey)
            ) || null
          );
        })
        .filter((item) => {
          if (!item?.apiName || seenRole.has(item.apiName)) return false;
          seenRole.add(item.apiName);
          return true;
        });
    } else {
      list = categorizedPalette[paletteTab] || [];
    }

    const q = itemSearch.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (i) =>
        String(i.name || '').toLowerCase().includes(q) ||
        String(i.apiName || '').toLowerCase().includes(q)
    );
  }, [categorizedPalette, paletteTab, roleSubTab, itemSearch, itemsByApiName]);

  const resolveItemIcon = (itemOrApiName) => {
    const item =
      typeof itemOrApiName === 'string' ? itemsByApiName.get(itemOrApiName) : itemOrApiName;
    if (!item?.icon) return null;
    if (item.icon.startsWith('http') || item.icon.startsWith('/')) {
      return item.icon.toLowerCase().endsWith('.tex')
        ? item.icon.toLowerCase().replace('.tex', '.png')
        : item.icon;
    }
    return getLocalTftImage(item.icon, 'items', targetSetNumber);
  };

  const resolveChampIcon = (champ) => {
    const src = champ?.tileIcon || champ?.squareIcon || champ?.icon;
    if (!src) return '/web/logoGP2026.webp';
    if (src.startsWith('http')) return src.toLowerCase().replace('.tex', '.png');
    return getLocalTftImage(src, 'champions/tileIcon', targetSetNumber);
  };

  // Asignar un ítem a un slot específico de BIS o BIS Especiales
  const assignItemToComboSlot = (champApi, tipo, rowIdx, slotIdx, itemApiName) => {
    if (tipo === 'bis' && itemApiName && !isCraftableWithoutEmblems(itemApiName, allItems, craftableApiSet)) {
      showFeedback(
        'En la columna BIS solo van objetos crafteables sin emblemas. Coloca emblemas, artefactos y radiantes en BIS Especiales.',
        'warn',
        4500
      );
      return false;
    }

    updateChampDraft(champApi, (curr) => {
      const nextList = curr[tipo].map((r) => [...r]);
      if (!nextList[rowIdx]) nextList[rowIdx] = ['', '', ''];
      nextList[rowIdx][slotIdx] = itemApiName;
      return { ...curr, [tipo]: nextList };
    });
    return true;
  };

  // Agregar un ítem a un cajón extra de infografía (Radiantes / Artefactos / Emblemas)
  const addItemToExtra = (champApi, categoria, itemApiName) => {
    if (!itemApiName) return;
    const itemCat = classifyTftItem(itemApiName, allItems, craftableApiSet);
    const expectedMap = { radiantes: 'radiant', artefactos: 'artifact', emblemas: 'emblem' };
    if (expectedMap[categoria] && itemCat !== expectedMap[categoria]) {
      showFeedback(
        `Ese objeto no pertenece a la categoría "${categoria}". Selecciona un ítem de la pestaña correspondiente.`,
        'warn',
        3500
      );
      return;
    }

    updateChampDraft(champApi, (curr) => {
      const existing = curr.extras?.[categoria] || [];
      if (existing.includes(itemApiName)) return curr;
      return {
        ...curr,
        extras: {
          ...curr.extras,
          [categoria]: [...existing, itemApiName],
        },
      };
    });
  };

  const removeItemFromExtra = (champApi, categoria, idx) => {
    updateChampDraft(champApi, (curr) => {
      const nextCat = [...(curr.extras?.[categoria] || [])];
      nextCat.splice(idx, 1);
      return {
        ...curr,
        extras: {
          ...curr.extras,
          [categoria]: nextCat,
        },
      };
    });
  };

  // Al hacer clic en un ítem de la paleta derecha
  const handlePaletteItemClick = (item) => {
    if (!activeTarget || !item?.apiName) {
      showFeedback('Primero haz clic en un slot de campeón para asignar el objeto (o arrástralo al slot).', 'info', 3000);
      return;
    }

    if (activeTarget.mode === 'extra') {
      addItemToExtra(activeTarget.champApi, activeTarget.categoria, item.apiName);
      return;
    }

    const { champApi, tipo, rowIdx, slotIdx } = activeTarget;
    const ok = assignItemToComboSlot(champApi, tipo, rowIdx, slotIdx, item.apiName);
    if (!ok) return;

    // Avanzar automáticamente al siguiente slot de la misma fila para cargar builds muy rápido
    if (slotIdx < 2) {
      setActiveTarget({ ...activeTarget, slotIdx: slotIdx + 1 });
    }
  };

  const handleAddComboRow = (champApi, tipo) => {
    const curr = getChampDraft(champApi);
    const newRowIdx = curr[tipo].length;
    updateChampDraft(champApi, (d) => ({
      ...d,
      [tipo]: [...d[tipo], ['', '', '']],
    }));
    setActiveTarget({ mode: 'combo', champApi, tipo, rowIdx: newRowIdx, slotIdx: 0 });
    if (tipo === 'bis') setPaletteTab('craftable');
  };

  const handleMoveComboRow = (champApi, tipo, rowIdx, direction) => {
    updateChampDraft(champApi, (d) => {
      const nextIdx = rowIdx + direction;
      if (nextIdx < 0 || nextIdx >= d[tipo].length) return d;
      const copy = d[tipo].map((r) => [...r]);
      const [moved] = copy.splice(rowIdx, 1);
      copy.splice(nextIdx, 0, moved);
      return { ...d, [tipo]: copy };
    });
  };

  const handleRemoveComboRow = (champApi, tipo, rowIdx) => {
    const curr = getChampDraft(champApi);
    const row = curr[tipo]?.[rowIdx] || [];
    if (hasAnyItemInRow(row)) {
      const confirmed = window.confirm(
        '¿Eliminar esta combinación de 3 objetos?\n\nAl guardar, se eliminará de la base de datos y dejará de mostrarse en las composiciones que la utilizaban.'
      );
      if (!confirmed) return;
    }

    updateChampDraft(champApi, (d) => {
      const copy = d[tipo].filter((_, idx) => idx !== rowIdx);
      return {
        ...d,
        [tipo]: copy.length > 0 ? copy : [['', '', '']],
      };
    });
  };

  // Guardar un solo campeón en MySQL
  const handleSaveSingleChampion = async (champApi) => {
    const draft = getChampDraft(champApi);
    setSavingMap((prev) => ({ ...prev, [champApi]: true }));
    try {
      const cleanBis = draft.bis.filter(hasAnyItemInRow);
      const cleanSpecial = draft.special_bis.filter(hasAnyItemInRow);
      const res = await saveChampionItemizacion(
        targetSetNumber,
        champApi,
        cleanBis,
        cleanSpecial,
        draft.extras,
        draft.thief_gloves
      );
      setDirtyChamps((prev) => {
        const copy = { ...prev };
        delete copy[champApi];
        return copy;
      });
      setDrafts((prev) => {
        const copy = { ...prev };
        delete copy[champApi];
        return copy;
      });
      const extraMsg =
        res?.stats?.compos_updated > 0
          ? ` (${res.stats.compos_updated} composiciones actualizadas)`
          : '';
      showFeedback(`¡Itemización guardada correctamente!${extraMsg}`, 'success');
    } catch (err) {
      showFeedback(`Error al guardar: ${err.message}`, 'error', 6000);
    } finally {
      setSavingMap((prev) => ({ ...prev, [champApi]: false }));
    }
  };

  // Guardar todos los campeones modificados en bloque
  const dirtyKeys = Object.keys(dirtyChamps).filter((k) => dirtyChamps[k]);

  const handleSaveAllDirty = async () => {
    if (dirtyKeys.length === 0) return;
    setIsSavingAll(true);
    try {
      const championsPayload = {};
      dirtyKeys.forEach((champApi) => {
        const d = getChampDraft(champApi);
        championsPayload[champApi] = {
          bis: d.bis.filter(hasAnyItemInRow),
          special_bis: d.special_bis.filter(hasAnyItemInRow),
          extras: d.extras,
          thief_gloves: Boolean(d.thief_gloves),
        };
      });

      const res = await saveBulkItemizacion(targetSetNumber, championsPayload);
      setDirtyChamps({});
      setDrafts({});
      const extraMsg =
        res?.compos_updated > 0 ? ` (${res.compos_updated} composiciones actualizadas)` : '';
      showFeedback(
        `¡Se guardaron ${dirtyKeys.length} campeón(es) en la base de datos!${extraMsg}`,
        'success'
      );
    } catch (err) {
      showFeedback(`Error en guardado masivo: ${err.message}`, 'error', 6000);
    } finally {
      setIsSavingAll(false);
    }
  };

  // Mapa combinado de drafts + BD para pasar a la vista de Infografía en tiempo real
  const mergedDraftsForInfographic = useMemo(() => {
    const merged = {};
    Object.keys(drafts).forEach((champApi) => {
      const d = drafts[champApi];
      merged[champApi] = {
        ...(findChampionItemizacion(setDbMap, champApi) || {}),
        bis: d.bis.filter(hasAnyItemInRow),
        special_bis: d.special_bis.filter(hasAnyItemInRow),
        extras: d.extras,
        thief_gloves: Boolean(d.thief_gloves),
      };
    });
    return merged;
  }, [drafts, setDbMap]);

  const thiefGlovesIconUrl = resolveItemIcon('TFT_Item_ThiefsGloves');

  const activeChampName = activeTarget
    ? championsOfSet.find((c) => c.apiName === activeTarget.champApi)?.name || activeTarget.champApi
    : '';

  return (
    <section className={style.container}>
      {/* CABECERA SUPERIOR */}
      <div className={style.topHeader}>
        <div className={style.titleArea}>
          <h2>🛡️ Itemización de Campeones TFT (Set {targetSetNumber})</h2>
          <p className={style.subtitle}>
            Define los ítems BIS y BIS Especiales de cada campeón. Se precargan automáticamente al crear composiciones y alimentan la infografía por coste.
          </p>
        </div>

        <div className={style.topControls}>
          {/* Selector de Set */}
          <div className={style.segmentedGroup}>
            <button
              type="button"
              className={`${style.segBtn} ${currentVersion === 'latest' ? style.segBtnLatestActive : ''}`}
              onClick={() => swapVersionTFT('latest')}
            >
              Set {setNumberLatest} (Latest)
            </button>
            <button
              type="button"
              className={`${style.segBtn} ${currentVersion === 'pbe' ? style.segBtnPbeActive : ''}`}
              onClick={() => swapVersionTFT('pbe')}
            >
              Set {setNumberPBE} (PBE)
            </button>
          </div>

          {/* Switch Vista: Tabla vs Infografía (Opción A) */}
          <div className={style.segmentedGroup}>
            <button
              type="button"
              className={`${style.segBtn} ${viewMode === 'editor' ? style.segBtnActive : ''}`}
              onClick={() => setViewMode('editor')}
            >
              📋 Tabla de Itemización
            </button>
            <button
              type="button"
              className={`${style.segBtn} ${viewMode === 'infografia' ? style.segBtnActive : ''}`}
              onClick={() => setViewMode('infografia')}
            >
              🖼️ Infografía por Coste
            </button>
          </div>

          <button
            type="button"
            className={style.refreshBtn}
            onClick={() => loadItemizacionBySet(targetSetNumber, true)}
            disabled={isLoadingStore}
          >
            <span>🔄</span>
            <span>{isLoadingStore ? 'Cargando...' : 'Recargar BD'}</span>
          </button>

          {viewMode === 'editor' && (
            <button
              type="button"
              className={style.saveAllBtn}
              onClick={handleSaveAllDirty}
              disabled={dirtyKeys.length === 0 || isSavingAll}
            >
              <span>💾</span>
              <span>
                {isSavingAll
                  ? 'Guardando...'
                  : dirtyKeys.length > 0
                    ? `Guardar Todo (${dirtyKeys.length})`
                    : 'Todo Guardado'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* BANNER DE ESTADO */}
      {feedback.text && (
        <div
          className={`${style.statusBanner} ${
            feedback.type === 'success'
              ? style.statusSuccess
              : feedback.type === 'error'
                ? style.statusError
                : feedback.type === 'warn'
                  ? style.statusWarn
                  : style.statusInfo
          }`}
        >
          <span>{feedback.text}</span>
          <button
            type="button"
            className={style.miniIconBtn}
            onClick={() => setFeedback({ text: '', type: 'info' })}
          >
            ✕
          </button>
        </div>
      )}

      {/* MODO INFOGRAFÍA */}
      {viewMode === 'infografia' ? (
        <InfografiaItemizacionTFT
          setNumber={targetSetNumber}
          draftMap={mergedDraftsForInfographic}
        />
      ) : (
        <>
          {/* BARRA DE FILTROS */}
          <div className={style.filterBar}>
            <div className={style.costFilterGroup}>
              {['all', 1, 2, 3, 4, 5].map((cost) => (
                <button
                  key={String(cost)}
                  type="button"
                  className={`${style.filterPill} ${costFilter === cost ? style.filterPillActive : ''}`}
                  onClick={() => setCostFilter(cost)}
                >
                  {cost === 'all' ? `Todos (${championsOfSet.length})` : `Coste ${cost}`}
                </button>
              ))}
            </div>

            <input
              type="text"
              className={style.searchInput}
              placeholder="Buscar campeón..."
              value={champSearch}
              onChange={(e) => setChampSearch(e.target.value)}
            />

            <select
              className={style.selectFilter}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Estado: Todos</option>
              <option value="configured">Solo con builds</option>
              <option value="empty">Sin configurar</option>
            </select>

            <label className={style.filterPill}>
              <input
                type="checkbox"
                checked={showSummons}
                onChange={(e) => setShowSummons(e.target.checked)}
              />{' '}
              Incluir invocaciones
            </label>
          </div>

          {/* WORKSPACE 2 COLUMNAS */}
          <div className={style.workspace}>
            {/* COLUMNA IZQUIERDA: CAMPEONES */}
            <div className={style.championsColumn}>
              {visibleChampions.length === 0 ? (
                <div className={style.emptyNotice}>
                  No se encontraron campeones con los filtros seleccionados para el Set {targetSetNumber}.
                </div>
              ) : (
                visibleChampions.map((champ) => {
                  const draft = getChampDraft(champ.apiName);
                  const isDirty = Boolean(dirtyChamps[champ.apiName]);
                  const isSaving = Boolean(savingMap[champ.apiName]);
                  const roleMeta = getChampionRoleMeta(champ);
                  const costColor = COST_COLORS[Number(champ.cost)] || '#7b61ff';
                  const extrasCount =
                    (draft.extras?.radiantes?.length || 0) +
                    (draft.extras?.artefactos?.length || 0) +
                    (draft.extras?.emblemas?.length || 0);
                  const isExtrasOpen = Boolean(openExtras[champ.apiName]);

                  return (
                    <div
                      key={champ.apiName}
                      className={`${style.champCard} ${isDirty ? style.champCardDirty : ''}`}
                    >
                      <div className={style.champCardGrid}>
                        {/* 1. IDENTIDAD DEL CAMPEÓN */}
                        <div className={style.champInfoCol}>
                          <div className={style.champIdentityRow}>
                            <img
                              src={resolveChampIcon(champ)}
                              alt={champ.name}
                              className={style.champAvatar}
                              style={{ borderColor: costColor }}
                            />
                            <div className={style.champMeta}>
                              <span className={style.champName}>{champ.name}</span>
                              <div className={style.champSubMeta}>
                                <span className={style.costBadge}>Coste {champ.cost}</span>
                                <span className={style.roleText}>{roleMeta.label}</span>
                              </div>
                              {isDirty && <span className={style.dirtyBadge}>● Cambios sin guardar</span>}
                            </div>
                          </div>

                          {/* Checkbox de Thief's Gloves */}
                          <label
                            className={`${style.thiefGlovesLabel} ${
                              draft.thief_gloves ? style.thiefGlovesLabelActive : ''
                            }`}
                            title="Marcar si este campeón es bueno con Guantes de Ladrón (Thief's Gloves)"
                          >
                            <input
                              type="checkbox"
                              checked={Boolean(draft.thief_gloves)}
                              onChange={(e) =>
                                updateChampDraft(champ.apiName, (d) => ({
                                  ...d,
                                  thief_gloves: e.target.checked,
                                }))
                              }
                            />
                            {thiefGlovesIconUrl && (
                              <img
                                src={thiefGlovesIconUrl}
                                alt="Thief's Gloves"
                                className={style.thiefGlovesIcon}
                              />
                            )}
                            <span>Thief&apos;s Gloves</span>
                          </label>

                          <div className={style.champCardButtons}>
                            <button
                              type="button"
                              className={style.saveChampBtn}
                              onClick={() => handleSaveSingleChampion(champ.apiName)}
                              disabled={isSaving || !isDirty}
                            >
                              {isSaving ? 'Guardando...' : '💾 Guardar'}
                            </button>
                            <button
                              type="button"
                              className={style.extrasToggleBtn}
                              onClick={() =>
                                setOpenExtras((prev) => ({
                                  ...prev,
                                  [champ.apiName]: !prev[champ.apiName],
                                }))
                              }
                            >
                              ✨ Extras ({extrasCount})
                            </button>
                          </div>
                        </div>

                        {/* 2. COLUMNA BIS (3 ítems crafteables sin emblemas) */}
                        <div className={style.buildCol}>
                          <div className={style.buildColHeader}>
                            <span className={style.buildColTitleBis}>BIS (Estándar)</span>
                            <span className={style.buildColHint}>Crafteables sin emblemas</span>
                          </div>

                          <div className={style.comboRowsList}>
                            {draft.bis.map((row, rowIdx) => (
                              <div
                                key={`bis-${rowIdx}`}
                                className={`${style.comboRow} ${rowIdx === 0 ? style.comboRowPrimary : ''}`}
                              >
                                <div className={style.comboRowLeft}>
                                  <span
                                    className={`${style.rowOrderTag} ${
                                      rowIdx === 0 ? style.rowOrderPrimary : ''
                                    }`}
                                    title={rowIdx === 0 ? 'BIS Principal (Infografía)' : `Opción BIS #${rowIdx + 1}`}
                                  >
                                    {rowIdx === 0 ? '⭐' : `#${rowIdx + 1}`}
                                  </span>

                                  {[0, 1, 2].map((slotIdx) => {
                                    const itemApi = row[slotIdx] || '';
                                    const iconUrl = itemApi ? resolveItemIcon(itemApi) : null;
                                    const itemInfo = itemApi ? itemsByApiName.get(itemApi) : null;
                                    const isSelected =
                                      activeTarget?.mode === 'combo' &&
                                      activeTarget.champApi === champ.apiName &&
                                      activeTarget.tipo === 'bis' &&
                                      activeTarget.rowIdx === rowIdx &&
                                      activeTarget.slotIdx === slotIdx;

                                    return (
                                      <div
                                        key={slotIdx}
                                        className={`${style.itemSlot} ${
                                          iconUrl ? style.itemSlotFilled : ''
                                        } ${isSelected ? style.itemSlotSelected : ''}`}
                                        title={
                                          itemInfo?.name
                                            ? `${itemInfo.name} (doble clic para quitar)`
                                            : 'Clic para seleccionar o arrastra un ítem aquí'
                                        }
                                        onClick={() => {
                                          setActiveTarget({
                                            mode: 'combo',
                                            champApi: champ.apiName,
                                            tipo: 'bis',
                                            rowIdx,
                                            slotIdx,
                                          });
                                          if (paletteTab === 'byRole') {
                                            setRoleSubTab(detectRoleSubTabForChamp(champ));
                                          } else if (paletteTab !== 'craftable') {
                                            setPaletteTab('craftable');
                                          }
                                        }}
                                        onDoubleClick={() =>
                                          assignItemToComboSlot(champ.apiName, 'bis', rowIdx, slotIdx, '')
                                        }
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                          e.preventDefault();
                                          const droppedApi = e.dataTransfer.getData('tft_item_api');
                                          if (droppedApi) {
                                            assignItemToComboSlot(
                                              champ.apiName,
                                              'bis',
                                              rowIdx,
                                              slotIdx,
                                              droppedApi
                                            );
                                          }
                                        }}
                                      >
                                        {iconUrl ? (
                                          <img
                                            src={iconUrl}
                                            alt={itemInfo?.name || itemApi}
                                            className={style.itemSlotImg}
                                          />
                                        ) : (
                                          <span className={style.itemSlotPlus}>+</span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className={style.comboRowActions}>
                                  <button
                                    type="button"
                                    className={style.miniIconBtn}
                                    disabled={rowIdx === 0}
                                    onClick={() => handleMoveComboRow(champ.apiName, 'bis', rowIdx, -1)}
                                    title="Subir prioridad"
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    className={style.miniIconBtn}
                                    disabled={rowIdx === draft.bis.length - 1}
                                    onClick={() => handleMoveComboRow(champ.apiName, 'bis', rowIdx, 1)}
                                    title="Bajar prioridad"
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    className={`${style.miniIconBtn} ${style.miniDeleteBtn}`}
                                    onClick={() => handleRemoveComboRow(champ.apiName, 'bis', rowIdx)}
                                    title="Eliminar combinación de BD y composiciones"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            className={style.addRowBtn}
                            onClick={() => handleAddComboRow(champ.apiName, 'bis')}
                          >
                            + Añadir fila BIS
                          </button>
                        </div>

                        {/* 3. COLUMNA BIS ESPECIALES (Emblemas, Artefactos, Radiantes + Craftables) */}
                        <div className={style.buildCol}>
                          <div className={style.buildColHeader}>
                            <span className={style.buildColTitleSpecial}>BIS Especiales</span>
                            <span className={style.buildColHint}>Emblemas · Artefactos · Radiantes</span>
                          </div>

                          <div className={style.comboRowsList}>
                            {draft.special_bis.map((row, rowIdx) => (
                              <div key={`sp-${rowIdx}`} className={style.comboRow}>
                                <div className={style.comboRowLeft}>
                                  <span className={style.rowOrderTag}>#{rowIdx + 1}</span>

                                  {[0, 1, 2].map((slotIdx) => {
                                    const itemApi = row[slotIdx] || '';
                                    const iconUrl = itemApi ? resolveItemIcon(itemApi) : null;
                                    const itemInfo = itemApi ? itemsByApiName.get(itemApi) : null;
                                    const isSelected =
                                      activeTarget?.mode === 'combo' &&
                                      activeTarget.champApi === champ.apiName &&
                                      activeTarget.tipo === 'special_bis' &&
                                      activeTarget.rowIdx === rowIdx &&
                                      activeTarget.slotIdx === slotIdx;

                                    return (
                                      <div
                                        key={slotIdx}
                                        className={`${style.itemSlot} ${
                                          iconUrl ? style.itemSlotFilled : ''
                                        } ${isSelected ? style.itemSlotSelected : ''}`}
                                        title={
                                          itemInfo?.name
                                            ? `${itemInfo.name} (doble clic para quitar)`
                                            : 'Clic para seleccionar o arrastra cualquier ítem aquí'
                                        }
                                        onClick={() => {
                                          setActiveTarget({
                                            mode: 'combo',
                                            champApi: champ.apiName,
                                            tipo: 'special_bis',
                                            rowIdx,
                                            slotIdx,
                                          });
                                          if (paletteTab === 'byRole') {
                                            setRoleSubTab(detectRoleSubTabForChamp(champ));
                                          }
                                        }}
                                        onDoubleClick={() =>
                                          assignItemToComboSlot(
                                            champ.apiName,
                                            'special_bis',
                                            rowIdx,
                                            slotIdx,
                                            ''
                                          )
                                        }
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                          e.preventDefault();
                                          const droppedApi = e.dataTransfer.getData('tft_item_api');
                                          if (droppedApi) {
                                            assignItemToComboSlot(
                                              champ.apiName,
                                              'special_bis',
                                              rowIdx,
                                              slotIdx,
                                              droppedApi
                                            );
                                          }
                                        }}
                                      >
                                        {iconUrl ? (
                                          <img
                                            src={iconUrl}
                                            alt={itemInfo?.name || itemApi}
                                            className={style.itemSlotImg}
                                          />
                                        ) : (
                                          <span className={style.itemSlotPlus}>+</span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className={style.comboRowActions}>
                                  <button
                                    type="button"
                                    className={style.miniIconBtn}
                                    disabled={rowIdx === 0}
                                    onClick={() =>
                                      handleMoveComboRow(champ.apiName, 'special_bis', rowIdx, -1)
                                    }
                                    title="Subir prioridad"
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    className={style.miniIconBtn}
                                    disabled={rowIdx === draft.special_bis.length - 1}
                                    onClick={() =>
                                      handleMoveComboRow(champ.apiName, 'special_bis', rowIdx, 1)
                                    }
                                    title="Bajar prioridad"
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    className={`${style.miniIconBtn} ${style.miniDeleteBtn}`}
                                    onClick={() =>
                                      handleRemoveComboRow(champ.apiName, 'special_bis', rowIdx)
                                    }
                                    title="Eliminar combinación de BD y composiciones"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            className={style.addRowBtn}
                            onClick={() => handleAddComboRow(champ.apiName, 'special_bis')}
                          >
                            + Añadir fila Especial
                          </button>
                        </div>
                      </div>

                      {/* CAJÓN COLAPSABLE DE EXTRAS INDIVIDUALES PARA INFOGRAFÍA (Opción A) */}
                      {isExtrasOpen && (
                        <div className={style.extrasDrawer}>
                          {[
                            { key: 'radiantes', label: '✨ Radiantes Extra', palette: 'radiant' },
                            { key: 'artefactos', label: '⚒️ Artefactos Extra', palette: 'artifact' },
                            { key: 'emblemas', label: '🏅 Emblemas Extra', palette: 'emblem' },
                          ].map((cat) => {
                            const itemsArr = draft.extras?.[cat.key] || [];
                            const isTarget =
                              activeTarget?.mode === 'extra' &&
                              activeTarget.champApi === champ.apiName &&
                              activeTarget.categoria === cat.key;

                            return (
                              <div
                                key={cat.key}
                                className={`${style.extraCatBox} ${
                                  isTarget ? style.extraCatBoxActive : ''
                                }`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const droppedApi = e.dataTransfer.getData('tft_item_api');
                                  if (droppedApi) {
                                    addItemToExtra(champ.apiName, cat.key, droppedApi);
                                  }
                                }}
                              >
                                <div className={style.extraCatHeader}>
                                  <span>{cat.label}</span>
                                  <button
                                    type="button"
                                    className={style.extraAddTargetBtn}
                                    onClick={() => {
                                      setActiveTarget({
                                        mode: 'extra',
                                        champApi: champ.apiName,
                                        categoria: cat.key,
                                      });
                                      setPaletteTab(cat.palette);
                                    }}
                                  >
                                    {isTarget ? '● Seleccionado' : '+ Añadir'}
                                  </button>
                                </div>
                                <div className={style.extraItemsWrap}>
                                  {itemsArr.length === 0 ? (
                                    <span className={style.extraEmptyText}>
                                      Opcional (se suman a los de BIS Especiales en la infografía)
                                    </span>
                                  ) : (
                                    itemsArr.map((apiName, i) => {
                                      const iconUrl = resolveItemIcon(apiName);
                                      const info = itemsByApiName.get(apiName);
                                      return (
                                        <div
                                          key={`${apiName}-${i}`}
                                          className={style.extraItemChip}
                                          title={`${info?.name || apiName} (clic para quitar)`}
                                          onClick={() =>
                                            removeItemFromExtra(champ.apiName, cat.key, i)
                                          }
                                        >
                                          {iconUrl && (
                                            <img
                                              src={iconUrl}
                                              alt={info?.name || apiName}
                                              className={style.itemSlotImg}
                                            />
                                          )}
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* COLUMNA DERECHA: PALETA STICKY DE ÍTEMS */}
            <aside className={style.palettePanel}>
              <h3 className={style.paletteTitle}>🎒 Paleta de Objetos</h3>

              <div className={style.activeTargetBanner}>
                {activeTarget ? (
                  activeTarget.mode === 'combo' ? (
                    <>
                      <strong>Editando:</strong> {activeChampName} →{' '}
                      {activeTarget.tipo === 'bis' ? 'BIS' : 'BIS Especiales'} (Fila #
                      {activeTarget.rowIdx + 1} · Slot {activeTarget.slotIdx + 1})
                    </>
                  ) : (
                    <>
                      <strong>Añadiendo extra:</strong> {activeChampName} →{' '}
                      {activeTarget.categoria}
                    </>
                  )
                ) : (
                  'Haz clic en cualquier slot de un campeón o arrastra un objeto desde aquí.'
                )}
              </div>

              <input
                type="text"
                className={style.searchInput}
                placeholder="Buscar objeto..."
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
              />

              <div className={style.paletteTabs}>
                {[
                  { id: 'craftable', label: 'Craftables' },
                  { id: 'byRole', label: 'Por Rol' },
                  { id: 'radiant', label: 'Radiantes' },
                  { id: 'artifact', label: 'Artefactos' },
                  { id: 'emblem', label: 'Emblemas' },
                  { id: 'other', label: 'Otros' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`${style.paletteTabBtn} ${
                      paletteTab === tab.id ? style.paletteTabBtnActive : ''
                    }`}
                    onClick={() => {
                      setPaletteTab(tab.id);
                      if (tab.id === 'byRole' && activeTarget?.champApi) {
                        const targetChamp = championsOfSet.find(
                          (c) => c.apiName === activeTarget.champApi
                        );
                        if (targetChamp) {
                          setRoleSubTab(detectRoleSubTabForChamp(targetChamp));
                        }
                      }
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {paletteTab === 'byRole' && (
                <div className={style.paletteSubTabs}>
                  {Object.entries(ROLE_RECOMMENDED_ITEMS).map(([roleKey, roleDef]) => (
                    <button
                      key={roleKey}
                      type="button"
                      className={`${style.paletteSubTabBtn} ${
                        roleSubTab === roleKey ? style.paletteSubTabBtnActive : ''
                      }`}
                      onClick={() => setRoleSubTab(roleKey)}
                    >
                      {roleDef.label}
                    </button>
                  ))}
                </div>
              )}

              {paletteTab === 'craftable' && !itemSearch.trim() ? (
                <div className={style.paletteMatrixWrapper}>
                  {/* Encabezado de los 8 componentes básicos de combate (sin Espátula ni Sartén) */}
                  <div className={style.paletteMatrixHeaderRow}>
                    <span />
                    {categorizedPalette.baseComponents.map((comp) => {
                      const compIcon = resolveItemIcon(comp);
                      return (
                        <div key={`head-${comp.apiName}`} title={comp.name || comp.apiName}>
                          {compIcon && (
                            <img
                              src={compIcon}
                              alt={comp.name || comp.apiName}
                              className={style.paletteBaseIcon}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Filas 8x8: Fila 1 = Espadón, Fila 2 = Arco, Fila 3 = Vara, ..., Fila 8 = Guantes */}
                  {categorizedPalette.craftableMatrix.map((rowItems, rowIdx) => {
                    const rowComp = categorizedPalette.baseComponents[rowIdx];
                    const rowCompIcon = resolveItemIcon(rowComp);
                    return (
                      <div key={`row-${rowComp?.apiName || rowIdx}`} className={style.paletteMatrixRow}>
                        <div title={rowComp?.name || ''}>
                          {rowCompIcon && (
                            <img
                              src={rowCompIcon}
                              alt={rowComp?.name || ''}
                              className={style.paletteBaseIcon}
                            />
                          )}
                        </div>
                        {rowItems.map((item, colIdx) => {
                          const iconUrl = item ? resolveItemIcon(item) : null;
                          if (!item || !iconUrl) {
                            return <div key={`empty-${rowIdx}-${colIdx}`} className={style.paletteEmptyCell} />;
                          }
                          return (
                            <button
                              key={`${rowIdx}-${colIdx}-${item.apiName}`}
                              type="button"
                              className={style.paletteItemBtn}
                              title={item.name || item.apiName}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData('tft_item_api', item.apiName);
                              }}
                              onClick={() => handlePaletteItemClick(item)}
                            >
                              <img
                                src={iconUrl}
                                alt={item.name || item.apiName}
                                className={style.paletteItemImg}
                                loading="lazy"
                              />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={style.paletteGrid}>
                  {currentPaletteItems.map((item) => {
                    const iconUrl = resolveItemIcon(item);
                    if (!iconUrl) return null;
                    return (
                      <button
                        key={item.apiName}
                        type="button"
                        className={style.paletteItemBtn}
                        title={item.name || item.apiName}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('tft_item_api', item.apiName);
                        }}
                        onClick={() => handlePaletteItemClick(item)}
                      >
                        <img
                          src={iconUrl}
                          alt={item.name || item.apiName}
                          className={style.paletteItemImg}
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              <div className={style.paletteHint}>
                💡 <strong>Atajos:</strong> Haz clic en un slot y luego en 3 objetos seguidos (el foco avanza solo). Doble clic en un slot para limpiarlo.
              </div>
            </aside>
          </div>
        </>
      )}
    </section>
  );
};

export default AdminTFTItemizacion;
