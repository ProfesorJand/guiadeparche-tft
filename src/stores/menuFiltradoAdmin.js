import {atom, deepMap, task} from "nanostores";

export const defaultAction = atom("crear")

export const updateAction = (action)=>{
  defaultAction.set(action)
}

const AdminMenus = {
  COMPOSICIONESTFT:1
}

export const loadCompsMeta = ()=>{
  task(async()=>{
    const urlMeta = "https://tft.guiadeparche.com/tftdata/Set12/composMeta.json"
    const responde = await fetch(urlMeta);
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
    updateMetaComps(sortableArray)
  })
}

export const updateMetaComps = (data)=>{
  return data
}

export const handlerfilterMetaComp = (action)=>{
  console.log(action)
  initialStateMetaCompFilter.set({...initialStateMetaCompFilter.get(),[action]:!initialStateMetaCompFilter.get()[action]})
}

export const initialStateMetaCompFilter = deepMap({
  fast8:true,
  reroll:true,
  specificAugment:true
})