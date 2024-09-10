import React, {useEffect, useState} from "react";
import style from "./css/Items.module.css";
import { radiantsItems, emblems } from "src/json/updates/constantesLatest";
const Items = ()=>{
  const [pestana, setPestana] = useState(0);
  const [itemsCrafteables, setItemsCrafteables] = useState([])
  function handlePestana(number){
    setPestana(number)
  }
  const BASIC_ITEMS = [
    {
      nombre:"bf_sword",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bf_sword.png",
    },
    {
      nombre:"recurve_bow",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/recurve_bow.png",
    },
    {
      nombre:"needlessly_large_rod",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/needlessly_large_rod.png",
    },
    {
      nombre:"tear_of_the_goddess",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/tear_of_the_goddess.png",
    },
    {
      nombre:"chain_vest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/chain_vest.png",
    },
    {
      nombre:"negatron_cloak",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/negatron_cloak.png",
    },
    {
      nombre:"gaints_belt",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/gaints_belt.png",
    },
    {
      nombre:"sparring_gloves",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/sparring_gloves.png",
    },
    {
      nombre:"spatula",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/spatula.png",
    },
    {
      nombre:"frying_pan",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/standard/frying_pan.png",
    },
  ]
  const CRAFTEABLE_ITEMS = [
    {
      nombre:"Deathblade",
      apiName:"death_blade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/death_blade.png",
      sinergia:"",
    },
    {
      nombre:"Giant Slayer",
      apiName:"giant_slayer",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/giant_slayer.png",
      sinergia:"",
    },
    {
      nombre:"Hextech Gunblade",
      apiName:"hextech_gunblade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/hextech_gunblade.png",
      sinergia:"",
    },
    {
      nombre:"Spear of Shojin",
      apiName:"spear_of_shojin",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/spear_of_shojin.png",
      sinergia:"",
    },
    {
      nombre:"Edge of Night",
      apiName:"edge_of_night",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/edge_of_night.png",
      sinergia:"",
    },
    {
      nombre:"Bloodthirster",
      apiName:"bloodthirster",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bloodthirster.png",
      sinergia:"",
    },
    {
      nombre:"Sterak's Gage",
      apiName:"steraks_gage",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/steraks_gage.png",
      sinergia:"",
    },
    {
      nombre:"Infinity Edge",
      apiName:"infinity_edge",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/infinity_edge.png",
      sinergia:"",
    },
    {
      nombre:"Sugarcraft Emblem",
      apiName:"sugarcraft_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_sugarcraft.png",
      sinergia:"Sugarcraft",
    },
    {
      nombre:"Hunter Emblem",
      apiName:"TFT12_Item_HunterEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_hunter.png",
      sinergia:"Hunter",
    },
    {
      nombre:"Red Buff",
      apiName:"red_buff",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/redbuff.png",
      sinergia:"",
    },
    {
      nombre:"Guinsoo's Rageblade",
      apiName:"guinsoos_rageblade",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/guinsoos_rageblade.png",
      sinergia:"",
    },
    {
      nombre:"Statikk Shiv",
      apiName:"statikk_shiv",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/statikk_shiv.png",
      sinergia:"",
    },
    {
      nombre:"Titan's Resolve",
      apiName:"titans_resolve",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/titans_resolve.png",
      sinergia:"",
    },
    {
      nombre:"Runaan's Hurricane",
      apiName:"runaans_hurricane",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/runaans_hurricane.png",
      sinergia:"",
    },
    {
      nombre:"Nashor's Tooth",
      apiName:"nashors_tooth",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/nashors_tooth.png",
      sinergia:"",
    },
    {
      nombre:"Last Whisper",
      apiName:"last_whisper",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/last_whisper.png",
      sinergia:"",
    },
    {
      nombre:"Pyro Emblem",
      apiName:"pyro_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_pyro.png",
      sinergia:"Pyro",
    },
    {
      nombre:"Multistriker Emblem",
      apiName:"TFT12_Item_MultistrikerEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_multistriker.png",
      sinergia:"Multistriker",
    },
    {
      nombre:"Rabadon's Deathcap",
      apiName:"rabadons_deathcap",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/rabadons_deathcap.png",
      sinergia:"",
    },
    {
      nombre:"Archangel's Staff",
      apiName:"archangel_staff",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/archangel_staff.png",
      sinergia:"",
    },
    {
      nombre:"Crownguard",
      apiName:"crownguard",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/crownguard.png",
      sinergia:"",
    },
    {
      nombre:"Ionic Spark",
      apiName:"ionic_spark",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/ionic_spark.png",
      sinergia:"",
    },
    {
      nombre:"Morellonomicon",
      apiName:"morellonomicon",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/morellonomicon.png",
      sinergia:"",
    },
    {
      nombre:"Jeweled Guantlet",
      apiName:"jeweled_guantlet",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/jeweled_guantlet.png",
      sinergia:"",
    },
    {
      nombre:"Portal Emblem",
      apiName:"portal_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_portal.png",
      sinergia:"Portal",
    },
    {
      nombre:"Mage Emblem",
      apiName:"TFT12_Item_MageEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_mage.png",
      sinergia:"Mage",
    },
    {
      nombre:"Blue Buff",
      apiName:"blue_buff",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/blue_buff.png",
      sinergia:"",
    },
    {
      nombre:"Protector's Vow",
      apiName:"protectors_vow",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/winters_approach.png",
      sinergia:"",
    },
    {
      nombre:"Adaptive Helm",
      apiName:"adaptive_helm",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/adaptive_helm.png",
      sinergia:"",
    },
    {
      nombre:"Redemption",
      apiName:"redemption",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/redemption.png",
      sinergia:"",
    },
    {
      nombre:"Hand of Justice",
      apiName:"hand_of_justice",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/hand_of_justice.png",
      sinergia:"",
    },
    {
      nombre:"Faerie Emblem",
      apiName:"faerie_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_faerie.png",
      sinergia:"Faerie",
    },
    {
      nombre:"Scholar Emblem",
      apiName:"TFT12_Item_ScholarEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_scholar.png",
      sinergia:"Scholar",
    },
    {
      nombre:"Bramble Vest",
      apiName:"bramble_vest",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/bramble_vest.png",
      sinergia:"",
    },
    {
      nombre:"Gargoyle Stoneplate",
      apiName:"gargoyle_stoneplate",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/gargoyle_stoneplate.png",
      sinergia:"",
    },
    {
      nombre:"Sunfire Cape",
      apiName:"sunfire_cape",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/sunfire_cape.png",
      sinergia:"",
    },
    {
      nombre:"Steadfast Heart",
      apiName:"steadfast_heart",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/behemoth.png",
      sinergia:"",
    },
    {
      nombre:"Frost Emblem",
      apiName:"frost_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_frost.png",
      sinergia:"Frost",
    },
    {
      nombre:"Bastion Emblem",
      apiName:"TFT12_Item_BastionEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_bastion.png",
      sinergia:"Bastion",
    },
    {
      nombre:"Dragons Claw",
      apiName:"dragons_claw",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/dragons_claw.png",
      sinergia:"",
    },
    {
      nombre:"Evenshroud",
      apiName:"evenshroud",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/evenshroud.png",
      sinergia:"",
    },
    {
      nombre:"Quicksilver",
      apiName:"quicksilver",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/quicksilver.png",
      sinergia:"",
    },
    {
      nombre:"Witchcraft Emblem",
      apiName:"witchcraft_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_witchcraft.png",
      sinergia:"Witchcraft",
    },
    {
      nombre:"Preserver Emblem",
      apiName:"TFT12_Item_PreserverEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_preserver.png",
      sinergia:"Preserver",
    },
    {
      nombre:"Warmog's Armor",
      apiName:"warmogs_armor",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/warmogs_armor.png",
      sinergia:"",
    },
    {
      nombre:"Guardbreaker",
      apiName:"guardbreaker",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/stridebreaker.png",
      sinergia:"",
    },
    {
      nombre:"Eldritch Emblem",
      apiName:"eldritch_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_eldritch.png",
      sinergia:"Eldritch",
    },
    {
      nombre:"Shapeshifter Emblem",
      apiName:"TFT12_Item_ShapeshifterEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_shapeshifter.png",
      sinergia:"Shapeshifter",
    },
    {
      nombre:"Thieve's Gloves",
      apiName:"thieves_gloves",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/thieves_gloves.png",
      sinergia:"",
    },
    {
      nombre:"Honeymancy Emblem",
      apiName:"honeymancy_emblem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_honeymancy.png",
      sinergia:"Witchcraft",
    },
    {
      nombre:"Warrior Emblem",
      apiName:"TFT12_Item_WarriorEmblemItem",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/traits/spatula/set12/tft_set12_emblem_warrior.png",
      sinergia:"Warrior",
    },
    {
      nombre:"Tactician's Crown",
      apiName:"tacticians_crown",
      img:"https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/standard/tacticians_crown.png",
      sinergia:"Witchcraft",
    },
    {
      nombre:"Tacticians Ring",
      apiName:"TFT_Item_TacticiansRing",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/standard/tacticians_ring.png",
      sinergia:"TacticiansRing",
    },
    {
      nombre:"Tacticians Scepter",
      apiName:"TFT_Item_TacticiansScepter",
      img:"https://raw.communitydragon.org/pbe/game/assets/maps/particles/tft/item_icons/standard/tacticians_scepter.png",
      sinergia:"TacticiansScepter",
    },
  ]

  const MATRIZ_ITEMS_CRAFTEABLES = [
    ["Deathblade","Giant Slayer", "Hextech Gunblade", "Spear of Shojin", "Edge of Night", "Bloodthirster", "Sterak's Gage", "Infinity Edge", "Sugarcraft Emblem", "Hunter Emblem"],
    ["Giant Slayer", "Red Buff", "Guinsoo's Rageblade", "Statikk Shiv", "Titan's Resolve", "Runaan's Hurricane", "Nashor's Tooth", "Last Whisper", "Pyro Emblem", "Multistriker Emblem"],
    ["Hextech Gunblade", "Guinsoo's Rageblade", "Rabadon's Deathcap", "Archangel's Staff", "Crownguard", "Ionic Spark", "Morellonomicon", "Jeweled Guantlet", "Portal Emblem", "Mage Emblem"],
    ["Spear of Shojin", "Statikk Shiv", "Archangel's Staff", "Blue Buff", "Protector's Vow", "Adaptive Helm", "Redemption", "Hand of Justice", "Faerie Emblem", "Scholar Emblem"],
    ["Edge of Night", "Titan's Resolve", "Crownguard", "Protector's Vow", "Bramble Vest", "Gargoyle Stoneplate", "Sunfire Cape", "Steadfast Heart", "Frost Emblem", "Bastion Emblem"],
    ["Bloodthirster", "Runaan's Hurricane", "Ionic Spark", "Adaptive Helm", "Gargoyle Stoneplate", "Dragons Claw", "Evenshroud", "Quicksilver", "Witchcraft Emblem", "Preserver Emblem"],
    ["Sterak's Gage","Nashor's Tooth", "Morellonomicon", "Redemption", "Sunfire Cape", "Evenshroud", "Warmog's Armor", "Guardbreaker", "Eldritch Emblem", "Warrior Emblem"],
    ["Infinity Edge", "Last Whisper", "Jeweled Guantlet", "Hand of Justice", "Steadfast Heart", "Quicksilver", "Guardbreaker", "Thieve's Gloves", "Honeymancy Emblem", "Tacticians Ring"],
    ["Sugarcraft Emblem", "Pyro Emblem", "Portal Emblem", "Faerie Emblem", "Frost Emblem", "Witchcraft Emblem", "Eldritch Emblem", "Honeymancy Emblem", "Tactician's Crown", "Tacticians Scepter"]
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
    console.log(resultado)
    setItemsCrafteables(resultado)
  },[])

  useEffect(()=>{

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
      </div>

      <div className={style.containerItemsInfo}>
          {pestana === 0 &&
            BASIC_ITEMS.map((dataItem,index)=>{
            return (
              <div className={style.itemsDrop} key={index}>
                <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
              </div>
            )
          })}

          {pestana === 0 &&
            itemsCrafteables.map((dataItem,index)=>{
              return (
              <div className={style.itemsDrop} key={index}>
                <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
              </div>)
            })
          }
        </div>

        <div  className={style.containerItemsHorizontal}>
          {pestana === 1 &&
            radiantsItems.map((dataItem,index)=>{
              return (
                <div className={style.itemsDropRadiants} key={index}>
                  <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
                </div>
              )
            })
          }
        </div>

        <div className={style.containerItemsHorizontal}>
          {pestana === 2 &&
            emblems.map((dataItem,index)=>{
              return (
                <div className={style.itemsDropRadiants} key={index}>
                  <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
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
                <img  src={dataItem.img} alt={`Basic Item TFT ${dataItem.nombre}`} className={style.imgItems} onDragStart={(e)=>{handleDragStart(e)}} data-item={JSON.stringify(dataItem)} data-from="itemList" draggable="true"></img>
              </div>)
            })
          }
        </div>

    </div>
  )
}

export default Items;