import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import styles from './css/NewsBar.module.css';
import {
  $newsConfig,
  loadNewsConfig,
  seedNewsConfig,
  registerNewsClick,
} from '@stores/news';
import {
  renderFormattedNewsText,
  stripNewsFormatting,
} from '@utils/newsFormatter';

const speedMultipliers = {
  slow: 10,
  normal: 6,
  fast: 4.5,
};

/**
 * Barra de Noticias deslizante (Ticker) de Guiadeparche.
 * - variant="inline": se renderiza dentro de `.breadcrumbsContent` junto a las migas de pan.
 * - variant="standalone": se renderiza como barra independiente en páginas sin migas de pan (ej. "/").
 * - variant="preview": se utiliza dentro del panel AdminNoticias para vista previa en vivo.
 */
const NewsBar = ({
  initialConfig = null,
  previewConfig = null,
  variant = 'inline',
}) => {
  const storeConfig = useStore($newsConfig);
  const isPreview = Boolean(previewConfig);

  useEffect(() => {
    if (isPreview) return;

    // Sembrar store con datos iniciales del build si todavía no hay caché local
    if (initialConfig) {
      seedNewsConfig(initialConfig);
    }

    // Sincronizar con la base de datos en cliente
    loadNewsConfig();
  }, [isPreview]);

  // En modo preview usamos directamente el estado local del formulario; en vivo, Nanostores o initialConfig (SSR)
  const activeConfig = isPreview
    ? previewConfig
    : storeConfig?.items?.length > 0 || storeConfig?.enabled
      ? storeConfig
      : initialConfig || storeConfig;

  if (!activeConfig || !activeConfig.enabled) return null;

  const activeItems = (activeConfig.items || []).filter(
    (item) => item.enabled !== false && item.text && item.text.trim()
  );

  if (activeItems.length === 0) return null;

  // Relleno automático: asegura al menos 5 elementos en el bloque para llenar pantallas anchas
  // y garantizar un bucle infinito continuo sin espacios vacíos
  let displayList = [...activeItems];
  while (displayList.length < 5) {
    displayList = [...displayList, ...activeItems];
  }

  // Separación configurable entre elementos
  let separatorMargin = '40px';
  if (activeConfig.spacing === 'normal') separatorMargin = '24px';
  if (activeConfig.spacing === 'wide') separatorMargin = '64px';

  // Duración proporcional al contenido para mantener una velocidad visual constante
  const multiplier = speedMultipliers[activeConfig.speed] || speedMultipliers.normal;
  const duration = Math.max(25, Math.round(displayList.length * multiplier));
  const separator = activeConfig.separator || '✦';

  const handleItemClick = (item) => {
    if (isPreview || !item?.id) return;
    registerNewsClick(item.id);
  };

  const renderItemContent = (item, keyPrefix) => {
    const target = item.openInNewTab ? '_blank' : undefined;
    const rel = item.openInNewTab ? 'noopener noreferrer' : undefined;
    const itemKey = `${keyPrefix}-${item.id || 'item'}`;

    if (item.url && item.url.trim()) {
      return (
        <span key={itemKey} className={styles.itemGroup}>
          <a
            href={item.url}
            className={styles.itemLink}
            target={target}
            rel={rel}
            title={stripNewsFormatting(item.text)}
            onClick={() => handleItemClick(item)}
          >
            {renderFormattedNewsText(item.text, styles)}
          </a>
          <span className={styles.separator} aria-hidden="true">
            {separator}
          </span>
        </span>
      );
    }

    return (
      <span key={itemKey} className={styles.itemGroup}>
        <span className={styles.itemText}>
          {renderFormattedNewsText(item.text, styles)}
        </span>
        <span className={styles.separator} aria-hidden="true">
          {separator}
        </span>
      </span>
    );
  };

  const barContent = (
    <div
      className={`${styles.newsBar} ${isPreview ? styles.newsBarPreview : ''}`}
      role="region"
      aria-label="Barra de avisos y noticias"
      style={{
        '--marquee-duration': `${duration}s`,
        '--news-separator-margin': separatorMargin,
      }}
    >
      {activeConfig.badgeText && activeConfig.badgeText.trim() && (
        <div className={styles.badge}>
          <span className={styles.pulseDot} aria-hidden="true" />
          <span>{activeConfig.badgeText}</span>
        </div>
      )}

      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack}>
          {/* Bloque A (contenido principal) */}
          <div className={styles.itemGroup}>
            {displayList.map((item, idx) => renderItemContent(item, `c1-${idx}`))}
          </div>
          {/* Bloque B (duplicado exacto para el bucle infinito sin cortes) */}
          <div className={styles.itemGroup} aria-hidden="true">
            {displayList.map((item, idx) => renderItemContent(item, `c2-${idx}`))}
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === 'standalone') {
    return (
      <div className={styles.standaloneBar}>
        <div className={styles.standaloneContent}>{barContent}</div>
      </div>
    );
  }

  return barContent;
};

export default NewsBar;
