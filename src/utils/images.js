export const getLocalTftImage = (iconPath, category, versionNumber = "17") => {
  if (!iconPath) return '/tft/assets/t-logo.png'; // Ruta por defecto si no hay icono

  const fileName = iconPath.split('/').pop().toLowerCase().replace('.tex', '.png').replace('.dds', '.png');

  // Si la ruta original ya incluía choiceui o hexcore, podemos asegurarnos de la categoría
  if (category === 'augments') {
    if (iconPath.match(/\/choiceui\//i)) category = 'augments/choiceui';
    else category = 'augments/hexcore'; // default para aumentos
  }

  return `/tft/sets/${versionNumber}/${category}/${fileName}`;
};
