// 🔹 Reset valores individuales
export function reset(index, type, setInfografia) {
  setInfografia((prev) => {
    const newData = [...prev.TopData];
    if (type === "top") newData[index].top = "0px";
    if (type === "left") newData[index].left = "0px";
    if (type === "width") newData[index].width = "100%";
    if (type === "height") newData[index].height = "100%";
    return { ...prev, TopData: newData };
  });
}

// Convertir hex + alpha a rgba
export function hexToRgba(hex, alpha = 1) {
  console.log({hex})
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 🔹 Asegurar que todas las imágenes están cargadas
export const loadAllImages = (container) => {
  const images = container.querySelectorAll("img");
  const promises = [];

  images.forEach((img) => {
    if (img.loading === "lazy") img.loading = "eager";
    if (!img.complete) {
      promises.push(
        new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(`❌ Falló imagen: ${img.src}`);
        })
      );
    }
  });

  return Promise.allSettled(promises).then(results => {
    const errors = results.filter(r => r.status === "rejected");
    if (errors.length > 0) throw new Error(`❌ ${errors.length} imágenes fallaron`);
  });
};

// 🔹 Exportar JSON
export function exportInfografia(infografia) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(infografia));
  const link = document.createElement("a");
  link.href = dataStr;
  link.download = "infografia.json";
  link.click();
}

// 🔹 Importar JSON
export function importInfografia(e, setInfografia) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => setInfografia(JSON.parse(reader.result));
  reader.readAsText(file);
}

export const Template = {
  Top5:{
    TituloHeight:"8%",
    Top5ContainerHeight:"75%",
    FooterHeight:"17%",
    GapTop5Items:"10px",
    WidthImageContainer:"80%",
  }
}