export async function fetchingDataTFT({version, idioma, pais}){
    const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
    const fetching = await fetch(urlDragon);
    const {items, sets} = await fetching.json();
    return {items, sets}
}

export const version = "pbe";
export const idioma = "es";
export const pais = "ar";
export const set = "12";

export const datosTFT = await fetchingDataTFT({version,idioma,pais});

export const championsTFT = await datosTFT.sets[set].champions;

export const aumentos = datosTFT.items.filter((e)=>{
    return e.icon.indexOf("/Augments/")>=0 && e?.apiName?.indexOf("TFT12")>=0
});
