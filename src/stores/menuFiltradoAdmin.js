import {atom, deepMap, task} from "nanostores";
import backupMeta from "src/json/backupMeta.json" assert { type: 'json' };
import {composMetaJSON, composMetaPBEJSON, constantesJSON, versionTFT} from "@stores/dataTFT";

export const defaultAction = atom("crear")

export const updateAction = (action)=>{
  defaultAction.set(action)
}

const hierarchy = ["S","A","B","C","D","MEME"];
const hierarchyShadowCategory = ["Fast 8","Fast 9", "3 Stars","Situacional"];
export const isLoadingDataTFTFromApi = atom(true)

export const loadCompsMeta = async () => {
  const urlMetaBackend = versionTFT.get() === "pbe" ? composMetaPBEJSON : composMetaJSON;
  
  const processData = (data) => {
    return Object.keys(data)
      .sort((a, b) => hierarchy.indexOf(a) - hierarchy.indexOf(b))
      .map((tier) => [...data[tier]].sort((a, b) => {
        // En una sola pasada ordenamos por categoría y caso de empate, por posición
        const catDiff = hierarchyShadowCategory.indexOf(a?.shadowCategory) - hierarchyShadowCategory.indexOf(b?.shadowCategory);
        if (catDiff !== 0) return catDiff;
        return a.posicion - b.posicion;
      }));
  };

  try {
    const response = await fetch(urlMetaBackend, { cache: "reload" });
    const data = await response.json();
    const sortableArray = processData(data);
    
    initialStateMetaComps.set(sortableArray);
    MetaComps.set(sortableArray);
    return sortableArray;
  } catch (err) {
    console.error(err);
    const sortableArray = processData(backupMeta);
    
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

export const filterByCategory = (e) => {
  e?.stopPropagation?.();
  
  const filtersState = initialStateMetaCompFilter.get();
  const oldMeta = initialStateMetaComps.get(); // filter() crea un nuevo array, no necesitamos un JSON deep copy
  
  const newMeta = oldMeta.map((tier) => {
    return tier.filter((compo) => {
      // 1. Filtro por Categoría
      const validCategory = (filtersState["Fast 8"] && compo.shadowCategory === "Fast 8") ||
                            (filtersState["3 Stars"] && compo.shadowCategory === "3 Stars") ||
                            (filtersState["Specifics Augments"] && compo.shadowCategory === "Specifics Augments");
      if (!validCategory) return false;

      // 2. Filtro por Dificultad
      const validDifficulty = (filtersState["Easy"] && compo.dificultad === "Easy") ||
                              (filtersState["Medium"] && compo.dificultad === "Medium") ||
                              (filtersState["Hard"] && compo.dificultad === "Hard");
      if (!validDifficulty) return false;

      // 3. Filtro por Tier
      const validTier = (filtersState["Tier S"] && compo.tier === "S") ||
                        (filtersState["Tier A"] && compo.tier === "A") ||
                        (filtersState["Tier B"] && compo.tier === "B") ||
                        (filtersState["Tier C"] && compo.tier === "C") ||
                        (filtersState["Tier D"] && compo.tier === "D") ||
                        (filtersState["Tier MEME"] && compo.tier === "MEME");
      
      return validTier;
    });
  });

  MetaComps.set(newMeta);
};

await loadCompsMeta();


export const getConstantsTFT = async () => {
  try {
    const response = await fetch(constantesJSON, { cache:"no-cache" });
    const {MetaCompVersion: version, Streamers} = await response.json();
    MetaCompVersion.set(version)
    STREAMERS.set(Streamers)
  }catch(error){

  }
}


export const MetaCompVersion = atom("")
export const STREAMERS = deepMap([{ name: "", platform: "" },])

// Store for managing which composition is open across islands
export const activeCompId = atom(null);
export const toggleActiveComp = (id) => {
  if (activeCompId.get() === id) {
    activeCompId.set(null);
  } else {
    activeCompId.set(id);
  }
};

await getConstantsTFT()
