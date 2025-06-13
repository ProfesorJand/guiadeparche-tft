import { metaTFTComposicionesJSON } from "@stores/dataTFT";

export const VERSION_LATEST = "latest";
export const VERSION_PBE = "pbe";
export const IDIOMA_DEFAULT = "en"; //en
export const PAIS_DEFAULT = "us"; //mx /es /gb /us
export const SET_LATEST = "13";
export const SET_PBE = (Number(SET_LATEST) + 1).toString();

export async function fetchingDataTFT({version=VERSION_LATEST, idioma=IDIOMA_DEFAULT, pais=PAIS_DEFAULT}){
  try {
      const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
      const fetching = await fetch(urlDragon);
      const response = await fetching.json();
      return response //items, setData, sets
  } catch (error) {
      throw new Error('fetchingDataTFT');
  }
  
}

const GET_LAST_VERSION_NUMBER = async (version=VERSION_LATEST)=> {
  const resultado = await fetchingLatestVersionTFT(version);
  const getVersion= resultado?.version.split(".")
  return getVersion[0] + "." +  getVersion[1]
};
export const latestVersion = GET_LAST_VERSION_NUMBER()

export async function fetchingLatestVersionTFT(version=VERSION_LATEST){
  const urlDragon = `https://raw.communitydragon.org/${version}/content-metadata.json`
  const fetching = await fetch(urlDragon, {cache:"reload"});
  return await fetching.json();
}

export const championsTFT = async ({
  version=VERSION_LATEST,
  idioma=IDIOMA_DEFAULT,
  pais=PAIS_DEFAULT,
  set=SET_LATEST}) => 
  (await fetchingDataTFT({version, idioma, pais})).sets[set].champions;
  
export const sinergiasData = async ({
  version=VERSION_LATEST,
  idioma=IDIOMA_DEFAULT,
  pais=PAIS_DEFAULT,
  set=SET_LATEST}) =>
  (await fetchingDataTFT({version, idioma, pais})).sets[set].traits;
    
export const itemsData =  async ({
  version=VERSION_LATEST,
  idioma=IDIOMA_DEFAULT,
  pais=PAIS_DEFAULT}) =>
  (await fetchingDataTFT({version, idioma, pais})).items;

// augments champions traits items by Set  
export const getDataTFTBySet = async ({
  set=SET_LATEST,
  version=VERSION_LATEST,
  idioma=IDIOMA_DEFAULT,
  pais=PAIS_DEFAULT}) => {
    const data = await fetchingDataTFT({ version, idioma, pais });

    if (!data || !data.setData) {
      console.error("La respuesta de fetchingDataTFT no contiene setData:", data);
      return null;
    }
    const setData = data.setData.find(({ number, mutator }) => number === set || mutator === `TFTSet${set}`)
    const setInfo = data.items;
    return {setData, setInfo};
}

export async function datosTFTIngles({version=VERSION_PBE,idioma="en",pais="us"}){ //version latest
  return await fetchingDataTFT({version,idioma,pais})
}; 

export async function championsTFTIngles({version=VERSION_PBE, set=SET_PBE}) {
  return (await datosTFTIngles({version})).sets[set].champions; // SET_LATEST 
}

export const traitsTFTIngles = (await datosTFTIngles({})).sets[SET_PBE].traits; // SET_LATEST
export const itemsDataIngles = (await datosTFTIngles({})).items;

export const fetchMeta = await fetch(metaTFTComposicionesJSON, {cache:"reload"});
export const meta = await fetchMeta.json();

