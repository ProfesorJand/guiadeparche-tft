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
export const set = "12";
const latestVersionLog = (await fetchingLatestVersionTFT()).version.split(".");
export const latestVersion = latestVersionLog[0]+"."+latestVersionLog[1];

export async function fetchingLatestVersionTFT(){
    const urlDragon = `https://raw.communitydragon.org/${version}/content-metadata.json`
    const fetching = await fetch(urlDragon, {cache:"reload"});
    return await fetching.json();
}


export const datosTFT = await fetchingDataTFT({version,idioma,pais});
export const championsTFT = await datosTFT.sets[set].champions;
export const itemsData = await datosTFT.items;
export const sinergiasData = await datosTFT.sets["13"].traits

export const datosTFTIngles = await fetchingDataTFT({version:"latest",idioma:"en",pais:"us"});
export const championsTFTIngles = await datosTFTIngles.sets[set].champions;
export const itemsDataIngles = await datosTFTIngles.items;
console.log(itemsDataIngles)

export const fetchMeta = await fetch(`https://guiadeparche.com/tftdata/Set${set}/metaTFTComposiciones.json`, {cache:"reload"});
export const meta = await fetchMeta.json();

