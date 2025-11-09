// src/functions/CapturarInfografias.js
import { toPng } from "html-to-image";
import { CombinarImagenesVertical } from "./CombinarImagenesVertical";

/**
 * Asegura que todas las <img> dentro de `container` estén cargadas.
 * Rechaza si alguna falla de carga.
 */
const loadAllImages = (container) => {
  const images = container.querySelectorAll("img");
  const promises = [];

  images.forEach((img) => {
    // forzamos carga inmediata
    if (img.loading === "lazy") img.loading = "eager";

    if (img.complete) {
      if (img.naturalWidth === 0) {
        promises.push(Promise.reject(`❌ Imagen rota: ${img.src}`));
      } else {
        // ya está cargada
      }
    } else {
      promises.push(new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(`❌ Falló imagen: ${img.src}`);
      }));
    }
  });

  return Promise.allSettled(promises).then(results => {
    const errors = results.filter(r => r.status === "rejected").map(r => r.reason);
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }
  });
};

/** Convierte dataURL a objeto Image (await load). */
const dataUrlToImage = (dataUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
};

/** Carga una URL de imagen y devuelve Image (await load). */
const loadImageFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(`❌ Falló cargar logo: ${url}`);
    img.src = url;
  });
};

/** Dibuja imágenes (ya cargadas) en canvas final de 1080x1350 centradas y con padding superior */
const crearCanvasFinal1080x1350 = async ({ elementsImgs = [], logos = [] }) => {
  const WIDTH = 1080;
  const HEIGHT = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  // fondo (puedes personalizar)
  ctx.fillStyle = "#000000"; // negro por defecto
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // calculamos la altura total del contenido (sum altura de elementosImgs)
  const contenidoHeights = elementsImgs.reduce((acc, img) => acc + (img.height), 0);
  // Dejamos un small padding top
  const paddingTop = 20;
  // area disponible para contenido (dejamos espacio para logos en la parte inferior)
  const logosAreaHeight = logos.length > 0 ? 160 : 0; // espacio reservado para logos
  const availableHeight = HEIGHT - paddingTop - logosAreaHeight - 20; // 20 padding bottom

  // calculamos escala para que todo el contenido quepa en availableHeight si supera
  const maxWidth = Math.max(...elementsImgs.map(i => i.width), 1);
  const scaleByWidth = WIDTH / maxWidth;
  // si al escalar por ancho pasa de height disponible, usamos scaleByHeight
  const totalHeightAtScaleWidth = elementsImgs.reduce((acc, img) => acc + (img.height * scaleByWidth), 0);
  const scale = totalHeightAtScaleWidth > availableHeight
    ? availableHeight / elementsImgs.reduce((acc, img) => acc + img.height, 0)
    : scaleByWidth;

  // dibujamos cada imagen escalada, centrada horizontalmente
  let y = paddingTop;
  for (const img of elementsImgs) {
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (WIDTH - w) / 2;
    ctx.drawImage(img, x, y, w, h);
    y += h;
  }

  // dibujamos logos centrados en una fila (3 columnas)
  if (logos.length > 0) {
    const logosY = HEIGHT - logosAreaHeight + 30; // posición vertical para logos
    // limitamos tamaño max por logo
    const maxLogoW = 180;
    const gap = 40;
    const totalWidthLogos = logos.reduce((acc, l) => acc + Math.min(l.width, maxLogoW), 0) + gap * (logos.length - 1);
    let startX = (WIDTH - totalWidthLogos) / 2;
    logos.forEach((logo) => {
      const lw = Math.min(logo.width, maxLogoW);
      const aspect = logo.width ? (logo.height / logo.width) : 1;
      const lh = lw * aspect;
      ctx.drawImage(logo, startX, logosY, lw, lh);
      startX += lw + gap;
    });
  }

  return canvas;
};

/** Descargar dataUrl o canvas */
const descargarCanvas = (canvasOrDataUrl, fileName) => {
  let href;
  if (typeof canvasOrDataUrl === "string") href = canvasOrDataUrl;
  else href = canvasOrDataUrl.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * Función principal: combina miniRef + positionRef y agrega 3 logos debajo.
 * Luego (si se pasa carriesInfoRef) genera la segunda captura 1080x1350 centrada.
 */
export async function CapturarInfografias({
  backgroundRef,
  miniRef,
  positionRef,
  carriesInfoRef,
  data,
  nombre = "captura",
  logos = [
    "/tft/assets/Jupeson_LOGO_Sin_Publicidad.png",
    "/illuvium/Illuvium_Arena_Logo.png",
    "/illuvium/illuvium-logo.png"
  ]
}) {
  try {
    console.log({ miniRef, positionRef, carriesInfoRef });
    // normalizamos refs: acepta tanto ref como ref.current
    const miniEl = miniRef?.current ?? (miniRef instanceof HTMLElement ? miniRef : null);
    const posEl = positionRef?.current ?? (positionRef instanceof HTMLElement ? positionRef : null);

    if (!miniEl || !posEl) {
      alert("❌ Faltan referencias para capturar (mini o posicionamiento).");
      return;
    }

    // Esperamos que las imágenes internas estén cargadas (tanto en mini como en posicionamiento)
    try {
      if (backgroundRef?.current) {
        // si backgroundRef abarca todo, lo verificamos también
        await loadAllImages(backgroundRef.current);
      } else {
        await Promise.all([loadAllImages(miniEl).catch(e => { throw e; }), loadAllImages(posEl).catch(e => { throw e; })]);
      }
    } catch (err) {
      console.warn("⚠️ Advertencia: algunas imágenes no se cargaron correctamente:", err);
      // seguimos para intentar la captura de todos modos, pero el usuario verá qué falla en la consola
    }

    // Generamos dataURLs con html-to-image (toPng)
    const dataUrlMini = await toPng(miniEl, { cacheBust: true, pixelRatio: 2 });
    const dataUrlPos = await toPng(posEl, { cacheBust: true, pixelRatio: 2 });

    // Convertimos a Image
    const imgMini = await dataUrlToImage(dataUrlMini);
    const imgPos = await dataUrlToImage(dataUrlPos);

    // Cargamos logos (imagenes)
    const logosImgs = [];
    for (const url of logos) {
      try {
        const li = await loadImageFromUrl(url);
        logosImgs.push(li);
      } catch (e) {
        console.warn(e);
      }
    }

    // Creamos canvas final 1080x1350 y combinamos
    const canvasFinal = await crearCanvasFinal1080x1350({
      elementsImgs: [imgMini, imgPos],
      logos: logosImgs
    });

    // Descargamos Parte 1
    descargarCanvas(canvasFinal, `${nombre}_Parte1.png`);

    // --- Parte 2: captura carriesInfoRef si existe ---
    if (carriesInfoRef) {
      const carriesEl = carriesInfoRef?.current ?? (carriesInfoRef instanceof HTMLElement ? carriesInfoRef : null);
      if (carriesEl) {
        // esperamos imgs internas
        try { await loadAllImages(carriesEl); } catch (e) { console.warn("logos/carries images not fully loaded", e); }

        const dataUrlCarries = await toPng(carriesEl, { cacheBust: true, pixelRatio: 2 });
        const imgCarries = await dataUrlToImage(dataUrlCarries);

        // Para la segunda captura, centramos el elemento dentro de 1080x1350
        const canvas2 = document.createElement("canvas");
        canvas2.width = 1080;
        canvas2.height = 1350;
        const ctx2 = canvas2.getContext("2d");
        ctx2.fillStyle = "#000";
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

        // Escalado para que el elemento quepa en el ancho
        const scale2 = Math.min(1080 / imgCarries.width, (1350 - 40) / imgCarries.height, 1);
        const w2 = imgCarries.width * scale2;
        const h2 = imgCarries.height * scale2;
        const x2 = (1080 - w2) / 2;
        const y2 = 20; // padding top
        ctx2.drawImage(imgCarries, x2, y2, w2, h2);

        descargarCanvas(canvas2, `${nombre}_Parte2.png`);
      }
    }

    alert("📸 Se generaron las capturas correctamente.");
  } catch (err) {
    console.error("❌ Error en CapturarInfografias:", err);
    alert("❌ Error al capturar la infografía. Revisa la consola.");
  }
}
