import { $hasMasterPlan, $user } from '@stores/auth';
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

import FiltroHardWrapper from './filtros-hard/FiltroHardWrapper';
import FiltroEarlyWrapper from './filtros-early/FiltroEarlyWrapper';
import FiltroAumentosWrapper from './filtros-aumentos/FiltroAumentosWrapper';
import ResultadosWrapper from './resultados/ResultadosWrapper';


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
  const user = useStore($user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!user) {
        window.location.href = '/login?redirect=/tft/master-plan/app';
      } else if (!hasPlan) {
        window.location.href = '/tft/master-plan';
      }
    }
  }, [isClient, user, hasPlan]);

  // La redirección está controlada en el useEffect. 
  // Ocultaremos el contenido más abajo.

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

  // useEffect(() => {
  //   console.log("=== DEBUG MASTER PLAN ===");
  //   console.log("Version actual:", version);
  //   console.log("dbAumentos (keys):", Object.keys(dbAumentos).length);
  //   console.log("dbAumentos:", Object.keys(dbAumentos).filter((aumento) => dbAumentos[aumento].categoria_grande !== null));
  //   console.log("dbAumentos:", dbAumentos);
  //   console.log("=========================");
  // }, [version, dbAumentos]);

  const CATEGORIAS_GRANDES = ["Combate", "Economia", "Item", "Heroe", "Especificos", "Resultado_Aleatorio", "Otros"];
  const CATEGORIAS_PEQUENAS = ["Lose_Streak", "Win_Streak", "Experiencia", "Reroll", "Fast_9", "Emblema", "Artefactos", "AP", "AD", "Sinergia", "Escalado", "Loot"];

  const [selectedSmallCats, setSelectedSmallCats] = useState([]);
  const [selectedAugmentTiers, setSelectedAugmentTiers] = useState([]);
  const [selectedHardAugments, setSelectedHardAugments] = useState([]);
  const [sortAugmentsByName, setSortAugmentsByName] = useState(null);
  const [sortAugmentsByCount, setSortAugmentsByCount] = useState(null);

  const listaAumentosHeroes = [
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

  const [activeEarlyTab, setActiveEarlyTab] = useState('campeones');
  const [selectedSoftItems, setSelectedSoftItems] = useState([]);
  const [selectedSoftChampions, setSelectedSoftChampions] = useState([]);
  const [selectedSoftTraits, setSelectedSoftTraits] = useState([]);
  const [selectedSoftAugments, setSelectedSoftAugments] = useState([]);
  const [activeCheckFilters, setActiveCheckFilters] = useState([]);
  const [activeSoftTab, setActiveSoftTab] = useState('objetos');
  const [activeComp, setActiveComp] = useState(null);
  console.log({ selectedSoftItems })
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
  useEffect(() => {
    const loadDataTFT = async () => {
      const currentCompos = metaCompsTFT.get();
      if (!currentCompos || currentCompos.length === 0) {
        const url = versionTFT.get() === "pbe" ? composMetaPBEJSON : composMetaJSON;
        await fetchAndSortComps(url);
      }
    }
    loadDataTFT();
  }, []);

  useEffect(() => {
    console.log({ allCompos })
  }, [allCompos])

  useEffect(() => {
    //cuando tenga valor deberia desplazarse el scroll a donde esta activeCompContainer y cuando no tenga un valor el scroll deberia de ir a masterPlanContainer
    if (activeComp) {
      setTimeout(() => {
        const activeCompContainer = document.getElementById('activeCompContainer');
        if (activeCompContainer) {
          activeCompContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setTimeout(() => {
        const masterPlanContainer = document.getElementById('masterPlanContainer');
        if (masterPlanContainer) {
          masterPlanContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [activeComp])

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
      if (compo.tier === "C") return false;
      if (selectedCategory.length > 0 && !selectedCategory.includes(compo.categoria)) return false;
      if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(compo.dificultad)) return false;
      
      if (selectedTier.length > 0) {
        const matchTier = selectedTier.includes(compo.tier) || selectedTier.includes(compo.tierExtra) || selectedTier.includes(compo.extraTier);
        if (!matchTier) return false;
      }
      
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

      if (compo.aumentos && Array.isArray(compo.aumentos)) {
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
        const itemsToAdd = new Set();

        const checkItem = (apiName) => {
          if (!apiName) return;
          const dbItem = allItems.find(i => i.apiName === apiName);

          if (dbItem?.composition && dbItem.composition.length > 0) {
            let matchesAll = true;
            dbItem.composition.forEach(compReq => {
              const reqNormalized = compReq.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
              const isSelected = selectedSalidasEarlyComponents.some(sc => sc.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === reqNormalized);
              if (!isSelected) {
                matchesAll = false;
              }
            });

            if (matchesAll) {
              itemsToAdd.add(apiName);
            }
          } else {
            const normalizedApi = apiName.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
            const isSelected = selectedSalidasEarlyComponents.some(sc => sc.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedApi);
            if (isSelected) {
              itemsToAdd.add(apiName);
            }
          }
        };

        (compo.itemsPrio || []).forEach(prioItem => {
          const apiName = typeof prioItem === 'object' && prioItem !== null ? prioItem.apiName : prioItem;
          checkItem(apiName);
        });
        (compo.condiciones || []).forEach(cond => {
          const condType = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();
          if (condType === 'item' && cond.apiNameGrande) checkItem(cond.apiNameGrande);
        });

        itemsToAdd.forEach(apiName => {
          if (!matchedFilters.some(mf => mf.apiName === apiName)) {
            matchCount++;
            const itemData = allItems.find(i => i.apiName === apiName);
            const iconPath = itemData?.icon ? getLocalTftImage(itemData.icon, 'items') : null;
            matchedFilters.push({ type: 'item', apiName: apiName, icon: iconPath, name: itemData?.name || apiName });
          }
        });
      }

      let compoScore = 0;
      let countItemsPrio = 0;
      let sumItemsPrio = 0;
      let countOp = 0;
      let sumOp = 0;

      matchedFilters = matchedFilters.map(mf => {
        let opStatus = null;
        let isCore = false;
        let isEarly = false;
        
        const matchCond = (compo.condiciones || []).find(c => c.apiNameGrande === mf.apiName || c.ApiNamePequeno === mf.apiName);
        if (matchCond) {
          isCore = true;
          if (matchCond.op === 'opm') opStatus = 'opm';
          else if (matchCond.op) opStatus = 'op';
          if (matchCond.early === true || matchCond.early === 'true' || matchCond.early === 1) isEarly = true;
        }

        const matchPrio = compo.itemsPrio?.find(i => (typeof i === 'object' ? i.apiName : i) === mf.apiName);
        if (matchPrio) {
          isCore = true;
          if (opStatus !== 'opm') {
            if (matchPrio.op === 'opm') opStatus = 'opm';
            else if (matchPrio.op) opStatus = 'op';
          }
          if (matchPrio.early === true || matchPrio.early === 'true' || matchPrio.early === 1) isEarly = true;
        }

        if (opStatus !== 'opm') {
          const matchAug = compo.aumentos?.find(a => typeof a === 'object' && (a.apiName === mf.apiName || a.apiNameGrande === mf.apiName || a.apiNamePequeno === mf.apiName));
          if (matchAug) {
            if (matchAug.op === 'opm') opStatus = 'opm';
            else if (matchAug.op) opStatus = 'op';
            if (matchAug.early === true || matchAug.early === 'true' || matchAug.early === 1) isEarly = true;
          }
        }

        let indicatorScore = 1;
        if (opStatus === 'opm') indicatorScore += 2;
        else if (opStatus === 'op') indicatorScore += 0.5;

        if (isEarly) indicatorScore += 0.2;
        if (mf.type === 'salida') indicatorScore += 0.4;

        compoScore += indicatorScore;

        if (matchPrio) {
          countItemsPrio++;
          sumItemsPrio += indicatorScore;
        }
        if (opStatus === 'op' || opStatus === 'opm') {
          countOp++;
          sumOp += indicatorScore;
        }

        return { ...mf, opStatus, isCore, isEarly };
      });

      const compoTier = (compo.tier || "").toUpperCase();
      let tierScore = 0;
      if (compoTier === 'S') tierScore = 1;
      else if (compoTier === 'B') tierScore = -1;
      
      compoScore += tierScore;
      
      if (matchedFilters.length > 0) {
        console.log(`[${compo.titulo || compo.urlSEO}]: Tier ${compoTier} (${tierScore > 0 ? '+'+tierScore : tierScore}), item prio (cantidad:${countItemsPrio} suma:${sumItemsPrio.toFixed(1)}) , op (cantidad:${countOp}, suma:${sumOp.toFixed(1)}) | TOTAL SCORE: ${compoScore.toFixed(1)}`);
      }

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

      results.push({ ...compo, _matchCount: matchCount, _score: compoScore, _matchedFilters: matchedFilters, _missingOPM: missingOPM });
    });

    results.sort((a, b) => b._score - a._score);
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
          if (apiName) {
            if (!uniqueMap.has(apiName)) {
              const champ = allChampions.find(c => c.apiName === apiName);
              uniqueMap.set(apiName, {
                apiName,
                name: champ?.name || champ?.nombre || apiName,
                icon: champ ? getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber) : null,
                cost: champ?.cost || champ?.coste || 1,
                isEarly: true
              });
            } else {
              uniqueMap.get(apiName).isEarly = true;
            }
          }
        });
      }
      
      if (comp.salidasEarly && Array.isArray(comp.salidasEarly)) {
        comp.salidasEarly.forEach(groupId => {
          const grupoObj = gruposSalidasEarly.find(g => String(g.id) === String(groupId));
          if (grupoObj && grupoObj.campeones && Array.isArray(grupoObj.campeones)) {
            grupoObj.campeones.forEach(apiName => {
              if (apiName) {
                if (!uniqueMap.has(apiName)) {
                  const champ = allChampions.find(c => c.apiName === apiName);
                  uniqueMap.set(apiName, {
                    apiName,
                    name: champ?.name || champ?.nombre || apiName,
                    icon: champ ? getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber) : null,
                    cost: champ?.cost || champ?.coste || 1,
                    isEarly: true
                  });
                } else {
                  uniqueMap.get(apiName).isEarly = true;
                }
              }
            });
          }
        });
      }
    });

    condicionesGrandeCampeones.forEach(champCond => {
      if (champCond.apiName) {
        let iconPequeno = null;
        if (champCond.apiNamePequeno) {
          let obj = allAugments.find(a => a.apiName === champCond.apiNamePequeno);
          if (obj) {
            iconPequeno = obj.icon?.includes("http") ? obj.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(obj.icon, 'augments', versionNumber);
          } else {
            obj = allItems.find(i => i.apiName === champCond.apiNamePequeno);
            if (obj) {
              iconPequeno = getLocalTftImage(obj.icon, 'items');
            } else {
              obj = EXTRAS_ITEMS.find(e => e.apiName === champCond.apiNamePequeno);
              if (obj) iconPequeno = obj.icon;
            }
          }
        }

        if (!uniqueMap.has(champCond.apiName)) {
          const champ = allChampions.find(c => c.apiName === champCond.apiName);
          uniqueMap.set(champCond.apiName, {
            apiName: champCond.apiName,
            apiNamePequeno: champCond.apiNamePequeno,
            iconPequeno: iconPequeno,
            name: champ?.name || champ?.nombre || champCond.apiName,
            icon: champ ? getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber) : null,
            cost: champ?.cost || champ?.coste || 1,
            isCondition: true
          });
        } else {
          uniqueMap.get(champCond.apiName).isCondition = true;
          if (champCond.apiNamePequeno) {
            uniqueMap.get(champCond.apiName).apiNamePequeno = champCond.apiNamePequeno;
            uniqueMap.get(champCond.apiName).iconPequeno = iconPequeno;
          }
        }
      }
    });

    return Array.from(uniqueMap.values());
  }, [filteredCompos, allChampions, versionNumber, condicionesGrandeCampeones, gruposSalidasEarly]);

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

  const hasEarlyFiltersActive = selectedSalidasEarly.length > 0 || selectedSalidasEarlyItems.length > 0;

  const earlyHighlightedAugments = useMemo(() => {
    const highlighted = new Set();
    if (!hasEarlyFiltersActive) return highlighted;

    const activeEarlyApiNames = new Set([
      ...selectedSalidasEarly.map(String),
      ...selectedSalidasEarlyItems.map(i => String(i.apiName))
    ]);

    filteredCompos.forEach(compo => {
      const matchesEarly = compo._matchedFilters && compo._matchedFilters.some(mf => activeEarlyApiNames.has(String(mf.apiName)));

      if (matchesEarly) {
        if (compo.aumentos && Array.isArray(compo.aumentos)) {
          compo.aumentos.forEach(aumento => {
            const isEarly = typeof aumento === 'object' && (aumento.early === true || aumento.early === 'true' || aumento.early === 1);
            if (isEarly) {
              highlighted.add(typeof aumento === 'object' ? (aumento.apiNameGrande || aumento.apiName) : aumento);
            }
          });
        }
        if (compo.condiciones && Array.isArray(compo.condiciones)) {
          compo.condiciones.forEach(cond => {
            if (cond) {
              const isEarly = cond.early === true || cond.early === 'true' || cond.early === 1;
              if (isEarly) {
                highlighted.add(cond.apiNameGrande);
              }
            }
          });
        }
      }
    });
    return highlighted;
  }, [filteredCompos, hasEarlyFiltersActive, selectedSalidasEarly, selectedSalidasEarlyItems]);

  return (
    <div id={"masterPlanContainer"} className={style.masterPlanContainer}>
      <div className={style.containerTop}>
        {/* <div className={style.containerBtnsVersion}>
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
        </div> */}
        <div className={style.filtersSectionContainer}>
          <div className={style.sectionFiltersPlaystyles}>
            <FiltroHardWrapper
              tiers={[...tiers, 'X']} selectedTier={selectedTier} setSelectedTier={setSelectedTier}
              categorias={categorias} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
              dificultades={dificultades} selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}
              dañoTipo={dañoTipo} selectedDamageType={selectedDamageType} setSelectedDamageType={setSelectedDamageType}
              toggleArrayFilter={toggleArrayFilter} resetAllFilters={resetAllFilters} style={style}
            />
          </div>
          <div className={style.sectionFiltersAndResults}>
            <div className={style.sectionFiltersEarly}>
              <fieldset className={`${style.filtersSection} ${style.filtersSectionHard}`}>
                <legend>Filtros Early (Dentro del Juego / Ingame)</legend>
                <div className={style.tabsMenu}>
                  <button type="button" onClick={() => setActiveEarlyTab('campeones')} className={`${style.tabButton} ${activeEarlyTab === 'campeones' ? style.tabButtonActive : ''}`}>Campeones & Salidas</button>
                  <button type="button" onClick={() => setActiveEarlyTab('objetos')} className={`${style.tabButton} ${activeEarlyTab === 'objetos' ? style.tabButtonActive : ''}`}>Objetos / Items</button>
                  <button type="button" onClick={() => setActiveEarlyTab('aumentos')} className={`${style.tabButton} ${activeEarlyTab === 'aumentos' ? style.tabButtonActive : ''}`}>Aumentos 2-1</button>
                </div>
                <div className={style.tabContent}>
                  {activeEarlyTab !== 'aumentos' && (
                    <FiltroEarlyWrapper
                      activeTab={activeEarlyTab}
                      champsList={softChampionsList}
                      selectedSalidasEarlyChampions={selectedSalidasEarlyChampions}
                      toggleSelectedSalidasEarlyChampion={toggleSelectedSalidasEarlyChampion}
                      condicionesGrandeSinergias={condicionesGrandeSinergias}
                      selectedSalidasEarlySinergias={selectedSalidasEarlySinergias}
                      toggleArrayFilter={toggleArrayFilter}
                      setSelectedSalidasEarlySinergias={setSelectedSalidasEarlySinergias}
                      softItemsList={softItemsList}
                      selectedSalidasEarlyComponents={selectedSalidasEarlyComponents}
                      setSelectedSalidasEarlyComponents={setSelectedSalidasEarlyComponents}
                      condicionesGrandeItems={condicionesGrandeItems}
                      condicionesGrandeItemsGrouped={condicionesGrandeItemsGrouped}
                      selectedSalidasEarlyItems={selectedSalidasEarlyItems}
                      setSelectedSalidasEarlyItems={setSelectedSalidasEarlyItems}
                      allItems={allItems}
                      availableGruposSalidasEarly={availableGruposSalidasEarly}
                      filteredComposPrimary={filteredComposPrimary}
                      selectedSalidasEarly={selectedSalidasEarly}
                      setSelectedSalidasEarly={setSelectedSalidasEarly}
                      allTraits={allTraits}
                      allChampions={allChampions}
                      versionNumber={versionNumber}
                      style={style}
                    />
                  )}
                  {activeEarlyTab === 'aumentos' && (
                    <FiltroAumentosWrapper
                      selectedAugmentTiers={selectedAugmentTiers}
                      toggleArrayFilter={toggleArrayFilter}
                      setSelectedAugmentTiers={setSelectedAugmentTiers}
                      sortAugmentsByName={sortAugmentsByName}
                      setSortAugmentsByName={setSortAugmentsByName}
                      sortAugmentsByCount={sortAugmentsByCount}
                      setSortAugmentsByCount={setSortAugmentsByCount}
                      opEarlyAugmentsMap={opEarlyAugmentsMap}
                      dbAumentos={dbAumentos}
                      selectedSmallCats={selectedSmallCats}
                      earlyHighlightedAugments={earlyHighlightedAugments}
                      selectedHardAugments={selectedHardAugments}
                      setSelectedHardAugments={setSelectedHardAugments}
                      allChampions={allChampions}
                      versionNumber={versionNumber}
                      style={style}
                    />
                  )}
                </div>
              </fieldset>
            </div>
            <div className={style.containerResults}>
              <ResultadosWrapper
                filteredCompos={filteredCompos}
                setActiveComp={setActiveComp}
                allCompos={allCompos}
                allChampions={allChampions}
                activateMissingOPM={activateMissingOPM}
                selectedSoftItems={selectedSoftItems}
                selectedSoftChampions={selectedSoftChampions}
                selectedSoftTraits={selectedSoftTraits}
                selectedSoftAugments={selectedSoftAugments}
                gruposSalidasEarly={gruposSalidasEarly}
                selectedAugmentTiers={selectedAugmentTiers}
                style={style}
              />
            </div>
          </div>
        </div>
      </div>

      
      <div className={style.containerMid}>
        {activeComp && (
          <div id={"activeCompContainer"} className={style.activeCompContainer}>
            <div className={style.activeCompCloseButton} onClick={() => setActiveComp(null)}>
              X
            </div>
            <InfografiaMPTFT comp={activeComp} gruposSalidasEarly={gruposSalidasEarly} />
          </div>
        )}
      </div>


    </div>
  );
}

