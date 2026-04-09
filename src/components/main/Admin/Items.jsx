import React, {useEffect, useState} from "react";
import style from "./css/Items.module.css";
import { versionTFT, dataTFTSetData, dataTFTItemsBySet, dataTFTAllItems, apiNamesCrafteableItems, AllCraftableItems, setNumberPBE, setNumberLatest, AllBasicItems } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
export const Items = ()=>{
  const version = useStore(versionTFT);

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
  const allItemsApiNames = useStore(dataTFTItemsBySet);
  const allItemsInfo = useStore(dataTFTAllItems);
  const [allEmblemsItemsApiNames, setAllEmblemsItemsApiName] = useState(null);
  const [allSupportsItems, setAllSupportsItems] = useState(null)
  const [allChemBaronItems, setAllChemBaronItems] = useState(null)
  const [allChemtechItems, setAllChemtechItems] = useState(null)
  const [allGarenModItems, setAllGarenModItems] = useState(null);
  const [allBilgewaterItems, setAllBilgewaterItems] = useState(null);
  const [allVoidItems, setAllVoidItems] = useState(null);
  //const [allCraftableItems, setAllCraftableItems] = useState(null);
  const [MatrixCraftableItems, setMatrixCraftableItems] = useState([]);
  useEffect(()=>{
    const getAllItems = async ()=>{
      const apiNames = apiNamesCrafteableItems();
      console.log({allEmblemsItemsApiName: allItemsApiNames.filter((apiName)=>{
        return apiName.includes("EmblemItem")
      })})
      setAllEmblemsItemsApiName(allItemsApiNames.filter((apiName)=>{
        return apiName.includes("EmblemItem")
      }))
      setAllBilgewaterItems(allItemsApiNames.filter((apiName)=>{
        const listaBilgewaterItemsBaneados = [
          "TFT16_Item_Bilgewater_HealthTier1",
          "TFT16_Item_Bilgewater_HealthTier2",
          "TFT16_Item_Bilgewater_HealthTier3",
          "TFT16_Item_Bilgewater_ADAPTier1",
          "TFT16_Item_Bilgewater_ADAPTier2",
          "TFT16_Item_Bilgewater_ADAPTier3",
          "TFT16_Item_Bilgewater_APTier1",
          "TFT16_Item_Bilgewater_APTier2",
          "TFT16_Item_Bilgewater_APTier3",
          "TFT16_Item_Bilgewater_ASTier1",
          "TFT16_Item_Bilgewater_ASTier2",
          "TFT16_Item_Bilgewater_ASTier3",
          "TFT16_Item_Bilgewater_ADTier1",
          "TFT16_Item_Bilgewater_ADTier2",
          "TFT16_Item_Bilgewater_ADTier3",
          "TFT16_Item_Bilgewater_ArmorMRTier1",
          "TFT16_Item_Bilgewater_ArmorMRTier2",  
          "TFT16_Item_Bilgewater_ArmorMRTier3",
          "TFT16_Item_Bilgewater_FirstFreeADAP",
          "TFT16_Item_Bilgewater_FirstFreeArmorMR",
          "TFT16_Item_Bilgewater_FirstFreeAS",
          "TFT16_Item_Bilgewater_FirstFreeHealth",
        ]
        if(listaBilgewaterItemsBaneados.includes(apiName)){
          return false;
        }
        return apiName.includes("TFT16_Item_Bilgewater_");
      }))
      setAllVoidItems(allItemsInfo.filter(({apiName})=>{
        return apiName.includes("TFT16_Consumable_Void_");
      }))
      setAllSupportsItems(allItemsInfo.filter(({apiName})=>{
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
      setAllChemBaronItems(allItemsInfo.filter(({apiName})=>{
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
      setAllChemtechItems(allItemsInfo.filter(({apiName})=>{
        const apiNameOfChemtechItems = [
          "TFT14_JaxCyberneticItem",
          "TFT14_NaafiriCyberneticItem",
          "TFT14_JhinCyberneticItem",
          "TFT14_MordekaiserCyberneticItem",
          "TFT14_VarusCyberneticItem",
          "TFT14_SejuaniCyberneticItem",
          "TFT14_ZeriCyberneticItem",
          "TFT14_JaxCyberneticItem_Radiant",
          "TFT14_NaafiriCyberneticItem_Radiant",
          "TFT14_JhinCyberneticItem_Radiant",
          "TFT14_MordekaiserCyberneticItem_Radiant",
          "TFT14_VarusCyberneticItem_Radiant",
          "TFT14_SejuaniCyberneticItem_Radiant",
          "TFT14_ZeriCyberneticItem_Radiant",
        ]
        return apiNameOfChemtechItems.some((item) => item === apiName);
      })) 
      setAllGarenModItems(allItemsInfo.filter(({apiName})=>{
        return apiName.includes("NetGodItem");
      })) 
    }
    getAllItems();
  },[allItemsApiNames])

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
  const BASIC_ITEMS = AllBasicItems(allItemsInfo);

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
      apiName:"TFT_Item_Artifact_TheIndomitable"
    },
    {apiName: "TFT_Item_Artifact_NavoriFlickerblades"},
    {apiName: "TFT_Item_Artifact_StatikkShiv"},
    {apiName: "TFT_Item_Artifact_TitanicHydra"},
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
  ];
  const ARTEFACTOSPBE = [
    ...ARTEFACTOS,
    {
      nombre: "Dawncore",
      apiName: "TFT_Item_Artifact_Dawncore",
      img: "https://raw.communitydragon.org/pbe/game/assets/maps/tft/icons/items/hexcore/tft_item_artifact_dawncore.tft_set15.png",
    }
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
 

  useEffect(() => {
    setMatrixCraftableItems(AllCraftableItems(allItemsInfo));
  }, [allItemsInfo]);

  function handleDragStart(e) {
    e.dataTransfer.setData("item", e.target.getAttribute("data-item"));
    e.dataTransfer.setData("from", e.target.getAttribute("data-from"));
  }

  if (allItemsInfo) {
    return (
      <div className={style.containerItems}>
        <div className={style.containerBtn}>
          <button onClick={(e) => { e.preventDefault(); handlePestana(0) }} className={style.btn}>Craftable</button>
          <button onClick={(e) => { e.preventDefault(); handlePestana(1) }} className={style.btn}>Radiants</button>
          <button onClick={(e) => { e.preventDefault(); handlePestana(2) }} className={style.btn}>Emblems</button>
          <button onClick={(e) => { e.preventDefault(); handlePestana(3) }} className={style.btn}>{version === "pbe" ? "Bilgewater" : "Bilgewater"}</button>
          <button onClick={(e) => { e.preventDefault(); handlePestana(4) }} className={style.btn}>Artefacts</button>
          <button onClick={(e) => { e.preventDefault(); handlePestana(5) }} className={style.btn}>Supports</button>
          <button onClick={(e) => { e.preventDefault(); handlePestana(6) }} className={style.btn}>{version === "pbe" ? "Garen Mod" : "ChemBaron"}</button>
        </div>

        <div className={style.containerItemsInfo}>
          {pestana === 0 &&
            BASIC_ITEMS.map((dataItem, index) => {
              return (
                <div className={style.itemsDrop} key={index}>
                  <img
                    src={dataItem.icon}
                    alt={`Basic Item TFT ${dataItem.name}`}
                    className={style.imgItems}
                    onDragStart={(e) => { handleDragStart(e) }}
                    onClick={() => { setItemOver(dataItem.apiName) }}
                    data-item={JSON.stringify(dataItem)}
                    data-from="itemList"
                    draggable="true"></img>
                </div>
              )
            })}

          {pestana === 0 &&
            MatrixCraftableItems.length > 0 && MatrixCraftableItems.map((dataItem, index) => {
              if (!dataItem) {
                return <div className={style.itemsDrop} key={index}></div>
              }
              return (
                <div className={style.itemsDrop} key={index}>
                  <img
                    src={dataItem.icon}
                    alt={`Craftable Item TFT ${dataItem.name}`}
                    className={style.imgItems}
                    onDragStart={(e) => { handleDragStart(e) }}
                    onClick={() => { setItemOver(dataItem.apiName) }}
                    data-item={JSON.stringify(dataItem)}
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
                      src={`https://raw.communitydragon.org/${version}/game/`+resultado.icon.replace(".tex",".png").toLowerCase()}
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
                    <img  src={`https://raw.communitydragon.org/${version}/game/`+resultado.icon.replace(".tex",".png").toLowerCase()} alt={`Basic Item TFT ${resultado.name}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(resultado.apiName)}} data-item={JSON.stringify(resultado)} data-from="itemList" draggable="true"></img>
                  </div>
                )
              })
            }
          </div>
          <div className={style.containerItemsHorizontal}>
            {pestana === 3 &&
              allBilgewaterItems.map((dataItem,index)=>{
                const resultado = allItemsInfo.find(({apiName})=> apiName === dataItem)
                return (
                  <div className={style.itemsDropOtros} key={index}>
                    <img  src={`https://raw.communitydragon.org/${version}/game/`+resultado.icon.replace(".tex",".png").toLowerCase()} alt={`Basic Item TFT ${resultado.name}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} onClick={()=>{setItemOver(resultado.apiName)}} data-item={JSON.stringify(resultado)} data-from="itemList" draggable="true"></img>
                  </div>
                )
              })
            }
          </div>
          {/* <div className={style.containerItemsHorizontal}>
            {pestana === 3 && (version === "pbe" ? 
              allChemtechItems.sort(function(a, b){
                if(a.apiName < b.apiName) { return -1; }
                if(a.apiName > b.apiName) { return 1; }
                return 0;
              }).map((dataItem,index)=>{
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                  src={dataItem?.img || `https://raw.communitydragon.org/${version}/game/`+dataItem.icon.replace(".tex",".png").toLowerCase()}
                  alt={`Chem Baron Item TFT ${dataItem.name}`}
                  className={style.imgItems}
                  onDragStart={(e)=>{handleDragStart(e)}}
                  onClick={()=>{setItemOver(dataItem.apiName)}}
                  data-item={JSON.stringify(dataItem)} //allItemsInfo.find(({apiName})=>apiName === dataItem.apiName)
                  data-from="itemList"
                  draggable="true"></img>
                </div>)
              })
            :
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
              }))
            }
          </div> */}
  
          <div className={style.containerItemsHorizontalOtros}>
            {pestana === 4 && 
              (version === "pbe" ? ARTEFACTOSPBE : ARTEFACTOS).map((dataItem,index)=>{
                const dataItemInfo = allItemsInfo.find(({apiName})=>{
                  return dataItem.apiName === apiName
                })
                if (!dataItemInfo) return null; // Evita el error
                const img = `https://raw.communitydragon.org/${version}/game/${dataItemInfo?.icon.replace(".tex",".png").toLowerCase()}`
                dataItemInfo.img = img
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                  src={dataItemInfo?.img}
                  alt={`Basic Item TFT ${dataItemInfo.name}`}
                  className={style.imgItems}
                  onDragStart={(e)=>{handleDragStart(e)}}
                  onClick={()=>{setItemOver(dataItemInfo.apiName)}}
                  data-item={JSON.stringify(dataItemInfo)}
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
                  src={dataItem?.img || `https://raw.communitydragon.org/${version}/game/`+dataItem.icon.replace(".tex",".png").toLowerCase()}
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
            {pestana === 6 && (version === "pbe" ? 
              allGarenModItems.sort(function(a, b){
                if(a.apiName < b.apiName) { return -1; }
                if(a.apiName > b.apiName) { return 1; }
                return 0;
              }).map((dataItem,index)=>{
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                  src={dataItem?.img || `https://raw.communitydragon.org/${version}/game/`+dataItem.icon.replace(".tex",".png").toLowerCase()}
                  alt={`Chem Baron Item TFT ${dataItem.name}`}
                  className={style.imgItems}
                  onDragStart={(e)=>{handleDragStart(e)}}
                  onClick={()=>{setItemOver(dataItem.apiName)}}
                  data-item={JSON.stringify(dataItem)} //allItemsInfo.find(({apiName})=>apiName === dataItem.apiName)
                  data-from="itemList"
                  draggable="true"></img>
                </div>)
              })
            :
              allChemBaronItems.sort(function(a, b){
                if(a.apiName < b.apiName) { return -1; }
                if(a.apiName > b.apiName) { return 1; }
                return 0;
              }).map((dataItem,index)=>{
                return ( 
                <div className={style.itemsDropOtros} key={`otrosItems`+index}>
                  <img 
                  src={dataItem?.img || `https://raw.communitydragon.org/${version}/game/`+dataItem.icon.replace(".tex",".png").toLowerCase()}
                  alt={`Chem Baron Item TFT ${dataItem.name}`}
                  className={style.imgItems}
                  onDragStart={(e)=>{handleDragStart(e)}}
                  onClick={()=>{setItemOver(dataItem.apiName)}}
                  data-item={JSON.stringify(dataItem)} //allItemsInfo.find(({apiName})=>apiName === dataItem.apiName)
                  data-from="itemList"
                  draggable="true"></img>
                </div>)
              }))
            }
          </div>
          <div className={style.tooltip}>
            {tooltip ?
              <div className={style.tooltipContainer}>
                <div className={style.tooltipContainerImg}>
                  <img className={style.tooltipImg} src={`https://raw.communitydragon.org/${version}/game/` + tooltip.icon.toLowerCase().replace(".tex",".png")}></img>
                  {tooltip.composition.length === 2 && 
                    <div className={style.tooltipContainerComponents}>
                      <img className={style.tooltipImgComponent} src={`https://raw.communitydragon.org/${version}/game/` + allItemsInfo.find(({apiName})=>apiName === tooltip.composition[0]).icon.toLowerCase().replace(".tex",".png")}></img>
                      +
                      <img className={style.tooltipImgComponent} src={`https://raw.communitydragon.org/${version}/game/` + allItemsInfo.find(({apiName})=>apiName === tooltip.composition[1]).icon.toLowerCase().replace(".tex",".png")}></img>
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