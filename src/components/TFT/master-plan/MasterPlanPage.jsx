import { $hasMasterPlan } from '@stores/auth';
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { dificultades, categorias, tiers, dañoTipo } from '@stores/tft/dataFormularioCrear';
import { dataTFTAllItems, dataTFTChampions, dataTFTAllAugments, dataTFTTraits, metaCompsTFT, fetchAndSortComps, composMetaJSON, composMetaPBEJSON, versionTFT, setNumberLatest, setNumberPBE, dataDBTFTAumentos, swapVersionTFT } from '@stores/dataTFT';
import CardsMasterPlanCompos from './CardsMasterPlanCompos';
import ImgAugment from "@components/TFT/ImgAugment";
import { EXTRAS_ITEMS } from '@components/TFT/FormularioVisualTFT';
import { Items as ItemsList } from '@components/main/Admin/Items';
import ChampionsList from '@components/main/Admin/ChampionsList';
import TraitsList from '@components/main/Admin/TraitsList';
import AugmentsList from '@components/main/Admin/AugmentsList';
import style from './css/MasterPlanPage.module.css';
import { getLocalTftImage } from '@utils/images';
import InfografiaMPTFT from "./InfografiaMPTFT"
import { getTraitDisplayName } from '../../main/Admin/TraitsList';

export const CHECK_FILTERS = [
  { apiName: 'hero_augment', label: 'Aumento de Héroe' },
  { apiName: 'artifacts', label: 'Artefactos' },
  { apiName: 'special_items', label: 'Ítems Especiales' },
  { apiName: 'specific_augment', label: 'Aumentos Específicos (Caretaker, Worth the wait)' },
  { apiName: 'specific_synergy', label: 'Sinergias Específicas (Stargazer)' },
  { apiName: 'emblems', label: 'Emblemas (Espátula, Sartén)' },
  { apiName: 'synergies', label: 'Sinergias' },
];

export default function MasterPlanPage() {
  const hasPlan = useStore($hasMasterPlan);

  useEffect(() => {
    if (!hasPlan) {
      window.location.href = '/tft/meta-comps-tier-list-teamfight-tactics/';
    }
  }, [hasPlan]);

  const allItems = useStore(dataTFTAllItems) || [];
  const allChampions = useStore(dataTFTChampions) || [];
  const allCompos = useStore(metaCompsTFT) || [];
  const version = useStore(versionTFT);
  const versionNumber = version === "latest" ? setNumberLatest : setNumberPBE;
  const allAugments = useStore(dataTFTAllAugments) || [];
  const allTraits = useStore(dataTFTTraits) || [];
  const dbAumentos = useStore(dataDBTFTAumentos) || {};
  
  useEffect(() => {
    console.log("=== DEBUG MASTER PLAN ===");
    console.log("Version actual:", version);
    console.log("dbAumentos (keys):", Object.keys(dbAumentos).length);
    console.log("dbAumentos:", Object.keys(dbAumentos).filter((aumento)=> dbAumentos[aumento].categoria_grande !== null));
   console.log("dbAumentos:", dbAumentos);
    console.log("=========================");
  }, [version, dbAumentos]);

  const CATEGORIAS_GRANDES = ["Combate", "Economia", "Item", "Otros", "Heroe", "Especificos", "Resultado_Aleatorio"];
  const CATEGORIAS_PEQUENAS = ["Lose_Streak", "Win_Streak", "Experiencia", "Reroll", "Fast_9", "Emblema", "Artefactos", "AP", "AD", "Sinergia", "Escalado", "Loot"];

  const [selectedSmallCats, setSelectedSmallCats] = useState([]);
  const [selectedAugmentTiers, setSelectedAugmentTiers] = useState([]);
  const [selectedHardAugments, setSelectedHardAugments] = useState([]);

  const listaAumentosHeroes =[
    "TFT17_Augment_GragasCarry"
  ];

  // Función para obtener nombres amigables de un apiName según el tipo
  const getConditionDisplayName = (apiName, type) => {
    const t = type.toLowerCase();
    if (t === 'campeon') return allChampions.find(c => c.apiName === apiName)?.name || apiName;
    if (t === 'item') return allItems.find(i => i.apiName === apiName)?.name || apiName;
    if (t === 'aumento' || t === 'aumentoresaleatorio' || t === 'aumentoespecifico') return allAugments.find(a => a.apiName === apiName)?.name || apiName;
    if (t === 'sinergia') return allTraits.find(tr => tr.apiName === apiName)?.name || apiName;
    if (t === 'extra') return EXTRAS_ITEMS.find(e => e.apiName === apiName)?.name || apiName;
    return apiName;
  };

  // Función para obtener la URL de imagen de un apiName según el tipo
  const getConditionIconUrl = (apiName, type) => {
    const t = type.toLowerCase();
    if (t === 'campeon') {
      const champ = allChampions.find(c => c.apiName === apiName);
      if (champ) return getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber);
    }
    if (t === 'item') {
      const item = allItems.find(i => i.apiName === apiName);
      if (item) return getLocalTftImage(item.icon, 'items');
    }
    if (t === 'aumento' || t === 'aumentoresaleatorio' || t === 'aumentoespecifico') {
      
      const aug = allAugments.find(a => a.apiName === apiName);

      if (aug && aug.icon) {
        return aug.icon.includes("http") ? aug.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(aug.icon, 'augments', versionNumber);
      }
    }
    if (t === 'sinergia') {
      const tr = allTraits.find(tr => tr.apiName === apiName);
      console.log({apiName, tr})
      if (tr && tr.icon) return tr.icon.includes("http") ? tr.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(tr.icon, 'traits', versionNumber);
    }
    if (t === 'extra') {
      const ex = EXTRAS_ITEMS.find(e => e.apiName === apiName);
      if (ex) return ex.icon;
    }
    return "";
  };


  const BASIC_COMPONENTS_APINAMES = [
    "TFT_Item_BFSword",
    "TFT_Item_RecurveBow",
    "TFT_Item_NeedlesslyLargeRod",
    "TFT_Item_TearOfTheGoddess",
    "TFT_Item_ChainVest",
    "TFT_Item_NegatronCloak",
    "TFT_Item_GiantsBelt",
    "TFT_Item_SparringGloves",
    "TFT_Item_Spatula",
    "TFT_Item_FryingPan"
  ];

  const softItemsList = useMemo(() => {
    return BASIC_COMPONENTS_APINAMES.map(apiName => {
      const item = allItems.find(i => i.apiName === apiName);
      return {
        apiName,
        name: item?.name || item?.nombre || apiName,
        icon: item ? getLocalTftImage(item.icon, 'items') : null
      };
    });
  }, [allItems]);

  const [selectedSoftItems, setSelectedSoftItems] = useState([]);
  const [selectedSoftChampions, setSelectedSoftChampions] = useState([]);
  const [selectedSoftTraits, setSelectedSoftTraits] = useState([]);
  const [selectedSoftAugments, setSelectedSoftAugments] = useState([]);
  const [activeCheckFilters, setActiveCheckFilters] = useState([]);
  const [activeSoftTab, setActiveSoftTab] = useState('objetos');
  const [activeComp, setActiveComp] = useState(null);
console.log({selectedSoftItems})
  // Estados para Filtros Hard
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTier, setSelectedTier] = useState([]);
  const [selectedDamageType, setSelectedDamageType] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedChampions, setSelectedChampions] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedSinergias, setSelectedSinergias] = useState([]);
  const [selectedAumentoResAleatorio, setSelectedAumentoResAleatorio] = useState([]);
  const [selectedAumentoEspecifico, setSelectedAumentoEspecifico] = useState([]);
  const [gruposSalidasEarly, setGruposSalidasEarly] = useState([]);
  const [selectedSalidasEarly, setSelectedSalidasEarly] = useState([]);

  useEffect(() => {
    const fetchGruposSalidasEarly = async () => {
      try {
        const res = await fetch(`https://api.guiadeparche.com/tft/campeones-early.php?set=${versionNumber}`);
        const data = await res.json();
        setGruposSalidasEarly(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error fetching grupos salidas early", e);
      }
    };
    fetchGruposSalidasEarly();
  }, [versionNumber]);
  useEffect(()=>{
    const loadDataTFT = async()=>{
      const currentCompos = metaCompsTFT.get();
      if (!currentCompos || currentCompos.length === 0) {
        const url = versionTFT.get() === "pbe" ? composMetaPBEJSON : composMetaJSON;
        await fetchAndSortComps(url);
      }
    }
    loadDataTFT();
  }, []);

  useEffect(()=>{
    console.log({allCompos})
  },[allCompos])

  useEffect(()=>{
    //cuando tenga valor deberia desplazarse el scroll a donde esta activeCompContainer y cuando no tenga un valor el scroll deberia de ir a masterPlanContainer
    if(activeComp) {
      setTimeout(() => {
        const activeCompContainer = document.getElementById('activeCompContainer');
        if(activeCompContainer) {
          activeCompContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setTimeout(() => {
        const masterPlanContainer = document.getElementById('masterPlanContainer');
        if(masterPlanContainer) {
          masterPlanContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  },[activeComp])

  const toggleFilter = (filterType, apiName) => {
    if (filterType === 'check') {
      setActiveCheckFilters(prev => 
        prev.includes(apiName) ? prev.filter(f => f !== apiName) : [...prev, apiName]
      );
    }
  };

  const toggleArrayFilter = (setter, value) => {
    setter(prev => {
      if (Array.isArray(value) || typeof value === 'object') {
        return prev.some(v => v.apiName === value.apiName) ? prev.filter(v => v.apiName !== value.apiName) : [...prev, value];
      }
      return prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
    });
  };

  const toggleSelectedItem = (itemObj) => {
    if (selectedItems.some(i => i.apiName === itemObj.apiName)) {
      setSelectedItems(selectedItems.filter(i => i.apiName !== itemObj.apiName));
    } else {
      setSelectedItems([...selectedItems, itemObj]);
    }
  };

  const toggleSelectedChampion = (champObj) => {
    if (selectedChampions.some(c => c.apiName === champObj.apiName)) {
      setSelectedChampions(selectedChampions.filter(c => c.apiName !== champObj.apiName));
    } else {
      setSelectedChampions([...selectedChampions, champObj]);
    }
  };

  const toggleSoftItem = (itemObj) => {
    if (selectedSoftItems.some(i => (typeof i === 'object' ? i.apiName : i) === itemObj.apiName)) {
      setSelectedSoftItems(selectedSoftItems.filter(i => (typeof i === 'object' ? i.apiName : i) !== itemObj.apiName));
    } else {
      setSelectedSoftItems([...selectedSoftItems, itemObj]);
    }
  };

  const toggleSoftChampion = (champObj) => {
    if (selectedSoftChampions.some(c => (typeof c === 'object' ? c.apiName : c) === champObj.apiName)) {
      setSelectedSoftChampions(selectedSoftChampions.filter(c => (typeof c === 'object' ? c.apiName : c) !== champObj.apiName));
    } else {
      setSelectedSoftChampions([...selectedSoftChampions, champObj]);
    }
  };

  const filteredComposPrimary = useMemo(() => {
    return allCompos.filter(compo => {
      if (selectedCategory.length > 0 && !selectedCategory.includes(compo.categoria)) return false;
      if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(compo.dificultad)) return false;
      if (selectedTier.length > 0 && !selectedTier.includes(compo.tier)) return false;
      if (selectedDamageType.length > 0 && !selectedDamageType.includes(compo.tipoDeDano)) return false;
      return true;
    });
  }, [allCompos, selectedCategory, selectedDifficulty, selectedTier, selectedDamageType]);

  const allConditions = useMemo(() => filteredComposPrimary.flatMap((comp) => comp.condiciones || []), [filteredComposPrimary]);

  const opEarlyAugmentsMap = useMemo(() => {
    const map = new Map();
    filteredComposPrimary.forEach(compo => {
      if(compo.aumentos && Array.isArray(compo.aumentos)) {
        compo.aumentos.forEach(aumento => {
          if (aumento.op || aumento.early) {
            const apiNameGrande = aumento.apiNameGrande || aumento.apiName;
            const apiNamePequeno = aumento.apiNamePequeno;
            
            if (apiNameGrande && !map.has(apiNameGrande)) {
              const augObj = allAugments.find(a => a.apiName === apiNameGrande);
              if (augObj) map.set(apiNameGrande, { ...augObj, championApiName: apiNamePequeno });
            }
            if (apiNamePequeno && !map.has(apiNamePequeno)) {
              const augObj = allAugments.find(a => a.apiName === apiNamePequeno);
              if (augObj) map.set(apiNamePequeno, { ...augObj, championApiName: apiNamePequeno });
            }
          }
        });
      }

      if (compo.condiciones && Array.isArray(compo.condiciones)) {
        compo.condiciones.forEach(cond => {
          if (cond) {
            const apiNameGrande = cond.apiNameGrande;
            const apiNamePequeno = cond.ApiNamePequeno || cond.apiNamePequeno;
            
            if (apiNameGrande && !map.has(apiNameGrande)) {
              const augObj = allAugments.find(a => a.apiName === apiNameGrande);
              if (augObj) map.set(apiNameGrande, { ...augObj, championApiName: apiNamePequeno });
            }
            if (apiNamePequeno && !map.has(apiNamePequeno)) {
              const augObj = allAugments.find(a => a.apiName === apiNamePequeno);
              if (augObj) map.set(apiNamePequeno, { ...augObj, championApiName: apiNamePequeno });
            }
          }
        });
      }
    });
    const result = Array.from(map.values());
    console.log("opEarlyAugmentsMap:", result);
    return result;
  }, [filteredComposPrimary, allAugments]);


  // Obtiene una lista única sin duplicar de objetos { apiName, name, icon, type } buscando SOLO en condTypeGrande
  const getUniqueConditionsGrandeByType = useCallback((targetType) => {
    const target = targetType.toLowerCase();
    const uniqueMap = new Map();

    allConditions.forEach(cond => {
      if (!cond) return;
      const tGrande = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();

      if (tGrande === target && cond.apiNameGrande && !uniqueMap.has(cond.apiNameGrande)) {
        uniqueMap.set(cond.apiNameGrande, {
          apiName: cond.apiNameGrande,
          apiNamePequeno: cond.ApiNamePequeno || cond.apiNamePequeno,
          name: getConditionDisplayName(cond.apiNameGrande, targetType),
          icon: getConditionIconUrl(cond.apiNameGrande, targetType),
          type: targetType
        });
      }
    });

    if (target === "item") {
      filteredComposPrimary.forEach(comp => {
        if (comp.itemsPrio && Array.isArray(comp.itemsPrio)) {
          comp.itemsPrio.forEach(item => {
            if (item && typeof item === 'object' && (item.op === true || item.op === "true") && item.apiName && !uniqueMap.has(item.apiName)) {
              uniqueMap.set(item.apiName, {
                apiName: item.apiName,
                name: getConditionDisplayName(item.apiName, targetType),
                icon: getConditionIconUrl(item.apiName, targetType),
                type: targetType
              });
            }
          });
        }
      });
    }

    return Array.from(uniqueMap.values());
  }, [allConditions, filteredComposPrimary, getConditionDisplayName, getConditionIconUrl]);

  const condicionesGrandeCampeones = useMemo(() => getUniqueConditionsGrandeByType("campeon"), [getUniqueConditionsGrandeByType]);
  const condicionesGrandeItems = useMemo(() => getUniqueConditionsGrandeByType("item"), [getUniqueConditionsGrandeByType]);
  const condicionesGrandeExtras = useMemo(() => getUniqueConditionsGrandeByType("extra"), [getUniqueConditionsGrandeByType]);
  const condicionesGrandeSinergias = useMemo(() => getUniqueConditionsGrandeByType("sinergia"), [getUniqueConditionsGrandeByType]);
  const condicionesGrandeAumentoResAleatorio = useMemo(() => getUniqueConditionsGrandeByType("aumentoresaleatorio"), [getUniqueConditionsGrandeByType]);
  const condicionesGrandeAumentoEspecifico = useMemo(() => getUniqueConditionsGrandeByType("aumentoespecifico"), [getUniqueConditionsGrandeByType]);

  const filteredCompos = useMemo(() => {
    return filteredComposPrimary.filter(compo => {
      const hasAnyConditionSelected = 
        selectedItems.length > 0 ||
        selectedChampions.length > 0 ||
        selectedExtras.length > 0 ||
        selectedSinergias.length > 0 ||
        selectedAumentoResAleatorio.length > 0 ||
        selectedAumentoEspecifico.length > 0 ||
        selectedHardAugments.length > 0 ||
        selectedSalidasEarly.length > 0;

      if (hasAnyConditionSelected) {
        let matchesAnySelectedCondition = false;

        if (selectedItems.length > 0) {
          const matchItem = selectedItems.some(item => 
            compo.itemsPrio?.some(i => (typeof i === 'object' && i !== null ? i.apiName : i) === item.apiName) || 
            compo.campeonMeta?.apiNameItemsDelCampeon?.includes(item.apiName) ||
            compo.posicionamiento?.[0]?.tablero?.some(champ => champ.apiNameItemsDelCampeon?.includes(item.apiName)) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === item.apiName || c.ApiNamePequeno === item.apiName)
          );
          if (matchItem) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition && selectedChampions.length > 0) {
          const boardChampions = compo.posicionamiento?.[0]?.tablero?.map(c => c.apiNameCampeon) || [];
          const matchChamp = selectedChampions.some(champ => 
            boardChampions.includes(champ.apiName) || 
            compo.campeonMeta?.apiNameCampeon === champ.apiName ||
            compo.campeonesEarly?.some(early => early.apiNameCampeon === champ.apiName) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === champ.apiName || c.ApiNamePequeno === champ.apiName)
          );
          if (matchChamp) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition && selectedExtras.length > 0) {
          const matchExtra = selectedExtras.some(apiName =>
            (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName)
          );
          if (matchExtra) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition && selectedSinergias.length > 0) {
          const compoTraits = (compo.sinergias || []).map(s => s.apiName || s.apiNameSinergia).filter(Boolean);
          const matchSinergia = selectedSinergias.some(apiName =>
            compoTraits.includes(apiName) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName)
          );
          if (matchSinergia) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition && selectedAumentoResAleatorio.length > 0) {
          const compoAugments = (compo.aumentos || []).map(a => typeof a === 'object' ? a.apiName : a).filter(Boolean);
          const matchAugAleatorio = selectedAumentoResAleatorio.some(apiName =>
            compoAugments.includes(apiName) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName)
          );
          if (matchAugAleatorio) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition && selectedAumentoEspecifico.length > 0) {
          const compoAugments = (compo.aumentos || []).map(a => typeof a === 'object' ? a.apiName : a).filter(Boolean);
          const matchAugEspecifico = selectedAumentoEspecifico.some(apiName =>
            compoAugments.includes(apiName) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName)
          );
          if (matchAugEspecifico) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition && selectedHardAugments.length > 0) {
          const compoAugments = (compo.aumentos || []).flatMap(a => [a.apiNameGrande, a.apiNamePequeno]).filter(Boolean);
          const matchAug = selectedHardAugments.some(aug =>
            compoAugments.includes(aug.apiName) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === aug.apiName || c.ApiNamePequeno === aug.apiName)
          );
          if (matchAug) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition && selectedSalidasEarly.length > 0) {
          const compoSalidas = compo.salidasEarly || [];
          const matchSalida = selectedSalidasEarly.some(grupoId => compoSalidas.some(s => String(s) === String(grupoId)));
          if (matchSalida) matchesAnySelectedCondition = true;
        }

        if (!matchesAnySelectedCondition) return false;
      }

      return true;
    });
  }, [filteredComposPrimary, selectedItems, selectedChampions, selectedExtras, selectedSinergias, selectedAumentoResAleatorio, selectedAumentoEspecifico, selectedHardAugments, selectedSalidasEarly]);

  const availableSoftItemApiNames = useMemo(() => {
    const set = new Set();
    filteredCompos.forEach(comp => {
      if (comp.itemsPrio && Array.isArray(comp.itemsPrio)) {
        comp.itemsPrio.forEach(prio => {
          const nombreItem = typeof prio === 'object' && prio !== null ? prio.apiName : prio;
          if (!nombreItem) return;
          set.add(nombreItem);
          const itemData = allItems.find(x => x.apiName === nombreItem);
          if (itemData?.composition && Array.isArray(itemData.composition)) {
            itemData.composition.forEach(compApiName => set.add(compApiName));
          }
        });
      }
    });
    return set;
  }, [filteredCompos, allItems]);

  const softChampionsList = useMemo(() => {
    const uniqueMap = new Map();
    filteredCompos.forEach(comp => {
      if (comp.campeonesEarly && Array.isArray(comp.campeonesEarly)) {
        comp.campeonesEarly.forEach(early => {
          const apiName = typeof early === 'object' && early !== null ? early.apiNameCampeon : early;
          if (apiName && !uniqueMap.has(apiName)) {
            const champ = allChampions.find(c => c.apiName === apiName);
            uniqueMap.set(apiName, {
              apiName,
              name: champ?.name || champ?.nombre || apiName,
              icon: champ ? getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber) : null,
              cost: champ?.cost || champ?.coste || 1
            });
          }
        });
      }
    });
    return Array.from(uniqueMap.values());
  }, [filteredCompos, allChampions, versionNumber]);

  const softChampionsByCost = useMemo(() => {
    const groups = {};
    softChampionsList.forEach(champ => {
      const c = champ.cost || 1;
      if (!groups[c]) groups[c] = [];
      groups[c].push(champ);
    });
    Object.keys(groups).forEach(cost => {
      groups[cost].sort((a, b) => a.name.localeCompare(b.name));
    });
    return groups;
  }, [softChampionsList]);

  const FiltroHard = ()=>{
    return(
    <fieldset className={`${style.filtersSection} ${style.filtersSectionHard}`}>
      <legend>Filtro Hard (Playstyle / Estilo de juego)</legend>
      <div className={style.hardFiltersGrid}>
        <div className={style.filterInputGroup}>
          <label>Tiers</label>
          <div className={style.filterButtonsContainer}>
            {tiers?.map(t => (
              <button
                key={t}
                type="button"
                data-tier={t}
                className={`${style.filterOptionBox} ${selectedTier.includes(t) ? style.filterOptionBoxActive : ''}`}
                onClick={() => toggleArrayFilter(setSelectedTier, t)}
              >
                Tier {t}
              </button>
            ))}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Categorías</label>
          <div className={style.filterButtonsContainer}>
            {categorias?.Es?.map(cat => (
              <button
                key={cat}
                type="button"
                data-categoria={cat}
                className={`${style.filterOptionBox} ${selectedCategory.includes(cat) ? style.filterOptionBoxActive : ''}`}
                onClick={() => toggleArrayFilter(setSelectedCategory, cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Dificultad</label>
          <div className={style.filterButtonsContainer}>
            {dificultades?.Es?.map(d => (
              <button
                key={d}
                type="button"
                data-dificultad={d}
                className={`${style.filterOptionBox} ${selectedDifficulty.includes(d) ? style.filterOptionBoxActive : ''}`}
                onClick={() => toggleArrayFilter(setSelectedDifficulty, d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        
        <div className={style.filterInputGroup}>
          <label>Tipo de Daño</label>
          <div className={style.filterButtonsContainer}>
            {dañoTipo?.Es?.map(d => (
              <button
                key={d}
                type="button"
                data-tipodedano={d}
                className={`${style.filterOptionBox} ${selectedDamageType.includes(d) ? style.filterOptionBoxActive : ''}`}
                onClick={() => toggleArrayFilter(setSelectedDamageType, d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Objetos Específicos</label>
          <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {condicionesGrandeItems.length > 0 ? (
              condicionesGrandeItems.map(item => (
                <button
                  key={item.apiName}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedItems.some(i => i.apiName === item.apiName) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleSelectedItem(item)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {item.icon && <img src={item.icon} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '3px' }} />}
                  <span>{item.name}</span>
                </button>
              ))
            ) : (
              <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay objetos de condición disponibles</span>
            )}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Campeones</label>
          <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {condicionesGrandeCampeones.length > 0 ? (
              condicionesGrandeCampeones.map(champ => (
                <button
                  key={champ.apiName}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedChampions.some(c => c.apiName === champ.apiName) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleSelectedChampion(champ)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {champ.icon && <img src={champ.icon} alt={champ.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '3px' }} />}
                  <span>{champ.name}</span>
                </button>
              ))
            ) : (
              <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay campeones de condición disponibles</span>
            )}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Extra</label>
          <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {condicionesGrandeExtras.length > 0 ? (
              condicionesGrandeExtras.map(extra => (
                <button
                  key={extra.apiName}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedExtras.includes(extra.apiName) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleArrayFilter(setSelectedExtras, extra.apiName)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {extra.icon && <img src={extra.icon} alt={extra.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '3px' }} />}
                  <span>{extra.name}</span>
                </button>
              ))
            ) : (
              <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay extras disponibles</span>
            )}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Sinergia</label>
          <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {condicionesGrandeSinergias.length > 0 ? (
              condicionesGrandeSinergias.map(sinergia => (
                <button
                  key={sinergia.apiName}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedSinergias.includes(sinergia.apiName) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleArrayFilter(setSelectedSinergias, sinergia.apiName)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {sinergia.icon && <img src={sinergia.icon} alt={sinergia.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '3px' }} />}
                  <span>{getTraitDisplayName(sinergia)}</span>
                </button>
              ))
            ) : (
              <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay sinergias disponibles</span>
            )}
          </div>
        </div>
      </div>
    </fieldset>
    )
  }

  const FiltroSoft = ()=>{
    return(
    <fieldset className={`${style.filtersSection} ${style.filtersSectionSoft}`}>
      <legend>Filtro Soft (Highlights de cosas que te pueden salir)</legend>
      
      <div className={style.filterInputGroup}>
        <label>Objetos</label>
        <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
          {softItemsList.map(item => {
            const isAvailable = availableSoftItemApiNames.has(item.apiName);
            const isSelected = selectedSoftItems.some(i => (typeof i === 'object' ? i.apiName : i) === item.apiName);
            return (
              <button
                key={item.apiName}
                type="button"
                title={item.name}
                disabled={!isAvailable}
                className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
                onClick={() => isAvailable && toggleSoftItem(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  opacity: isAvailable ? 1 : 0.25,
                  filter: isAvailable ? 'none' : 'grayscale(100%)',
                  cursor: isAvailable ? 'pointer' : 'not-allowed'
                }}
              >
                {item.icon && <img src={item.icon} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px' }} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className={style.filterInputGroup} style={{ marginTop: '16px' }}>
        <label>Campeones (Early)</label>
        {Object.keys(softChampionsByCost).length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {Object.keys(softChampionsByCost).sort((a,b) => Number(a) - Number(b)).map(cost => (
              <div key={cost} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#bbb' }}>Coste {cost}</span>
                <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {softChampionsByCost[cost].map(champ => (
                    <button
                      key={champ.apiName}
                      type="button"
                      title={champ.name}
                      className={`${style.filterOptionBox} ${selectedSoftChampions.some(c => (typeof c === 'object' ? c.apiName : c) === champ.apiName) ? style.filterOptionBoxActive : ''}`}
                      onClick={() => toggleSoftChampion(champ)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', minWidth: '70px', gap: '6px' }}
                    >
                      {champ.icon && <img src={champ.icon} alt={champ.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', border: `2px solid var(--color-hex-cost-${champ.cost || cost})`, boxSizing: 'border-box' }} />}
                      <span style={{ fontSize: '0.78rem', textAlign: 'center', lineHeight: '1.1' }}>{champ.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay campeones early disponibles</span>
        )}
      </div>
    </fieldset>
    )
  }

  const FiltroAumentos = () => {
    return (
      <fieldset className={`${style.filtersSection}`}>
        <legend>Filtro de Aumentos (OP/Early)</legend>
        
        <div className={style.filterInputGroup}>
          <label>Categorías de aumentos:</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', marginBottom: '15px' }}>
            <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', marginRight: '5px' }}>Tiers:</span>
              {['Plata', 'Oro', 'Prismatico'].map(tier => (
                <button
                  key={tier}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedAugmentTiers.includes(tier) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleArrayFilter(setSelectedAugmentTiers, tier)}
                >
                  {tier}
                </button>
              ))}
            </div>

            <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', marginRight: '5px' }}>Pequeñas:</span>
              {CATEGORIAS_PEQUENAS.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedSmallCats.includes(cat) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleArrayFilter(setSelectedSmallCats, cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {CATEGORIAS_GRANDES.map(catGrande => {
            const augsInCategory = opEarlyAugmentsMap.filter(aug => dbAumentos[aug.apiName]?.categoria_grande === catGrande);
            if (augsInCategory.length === 0) return null;

            return (
              <div key={catGrande} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.15)', padding: '10px', borderRadius: '8px' }}>
                <h4 style={{ color: '#ffcc00', margin: '0 0 5px 0', borderBottom: '1px solid #444', paddingBottom: '5px' }}>{catGrande}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '8px' }}>
                  {augsInCategory.map(aug => {
                    let isGrayedOut = false;
                    
                    if (selectedAugmentTiers.length > 0) {
                      const augTier = dbAumentos[aug.apiName]?.categoria_tier;
                      if (!selectedAugmentTiers.includes(augTier)) {
                        return null; // hide if it doesn't match selected tiers
                      }
                    }

                    if (selectedSmallCats.length > 0) {
                      const augCatsPequenas = dbAumentos[aug.apiName]?.categoria_pequeno || [];
                      isGrayedOut = !selectedSmallCats.some(sc => augCatsPequenas.includes(sc)); 
                    }

                    const isSelected = selectedHardAugments.some(a => a.apiName === aug.apiName);
                    const champ = (catGrande === "Heroe" && aug.championApiName) 
                      ? allChampions.find(c => c.apiName === aug.championApiName) 
                      : null;

                    return (
                      <div 
                        key={aug.apiName}
                        onClick={() => toggleArrayFilter(setSelectedHardAugments, aug)}
                        title={aug.name}
                        style={{ 
                          cursor: 'pointer', 
                          opacity: isGrayedOut ? 0.3 : 1, 
                          filter: isGrayedOut ? 'grayscale(100%)' : 'none',
                          border: isSelected ? '2px solid #ffcc00' : '2px solid transparent',
                          borderRadius: '6px',
                          padding: '6px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          background: isSelected ? 'rgba(255, 204, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                          transition: 'all 0.2s ease',
                          gap: '6px'
                        }}
                      >
                        <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ImgAugment augment={aug} width={40} height={40} />
                          {champ && (champ.img || champ.tileIcon) && (
                            <img 
                              src={getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber)} 
                              alt={champ.name} 
                              style={{ 
                                position: 'absolute', 
                                top: '-4px', 
                                left: '-4px', 
                                width: '30px', 
                                height: '30px', 
                                objectFit: 'contain', 
                                borderRadius: '4px', 
                                border: '1px solid #ffcc00',
                                backgroundColor: 'rgba(0,0,0,0.8)'
                              }} 
                            />
                          )}
                        </div>
                        <span style={{ fontSize: '0.65rem', textAlign: 'center', lineHeight: '1.2', wordBreak: 'break-word', color: isSelected ? '#ffcc00' : '#ddd' }}>
                          {aug.name}{champ ? ` + ${champ.name}` : ''}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        </div>

      </fieldset>
    );
  };

  const FiltroSalidasEarly = () => {
    return (
      <fieldset className={`${style.filtersSection} ${style.filtersSectionSoft}`}>
        <legend>Filtro Salidas Early</legend>
        <div className={style.filterInputGroup}>
          <label>Grupos de Campeones</label>
          <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {gruposSalidasEarly.length > 0 ? (
              gruposSalidasEarly.map(grupo => (
                <button
                  key={grupo.id}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedSalidasEarly.includes(grupo.id) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleArrayFilter(setSelectedSalidasEarly, grupo.id)}
                >
                  <span>{grupo.nombre}</span>
                </button>
              ))
            ) : (
              <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay grupos de salidas early disponibles</span>
            )}
          </div>
        </div>
      </fieldset>
    );
  };

  return (
    <div id={"masterPlanContainer"} className={style.masterPlanContainer}>
      <div className={style.containerTop}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button 
            style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: version === 'latest' ? '#ffcc00' : '#444', color: version === 'latest' ? '#000' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => swapVersionTFT('latest')}>
            Set {setNumberLatest} (Latest)
          </button>
          <button 
            style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: version === 'pbe' ? '#ffcc00' : '#444', color: version === 'pbe' ? '#000' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => swapVersionTFT('pbe')}>
            Set {setNumberPBE} (PBE)
          </button>
        </div>
        <div className={style.filtersSectionContainer}>
        {FiltroHard()}
        {FiltroAumentos()}
        {FiltroSoft()}
        {FiltroSalidasEarly()}

        {/* <div className={style.filtersSection}>
          <h3>Filtro Check (Condiciones específicas)</h3>
          <div className={style.filterGroup}>
            {CHECK_FILTERS.map((filter) => (
              <label key={filter.apiName} className={style.filterLabel}>
                <input 
                  type="checkbox" 
                  checked={activeCheckFilters.includes(filter.apiName)}
                  onChange={() => toggleFilter('check', filter.apiName)}
                />
                {filter.label}
              </label>
            ))}
          </div>
        </div> */}
      </div>

      <div className={style.resultsSection}>
        <h3>Resultados ({filteredCompos.length})</h3>
        <div className={style.composGrid}>
          {filteredCompos.length > 0 ? (
            filteredCompos.map(compo => (
              <div className={style.cardContainer} onClick={()=>setActiveComp(allCompos.find((comp)=>comp.id === compo.id))}>
                <CardsMasterPlanCompos key={compo.id || compo.titulo || Math.random()} compo={compo} filtroSoft={{selectedSoftItems,selectedSoftChampions,selectedSoftTraits,selectedSoftAugments}} gruposSalidasEarly={gruposSalidasEarly} />
              </div>
            ))
          ) : (
            <p className={style.noResults}>No se encontraron composiciones con estos filtros.</p>
          )}
        </div>
      </div>
      </div>
      <div className={style.containerMid}>
      {activeComp && (
        <div id={"activeCompContainer"} className={style.activeCompContainer}>
          <div className={style.activeCompCloseButton} onClick={()=>setActiveComp(null)}>
            X
          </div>
          <InfografiaMPTFT comp={activeComp}/>
        </div>
      )}
      </div>


    </div>
  );
}

