import {atom, deepMap, task} from "nanostores";

export const defaultAction = atom("crear")

export const updateAction = (action)=>{
  defaultAction.set(action)
}

const hierarchy = ["S","A","B","C","D","MEME"];

export const loadCompsMeta = ()=>{
  task(async()=>{
    const urlMeta = "https://guiadeparche.com/tftdata/Set12/composMeta.json"
    const responde = await fetch(urlMeta,{cache:"reload"});
    const data = await responde.json()
    const sortableArray =  Object.keys(data).map((tier,i)=>{
      const testing = data[tier].sort((a,b)=>{
        if(a.posicion < b.posicion){
          return -1
        }
        if(a.posicion > b.posicion){
          return 1
        }
        return 0
      })
      return testing
    }).sort((a,b)=>{
        if(hierarchy.indexOf(a[0].tier) > hierarchy.indexOf(b[0].tier)){
          return 1
        }
        if(hierarchy.indexOf(a[0].tier) < hierarchy.indexOf(b[0].tier)){
          return -1
        }
        return 0
    })
    initialStateMetaComps.set(sortableArray);
    MetaComps.set(sortableArray)
  })
}

export const initialStateMetaComps = deepMap([])
export const MetaComps = deepMap([])

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

export const filterByCategory = ()=>{
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
  console.log(newMeta)
  MetaComps.set(newMeta)
}


