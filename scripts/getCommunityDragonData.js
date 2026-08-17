import fs from 'fs';
import dotenv from 'dotenv';

// Cargar variables de entorno (asegúrate de tener DB_HOST, DB_USER, DB_PASSWORD, DB_NAME en tu .env)
dotenv.config();

const VERSION = 'latest'; // o 'latest'
const IDIOMA = 'en';
const PAIS = 'us';

// Constantes de sets (puedes actualizarlas según corresponda)
const SET_NUMBER_PBE = '18';
const SET_NUMBER_LATEST = '17';

async function main() {
  try {
    const isSet18 = process.argv.includes('--set18') || process.argv.includes('--pbe') || process.argv.includes('--set=18');
    const versionCD = isSet18 ? 'pbe' : VERSION;
    const currentSetNumber = isSet18 ? SET_NUMBER_PBE : (VERSION === 'pbe' ? SET_NUMBER_PBE : SET_NUMBER_LATEST);
    const mutatorName = `TFTSet${currentSetNumber}`;
    const tableSuffix = isSet18 ? '_set_18' : '';

    const tableItems = `items_tft${tableSuffix}`;
    const tableAumentos = `aumentos_tft${tableSuffix}`;
    const tableCampeones = `campeones_tft${tableSuffix}`;
    const tableTraits = `traits_TFT${tableSuffix}`;

    console.log(`====================================================`);
    console.log(`🚀 Iniciando descarga de datos CDragon TFT`);
    console.log(`➡️  Set Objetivo: ${currentSetNumber} (${isSet18 ? 'Set 18 (PBE)' : 'Set 17 (Latest)'})`);
    console.log(`➡️  Versión CDragon: ${versionCD}`);
    console.log(`➡️  Tablas MySQL: ${tableItems}, ${tableAumentos}, ${tableCampeones}, ${tableTraits}`);
    console.log(`====================================================`);

    console.log(`Descargando datos de CommunityDragon (${versionCD}, ${IDIOMA}_${PAIS})...`);
    const urlDragon = `https://raw.communitydragon.org/${versionCD}/cdragon/tft/${IDIOMA}_${PAIS}.json`;
    const response = await fetch(urlDragon);
    const data = await response.json();

    const { items, setData, sets } = data;

    // 1. Encontrar los apiNames permitidos para el Set actual usando el mutator
    const validItemNames = new Set();
    const validAugmentNames = new Set();
    const validOtherNames = new Set(); // Para champions y traits si se requiere

    if (setData && Array.isArray(setData)) {
      const currentSetData = setData.find(s => s.mutator === mutatorName);
      if (currentSetData) {
        if (currentSetData.items) currentSetData.items.forEach(name => validItemNames.add(name));
        if (currentSetData.augments) currentSetData.augments.forEach(name => validAugmentNames.add(name));
        if (currentSetData.champions) currentSetData.champions.forEach(name => validOtherNames.add(name));
        if (currentSetData.traits) currentSetData.traits.forEach(name => validOtherNames.add(name));
      }
    }

    // 2. Extraer y Filtrar Items y Aumentos de la lista global (que viene junta en 'items')
    let allItems = items || [];
    let itemsTFT = [];
    let aumentosTFT = [];

    if (validItemNames.size > 0 || validAugmentNames.size > 0) {
      itemsTFT = allItems.filter(item => validItemNames.has(item.apiName));
      aumentosTFT = allItems.filter(item => validAugmentNames.has(item.apiName));
    }

    // 3. Extraer Campeones (igual que en updateDataTFT)
    const currentSet = sets?.[currentSetNumber];
    const currentSetData = (setData && Array.isArray(setData)) ? setData.find(s => s.mutator === mutatorName) : null;
    
    let allChampionsRaw = currentSet?.champions ? [...currentSet.champions] : [];
    if (allChampionsRaw.length < (currentSetData?.champions?.length || 0)) {
      allChampionsRaw = [...(currentSetData.champions || [])];
    }

    // Agregar Shen's Sword si no existe (lógica que usas en dataTFT.js - sólo en Set 17)
    if (!isSet18 && !allChampionsRaw.some(c => c.apiName === "TFT15_ShenSword")) {
      allChampionsRaw.push({
        apiName: "TFT15_ShenSword",
        name: "Shen's Sword",
        cost: 1,
        traits: [],
        tileIcon: "/assets/characters/shen/hud/icons2d/shen_q.png", // Nota: este no está en el Set 17, se recomienda usar otra imagen o descargarla manual
      });
    }
    // Agregar TFT17_Summon si no existe (lógica que usas en dataTFT.js - sólo en Set 17)
    if (!isSet18 && !allChampionsRaw.some(c => c.apiName === "TFT17_Summon")) {
      allChampionsRaw.push({
        apiName: "TFT17_Summon",
        name: "Bia y Bayin",
        cost: 8,
        traits: [],
        // Coincide con lo que baja CDragon en tileIcon
        tileIcon: "/assets/characters/tft17_summon/hud/tft17_summon_square.tft_set17.tex",
        // Coincide con lo que baja CDragon en squareIcon (shiro_small)
        squareIcon: "/assets/characters/tft17_summon/skins/base/images/shiro_small.tft_set17.tex",
      });
    }
    // Agregar Dragón Ancestral Cósmico si no existe (lógica que usas en dataTFT.js - sólo en Set 17)
    if (!isSet18 && !allChampionsRaw.some(c => c.apiName === "TFT17_PVE_ElderDragon")) {
      allChampionsRaw.push({
        apiName: "TFT17_PVE_ElderDragon",
        name: "Dragón Ancestral Cósmico",
        cost: 8,
        traits: [],
        // Coincide con lo que baja CDragon en tileIcon
        tileIcon: "/assets/characters/tft17_pve_elderdragon/hud/tft17_pve_elderdragon_square.tft_set17.tex",
        // Coincide con lo que baja CDragon en squareIcon
        squareIcon: "/assets/ux/tft/championsplashes/tft17_elderdragonsquare.tft_set17.tex",
      });
    }

    const campeonesTFT = allChampionsRaw.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    // 4. Extraer Traits (tomamos de currentSet.traits o de currentSetData.traits si el primero está vacío)
    let traitsTFT = (currentSet?.traits && currentSet.traits.length > 0) 
      ? [...currentSet.traits] 
      : [...(currentSetData?.traits || [])];

    console.log(`Extracción completa: ${itemsTFT.length} items, ${aumentosTFT.length} aumentos, ${campeonesTFT.length} campeones, ${traitsTFT.length} traits.`);

    // ==========================================
    // ENVÍO DE DATOS A LA API INTERMEDIA
    // ==========================================
    const onlyItems = process.argv.includes('--only-items');
    
    const apiUrl = "https://api.guiadeparche.com/update_tft_data.php";
    const apiToken = process.env.TOKEN_META;
    console.log({apiToken})

    if (!apiUrl || !apiToken) {
      throw new Error("Faltan las variables de entorno API_URL o API_TOKEN en el archivo .env");
    }

    // Helper function to send data to API
    async function sendToApi(action, dataToAPI) {
      console.log(`Enviando acción '${action}' a la API...`);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({
          action,
          tableSuffix,
          data: dataToAPI
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error en la API (${response.status}): ${errText}`);
      }

      const result = await response.json();
      console.log(`✅ API Respuesta (${action}):`, result.message);
    }

    console.log('Iniciando envío a la API...');

    // 1. Inicializar tablas
    await sendToApi('init', null);

    // 2. Enviar Items
    if (itemsTFT.length > 0) {
      await sendToApi('items', itemsTFT);
    } else {
      console.log("No hay items para enviar.");
    }

    if (!onlyItems) {
      // 3. Enviar Aumentos
      if (aumentosTFT.length > 0) {
        await sendToApi('augments', aumentosTFT);
      } else {
        console.log("No hay aumentos para enviar.");
      }

      // 4. Enviar Campeones
      if (campeonesTFT.length > 0) {
        await sendToApi('champions', campeonesTFT);
      } else {
        console.log("No hay campeones para enviar.");
      }

      // 5. Enviar Traits
      if (traitsTFT.length > 0) {
        await sendToApi('traits', traitsTFT);
      } else {
        console.log("No hay traits para enviar.");
      }
    } else {
      console.log('⏩ Omitiendo Aumentos, Campeones y Traits (flag --only-items activo)');
    }

    console.log('Proceso finalizado correctamente.');

  } catch (error) {
    console.error('Error durante el proceso:', error);
  }
}

main();
