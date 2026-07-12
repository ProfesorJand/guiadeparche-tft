import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno (asegúrate de tener DB_HOST, DB_USER, DB_PASSWORD, DB_NAME en tu .env)
dotenv.config();

const VERSION = 'latest'; // o 'latest'
const IDIOMA = 'es';
const PAIS = 'ar';

// Constantes de sets (puedes actualizarlas según corresponda)
const SET_NUMBER_PBE = '17';
const SET_NUMBER_LATEST = '17';

async function main() {
  try {
    console.log(`Descargando datos de CommunityDragon (${VERSION}, ${IDIOMA}_${PAIS})...`);
    const urlDragon = `https://raw.communitydragon.org/${VERSION}/cdragon/tft/${IDIOMA}_${PAIS}.json`;
    const response = await fetch(urlDragon);
    const data = await response.json();

    const { items, setData, sets } = data;
    const currentSetNumber = VERSION === 'pbe' ? SET_NUMBER_PBE : SET_NUMBER_LATEST;
    const mutatorName = `TFTSet${currentSetNumber}`;

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
    const allChampionsRaw = currentSet?.champions ? [...currentSet.champions] : [];

    // Agregar Shen's Sword si no existe (lógica que usas en dataTFT.js)
    if (!allChampionsRaw.some(c => c.apiName === "TFT15_ShenSword")) {
      allChampionsRaw.push({
        apiName: "TFT15_ShenSword",
        name: "Shen's Sword",
        cost: 1,
        traits: [],
        tileIcon: "/assets/characters/shen/hud/icons2d/shen_q.png",
      });
    }

    const campeonesTFT = allChampionsRaw.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    // 4. Extraer Traits
    let traitsTFT = currentSet?.traits || [];
    // Filtrar traits si hay información
    if (validOtherNames.size > 0 && traitsTFT.length > 0) {
       traitsTFT = traitsTFT.filter(t => validOtherNames.has(t.apiName));
    }

    console.log(`Extracción completa: ${itemsTFT.length} items, ${aumentosTFT.length} aumentos, ${campeonesTFT.length} campeones, ${traitsTFT.length} traits.`);

    // ==========================================
    // CONEXIÓN Y GUARDADO EN MYSQL (phpMyAdmin)
    // ==========================================
    console.log('Conectando a la base de datos de GoDaddy...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Conexión exitosa. Verificando/Creando tablas si no existen...');

    // Crear tabla items_tft
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS items_tft (
        apiName VARCHAR(150) PRIMARY KEY,
        name VARCHAR(150),
        desc_item TEXT,
        icon VARCHAR(255),
        effects TEXT,
        composition TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Crear tabla aumentos_tft
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS aumentos_tft (
        apiName VARCHAR(150) PRIMARY KEY,
        name VARCHAR(150),
        desc_item TEXT,
        icon VARCHAR(255),
        effects TEXT,
        associatedTraits TEXT,
        incompatibleTraits TEXT,
        tags TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Crear tabla campeones_tft
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS campeones_tft (
        apiName VARCHAR(150) PRIMARY KEY,
        name VARCHAR(150),
        cost INT,
        traits TEXT,
        tileIcon VARCHAR(255),
        icon VARCHAR(255),
        squareIcon VARCHAR(255),
        role VARCHAR(150),
        ability_name VARCHAR(150),
        ability_desc TEXT,
        ability_icon VARCHAR(255),
        ability_variables TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Crear tabla tratis_TFT
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS tratis_TFT (
        apiName VARCHAR(150) PRIMARY KEY,
        name VARCHAR(150),
        desc_trait TEXT,
        icon VARCHAR(255),
        effects TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('Tablas listas. Insertando/Actualizando datos...');

    // --- Guardar Items ---
    for (const item of itemsTFT) {
      if (!item.apiName) continue;
      const query = `
        INSERT INTO items_tft (apiName, name, desc_item, icon, effects, composition) 
        VALUES (?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
          name = VALUES(name),
          desc_item = VALUES(desc_item),
          icon = VALUES(icon),
          effects = VALUES(effects),
          composition = VALUES(composition)
      `;
      const descItem = item.desc || "";
      const effectsStr = item.effects ? JSON.stringify(item.effects) : "{}";
      const compositionStr = item.composition ? JSON.stringify(item.composition) : "[]";

      await connection.execute(query, [
        item.apiName, 
        item.name || "", 
        descItem, 
        item.icon || "", 
        effectsStr, 
        compositionStr
      ]);
    }
    console.log('✅ Items guardados en "items_tft"');

    // --- Guardar Aumentos ---
    for (const aug of aumentosTFT) {
      if (!aug.apiName) continue;
      const query = `
        INSERT INTO aumentos_tft (apiName, name, desc_item, icon, effects, associatedTraits, incompatibleTraits, tags) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
          name = VALUES(name),
          desc_item = VALUES(desc_item),
          icon = VALUES(icon),
          effects = VALUES(effects),
          associatedTraits = VALUES(associatedTraits),
          incompatibleTraits = VALUES(incompatibleTraits),
          tags = VALUES(tags)
      `;
      const descAug = aug.desc || "";
      const effectsStr = aug.effects ? JSON.stringify(aug.effects) : "{}";
      const associatedTraitsStr = aug.associatedTraits ? JSON.stringify(aug.associatedTraits) : "[]";
      const incompatibleTraitsStr = aug.incompatibleTraits ? JSON.stringify(aug.incompatibleTraits) : "[]";
      // Algunos aumentos pueden no tener tags, nos aseguramos
      const tagsStr = aug.tags ? JSON.stringify(aug.tags) : "[]";

      await connection.execute(query, [
        aug.apiName, 
        aug.name || "", 
        descAug, 
        aug.icon || "", 
        effectsStr, 
        associatedTraitsStr,
        incompatibleTraitsStr,
        tagsStr
      ]);
    }
    console.log('✅ Aumentos guardados en "aumentos_tft"');

    // --- Guardar Campeones ---
    for (const champ of campeonesTFT) {
      if (!champ.apiName) continue;
      const query = `
        INSERT INTO campeones_tft (apiName, name, cost, traits, tileIcon, icon, squareIcon, role, ability_name, ability_desc, ability_icon, ability_variables) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
          name = VALUES(name),
          cost = VALUES(cost),
          traits = VALUES(traits),
          tileIcon = VALUES(tileIcon),
          icon = VALUES(icon),
          squareIcon = VALUES(squareIcon),
          role = VALUES(role),
          ability_name = VALUES(ability_name),
          ability_desc = VALUES(ability_desc),
          ability_icon = VALUES(ability_icon),
          ability_variables = VALUES(ability_variables)
      `;
      const traitsStr = champ.traits ? JSON.stringify(champ.traits) : "[]";
      
      // Extraer datos de la habilidad (ability)
      const ability = champ.ability || {};
      const abilityName = ability.name || "";
      const abilityDesc = ability.desc || "";
      const abilityIcon = ability.icon || "";
      const abilityVariables = ability.variables ? JSON.stringify(ability.variables) : "[]";
      
      await connection.execute(query, [
        champ.apiName, 
        champ.name || "", 
        champ.cost || 0, 
        traitsStr, 
        champ.tileIcon || "",
        champ.icon || "",
        champ.squareIcon || "",
        champ.role || "",
        abilityName,
        abilityDesc,
        abilityIcon,
        abilityVariables
      ]);
    }
    console.log('✅ Campeones guardados en "campeones_tft"');

    // --- Guardar Traits ---
    for (const trait of traitsTFT) {
      if (!trait.apiName) continue;
      const query = `
        INSERT INTO tratis_TFT (apiName, name, desc_trait, icon, effects) 
        VALUES (?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
          name = VALUES(name),
          desc_trait = VALUES(desc_trait),
          icon = VALUES(icon),
          effects = VALUES(effects)
      `;
      const descTrait = trait.desc || "";
      const effectsTraitStr = trait.effects ? JSON.stringify(trait.effects) : "[]";
      
      await connection.execute(query, [
        trait.apiName, 
        trait.name || "", 
        descTrait, 
        trait.icon || "", 
        effectsTraitStr
      ]);
    }
    console.log('✅ Traits guardados en "tratis_TFT"');

    await connection.end();
    console.log('Proceso finalizado correctamente.');

  } catch (error) {
    console.error('Error durante el proceso:', error);
  }
}

main();
