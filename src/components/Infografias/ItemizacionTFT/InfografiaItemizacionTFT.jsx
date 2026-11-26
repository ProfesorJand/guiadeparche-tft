import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { toPng } from 'html-to-image';
import style from './css/InfografiaItemizacionTFT.module.css';
import {
  dataTFTChampions,
  dataTFTAllItems,
  AllCraftableItems,
  constantesTFT,
  versionTFT,
  setNumberLatest,
  setNumberPBE,
} from '@stores/dataTFT';
import { $itemizacionPorSet } from '@stores/tft/itemizacionCampeones';
import { getLocalTftImage } from '@utils/images';
import {
  buildCraftableApiSet,
  deriveInfographicRow,
  findChampionItemizacion,
  getChampionRoleMeta,
} from '@utils/tftItemClassifier';

const COST_THEMES = {
  1: { border: '#94a3b8', glow: 'rgba(148, 163, 184, 0.24)', badgeBg: 'rgba(148, 163, 184, 0.28)' },
  2: { border: '#22c55e', glow: 'rgba(34, 197, 94, 0.24)', badgeBg: 'rgba(34, 197, 94, 0.28)' },
  3: { border: '#38bdf8', glow: 'rgba(56, 189, 248, 0.25)', badgeBg: 'rgba(56, 189, 248, 0.28)' },
  4: { border: '#a855f7', glow: 'rgba(168, 85, 247, 0.28)', badgeBg: 'rgba(168, 85, 247, 0.3)' },
  5: { border: '#f59e0b', glow: 'rgba(245, 158, 11, 0.28)', badgeBg: 'rgba(245, 158, 11, 0.3)' },
};

const ROLE_CLASS_MAP = {
  tank: style.roleTank,
  fighter: style.roleFighter,
  assassin: style.roleAssassin,
  caster: style.roleCaster,
  marksman: style.roleMarksman,
  specialist: style.roleSpecialist,
  default: style.roleDefault,
};

/**
 * Generador de Infografía de Itemización de Campeones por Coste con identidad Guiadeparche.
 * Exporta en PNG de alta resolución (@2x) con aspect ratios pensados para redes sociales.
 */
const InfografiaItemizacionTFT = ({ setNumber: propSetNumber = null, draftMap = null }) => {
  const canvasRef = useRef(null);
  const currentVersion = useStore(versionTFT);
  const allChampions = useStore(dataTFTChampions) || [];
  const allItems = useStore(dataTFTAllItems) || [];
  const constantes = useStore(constantesTFT);
  const storeItemizacion = useStore($itemizacionPorSet) || {};

  const targetSetNumber = String(
    propSetNumber || (currentVersion === 'pbe' ? setNumberPBE : setNumberLatest)
  );
  const patchLabel =
    currentVersion === 'pbe'
      ? constantes?.MetaCompVersionPBE || 'PBE'
      : constantes?.MetaCompVersion || '';

  const [selectedCost, setSelectedCost] = useState(4);
  const [aspectRatio, setAspectRatio] = useState('4:5'); // '4:5' | '1:1' | '9:16' | 'auto'
  const [maxAlternativos, setMaxAlternativos] = useState(6); // 5 o 6
  const [sortBy, setSortBy] = useState('role'); // 'role' | 'name'
  const [showRole, setShowRole] = useState(true);
  const [onlyConfigured, setOnlyConfigured] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customPatch, setCustomPatch] = useState('');
  const [hiddenChamps, setHiddenChamps] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  // Logos configurables (mismos activos que en el resto de infografías de Guiadeparche)
  const [logos, setLogos] = useState({
    jupeson: true,
    movilnet: false,
    setLogo: true,
    guiadeparche: true,
  });

  // Limpiar campeones ocultados manualmente al cambiar de coste o set
  useEffect(() => {
    setHiddenChamps({});
  }, [selectedCost, targetSetNumber]);

  const setMap = useMemo(() => {
    const baseMap = storeItemizacion[targetSetNumber] || {};
    if (!draftMap) return baseMap;
    return { ...baseMap, ...draftMap };
  }, [storeItemizacion, targetSetNumber, draftMap]);

  const craftableApiSet = useMemo(() => {
    const known = AllCraftableItems(allItems);
    return buildCraftableApiSet(allItems, known);
  }, [allItems]);

  const itemsByApiName = useMemo(() => {
    const map = new Map();
    allItems.forEach((item) => {
      if (item?.apiName) map.set(item.apiName, item);
    });
    return map;
  }, [allItems]);

  // Campeones del set activo y del coste seleccionado (excluye invocaciones cost=0)
  const champsOfCost = useMemo(() => {
    const filtered = allChampions.filter((c) => {
      if (!c?.apiName || c.isOther) return false;
      const setMatch =
        String(c.tft_set || '') === targetSetNumber ||
        c.apiName.toLowerCase().startsWith(`tft${targetSetNumber}_`);
      if (!setMatch) return false;
      return Number(c.cost) === Number(selectedCost);
    });

    const uniqueByApi = new Map();
    filtered.forEach((c) => {
      if (!uniqueByApi.has(c.apiName)) uniqueByApi.set(c.apiName, c);
    });

    const list = Array.from(uniqueByApi.values());

    if (sortBy === 'role') {
      list.sort((a, b) => {
        const ra = getChampionRoleMeta(a);
        const rb = getChampionRoleMeta(b);
        if (ra.order !== rb.order) return ra.order - rb.order;
        return String(a.name || '').localeCompare(String(b.name || ''));
      });
    } else {
      list.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
    }

    return list;
  }, [allChampions, targetSetNumber, selectedCost, sortBy]);

  // Derivar filas con BIS, Alternativos, Radiantes, Artefactos y Emblemas
  const rowsData = useMemo(() => {
    return champsOfCost
      .filter((champ) => !hiddenChamps[champ.apiName])
      .map((champ) => {
        const record = findChampionItemizacion(setMap, champ.apiName);
        return deriveInfographicRow(champ, record, allItems, {
          maxAlternativos,
          maxRadiantes: 3,
          maxArtefactos: 4,
          maxEmblemas: 3,
          craftableApiSet,
        });
      })
      .filter((row) => (onlyConfigured ? row.hasAnyData : true));
  }, [champsOfCost, hiddenChamps, setMap, allItems, maxAlternativos, craftableApiSet, onlyConfigured]);

  const toggleChampVisibility = (apiName) => {
    setHiddenChamps((prev) => ({
      ...prev,
      [apiName]: !prev[apiName],
    }));
  };

  const resolveItemIcon = (apiName) => {
    const item = itemsByApiName.get(apiName);
    if (!item) return null;
    if (item.icon?.startsWith('http')) {
      return item.icon.toLowerCase().replace('.tex', '.png');
    }
    return getLocalTftImage(item.icon, 'items', targetSetNumber);
  };

  const resolveChampIcon = (champ) => {
    const src = champ?.tileIcon || champ?.squareIcon || champ?.icon;
    if (!src) return '/web/logoGP2026.webp';
    if (src.startsWith('http')) {
      return src.toLowerCase().replace('.tex', '.png');
    }
    return getLocalTftImage(src, 'champions/tileIcon', targetSetNumber);
  };

  // Esperar a que todas las imágenes del lienzo estén cargadas antes de exportar PNG
  const waitForImages = (container) => {
    const imgs = Array.from(container.querySelectorAll('img'));
    const tasks = imgs.map((img) => {
      if (img.loading === 'lazy') img.loading = 'eager';
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    return Promise.all(tasks);
  };

  const handleDownloadPng = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await document.fonts.ready;
      await waitForImages(canvasRef.current);

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `Itemizacion_TFT_Set${targetSetNumber}_Coste${selectedCost}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error al generar la infografía PNG:', err);
      alert('Ocurrió un error al capturar la imagen. Verifica que todas las imágenes hayan cargado.');
    } finally {
      setIsExporting(false);
    }
  }, [targetSetNumber, selectedCost]);

  const costTheme = COST_THEMES[selectedCost] || COST_THEMES[4];
  const displayTitle = customTitle.trim() || `ITEMIZACIÓN COSTE ${selectedCost}`;
  const displayPatch = customPatch.trim() || patchLabel;

  const ratioClass =
    aspectRatio === '4:5'
      ? style.ratio45
      : aspectRatio === '1:1'
        ? style.ratio11
        : aspectRatio === '9:16'
          ? style.ratio916
          : style.ratioAuto;

  return (
    <div className={style.wrapper}>
      {/* CONTROLES DE LA INFOGRAFÍA */}
      <div className={style.controlsPanel}>
        <div className={style.controlsRow}>
          {/* Selector de Coste */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Coste de Campeones</span>
            <div className={style.pillGroup}>
              {[1, 2, 3, 4, 5].map((cost) => (
                <button
                  key={cost}
                  type="button"
                  className={`${style.pillBtn} ${selectedCost === cost ? style.pillBtnActive : ''}`}
                  onClick={() => setSelectedCost(cost)}
                >
                  Coste {cost}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio para Redes Sociales */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Formato / Aspect Ratio</span>
            <div className={style.pillGroup}>
              {[
                { id: '4:5', label: '4:5 (IG / X)' },
                { id: '1:1', label: '1:1 (Cuadrado)' },
                { id: '9:16', label: '9:16 (Stories)' },
                { id: 'auto', label: 'Auto' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${style.pillBtn} ${aspectRatio === opt.id ? style.pillBtnActive : ''}`}
                  onClick={() => setAspectRatio(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad de ítems alternativos */}
          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Alternativos</span>
            <div className={style.pillGroup}>
              {[5, 6].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`${style.pillBtn} ${maxAlternativos === n ? style.pillBtnActive : ''}`}
                  onClick={() => setMaxAlternativos(n)}
                >
                  {n} ítems
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={style.downloadBtn}
            onClick={handleDownloadPng}
            disabled={isExporting || rowsData.length === 0}
          >
            <span>📸</span>
            <span>{isExporting ? 'Generando PNG...' : 'Descargar Infografía PNG'}</span>
          </button>
        </div>

        {/* Fila 2: Título, Parche, Orden y Opciones */}
        <div className={style.controlsRow}>
          <div className={style.controlGroup}>
            <label className={style.controlLabel} htmlFor="infog-title">
              Título Personalizado
            </label>
            <input
              id="infog-title"
              type="text"
              className={style.textInput}
              placeholder={`ITEMIZACIÓN COSTE ${selectedCost}`}
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
            />
          </div>

          <div className={style.controlGroup}>
            <label className={style.controlLabel} htmlFor="infog-patch">
              Parche
            </label>
            <input
              id="infog-patch"
              type="text"
              className={`${style.textInput} ${style.textInputSmall}`}
              placeholder={patchLabel || 'Ej: 17.6'}
              value={customPatch}
              onChange={(e) => setCustomPatch(e.target.value)}
            />
          </div>

          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Orden</span>
            <div className={style.pillGroup}>
              <button
                type="button"
                className={`${style.pillBtn} ${sortBy === 'role' ? style.pillBtnActive : ''}`}
                onClick={() => setSortBy('role')}
              >
                Por Rol
              </button>
              <button
                type="button"
                className={`${style.pillBtn} ${sortBy === 'name' ? style.pillBtnActive : ''}`}
                onClick={() => setSortBy('name')}
              >
                A–Z
              </button>
            </div>
          </div>

          <div className={style.controlGroup}>
            <span className={style.controlLabel}>Visualización</span>
            <div className={style.pillGroup}>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showRole}
                  onChange={(e) => setShowRole(e.target.checked)}
                />
                <span>Mostrar Rol</span>
              </label>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={onlyConfigured}
                  onChange={(e) => setOnlyConfigured(e.target.checked)}
                />
                <span>Solo con ítems</span>
              </label>
            </div>
          </div>
        </div>

        {/* Fila 3: Logos del Footer */}
        <div className={style.controlsRow}>
          <span className={style.controlLabel}>Logos en Footer:</span>
          {[
            { key: 'jupeson', label: 'Jupeson' },
            { key: 'movilnet', label: 'Movilnet' },
            { key: 'setLogo', label: `Logo Set ${targetSetNumber}` },
            { key: 'guiadeparche', label: 'Guiadeparche' },
          ].map((lg) => (
            <label key={lg.key} className={style.checkboxLabel}>
              <input
                type="checkbox"
                checked={logos[lg.key]}
                onChange={(e) =>
                  setLogos((prev) => ({
                    ...prev,
                    [lg.key]: e.target.checked,
                  }))
                }
              />
              <span>{lg.label}</span>
            </label>
          ))}
        </div>

        {/* Selección manual de campeones (útil para dividir costes largos en 2 imágenes) */}
        {champsOfCost.length > 0 && (
          <div className={style.champFilterBox}>
            <span className={style.controlLabel}>
              Campeones incluidos ({rowsData.length} de {champsOfCost.length} — clic para mostrar/ocultar):
            </span>
            <div className={style.champChips}>
              {champsOfCost.map((champ) => {
                const isVisible = !hiddenChamps[champ.apiName];
                return (
                  <button
                    key={champ.apiName}
                    type="button"
                    className={`${style.champChip} ${isVisible ? style.champChipActive : ''}`}
                    onClick={() => toggleChampVisibility(champ.apiName)}
                  >
                    <span>{isVisible ? '✓' : '✕'}</span>
                    <span>{champ.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* LIENZO EXPORTABLE DE LA INFOGRAFÍA */}
      <div className={style.previewStage}>
        <div
          ref={canvasRef}
          className={`${style.canvas} ${ratioClass}`}
          style={{
            '--cost-border': costTheme.border,
            '--cost-glow': costTheme.glow,
            '--cost-badge-bg': costTheme.badgeBg,
          }}
        >
          {/* HEADER GUIADEPARCHE */}
          <div className={style.canvasHeader}>
            <div className={style.headerLeft}>
              <div className={style.headerMeta}>
                <span>TFT SET {targetSetNumber}</span>
                {displayPatch && <span>· PARCHE {displayPatch}</span>}
                <span className={style.costTag}>COSTE {selectedCost}</span>
              </div>
              <h2 className={style.canvasTitle}>{displayTitle}</h2>
            </div>

            <div className={style.headerRight}>
              <div className={style.brandPill}>
                <span className={style.brandDomain}>GUIADEPARCHE.COM</span>
                <span className={style.brandSub}>GUÍA DE ITEMIZACIÓN META</span>
              </div>
              <img
                src="/tft/assets/t-logo.png"
                alt="Logo TFT"
                className={style.headerIcon}
              />
            </div>
          </div>

          {/* TABLA DE ITEMIZACIÓN */}
          <div className={style.tableContainer}>
            <div
              className={`${style.tableHeaderRow} ${!showRole ? style.tableHeaderRowNoRole : ''}`}
            >
              <div className={`${style.colHead} ${style.colHeadChamp}`}>Campeón</div>
              <div className={`${style.colHead} ${style.colHeadBis}`}>BIS</div>
              <div className={`${style.colHead} ${style.colHeadAlt}`}>
                Alternativos ({maxAlternativos})
              </div>
              <div className={`${style.colHead} ${style.colHeadRad}`}>Radiantes</div>
              <div className={`${style.colHead} ${style.colHeadArt}`}>Artefactos</div>
              <div className={`${style.colHead} ${style.colHeadEmb}`}>Emblemas</div>
            </div>

            {rowsData.length === 0 ? (
              <div className={style.emptyCanvasNotice}>
                No hay campeones de Coste {selectedCost} para mostrar con los filtros actuales.
                Configura las builds en la tabla de itemización o desactiva &quot;Solo con ítems&quot;.
              </div>
            ) : (
              rowsData.map((row, idx) => {
                const roleMeta = getChampionRoleMeta(row.champ);
                const roleClass = ROLE_CLASS_MAP[roleMeta.group] || style.roleDefault;

                return (
                  <div
                    key={row.champ.apiName}
                    className={`${style.champRow} ${!showRole ? style.champRowNoRole : ''} ${
                      idx % 2 === 1 ? style.champRowAlt : ''
                    }`}
                  >
                    {/* 1. Campeón + Rol */}
                    <div className={style.champCell}>
                      <img
                        src={resolveChampIcon(row.champ)}
                        alt={row.champ.name}
                        className={style.champAvatar}
                        crossOrigin="anonymous"
                      />
                      <div className={style.champIdentity}>
                        <span className={style.champName}>{row.champ.name}</span>
                        {showRole && (
                          <span className={`${style.roleBadge} ${roleClass}`}>
                            {roleMeta.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 2. BIS Principal (3 ítems) */}
                    <div className={`${style.itemsGroup} ${style.itemsGroupBis}`}>
                      {row.bisPrincipal.length > 0 ? (
                        row.bisPrincipal.map((apiName, i) => {
                          const src = resolveItemIcon(apiName);
                          return (
                            <div
                              key={`${apiName}-${i}`}
                              className={`${style.itemIconBox} ${style.itemIconBoxBis}`}
                            >
                              {src && (
                                <img
                                  src={src}
                                  alt={apiName}
                                  className={style.itemIconImg}
                                  crossOrigin="anonymous"
                                />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <span className={style.emptySlotDash}>—</span>
                      )}
                    </div>

                    {/* 3. Ítems Alternativos (5 o 6 crafteables sin repetir BIS) */}
                    <div className={style.itemsGroup}>
                      {row.alternativos.length > 0 ? (
                        row.alternativos.map((apiName, i) => {
                          const src = resolveItemIcon(apiName);
                          return (
                            <div key={`${apiName}-${i}`} className={style.itemIconBox}>
                              {src && (
                                <img
                                  src={src}
                                  alt={apiName}
                                  className={style.itemIconImg}
                                  crossOrigin="anonymous"
                                />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <span className={style.emptySlotDash}>—</span>
                      )}
                    </div>

                    {/* 4. Radiantes */}
                    <div className={style.itemsGroup}>
                      {row.radiantes.length > 0 ? (
                        row.radiantes.map((apiName, i) => {
                          const src = resolveItemIcon(apiName);
                          return (
                            <div
                              key={`${apiName}-${i}`}
                              className={`${style.itemIconBox} ${style.itemIconBoxRad}`}
                            >
                              {src && (
                                <img
                                  src={src}
                                  alt={apiName}
                                  className={style.itemIconImg}
                                  crossOrigin="anonymous"
                                />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <span className={style.emptySlotDash}>—</span>
                      )}
                    </div>

                    {/* 5. Artefactos */}
                    <div className={style.itemsGroup}>
                      {row.artefactos.length > 0 ? (
                        row.artefactos.map((apiName, i) => {
                          const src = resolveItemIcon(apiName);
                          return (
                            <div
                              key={`${apiName}-${i}`}
                              className={`${style.itemIconBox} ${style.itemIconBoxArt}`}
                            >
                              {src && (
                                <img
                                  src={src}
                                  alt={apiName}
                                  className={style.itemIconImg}
                                  crossOrigin="anonymous"
                                />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <span className={style.emptySlotDash}>—</span>
                      )}
                    </div>

                    {/* 6. Emblemas */}
                    <div className={style.itemsGroup}>
                      {row.emblemas.length > 0 ? (
                        row.emblemas.map((apiName, i) => {
                          const src = resolveItemIcon(apiName);
                          return (
                            <div
                              key={`${apiName}-${i}`}
                              className={`${style.itemIconBox} ${style.itemIconBoxEmb}`}
                            >
                              {src && (
                                <img
                                  src={src}
                                  alt={apiName}
                                  className={style.itemIconImg}
                                  crossOrigin="anonymous"
                                />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <span className={style.emptySlotDash}>—</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER CON LOGOS DE GUIADEPARCHE */}
          {(logos.jupeson || logos.movilnet || logos.setLogo || logos.guiadeparche) && (
            <div className={style.canvasFooter}>
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
                    src={`/tft/sets/${targetSetNumber}/logo2.webp`}
                    alt={`Logo Set ${targetSetNumber}`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfografiaItemizacionTFT;
