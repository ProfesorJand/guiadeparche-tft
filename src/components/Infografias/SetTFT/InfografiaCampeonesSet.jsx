import React, { useMemo, useRef, useState, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { toPng } from 'html-to-image';
import style from './css/InfografiaCampeonesSet.module.css';
import set19Catalog from '../../../data/set19_es_MX.json';
import {
  dataTFTChampions,
  dataTFTTraits,
  constantesTFT,
  setNumberLatest,
  setNumberPBE,
} from '@stores/dataTFT';
import { getLocalTftImage } from '@utils/images';

// Icono SVG de candado abierto para campeones desbloqueables
const UnlockIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 7.46-2" />
  </svg>
);

const GRID_AXIS_OPTIONS = [2, 3, 4, 5, 6];
const VISUAL_GRID_MAX = 6;

const getCostClass = (cost, isOther = false) => {
  const n = Number(cost);
  if (isOther || n === 0) return style.costOther;
  if (n === 1) return style.cost1;
  if (n === 2) return style.cost2;
  if (n === 3) return style.cost3;
  if (n === 4) return style.cost4;
  if (n === 5) return style.cost5;
  if (n >= 6) return style.cost7;
  return style.cost1;
};

/**
 * Generador paginado de Infografías de Campeones de un Set de TFT.
 * Divide automáticamente todos los campeones en múltiples lienzos según la cuadrícula (4x4 = 16 por defecto)
 * con Header arriba, Cuadrícula al centro y Footer con logos abajo.
 */
const InfografiaCampeonesSet = () => {
  const storeChampions = useStore(dataTFTChampions) || [];
  const storeTraits = useStore(dataTFTTraits) || [];
  const constantes = useStore(constantesTFT);

  const availableSets = useMemo(() => {
    const sets = new Set(['19', String(setNumberPBE || '19'), String(setNumberLatest || '18')]);
    return Array.from(sets)
      .filter(Boolean)
      .sort((a, b) => Number(b) - Number(a));
  }, []);

  const [selectedSet, setSelectedSet] = useState(availableSets[0] || '19');
  const [gridCols, setGridCols] = useState(4);
  const [gridRows, setGridRows] = useState(4);
  const [hoverGrid, setHoverGrid] = useState(null); // { cols, rows } | null
  const [selectedCost, setSelectedCost] = useState('all');
  const [sortBy, setSortBy] = useState('cost-desc'); // 'cost-desc' | 'cost-asc' | 'name'
  const [onlyUnlockable, setOnlyUnlockable] = useState(false);
  const [includeOthers, setIncludeOthers] = useState(false);
  const [traitsAlign, setTraitsAlign] = useState('left'); // 'left' | 'right'
  const [customTitle, setCustomTitle] = useState('');
  const [showCtaOnEmpty, setShowCtaOnEmpty] = useState(true);
  const [exportingIndex, setExportingIndex] = useState(null);
  const [exportAllProgress, setExportAllProgress] = useState(null);

  const [logos, setLogos] = useState({
    jupeson: true,
    movilnet: false,
    setLogo: true,
    guiadeparche: true,
  });

  // Referencias a cada lienzo generado para descarga individual o masiva
  const pageRefs = useRef([]);

  // Catálogo base de campeones y rasgos según el Set elegido
  const { rawChampions, traitsMap } = useMemo(() => {
    if (String(selectedSet) === '19' && Array.isArray(set19Catalog?.champions)) {
      const tMap = {};
      (set19Catalog.traits || []).forEach((tr) => {
        if (tr?.apiName) tMap[tr.apiName] = tr;
        if (tr?.name) tMap[tr.name] = tr;
      });
      return {
        rawChampions: set19Catalog.champions,
        traitsMap: tMap,
      };
    }

    // Respaldo para otros sets (ej. Set 18) desde el store global de TFT
    const setStr = String(selectedSet);
    const filteredStoreChamps = storeChampions.filter((c) => {
      if (!c?.apiName) return false;
      return (
        String(c.tft_set || '') === setStr ||
        c.apiName.toLowerCase().startsWith(`tft${setStr}_`)
      );
    });

    const tMap = {};
    storeTraits.forEach((tr) => {
      if (tr?.apiName) tMap[tr.apiName] = tr;
      if (tr?.name) tMap[tr.name] = tr;
    });

    return {
      rawChampions: filteredStoreChamps,
      traitsMap: tMap,
    };
  }, [selectedSet, storeChampions, storeTraits]);

  // Costes disponibles en el set activo
  const availableCosts = useMemo(() => {
    const costSet = new Set();
    rawChampions.forEach((c) => {
      const n = Number(c?.cost);
      if (n > 0 && !c?.isOther) costSet.add(n);
    });
    return Array.from(costSet).sort((a, b) => a - b);
  }, [rawChampions]);

  // Lista filtrada y ordenada de campeones
  const filteredChampions = useMemo(() => {
    const unique = new Map();
    rawChampions.forEach((c) => {
      if (!c?.apiName) return;
      if (!unique.has(c.apiName)) unique.set(c.apiName, c);
    });

    const list = Array.from(unique.values()).filter((c) => {
      const isOther = Boolean(c.isOther || c.ability?.isOther) || Number(c.cost) === 0;
      if (isOther && !includeOthers) return false;
      if (selectedCost !== 'all' && Number(c.cost) !== Number(selectedCost)) return false;
      if (onlyUnlockable && !c.unlock?.isUnlockable) return false;
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'name') {
        return String(a.name || '').localeCompare(String(b.name || ''));
      }
      if (sortBy === 'cost-desc') {
        return Number(b.cost || 0) - Number(a.cost || 0) || String(a.name || '').localeCompare(String(b.name || ''));
      }
      return Number(a.cost || 0) - Number(b.cost || 0) || String(a.name || '').localeCompare(String(b.name || ''));
    });

    return list;
  }, [rawChampions, includeOthers, selectedCost, onlyUnlockable, sortBy]);

  // Dividir campeones en páginas de (gridCols * gridRows)
  const safeCols = Math.max(1, Math.min(8, Number(gridCols) || 4));
  const safeRows = Math.max(1, Math.min(8, Number(gridRows) || 4));
  const perPage = safeCols * safeRows;

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filteredChampions.length; i += perPage) {
      chunks.push(filteredChampions.slice(i, i + perPage));
    }
    return chunks;
  }, [filteredChampions, perPage]);

  // Resolutor de imagen horizontal del campeón (carpeta `icon` con respaldos)
  const resolveChampHorizontalImg = useCallback(
    (champ) => {
      const src = champ?.icon || champ?.tileIcon || champ?.squareIcon;
      if (!src) return '/web/logoGP2026.webp';
      if (src.startsWith('http') || src.startsWith('/')) {
        return src.toLowerCase().replace('.tex', '.png');
      }
      if (String(selectedSet) === '19') {
        return `/tft/sets/19/champions/icon/${src}`;
      }
      return getLocalTftImage(src, 'champions/icon', selectedSet);
    },
    [selectedSet]
  );

  // Resolutor de icono de rasgo
  const resolveTraitIcon = useCallback(
    (traitObj) => {
      const icon = traitObj?.icon;
      if (!icon) return '';
      if (icon.startsWith('http') || icon.startsWith('/')) {
        return icon.toLowerCase().replace('.tex', '.png');
      }
      return `/tft/sets/${selectedSet}/traits/${icon}`;
    },
    [selectedSet]
  );

  // Esperar carga completa de imágenes antes de exportar PNG
  const waitForImages = (container) => {
    const imgs = Array.from(container.querySelectorAll('img'));
    return Promise.all(
      imgs.map((img) => {
        if (img.loading === 'lazy') img.loading = 'eager';
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };

  const downloadSinglePage = useCallback(
    async (pageIdx) => {
      const node = pageRefs.current[pageIdx];
      if (!node) return;
      setExportingIndex(pageIdx);
      try {
        await document.fonts.ready;
        await waitForImages(node);

        const dataUrl = await toPng(node, {
          cacheBust: true,
          pixelRatio: 2,
        });

        const link = document.createElement('a');
        const costSuffix = selectedCost !== 'all' ? `_Coste${selectedCost}` : '';
        link.download = `Infografia_Campeones_TFT_Set${selectedSet}${costSuffix}_Parte${pageIdx + 1}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error(`Error exportando página ${pageIdx + 1}:`, err);
        alert(`No se pudo exportar la infografía ${pageIdx + 1}. Verifica que las imágenes hayan cargado.`);
      } finally {
        setExportingIndex(null);
      }
    },
    [selectedSet, selectedCost]
  );

  const handleDownloadAll = useCallback(async () => {
    if (pages.length === 0) return;
    for (let i = 0; i < pages.length; i++) {
      setExportAllProgress({ current: i + 1, total: pages.length });
      await downloadSinglePage(i);
      // Breve pausa para que el navegador no bloquee múltiples descargas consecutivas
      if (i < pages.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 450));
      }
    }
    setExportAllProgress(null);
  }, [pages.length, downloadSinglePage]);

  const displayTitle = customTitle.trim() || `Set ${selectedSet} TFT: Prismatic Tour`;
  const displayCtaTop = `Descubre todo sobre el Set ${selectedSet} de TFT en:`;
  const hasFooter = Boolean(logos.jupeson || logos.movilnet || logos.setLogo || logos.guiadeparche);

  const getPageCostRangeLabel = (chunk) => {
    const costs = Array.from(new Set(chunk.map((c) => Number(c.cost || 0)).filter((n) => n > 0))).sort(
      (a, b) => a - b
    );
    if (costs.length === 0) return '';
    if (costs.length === 1) return `Coste ${costs[0]}`;
    return `Costes ${costs[0]}–${costs[costs.length - 1]}`;
  };

  return (
    <div className={style.wrapper}>
      {/* PANEL DE CONTROLES */}
      <div className={style.controlsPanel}>
        <div className={style.controlsRow}>
          {/* Selector de Set */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Set de TFT</span>
            <div className={style.pillGroup}>
              {availableSets.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`${style.pillBtn} ${selectedSet === s ? style.pillBtnActive : ''}`}
                  onClick={() => {
                    setSelectedSet(s);
                    setSelectedCost('all');
                  }}
                >
                  Set {s}
                </button>
              ))}
            </div>
          </div>

          {/* Selector visual e instantáneo de Cuadrícula (Columnas × Filas para todas las infografías) */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>
              Cuadrícula para todas las infografías:{' '}
              <span className={style.gridSizeBadge}>
                {hoverGrid
                  ? `${hoverGrid.cols} cols × ${hoverGrid.rows} filas (${hoverGrid.cols * hoverGrid.rows}/pág)`
                  : `${safeCols} cols × ${safeRows} filas (${perPage}/pág)`}
              </span>
            </span>
            <div className={style.gridPickerWrap}>
              {/* Matriz interactiva 6×6: pasa el cursor y haz clic para elegir cualquier Cols × Filas */}
              <div
                className={style.visualGridPicker}
                onMouseLeave={() => setHoverGrid(null)}
                aria-label="Selector visual de columnas y filas"
              >
                {Array.from({ length: VISUAL_GRID_MAX }, (_, rIdx) =>
                  Array.from({ length: VISUAL_GRID_MAX }, (_, cIdx) => {
                    const c = cIdx + 1;
                    const r = rIdx + 1;
                    const isHovered = hoverGrid && c <= hoverGrid.cols && r <= hoverGrid.rows;
                    const isSelected = !hoverGrid && c <= safeCols && r <= safeRows;
                    return (
                      <button
                        key={`grid-cell-${c}-${r}`}
                        type="button"
                        title={`${c} columnas × ${r} filas (${c * r} por infografía)`}
                        className={`${style.visualGridCell} ${
                          isHovered
                            ? style.visualGridCellHover
                            : isSelected
                              ? style.visualGridCellActive
                              : ''
                        }`}
                        onMouseEnter={() => setHoverGrid({ cols: c, rows: r })}
                        onClick={() => {
                          setGridCols(c);
                          setGridRows(r);
                        }}
                      />
                    );
                  })
                )}
              </div>

              {/* Botones directos por eje (Columnas y Filas) */}
              <div className={style.gridAxisControls}>
                <div className={style.gridAxisRow}>
                  <span className={style.gridAxisLabel}>Columnas:</span>
                  <div className={style.pillGroup}>
                    {GRID_AXIS_OPTIONS.map((n) => (
                      <button
                        key={`col-${n}`}
                        type="button"
                        className={`${style.pillBtn} ${safeCols === n ? style.pillBtnActive : ''}`}
                        onClick={() => setGridCols(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={style.gridAxisRow}>
                  <span className={style.gridAxisLabel}>Filas:</span>
                  <div className={style.pillGroup}>
                    {GRID_AXIS_OPTIONS.map((n) => (
                      <button
                        key={`row-${n}`}
                        type="button"
                        className={`${style.pillBtn} ${safeRows === n ? style.pillBtnActive : ''}`}
                        onClick={() => setGridRows(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.controlsRow}>
          {/* Filtro por Coste */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Filtrar Coste</span>
            <div className={style.pillGroup}>
              <button
                type="button"
                className={`${style.pillBtn} ${selectedCost === 'all' ? style.pillBtnActive : ''}`}
                onClick={() => setSelectedCost('all')}
              >
                Todos
              </button>
              {availableCosts.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${style.pillBtn} ${String(selectedCost) === String(c) ? style.pillBtnActive : ''}`}
                  onClick={() => setSelectedCost(String(c))}
                >
                  {c} Oro
                </button>
              ))}
            </div>
          </div>

          {/* Orden */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Ordenar Por</span>
            <div className={style.pillGroup}>
              <button
                type="button"
                className={`${style.pillBtn} ${sortBy === 'cost-desc' ? style.pillBtnActive : ''}`}
                onClick={() => setSortBy('cost-desc')}
              >
                Coste (5 → 1)
              </button>
              <button
                type="button"
                className={`${style.pillBtn} ${sortBy === 'cost-asc' ? style.pillBtnActive : ''}`}
                onClick={() => setSortBy('cost-asc')}
              >
                Coste (1 → 5)
              </button>
              <button
                type="button"
                className={`${style.pillBtn} ${sortBy === 'name' ? style.pillBtnActive : ''}`}
                onClick={() => setSortBy('name')}
              >
                Nombre (A–Z)
              </button>
            </div>
          </div>

          {/* Posición de rasgos dentro de la imagen */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Rasgos en Imagen</span>
            <div className={style.pillGroup}>
              <button
                type="button"
                className={`${style.pillBtn} ${traitsAlign === 'right' ? style.pillBtnActive : ''}`}
                onClick={() => setTraitsAlign('right')}
              >
                Derecha
              </button>
              <button
                type="button"
                className={`${style.pillBtn} ${traitsAlign === 'left' ? style.pillBtnActive : ''}`}
                onClick={() => setTraitsAlign('left')}
              >
                Izquierda
              </button>
            </div>
          </div>
        </div>

        <div className={style.controlsRow}>
          {/* Textos del Header */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Título del Header</span>
            <input
              type="text"
              className={style.textInput}
              placeholder={`CAMPEONES TFT SET ${selectedSet}`}
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
            />
          </div>

          {/* Opciones y Logos del Footer */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Opciones y Logos del Footer</span>
            <div className={style.pillGroup}>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showCtaOnEmpty}
                  onChange={(e) => setShowCtaOnEmpty(e.target.checked)}
                />
                <span>CTA en espacios vacíos</span>
              </label>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={onlyUnlockable}
                  onChange={(e) => setOnlyUnlockable(e.target.checked)}
                />
                <span>Solo Desbloqueables</span>
              </label>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeOthers}
                  onChange={(e) => setIncludeOthers(e.target.checked)}
                />
                <span>Incluir Otros (coste 0)</span>
              </label>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={logos.jupeson}
                  onChange={(e) => setLogos((p) => ({ ...p, jupeson: e.target.checked }))}
                />
                <span>Jupeson</span>
              </label>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={logos.movilnet}
                  onChange={(e) => setLogos((p) => ({ ...p, movilnet: e.target.checked }))}
                />
                <span>Movilnet</span>
              </label>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={logos.setLogo}
                  onChange={(e) => setLogos((p) => ({ ...p, setLogo: e.target.checked }))}
                />
                <span>Logo Set</span>
              </label>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={logos.guiadeparche}
                  onChange={(e) => setLogos((p) => ({ ...p, guiadeparche: e.target.checked }))}
                />
                <span>Guiadeparche</span>
              </label>
            </div>
          </div>
        </div>

        {/* Barra de resumen y descarga masiva */}
        <div className={style.summaryBar}>
          <div className={style.summaryText}>
            Mostrando <strong>{filteredChampions.length}</strong> campeones · Cuadrícula{' '}
            <strong>
              {safeCols}×{safeRows} ({perPage}/pág)
            </strong>{' '}
            · Total de infografías: <strong>{pages.length}</strong>
          </div>

          <button
            type="button"
            className={style.downloadAllBtn}
            onClick={handleDownloadAll}
            disabled={pages.length === 0 || exportingIndex !== null || exportAllProgress !== null}
          >
            {exportAllProgress
              ? `Exportando ${exportAllProgress.current}/${exportAllProgress.total}...`
              : `Descargar Todas (${pages.length} PNG)`}
          </button>
        </div>
      </div>

      {/* LISTA DE INFOGRAFÍAS GENERADAS */}
      {pages.length === 0 ? (
        <div className={style.emptyNotice}>
          No se encontraron campeones para Set {selectedSet} con los filtros seleccionados.
        </div>
      ) : (
        <div className={style.pagesStack}>
          {pages.map((chunk, pageIdx) => {
            const costRange = getPageCostRangeLabel(chunk);
            const isExportingThis = exportingIndex === pageIdx;
            const emptySlots = Math.max(0, perPage - chunk.length);
            const rem = chunk.length % safeCols;
            const trailingCols = rem === 0 ? 0 : safeCols - rem;
            const extraFullRows = Math.floor((emptySlots - trailingCols) / safeCols);
            const shouldRenderCta = showCtaOnEmpty && emptySlots > 0;
            const ctaGridStyle = shouldRenderCta
              ? extraFullRows > 0
                ? { gridColumn: '1 / -1', gridRow: `span ${extraFullRows}` }
                : { gridColumn: `span ${trailingCols}` }
              : null;
            const ctaSpanCols = extraFullRows > 0 ? safeCols : trailingCols;

            return (
              <div key={`infografia-page-${pageIdx}`} className={style.pageBlock}>
                {/* Barra individual de descarga */}
                <div className={style.pageToolbar}>
                  <div className={style.pageToolbarTitle}>
                    Infografía {pageIdx + 1} de {pages.length}
                    <span className={style.pageToolbarMeta}>
                      ({chunk.length} campeones{costRange ? ` · ${costRange}` : ''})
                    </span>
                  </div>
                  <button
                    type="button"
                    className={style.downloadOneBtn}
                    onClick={() => downloadSinglePage(pageIdx)}
                    disabled={exportingIndex !== null || exportAllProgress !== null}
                  >
                    {isExportingThis ? 'Generando PNG...' : `Descargar PNG (Parte ${pageIdx + 1})`}
                  </button>
                </div>

                {/* Lienzo capturable */}
                <div className={style.previewStage}>
                  <div
                    ref={(el) => {
                      pageRefs.current[pageIdx] = el;
                    }}
                    className={style.canvas}
                  >
                    {/* HEADER */}
                    <header className={style.canvasHeader}>
                      <div className={style.headerLeft}>
                        <h2 className={style.canvasTitle}>{displayTitle}</h2>
                      </div>

                      <div className={style.headerRight}>
                        <div className={style.brandPill}>
                          <span className={style.brandDomain}>GUIADEPARCHE.COM/TFT/SET/19</span>
                          <span className={style.brandSub}>Listado de Campeones</span>
                        </div>
                        <img
                          src="/tft/assets/t-logo.png"
                          alt="Logo TFT"
                          className={style.headerIcon}
                        />
                      </div>
                    </header>

                    {/* CUADRÍCULA DE CAMPEONES */}
                    <div
                      className={style.championsGrid}
                      style={{ '--grid-cols': safeCols, '--grid-rows': safeRows }}
                    >
                      {chunk.map((champ) => {
                        const isOther = Boolean(champ.isOther || champ.ability?.isOther) || Number(champ.cost) === 0;
                        const isUnlockable = Boolean(champ.unlock?.isUnlockable);
                        const champTraits = (champ.traits || []).map(
                          (tKey) =>
                            traitsMap[tKey] || {
                              apiName: tKey,
                              name: String(tKey).replace(/^DA_|19$/g, ''),
                              icon: '',
                            }
                        );

                        return (
                          <article
                            key={champ.apiName}
                            className={`${style.champCard} ${getCostClass(champ.cost, isOther)}`}
                          >
                            {/* Arriba: Imagen horizontal del campeón + Desbloqueable arriba a la izquierda + Rasgos a la izquierda */}
                            <div className={style.champImageWrap}>
                              <img
                                src={resolveChampHorizontalImg(champ)}
                                alt={champ.name}
                                className={style.champSplashImg}
                                loading="eager"
                                crossOrigin="anonymous"
                              />
                              <div
                                className={
                                  traitsAlign === 'right'
                                    ? style.champGradientRight
                                    : style.champGradientLeft
                                }
                              />

                              {isUnlockable && (
                                <div
                                  className={style.unlockBadge}
                                  title="Campeón Desbloqueable"
                                >
                                  <UnlockIcon size={15} />
                                </div>
                              )}

                              {champTraits.length > 0 && (
                                <div
                                  className={
                                    traitsAlign === 'right'
                                      ? style.traitsOverlayRight
                                      : style.traitsOverlayLeft
                                  }
                                >
                                  {champTraits.map((tr, tIdx) => {
                                    const trIconSrc = resolveTraitIcon(tr);
                                    return (
                                      <div
                                        key={`${champ.apiName}-tr-${tIdx}`}
                                        className={style.traitRow}
                                      >
                                        {trIconSrc && (
                                          <img
                                            src={trIconSrc}
                                            alt={tr.name}
                                            className={style.traitIcon}
                                            crossOrigin="anonymous"
                                          />
                                        )}
                                        <span className={style.traitName}>{tr.name}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Abajo: Barra con color de fondo del coste, nombre y coste + moneda dorada */}
                            <div className={style.champBottomBar}>
                              <h3 className={style.champName}>{champ.name}</h3>
                              <div className={style.costPill}>
                                <span className={style.costNumber}>{champ.cost ?? 0}</span>
                                <img
                                  src="/tft/assets/gold-coin.png"
                                  alt="Oro"
                                  className={style.goldCoinIcon}
                                />
                              </div>
                            </div>
                          </article>
                        );
                      })}

                      {/* Bloque CTA automático que une los espacios sobrantes al final de la cuadrícula */}
                      {shouldRenderCta && ctaGridStyle && (
                        <div
                          className={`${style.ctaSlotCard} ${
                            ctaSpanCols === 1
                              ? style.ctaSlotCompact
                              : ctaSpanCols >= 3
                                ? style.ctaSlotWide
                                : ''
                          }`}
                          style={ctaGridStyle}
                        >
                          <p className={style.ctaLine1}>{displayCtaTop}</p>
                          <p className={style.ctaLine2}>
                            <span className={style.ctaDomainHighlight}>guiadeparche.com</span>{' '}
                            <span className={style.ctaBioTag}>(link en bio)</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* FOOTER */}
                    {hasFooter && (
                      <footer className={style.canvasFooter}>
                        {logos.jupeson && (
                          <div className={style.footerLogoSlot}>
                            <img
                              src="/Jupeson_LOGO_Sin_Publicidad_Sin_Bordes.png"
                              alt="Logo Jupeson"
                              className={style.footerLogoImg}
                            />
                          </div>
                        )}
                        {logos.movilnet && (
                          <div className={style.footerLogoSlot}>
                            <img
                              src="/tft/assets/logoMovilnet-e-letras-blancas.png"
                              alt="Logo Movilnet"
                              className={style.footerLogoImg}
                            />
                          </div>
                        )}
                        {logos.setLogo && (
                          <div className={style.footerLogoSlot}>
                            <img
                              src={`/tft/sets/${selectedSet}/logo2.webp`}
                              alt={`Logo Set ${selectedSet}`}
                              className={style.footerLogoImg}
                            />
                          </div>
                        )}
                        {logos.guiadeparche && (
                          <div className={style.footerLogoSlot}>
                            <img
                              src="/web/logoGPSinFondo2026.webp"
                              alt="Logo Guiadeparche"
                              className={style.footerLogoImg}
                            />
                          </div>
                        )}
                      </footer>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InfografiaCampeonesSet;
