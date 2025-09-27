import { deepMap, task } from "nanostores";

export const Constantes2xko = deepMap({});
export const ChampsMeta2xko = deepMap({});
export const urlSaveMeta2xko = "https://api.guiadeparche.com/2xko/saveMeta2xko.php";
export const urlGetMeta2xko = "https://api.guiadeparche.com/2xko/ChampsMeta.json";
export const urlSaveConstantes2xko = "https://api.guiadeparche.com/2xko/constantes.php";
export const urlGetConstantes2xko = "https://api.guiadeparche.com/2xko/constantes.json";

export const fetchCampeones2xkoMeta = async ()=>{
  try{
    const token = import.meta.env.PUBLIC_TOKEN_META;
    console.log("Fetching 2xko champs meta data with token:");
    const response = await fetch(urlGetMeta2xko,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });
    const data = await response.json();
    ChampsMeta2xko.set(data);
    return data;
  }catch(err){
    console.error("Error fetching champions meta data:", err);
    throw err;
  }
}

export const fetchConstantes2xko = async ()=>{
  task(
    async ()=>{
      try{
        const token = import.meta.env.PUBLIC_TOKEN_META;
        const response = await fetch(urlGetConstantes2xko,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache"
          }
        });
        const data = await response.json();
        Constantes2xko.set(data);
        return data;
      }catch(err){
        console.error("Error fetching champions meta data:", err);
        throw err;
      }
    }
  )
}

fetchConstantes2xko()