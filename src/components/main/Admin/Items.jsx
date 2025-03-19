import React, {useEffect, useState} from "react";
import style from "./css/Items.module.css";
import { radiantsItems, emblems } from "src/json/updates/itemsTFT";
import {itemsDataIngles} from "src/json/updates/itemsTFT";
import { getDataTFTBySet, SET_LATEST } from "src/json/updates/contantesTFT";
export const Items = ({version})=>{
  
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
  const [allItemsApiNames, setAllItemsApiNames] = useState(null);
  const [allItemsInfo, setAllItemsInfo] = useState(null);
  const [allEmblemsItemsApiNames, setAllEmblemsItemsApiName] = useState(null);
  const [allSupportsItems, setAllSupportsItems] = useState(null)
  const [allChemBaronItems, setAllChemBaronItems] = useState(null)

  useEffect(()=>{
    const getAllItems = async ()=>{
      setAllItemsApiNames((await getDataTFTBySet({})).setData); //apiName de todos los items del set
      setAllItemsInfo((await getDataTFTBySet({})).setInfo)
      setAllEmblemsItemsApiName((await getDataTFTBySet({})).setData.items.filter((apiName)=>{
        return apiName.includes("EmblemItem")
      }))
      setAllSupportsItems((await getDataTFTBySet({})).setInfo.filter(({apiName})=>{
        const apiNameOfSupportsItems = [
          "TFT_Item_BansheesVeil",
          "TFT_Item_AegisOfTheLegion",
          "TFT_Item_Chalice",
          "TFT_Item_SupportKnightsVow",
          "TFT_Item_LocketOfTheIronSolari",
          "TFT_Item_Moonstone",
          "TFT7_Item_ShimmerscaleHeartOfGold",
          "TFT4_Item_OrnnObsidianCleaver",
          "TFT4_Item_OrnnRanduinsSanctum",
          "TFT_Item_Shroud",
          "TFT_Item_Spite",
          "TFT_Item_EternalFlame",
          "TFT_Item_UnstableTreasureChest",
          "TFT_Item_RadiantVirtue",
          "TFT_Item_ZekesHerald",
          "TFT_Item_Zephyr",
          "TFT5_Item_ZzRotPortalRadiant"
        ]
        return apiNameOfSupportsItems.some((item)=> item.includes(apiName))
      }))
      setAllChemBaronItems((await getDataTFTBySet({})).setInfo.filter(({apiName})=>{
        const apiNameOfChemBaronItems = [
          "TFT13_Crime_Bronze_ChemGrips",
          "TFT13_Crime_Bronze_MageGuard",
          "TFT13_Crime_Bronze_MiningGauntlet",
          "TFT13_Crime_Silver_DestabilizedChemtank",
          "TFT13_Crime_Gold_DestabilizedChemtank",
          "TFT13_Crime_Prismatic_DestabilizedChemtank",
          "TFT13_Crime_Silver_ExecutionersVorpalblade",
          "TFT13_Crime_Gold_ExecutionersVorpalblade",
          "TFT13_Crime_Prismatic_ExecutionersVorpalblade",
          "TFT13_Crime_Silver_FleshRipper",
          "TFT13_Crime_Gold_FleshRipper",
          "TFT13_Crime_Prismatic_FleshRipper",
          "TFT13_Crime_Silver_PiltovenHexplating",
          "TFT13_Crime_Gold_PiltovenHexplating",
          "TFT13_Crime_Prismatic_PiltovenHexplating",
          "TFT13_Crime_Silver_ShimmerBloom",
          "TFT13_Crime_Gold_ShimmerBloom",
          "TFT13_Crime_Prismatic_ShimmerBloom",
          "TFT13_Crime_Silver_UnleashedToxins",
          "TFT13_Crime_Gold_UnleashedToxins",
          "TFT13_Crime_Prismatic_UnleashedToxins",
          "TFT13_Crime_Silver_VirulentVirus",
          "TFT13_Crime_Gold_VirulentVirus",
          "TFT13_Crime_Prismatic_VirulentVirus",
          "TFT13_Crime_Silver_VoltaicSaber",
          "TFT13_Crime_Gold_VoltaicSaber",
          "TFT13_Crime_Prismatic_VoltaicSaber"
        ]
        return apiNameOfChemBaronItems.some((item) => item === apiName);
      }))  
    }
    getAllItems();
  },[])

  useEffect(()=>{
    if(itemOver){
      (async function callApi(){
        const findItem = allItemsInfo.find(({apiName, composition})=>{
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
      apiName:"TFT_Item_Deathblade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/death_blade.png",
      sinergia:"",
      combine:[0,0]
    },
    {
      nombre:"Giant Slayer",
      apiName:"TFT_Item_MadredsBloodrazor",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/giant_slayer.png",
      sinergia:"",
      combine:[0,1]
    },
    {
      nombre:"Hextech Gunblade",
      apiName:"TFT_Item_HextechGunblade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/hextech_gunblade.png",
      sinergia:"",
      combine:[0,2]
    },
    {
      nombre:"Spear of Shojin",
      apiName:"TFT_Item_SpearOfShojin",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/spear_of_shojin.png",
      sinergia:"",
      combine:[0,3]
    },
    {
      nombre:"Edge of Night",
      apiName:"TFT_Item_GuardianAngel",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/edge_of_night_xl.png",
      sinergia:"",
      combine:[0,4]
    },
    {
      nombre:"Bloodthirster",
      apiName:"TFT_Item_Bloodthirster",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bloodthirster.png",
      sinergia:"",
      combine:[0,5]
    },
    {
      nombre:"Sterak's Gage",
      apiName:"TFT_Item_SteraksGage",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/steraksgage_xl.png",
      sinergia:"",
      combine:[0,6]
    },
    {
      nombre:"Infinity Edge",
      apiName:"TFT_Item_InfinityEdge",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/infinity_edge.png",
      sinergia:"",
      combine:[0,7]
    },
    {
      nombre:"Conqueror Emblem",
      apiName:"TFT13_Item_WarbandEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_conqueror.png",
      sinergia:"TFT13_Warband",
      combine:[0,8]
    },
    {
      nombre:"Artillerist Emblem",
      apiName:"TFT13_Item_DemolitionistEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_artillerist.png",
      sinergia:"TFT13_Martialist",
      combine:[0,9]
    },
    {
      nombre:"Red Buff",
      apiName:"TFT_Item_RapidFireCannon",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/redbuff.png",
      sinergia:"",
      combine:[1,1]
    },
    {
      nombre:"Guinsoo's Rageblade",
      apiName:"TFT_Item_GuinsoosRageblade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/guinsoos_rageblade.png",
      sinergia:"",
      combine:[1,2]
    },
    {
      nombre:"Statikk Shiv",
      apiName:"TFT_Item_StatikkShiv",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/statikk_shiv.png",
      sinergia:"",
      combine:[1,3]
    },
    {
      nombre:"Titan's Resolve",
      apiName:"TFT_Item_TitansResolve",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/titans_resolve.png",
      sinergia:"",
      combine:[1,4]
    },
    {
      nombre:"Runaan's Hurricane",
      apiName:"TFT_Item_RunaansHurricane",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/runaans_hurricane.png",
      sinergia:"",
      combine:[1,5]
    },
    {
      nombre:"Nashor's Tooth",
      apiName:"TFT_Item_Leviathan",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/nashorstooth_xl.png",
      sinergia:"",
      combine:[1,6]
    },
    {
      nombre:"Last Whisper",
      apiName:"TFT_Item_LastWhisper",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/last_whisper.png",
      sinergia:"",
      combine:[1,7]
    },
    {
      nombre:"Rebel Emblem",
      apiName:"TFT13_Item_RebelEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_rebel.png",
      sinergia:"TFT13_Rebel",
      combine:[1,8]
    },
    {
      nombre:"Quickstriker Emblem",
      apiName:"TFT13_Item_ChallengerEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_quickstriker.png",
      sinergia:"TFT13_Challenger",
      combine:[1,9]
    },
    {
      nombre:"Rabadon's Deathcap",
      apiName:"TFT_Item_RabadonsDeathcap",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/rabadons_deathcap.png",
      sinergia:"",
      combine:[2,2]
    },
    {
      nombre:"Archangel's Staff",
      apiName:"TFT_Item_ArchangelsStaff",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/archangel_staff.png",
      sinergia:"",
      combine:[2,3]
    },
    {
      nombre:"Crownguard",
      apiName:"TFT_Item_Crownguard",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/crownguard.png",
      sinergia:"",
      combine:[2,4]
    },
    {
      nombre:"Ionic Spark",
      apiName:"TFT_Item_IonicSpark",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/ionic_spark.png",
      sinergia:"",
      combine:[2,5]
    },
    {
      nombre:"Morellonomicon",
      apiName:"TFT_Item_Morellonomicon",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/morellonomicon.png",
      sinergia:"",
      combine:[2,6]
    },
    {
      nombre:"Jeweled Gauntlet", 
      apiName:"TFT_Item_JeweledGauntlet",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/jeweled_guantlet.png",
      sinergia:"",
      combine:[2,7]
    },
    {
      nombre:"Black Rose Emblem",
      apiName:"TFT13_Item_CabalEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_cabal.png",
      sinergia:"TFT13_Cabal",
      combine:[2,8]
    },
    {
      nombre:"Sorcerer Emblem",
      apiName:"TFT13_Item_SorcererEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_sorcerer.png",
      sinergia:"TFT13_Sorcerer",
      combine:[2,9]
    },
    {
      nombre:"Blue Buff",
      apiName:"TFT_Item_BlueBuff",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/blue_buff.png",
      sinergia:"",
      combine:[3,3]
    },
    {
      nombre:"Protector's Vow",
      apiName:"TFT_Item_FrozenHeart",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/winters_approach.png",
      sinergia:"",
      combine:[3,4]
    },
    {
      nombre:"Adaptive Helm",
      apiName:"TFT_Item_AdaptiveHelm",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/adaptive_helm.png",
      sinergia:"",
      combine:[3,5]
    },
    {
      nombre:"Redemption",
      apiName:"TFT_Item_Redemption",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/redemption.png",
      sinergia:"",
      combine:[3,6]
    },
    {
      nombre:"Hand of Justice",
      apiName:"TFT_Item_UnstableConcoction",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/hand_of_justice.png",
      sinergia:"",
      combine:[3,7]
    },
    {
      nombre:"Family Emblem",
      apiName:"TFT13_Item_FamilyEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_family.png",
      sinergia:"TFT13_Family",
      combine:[3,8]
    },
    {
      nombre:"Visionary Emblem",
      apiName:"TFT13_Item_InvokerEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_visionary.png",
      sinergia:"TFT13_Invoker",
      combine:[3,9]
    },
    {
      nombre:"Bramble Vest",
      apiName:"TFT_Item_BrambleVest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bramble_vest.png",
      sinergia:"",
      combine:[4,4]
    },
    {
      nombre:"Gargoyle Stoneplate",
      apiName:"TFT_Item_GargoyleStoneplate",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/gargoyle_stoneplate.png",
      sinergia:"",
      combine:[4,5]
    },
    {
      nombre:"Sunfire Cape",
      apiName:"TFT_Item_RedBuff",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/sunfire_cape.png",
      sinergia:"",
      combine:[4,6]
    },
    {
      nombre:"Steadfast Heart",
      apiName:"TFT_Item_NightHarvester",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/behemoth.png",
      sinergia:"",
      combine:[4,7]
    },
    {
      nombre:"Enforcer Emblem",
      apiName:"TFT13_Item_SquadEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_enforcer.png",
      sinergia:"TFT13_Squad",
      combine:[4,8]
    },
    {
      nombre:"Sentinel Emblem",
      apiName:"TFT13_Item_TitanEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_sentinel.png",
      sinergia:"TFT13_Titan",
      combine:[4,9]
    },
    {
      nombre:"Dragon's Claw",
      apiName:"TFT_Item_DragonsClaw",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/dragons_claw.png",
      sinergia:"",
      combine:[5,5]
    },
    {
      nombre:"Evenshroud",
      apiName:"TFT_Item_SpectralGauntlet",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/support_t4_lunar.png",
      sinergia:"",
      combine:[5,6]
    },
    {
      nombre:"Quicksilver",
      apiName:"TFT_Item_Quicksilver",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/quicksilver.png",
      sinergia:"",
      combine:[5,7]
    },
    {
      nombre:"Automata Emblem",
      apiName:"TFT13_Item_AutomataEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_automata.png",
      sinergia:"TFT13_Hextech",
      combine:[5,8]
    },
    {
      nombre:"Pit Fighter Emblem",
      apiName:"TFT13_Item_PitFighterEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_pitfighter.png",
      sinergia:"TFT13_Pugilist",
      combine:[5,9]
    },
    {
      nombre:"Warmog's Armor",
      apiName:"TFT_Item_WarmogsArmor",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/warmogs_xl.png",
      sinergia:"",
      combine:[6,6]
    },
    {
      nombre:"Guardbreaker",
      apiName:"TFT_Item_PowerGauntlet",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/stridebreaker_xl.png",
      sinergia:"",
      combine:[6,7]
    },
    {
      nombre:"Experiment Emblem",
      apiName:"TFT13_Item_ExperimentEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_experiment.png",
      sinergia:"TFT13_Experiment",
      combine:[6,8]
    },
    {
      nombre:"Bruiser Emblem",
      apiName:"TFT13_Item_BruiserEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_bruiser.png",
      sinergia:"TFT13_Bruiser",
      combine:[6,9]
    },
    {
      nombre:"Thief's Gloves",
      apiName:"TFT_Item_ThiefsGloves",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/thieves_gloves.png",
      sinergia:"",
      combine:[7,7]
    },
    {
      nombre:"Firelight Emblem",
      apiName:"TFT13_Item_HoverboardEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_firelight.png",
      sinergia:"TFT13_Hoverboard",
      combine:[7,8]
    },
    {
      nombre:"Ambusher Emblem",
      apiName:"TFT13_Item_AmbusherEmblemItem",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/traits/spatula/set13/tft_set13_emblem_ambusher.png",
      sinergia:"TFT13_Ambusher",
      combine:[7,9]
    },
    {
      nombre:"Tactician's Crown",
      apiName:"TFT_Item_ForceOfNature",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/tacticians_crown.png",
      sinergia:"tacticians_crown",
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

  const ITEMS_CRAFTEABLES_PBE = CRAFTEABLE_ITEMS.map(item => {
    const replacement = PBE_ITEMS_CRAFTEABLES.find(pbeItem => 
      JSON.stringify(pbeItem.combine) === JSON.stringify(item.combine)
    );
    return replacement ? replacement : item;
  });

  const MatrixSize = 10
  const MATRIZ_ITEMS_CRAFTEABLES_PBE = Array.from({ length: MatrixSize }, () => Array(MatrixSize).fill(null));
  // Llenar la matriz con los apiName según los componentes convertidos en índices

  ITEMS_CRAFTEABLES_PBE.forEach(item => {
    const [comp1, comp2] = item.combine;

    if (comp1 !== undefined && comp2 !== undefined) {
      MATRIZ_ITEMS_CRAFTEABLES_PBE[comp1][comp2] = item.apiName;
      MATRIZ_ITEMS_CRAFTEABLES_PBE[comp2][comp1] = item.apiName; // Reflejar en la posición invertida
    }
  });

  const MATRIZ_ITEMS_CRAFTEABLES = [
    ["Deathblade","Giant Slayer", "Hextech Gunblade", "Spear of Shojin", "Edge of Night", "Bloodthirster", "Sterak's Gage", "Infinity Edge", "Conqueror Emblem", "Artillerist Emblem"],
    ["Giant Slayer", "Red Buff", "Guinsoo's Rageblade", "Statikk Shiv", "Titan's Resolve", "Runaan's Hurricane", "Nashor's Tooth", "Last Whisper", "Rebel Emblem", "Quickstriker Emblem"],
    ["Hextech Gunblade", "Guinsoo's Rageblade", "Rabadon's Deathcap", "Archangel's Staff", "Crownguard", "Ionic Spark", "Morellonomicon", "Jeweled Gauntlet", "Black Rose Emblem", "Sorcerer Emblem"],
    ["Spear of Shojin", "Statikk Shiv", "Archangel's Staff", "Blue Buff", "Protector's Vow", "Adaptive Helm", "Redemption", "Hand of Justice", "Family Emblem", "Visionary Emblem"],
    ["Edge of Night", "Titan's Resolve", "Crownguard", "Protector's Vow", "Bramble Vest", "Gargoyle Stoneplate", "Sunfire Cape", "Steadfast Heart", "Enforcer Emblem", "Sentinel Emblem"],
    ["Bloodthirster", "Runaan's Hurricane", "Ionic Spark", "Adaptive Helm", "Gargoyle Stoneplate", "Dragon's Claw", "Evenshroud", "Quicksilver", "Automata Emblem", "Pit Fighter Emblem"],
    ["Sterak's Gage","Nashor's Tooth", "Morellonomicon", "Redemption", "Sunfire Cape", "Evenshroud", "Warmog's Armor", "Guardbreaker", "Experiment Emblem", "Bruiser Emblem"],
    ["Infinity Edge", "Last Whisper", "Jeweled Gauntlet", "Hand of Justice", "Steadfast Heart", "Quicksilver", "Guardbreaker", "Thief's Gloves", "Firelight Emblem", "Ambusher Emblem"],
    ["Conqueror Emblem", "Rebel Emblem", "Black Rose Emblem", "Family Emblem", "Enforcer Emblem", "Automata Emblem", "Experiment Emblem", "Firelight Emblem", "Tactician's Crown", "Tacticians Ring"],
    ["Artillerist Emblem", "Quickstriker Emblem", "Sorcerer Emblem", "Visionary Emblem", "Sentinel Emblem",  "Pit Fighter Emblem", "Bruiser Emblem", "Ambusher Emblem", "Tacticians Ring", "Tacticians Scepter"]
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
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnanimavisage.tft_set13.png",
    },
    {
      nombre: "Blighting Jewel",
      apiName: "TFT_Item_Artifact_BlightingJewel",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_blightingjewel.tft_set13.png",
    },
    {
      nombre:"Corrupt Vampiric Scepter",
      apiName:"TFT_Item_Artifact_CursedVampiricScepter",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_cursedvampiricscepter.tft_set13.png",
    },
    {
      nombre:"Death's Defiance",
      apiName:"TFT4_Item_OrnnDeathsDefiance",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornndeathsdefiance.tft_set13.png",
    },
    {
      nombre:"Deathfire Grasp",
      apiName:"TFT9_Item_OrnnDeathfireGrasp",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft9_item_ornndeathfiregrasp.tft_set13.png",
    },
    {
      nombre:"Eternal Winter",
      apiName:"TFT4_Item_OrnnEternalWinter",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornneternalwinter.tft_set13.png",
    },
    {
      nombre:"Fishbones",
      apiName:"TFT_Item_Artifact_Fishbones",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_fishbones.tft_set13.png",
    },
    {
      nombre:"Forbidden Idol",
      apiName:"TFT_Item_Artifact_ForbiddenIdol",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_forbiddenidol.tft_set13.png",
    },
    {
      nombre:"Gambler's Blade",
      apiName:"TFT7_Item_ShimmerscaleGamblersBlade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft7_item_shimmerscalegamblersblade.tft_set13.png",
    },
    {
      nombre:"Gold Collector",
      apiName:"TFT4_Item_OrnnTheCollector",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnthecollector.tft_set13.png",
    },
    {
      nombre:"Horizon Focus",
      apiName:"TFT9_Item_OrnnHorizonFocus",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft9_item_ornnhorizonfocus.tft_set13.png",
    },
    {
      nombre:"Hullcrusher",
      apiName:"TFT9_Item_OrnnHullbreaker",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft9_ornnitem_hullbreaker.png", //
    },
    {
      nombre:"Infinity Force",
      apiName:"TFT4_Item_OrnnInfinityForce",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornninfinityforce.tft_set13.png",
    },
    {
      nombre:"Innervating Locket",
      apiName:"TFT_Item_Artifact_InnervatingLocket",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_innervatinglocket.tft_set13.png",
    },
    {
      nombre:"Lich Bane",
      apiName:"TFT_Item_Artifact_LichBane",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_lichbane.png",
    },
    {
      nombre:"Lightshield Crest",
      apiName:"TFT_Item_Artifact_LightshieldCrest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_lightshieldcrest.tft_set13.png",
    },
    {
      nombre:"Luden's Tempest",
      apiName:"TFT_Item_Artifact_LudensTempest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_ludenstempest.tft_set13.png",
    },
    {
      nombre:"Manazane",
      apiName:"TFT4_Item_OrnnMuramana",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnmuramana.tft_set13.png",
    },
    {
      nombre:"Mittens",
      apiName:"TFT_Item_Artifact_Mittens",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_mittens.tft_set13.png",
    },
    {
      nombre:"Mogul's Mail",
      apiName:"TFT7_Item_ShimmerscaleMogulsMail",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft7_item_shimmerscalemogulsmail.tft_set13.png",
    },
    {
      nombre:"Prowler's Claw",
      apiName:"TFT_Item_Artifact_ProwlersClaw",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_prowlersclaw.tft_set13.png",
    },
    {
      nombre:"Rapid Firecannon",
      apiName:"TFT_Item_Artifact_RapidFirecannon",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_rapidfirecannon.tft_set13.png",
    },
    {
      nombre:"Seeker's Armguard",
      apiName:"TFT_Item_Artifact_SeekersArmguard",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_seekersarmguard.tft_set13.png",
    },
    {
      nombre:"Silvermere Dawn",
      apiName:"TFT_Item_Artifact_SilvermereDawn",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_silvermeredawn.tft_set13.png",
    },
    {
      nombre:"Spectral Cutlass",
      apiName:"TFT_Item_Artifact_SpectralCutlass",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_spectralcutlass.tft_set13.png",
    },
    {
      nombre:"Suspicious Trench Coat",
      apiName:"TFT_Item_Artifact_SuspiciousTrenchCoat",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_suspicioustrenchcoat.tft_set13.png",
    },
    {
      nombre:"Talisman Of Ascension",
      apiName:"TFT_Item_Artifact_TalismanOfAscension",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_talismanofascension.tft_set13.png",
    },
    {
      nombre:"Trickster's Glass",
      apiName:"TFT9_Item_OrnnTrickstersGlass",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft9_item_ornntrickstersglass.tft_set13.png",
    },
    {
      nombre:"Unending Despair",
      apiName:"TFT_Item_Artifact_UnendingDespair",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_unendingdespair.tft_set13.png",
    },
    {
      nombre:"Wit's End",
      apiName:"TFT_Item_Artifact_WitsEnd",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_witsend.tft_set13.png",
    },
    {
      nombre:"Zhonya's Paradox",
      apiName:"TFT4_Item_OrnnZhonyasParadox",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/items/hexcore/tft4_item_ornnzhonyasparadox.tft_set13.png",
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

  const SUPPORTS_ITEMS = [];
 
  useEffect(()=>{
    const resultado = [];
    const cualMatriz = version === "pbe" ? MATRIZ_ITEMS_CRAFTEABLES_PBE : MATRIZ_ITEMS_CRAFTEABLES;
    const cualBusqueda =  version === "pbe" ? ITEMS_CRAFTEABLES_PBE  : CRAFTEABLE_ITEMS;
    cualMatriz.forEach((fila, x)=>{
      fila.forEach((item, y)=>{
       const busqueda = cualBusqueda.find(({apiName, nombre})=>{
          return (version === "pbe" ? (apiName === item) : (nombre === item))
        })
        if(busqueda){
          resultado.push(busqueda)
        }
      })
    })
    setItemsCrafteables(resultado)
  },[version])

  function handleDragStart(e){
    e.dataTransfer.setData("item", e.target.getAttribute("data-item"));
    e.dataTransfer.setData("from", e.target.getAttribute("data-from"));
    
}


if(allItemsInfo){

  return (
      <div className={style.containerItems}>
        <div className={style.containerBtn}>
        <button onClick={(e)=>{e.preventDefault();handlePestana(0)}} className={style.btn}>Craftable</button>
        <button onClick={(e)=>{e.preventDefault();handlePestana(1)}} className={style.btn}>Radiants</button>
        <button onClick={(e)=>{e.preventDefault();handlePestana(2)}} className={style.btn}>Emblems</button>
        <button onClick={(e)=>{e.preventDefault();handlePestana(3)}} className={style.btn}>Faerie</button>
        <button onClick={(e)=>{e.preventDefault();handlePestana(4)}} className={style.btn}>Artefacts</button>
        <button onClick={(e)=>{e.preventDefault();handlePestana(5)}} className={style.btn}>Supports</button>
        <button onClick={(e)=>{e.preventDefault();handlePestana(6)}} className={style.btn}>ChemBron</button>
    
        </div>
  
        <div className={style.containerItemsInfo}>
            {pestana === 0 &&
              BASIC_ITEMS.map((dataItem,index)=>{
              return (
                <div className={style.itemsDrop} key={index}>
                  <img 
                  src={dataItem.img} 
                  alt={`Basic Item TFT ${dataItem.nombre}`} 
                  className={style.imgItems} 
                  onDragStart={(e)=>{handleDragStart(e)}} 
                  onClick={()=>{setItemOver(dataItem.apiName)}} 
                  data-item={JSON.stringify(allItemsInfo.find(({apiName})=>{return apiName === dataItem.apiName}))} 
                  data-from="itemList" 
                  draggable="true"></img>
                </div>
              )
            })}
  
            {pestana === 0 &&
              itemsCrafteables.map((dataItem,index)=>{
                return (
                <div className={style.itemsDrop} key={index}>
                  <img 
                    src={dataItem.img}
                    alt={`Basic Item TFT ${dataItem.nombre}`}
                    className={style.imgItems}
                    onDragStart={(e)=>{handleDragStart(e)}}
                    onClick={()=>{setItemOver(dataItem.apiName)}}
                    data-item={JSON.stringify(allItemsInfo.find(({apiName})=>{
                      return apiName === dataItem.apiName
                    }))}
                    data-from="itemList"
                    draggable="true"
                    >
                    </img>
                </div>)
              })
            }
          </div>
  
          <div  className={style.containerItemsRadiants}>
            {pestana === 1 &&
            ORDENAMIENTO_RADIANTES.map((filas, index)=>{
              return filas.map((busqueda,index2)=>{
                const resultado = allItemsInfo.find(({apiName})=> apiName === busqueda)
                return (
                  <div className={style.itemsDropRadiants} key={index2+"-"+index}>
                    <img
                      src={"https://raw.communitydragon.org/latest/game/"+resultado.icon.replace(".tex",".png").toLowerCase()}
                      alt={`Basic Item TFT ${resultado.name}`}
                      className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}}
                      onClick={()=>{setItemOver(resultado.apiName)}}
                      data-item={JSON.stringify(resultado)}
                      data-from="itemList"
                      draggable="true"
                    >
                    </img>
                  </div>
                )
              })
            })
             
            }
          </div>
  
          <div className={style.containerItemsHorizontal}>
            {pestana === 2 &&
              allEmblemsItemsApiNames.map((dataItem,index)=>{
                const resultado = allItemsInfo.find(({apiName})=> apiName === dataItem)
                return (
                  <div className={style.itemsDropOtros} key={index}>
                    <img  src={"https://raw.communitydragon.org/latest/game/"+resultado.icon.replace(".tex",".png").toLowerCase()} alt={`Basic Item TFT ${resultado.name}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(resultado.apiName)}} data-item={JSON.stringify(resultado)} data-from="itemList" draggable="true"></img>
                  </div>
                )
              })
            }
          </div>
          <div className={style.containerItemsHorizontal}>
            {pestana === 3 && 
              OTROS_ITEMS.map((dataItem,index)=>{
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                    src={dataItem.img}
                    alt={`Basic Item TFT ${dataItem.nombre}`}
                    className={style.imgItems}
                    onDragStart={(e)=>{handleDragStart(e)}}
                    onClick={()=>{setItemOver(dataItem.apiName)}}
                    data-item={JSON.stringify(allItemsInfo.find(({apiName})=>{return apiName === dataItem.apiName}))}// 
                    data-from="itemList"
                    draggable="true"></img>
                </div>)
              })
            }
          </div>
  
          <div className={style.containerItemsHorizontalOtros}>
            {pestana === 4 && 
              ARTEFACTOS.map((dataItem,index)=>{
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                  src={dataItem.img}
                  alt={`Basic Item TFT ${dataItem.nombre}`}
                  className={style.imgItems}
                  onDragStart={(e)=>{handleDragStart(e)}}
                  onClick={()=>{setItemOver(dataItem.apiName)}}
                  data-item={JSON.stringify(allItemsInfo.find(({apiName})=>{
                    return apiName === dataItem.apiName
                  }))}
                  data-from="itemList"
                  draggable="true"></img>
                </div>)
              })
            }
          </div>
          <div className={style.containerItemsHorizontalOtros}>
            {pestana === 5 && 
              allSupportsItems.map((dataItem,index)=>{
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                  src={dataItem?.img || "https://raw.communitydragon.org/latest/game/"+dataItem.icon.replace(".tex",".png").toLowerCase()}
                  alt={`Support Item TFT ${dataItem.name}`}
                  className={style.imgItems}
                  onDragStart={(e)=>{handleDragStart(e)}}
                  onClick={()=>{setItemOver(dataItem.apiName)}}
                  data-item={JSON.stringify(dataItem)}
                  data-from="itemList"
                  draggable="true"></img>
                </div>)
              })
            }
          </div>
          <div className={style.containerItemsHorizontalOtros}>
            {pestana === 6 && 
              allChemBaronItems.sort(function(a, b){
                if(a.apiName < b.apiName) { return -1; }
                if(a.apiName > b.apiName) { return 1; }
                return 0;
              }).map((dataItem,index)=>{
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                  src={dataItem?.img || "https://raw.communitydragon.org/latest/game/"+dataItem.icon.replace(".tex",".png").toLowerCase()}
                  alt={`Chem Baron Item TFT ${dataItem.name}`}
                  className={style.imgItems}
                  onDragStart={(e)=>{handleDragStart(e)}}
                  onClick={()=>{setItemOver(dataItem.apiName)}}
                  data-item={JSON.stringify(dataItem)} //allItemsInfo.find(({apiName})=>apiName === dataItem.apiName)
                  data-from="itemList"
                  draggable="true"></img>
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
                      <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + allItemsInfo.find(({apiName})=>apiName === tooltip.composition[0]).icon.toLowerCase().replace(".tex",".png")}></img>
                      +
                      <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + allItemsInfo.find(({apiName})=>apiName === tooltip.composition[1]).icon.toLowerCase().replace(".tex",".png")}></img>
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
                      <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + allItemsInfo.find(({apiName})=>apiName === primerItem.composition[0]).icon.toLowerCase().replace(".tex",".png")}></img>
                      +
                      <img className={style.tooltipImgComponent} src={"https://raw.communitydragon.org/latest/game/" + allItemsInfo.find(({apiName})=>apiName === primerItem.composition[1]).icon.toLowerCase().replace(".tex",".png")}></img>
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
}

export default Items;