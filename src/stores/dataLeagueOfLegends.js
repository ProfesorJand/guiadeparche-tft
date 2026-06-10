import {deepMap, atom, task} from "nanostores";
//import { cachedFetch } from "../utils/cachedFetch.js";

const initialLanersChampionsMeta = {
  Top: [],
  Jungle: [],
  Mid: [],
  Bot: [],
  Support: []
}

export const lanersChampionsMeta = deepMap(initialLanersChampionsMeta);
export const lolChampions = atom([]);
export const lolItems = atom([]);
export const lolRunes = atom([]);
export const LeagueOfLegendsConstantes = deepMap({})

const urlChampionsData = "https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/champion.json";
const championImgUrlPortrait = (championName) => {
  return `https://cdn.communitydragon.org/latest/champion/${championName}/portrait` 
}
const championImgUrlSquare = (championName) => {
  return `https://cdn.communitydragon.org/latest/champion/${championName}/square`
}
const urlItemsData = "https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/item.json";
const itemImgUrl = (itemId) => {
  return `https://ddragon.leagueoflegends.com/cdn/15.10.1/img/item/${itemId}`
}
const urlRunesData = "https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/runesReforged.json";
const runeImgUrl = (runePath) => {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${runePath}`
}

export const urlPositionLaners = (laner) =>{
  const url = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/";
  const fullUrl = {
    Top: `${url}position-top.svg`,
    Jungle: `${url}position-jungle.svg`,
    Mid: `${url}position-middle.svg`,
    Bot: `${url}position-bottom.svg`,
    Support: `${url}position-utility.svg`
  }
  return fullUrl[laner] || `${url}position-top.svg`;
}
export const fetchChampions = async () => {
  try {
    const response = await fetch(urlChampionsData);
    const data = await response.json();
    const champions = Object.keys(data.data).map((key) => {
      return {
        id: data.data[key].key,
        name: data.data[key].name,
        title: data.data[key].title,
        imagePortrait: championImgUrlPortrait(data.data[key].id),
        imageSquare: championImgUrlSquare(data.data[key].id),
      };
    }
    );
    return champions;
  } catch (e) {
    console.error("Error fetching champions from DDragon:", e);
    throw e;
  }
}
export const fetchItems = async () => {
  try {
    const response = await fetch(urlItemsData);
    const data = await response.json();
    const items = Object.keys(data.data).map((key) => {
      return {
        id: key,
        name: data.data[key].name,
        description: data.data[key].description,
        image: itemImgUrl(data.data[key].image.full),
      };
    }
    );
    return items;
  } catch (e) {
    console.error("Error fetching items from DDragon:", e);
    throw e;
  }
}
export const fetchRunes = async () => {
  try {
    const response = await fetch(urlRunesData);
    const data = await response.json();
    const runes = data.map((rune) => {
      return {
        id: rune.id,
        name: rune.name,
        description: rune.description,
        icon: runeImgUrl(rune.icon.toLowerCase()),
      };
    });
    return runes;
  } catch (e) {
    console.error("Error fetching runes from DDragon:", e);
    throw e;
  }
}

export const fetchChampionsMeta = async () => {
  try {
    const token = import.meta.env.PUBLIC_TOKEN_META;
    const url = "https://api.guiadeparche.com/lol/ChampsMeta.json";
    const response = await fetch(url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });
    const data = await response.json();
    lanersChampionsMeta.set(data);
    return data;
  }catch (error) {
    console.error("Error fetching champions meta data:", error);
    throw error;
  }
}

export const fetchMeta = task(async () => {
  try {
    const champions = await fetchChampions();
    const items = await fetchItems();
    const runes = await fetchRunes();
    await fetchChampionsMeta();

    lolChampions.set(champions || []);
    lolItems.set(items || []);
    lolRunes.set(runes || []);
  } catch (e) {
    console.error("Error in [dataLeagueOfLegends.js] fetchMeta task (League of Legends meta data):", e);
  }
  return;
});

export const fetchConstantesLOL = async ()=>{
  task(
    async ()=>{
      try{
        const token = import.meta.env.PUBLIC_TOKEN_META;
        const url = "https://api.guiadeparche.com/lol/constantes.json";
        const response = await fetch(url,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache"
          }
        });
        const data = await response.json();
        LeagueOfLegendsConstantes.set(data);
        return data;
      }catch(err){
        console.error("Error in [dataLeagueOfLegends.js] fetchConstantesLOL from https://api.guiadeparche.com/lol/constantes.json :", err);
      }
    }
  )
}

fetchConstantesLOL()