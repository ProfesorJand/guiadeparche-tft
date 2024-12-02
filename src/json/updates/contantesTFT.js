export const VERSION_LATEST = "latest";
export const VERSION_PBE = "pbe";
export const IDIOMA_DEFAULT = "en"; //en
export const PAIS_DEFAULT = "us"; //mx /es /gb /us
export const SET_LATEST = "13";
export const SET_PBE = SET_LATEST + 1;

export async function fetchingDataTFT({version=VERSION_LATEST, idioma=IDIOMA_DEFAULT, pais=PAIS_DEFAULT}){
  try {
      const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
      const fetching = await fetch(urlDragon, {cache:"reload"});
      const response = await fetching.json();
      return response //items, setData, sets
  } catch (error) {
      throw new Error('fetchingDataTFT');
  }
  
}

const GET_LAST_VERSION_NUMBER = async (version=VERSION_LATEST)=> {
  return (await fetchingLatestVersionTFT(version)).version.split(".")
};
export const latestVersion = GET_LAST_VERSION_NUMBER[0] + "." + GET_LAST_VERSION_NUMBER[1];

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

export const datosTFTIngles = await fetchingDataTFT({version:"latest",idioma:"en",pais:"us"});
export const championsTFTIngles = await datosTFTIngles.sets[SET_LATEST].champions;
export const itemsDataIngles = await datosTFTIngles.items;
console.log(itemsDataIngles)

export const fetchMeta = await fetch(`https://guiadeparche.com/tftdata/Set12/metaTFTComposiciones.json`, {cache:"reload"});
export const meta = await fetchMeta.json();

