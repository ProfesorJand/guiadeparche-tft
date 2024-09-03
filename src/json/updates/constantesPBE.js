export async function fetchingDataTFT({version, idioma, pais}){
    const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
    const fetching = await fetch(urlDragon);
    const {items, sets} = await fetching.json();
    return {items, sets};
}

export const version = "latest";
export const idioma = "es";
export const pais = "ar";
export const setPBE = "12";

export const pbeVersionLog = (await fetchingPBEVersionTFT()).version.split(".");
export const pbeVersion = pbeVersionLog[0]+"."+pbeVersionLog[1];

export async function fetchingPBEVersionTFT(){
    const urlDragon = `https://raw.communitydragon.org/${version}/content-metadata.json`
    const fetching = await fetch(urlDragon, {cache:"reload"});
    return await fetching.json();
}

export const datosTFT = await fetchingDataTFT({version,idioma,pais});

export const championsTFT = await datosTFT.sets[setPBE].champions;

export const aumentos = datosTFT.items.filter((e)=>{
    return e.icon.indexOf("/Augments/")>=0 && e?.apiName?.indexOf("TFT12")>=0;
});



export async function fetchingMetaTFTPBE(){
    const url = "https://guiadeparche.com/tftdata/Set12/metaTFTComposiciones.json";
    const fetching = await fetch(url, {cache:"reload"});
    const datos = await fetching.json();
    return datos;
}

export const metaPBE = await fetchingMetaTFTPBE();
