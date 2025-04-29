import {atom, deepMap, task} from "nanostores";
import backupMeta from "src/json/backupMeta.json" assert { type: 'json' };
import {versionTFT} from "@stores/dataTFT";

export const defaultAction = atom("crear")

export const updateAction = (action)=>{
  defaultAction.set(action)
}

const hierarchy = ["S","A","B","C","D","MEME"];
const hierarchyShadowCategory = ["Fast 8","3 Stars","Specifics Augments"];
export const isLoadingDataTFTFromApi = atom(true)

export const loadCompsMeta = async () => {

  //const urlMeta = "https://guiadeparche.com/tftdata/Set12/composMeta.json";
  const urlMetaBackend = versionTFT.get() === "pbe" ?
  "https://guiadeparche.com/tftdata/Set12/composMetaPBE.json"
  :
  "https://guiadeparche.com/tftdata/Set12/composMeta.json";
  
  try {
    const response = await fetch(urlMetaBackend, { cache: "reload" });
    const data = await response.json();
    const sortableArray = Object.keys(data).sort((a,b)=> hierarchy.indexOf(a) - hierarchy.indexOf(b))
      .map((tier) => data[tier].sort((a, b) => a.posicion - b.posicion)
      .sort((a, b) => hierarchyShadowCategory.indexOf(a?.shadowCategory) - hierarchyShadowCategory.indexOf(b?.shadowCategory)))
    // const filteredArray = [...sortableArray]
    // Actualiza el estado global
    initialStateMetaComps.set(sortableArray);
    MetaComps.set(sortableArray);

    return sortableArray; // También retorna los datos
  } catch (err) {
    console.error(err);
    const data = backupMeta;
    const sortableArray =Object.keys(data).sort((a,b)=> hierarchy.indexOf(a) - hierarchy.indexOf(b))
    .map((tier) => data[tier].sort((a, b) => a.posicion - b.posicion)
    .sort((a, b) => hierarchyShadowCategory.indexOf(a?.shadowCategory) - hierarchyShadowCategory.indexOf(b?.shadowCategory)))

    // const filteredArray = sortableArray.map((tier) =>
    //   tier.filter(({ tier: compoTier }) => compoTier === "S" || compoTier === "A")
    // );
    // const filteredArray = [...sortableArray]

    // Actualiza el estado global en caso de error
    initialStateMetaComps.set(sortableArray);
    MetaComps.set(sortableArray);
    return sortableArray;
  }
};


export const initialStateMetaComps = deepMap([])
export const MetaComps = deepMap(null)
export const TierListMetaComps = deepMap([])

export const handlerfilterMetaComp = (action)=>{
  initialStateMetaCompFilter.set({...initialStateMetaCompFilter.get(),[action]:!initialStateMetaCompFilter.get()[action]})
}

export const initialStateMetaCompFilter = deepMap({
  ["Fast 8"]:true,
  ["3 Stars"]:true,
  ["Specifics Augments"]:true,
  ["Easy"]:true,
  ["Medium"]:true,
  ["Hard"]:true,
  ["Tier S"]:true,
  ["Tier A"]:true,
  ["Tier B"]:true,
  ["Tier C"]:true,
  ["Tier D"]:true,
  ["Tier MEME"]:true,
})

export const filterByCategory = (e)=>{
  e.stopPropagation();
  const oldMeta = JSON.parse(JSON.stringify(initialStateMetaComps.get())); 
  const newMeta = oldMeta.map((tier)=>{
    const filters = tier.filter(({shadowCategory, dificultad})=>{
      
      if(initialStateMetaCompFilter.get()["Fast 8"] && shadowCategory === "Fast 8" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["3 Stars"] && shadowCategory === "3 Stars" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Specifics Augments"] && shadowCategory === "Specifics Augments" ){
        return true
      }
      return false
    })
    const filtersDificulty = filters.filter(({dificultad})=>{
      if(initialStateMetaCompFilter.get()["Easy"] && dificultad === "Easy" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Medium"] && dificultad === "Medium" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Hard"] && dificultad === "Hard" ){
        return true
      }
      return false
    })
   
    const filtersTier = filtersDificulty.filter(({tier})=>{
      if(initialStateMetaCompFilter.get()["Tier S"] && tier === "S" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Tier A"] && tier === "A" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Tier B"] && tier === "B" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Tier C"] && tier === "C" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Tier D"] && tier === "D" ){
        return true
      }
      if(initialStateMetaCompFilter.get()["Tier MEME"] && tier === "MEME" ){
        return true
      }
      return false
    })
    
    return filtersTier
  })
  MetaComps.set(newMeta)
}

await loadCompsMeta();


export const getConstantsTFT = async () => {
  const urlMeta = "https://guiadeparche.com/tftdata/Set12/constantes.json";
  try {
    const response = await fetch(urlMeta, { cache:"no-cache" });
    const {MetaCompVersion: version, Streamers} = await response.json();
    MetaCompVersion.set(version)
    console.log({Streamers})
    STREAMERS.set(Streamers)
  }catch(error){

  }
}


export const MetaCompVersion = atom("")
export const STREAMERS = deepMap([{ name: "", platform: "" },])

await getConstantsTFT()