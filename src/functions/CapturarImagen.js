// Import dinámico de html-to-image movido adentro para evitar problemas en iOS Safari

export const waitForImages = async (node) => {
  const images = Array.from(node.querySelectorAll("img"));
  if (!images.length) return;

  await Promise.all(
    images.map(img =>
      new Promise(resolve => {

        // ✅ Detectar error inmediatamente si ya falló
        if (img.complete && img.naturalWidth === 0) {
          console.error("❌ Imagen ya fallida:", img.src);
          return resolve();
        }

        if (img.complete && img.naturalWidth !== 0) {
          return resolve();
        }

        img.onload = () => resolve();

        img.onerror = () => {
          console.error("❌ Imagen falló al cargar:", img.src);
          resolve();
        };

        setTimeout(() => {
          console.warn("⏳ Timeout esperando imagen:", img.src);
          resolve();
        }, 3000);
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

  imgs.forEach(img => {
  img.addEventListener("error", () => {
    console.log("❌ Imagen falló:", img.src);
  });
});

  try {
    console.log("📸 Iniciando captura");

    node.classList.add("captura-img");

    // Ocultar UI
    [...adminOptionsElements, ...checkBoxIsInInfographicElements].forEach(el => {
      el.dataset.prevDisplay = el.style.display;
      el.style.display = "none";
    });

    
    await waitForImages(node);

    // 🔥 DESACTIVAR onerror (CLAVE)
    imgs.forEach(img => {
      originalOnError.set(img, img.onerror);
      img.onerror = null;
    });

    console.log("entre")
    console.log({node})
    // Forzar repaint real
    node.style.transform = "translateZ(0)";
    await new Promise(r => setTimeout(r, 50));
    const images = node.querySelectorAll("img");

    images.forEach(img => {
      console.log("🖼 Imagen detectada:", {
        src: img.src,
        crossOrigin: img.crossOrigin,
        complete: img.complete,
        naturalWidth: img.naturalWidth
      });
    });

    const { toPng } = await import("html-to-image");

    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      cacheBust: false,
    });
    console.log({dataUrl})

    const link = document.createElement("a");
    link.download = `${nombre}.png`;
    link.href = dataUrl;
    link.click();

    console.log("✅ Captura completada");
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Error en captura:", err.message);
      console.error(err.stack);
    } else {
      console.error("❌ Error en captura (no-Error):", err);
    };
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
