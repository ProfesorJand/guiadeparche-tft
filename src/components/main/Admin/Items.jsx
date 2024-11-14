import React, {useEffect, useState} from "react";
import style from "./css/Items.module.css";
import { radiantsItems, emblems } from "src/json/updates/itemsTFT";
import {itemsDataIngles} from "src/json/updates/itemsTFT"
export const Items = ()=>{
  const primerItem = {
    apiName: "TFT_Item_BFSword",
    associatedTraits: [],
    composition: [],
    desc: "%i:scaleAD% +@AD*100@% Attack Damage",
    effects: {
        AD: 0.10000000149011612
    },
    from: null,
    icon: "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/BF_Sword.tex",
    id: null,
    incompatibleTraits: [],
    name: "B.F. Sword",
    unique: false,
}
  const [pestana, setPestana] = useState(0);
  const [itemsCrafteables, setItemsCrafteables] = useState([])
  const [itemOver, setItemOver] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(()=>{
    if(itemOver){
      (async function callApi(){
        const findItem = itemsDataIngles.find(({apiName, composition})=>{
          return apiName === itemOver
        })
        setTooltip(findItem)
      })()
    }else{
      setTooltip(null)
    }
  },[itemOver])
  
  function handlePestana(number){
    setPestana(number)
  }
  const BASIC_ITEMS = [
    {
      nombre:"bf_sword",
      apiName:"TFT_Item_BFSword",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bf_sword.png",
    },
    {
      nombre:"recurve_bow",
      apiName:"TFT_Item_RecurveBow",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/recurve_bow.png",
    },
    {
      nombre:"needlessly_large_rod",
      apiName:"TFT_Item_NeedlesslyLargeRod",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/needlessly_large_rod.png",
    },
    {
      nombre:"tear_of_the_goddess",
      apiName:"TFT_Item_TearOfTheGoddess",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/tear_of_the_goddess.png",
    },
    {
      nombre:"chain_vest",
      apiName:"TFT_Item_ChainVest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/chain_vest.png",
    },
    {
      nombre:"negatron_cloak",
      apiName:"TFT_Item_NegatronCloak",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/negatron_cloak.png",
    },
    {
      nombre:"gaints_belt",
      apiName:"TFT_Item_GiantsBelt",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/gaints_belt.png",
    },
    {
      nombre:"sparring_gloves",
      apiName:"TFT_Item_SparringGloves",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/sparring_gloves.png",
    },
    {
      nombre:"spatula",
      apiName:"TFT_Item_Spatula",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/spatula.png",
    },
    {
      nombre:"frying_pan",
      apiName:"TFT_Item_FryingPan",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/standard/frying_pan.png",
    },
  ]
  const CRAFTEABLE_ITEMS = [
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

  const MATRIZ_ITEMS_CRAFTEABLES = [
    ["Deathblade","Giant Slayer", "Hextech Gunblade", "Spear of Shojin", "Edge of Night", "Bloodthirster", "Sterak's Gage", "Infinity Edge", "Sugarcraft Emblem", "Hunter Emblem"],
    ["Giant Slayer", "Red Buff", "Guinsoo's Rageblade", "Statikk Shiv", "Titan's Resolve", "Runaan's Hurricane", "Nashor's Tooth", "Last Whisper", "Pyro Emblem", "Multistriker Emblem"],
    ["Hextech Gunblade", "Guinsoo's Rageblade", "Rabadon's Deathcap", "Archangel's Staff", "Crownguard", "Ionic Spark", "Morellonomicon", "Jeweled Guantlet", "Portal Emblem", "Mage Emblem"],
    ["Spear of Shojin", "Statikk Shiv", "Archangel's Staff", "Blue Buff", "Protector's Vow", "Adaptive Helm", "Redemption", "Hand of Justice", "Faerie Emblem", "Scholar Emblem"],
    ["Edge of Night", "Titan's Resolve", "Crownguard", "Protector's Vow", "Bramble Vest", "Gargoyle Stoneplate", "Sunfire Cape", "Steadfast Heart", "Frost Emblem", "Bastion Emblem"],
    ["Bloodthirster", "Runaan's Hurricane", "Ionic Spark", "Adaptive Helm", "Gargoyle Stoneplate", "Dragons Claw", "Evenshroud", "Quicksilver", "Witchcraft Emblem", "Preserver Emblem"],
    ["Sterak's Gage","Nashor's Tooth", "Morellonomicon", "Redemption", "Sunfire Cape", "Evenshroud", "Warmog's Armor", "Guardbreaker", "Eldritch Emblem", "Shapeshifter Emblem"],
    ["Infinity Edge", "Last Whisper", "Jeweled Guantlet", "Hand of Justice", "Steadfast Heart", "Quicksilver", "Guardbreaker", "Thieve's Gloves", "Honeymancy Emblem", "Warrior Emblem"],
    ["Sugarcraft Emblem", "Pyro Emblem", "Portal Emblem", "Faerie Emblem", "Frost Emblem", "Witchcraft Emblem", "Eldritch Emblem", "Honeymancy Emblem", "Tactician's Crown", "Tacticians Ring"],
    [ "Hunter Emblem", "Multistriker Emblem", "Mage Emblem", "Scholar Emblem", "Bastion Emblem",  "Preserver Emblem", "Shapeshifter Emblem", "Warrior Emblem", "Tacticians Ring", "Tacticians Scepter"]
  ]

  const OTROS_ITEMS = [
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
      name: "Corona del Monarca Eterno"
  },
  {
      apiName: "TFT12_Item_Faerie_ArmorRadiant",
      img: "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/tft12/tft12_faeriequeenguardarmor_radiant.tft_set12.png",
      name: "Armadura de Devoción Eterna"
  },
  ]

  const ARTEFACTOS = [
    {
      nombre: "Spirit Visage",
      apiName: "TFT4_Item_OrnnAnimaVisage",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft4_ornnitem_tank_t3_spiritvisage.png",
    },
    {
      nombre: "Blighting Jewel",
      apiName: "TFT_Item_Artifact_BlightingJewel",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_blightingjewel.png",
    },
    {
      nombre:"Corrupt Vampiric Scepter",
      apiName:"TFT_Item_Artifact_CursedVampiricScepter",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_cursedvampiricscepter.png",
    },
    {
      nombre:"Death's Defiance",
      apiName:"TFT4_Item_OrnnDeathsDefiance",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft4_ornnitem_fighter_t3_deathsdance.png",
    },
    {
      nombre:"Deathfire Grasp",
      apiName:"TFT9_Item_OrnnDeathfireGrasp",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft9_ornnitem_deathfiregrasp.png",
    },
    {
      nombre:"Eternal Winter",
      apiName:"TFT4_Item_OrnnEternalWinter",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft4_ornnitem_mage_t4_everfrost.png",
    },
    {
      nombre:"Fishbones",
      apiName:"TFT_Item_Artifact_Fishbones",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_fishbones.png",
    },
    {
      nombre:"Forbidden Idol",
      apiName:"TFT_Item_Artifact_ForbiddenIdol",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_forbiddenidol.png",
    },
    {
      nombre:"Gambler's Blade",
      apiName:"TFT7_Item_ShimmerscaleGamblersBlade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft10_gamblersblade.png",
    },
    {
      nombre:"Gold Collector",
      apiName:"TFT4_Item_OrnnTheCollector",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft4_ornnitem_marksman_t3_thecollector.png",
    },
    {
      nombre:"Horizon Focus",
      apiName:"TFT_Item_Artifact_HorizonFocus",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_horizonfocus.png",
    },
    {
      nombre:"Hullcrusher",
      apiName:"TFT9_Item_OrnnHullbreaker",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft9_ornnitem_hullbreaker.png",
    },
    {
      nombre:"Infinity Force",
      apiName:"TFT4_Item_OrnnInfinityForce",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft4_ornnitem_fighter_t4_trinityforce.png",
    },
    {
      nombre:"Innervating Locket",
      apiName:"TFT_Item_Artifact_InnervatingLocket",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_innervatinglocket.png",
    },
    {
      nombre:"Lich Bane",
      apiName:"TFT_Item_Artifact_LichBane",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_lichbane.png",
    },
    {
      nombre:"Lightshield Crest",
      apiName:"TFT_Item_Artifact_LightshieldCrest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_lightshieldcrest.png",
    },
    {
      nombre:"Luden's Tempest",
      apiName:"TFT_Item_Artifact_LudensTempest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_ludenstempest.png",
    },
    {
      nombre:"Manazane",
      apiName:"TFT4_Item_OrnnMuramana",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft4_ornnitem_marksman_t3_muramana.png",
    },
    {
      nombre:"Mittens",
      apiName:"TFT_Item_Artifact_Mittens",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_mittens.png",
    },
    {
      nombre:"Mogul's Mail",
      apiName:"TFT7_Item_ShimmerscaleMogulsMail",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/moguls_mail.png",
    },
    {
      nombre:"Prowler's Claw",
      apiName:"TFT_Item_Artifact_ProwlersClaw",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_prowlersclaw.png",
    },
    {
      nombre:"Rapid Firecannon",
      apiName:"TFT_Item_Artifact_RapidFirecannon",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_rapidfirecannon.png",
    },
    {
      nombre:"Seeker's Armguard",
      apiName:"TFT_Item_Artifact_SeekersArmguard",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_seekersarmguard.png",
    },
    {
      nombre:"Silvermere Dawn",
      apiName:"TFT_Item_Artifact_SilvermereDawn",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_silvermeredawn.png",
    },
    {
      nombre:"Sniper's Focus",
      apiName:"TFT9_Item_OrnnHorizonFocus",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft9_ornnitem_snipersfocus.png",
    },
    {
      nombre:"Spectral Cutlass",
      apiName:"TFT_Item_Artifact_SpectralCutlass",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_spectralcutlass.png",
    },
    {
      nombre:"Suspicious Trench Coat",
      apiName:"TFT_Item_Artifact_SuspiciousTrenchCoat",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_suspicioustrenchcoat.png",
    },
    {
      nombre:"Talisman Of Ascension",
      apiName:"TFT_Item_Artifact_TalismanOfAscension",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_talismanofascension.png",
    },
    {
      nombre:"Trickster's Glass",
      apiName:"TFT9_Item_OrnnTrickstersGlass",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft9_ornnitem_trickstersglass.png",
    },
    {
      nombre:"Unending Despair",
      apiName:"TFT_Item_Artifact_UnendingDespair",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_unendingdespair.png",
    },
    {
      nombre:"Wit's End",
      apiName:"TFT_Item_Artifact_WitsEnd",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_witsend.png",
    },
    {
      nombre:"Zhonya's Paradox",
      apiName:"TFT4_Item_OrnnZhonyasParadox",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft4_ornnitem_mage_t3_zhonyashourglass.png",
    },
  ]

  const ORDENAMIENTO_RADIANTES = [
    ["TFT5_Item_DeathbladeRadiant","TFT5_Item_GiantSlayerRadiant","TFT5_Item_HextechGunbladeRadiant","TFT5_Item_SpearOfShojinRadiant","TFT5_Item_GuardianAngelRadiant","TFT5_Item_BloodthirsterRadiant","TFT5_Item_SteraksGageRadiant","TFT5_Item_InfinityEdgeRadiant"],
    ["TFT5_Item_GiantSlayerRadiant","TFT5_Item_RapidFirecannonRadiant","TFT5_Item_GuinsoosRagebladeRadiant","TFT5_Item_StatikkShivRadiant","TFT5_Item_TitansResolveRadiant","TFT5_Item_RunaansHurricaneRadiant","TFT5_Item_LeviathanRadiant","TFT5_Item_LastWhisperRadiant"],
    ["TFT5_Item_HextechGunbladeRadiant","TFT5_Item_GuinsoosRagebladeRadiant","TFT5_Item_RabadonsDeathcapRadiant","TFT5_Item_ArchangelsStaffRadiant","TFT5_Item_CrownguardRadiant","TFT5_Item_IonicSparkRadiant","TFT5_Item_MorellonomiconRadiant","TFT5_Item_JeweledGauntletRadiant"],
    ["TFT5_Item_SpearOfShojinRadiant","TFT5_Item_StatikkShivRadiant","TFT5_Item_ArchangelsStaffRadiant","TFT5_Item_BlueBuffRadiant","TFT5_Item_FrozenHeartRadiant","TFT5_Item_AdaptiveHelmRadiant","TFT5_Item_RedemptionRadiant","TFT5_Item_HandOfJusticeRadiant"],
    ["TFT5_Item_GuardianAngelRadiant","TFT5_Item_TitansResolveRadiant","TFT5_Item_CrownguardRadiant","TFT5_Item_FrozenHeartRadiant","TFT5_Item_BrambleVestRadiant","TFT5_Item_GargoyleStoneplateRadiant","TFT5_Item_SunfireCapeRadiant","TFT5_Item_NightHarvesterRadiant"],
    ["TFT5_Item_BloodthirsterRadiant","TFT5_Item_RunaansHurricaneRadiant","TFT5_Item_IonicSparkRadiant","TFT5_Item_AdaptiveHelmRadiant","TFT5_Item_GargoyleStoneplateRadiant","TFT5_Item_DragonsClawRadiant","TFT5_Item_SpectralGauntletRadiant","TFT5_Item_QuicksilverRadiant"],
    ["TFT5_Item_SteraksGageRadiant","TFT5_Item_LeviathanRadiant","TFT5_Item_MorellonomiconRadiant","TFT5_Item_RedemptionRadiant","TFT5_Item_SunfireCapeRadiant","TFT5_Item_SpectralGauntletRadiant","TFT5_Item_WarmogsArmorRadiant","TFT5_Item_TrapClawRadiant"],
    ["TFT5_Item_InfinityEdgeRadiant","TFT5_Item_LastWhisperRadiant","TFT5_Item_JeweledGauntletRadiant","TFT5_Item_HandOfJusticeRadiant","TFT5_Item_NightHarvesterRadiant","TFT5_Item_QuicksilverRadiant","TFT5_Item_TrapClawRadiant","TFT5_Item_ThiefsGlovesRadiant"]
  ]
 
  useEffect(()=>{
    var resultado = [];
    MATRIZ_ITEMS_CRAFTEABLES.forEach((fila, x)=>{
      fila.forEach((item, y)=>{
       const busqueda = CRAFTEABLE_ITEMS.find(({nombre})=>{
          return nombre === item
        })
        if(busqueda && itemsCrafteables.length <= 89){
          resultado.push(busqueda)
        }
      })
    })
    setItemsCrafteables(resultado)
  },[])

  function handleDragStart(e){
    e.dataTransfer.setData("item", e.target.getAttribute("data-item"));
    e.dataTransfer.setData("from", e.target.getAttribute("data-from"));
    
}



return (
    <div className={style.containerItems}>
      <div className={style.containerBtn}>
      <button onClick={(e)=>{e.preventDefault();handlePestana(0)}} className={style.btn}>Craftable</button>
      <button onClick={(e)=>{e.preventDefault();handlePestana(1)}} className={style.btn}>Radiants</button>
      <button onClick={(e)=>{e.preventDefault();handlePestana(2)}} className={style.btn}>Emblems</button>
      <button onClick={(e)=>{e.preventDefault();handlePestana(3)}} className={style.btn}>Faerie</button>
      <button onClick={(e)=>{e.preventDefault();handlePestana(4)}} className={style.btn}>Artefacts</button>
      </div>

      <div className={style.containerItemsInfo}>
          {pestana === 0 &&
            BASIC_ITEMS.map((dataItem,index)=>{
            return (
              <div className={style.itemsDrop} key={index}>
                <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(dataItem.apiName)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
              </div>
            )
          })}

          {pestana === 0 &&
            itemsCrafteables.map((dataItem,index)=>{
              return (
              <div className={style.itemsDrop} key={index}>
                <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(dataItem.apiName)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
              </div>)
            })
          }
        </div>

        <div  className={style.containerItemsRadiants}>
          {pestana === 1 &&
          ORDENAMIENTO_RADIANTES.map((filas, index)=>{
            return filas.map((busqueda,index2)=>{
              const resultado = radiantsItems.find(({apiName})=> apiName === busqueda)
              return (
                <div className={style.itemsDropRadiants} key={index2+"-"+index}>
                  <img  src={resultado.img} alt={`Basic Item TFT ${resultado.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(resultado.apiName)}} data-item={JSON.stringify(resultado)} data-from="itemList" draggable="true"></img>
                </div>
              )
            })
          })
           
          }
        </div>

        <div className={style.containerItemsHorizontal}>
          {pestana === 2 &&
            emblems.map((dataItem,index)=>{
              return (
                <div className={style.itemsDropRadiants} key={index}>
                  <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(dataItem.apiName)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
                </div>
              )
            })
          }
        </div>
        <div className={style.containerItemsHorizontal}>
          {pestana === 3 && 
            OTROS_ITEMS.map((dataItem,index)=>{
              return ( 
              <div className={style.itemsDropRadiants} key={`otrosItems`+index}>
                <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(dataItem.apiName)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
              </div>)
            })
          }
        </div>

        <div className={style.containerItemsHorizontal}>
          {pestana === 4 && 
            ARTEFACTOS.map((dataItem,index)=>{
              return ( 
              <div className={style.itemsDropRadiants} key={`otrosItems`+index}>
                <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(dataItem.apiName)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
              </div>)
            })
          }
        </div>
        <div className={style.tooltip}>
          {tooltip ?
            <div className={style.tooltipContainer}>
              <div className={style.tooltipContainerImg}>
                <img className={style.tooltipImg} src={"https://raw.communitydragon.org/latest/game/" + tooltip.icon.toLowerCase().replace(".tex",".png")}></img>
                {tooltip.composition.length === 2 && 
                  <div className={style.tooltipContainerComponents}>
                    <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + itemsDataIngles.find(({apiName})=>apiName === tooltip.composition[0]).icon.toLowerCase().replace(".tex",".png")}></img>
                    +
                    <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + itemsDataIngles.find(({apiName})=>apiName === tooltip.composition[1]).icon.toLowerCase().replace(".tex",".png")}></img>
                  </div>
                }
              </div>
              <div className={style.tooltipContainerText}>
                <span className={style.tooltipContainerTextTitle}>{tooltip.name}</span>
                <span className={style.tooltipContainerDesc}>{(new DOMParser()).parseFromString(tooltip.desc, "text/html").body.innerText}</span>
                {Object.keys(tooltip.effects).map((key, index)=>{
                  return (
                    <span key={index} className={style.tooltipContainerEffects}>
                      <span>{key} : {tooltip.effects[key]}</span>
                    </span>
                  )
                })}
              </div>
              
            </div>
            : 
            <div className={style.tooltipContainer}>
              <div className={style.tooltipContainerImg}>
                <img className={style.tooltipImg} src={"https://raw.communitydragon.org/latest/game/" + primerItem.icon.toLowerCase().replace(".tex",".png")}></img>
                {primerItem.composition.length === 2 && 
                  <div className={style.tooltipContainerComponents}>
                    <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + itemsDataIngles.find(({apiName})=>apiName === primerItem.composition[0]).icon.toLowerCase().replace(".tex",".png")}></img>
                    +
                    <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + itemsDataIngles.find(({apiName})=>apiName === primerItem.composition[1]).icon.toLowerCase().replace(".tex",".png")}></img>
                  </div>
                }
              </div>
              <div className={style.tooltipContainerText}>
                <span className={style.tooltipContainerTextTitle}>{primerItem.name}</span>
                <span className={style.tooltipContainerDesc}>{(new DOMParser()).parseFromString(primerItem.desc, "text/html").body.innerText}</span>
                {Object.keys(primerItem.effects).map((key, index)=>{
                  return (
                    <span key={index} className={style.tooltipContainerEffects}>
                      <span>{key} : {primerItem.effects[key]}</span>
                    </span>
                  )
                })}
              </div>
              
            </div>
          }
        </div>
    </div>
  )
}

export default Items;