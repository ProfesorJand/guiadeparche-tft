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
import ActiveTraitsDisplay from '../ActiveTraitsDisplay';

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
  const allComposRaw = useStore(metaCompsTFT) || [];
  const version = useStore(versionTFT);
  const versionNumber = version === "latest" ? setNumberLatest : setNumberPBE;
  const allCompos = useMemo(() => {
    return allComposRaw.filter(comp => String(comp.set_number) === String(versionNumber) || comp.set_number === "all");
  }, [allComposRaw, versionNumber]);
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

  const CATEGORIAS_GRANDES = ["Combate", "Economia", "Item", "Heroe", "Especificos", "Resultado_Aleatorio", "Otros"];
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


  const BASIC_COMPONENTS_APINAMES = version === "pbe" ? [
    "DA_Component_BFSword",
    "DA_Component_RecurveBow",
    "DA_Component_NeedlesslyLargeRod",
    "DA_Component_TearOfTheGoddess",
    "DA_Component_ChainVest",
    "DA_Component_NegatronCloak",
    "DA_Component_GiantsBelt",
    "DA_Component_SparringGloves",
    "DA_Component_Spatula",
    "DA_Component_FryingPan"
  ] : [
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
  const [selectedCraftableComponents, setSelectedCraftableComponents] = useState([]);
  const [selectedChampions, setSelectedChampions] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedSinergias, setSelectedSinergias] = useState([]);
  const [selectedAumentoResAleatorio, setSelectedAumentoResAleatorio] = useState([]);
  const [selectedAumentoEspecifico, setSelectedAumentoEspecifico] = useState([]);
  const [gruposSalidasEarly, setGruposSalidasEarly] = useState([]);
  const [selectedSalidasEarly, setSelectedSalidasEarly] = useState([]);
  const [selectedSalidasEarlyChampions, setSelectedSalidasEarlyChampions] = useState([]);
  const [selectedSalidasEarlyComponents, setSelectedSalidasEarlyComponents] = useState([]);
  const [selectedSalidasEarlyItems, setSelectedSalidasEarlyItems] = useState([]);
  const [selectedSalidasEarlySinergias, setSelectedSalidasEarlySinergias] = useState([]);
  useEffect(() => {
    const fetchGruposSalidasEarly = async () => {
      try {
        const res = await fetch(`https://api.guiadeparche.com/tft/campeones-early.php`);
        const result = await res.json();
        if (result.status === 'success') {
          const allGrupos = result.data || [];
          setGruposSalidasEarly(allGrupos.filter(g => g.set_number === versionNumber || g.set_number === "all"));
        } else {
          const dataArr = Array.isArray(result) ? result : [];
          setGruposSalidasEarly(dataArr.filter(g => g.set_number === versionNumber || g.set_number === "all"));
        }
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

  const resetAllFilters = () => {
    setSelectedTier([]);
    setSelectedCategory([]);
    setSelectedDifficulty([]);
    setSelectedDamageType([]);
    setSelectedItems([]);
    setSelectedChampions([]);
    setSelectedExtras([]);
    setSelectedSinergias([]);
    setSelectedAumentoResAleatorio([]);
    setSelectedAumentoEspecifico([]);
    setSelectedHardAugments([]);
    setSelectedSalidasEarly([]);
    setSelectedSalidasEarlyChampions([]);
    setSelectedSalidasEarlyComponents([]);
    setSelectedSalidasEarlyItems([]);
    setSelectedSoftItems([]);
    setSelectedSoftChampions([]);
    setSelectedSoftTraits([]);
    setSelectedSoftAugments([]);
    setActiveCheckFilters([]);
  };

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

  const toggleSelectedSalidasEarlyChampion = (champObj) => {
    if (selectedSalidasEarlyChampions.some(c => c.apiName === champObj.apiName)) {
      setSelectedSalidasEarlyChampions(selectedSalidasEarlyChampions.filter(c => c.apiName !== champObj.apiName));
    } else {
      setSelectedSalidasEarlyChampions([...selectedSalidasEarlyChampions, champObj]);
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

  const activateMissingOPM = (type, apiName) => {
    if (type === 'item') {
      const dbItem = allItems.find(i => i.apiName === apiName);
      if (dbItem && !selectedSalidasEarlyItems.some(i => i.apiName === apiName)) {
        const itemObj = {
          apiName: dbItem.apiName,
          name: dbItem.name,
          icon: getLocalTftImage(dbItem.icon, 'items')
        };
        toggleArrayFilter(setSelectedSalidasEarlyItems, itemObj);
      }
    } else if (type === 'campeon') {
      const dbChamp = allChampions.find(c => c.apiName === apiName);
      if (dbChamp && !selectedSalidasEarlyChampions.some(c => c.apiName === apiName)) {
        const champObj = {
          apiName: dbChamp.apiName,
          name: dbChamp.name,
          icon: dbChamp.tileIcon ? getLocalTftImage(dbChamp.tileIcon, 'champions/tileIcon', versionNumber) : null
        };
        toggleSelectedSalidasEarlyChampion(champObj);
      }
    } else if (type === 'sinergia') {
      if (!selectedSalidasEarlySinergias.includes(apiName)) {
        toggleArrayFilter(setSelectedSalidasEarlySinergias, apiName);
      }
    } else if (type === 'augment' || type === 'aumento' || type === 'aumentoresaleatorio' || type === 'aumentoespecifico') {
      const augObj = allAugments.find(a => a.apiName === apiName);
      if (augObj && !selectedHardAugments.some(a => a.apiName === apiName)) {
        toggleArrayFilter(setSelectedHardAugments, augObj);
      }
    }
  };

  const filteredComposBase = useMemo(() => {
    return allCompos.filter(compo => {
      if (selectedCategory.length > 0 && !selectedCategory.includes(compo.categoria)) return false;
      if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(compo.dificultad)) return false;
      if (selectedTier.length > 0 && !selectedTier.includes(compo.tier)) return false;
      if (selectedDamageType.length > 0 && !selectedDamageType.includes(compo.tipoDeDano)) return false;
      return true;
    });
  }, [allCompos, selectedCategory, selectedDifficulty, selectedTier, selectedDamageType]);

  const filteredComposPrimary = useMemo(() => {
    return filteredComposBase.filter(compo => {
      if (selectedExtras.length > 0) {
        const hasExtra = (compo.condiciones || []).some(c => selectedExtras.includes(c.apiNameGrande) || selectedExtras.includes(c.ApiNamePequeno));
        if (!hasExtra) return false;
      }
      return true;
    });
  }, [filteredComposBase, selectedExtras]);

  const allConditions = useMemo(() => filteredComposPrimary.flatMap((comp) => comp.condiciones || []), [filteredComposPrimary]);

  const opEarlyAugmentsMap = useMemo(() => {
    const map = new Map();
    
    filteredComposPrimary.forEach(compo => {
      const seenInThisComp = new Set();
      
      const addAugment = (apiNameGrande, apiNamePequeno, isOp, isOpm) => {
        if (apiNameGrande && !seenInThisComp.has(apiNameGrande)) {
          seenInThisComp.add(apiNameGrande);
          if (!map.has(apiNameGrande)) {
            const augObj = allAugments.find(a => a.apiName === apiNameGrande);
            if (augObj) {
              map.set(apiNameGrande, { ...augObj, championApiName: apiNamePequeno, appearCount: 1, isOp: isOp || false, isOpm: isOpm || false });
            }
          } else {
            const existing = map.get(apiNameGrande);
            existing.appearCount += 1;
            if (isOp) existing.isOp = true;
            if (isOpm) existing.isOpm = true;
          }
        }
        
        if (apiNamePequeno && !seenInThisComp.has(apiNamePequeno)) {
          seenInThisComp.add(apiNamePequeno);
          if (!map.has(apiNamePequeno)) {
            const augObj = allAugments.find(a => a.apiName === apiNamePequeno);
            if (augObj) {
              map.set(apiNamePequeno, { ...augObj, championApiName: apiNamePequeno, appearCount: 1, isOp: isOp || false, isOpm: isOpm || false });
            }
          } else {
            const existing = map.get(apiNamePequeno);
            existing.appearCount += 1;
            if (isOp) existing.isOp = true;
            if (isOpm) existing.isOpm = true;
          }
        }
      };

      if(compo.aumentos && Array.isArray(compo.aumentos)) {
        compo.aumentos.forEach(aumento => {
          const isEarly = typeof aumento === 'object' && (aumento.early === true || aumento.early === 'true' || aumento.early === 1);
          if (isEarly) {
            const apiNameGrande = typeof aumento === 'object' ? (aumento.apiNameGrande || aumento.apiName) : aumento;
            const apiNamePequeno = typeof aumento === 'object' ? aumento.apiNamePequeno : null;
            const op = typeof aumento === 'object' ? aumento.op : null;
            const isOpm = op === 'opm';
            const isOp = op === 'op' || op === true || op === 'true' || isOpm;
            addAugment(apiNameGrande, apiNamePequeno, isOp, isOpm);
          }
        });
      }

      if (compo.condiciones && Array.isArray(compo.condiciones)) {
        compo.condiciones.forEach(cond => {
          if (cond) {
            const isEarly = cond.early === true || cond.early === 'true' || cond.early === 1;
            if (isEarly) {
              const isOpm = cond.op === 'opm';
              const isOp = cond.op === 'op' || cond.op === true || cond.op === 'true' || isOpm;
              addAugment(cond.apiNameGrande, cond.ApiNamePequeno || cond.apiNamePequeno, isOp, isOpm);
            }
          }
        });
      }
    });
    const result = Array.from(map.values());
    console.log("Aumentos extraídos para el filtro (SIN LIMITE):", result.map(a => a.apiName));
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
  
  const condicionesGrandeItemsGrouped = useMemo(() => {
    const groups = {
      artefactos: [],
      radiantes: [],
      emblemas: [],
      crafteables: [],
      especificos: []
    };

    condicionesGrandeItems.forEach(condItem => {
      const apiName = condItem.apiName;
      const dbItem = allItems.find(i => i.apiName === apiName);
      
      const isEmblem = apiName.includes("Emblem") || dbItem?.name?.toLowerCase().includes("emblem") || dbItem?.name?.toLowerCase().includes("emblema");
      const isArtifact = apiName.includes("Artifact_") || apiName.includes("Ornn");
      const isRadiant = apiName.includes("Radiant");
      const isCraftable = dbItem?.composition && Array.isArray(dbItem.composition) && dbItem.composition.length > 0 && !isEmblem;

      if (isArtifact) groups.artefactos.push(condItem);
      else if (isRadiant) groups.radiantes.push(condItem);
      else if (isEmblem) groups.emblemas.push(condItem);
      else if (isCraftable) groups.crafteables.push(condItem);
      else groups.especificos.push(condItem);
    });

    return groups;
  }, [condicionesGrandeItems, allItems]);

  const condicionesGrandeExtras = useMemo(() => {
    const uniqueMap = new Map();
    filteredComposBase.forEach(comp => {
      (comp.condiciones || []).forEach(cond => {
        if (!cond) return;
        const tGrande = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();
        if (tGrande === 'extra' && cond.apiNameGrande && !uniqueMap.has(cond.apiNameGrande)) {
          uniqueMap.set(cond.apiNameGrande, {
            apiName: cond.apiNameGrande,
            apiNamePequeno: cond.ApiNamePequeno || cond.apiNamePequeno,
            name: getConditionDisplayName(cond.apiNameGrande, 'extra'),
            icon: getConditionIconUrl(cond.apiNameGrande, 'extra'),
            type: 'extra'
          });
        }
      });
    });
    const result = Array.from(uniqueMap.values());
    return result;
  }, [filteredComposBase, getConditionDisplayName, getConditionIconUrl]);
  const condicionesGrandeSinergias = useMemo(() => getUniqueConditionsGrandeByType("sinergia"), [getUniqueConditionsGrandeByType]);
  
  const availableGruposSalidasEarly = useMemo(() => {
    const ids = new Set();
    filteredComposPrimary.forEach(compo => {
      if (compo.salidasEarly && Array.isArray(compo.salidasEarly)) {
        compo.salidasEarly.forEach(id => ids.add(String(id)));
      }
    });
    return gruposSalidasEarly.filter(g => ids.has(String(g.id)));
  }, [filteredComposPrimary, gruposSalidasEarly]);
  const condicionesGrandeAumentoResAleatorio = useMemo(() => getUniqueConditionsGrandeByType("aumentoresaleatorio"), [getUniqueConditionsGrandeByType]);
  const condicionesGrandeAumentoEspecifico = useMemo(() => getUniqueConditionsGrandeByType("aumentoespecifico"), [getUniqueConditionsGrandeByType]);

  const filteredCompos = useMemo(() => {
    const hasAnyConditionSelected = 
      selectedItems.length > 0 ||
      selectedChampions.length > 0 ||
      selectedExtras.length > 0 ||
      selectedSinergias.length > 0 ||
      selectedAumentoResAleatorio.length > 0 ||
      selectedAumentoEspecifico.length > 0 ||
      selectedHardAugments.length > 0 ||
      selectedSalidasEarly.length > 0 ||
      selectedSalidasEarlyChampions.length > 0 ||
      selectedSalidasEarlySinergias.length > 0 ||
      selectedSalidasEarlyItems.length > 0 ||
      selectedSalidasEarlyComponents.length > 0;

    if (!hasAnyConditionSelected) {
      return filteredComposPrimary.map(compo => ({ ...compo, _matchCount: 0, _matchedFilters: [] }));
    }

    const results = [];

    filteredComposPrimary.forEach(compo => {
      let matchCount = 0;
      let matchedFilters = [];

      if (selectedItems.length > 0) {
        selectedItems.forEach(item => {
          const matchItem = 
            compo.itemsPrio?.some(i => (typeof i === 'object' && i !== null ? i.apiName : i) === item.apiName) || 
            compo.campeonMeta?.apiNameItemsDelCampeon?.includes(item.apiName) ||
            compo.posicionamiento?.[0]?.tablero?.some(champ => champ.apiNameItemsDelCampeon?.includes(item.apiName)) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === item.apiName || c.ApiNamePequeno === item.apiName);
          if (matchItem) {
            matchCount++;
            matchedFilters.push({ type: 'item', apiName: item.apiName, icon: item.icon, name: item.name });
          }
        });
      }

      if (selectedChampions.length > 0) {
        const boardChampions = compo.posicionamiento?.[0]?.tablero?.map(c => c.apiNameCampeon) || [];
        selectedChampions.forEach(champ => {
          const matchChamp = 
            boardChampions.includes(champ.apiName) || 
            compo.campeonMeta?.apiNameCampeon === champ.apiName ||
            compo.campeonesEarly?.some(early => (typeof early === 'object' && early !== null ? early.apiNameCampeon : early) === champ.apiName) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === champ.apiName || c.ApiNamePequeno === champ.apiName);
          if (matchChamp) {
            matchCount++;
            matchedFilters.push({ type: 'campeon', apiName: champ.apiName, icon: champ.icon || (champ.tileIcon ? getLocalTftImage(champ.tileIcon, 'champions/tileIcon') : null), name: champ.name });
          }
        });
      }

      if (selectedExtras.length > 0) {
        selectedExtras.forEach(apiName => {
          const matchExtra = (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName);
          if (matchExtra) {
            matchCount++;
            const extrasMap = { "Win Streak": "/tft/assets/WinStreak.webp", "Loss Streak": "/tft/assets/LossStreak.webp", "orbedecampeon": "/tft/assets/Orbe.webp", "3 estrellas": "/tft/assets/3estrellas.webp", "4 estrellas": "/tft/assets/4estrellas.webp" };
            matchedFilters.push({ type: 'extra', apiName: apiName, icon: extrasMap[apiName] || null, name: apiName });
          }
        });
      }

      if (selectedSinergias.length > 0) {
        const compoTraits = (compo.sinergias || []).map(s => s.apiName || s.apiNameSinergia).filter(Boolean);
        selectedSinergias.forEach(apiName => {
          const matchSinergia = compoTraits.includes(apiName) || (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName);
          if (matchSinergia) {
            matchCount++;
            const traitObj = condicionesGrandeSinergias.find(t => t.apiName === apiName);
            matchedFilters.push({ type: 'sinergia', apiName: apiName, icon: traitObj?.icon || null, name: traitObj?.name || apiName });
          }
        });
      }

      if (selectedAumentoResAleatorio.length > 0) {
        const compoAugments = (compo.aumentos || []).map(a => typeof a === 'object' ? a.apiName : a).filter(Boolean);
        selectedAumentoResAleatorio.forEach(apiName => {
          const matchAugAleatorio = compoAugments.includes(apiName) || (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName);
          if (matchAugAleatorio) {
            matchCount++;
            const augObj = condicionesGrandeAumentoResAleatorio.find(a => a.apiName === apiName);
            matchedFilters.push({ type: 'aumentoresaleatorio', apiName: apiName, icon: augObj?.icon || null, name: augObj?.name || apiName });
          }
        });
      }

      if (selectedAumentoEspecifico.length > 0) {
        const compoAugments = (compo.aumentos || []).map(a => typeof a === 'object' ? a.apiName : a).filter(Boolean);
        selectedAumentoEspecifico.forEach(apiName => {
          const matchAugEspecifico = compoAugments.includes(apiName) || (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName);
          if (matchAugEspecifico) {
            matchCount++;
            const augObj = condicionesGrandeAumentoEspecifico.find(a => a.apiName === apiName);
            matchedFilters.push({ type: 'aumentoespecifico', apiName: apiName, icon: augObj?.icon || null, name: augObj?.name || apiName });
          }
        });
      }

      if (selectedHardAugments.length > 0) {
        const compoAugments = (compo.aumentos || []).flatMap(a => [a.apiNameGrande, a.apiNamePequeno]).filter(Boolean);
        selectedHardAugments.forEach(aug => {
          const matchAug = compoAugments.includes(aug.apiName) || (compo.condiciones || []).some(c => c.apiNameGrande === aug.apiName || c.ApiNamePequeno === aug.apiName);
          if (matchAug) {
            matchCount++;
            matchedFilters.push({ type: 'hardaugment', apiName: aug.apiName, icon: (aug.icon && aug.icon.includes('.tex')) ? getLocalTftImage(aug.icon, 'augments/choiceui') : aug.icon, name: aug.name });
          }
        });
      }

      if (selectedSalidasEarly.length > 0) {
        const compoSalidas = compo.salidasEarly || [];
        selectedSalidasEarly.forEach(grupoId => {
          const matchSalida = compoSalidas.some(s => String(s) === String(grupoId));
          if (matchSalida) {
            matchCount++;
            const grupoObj = gruposSalidasEarly.find(g => String(g.id) === String(grupoId));
            matchedFilters.push({ 
               type: 'salida', 
               apiName: grupoId, 
               name: grupoObj ? grupoObj.nombre : `Salida Early ${grupoId}`, 
               icon: null,
               campeones: grupoObj && grupoObj.campeones ? grupoObj.campeones : [] 
            });
          }
        });
      }

      if (selectedSalidasEarlyChampions.length > 0) {
        const boardChampions = compo.posicionamiento?.[0]?.tablero?.map(c => c.apiNameCampeon) || [];
        selectedSalidasEarlyChampions.forEach(champ => {
          const matchChamp = 
            boardChampions.includes(champ.apiName) || 
            compo.campeonMeta?.apiNameCampeon === champ.apiName ||
            compo.campeonesEarly?.some(early => (typeof early === 'object' && early !== null ? early.apiNameCampeon : early) === champ.apiName) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === champ.apiName || c.ApiNamePequeno === champ.apiName);
          if (matchChamp) {
            matchCount++;
            matchedFilters.push({ type: 'campeon', apiName: champ.apiName, icon: champ.icon || (champ.tileIcon ? getLocalTftImage(champ.tileIcon, 'champions/tileIcon') : null), name: champ.name });
          }
        });
      }

      if (selectedSalidasEarlySinergias.length > 0) {
        const compoTraits = (compo.sinergias || []).map(s => s.apiName || s.apiNameSinergia).filter(Boolean);
        selectedSalidasEarlySinergias.forEach(apiName => {
          const matchSinergia = compoTraits.includes(apiName) || (compo.condiciones || []).some(c => c.apiNameGrande === apiName || c.ApiNamePequeno === apiName);
          if (matchSinergia) {
            matchCount++;
            const traitObj = allTraits.find(t => t.apiName === apiName) || condicionesGrandeSinergias.find(t => t.apiName === apiName);
            matchedFilters.push({ type: 'sinergia', apiName: apiName, icon: traitObj?.icon ? (traitObj.icon.includes("http") ? traitObj.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(traitObj.icon, 'traits', versionNumber)) : null, name: traitObj?.name || apiName });
          }
        });
      }

      if (selectedSalidasEarlyItems.length > 0) {
        selectedSalidasEarlyItems.forEach(item => {
          const matchItem = 
            compo.itemsPrio?.some(i => (typeof i === 'object' && i !== null ? i.apiName : i) === item.apiName) || 
            compo.campeonMeta?.apiNameItemsDelCampeon?.includes(item.apiName) ||
            compo.posicionamiento?.[0]?.tablero?.some(champ => champ.apiNameItemsDelCampeon?.includes(item.apiName)) ||
            (compo.condiciones || []).some(c => c.apiNameGrande === item.apiName || c.ApiNamePequeno === item.apiName);
          if (matchItem) {
            matchCount++;
            matchedFilters.push({ type: 'item', apiName: item.apiName, icon: item.icon, name: item.name });
          }
        });
      }

      if (selectedSalidasEarlyComponents.length > 0) {
        selectedSalidasEarlyComponents.forEach(compId => {
           let matched = false;
           const checkItem = (apiName) => {
              const dbItem = allItems.find(i => i.apiName === apiName);
              if (dbItem?.composition && dbItem.composition.length > 0) {
                if (dbItem.composition.includes(compId)) matched = true;
              } else {
                const normalizedApi = apiName.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
                if (compId.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedApi) matched = true;
              }
           };
           
           (compo.itemsPrio || []).forEach(prioItem => {
              const apiName = typeof prioItem === 'object' ? prioItem.apiName : prioItem;
              checkItem(apiName);
           });
           (compo.campeonMeta?.apiNameItemsDelCampeon || []).forEach(apiName => checkItem(apiName));
           (compo.posicionamiento?.[0]?.tablero || []).forEach(champ => {
              (champ.apiNameItemsDelCampeon || []).forEach(apiName => checkItem(apiName));
           });
           (compo.condiciones || []).forEach(cond => {
              const condType = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();
              if (condType === 'item' && cond.apiNameGrande) checkItem(cond.apiNameGrande);
           });

           if (matched) {
             matchCount++;
             const compData = softItemsList.find(i => i.apiName === compId) || allItems.find(i => i.apiName === compId);
             matchedFilters.push({ type: 'item', apiName: compId, icon: compData?.icon, name: compData?.name });
           }
        });
      }

        matchedFilters = matchedFilters.map(mf => {
          let opStatus = null;
          const matchCond = (compo.condiciones || []).find(c => c.apiNameGrande === mf.apiName || c.ApiNamePequeno === mf.apiName);
          if (matchCond) {
            if (matchCond.op === 'opm') opStatus = 'opm';
            else if (matchCond.op) opStatus = 'op';
          }
          if (opStatus !== 'opm') {
             const matchPrio = compo.itemsPrio?.find(i => typeof i === 'object' && i.apiName === mf.apiName);
             if (matchPrio) {
               if (matchPrio.op === 'opm') opStatus = 'opm';
               else if (matchPrio.op) opStatus = 'op';
             }
          }
          if (opStatus !== 'opm') {
             const matchAug = compo.aumentos?.find(a => typeof a === 'object' && (a.apiName === mf.apiName || a.apiNameGrande === mf.apiName || a.apiNamePequeno === mf.apiName));
             if (matchAug) {
               if (matchAug.op === 'opm') opStatus = 'opm';
               else if (matchAug.op) opStatus = 'op';
             }
          }
          return { ...mf, opStatus };
        });

        matchedFilters.sort((a, b) => {
          const getVal = (s) => s === 'opm' ? 2 : s === 'op' ? 1 : 0;
          return getVal(b.opStatus) - getVal(a.opStatus);
        });

        let missingOPM = null;
        if (compo.itemsPrio) {
          const opmItem = compo.itemsPrio.find(i => typeof i === 'object' && i.op === 'opm');
          if (opmItem && 
              !selectedItems.some(i => (typeof i === 'object' ? i.apiName : i) === opmItem.apiName) && 
              !selectedSalidasEarlyItems.some(i => (typeof i === 'object' ? i.apiName : i) === opmItem.apiName)) {
            const itemObj = allItems.find(i => i.apiName === opmItem.apiName);
            missingOPM = { type: 'item', apiName: opmItem.apiName, name: itemObj?.name || opmItem.apiName, icon: itemObj ? getLocalTftImage(itemObj.icon, 'items') : null };
          }
        }
        if (!missingOPM && compo.aumentos) {
          const opmAugment = compo.aumentos.find(a => typeof a === 'object' && a.op === 'opm');
          if (opmAugment) {
            const apiName = opmAugment.apiNameGrande || opmAugment.apiNamePequeno || opmAugment.apiName;
            if (!selectedHardAugments.some(a => a.apiName === apiName)) {
              const augObj = allAugments.find(a => a.apiName === apiName);
              missingOPM = { type: 'augment', apiName, name: augObj?.name || apiName, icon: augObj?.icon ? (augObj.icon.includes("http") ? augObj.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(augObj.icon, 'augments', versionNumber)) : null };
            }
          }
        }
        if (!missingOPM && compo.condiciones) {
          const opmCond = compo.condiciones.find(c => c.op === 'opm');
          if (opmCond) {
            const apiName = opmCond.apiNameGrande || opmCond.ApiNamePequeno || opmCond.apiNamePequeno;
            const cType = (opmCond.condTypeGrande || '').toLowerCase();
            let isSelected = false;
            let icon = null;
            let name = apiName;
            
            if (cType === 'campeon') {
              isSelected = selectedChampions.some(c => (typeof c === 'object' ? c.apiName : c) === apiName) ||
                           selectedSalidasEarlyChampions.some(c => (typeof c === 'object' ? c.apiName : c) === apiName);
              const champObj = allChampions.find(c => c.apiName === apiName);
              if (champObj) { name = champObj.name; icon = champObj.tileIcon ? getLocalTftImage(champObj.tileIcon, 'champions/tileIcon', versionNumber) : null; }
            } else if (cType === 'item') {
              isSelected = selectedItems.some(i => (typeof i === 'object' ? i.apiName : i) === apiName) ||
                           selectedSalidasEarlyItems.some(i => (typeof i === 'object' ? i.apiName : i) === apiName);
              const itemObj = allItems.find(i => i.apiName === apiName);
              if (itemObj) { name = itemObj.name; icon = getLocalTftImage(itemObj.icon, 'items'); }
            } else if (cType === 'sinergia') {
              isSelected = selectedSinergias.includes(apiName) ||
                           selectedSalidasEarlySinergias.includes(apiName);
              const tr = allTraits.find(t => t.apiName === apiName);
              if (tr) { name = getTraitDisplayName(tr); icon = tr.icon ? (tr.icon.includes("http") ? tr.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(tr.icon, 'traits', versionNumber)) : null; }
            } else if (cType === 'aumento' || cType === 'aumentoespecifico' || cType === 'aumentoresaleatorio') {
              isSelected = selectedHardAugments.some(a => a.apiName === apiName);
              const augObj = allAugments.find(a => a.apiName === apiName);
              if (augObj) { name = augObj.name; icon = augObj.icon ? (augObj.icon.includes("http") ? augObj.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(augObj.icon, 'augments', versionNumber)) : null; }
            }
            if (!isSelected) missingOPM = { type: cType, apiName, name, icon };
          }
        }

        results.push({ ...compo, _matchCount: matchCount, _matchedFilters: matchedFilters, _missingOPM: missingOPM });
    });

    results.sort((a, b) => b._matchCount - a._matchCount);
    return results;
  }, [
    filteredComposPrimary, selectedItems, selectedChampions, selectedExtras, selectedSinergias, 
    selectedAumentoResAleatorio, selectedAumentoEspecifico, selectedHardAugments, selectedSalidasEarly,
    selectedSalidasEarlyChampions, selectedSalidasEarlySinergias, selectedSalidasEarlyItems, selectedSalidasEarlyComponents, softItemsList,
    condicionesGrandeSinergias, condicionesGrandeAumentoResAleatorio, condicionesGrandeAumentoEspecifico,
    allItems, allChampions, allAugments, allTraits, versionNumber
  ]);

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
                className={`${style.filterOptionBox} ${selectedTier.includes(t) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
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
                className={`${style.filterOptionBox} ${selectedCategory.includes(cat) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
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
                className={`${style.filterOptionBox} ${selectedDifficulty.includes(d) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
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
                className={`${style.filterOptionBox} ${selectedDamageType.includes(d) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
                onClick={() => toggleArrayFilter(setSelectedDamageType, d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Extra</label>
          <div className={style.filterButtonsContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {condicionesGrandeExtras.filter(extra => extra.apiName !== 'orbedecampeon').length > 0 ? (
              condicionesGrandeExtras.filter(extra => extra.apiName !== 'orbedecampeon').map(extra => (
                <button
                  key={extra.apiName}
                  type="button"
                  className={`${style.filterOptionBox} ${selectedExtras.includes(extra.apiName) ? style.filterOptionBoxActive : ''}`}
                  onClick={() => toggleArrayFilter(setSelectedExtras, extra.apiName)}
                  style={{ display: 'flex',alignItems: 'center', justifyContent: 'center', padding: '8px 10px', minWidth: '70px', gap: '6px' }}
                >
                  {extra.icon && <img src={extra.icon} alt={extra.name} style={{ minWidth: '60px', minHeight: '60px', width: '60px', height: '60px', objectFit: 'contain', borderRadius: '3px' }} />}
                  <span style={{ fontSize: '0.78rem', textAlign: 'center', lineHeight: '1.1' }}>{extra.name}</span>
                </button>
              ))
            ) : (
              <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay extras disponibles</span>
            )}
          </div>
        </div>

        <div className={style.filterInputGroup}>
          <label>Filtros Rápidos</label>
          <div className={style.filterButtonsContainer} >
            <button
              type="button"
              className={`${style.filterOptionBox} ${((selectedTier.includes("S") && selectedTier.includes("A") && selectedDifficulty.includes("Facil"))) ? '' : style.grayWhenInactive}`}
              onClick={() => {
                resetAllFilters();
                setSelectedTier(["S", "A"]);
                setSelectedDifficulty(["Facil"]);
              }}
              style={{ 
                padding: '8px 12px', 
                background: '#d8b4fe20', 
                borderColor: '#d8b4fe', 
                color: 'white', 
                fontWeight: 'bold', 
                justifyContent: 'center'
              }}
            >
              Filtro Principiante
            </button>
            <button
              type="button"
              className={`${style.filterOptionBox} ${((selectedTier.length > 0 || selectedCategory.length > 0 || selectedDifficulty.length > 0 || selectedDamageType.length > 0)) ? '' : style.grayWhenInactive}`}
              onClick={resetAllFilters}
              style={{ 
                padding: '8px 12px', 
                background: '#ff4d4d20', 
                borderColor: '#ff4d4d', 
                color: '#ffaaaa', 
                justifyContent: 'center'
              }}
            >
              Resetear Filtros
            </button>
          </div>
        </div>

        

      </div>
    </fieldset>
    )
  }

  const FiltroHard2 = ()=>{
    const SalidasEarly=()=>{
      const groupedGrupos = {
        'Win Streak': [],
        'N/A': [],
        'Lose Streak': [],
      };

      availableGruposSalidasEarly.forEach(grupo => {
        const tipoStr = grupo.tipo && grupo.tipo !== '' ? grupo.tipo : 'N/A';
        if (groupedGrupos[tipoStr]) {
          groupedGrupos[tipoStr].push(grupo);
        } else {
          groupedGrupos['N/A'].push(grupo);
        }
      });

      const getGrupoScore = (grupo) => {
        let score = 0;
        const composUsingThisGroup = filteredComposPrimary.filter(c => c.salidasEarly?.map(String).includes(String(grupo.id)));
        
        if (selectedSalidasEarlyChampions.length > 0) {
          let matchedChamps = 0;
          selectedSalidasEarlyChampions.forEach(champ => {
            const isMatch = composUsingThisGroup.some(compo => 
              (compo.condiciones || []).some(c => c.apiNameGrande === champ.apiName || c.ApiNamePequeno === champ.apiName)
            );
            if (isMatch) matchedChamps++;
          });
          score += matchedChamps;
        }

        if (selectedSalidasEarlySinergias.length > 0) {
          let matchedTraits = 0;
          selectedSalidasEarlySinergias.forEach(traitApiName => {
            const isMatch = composUsingThisGroup.some(compo => 
              (compo.condiciones || []).some(c => 
                (c.condTypeGrande?.toLowerCase() === 'sinergia' || c.typeGrande?.toLowerCase() === 'sinergia' || c.condType?.toLowerCase() === 'sinergia') &&
                (c.apiNameGrande === traitApiName || c.ApiNamePequeno === traitApiName)
              ) || (compo.traits || []).some(t => t.name === traitApiName)
            );
            if (isMatch) matchedTraits++;
          });
          score += matchedTraits;
        }

        if (selectedSalidasEarlyComponents.length > 0 || selectedSalidasEarlyItems.length > 0) {
          const uniqueCraftedItems = new Set();
          composUsingThisGroup.forEach(c => {
            const checkItem = (apiName) => {
              if (selectedSalidasEarlyComponents.length > 0) {
                const dbItem = allItems.find(i => i.apiName === apiName);
                if (dbItem?.composition && dbItem.composition.length > 0) {
                  if (dbItem.composition.every(comp => selectedSalidasEarlyComponents.includes(comp))) {
                    uniqueCraftedItems.add(apiName);
                  }
                } else {
                  const normalizedApi = apiName.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
                  if (selectedSalidasEarlyComponents.some(comp => comp.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedApi)) {
                    uniqueCraftedItems.add(apiName);
                  }
                }
              }
              if (selectedSalidasEarlyItems.length > 0) {
                if (selectedSalidasEarlyItems.some(i => i.apiName === apiName)) {
                  uniqueCraftedItems.add(apiName);
                }
              }
            };
            (c.itemsPrio || []).forEach(prioItem => {
              const apiName = typeof prioItem === 'object' ? prioItem.apiName : prioItem;
              checkItem(apiName);
            });
            (c.condiciones || []).forEach(cond => {
              const condType = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();
              if (condType === 'item' && cond.apiNameGrande) {
                checkItem(cond.apiNameGrande);
              }
            });
          });
          score += uniqueCraftedItems.size;
        }
        
        return score;
      };

      Object.keys(groupedGrupos).forEach(key => {
        groupedGrupos[key].sort((a, b) => {
          const scoreA = getGrupoScore(a);
          const scoreB = getGrupoScore(b);
          if (scoreA !== scoreB) {
            return scoreB - scoreA;
          }
          const aLen = a.campeones ? a.campeones.length : 0;
          const bLen = b.campeones ? b.campeones.length : 0;
          if (aLen === 0 && bLen > 0) return -1;
          if (bLen === 0 && aLen > 0) return 1;
          return 0;
        });
      });

      const champsList = [];
      condicionesGrandeCampeones.forEach(champ => {
        const dbChamp = allChampions.find(c => c.apiName === champ.apiName);
        const c = dbChamp?.cost || dbChamp?.coste || 1;
        champsList.push({ ...champ, cost: c });
      });
      champsList.sort((a, b) => {
        if (a.cost !== b.cost) return a.cost - b.cost;
        return a.name.localeCompare(b.name);
      });

      const groupedChamps = {};
      champsList.forEach(champ => {
        const c = champ.cost || 1;
        if (!groupedChamps[c]) groupedChamps[c] = [];
        groupedChamps[c].push(champ);
      });

      return(
        <div className={style.filterInputGroup}>
          <legend>Salidas Early</legend>
          
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginTop: '8px', marginBottom: '5px' }}>
            {champsList.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px', alignItems: 'stretch' }}>
                {Object.keys(groupedChamps).sort((a,b) => Number(a) - Number(b)).map((cost, idx) => {
                  let title = `Coste ${cost}`;
                  if (String(cost) === '2') title = 'coste 2';
                  if (String(cost) === '3') title = 'orbe';
                  if (String(cost) === '4') title = 'orbe dorado';

                  return (
                      <div key={cost} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <legend style={{ fontSize: '0.75rem' }}>Sinergias</legend>
                          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }}></div>
                        <div className={style.filterButtonsContainerRow}>
                          {groupedChamps[cost].map(champ => (
                            <button
                              key={champ.apiName}
                              type="button"
                              className={`${style.filterOptionBox} ${selectedSalidasEarlyChampions.some(c => c.apiName === champ.apiName) ? style.filterOptionBoxActive : ''}`}
                              onClick={() => toggleSelectedSalidasEarlyChampion(champ)}
                              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', minWidth: '70px', gap: '6px' }}
                            >
                              {champ.icon && <img src={champ.icon} alt={champ.name} style={{ minWidth: '60px', minHeight: '60px', width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', border: `3px solid var(--color-hex-cost-${champ.cost})`, boxSizing: 'border-box' }} />}
                              <span style={{ fontSize: '0.78rem', textAlign: 'center', lineHeight: '1.1' }}>{champ.name}</span>
                            </button>
                          ))}
                        </div>
                        </fieldset>
                      </div>
                  );
                })}
              </div>
            )}
            {condicionesGrandeSinergias && condicionesGrandeSinergias.length > 0 && (
              <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <legend style={{ fontSize: '0.75rem' }}>Sinergias</legend>
                <div className={style.filterButtonsContainerRow}>
                  {condicionesGrandeSinergias.map(sinergia => (
                    <button
                      key={sinergia.apiName}
                      type="button"
                      title={sinergia.name}
                      className={`${style.filterOptionBox} ${selectedSalidasEarlySinergias.includes(sinergia.apiName) ? style.filterOptionBoxActive : ''}`}
                      onClick={() => toggleArrayFilter(setSelectedSalidasEarlySinergias, sinergia.apiName)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', minWidth: '70px', gap: '6px' }}
                    >
                      {sinergia.icon && <img src={sinergia.icon} alt={sinergia.name} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '3px' }} />}
                      <span style={{ fontSize: '0.78rem', textAlign: 'center', lineHeight: '1.1' }}>{sinergia.name}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginBottom: '8px' }}>
              {/* Minifiltro de Componentes en Salidas Early */}

                <fieldset  style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <legend style={{ fontSize: '0.75rem' }}>{'Componentes Crafteables'}</legend>
                <div className={style.filterButtonsContainerRow} >
                  {softItemsList.map(item => {
                    const isSelected = selectedSalidasEarlyComponents.includes(item.apiName);
                    return (
                      <button
                        key={item.apiName}
                        type="button"
                        title={item.name}
                        className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
                        onClick={() => toggleArrayFilter(setSelectedSalidasEarlyComponents, item.apiName)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          opacity: 1,
                          cursor: 'pointer'
                        }}
                      >
                        {item.icon && <img src={item.icon} alt={item.name} style={{width: '45px', height: '45px', objectFit: 'contain', borderRadius: '4px' }} />}
                      </button>
                    );
                  })}
                </div>
                </fieldset>


              {/* Minifiltro de Objetos Específicos y Sinergias en Salidas Early */}
              {(condicionesGrandeItems.length > 0 || (condicionesGrandeSinergias && condicionesGrandeSinergias.length > 0)) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px' }}>
                    {Object.entries({
                      'Emblemas': condicionesGrandeItemsGrouped.emblemas,
                      'Artefactos': condicionesGrandeItemsGrouped.artefactos,
                      'Radiantes': condicionesGrandeItemsGrouped.radiantes,
                      'Específicos / Soporte': condicionesGrandeItemsGrouped.especificos
                    }).map(([groupName, items]) => {
                      if (!items || items.length === 0) return null;
                      return (
                        <fieldset key={groupName} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <legend style={{ fontSize: '0.75rem' }}>{groupName}</legend>
                          <div className={style.filterButtonsContainerRow}>
                            {items.map(item => {
                              const isSelected = selectedSalidasEarlyItems.some(i => i.apiName === item.apiName);
                              const fullItem = allItems.find(i => i.apiName === item.apiName) || item;
                              const hasComposition = fullItem.composition && fullItem.composition.length > 0;
                              const matchedCount = hasComposition ? fullItem.composition.filter(c => selectedSalidasEarlyComponents.includes(c) || selectedSalidasEarlyComponents.some(sc => sc.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === c.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', ''))).length : 0;
                              return (
                                <button
                                  key={item.apiName}
                                  type="button"
                                  title={item.name}
                                  className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
                                  onClick={() => toggleArrayFilter(setSelectedSalidasEarlyItems, item)}
                                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px', gap: '4px' }}
                                >
                                  {item.icon && (
                                    <div className={matchedCount === 2 && !isSelected ? style.spinningHighlight : style.spinningHighlightIdle} style={{ borderRadius: '4px' }}>
                                      <img src={item.icon} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'contain', borderRadius: '3px' }} />
                                    </div>
                                  )}
                                  {hasComposition && (
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                      {fullItem.composition.map((compId, idx) => {
                                        const compData = softItemsList.find(i => i.apiName === compId) || allItems.find(i => i.apiName === compId);
                                        const normalizedCompId = compId.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
                                        const isCompSelected = selectedSalidasEarlyComponents.includes(compId) || 
                                          selectedSalidasEarlyComponents.some(c => c.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedCompId);
                                        
                                        return compData && compData.icon ? (
                                          <div key={`${compId}-${idx}`} className={isCompSelected && matchedCount < 2 ? style.spinningHighlight : style.spinningHighlightIdle} style={{ borderRadius: '3px' }}>
                                            <img 
                                              src={compData.icon} 
                                              alt={compData.name} 
                                              title={compData.name}
                                              style={{ width: '16px', height: '16px', objectFit: 'contain', borderRadius: '2px', display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} 
                                            />
                                          </div>
                                        ) : null;
                                      })}
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {availableGruposSalidasEarly.length > 0 ? (
              Object.entries(groupedGrupos).map(([groupName, grupos]) => {
                if (grupos.length === 0) return null;
                return (
                  <fieldset key={groupName} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <legend>{groupName  === "N/A" ? `Tempo` : groupName}</legend>
                    <div className={style.filterButtonsContainerRow} >
                      {grupos.map(grupo => {
                        const isSelected = selectedSalidasEarly.includes(grupo.id);
                        const composUsingThisGroup = filteredComposPrimary.filter(c => c.salidasEarly?.map(String).includes(String(grupo.id)));

                        let matchesChampion = false;
                        const matchedChampionsForGroup = [];
                        if (selectedSalidasEarlyChampions.length > 0) {
                          selectedSalidasEarlyChampions.forEach(champ => {
                            const isMatch = composUsingThisGroup.some(compo => 
                              (compo.condiciones || []).some(c => c.apiNameGrande === champ.apiName || c.ApiNamePequeno === champ.apiName)
                            );
                            if (isMatch) {
                              matchesChampion = true;
                              matchedChampionsForGroup.push(champ);
                            }
                          });
                        }

                        const uniqueCraftedItems = new Set();
                        if (selectedSalidasEarlyComponents.length > 0 || selectedSalidasEarlyItems.length > 0) {
                          composUsingThisGroup.forEach(c => {
                            const checkItem = (apiName) => {
                              let addedByComponent = false;
                              if (selectedSalidasEarlyComponents.length > 0) {
                                const dbItem = allItems.find(i => i.apiName === apiName);
                                if (dbItem?.composition && dbItem.composition.length > 0) {
                                  if (dbItem.composition.every(comp => selectedSalidasEarlyComponents.includes(comp))) {
                                    addedByComponent = true;
                                  }
                                } else {
                                  const normalizedApi = apiName.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
                                  if (selectedSalidasEarlyComponents.some(comp => comp.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedApi)) {
                                    addedByComponent = true;
                                  }
                                }
                              }

                              let addedBySpecificItem = false;
                              if (selectedSalidasEarlyItems.length > 0) {
                                if (selectedSalidasEarlyItems.some(i => i.apiName === apiName)) {
                                  addedBySpecificItem = true;
                                }
                              }

                              if (addedByComponent || addedBySpecificItem) {
                                uniqueCraftedItems.add(apiName);
                              }
                            };

                            (c.itemsPrio || []).forEach(prioItem => {
                              const apiName = typeof prioItem === 'object' ? prioItem.apiName : prioItem;
                              checkItem(apiName);
                            });

                            (c.condiciones || []).forEach(cond => {
                              const condType = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();
                              if (condType === 'item' && cond.apiNameGrande) {
                                checkItem(cond.apiNameGrande);
                              }
                            });
                          });
                        }

                        const craftedItemsForGroup = Array.from(uniqueCraftedItems).map(apiName => allItems.find(i => i.apiName === apiName)).filter(Boolean);

                        let matchesSinergia = false;
                        const matchedSinergiasForGroup = [];
                        if (selectedSalidasEarlySinergias.length > 0) {
                          selectedSalidasEarlySinergias.forEach(traitApiName => {
                            const isMatch = composUsingThisGroup.some(compo => 
                              (compo.condiciones || []).some(c => 
                                (c.condTypeGrande?.toLowerCase() === 'sinergia' || c.typeGrande?.toLowerCase() === 'sinergia' || c.condType?.toLowerCase() === 'sinergia') &&
                                (c.apiNameGrande === traitApiName || c.ApiNamePequeno === traitApiName)
                              ) || (compo.traits || []).some(t => t.name === traitApiName)
                            );
                            if (isMatch) {
                              matchesSinergia = true;
                              const tr = allTraits.find(t => t.apiName === traitApiName);
                              if (tr) matchedSinergiasForGroup.push(tr);
                            }
                          });
                        }

                        const isFiltersActive = selectedSalidasEarlyChampions.length > 0 || selectedSalidasEarlyComponents.length > 0 || selectedSalidasEarlyItems.length > 0 || selectedSalidasEarlySinergias.length > 0;
                        const hasCraftedItems = craftedItemsForGroup.length > 0;
                        const isVisibleByFilters = !isFiltersActive || matchesChampion || hasCraftedItems || matchesSinergia;

                        return (
                          <button
                            key={grupo.id}
                            type="button"
                            title={grupo.nombre || `Grupo ${grupo.id}`}
                            className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
                            onClick={() => toggleArrayFilter(setSelectedSalidasEarly, grupo.id)}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px', 
                              padding: '6px 8px',
                              opacity: isVisibleByFilters ? 1 : 0.5,
                              filter: isVisibleByFilters ? 'none' : 'grayscale(50%)'
                            }}
                          >
                            {grupo.campeones && grupo.campeones.length > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {grupo.nombre && (
                                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
                                    {grupo.nombre}
                                  </span>
                                )}
                                {/* <ActiveTraitsDisplay championApiNames={grupo.campeones} versionNumber={versionNumber} /> */}
                                <div style={{ display: 'flex', gap: '5px' }}>
                                  {grupo.campeones.map(apiName => {
                                    const champ = allChampions.find(c => c.apiName === apiName);
                                    if (!champ || !champ.tileIcon) return null;
                                    return (
                                      <div key={apiName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                        <img 
                                          src={getLocalTftImage(champ.tileIcon, 'champions/tileIcon')} 
                                          alt={champ.name} 
                                          style={{ 
                                            minWidth: '60px', 
                                            minHeight: '60px', 
                                            width: '60px', 
                                            height: '60px', 
                                            objectFit: 'contain', 
                                            borderRadius: '3px',
                                            boxSizing: 'border-box',
                                            border: champ.cost ? `3px solid var(--color-hex-cost-${champ.cost})` : '3px solid transparent'
                                          }} 
                                        />
                                        <span style={{ fontSize: '0.7rem', textAlign: 'center', lineHeight: '1' }}>{champ.name}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                                {(craftedItemsForGroup.length > 0 || matchedChampionsForGroup.length > 0 || matchedSinergiasForGroup.length > 0) && (
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px', padding: '4px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                                    {matchedSinergiasForGroup.map(trait => (
                                      <img 
                                        key={trait.apiName}
                                        src={trait.icon?.includes("http") ? trait.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(trait.icon, 'traits', versionNumber)} 
                                        alt={trait.name} 
                                        title={trait.name}
                                        style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid #444', boxSizing: 'border-box' }} 
                                      />
                                    ))}
                                    {matchedChampionsForGroup.map(champ => (
                                      <img 
                                        key={champ.apiName}
                                        src={champ.icon || getLocalTftImage(champ.tileIcon, 'champions/tileIcon')} 
                                        alt={champ.name} 
                                        title={champ.name}
                                        style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain', border: champ.cost ? `2px solid var(--color-hex-cost-${champ.cost})` : '2px solid transparent', boxSizing: 'border-box' }} 
                                      />
                                    ))}
                                    {craftedItemsForGroup.map(item => (
                                      <img 
                                        key={item.apiName}
                                        src={getLocalTftImage(item.icon, 'items')} 
                                        alt={item.name} 
                                        title={item.name}
                                        style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain' }} 
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span>{grupo.nombre || `Grupo ${grupo.id}`}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })
            ) : (
              <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay salidas early disponibles</span>
            )}
          </div>
        </div>

      )
    }
    return (
      <fieldset className={`${style.filtersSection} ${style.filtersSectionHard}`}>
      <legend>Filtro Hard 2 (Playstyle / Estilo de juego)</legend>
      <div className={style.hardFiltersGrid}>
        {/*  Salidas Early */}
        {SalidasEarly()}

      </div>
    </fieldset>
    )
  }


  const FiltroAumentos = () => {
    return (
      <fieldset className={`${style.filtersSection}`}>
        <legend>Filtro de Aumentos</legend>
        
        <div className={style.filterInputGroup}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', marginBottom: '15px' }}>
            <div className={style.filterButtonsContainerRow} >
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

            {/* <div className={style.filterButtonsContainerRow}>
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
            </div> */}
          </div>
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateRows: 'repeat(auto-fit, 1fr)', gap: '20px' }}>
          {['Plata', 'Oro', 'Prismatico', 'Otros'].map(tierName => {
            // Ocultar completamente este sector de tier si hay tiers seleccionados y no es este
            // (Asumimos que 'Otros' no se filtra o se filtra aparte, pero si no está seleccionado lo ocultamos)
            if (selectedAugmentTiers.length > 0 && tierName !== 'Otros' && !selectedAugmentTiers.includes(tierName)) {
              return null;
            }
            if (selectedAugmentTiers.length > 0 && tierName === 'Otros' && !selectedAugmentTiers.includes('Otros')) {
              // Si 'Otros' no está en las opciones del minifiltro, tal vez siempre lo ocultamos al usar filtros
              return null;
            }

            const augsInTier = opEarlyAugmentsMap.filter(aug => {
              let augTier = (dbAumentos[aug.apiName]?.categoria_tier || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              
              if (tierName === "Otros") {
                return augTier !== "plata" && augTier !== "oro" && augTier !== "prismatico";
              }
              
              const normalizedTierName = tierName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              return augTier === normalizedTierName;
            });
            
            if (augsInTier.length === 0) return null;

            augsInTier.sort((a, b) => (b.appearCount || 0) - (a.appearCount || 0) || (a.name || "").localeCompare(b.name || ""));

            const tierColor = tierName === 'Oro' ? '#ffcc00' : tierName === 'Plata' ? '#ccc' : tierName === 'Prismatico' ? '#ff4d4d' : '#888';

            return (
              <div key={tierName} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.15)', padding: '10px', borderRadius: '8px' }}>
                <h4 style={{ color: tierColor, margin: '0 0 5px 0', borderBottom: '1px solid #444', paddingBottom: '5px' }}>{tierName}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                  {augsInTier.map(aug => {
                    let isGrayedOut = false;

                    if (selectedSmallCats.length > 0) {
                      const augCatsPequenas = dbAumentos[aug.apiName]?.categoria_pequeno || [];
                      isGrayedOut = !selectedSmallCats.some(sc => augCatsPequenas.includes(sc)); 
                    }

                    const isSelected = selectedHardAugments.some(a => a.apiName === aug.apiName);
                    const champ = (dbAumentos[aug.apiName]?.categoria_grande === "Heroe" && aug.championApiName) 
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
                          {aug.appearCount > 0 && (
                            <div style={{
                              position: 'absolute',
                              bottom: '-6px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: 'rgba(0,0,0,0.85)',
                              color: '#ffcc00',
                              border: '1px solid #ffcc00',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              fontWeight: 'bold',
                              zIndex: 2
                            }}>
                              {aug.appearCount}
                            </div>
                          )}
                          {aug.isOp && (
                            <div style={{
                              position: 'absolute',
                              top: '-6px',
                              right: '-6px',
                              backgroundColor: aug.isOpm ? '#ff4500' : '#ff9d00',
                              color: 'white',
                              borderRadius: '4px',
                              padding: '1px 3px',
                              fontSize: '0.60rem',
                              fontWeight: 'bold',
                              zIndex: 3,
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                            }}>
                              {aug.isOpm ? 'OPM' : 'OP'}
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: '1rem', textAlign: 'center', lineHeight: '1.2', wordBreak: 'break-word', color: isSelected ? '#ffcc00' : '#ddd' }}>
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
        {FiltroHard2()}
        {FiltroAumentos()}
        {/* {FiltroSoft()} */}

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
              <div key={compo.id || compo.titulo || Math.random()} className={style.cardContainer} onClick={()=>setActiveComp(allCompos.find((comp)=>comp.id === compo.id))}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '5px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px 8px 0px 0px', }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', minHeight: '32px' }}>
                      {compo._matchedFilters.map((f, i) => {
                        const showDivider = i > 0 && f.opStatus !== compo._matchedFilters[i - 1].opStatus;
                        return (
                          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {showDivider && (
                              <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                            )}
                            <div style={{ position: 'relative', display: 'flex' }}>
                              {f.type === 'salida' && f.campeones && f.campeones.length > 0 ? (
                                <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.1)', padding: '2px', borderRadius: '4px', border: f.opStatus === 'opm' ? '2px solid #ff4500' : f.opStatus === 'op' ? '2px solid #ff9d00' : 'none' }}>
                                  {f.campeones.map(apiName => {
                                    const champ = allChampions.find(c => c.apiName === apiName);
                                    if (!champ || !champ.tileIcon) return null;
                                    return (
                                      <img 
                                        key={apiName} 
                                        title={f.name}
                                        src={getLocalTftImage(champ.tileIcon, 'champions/tileIcon')} 
                                        alt={champ.name} 
                                        style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '3px' }} 
                                      />
                                    );
                                  })}
                                </div>
                              ) : f.icon ? (
                                <img src={f.icon} alt={f.name} title={f.name} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain', border: f.opStatus === 'opm' ? '2px solid #ff4500' : f.opStatus === 'op' ? '2px solid #ff9d00' : 'none' }} />
                              ) : (
                                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 6px', borderRadius: '4px', color: 'white', border: f.opStatus === 'opm' ? '2px solid #ff4500' : f.opStatus === 'op' ? '2px solid #ff9d00' : 'none' }}>{f.name}</span>
                              )}
                              {f.opStatus && (
                                <div style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '10px', fontWeight: 'bold', background: f.opStatus === 'opm' ? '#ff4500' : '#ff9d00', color: 'white', padding: '1px 3px', borderRadius: '4px', zIndex: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                  {f.opStatus.toUpperCase()}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  </div>
                <CardsMasterPlanCompos compo={compo} activateMissingOPM={activateMissingOPM} filtroSoft={{selectedSoftItems,selectedSoftChampions,selectedSoftTraits,selectedSoftAugments}} gruposSalidasEarly={gruposSalidasEarly} selectedAugmentTiers={selectedAugmentTiers} />
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
          <InfografiaMPTFT comp={activeComp} gruposSalidasEarly={gruposSalidasEarly} />
        </div>
      )}
      </div>


    </div>
  );
}

