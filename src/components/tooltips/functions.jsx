import DOMPurify from "dompurify";
import parse from "html-react-parser";
import style from "./tooltips.module.css";

export const SanitizedComponent = ({ htmlContent }) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent);
  return <div className={style.tooltipDesc}>{parse(sanitizedContent)}</div>; // Usa `parse` para renderizar el HTML sanitizado
}

export const replaceIcons = (desc) => {
  if (!desc) return desc;
  return desc.replace(/%i:([A-Za-z0-9_]+)%/g, (match, stat) => {
    const validIcons = ['scaleAD', 'scaleAP', 'scaleAS', 'scaleArmor', 'scaleHealth'];
    
    if (validIcons.includes(stat)) {
      return `<img src="/riot/assets/${stat}.svg" class="${style.statIcon}" alt="${stat}" />`;
    }

    // Fallback para los que no tienen SVG
    const statMap = {
      scaleMR: "MR",
      scaleMana: "Mana"
    };
    return statMap[stat] || stat.replace('scale', '');
  });
}

export const replaceVariables = (desc, effects) => {
  if (!desc) return desc;
  
  let result = desc;
  if (effects) {
    // Convert effects keys to lowercase for case-insensitive matching
    const lowerEffects = Object.keys(effects).reduce((acc, key) => {
      acc[key.toLowerCase()] = effects[key];
      return acc;
    }, {});

    result = result.replace(/(?:<br\s*\/?>\s*)*@([a-zA-Z0-9_.:]+)(\*100)?@/gi, (match, key, multiplier) => {
      let value = lowerEffects[key.toLowerCase()];
      if (value !== undefined) {
        // Si existe el multiplicador (*100), realiza la operación y redondea
        if (multiplier) {
          value = Math.round(value * 100);
        }
        const brs = match.match(/^(?:<br\s*\/?>\s*)*/i)[0];
        return brs + value; // Devuelve los <br> originales y el valor
      }

      return ``; // Si no encuentra el valor, borra también los <br> previos
    });
  } else {
    result = result.replace(/(?:<br\s*\/?>\s*)*@([a-zA-Z0-9_.:]+)(\*100)?@/gi, "");
  }

  return replaceIcons(result);
}

export const formatChampionDescription = (desc, variablesArray) => {
  if (!desc) return "";
  
  // 1. Convertir el array de variables en un diccionario para fácil acceso
  const effects = {};
  if (Array.isArray(variablesArray)) {
    variablesArray.forEach(v => {
      const lowerName = v.name.toLowerCase();
      if (v.value && v.value.length >= 4) {
        // Los indices 1, 2, 3 corresponden a 1, 2, 3 estrellas
        if (v.value[1] === v.value[2] && v.value[2] === v.value[3]) {
          effects[lowerName] = Math.round(v.value[1] * 100) / 100;
        } else {
          effects[lowerName] = `${Math.round(v.value[1]*100)/100}/${Math.round(v.value[2]*100)/100}/${Math.round(v.value[3]*100)/100}`;
        }
      } else {
        effects[lowerName] = v.value?.[0] || 0;
      }
    });
  }

  // 2. Reemplazar las variables @VarName@ o @VarName*100@ y eliminar <br> huérfanos
  let formattedDesc = desc.replace(/(?:<br\s*\/?>\s*)*@([a-zA-Z0-9_.:]+)(\*100)?@/gi, (match, key, multiplier) => {
    const lowerKey = key.toLowerCase();
    let value = effects[lowerKey];
    
    // Fallbacks comunes porque a veces la API no manda la variable computada exacta
    if (value === undefined) {
      if (lowerKey.includes("damage")) value = effects["damage"] || effects["basedamage"];
      else if (lowerKey.includes("heal")) value = effects["heal"] || effects["baseheal"];
      else if (lowerKey.includes("shield")) value = effects["shield"] || effects["baseshield"];
      else if (lowerKey.includes("percent")) value = effects["percent"];
    }

    if (value !== undefined) {
      if (multiplier && typeof value === 'number') {
        value = Math.round(value * 100);
      }
      const brs = match.match(/^(?:<br\s*\/?>\s*)*/i)[0];
      return brs + value;
    }
    return "";
  });

  // 3. Eliminar etiquetas lógicas que no se deben mostrar
  formattedDesc = formattedDesc.replace(/<\/?(ShowIf|scaleLevel|TFTBonus|tftitemrules|TFTTracker)[^>]*>/gi, '');

  // 4. Reemplazar iconos %i:scaleAP% por imagenes
  formattedDesc = replaceIcons(formattedDesc);

  // 5. Transformar etiquetas de color a <span> con clase de CSS modules
  formattedDesc = formattedDesc.replace(/<([A-Za-z0-9]+)[^>]*>/g, (match, tag) => {
    if (tag.toLowerCase() === 'br' || tag.toLowerCase() === 'span') return match;
    const className = style[tag] || tag; // usa la clase del modulo si existe
    return `<span class="${className}">`;
  }).replace(/<\/([A-Za-z0-9]+)>/g, (match, tag) => {
    if (tag.toLowerCase() === 'br' || tag.toLowerCase() === 'span') return match;
    return `</span>`;
  });

  return formattedDesc;
}
