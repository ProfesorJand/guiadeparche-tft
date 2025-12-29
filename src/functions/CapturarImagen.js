import { toPng } from 'html-to-image';
const loadAllImages = async (container) => {
  const images = Array.from(container.querySelectorAll("img"));

  const promises = images.map((img) => {
    // Forzar carga de lazy images
    if (img.loading === "lazy") {
      img.loading = "eager";
      img.src = img.src; // fuerza carga
    }

    // Ya cargada correctamente
    if (img.complete && img.naturalWidth > 0) {
      return Promise.resolve();
    }

    // Esperar carga
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve();
      };

      img.onerror = () => {
        reject(new Error(`Falló imagen: ${img.src}`));
      };
    });
  });

  try {
    await Promise.all(promises);
  } catch (e) {
    throw e;
  }

  // Esperar render real
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
};


export const CapturarImagen = ({ backgroundRef, nombre}) => {
  if (!backgroundRef.current) return;
  loadAllImages(backgroundRef.current)
    .then(() => {
      return toPng(backgroundRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
    })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${nombre}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      alert(`❌ Error al capturar imagen: ${err.message}`);
    });
};