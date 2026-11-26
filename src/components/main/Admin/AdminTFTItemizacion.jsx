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
  buildCraftableApiSet,
  classifyTftItem,
  isCraftableWithoutEmblems,
  hasAnyItemInRow,
  normalizeTriplet,
  findChampionItemizacion,
  getChampionRoleMeta,
} from '@utils/tftItemClassifier';
import InfografiaItemizacionTFT from '@components/Infografias/ItemizacionTFT/InfografiaItemizacionTFT.jsx';

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
  const [paletteTab, setPaletteTab] = useState('craftable'); // 'craftable' | 'radiant' | 'artifact' | 'emblem' | 'other'
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

    const groups = {
      craftable: [],
      radiant: [],
      artifact: [],
      emblem: [],
      other: [],
    };
    const seen = new Set();

    // Para crafteables normales, usar el orden conocido de AllCraftableItems primero
    const craftablesOrdered = AllCraftableItems(allItems);
    craftablesOrdered.forEach((item) => {
      if (!item?.apiName || seen.has(item.apiName)) return;
      if (isCraftableWithoutEmblems(item, allItems, craftableApiSet)) {
        seen.add(item.apiName);
        groups.craftable.push(item);
      }
    });

    // Emblemas del set activo
    activeSetItems.forEach((item) => {
      if (!item?.apiName || seen.has(item.apiName)) return;
      const cat = classifyTftItem(item, allItems, craftableApiSet);
      if (cat === 'emblem') {
        seen.add(item.apiName);
        groups.emblem.push(item);
      }
    });

    // Resto del catálogo global (Radiantes, Artefactos, Otros y crafteables faltantes)
    allItems.forEach((item) => {
      if (!item?.apiName || seen.has(item.apiName) || !item.icon) return;
      const cat = classifyTftItem(item, allItems, craftableApiSet);
      if (cat === 'emblem') return; // Los emblemas solo del set activo para evitar emblemas de sets viejos
      if (cat === 'craftable') {
        seen.add(item.apiName);
        groups.craftable.push(item);
      } else if (cat === 'radiant') {
        // Excluir radiantes obsoletos o duplicados sin nombre
        if (!item.name) return;
        seen.add(item.apiName);
        groups.radiant.push(item);
      } else if (cat === 'artifact') {
        if (!item.name) return;
        seen.add(item.apiName);
        groups.artifact.push(item);
      } else if (
        item.apiName.includes(`TFT${targetSetNumber}_`) ||
        item.apiName.includes('Support') ||
        item.apiName.includes('LocketOfTheIronSolari') ||
        item.apiName.includes('ZekesHerald') ||
        item.apiName.includes('Zephyr')
      ) {
        seen.add(item.apiName);
        groups.other.push(item);
      }
    });

    Object.keys(groups).forEach((k) => {
      if (k !== 'craftable') {
        groups[k].sort((a, b) => String(a.name || a.apiName).localeCompare(String(b.name || b.apiName)));
      }
    });

    return groups;
  }, [allItems, itemsBySetMap, targetSetNumber, craftableApiSet]);

  const currentPaletteItems = useMemo(() => {
    const list = categorizedPalette[paletteTab] || [];
    const q = itemSearch.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (i) =>
        String(i.name || '').toLowerCase().includes(q) ||
        String(i.apiName || '').toLowerCase().includes(q)
    );
  }, [categorizedPalette, paletteTab, itemSearch]);

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
        draft.extras
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
      };
    });
    return merged;
  }, [drafts, setDbMap]);

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
                                          setPaletteTab('craftable');
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
                    onClick={() => setPaletteTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

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
