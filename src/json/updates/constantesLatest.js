export async function fetchingDataTFT({version, idioma, pais}){
    const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
    const fetching = await fetch(urlDragon);
    const {items, sets} = await fetching.json();
    return {items, sets}
}

export const version = "latest";
export const idioma = "es"; //en
export const pais = "ar"; //mx /es /gb /us
export const set = "11";
const latestVersionLog = (await fetchingLatestVersionTFT()).version.split(".");
export const latestVersion = latestVersionLog[0]+"."+latestVersionLog[1]

export async function fetchingLatestVersionTFT(){
    const urlDragon = "https://raw.communitydragon.org/latest/content-metadata.json"
    const fetching = await fetch(urlDragon);
    return await fetching.json();
}


export const datosTFT = await fetchingDataTFT({version,idioma,pais});
export const championsTFT = await datosTFT.sets[set].champions;

export const fetchMeta = await fetch('https://guiadeparche.com/tftdata/Set11/metaComps/metaTFTComposiciones.json');
export const meta = await fetchMeta.json();
