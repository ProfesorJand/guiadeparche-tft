export async function fetchingDataTFT({version, idioma, pais}){
    const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
    const fetching = await fetch(urlDragon);
    const {items, sets} = fetching.json();
    return {items, sets}
}

const version = "latest";
const idioma = "es"; //en
const pais = "ar"; //mx /es /gb /us
const set = "11"

export const datosTFT = fetchingDataTFT({version,idioma,pais})

export const championsTFT = datosTFT.sets[set].champions;

