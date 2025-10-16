import { toPng } from 'html-to-image';
const loadAllImages = (container) => {
  const images = container.querySelectorAll("img");
  const promises = [];

  images.forEach((img) => {
    // ⚠️ Eliminar el lazy loading para forzar la carga inmediata
    if (img.loading === "lazy") {
      img.loading = "eager";
    }
    if (img.complete && img.naturalWidth === 0) {
      console.warn("⚠️ Imagen rota:", img, img.src);
    }
    if (img.complete) {
      if (img.naturalWidth === 0) {
        promises.push(Promise.reject(`❌ Falló imagen: ${img.src}`));
      }
    } else {
      promises.push(
        new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () =>{
            reject(`❌ Falló imagen: ${img.src}`)};
        })
      );
    }
  });

  return Promise.allSettled(promises).then(results => {
    const errors = results.filter(r => r.status === "rejected");
    if (errors.length > 0) {
      throw new Error(`❌ ${errors.length} imágenes fallaron`);
    }
  });
};


export const CapturarImagen = ({backgroundRef, nombre}) => {
  if (backgroundRef.current === null) return;

  loadAllImages(backgroundRef.current)
    .then(() => {
      return toPng(backgroundRef.current, {
        cacheBust: true,
        pixelRatio: 2, // mejora calidad (escala la resolución)
      });
    })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `${nombre}.png`;
      link.href = dataUrl;
      link.click();
      alert("📸 Imagen capturada")
    })
    .catch((err) => {
        alert(`❌ Error al capturar imagen: ${err.message}`)
    });
};