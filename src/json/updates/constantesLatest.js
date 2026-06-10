import { metaTFTComposicionesJSON } from "@stores/dataTFT";

export async function fetchingDataTFT({version, idioma, pais}){
    try {
        const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
        const fetching = await fetch(urlDragon, {cache:"reload"});
        const {items, sets} = await fetching.json();
        return {items, sets}
    } catch (error) {
        throw new Error('fetchingDataTFT');
    }
    
}

export const version = "latest";
export const idioma = "en"; //en
export const pais = "us"; //mx /es /gb /us
export const set = "13";
export async function fetchingLatestVersionTFT(){
    const urlDragon = `https://raw.communitydragon.org/${version}/content-metadata.json`
    const fetching = await fetch(urlDragon, {cache:"reload"});
    return await fetching.json();
}

// NOTA PARA EL FUTURO:
// Si quieres volver a requerir el fetch directo sin try-catch (que puede fallar si la red está caída),
// el código original era:
// const latestVersionLog = (await fetchingLatestVersionTFT()).version.split(".");
// export const latestVersion = latestVersionLog[0]+"."+latestVersionLog[1];
let latestVersion = "14.8";
try {
  const latestVersionLog = (await fetchingLatestVersionTFT()).version.split(".");
  latestVersion = latestVersionLog[0]+"."+latestVersionLog[1];
} catch (e) {
  console.error("Error loading latestVersion in constantesLatest.js:", e);
}
export { latestVersion };

// NOTA PARA EL FUTURO:
// Si quieres volver a requerir el fetch directo sin try-catch, el código original era:
// export const datosTFT = await fetchingDataTFT({version,idioma,pais});
// export const championsTFT = await datosTFT.sets[set].champions;
// export const itemsData = await datosTFT.items;
// export const sinergiasData = await datosTFT.sets["13"].traits
let datosTFT = null;
let championsTFT = [];
let itemsData = [];
let sinergiasData = [];
try {
  datosTFT = await fetchingDataTFT({version,idioma,pais});
  championsTFT = datosTFT?.sets?.[set]?.champions || [];
  itemsData = datosTFT?.items || [];
  sinergiasData = datosTFT?.sets?.[set]?.traits || [];
} catch (e) {
  console.error("Error loading datosTFT in constantesLatest.js:", e);
}
export { datosTFT, championsTFT, itemsData, sinergiasData };

// NOTA PARA EL FUTURO:
// Si quieres volver a requerir el fetch directo sin try-catch, el código original era:
// export const datosTFTIngles = await fetchingDataTFT({version:"latest",idioma:"en",pais:"us"});
// export const championsTFTIngles = await datosTFTIngles.sets[set].champions;
// export const itemsDataIngles = await datosTFTIngles.items;
let datosTFTIngles = null;
let championsTFTIngles = [];
let itemsDataIngles = [];
try {
  datosTFTIngles = await fetchingDataTFT({version:"latest",idioma:"en",pais:"us"});
  championsTFTIngles = datosTFTIngles?.sets?.[set]?.champions || [];
  itemsDataIngles = datosTFTIngles?.items || [];
} catch (e) {
  console.error("Error loading datosTFTIngles in constantesLatest.js:", e);
}
export { datosTFTIngles, championsTFTIngles, itemsDataIngles };

// NOTA PARA EL FUTURO:
// El fetch original de meta era:
// export const fetchMeta = await fetch(metaTFTComposicionesJSON, {cache:"reload"});
// export const meta = await fetchMeta.json();
let meta = {};
try {
  const fetchMeta = await fetch(metaTFTComposicionesJSON, {cache:"reload"});
  meta = await fetchMeta.json();
} catch (e) {
  console.error("Error loading meta in constantesLatest.js, using default:", e);
}
export { meta };

