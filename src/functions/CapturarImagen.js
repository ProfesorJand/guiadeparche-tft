import { toPng } from "html-to-image";
/**
 * Espera a que todas las <img> dentro del nodo estén cargadas
 */
export const waitForImages = async (node) => {
  const images = Array.from(node.querySelectorAll("img"));

  if (images.length === 0) {
    console.log("ℹ️ No hay imágenes para esperar");
    return;
  }

  console.log(`🖼 Esperando ${images.length} imágenes...`);

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth !== 0) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  // Esperar layout real (MUY IMPORTANTE)
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  console.log("✅ Todas las imágenes listas");
};


export const CapturarImagen = async ({ backgroundRef, nombre }) => {
  const node = backgroundRef?.current;

  if (!node) {
    console.error("❌ backgroundRef.current es null");
    return;
  }

  const adminOptionsElements = node.querySelectorAll(".adminOptions");
  try {
    console.log("📸 Iniciando captura");

    // Clase de captura (si la usás para CSS)
    node.classList.add("captura-img");
    /* quiero que detecte la clase adminOptions que esta en alguna parte del nodo para poder darle display:none para que no se vean */
    adminOptionsElements.forEach((el) => {
      el.style.display = "none";
    });

    // ⏳ 1️⃣ Esperar TODAS las imágenes
    await waitForImages(node);

    // ⏳ 2️⃣ Esperar layout final
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);

    // 📸 3️⃣ Captura
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      useCORS: true,
      cacheBust: true,
    });

    // 💾 Descargar
    const link = document.createElement("a");
    link.download = `${nombre}.png`;
    link.href = dataUrl;
    link.click();

    console.log("✅ Captura completada");

  } catch (err) {
    console.error("❌ Error en captura", err);
  } finally {
    node.classList.remove("captura-img");
    adminOptionsElements.forEach((el) => {
      el.style.display = "flex";
    });
  }
};
