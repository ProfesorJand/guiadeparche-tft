import { toPng } from "html-to-image";

export const waitForImages = async (node) => {
  const images = Array.from(node.querySelectorAll("img"));
  if (!images.length) return;

  await Promise.all(
    images.map(img =>
      new Promise(resolve => {
        if (img.complete && img.naturalWidth !== 0) return resolve();
        img.onload = img.onerror = resolve;
        setTimeout(resolve, 3000);
      })
    )
  );

  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
};

export const CapturarImagen = async ({ backgroundRef, nombre }) => {
  const node = backgroundRef?.current;
  if (!node) return;

  const adminOptionsElements = node.querySelectorAll(".adminOptions");
  const checkBoxIsInInfographicElements =
    node.querySelectorAll(".checkBoxIsInInfographic");

  // 🔒 Guardar handlers originales
  const imgs = node.querySelectorAll("img");
  const originalOnError = new Map();

  try {
    console.log("📸 Iniciando captura");

    node.classList.add("captura-img");

    // Ocultar UI
    [...adminOptionsElements, ...checkBoxIsInInfographicElements].forEach(el => {
      el.dataset.prevDisplay = el.style.display;
      el.style.display = "none";
    });

    // 🔥 DESACTIVAR onerror (CLAVE)
    imgs.forEach(img => {
      originalOnError.set(img, img.onerror);
      img.onerror = null;
    });

    await waitForImages(node);

    // Forzar repaint real
    node.style.transform = "translateZ(0)";
    await new Promise(r => setTimeout(r, 50));

    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      cacheBust: false,
    });

    const link = document.createElement("a");
    link.download = `${nombre}.png`;
    link.href = dataUrl;
    link.click();

    console.log("✅ Captura completada");
  } catch (err) {
    console.error("❌ Error en captura", err);
  } finally {
    // Restaurar todo
    node.classList.remove("captura-img");
    node.style.transform = "";

    [...adminOptionsElements, ...checkBoxIsInInfographicElements].forEach(el => {
      el.style.display = el.dataset.prevDisplay || "";
    });

    // ♻️ Restaurar onerror
    imgs.forEach(img => {
      img.onerror = originalOnError.get(img) || null;
    });
  }
};
