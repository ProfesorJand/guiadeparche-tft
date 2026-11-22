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

  // Si el propio nombre de archivo indica un set específico (ej. tft18_..., tft19_..., trait_icon_18_..., augment_19_...),
  // usar siempre esa carpeta de set para evitar 404 al mezclar compos de distintos sets.
  // Ignoramos prefijos antiguos de ítems compartidos (tft4_, tft5_, tft7_, tft9_ de Ornn/Radiantes).
  const setFromFilename = fileName.match(/^(?:tft|trait_icon_|augment_)(\d+)_/i);
  if (setFromFilename && Number(setFromFilename[1]) >= 15) {
    finalVersion = setFromFilename[1];
  }

  // Si la ruta original ya incluía choiceui o hexcore, podemos asegurarnos de la categoría
  if (category === 'augments') {
    if (iconPath.match(/\/choiceui\//i)) category = 'augments/choiceui';
    else category = 'augments/hexcore'; // default para aumentos
  }

  return `/tft/sets/${finalVersion}/${category}/${fileName}`;
};
