import {deepMap, atom, task} from "nanostores";

// version: latest / pbe ---- idioma: en / es --- pais: mx /es /gb /us
export const loadDataTFTFromAPI = ({version="latest", idioma="es", pais="ar"}) =>{
  task(async()=>{
    const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
    const response = await fetch(urlDragon);
    const data = await response.json();
    
    updateDataTFT(data)
  })
}

const initialStateDataTFT = {};
const initialStateDataTFTItems = [];
const initialStateDataTFTSetData = [];
const initialStateDataTFTSets = [];

export const dataTFT = deepMap(initialStateDataTFT)
export const dataTFTItems = atom(initialStateDataTFTItems);
export const dataTFTSetData = atom(initialStateDataTFTSetData)

export const updateDataTFT = (data)=>{
  const {items, setData, sets} = data;
  dataTFT.set(data);
  dataTFTItems.set(items);
  dataTFTSetData.set(setData)
};


export const BASIC_ITEMS = [
  {
    nombre:"BF Sword",
    apiName:"bf_sword",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bf_sword.png",
  },
  {
    nombre:"Recurve Bow",
    apiName:"recurve_bow",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/recurve_bow.png",
  },
  {
    nombre:"Needlessly Large Rod",
    apiName:"needlessly_large_rod",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/needlessly_large_rod.png",
  },
  {
    nombre:"Tear of the Goddess",
    apiName:"tear_of_the_goddess",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/tear_of_the_goddess.png",
  },
  {
    nombre:"Chain Vest",
    apiName:"chain_vest",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/chain_vest.png",
  },
  {
    nombre:"Negatron Cloak",
    apiName:"negatron_cloak",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/negatron_cloak.png",
  },
  {
    nombre:"Gaints Belt",
    apiName:"gaints_belt",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/gaints_belt.png",
  },
  {
    nombre:"Sparring Gloves",
    apiName:"sparring_gloves",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/sparring_gloves.png",
  },
  {
    nombre:"Spatula",
    apiName:"spatula",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/spatula.png",
  },
  {
    nombre:"Frying Pan",
    apiName:"frying_pan",
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
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/edge_of_night.png",
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
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/steraks_gage.png",
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
    nombre:"Sugarcraft Emblem",
    apiName:"sugarcraft_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_sugarcraft.png",
    sinergia:"Sugarcraft",
    combine:[0,8]
  },
  {
    nombre:"Hunter Emblem",
    apiName:"TFT12_Item_HunterEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_hunter.png",
    sinergia:"Hunter",
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
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/nashors_tooth.png",
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
    nombre:"Pyro Emblem",
    apiName:"pyro_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_pyro.png",
    sinergia:"Pyro",
    combine:[1,8]
  },
  {
    nombre:"Multistriker Emblem",
    apiName:"TFT12_Item_MultistrikerEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_multistriker.png",
    sinergia:"Multistriker",
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
    nombre:"Portal Emblem",
    apiName:"portal_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_portal.png",
    sinergia:"Portal",
    combine:[2,8]
  },
  {
    nombre:"Mage Emblem",
    apiName:"TFT12_Item_MageEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_mage.png",
    sinergia:"Mage",
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
    nombre:"Faerie Emblem",
    apiName:"faerie_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_faerie.png",
    sinergia:"Faerie",
    combine:[3,8]
  },
  {
    nombre:"Scholar Emblem",
    apiName:"TFT12_Item_ScholarEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_scholar.png",
    sinergia:"Scholar",
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
    nombre:"Frost Emblem",
    apiName:"frost_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_frost.png",
    sinergia:"Frost",
    combine:[4,8]
  },
  {
    nombre:"Bastion Emblem",
    apiName:"TFT12_Item_BastionEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_bastion.png",
    sinergia:"Bastion",
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
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/evenshroud.png",
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
    nombre:"Witchcraft Emblem",
    apiName:"witchcraft_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_witchcraft.png",
    sinergia:"Witchcraft",
    combine:[5,8]
  },
  {
    nombre:"Preserver Emblem",
    apiName:"TFT12_Item_PreserverEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_preserver.png",
    sinergia:"Preserver",
    combine:[5,9]
  },
  {
    nombre:"Warmog's Armor",
    apiName:"warmogs_armor",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/warmogs_armor.png",
    sinergia:"",
    combine:[6,6]
  },
  {
    nombre:"Guardbreaker",
    apiName:"guardbreaker",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/stridebreaker.png",
    sinergia:"",
    combine:[6,7]
  },
  {
    nombre:"Eldritch Emblem",
    apiName:"eldritch_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_eldritch.png",
    sinergia:"Eldritch",
    combine:[6,8]
  },
  {
    nombre:"Shapeshifter Emblem",
    apiName:"TFT12_Item_ShapeshifterEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_shapeshifter.png",
    sinergia:"Shapeshifter",
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
    nombre:"Honeymancy Emblem",
    apiName:"honeymancy_emblem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_honeymancy.png",
    sinergia:"Witchcraft",
    combine:[7,8]
  },
  {
    nombre:"Warrior Emblem",
    apiName:"TFT12_Item_WarriorEmblemItem",
    img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_warrior.png",
    sinergia:"Warrior",
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
    combine:[8,9]
  },
]
