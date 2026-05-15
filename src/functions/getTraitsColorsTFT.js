// generateTraitsColorsFromAPI.js

import fs from 'fs';
//import fetch from 'node-fetch'; // Si usás Node <18, necesitás instalar esto
// npm install node-fetch

const version = 'pbe'; // o '14.14', '14.15', etc.
const idioma = 'en';
const pais = 'us';
const setNumberPBE = '17';  // 👈 Cambia esto si es otro set
const setNumberLatest = '16'; // 👈 Igualmente

const styleToImgIndex = {
  1: 0, // bronze
  3: 1, // silver
  5: 2, // gold
  4: 3, // prismatic
};

const getTraitsColorsFromAPI = async () => {
  const url = `https://raw.communitydragon.org/${version}/cdragon/tft/${idioma}_${pais}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`❌ Error al obtener datos: ${response.status}`);
    return;
  }

  const data = await response.json();

  const traits = data.sets[version === "pbe" ? setNumberPBE : setNumberLatest].traits;

  const traitsColors = {};

  traits.forEach(trait => {
    const { apiName, effects } = trait;
    if (!apiName || !Array.isArray(effects)) return;

    traitsColors[apiName] = {};

    effects.forEach(effect => {
      const { minUnits, style } = effect;
      const imgIndex = styleToImgIndex[style];
      if (imgIndex !== undefined && minUnits !== undefined) {
        traitsColors[apiName][minUnits] = `imgHex[${imgIndex}]`;
      }
    });
  });

  // Serializa con reemplazo de strings para imgHex[]
  const output = `const traitsColorsSet${version === "pbe" ? setNumberPBE : setNumberLatest} = ${JSON.stringify(traitsColors, null, 4).replace(/"imgHex\[(\d+)\]"/g, 'imgHex[$1]')};

export default traitsColors;
`;

  fs.writeFileSync(`traitsColorsSet${version === "pbe" ? setNumberPBE : setNumberLatest}.js`, output);
  console.log('✅ Archivo traitsColors.js generado desde API.');
};

getTraitsColorsFromAPI();
