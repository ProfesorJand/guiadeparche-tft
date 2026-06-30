import { metaTFTComposicionesJSON } from "@stores/dataTFT";

export async function fetchingDataTFT({version, idioma, pais}){
    const urlDragon = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`
    const fetching = await fetch(urlDragon);
    const {items, sets} = await fetching.json();
    return {items, sets};
}

export const version = "pbe";
export const idioma = "en";
export const pais = "us";
export const setPBE = "13";

export async function fetchingPBEVersionTFT(){
    const urlDragon = `https://raw.communitydragon.org/${version}/content-metadata.json`
    const fetching = await fetch(urlDragon, {cache:"reload"});
    return await fetching.json();
}

// NOTA PARA EL FUTURO:
// Si quieres volver a requerir el fetch directo sin try-catch (que puede fallar si la red está caída),
// el código original era:
// export const pbeVersionLog = (await fetchingPBEVersionTFT()).version.split(".");
// export const pbeVersion = pbeVersionLog[0]+"."+pbeVersionLog[1];
let pbeVersion = "17.5";
try {
  const pbeVersionLog = (await fetchingPBEVersionTFT()).version.split(".");
  pbeVersion = pbeVersionLog[0]+"."+pbeVersionLog[1];
} catch (e) {
  console.error("Error loading pbeVersion in constantesPBE.js:", e);
}
export { pbeVersion };

// NOTA PARA EL FUTURO:
// Si quieres volver a requerir el fetch directo sin try-catch, el código original era:
// export const datosTFT = await fetchingDataTFT({version,idioma,pais});
// export const championsTFT = await datosTFT.sets[setPBE].champions;
// export const aumentos = datosTFT.items.filter((e)=>{
//     return e.icon.indexOf("/Augments/")>=0 && e?.apiName?.indexOf("TFT12")>=0;
// });
let datosTFT = null;
let championsTFT = [];
let aumentos = [];
try {
  datosTFT = await fetchingDataTFT({version,idioma,pais});
  championsTFT = datosTFT?.sets?.[setPBE]?.champions || [];
  aumentos = (datosTFT?.items || []).filter((e)=>{
    return e.icon.indexOf("/Augments/")>=0 && e?.apiName?.indexOf("TFT12")>=0;
  });
} catch (e) {
  console.error("Error loading datosTFT in constantesPBE.js:", e);
}
export { datosTFT, championsTFT, aumentos };


export async function fetchingMetaTFTPBE(){
    const fetching = await fetch(metaTFTComposicionesJSON, {
      cache: "reload",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const datos = await fetching.json();
    return datos;
}

// NOTA PARA EL FUTURO:
// El fetch original de metaPBE era:
// export const metaPBE = await fetchingMetaTFTPBE();
let metaPBE = {};
try {
    metaPBE = await fetchingMetaTFTPBE();
} catch (e) {
    console.error("Error loading metaPBE in constantesPBE.js:", e);
}
export { metaPBE };
