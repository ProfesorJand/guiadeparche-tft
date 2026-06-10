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

export let latestVersion = "13.0";
try {
    const latestVersionLog = (await fetchingLatestVersionTFT()).version.split(".");
    latestVersion = latestVersionLog[0]+"."+latestVersionLog[1];
} catch (e) {
    console.error("Error loading latestVersion in [constantesLatest.js]:", e);
}

export let datosTFT = null;
export let championsTFT = [];
export let itemsData = [];
export let sinergiasData = [];

try {
    datosTFT = await fetchingDataTFT({version,idioma,pais});
    championsTFT = datosTFT.sets[set].champions;
    itemsData = datosTFT.items;
    sinergiasData = datosTFT.sets["13"].traits;
} catch (e) {
    console.error("Error loading datosTFT in [constantesLatest.js]:", e);
}

export let datosTFTIngles = null;
export let championsTFTIngles = [];
export let itemsDataIngles = [];

try {
    datosTFTIngles = await fetchingDataTFT({version:"latest",idioma:"en",pais:"us"});
    championsTFTIngles = datosTFTIngles.sets[set].champions;
    itemsDataIngles = datosTFTIngles.items;
} catch (e) {
    console.error("Error loading datosTFTIngles in [constantesLatest.js]:", e);
}

export let fetchMeta = null;
export let meta = null;

try {
    fetchMeta = await fetch(metaTFTComposicionesJSON, {cache:"reload"});
    meta = await fetchMeta.json();
} catch (e) {
    console.error(`Error loading fetchMeta from ${metaTFTComposicionesJSON} in [constantesLatest.js]:`, e);
}

