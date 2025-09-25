import InfografiaTFTComps from "@components/TFT/InfografiaTFTComps"
import { useRef, useCallback } from "react";
import { toPng } from 'html-to-image';
const InfografiaTFT = ()=>{
  const backgroundRef = useRef(null);

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
  
  
  const onButtonClick = useCallback(() => {
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
        link.download = `${"InfografiaTFT"}.png`;
        link.href = dataUrl;
        link.click();
        console.log("📸 Imagen capturada");
      })
      .catch((err) => {
        console.error("❌ Error al capturar imagen:", err);
      });
  }, [backgroundRef]);


  return (
    <div>
      {/* Seleccionar las compos que van en la infografia */}
      <div>
        {/*Boton para capturar imagen de la InfografiaTFTComps */}
        <button onClick={()=>{
          onButtonClick()
        }}>Descargar Infografía TFT</button>
      </div>

      <InfografiaTFTComps backgroundRef={backgroundRef}/>
    </div>
  )
}

export default InfografiaTFT