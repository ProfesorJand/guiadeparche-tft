import DOMPurify from "dompurify";
import parse from "html-react-parser";
import style from "./tooltips.module.css";

export const SanitizedComponent = ({ htmlContent }) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent);
  return <div className={style.tooltipDesc}>{parse(sanitizedContent)}</div>; // Usa `parse` para renderizar el HTML sanitizado
}

export const replaceVariables = (desc, effects) => {
  return desc?.replace(/@(\w+)(\*100)?@/g, (_, key, multiplier) => {
    let value = effects[key];
    if (value !== undefined) {
      // Si existe el multiplicador (*100), realiza la operación y redondea
      if (multiplier) {
        value = Math.round(value * 100);
      }
      return value; // Devuelve el valor final
    }

    return ``; // Si no encuentra el valor, deja el marcador (vacio).
  });
}

