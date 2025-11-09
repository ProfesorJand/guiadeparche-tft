// src/functions/CombinarImagenesVertical.js
export async function CombinarImagenesVertical(img1, img2) {
  // img1 y img2 pueden ser canvas o ImageBitmap o Image
  const width = Math.max(img1.width, img2.width);
  const height = img1.height + img2.height;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img1, 0, 0);
  ctx.drawImage(img2, 0, img1.height);

  return canvas;
}
