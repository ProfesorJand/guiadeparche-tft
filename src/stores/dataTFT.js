import {deepMap, atom, task} from "nanostores";
import { useStore } from "@nanostores/react";


const initialStateDataTFT = {};
const initialStateDataTFTItems = [];
const initialStateDataTFTSetData = [];
const initialStateDataTFTSets = [];
const initialStateDataTFTChampions = [];
const initialStateVersion = "pbe";
const initialStateTeamPlannerCode = [];
const initialTFT_SET = "latest";

export const setNumberPBE="16";
export const setMutatorPBE="TFTSet16";
export const setNumberLatest="15";
export const setMutatorLatest="TFTSet15";

export const apiGPTFT = `https://api.guiadeparche.com/tft/`;
export const crearCompoMetaPHP = `${apiGPTFT}crearCompoMeta.php`;
export const uploadImageWebpPHP = `${apiGPTFT}uploadImageWebp.php`;
export const tierListChampionItemJSON =  `${apiGPTFT}tierListChampionItem.json`;
export const crearTierListChampionItemPHP = `${apiGPTFT}crearTierListChampionItem.php`;
export const augmentsTierListJSON = `${apiGPTFT}augmentsTierList.json`
export const crearAugmentsTierListPHP = `${apiGPTFT}crearAugmentsTierList.php`
export const tierListItemJSON = `${apiGPTFT}tierListItem.json`;
export const crearTierListItemPHP = `${apiGPTFT}crearTierListItem.php`;
export const constantesJSON = `${apiGPTFT}constantes.json`;
export const constantesPHP = `${apiGPTFT}constantes.php`;
export const urlComposiciones = `${apiGPTFT}composiciones/`;
export const metaTFTComposicionesJSON = `${apiGPTFT}metaTFTComposiciones.json`;
export const composMetaJSON = `${apiGPTFT}composMeta.json`;
export const composMetaPBEJSON = `${apiGPTFT}composMetaPBE.json`;
export const assets3Estrellas = `${apiGPTFT}3-estrellas.webp`;

export const dataTFT = deepMap(initialStateDataTFT)
export const dataTFTAllItems = atom(initialStateDataTFTItems);
export const dataTFTSetData = atom(initialStateDataTFTSetData);
export const dataTFTChampions = atom(initialStateDataTFTChampions);
export const dataTFTTraits = atom([]);
export const dataTFTItemsBySet = atom([]);
export const versionTFT = atom(initialTFT_SET);
export const teamPlannerCode = atom(initialStateTeamPlannerCode);
export const TFT_SET = atom(initialTFT_SET);

const urlDragon = ()=>{
  return `https://raw.communitydragon.org/${versionTFT.get()}/game/`
} 


// version: latest / pbe ---- idioma: en / es --- pais: mx /es /gb /us
export const loadDataTFTFromAPI = ({version=versionTFT.get(), idioma="en", pais="us"}) =>{
  task(async()=>{
    console.log("loadDataTFTFromAPI")
    const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
    const response = await fetch(urlDragon);
    const data = await response.json();
    console.log("dataTFT loaded from ", urlDragon)
    console.log({data})
    updateDataTFT(data)
  })
}


export const getMetadataVersionTFTBySet = async (set=TFT_SET.get()) =>{
const urlDragon = `https://raw.communitydragon.org/${set}/content-metadata.json`;
const response = await fetch(urlDragon);
const data = await response.json();
const [v1, v2, ...rest] = data.version.split(".");
const version = v1.concat(".",v2);
return version;
}

export const updateDataTFT = async (data)=>{
  const {items, setData, sets} = data;
  dataTFT.set(data);
  dataTFTAllItems.set(items);
  dataTFTItemsBySet.set((setData.find(({mutator})=>{
    return mutator ===( versionTFT.get() === "pbe" ? setMutatorPBE: setMutatorLatest)
  })).items)
  dataTFTSetData.set(setData);
  dataTFTChampions.set((sets[versionTFT.get() === "pbe" ? setNumberPBE: setNumberLatest].champions)
  .sort(
    (a, b) => {
      const nameA = a.name.toUpperCase(); // Ignore case for consistent sorting
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; // names must be equal
    })
  );
  dataTFTTraits.set(sets[versionTFT.get() === "pbe" ? setNumberPBE: setNumberLatest].traits);
};

export const swapVersionTFT = (data) =>{
  versionTFT.set(data)
}

export const getTeamPlannerCodeAPI = async () => {
  const url = `https://raw.communitydragon.org/${versionTFT.get()}/plugins/rcp-be-lol-game-data/global/default/v1/tftchampions-teamplanner.json`;
  const response = await fetch(url);
  const data = await response.json();
  
  const formattedData = Object.values(data?.[versionTFT.get() === "pbe" ? setMutatorPBE : setMutatorLatest] || [])
    .reduce((acc, { character_id, team_planner_code }) => {
      acc[character_id] = team_planner_code.toString(16).padStart(3, '0');
      return acc;
    }, {});

  teamPlannerCode.set(formattedData);
};

versionTFT.subscribe((version) => {
  loadDataTFTFromAPI({version: version})
  getTeamPlannerCodeAPI(); // Llamar automáticamente cuando cambia la versión
});

loadDataTFTFromAPI({})

export const apiNameOfCraftableItems = [
  "TFT_Item_Deathblade",
  "TFT_Item_MadredsBloodrazor",
  "TFT_Item_HextechGunblade",
  "TFT_Item_SpearOfShojin",
  "TFT_Item_GuardianAngel",
  "TFT_Item_Bloodthirster",
  "TFT_Item_SteraksGage",
  "TFT_Item_InfinityEdge",
  "TFT13_Item_WarbandEmblemItem",// cambiar // sinergia
  "TFT13_Item_DemolitionistEmblemItem", // cambiar sinergia
  "TFT_Item_RapidFireCannon",
  "TFT_Item_GuinsoosRageblade",
  "TFT_Item_StatikkShiv",
  "TFT_Item_TitansResolve",
  "TFT_Item_RunaansHurricane",
  "TFT_Item_Leviathan",
  "TFT_Item_LastWhisper",
  "TFT13_Item_RebelEmblemItem", // cambiar sinergia
  "TFT13_Item_ChallengerEmblemItem", //cambiar sinergia
  "TFT_Item_RabadonsDeathcap",
  "TFT_Item_ArchangelsStaff",
  "TFT_Item_Crownguard",
  "TFT_Item_IonicSpark",
  "TFT_Item_Morellonomicon",
  "TFT_Item_JeweledGauntlet",
  "TFT13_Item_CabalEmblemItem", // cambiar
  "TFT13_Item_SorcererEmblemItem", // cambiar
  "TFT_Item_BlueBuff",
  "TFT_Item_FrozenHeart",
  "TFT_Item_AdaptiveHelm",
  "TFT_Item_Redemption",
  "TFT_Item_UnstableConcoction",
  "TFT13_Item_FamilyEmblemItem", // cambiar
  "TFT13_Item_InvokerEmblemItem",// 
  "TFT_Item_BrambleVest",
  "TFT_Item_GargoyleStoneplate",
  "TFT_Item_RedBuff",
  "TFT_Item_NightHarvester",
  "TFT13_Item_SquadEmblemItem", //
  "TFT13_Item_TitanEmblemItem", // 
  "TFT_Item_DragonsClaw",
  "TFT_Item_SpectralGauntlet",
  "TFT_Item_Quicksilver",
  "TFT13_Item_AutomataEmblemItem",//
  "TFT13_Item_PitFighterEmblemItem", //
  "TFT_Item_WarmogsArmor",
  "TFT_Item_PowerGauntlet",
  "TFT13_Item_ExperimentEmblemItem", //
  "TFT13_Item_BruiserEmblemItem", // 
  "TFT_Item_ThiefsGloves",
  "TFT13_Item_HoverboardEmblemItem", //
  "TFT13_Item_AmbusherEmblemItem", //
  "TFT_Item_ForceOfNature",
  "TFT_Item_TacticiansRing",
  "TFT_Item_TacticiansScepter",
];
export const apiNameOfCraftableItemsPBE = [
  "TFT_Item_Deathblade",
  "TFT_Item_MadredsBloodrazor",
  "TFT_Item_HextechGunblade",
  "TFT_Item_SpearOfShojin",
  "TFT_Item_GuardianAngel",
  "TFT_Item_Bloodthirster",
  "TFT_Item_SteraksGage",
  "TFT_Item_InfinityEdge",
  "TFT15_Item_SoulFighterEmblemItem",
  "TFT15_Item_EdgelordEmblemItem",
  "TFT_Item_RapidFireCannon",
  "TFT_Item_GuinsoosRageblade",
  "TFT_Item_StatikkShiv",
  "TFT_Item_TitansResolve",
  "TFT_Item_RunaansHurricane",
  "TFT_Item_Leviathan",
  "TFT_Item_LastWhisper",
  "TFT15_Item_SupremeCellsEmblemItem",
  "TFT13_Item_ChallengerEmblemItem",
  "TFT_Item_RabadonsDeathcap",
  "TFT_Item_ArchangelsStaff",
  "TFT_Item_Crownguard",
  "TFT_Item_IonicSpark",
  "TFT_Item_Morellonomicon",
  "TFT_Item_JeweledGauntlet",
  "TFT15_Item_StarGuardianEmblemItem",
  "TFT15_Item_SpellslingerEmblemItem",
  "TFT_Item_BlueBuff",
  "TFT_Item_FrozenHeart",
  "TFT_Item_AdaptiveHelm",
  "TFT_Item_Redemption",
  "TFT_Item_UnstableConcoction",
  "TFT15_Item_BattleAcademiaEmblemItem",
  "TFT15_Item_ProdigyEmblemItem",
  "TFT_Item_BrambleVest",
  "TFT_Item_GargoyleStoneplate",
  "TFT_Item_RedBuff",
  "TFT_Item_NightHarvester",
  "TFT15_Item_EmpyreanEmblemItem",
  "TFT15_Item_BastionEmblemItem",
  "TFT_Item_DragonsClaw",
  "TFT_Item_SpectralGauntlet",
  "TFT_Item_Quicksilver",
  "TFT15_Item_ShotcallerEmblemItem",
  "TFT15_Item_JuggernautEmblemItem",
  "TFT_Item_WarmogsArmor",
  "TFT_Item_PowerGauntlet",
  "TFT15_Item_CrystalRoseEmblemItem",
  "TFT15_Item_HeavyweightEmblemItem",
  "TFT_Item_ThiefsGloves",
  "TFT15_Item_RingKingsEmblemItem",
  "TFT15_Item_DestroyerEmblemItem",
  "TFT_Item_ForceOfNature",
  "TFT_Item_TacticiansRing",
  "TFT_Item_TacticiansScepter",
]

export const apiNamesCrafteableItems = ()=>{
  return versionTFT.get() === "pbe" ? apiNameOfCraftableItemsPBE : apiNameOfCraftableItems;
}
  const baseItems = [
    'TFT_Item_BFSword',           // 0
    'TFT_Item_RecurveBow',        // 1
    'TFT_Item_NeedlesslyLargeRod',// 2
    'TFT_Item_TearOfTheGoddess',  // 3
    'TFT_Item_ChainVest',         // 4
    'TFT_Item_NegatronCloak',     // 5
    'TFT_Item_GiantsBelt',        // 6
    'TFT_Item_SparringGloves',    // 7
    'TFT_Item_Spatula',           // 8
    'TFT_Item_FryingPan'          // 9
  ];

export const AllCraftableItems = (todosLosItems) => {
  const apiNames = apiNamesCrafteableItems();

  if (!todosLosItems.length) return [];

  return apiNames.map(apiName => {
    const item = todosLosItems.find(i => i.apiName === apiName);
    if (!item) return null;

    const combine = item.composition?.map(comp => baseItems.indexOf(comp)) || [];

    return {
      ...item,
      combine,
      icon: urlDragon() + item.icon.replace(".tex", ".png").toLowerCase()
    };
  }).filter(Boolean);
};

export const AllBasicItems = (dataTFTAllItems) =>{
  const dataOfBasicItems = baseItems
    .map(apiName => {
      const item = dataTFTAllItems.find(item => item.apiName === apiName);
      if (!item) return null;

      return {
        ...item,
        icon:urlDragon() + item.icon.replace(".tex",".png").toLowerCase()
      };
    })
    .filter(Boolean); // elimina los que no encontró
    return dataOfBasicItems;
}

export const BASIC_ITEMS = [
  {
    nombre:"BF Sword",
    apiName:"TFT_Item_BFSword",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bf_sword.png",
  },
  {
    nombre:"Recurve Bow",
    apiName:"TFT_Item_RecurveBow",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/recurve_bow.png",
  },
  {
    nombre:"Needlessly Large Rod",
    apiName:"TFT_Item_NeedlesslyLargeRod",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/needlessly_large_rod.png",
  },
  {
    nombre:"Tear of the Goddess",
    apiName:"TFT_Item_TearOfTheGoddess",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/tear_of_the_goddess.png",
  },
  {
    nombre:"Chain Vest",
    apiName:"TFT_Item_ChainVest",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/chain_vest.png",
  },
  {
    nombre:"Negatron Cloak",
    apiName:"TFT_Item_NegatronCloak",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/negatron_cloak.png",
  },
  {
    nombre:"Gaints Belt",
    apiName:"TFT_Item_GiantsBelt",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/gaints_belt.png",
  },
  {
    nombre:"Sparring Gloves",
    apiName:"TFT_Item_SparringGloves",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/sparring_gloves.png",
  },
  {
    nombre:"Spatula",
    apiName:"TFT_Item_Spatula",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/spatula.png",
  },
  {
    nombre:"Frying Pan",
    apiName:"TFT_Item_FryingPan",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/standard/frying_pan.png",
  },
]

export const CRAFTEABLE_ITEMS = [
  {
    nombre:"Deathblade",
    apiName:"death_blade",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/death_blade.png",
    sinergia:"",
    combine:[0,0]
  },
  {
    nombre:"Giant Slayer",
    apiName:"giant_slayer",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/giant_slayer.png",
    sinergia:"",
    combine:[0,1]
  },
  {
    nombre:"Hextech Gunblade",
    apiName:"hextech_gunblade",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/hextech_gunblade.png",
    sinergia:"",
    combine:[0,2]
  },
  {
    nombre:"Spear of Shojin",
    apiName:"spear_of_shojin",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/spear_of_shojin.png",
    sinergia:"",
    combine:[0,3]
  },
  {
    nombre:"Edge of Night",
    apiName:"edge_of_night",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/edge_of_night_xl.png",
    sinergia:"",
    combine:[0,4]
  },
  {
    nombre:"Bloodthirster",
    apiName:"bloodthirster",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bloodthirster.png",
    sinergia:"",
    combine:[0,5]
  },
  {
    nombre:"Sterak's Gage",
    apiName:"steraks_gage",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/steraksgage_xl.png",
    sinergia:"",
    combine:[0,6]
  },
  {
    nombre:"Infinity Edge",
    apiName:"infinity_edge",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/infinity_edge.png",
    sinergia:"",
    combine:[0,7]
  },
  {
    nombre:"Conqueror Emblem",
    apiName:"TFT13_Item_WarbandEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_conqueror.png",
    sinergia:"Conqueror",
    combine:[0,8]
  },
  {
    nombre:"Artillerist Emblem",
    apiName:"TFT13_Item_DemolitionistEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_artillerist.png",
    sinergia:"Artillerist",
    combine:[0,9]
  },
  {
    nombre:"Red Buff",
    apiName:"red_buff",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/redbuff.png",
    sinergia:"",
    combine:[1,1]
  },
  {
    nombre:"Guinsoo's Rageblade",
    apiName:"guinsoos_rageblade",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/guinsoos_rageblade.png",
    sinergia:"",
    combine:[1,2]
  },
  {
    nombre:"Statikk Shiv",
    apiName:"statikk_shiv",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/statikk_shiv.png",
    sinergia:"",
    combine:[1,3]
  },
  {
    nombre:"Titan's Resolve",
    apiName:"titans_resolve",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/titans_resolve.png",
    sinergia:"",
    combine:[1,4]
  },
  {
    nombre:"Runaan's Hurricane",
    apiName:"runaans_hurricane",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/runaans_hurricane.png",
    sinergia:"",
    combine:[1,5]
  },
  {
    nombre:"Nashor's Tooth",
    apiName:"nashors_tooth",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/nashorstooth_xl.png",
    sinergia:"",
    combine:[1,6]
  },
  {
    nombre:"Last Whisper",
    apiName:"last_whisper",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/last_whisper.png",
    sinergia:"",
    combine:[1,7]
  },
  {
    nombre:"Rebel Emblem",
    apiName:"TFT13_Item_RebelEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_rebel.png",
    sinergia:"Rebel",
    combine:[1,8]
  },
  {
    nombre:"Quickstriker Emblem",
    apiName:"TFT13_Item_ChallengerEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_quickstriker.png",
    sinergia:"Quickstriker",
    combine:[1,9]
  },
  {
    nombre:"Rabadon's Deathcap",
    apiName:"rabadons_deathcap",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/rabadons_deathcap.png",
    sinergia:"",
    combine:[2,2]
  },
  {
    nombre:"Archangel's Staff",
    apiName:"archangel_staff",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/archangel_staff.png",
    sinergia:"",
    combine:[2,3]
  },
  {
    nombre:"Crownguard",
    apiName:"crownguard",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/crownguard.png",
    sinergia:"",
    combine:[2,4]
  },
  {
    nombre:"Ionic Spark",
    apiName:"ionic_spark",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/ionic_spark.png",
    sinergia:"",
    combine:[2,5]
  },
  {
    nombre:"Morellonomicon",
    apiName:"morellonomicon",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/morellonomicon.png",
    sinergia:"",
    combine:[2,6]
  },
  {
    nombre:"Jeweled Guantlet",
    apiName:"jeweled_guantlet",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/jeweled_guantlet.png",
    sinergia:"",
    combine:[2,7]
  },
  {
    nombre:"Black Rose Emblem",
    apiName:"TFT13_Item_CabalEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_cabal.png",
    sinergia:"BlackRose",
    combine:[2,8]
  },
  {
    nombre:"Sorcerer Emblem",
    apiName:"TFT13_Item_SorcererEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_sorcerer.png",
    sinergia:"Sorcerer",
    combine:[2,9]
  },
  {
    nombre:"Blue Buff",
    apiName:"blue_buff",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/blue_buff.png",
    sinergia:"",
    combine:[3,3]
  },
  {
    nombre:"Protector's Vow",
    apiName:"protectors_vow",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/winters_approach.png",
    sinergia:"",
    combine:[3,4]
  },
  {
    nombre:"Adaptive Helm",
    apiName:"adaptive_helm",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/adaptive_helm.png",
    sinergia:"",
    combine:[3,5]
  },
  {
    nombre:"Redemption",
    apiName:"redemption",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/redemption.png",
    sinergia:"",
    combine:[3,6]
  },
  {
    nombre:"Hand of Justice",
    apiName:"hand_of_justice",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/hand_of_justice.png",
    sinergia:"",
    combine:[3,7]
  },
  {
    nombre:"Family Emblem",
    apiName:"TFT13_Item_FamilyEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_family.png",
    sinergia:"Family",
    combine:[3,8]
  },
  {
    nombre:"Visionary Emblem",
    apiName:"TFT13_Item_InvokerEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_visionary.png",
    sinergia:"Visionary",
    combine:[3,9]
  },
  {
    nombre:"Bramble Vest",
    apiName:"bramble_vest",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bramble_vest.png",
    sinergia:"",
    combine:[4,4]
  },
  {
    nombre:"Gargoyle Stoneplate",
    apiName:"gargoyle_stoneplate",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/gargoyle_stoneplate.png",
    sinergia:"",
    combine:[4,5]
  },
  {
    nombre:"Sunfire Cape",
    apiName:"sunfire_cape",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/sunfire_cape.png",
    sinergia:"",
    combine:[4,6]
  },
  {
    nombre:"Steadfast Heart",
    apiName:"steadfast_heart",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/behemoth.png",
    sinergia:"",
    combine:[4,7]
  },
  {
    nombre:"Enforcer Emblem",
    apiName:"TFT13_Item_SquadEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_enforcer.png",
    sinergia:"Enforcer",
    combine:[4,8]
  },
  {
    nombre:"Sentinel Emblem",
    apiName:"TFT13_Item_TitanEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_sentinel.png",
    sinergia:"Sentinel",
    combine:[4,9]
  },
  {
    nombre:"Dragons Claw",
    apiName:"dragons_claw",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/dragons_claw.png",
    sinergia:"",
    combine:[5,5]
  },
  {
    nombre:"Evenshroud",
    apiName:"evenshroud",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/support_t4_lunar.png",
    sinergia:"",
    combine:[5,6]
  },
  {
    nombre:"Quicksilver",
    apiName:"quicksilver",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/quicksilver.png",
    sinergia:"",
    combine:[5,7]
  },
  {
    nombre:"Automata Emblem",
    apiName:"TFT13_Item_AutomataEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_automata.png",
    sinergia:"Automata",
    combine:[5,8]
  },
  {
    nombre:"Pit Fighter Emblem",
    apiName:"TFT13_Item_PitFighterEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_pitfighter.png",
    sinergia:"PitFighter",
    combine:[5,9]
  },
  {
    nombre:"Warmog's Armor",
    apiName:"warmogs_armor",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/warmogs_xl.png",
    sinergia:"",
    combine:[6,6]
  },
  {
    nombre:"Guardbreaker",
    apiName:"guardbreaker",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/stridebreaker_xl.png",
    sinergia:"",
    combine:[6,7]
  },
  {
    nombre:"Experiment Emblem",
    apiName:"TFT13_Item_ExperimentEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_experiment.png",
    sinergia:"Experiment",
    combine:[6,8]
  },
  {
    nombre:"Bruiser Emblem",
    apiName:"TFT13_Item_BruiserEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_bruiser.png",
    sinergia:"Bruiser",
    combine:[6,9]
  },
  {
    nombre:"Thieve's Gloves",
    apiName:"thieves_gloves",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/thieves_gloves.png",
    sinergia:"",
    combine:[7,7]
  },
  {
    nombre:"Firelight Emblem",
    apiName:"TFT13_Item_HoverboardEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_firelight.png",
    sinergia:"Firelight",
    combine:[7,8]
  },
  {
    nombre:"Ambusher Emblem",
    apiName:"TFT13_Item_AmbusherEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_ambusher.png",
    sinergia:"Ambusher",
    combine:[7,9]
  },
  {
    nombre:"Tactician's Crown",
    apiName:"tacticians_crown",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/tacticians_crown.png",
    sinergia:"Witchcraft",
    combine:[8,8]
  },
  {
    nombre:"Tacticians Ring",
    apiName:"TFT_Item_TacticiansRing",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/standard/tacticians_ring.png",
    sinergia:"TacticiansRing",
    combine:[8,9]
  },
  {
    nombre:"Tacticians Scepter",
    apiName:"TFT_Item_TacticiansScepter",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/standard/tacticians_scepter.png",
    sinergia:"TacticiansScepter",
    combine:[9,9]
  },
]

const PBE_ITEMS_CRAFTEABLES = [
  {
    nombre:"Strategist Emblem",
    apiName:"TFT14_Item_ControllerEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Strategist.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Controller",
    combine:[0,8]
  },
  {
    nombre:"Marksman Emblem",
    apiName:"TFT14_Item_MarksmanEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set14/tft14_emblem_marksman.tft_set14.png",
    sinergia:"TFT14_Marksman",
    combine:[0,9]
  },
  {
    nombre:"Divinicorp Emblem",
    apiName:"TFT14_Item_DivinicorpEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Divinicorp.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Divinicorp",
    combine:[1,8]
  },
  {
    nombre:"Rapidfire Emblem",
    apiName:"TFT14_Item_SwiftEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Rapidfire.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Swift",
    combine:[1,9]
  },
  {
    nombre:"Street Demon Emblem",
    apiName:"TFT14_Item_StreetDemonEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_StreetDemon.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_StreetDemon",
    combine:[2,8]
  },
  {
    nombre:"Techie Emblem",
    apiName:"TFT14_Item_TechieEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Techie.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Techie",
    combine:[2,9]
  },
  {
    nombre:"Anima Squad Emblem",
    apiName:"TFT14_Item_DarkWebEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_AnimaSquad.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_AnimaSquad",
    combine:[3,8]
  },
  {
    nombre:"Dynamo Emblem",
    apiName:"TFT14_Item_ThirstyEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Dynamo.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Thirsty",
    combine:[3,9]
  },
  {
    nombre:"BoomBot Emblem",
    apiName:"TFT14_Item_BallistekEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_BoomBots.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_BallisTek",
    combine:[4,8]
  },
  {
    nombre:"Bastion Emblem",
    apiName:"TFT14_Item_ArmorcladEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Bastion.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Armorclad",
    combine:[4,9]
  },
  {
    nombre:"Syndicate Emblem",
    apiName:"TFT14_Item_MobEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Syndicate.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Mob",
    combine:[5,8]
  },
  {
    nombre:"Slayer Emblem",
    apiName:"TFT14_Item_StrongEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Slayer.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Strong",
    combine:[5,9]
  },
  {
    nombre:"Golden Ox Emblem",
    apiName:"TFT14_Item_ImmortalEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_GoldenOx.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Immortal",
    combine:[6,8]
  },
  {
    nombre:"Bruiser Emblem",
    apiName:"TFT14_Item_BruiserEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Bruiser.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Bruiser",
    combine:[6,9]
  },
  {
    nombre:"Exotech Emblem",
    apiName:"TFT14_Item_EdgeRunnerEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Exotech.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_EdgeRunner",
    combine:[7,8]
  },
  {
    nombre:"Executioner Emblem",
    apiName:"TFT14_Item_CutterEmblemItem",
    img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/Set14/TFT14_Emblem_Executioner.TFT_Set14.png".toLowerCase(),
    sinergia:"TFT14_Cutter",
    combine:[7,9]
  }
]

export const ITEMS_CRAFTEABLES_PBE = CRAFTEABLE_ITEMS.map(item => {
  const replacement = PBE_ITEMS_CRAFTEABLES.find(pbeItem => 
    JSON.stringify(pbeItem.combine) === JSON.stringify(item.combine)
  );
  return replacement ? replacement : item;
});


export const OTROS_ITEMS = [
  {
    nombre:"Queenguard's Armor",
    apiName:"TFT12_Item_Faerie_Armor",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft12/tft12_faeriequeenguardarmor.tft_set12.png",
  },
  {
    nombre:"Faerie Queen's Crown",
    apiName:"TFT12_Item_Faerie_QueensCrown",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft12/tft12_faeriecrown.tft_set12.png"
  },
  {
    apiName: "TFT12_Item_Faerie_QueensCrownRadiant",
    img: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft12/tft12_faeriecrown_radiant.tft_set12.png",
    nombre: "Corona del Monarca Eterno"
},
{
    apiName: "TFT12_Item_Faerie_ArmorRadiant",
    img: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft12/tft12_faeriequeenguardarmor_radiant.tft_set12.png",
    nombre: "Armadura de Devoción Eterna"
},
]

export  const ARTEFACTOS = [
  {
    nombre: "Spirit Visage",
    name: "Spirit Visage",
    apiName: "TFT4_Item_OrnnAnimaVisage",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnanimavisage.tft_set13.png",
  },
  {
    nombre: "Blighting Jewel",
    name: "Blighting Jewel",
    apiName: "TFT_Item_Artifact_BlightingJewel",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_blightingjewel.tft_set13.png",
  },
  {
    nombre:"Corrupt Vampiric Scepter",
    name: "Corrupt Vampiric Scepter",
    apiName:"TFT_Item_Artifact_CursedVampiricScepter",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_cursedvampiricscepter.tft_set13.png",
  },
  {
    nombre:"Death's Defiance",
    name:"Death's Defiance",
    apiName:"TFT4_Item_OrnnDeathsDefiance",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornndeathsdefiance.tft_set13.png",
  },
  {
    nombre:"Deathfire Grasp",
    name:"Deathfire Grasp",
    apiName:"TFT9_Item_OrnnDeathfireGrasp",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft9_item_ornndeathfiregrasp.tft_set13.png",
  },
  {
    nombre:"Eternal Winter",
    name:"Eternal Winter",
    apiName:"TFT4_Item_OrnnEternalWinter",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornneternalwinter.tft_set13.png",
  },
  {
    nombre:"Fishbones",
    name:"Fishbones",
    apiName:"TFT_Item_Artifact_Fishbones",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_fishbones.tft_set13.png",
  },
  {
    nombre:"Forbidden Idol",
    name:"Forbidden Idol",
    apiName:"TFT_Item_Artifact_ForbiddenIdol",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_forbiddenidol.tft_set13.png",
  },
  {
    nombre:"Gambler's Blade",
    name:"Gambler's Blade",
    apiName:"TFT7_Item_ShimmerscaleGamblersBlade",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft7_item_shimmerscalegamblersblade.tft_set13.png",
  },
  {
    nombre:"Gold Collector",
    name:"Gold Collector",
    apiName:"TFT4_Item_OrnnTheCollector",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnthecollector.tft_set13.png",
  },
  {
    nombre:"Horizon Focus",
    name:"Horizon Focus",
    apiName:"TFT_Item_Artifact_HorizonFocus",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft9_item_ornnhorizonfocus.tft_set13.png",
  },
  {
    nombre:"Hullcrusher",
    name:"Hullcrusher",
    apiName:"TFT9_Item_OrnnHullbreaker",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft9_ornnitem_hullbreaker.png", //
  },
  {
    nombre:"Infinity Force",
    name:"Infinity Force",
    apiName:"TFT4_Item_OrnnInfinityForce",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornninfinityforce.tft_set13.png",
  },
  {
    nombre:"Innervating Locket",
    name:"Innervating Locket",
    apiName:"TFT_Item_Artifact_InnervatingLocket",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_innervatinglocket.tft_set13.png",
  },
  {
    nombre:"Lich Bane",
    name:"Lich Bane",
    apiName:"TFT_Item_Artifact_LichBane",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_lichbane.png",
  },
  {
    nombre:"Lightshield Crest",
    name:"Lightshield Crest",
    apiName:"TFT_Item_Artifact_LightshieldCrest",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_lightshieldcrest.tft_set13.png",
  },
  {
    nombre:"Luden's Tempest",
    name:"Luden's Tempest",
    apiName:"TFT_Item_Artifact_LudensTempest",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_ludenstempest.tft_set13.png",
  },
  {
    nombre:"Manazane",
    name:"Manazane",
    apiName:"TFT4_Item_OrnnMuramana",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnmuramana.tft_set13.png",
  },
  {
    nombre:"Mittens",
    name:"Mittens",
    apiName:"TFT_Item_Artifact_Mittens",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_mittens.tft_set13.png",
  },
  {
    nombre:"Mogul's Mail",
    name:"Mogul's Mail",
    apiName:"TFT7_Item_ShimmerscaleMogulsMail",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft7_item_shimmerscalemogulsmail.tft_set13.png",
  },
  {
    nombre:"Prowler's Claw",
    name:"Prowler's Claw",
    apiName:"TFT_Item_Artifact_ProwlersClaw",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_prowlersclaw.tft_set13.png",
  },
  {
    nombre:"Rapid Firecannon",
    name:"Rapid Firecannon",
    apiName:"TFT_Item_Artifact_RapidFirecannon",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_rapidfirecannon.tft_set13.png",
  },
  {
    nombre:"Seeker's Armguard",
    name:"Seeker's Armguard",
    apiName:"TFT_Item_Artifact_SeekersArmguard",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_seekersarmguard.tft_set13.png",
  },
  {
    nombre:"Silvermere Dawn",
    name:"Silvermere Dawn",
    apiName:"TFT_Item_Artifact_SilvermereDawn",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_silvermeredawn.tft_set13.png",
  },
  {
    nombre:"Spectral Cutlass",
    name:"Spectral Cutlass",
    apiName:"TFT_Item_Artifact_SpectralCutlass",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_spectralcutlass.tft_set13.png",
  },
  {
    nombre:"Suspicious Trench Coat",
    name:"Suspicious Trench Coat",
    apiName:"TFT_Item_Artifact_SuspiciousTrenchCoat",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_suspicioustrenchcoat.tft_set13.png",
  },
  {
    nombre:"Talisman Of Ascension",
    name:"Talisman Of Ascension",
    apiName:"TFT_Item_Artifact_TalismanOfAscension",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_talismanofascension.tft_set13.png",
  },
  {
    nombre:"Trickster's Glass",
    name:"Trickster's Glass",
    apiName:"TFT9_Item_OrnnTrickstersGlass",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft9_item_ornntrickstersglass.tft_set13.png",
  },
  {
    nombre:"Unending Despair",
    name:"Unending Despair",
    apiName:"TFT_Item_Artifact_UnendingDespair",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_unendingdespair.tft_set13.png",
  },
  {
    nombre:"Wit's End",
    name:"Wit's End",
    apiName:"TFT_Item_Artifact_WitsEnd",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_witsend.tft_set13.png",
  },
  {
    nombre:"Zhonya's Paradox",
    name:"Zhonya's Paradox",
    apiName:"TFT4_Item_OrnnZhonyasParadox",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnzhonyasparadox.tft_set13.png",
  },
]

export const RADIANTS_ITEMS = []