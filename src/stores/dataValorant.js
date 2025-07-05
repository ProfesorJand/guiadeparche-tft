import { deepMap, atom, task } from "nanostores";

const iniAgentsByMapMeta = {}

export const ValorantAgentsMeta = deepMap(iniAgentsByMapMeta)
export const ValorantConstantes = deepMap(iniAgentsByMapMeta)

export const fetchAgentsMeta = async ()=>{
  try{
    const token = import.meta.env.PUBLIC_TOKEN_META;
    const url = "https://api.guiadeparche.com/val/AgentsMeta.json";
    const response = await fetch(url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });
    const data = await response.json();
    ValorantAgentsMeta.set(data);
    return data;
  }catch(err){
    console.error("Error fetching champions meta data:", err);
    throw err;
  }
}

export const fetchConstantesValorant = async ()=>{
  task(
    async ()=>{
      try{
        const token = import.meta.env.PUBLIC_TOKEN_META;
        const url = "https://api.guiadeparche.com/val/constantes.json";
        const response = await fetch(url,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache"
          }
        });
        const data = await response.json();
        ValorantConstantes.set(data);
        return data;
      }catch(err){
        console.error("Error fetching champions meta data:", err);
        throw err;
      }
    }
  )
}

fetchConstantesValorant()