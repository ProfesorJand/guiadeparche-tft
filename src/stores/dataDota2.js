import { deepMap, task } from "nanostores";


export const Dota2Constantes = deepMap({});
export const Dota2AgentsMeta = deepMap({})

export const LaneDota2 = [
  "Safe Lane",
  "Mid Lane",
  "Off Lane",
  "Soft Supp",
  "Hard Supp"
]

export const fetchHeroes = async()=> {
  const res = await fetch('https://api.opendota.com/api/heroes');
  const heroes = await res.json();
  return heroes.map(h => ({
    id: h.id,
    name: h.localized_name,
    image: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${h.name.replace('npc_dota_hero_','')}_full.png`
  }));
}

export const fetchHeroesMeta = async ()=>{
  try{
    const token = import.meta.env.PUBLIC_TOKEN_META;
    console.log("Fetching heroes meta data with token:");
    const url = "https://api.guiadeparche.com/dota-2/HeroesMeta.json";
    const response = await fetch(url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });
    const data = await response.json();
    Dota2AgentsMeta.set(data);
    return data;
  }catch(err){
    console.error("Error fetching champions meta data:", err);
    throw err;
  }
}


export const fetchConstantesDota2 = async ()=>{
  task(
    async ()=>{
      try{
        const token = import.meta.env.PUBLIC_TOKEN_META;
        console.log("Fetching constantes Dota 2 data with token:");
        const url = "https://api.guiadeparche.com/dota-2/constantes.json";
        const response = await fetch(url,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache"
          }
        });
        const data = await response.json();
        Dota2Constantes.set(data);
        return data;
      }catch(err){
        console.error("Error fetching champions meta data:", err);
        throw err;
      }
    }
  )
}

fetchConstantesDota2()