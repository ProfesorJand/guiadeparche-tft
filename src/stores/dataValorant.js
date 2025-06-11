import { deepMap, atom, task } from "nanostores";

const iniAgentsByMapMeta = {}

export const ValorantAgentsMeta = deepMap(iniAgentsByMapMeta)

export const fetchAgentsMeta = async ()=>{
  try{
    const token = import.meta.env.PUBLIC_TOKEN_META;
    console.log("Fetching agents meta data with token:", token);
    const url = "https://guiadeparche.com/val/AgentsMeta.json";
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

