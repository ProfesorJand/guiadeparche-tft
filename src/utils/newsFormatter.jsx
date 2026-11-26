import React from 'react';

/**
 * Elimina todas las etiquetas de formato para atributos de accesibilidad, title de enlaces, etc.
 * Mantiene intactos los espacios que rodean al texto.
 */
export const stripNewsFormatting = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*([^*]+?)\*\*/g, (_, p1) => p1)
    .replace(/\[([a-zA-Z0-9#]+)\]([\s\S]*?)\[\/\1\]/gi, (_, _p1, p2) => p2)
    .replace(/\[#([0-9a-fA-F]{3,8})\]([\s\S]*?)\[\/(?:color)?\]/gi, (_, _p1, p2) => p2)
    .replace(/\[color=#[0-9a-fA-F]{3,8}\]([\s\S]*?)\[\/color\]/gi, (_, p1) => p1);
};

/**
 * Diccionario de colores por nombre de etiqueta en español
 */
export const COLOR_MAP = {
  dorado: { classKey: 'hlDorado', color: '#facc15', shadow: 'rgba(250, 204, 21, 0.45)', label: 'Dorado' },
  amarillo: { classKey: 'hlAmarillo', color: '#facc15', shadow: 'rgba(250, 204, 21, 0.45)', label: 'Amarillo' },
  rojo: { classKey: 'hlRojo', color: '#f87171', shadow: 'rgba(248, 113, 113, 0.5)', label: 'Rojo' },
  verde: { classKey: 'hlVerde', color: '#4ade80', shadow: 'rgba(74, 222, 128, 0.5)', label: 'Verde' },
  azul: { classKey: 'hlAzul', color: '#38bdf8', shadow: 'rgba(56, 189, 248, 0.5)', label: 'Azul' },
  cyan: { classKey: 'hlCyan', color: '#22d3ee', shadow: 'rgba(34, 211, 238, 0.5)', label: 'Cyan' },
  violeta: { classKey: 'hlVioleta', color: '#c084fc', shadow: 'rgba(192, 132, 252, 0.5)', label: 'Violeta' },
  morado: { classKey: 'hlMorado', color: '#c084fc', shadow: 'rgba(192, 132, 252, 0.5)', label: 'Morado' },
  naranja: { classKey: 'hlNaranja', color: '#fb923c', shadow: 'rgba(251, 146, 60, 0.5)', label: 'Naranja' },
};

// Etiquetas reconocidas en español
const SPANISH_TAGS = 'dorado|amarillo|rojo|verde|azul|cyan|violeta|morado|naranja';

// Expresión regular general que captura tokens manteniendo delimitadores
const TOKEN_REGEX = new RegExp(
  `(\\*\\*[^*]+?\\*\\*|\\[(?:${SPANISH_TAGS})\\][\\s\\S]*?\\[\\/(?:${SPANISH_TAGS})\\]|\\[#[0-9a-fA-F]{3,8}\\][\\s\\S]*?\\[\\/(?:color)?\\]|\\[color=#[0-9a-fA-F]{3,8}\\][\\s\\S]*?\\[\\/color\\])`,
  'gi'
);

/**
 * Renderiza el texto de noticias procesando **texto**, [color]texto[/color] y [#HEX]texto[/]
 */
export const renderFormattedNewsText = (text, styles = {}) => {
  if (!text || typeof text !== 'string') return '';
  if (!text.includes('**') && !text.includes('[')) return text;

  const parts = text.split(TOKEN_REGEX);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Sintaxis tipo Markdown: **texto**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const content = part.slice(2, -2);
      const styleClass = styles.hlDefault || styles.hlDorado;
      if (styleClass) {
        return (
          <span key={index} className={styleClass}>
            {content}
          </span>
        );
      }
      return (
        <span
          key={index}
          style={{
            color: '#facc15',
            fontWeight: 700,
            textShadow: '0 0 12px rgba(250, 204, 21, 0.45)',
            display: 'inline',
          }}
        >
          {content}
        </span>
      );
    }

    // 2. Sintaxis [color]texto[/color] en español
    const namedTagMatch = part.match(/^\[([a-zA-Z]+)\]([\s\S]*?)\[\/\1\]$/i);
    if (namedTagMatch) {
      const tag = namedTagMatch[1].toLowerCase();
      const content = namedTagMatch[2];
      const colorDef = COLOR_MAP[tag];

      if (colorDef) {
        const tagClass = styles[colorDef.classKey];
        if (tagClass) {
          return (
            <span key={index} className={tagClass}>
              {content}
            </span>
          );
        }
        return (
          <span
            key={index}
            style={{
              color: colorDef.color,
              fontWeight: 700,
              textShadow: `0 0 12px ${colorDef.shadow}`,
              display: 'inline',
            }}
          >
            {content}
          </span>
        );
      }
    }

    // 3. Sintaxis [#HEX]texto[/] o [color=#HEX]texto[/color]
    const hexTagMatch =
      part.match(/^\[#([0-9a-fA-F]{3,8})\]([\s\S]*?)\[\/(?:color)?\]$/i) ||
      part.match(/^\[color=(#[0-9a-fA-F]{3,8})\]([\s\S]*?)\[\/color\]$/i);
    if (hexTagMatch) {
      const hex = hexTagMatch[1].startsWith('#') ? hexTagMatch[1] : `#${hexTagMatch[1]}`;
      const content = hexTagMatch[2];
      return (
        <span
          key={index}
          style={{
            color: hex,
            fontWeight: 700,
            display: 'inline',
          }}
        >
          {content}
        </span>
      );
    }

    // Texto plano sin formato especial
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};
