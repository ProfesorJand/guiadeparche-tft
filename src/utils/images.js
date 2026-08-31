import { versionTFT, setNumberLatest, setNumberPBE } from "../stores/dataTFT.js";

export const getLocalTftImage = (iconPath, category, versionNumber) => {
  if (!iconPath) return '/tft/assets/t-logo.png'; // Ruta por defecto si no hay icono

  let finalVersion = versionNumber;
  if (!finalVersion) {
    if (typeof versionTFT !== "undefined") {
      const currentVersion = versionTFT.get();
      finalVersion = currentVersion === "latest" ? setNumberLatest : setNumberPBE;
    } else {
      finalVersion = "17"; // fallback
    }
  }

  const fileName = iconPath.split('/').pop().toLowerCase().replace('.tex', '.png').replace('.dds', '.png').replace('.webp', '.png');

  // Si la ruta original ya incluía choiceui o hexcore, podemos asegurarnos de la categoría
  if (category === 'augments') {
    if (iconPath.match(/\/choiceui\//i)) category = 'augments/choiceui';
    else category = 'augments/hexcore'; // default para aumentos
  }

  return `/tft/sets/${finalVersion}/${category}/${fileName}`;
};
