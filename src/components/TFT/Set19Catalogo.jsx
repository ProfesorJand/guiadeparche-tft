import React, { useState, useMemo, useRef, useEffect } from "react";
import style from "./css/Set19Catalogo.module.css";

// Iconos inline de estadísticas disponibles en public/riot/assets/
const VALID_STAT_SVGS = new Set(["scaleAD", "scaleAP", "scaleAS", "scaleArmor", "scaleHealth"]);
const STAT_TEXT_FALLBACK = {
  scaleMR: "RM",
  scaleMana: "Maná",
};

/**
 * Convierte de forma segura (100% compatible con Astro SSR) un texto con etiquetas
 * básicas (<br/>, <strong>, <em>) y tokens %i:scaleAP% en elementos JSX limpios,
 * eliminando cualquier etiqueta HTML no deseada para que jamás se vea texto crudo.
 */
const renderFormattedText = (rawText) => {
  if (!rawText) return null;

  // Normalizar saltos de línea y quitar etiquetas desconocidas (conservando <strong>, <em> y <br/>)
  const normalized = String(rawText)
    .replace(/\r?\n/g, "<br/>")
    .replace(/<br\s*\/?>/gi, "<br/>");

  // Dividir por saltos de línea primero
  const lines = normalized.split("<br/>");

  const renderInlineTokens = (lineStr, lineIdx) => {
    // Tokeniza <strong>...</strong>, <em>...</em> y %i:scale...%
    const tokenRegex = /(<strong>.*?<\/strong>|<em>.*?<\/em>|%i:[A-Za-z0-9_]+%)/gi;
    const parts = lineStr.split(tokenRegex);

    return parts.map((part, idx) => {
      if (!part) return null;

      if (/^<strong>.*<\/strong>$/i.test(part)) {
        const inner = part.replace(/^<strong>|<\/strong>$/gi, "");
        return <strong key={`s-${lineIdx}-${idx}`}>{renderInlineTokens(inner, `${lineIdx}-${idx}`)}</strong>;
      }

      if (/^<em>.*<\/em>$/i.test(part)) {
        const inner = part.replace(/^<em>|<\/em>$/gi, "");
        return <em key={`e-${lineIdx}-${idx}`}>{renderInlineTokens(inner, `${lineIdx}-${idx}`)}</em>;
      }

      const iconMatch = part.match(/^%i:([A-Za-z0-9_]+)%$/);
      if (iconMatch) {
        const statKey = iconMatch[1];
        if (VALID_STAT_SVGS.has(statKey)) {
          return (
            <img
              key={`ic-${lineIdx}-${idx}`}
              src={`/riot/assets/${statKey}.svg`}
              alt={statKey}
              className={style.inlineStatIcon}
              loading="lazy"
            />
          );
        }
        return (
          <span key={`st-${lineIdx}-${idx}`} className={style.inlineStatLabel}>
            {STAT_TEXT_FALLBACK[statKey] || statKey.replace(/^scale/i, "")}
          </span>
        );
      }

      // Eliminar cualquier otra etiqueta HTML residual para evitar que aparezca texto crudo
      const safeText = part.replace(/<[^>]+>/g, "");
      return <React.Fragment key={`t-${lineIdx}-${idx}`}>{safeText}</React.Fragment>;
    });
  };

  return lines.map((line, i) => (
    <React.Fragment key={`ln-${i}`}>
      {renderInlineTokens(line, i)}
      {i < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};

// Icono SVG de candado desbloqueado (Unlock)
const UnlockIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

// Icono SVG de rango de ataque
const RangeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="19" x2="19" y2="5" />
    <polyline points="11 5 19 5 19 13" />
    <path d="M5 12c3.5 0 7 3.5 7 7" />
  </svg>
);

// Icono SVG de gota de maná
const ManaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#47b3ff" aria-hidden="true">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const isOtherChampion = (champ) =>
  Boolean(champ?.isOther || champ?.ability?.isOther) || Number(champ?.cost) === 0;

const getCostCardClass = (cost, isOther = false) => {
  const num = Number(cost);
  if (isOther || num === 0) return style.cardCostOther;
  if (num === 1) return style.cardCost1;
  if (num === 2) return style.cardCost2;
  if (num === 3) return style.cardCost3;
  if (num === 4) return style.cardCost4;
  if (num === 5) return style.cardCost5;
  if (num >= 6) return style.cardCost7;
  return style.cardCost1;
};

const getBreakpointStyleClass = (styleCode) => {
  if (styleCode === 6 || styleCode === 7) return style.bpPrismatic;
  if (styleCode === 4 || styleCode === 5) return style.bpGold;
  if (styleCode === 3) return style.bpSilver;
  return style.bpBronze;
};

const Set19Catalogo = ({ champions = [], traits = [], encounters = [], customTabs = [] }) => {
  const defaultTab = customTabs.length > 0 ? customTabs[0].id : "campeones";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCost, setSelectedCost] = useState("all");
  const [selectedTrait, setSelectedTrait] = useState("all");
  const [onlyUnlockable, setOnlyUnlockable] = useState(false);
  const catalogTopRef = useRef(null);

  // Sincronizar con el hash de la URL al cargar (sin navegar a otra página)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const validIds = new Set([...customTabs.map((t) => t.id), "campeones", "sinergias", "encuentros"]);
    if (validIds.has(hash)) {
      setActiveTab(hash);
    }
  }, [customTabs]);

  // Cambiar de pestaña manteniendo la misma página y volviendo arriba del catálogo si el usuario bajó
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tabId}`);
      if (catalogTopRef.current) {
        const rect = catalogTopRef.current.getBoundingClientRect();
        const headerOffset = Math.round(window.innerHeight * 0.08) + 8;
        if (rect.top < headerOffset) {
          const targetY = window.scrollY + rect.top - headerOffset;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        }
      }
    }
  };

  // Mapa rápido de sinergias por apiName para cruzar en las tarjetas de campeones
  const traitsMap = useMemo(() => {
    const map = {};
    traits.forEach((t) => {
      map[t.apiName] = t;
    });
    return map;
  }, [traits]);

  // Lista de costes únicos de tienda ordenados (> 0; los de coste 0 van a "Otros Campeones")
  const availableCosts = useMemo(() => {
    const set = new Set(
      champions
        .filter((c) => !isOtherChampion(c))
        .map((c) => Number(c.cost))
        .filter((n) => n > 0)
    );
    return Array.from(set).sort((a, b) => a - b);
  }, [champions]);

  const otherChampionsTotal = useMemo(
    () => champions.filter((c) => isOtherChampion(c)).length,
    [champions]
  );

  // Campeones filtrados y ordenados (por coste ascendente + nombre; Otros Campeones al final)
  const filteredChampions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return champions
      .filter((champ) => {
        const isOther = isOtherChampion(champ);
        if (selectedCost === "other") {
          if (!isOther) return false;
        } else if (selectedCost !== "all") {
          if (isOther || Number(champ.cost) !== Number(selectedCost)) return false;
        }
        if (onlyUnlockable && !champ.unlock?.isUnlockable) return false;
        if (selectedTrait !== "all") {
          const matchesTrait =
            (champ.traits || []).includes(selectedTrait) ||
            champ.linkedTrait === selectedTrait;
          if (!matchesTrait) return false;
        }

        if (q) {
          const traitIds = [
            ...(champ.traits || []),
            ...(champ.linkedTrait ? [champ.linkedTrait] : []),
          ];
          const champTraitsNames = traitIds
            .map((tId) => traitsMap[tId]?.name || tId)
            .join(" ")
            .toLowerCase();
          const specialItemsText = (champ.specialItems || [])
            .map((it) => `${it.name || ""} ${it.name_EN || ""} ${it.desc || ""}`)
            .join(" ");
          const searchable = [
            champ.name,
            champ.apiName,
            champ.characterName,
            champ.originNote,
            champ.ability?.name,
            champ.ability?.desc,
            champ.role,
            champ.role_legacy,
            champ.unlock?.description,
            champTraitsNames,
            specialItemsText,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!searchable.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const aOther = isOtherChampion(a) ? 1 : 0;
        const bOther = isOtherChampion(b) ? 1 : 0;
        if (aOther !== bOther) return aOther - bOther;
        return Number(a.cost) - Number(b.cost) || a.name.localeCompare(b.name);
      });
  }, [champions, selectedCost, onlyUnlockable, selectedTrait, searchQuery, traitsMap]);

  const regularChampions = useMemo(
    () => filteredChampions.filter((c) => !isOtherChampion(c)),
    [filteredChampions]
  );

  const otherChampions = useMemo(
    () => filteredChampions.filter((c) => isOtherChampion(c)),
    [filteredChampions]
  );

  // Sinergias filtradas por búsqueda
  const filteredTraits = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return traits.filter((trait) => {
      if (!q) return true;
      const searchable = `${trait.name} ${trait.name_EN || ""} ${trait.desc_trait || ""}`.toLowerCase();
      return searchable.includes(q);
    });
  }, [traits, searchQuery]);

  // Encuentros filtrados por búsqueda y ordenados por nombre del campeón anfitrión
  const filteredEncounters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return encounters
      .filter((enc) => {
        if (!q) return true;
        const searchable = `${enc.name} ${enc.name_EN || ""} ${enc.championName || ""} ${enc.desc || ""}`.toLowerCase();
        return searchable.includes(q);
      })
      .sort(
        (a, b) =>
          (a.championName || "").localeCompare(b.championName || "") ||
          (a.name || "").localeCompare(b.name || "")
      );
  }, [encounters, searchQuery]);

  // Campeones agrupados por sinergia para mostrarlos dentro de cada tarjeta de sinergia
  const championsByTrait = useMemo(() => {
    const map = {};
    champions.forEach((champ) => {
      (champ.traits || []).forEach((tId) => {
        if (!map[tId]) map[tId] = [];
        map[tId].push(champ);
      });
    });
    Object.keys(map).forEach((tId) => {
      map[tId].sort((a, b) => Number(a.cost) - Number(b.cost) || a.name.localeCompare(b.name));
    });
    return map;
  }, [champions]);

  const unlockableTotal = useMemo(
    () => champions.filter((c) => c.unlock?.isUnlockable).length,
    [champions]
  );

  return (
    <div ref={catalogTopRef} className={style.catalogoWrapper}>
      {/* Barra fija (sticky) de pestañas: permanece visible al bajar el scroll sin incluir filtros */}
      <nav className={style.stickyTabsBar} aria-label="Secciones de TFT Set 19">
        <div className={style.tabsBar} role="tablist" aria-label="Pestañas de TFT Set 19">
          {customTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`${style.tabBtn} ${activeTab === tab.id ? style.tabBtnActive : ""}`}
              onClick={() => handleSelectTab(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "campeones"}
            aria-controls="panel-campeones"
            className={`${style.tabBtn} ${activeTab === "campeones" ? style.tabBtnActive : ""}`}
            onClick={() => handleSelectTab("campeones")}
          >
            <span>Campeones Set 19</span>
            <span className={style.tabCount}>{champions.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sinergias"}
            aria-controls="panel-sinergias"
            className={`${style.tabBtn} ${activeTab === "sinergias" ? style.tabBtnActive : ""}`}
            onClick={() => handleSelectTab("sinergias")}
          >
            <span>Rasgos (Traits)</span>
            <span className={style.tabCount}>{traits.length}</span>
          </button>

          {encounters.length > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "encuentros"}
              aria-controls="panel-encuentros"
              className={`${style.tabBtn} ${activeTab === "encuentros" ? style.tabBtnActive : ""}`}
              onClick={() => handleSelectTab("encuentros")}
            >
              <span>Encuentros</span>
              <span className={style.tabCount}>{encounters.length}</span>
            </button>
          )}
        </div>
      </nav>

      {/* VISTAS PERSONALIZADAS DE GALERÍA DE IMÁGENES 16:9: se mantienen montadas para cambiar de pestaña al instante sin recargar imágenes */}
      {customTabs.map((tab) => {
        const isTabActive = activeTab === tab.id;
        return (
          <section
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            className={`${style.imageGallerySection} ${!isTabActive ? style.tabPanelHidden : ""}`}
            aria-label={tab.label}
            aria-hidden={!isTabActive}
          >
            {Array.isArray(tab.images) && tab.images.length > 0 ? (
              <div className={style.imageGalleryList}>
                {tab.images.map((item, idx) => {
                  const imgSrc = typeof item === "string" ? item : item?.src;
                  const imgAlt =
                    typeof item === "string"
                      ? `${tab.label} ${idx + 1}`
                      : item?.alt || `${tab.label} ${idx + 1}`;
                  if (!imgSrc) return null;

                  return (
                    <figure key={`${tab.id}-img-${idx}`} className={style.galleryImageCard}>
                      <img
                        src={imgSrc}
                        alt={imgAlt}
                        className={style.galleryImage}
                        loading="eager"
                        decoding="async"
                      />
                    </figure>
                  );
                })}
              </div>
            ) : (
              <div className={style.emptyState}>
                Próximamente: agrega tus imágenes 16:9 en <strong>{tab.label}</strong> dentro de{" "}
                <code>src/pages/tft/set/set-19.astro</code>.
              </div>
            )}
          </section>
        );
      })}

      {/* Panel de búsqueda y filtros (solo visible en Campeones, Rasgos y Encuentros, NO sticky) */}
      {(activeTab === "campeones" || activeTab === "sinergias" || activeTab === "encuentros") && (
        <div className={style.filtersPanel}>
          <div className={style.filtersRow}>
            <input
              type="text"
              className={style.searchInput}
              placeholder={
                activeTab === "campeones"
                  ? "Buscar campeón, habilidad, sinergia, rol o requisito de desbloqueo..."
                  : activeTab === "sinergias"
                    ? "Buscar sinergia o efecto..."
                    : "Buscar encuentro, campeón o efecto..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {activeTab === "campeones" && (
              <select
                className={style.traitSelect}
                value={selectedTrait}
                onChange={(e) => setSelectedTrait(e.target.value)}
                aria-label="Filtrar por sinergia"
              >
                <option value="all">Todas las sinergias</option>
                {traits.map((t) => (
                  <option key={t.apiName} value={t.apiName}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {activeTab === "campeones" && (
            <div className={style.costFilterGroup}>
              <button
                type="button"
                className={`${style.filterPill} ${selectedCost === "all" ? style.filterPillActive : ""}`}
                onClick={() => setSelectedCost("all")}
              >
                Todos los costes
              </button>

              {availableCosts.map((cost) => (
                <button
                  key={cost}
                  type="button"
                  className={`${style.filterPill} ${style.costFilterPill} ${getCostCardClass(cost)} ${Number(selectedCost) === cost ? style.filterPillActive : ""}`}
                  onClick={() => setSelectedCost(String(cost))}
                >
                  <span className={style.costFilterDot} />
                  <span>{cost}</span>
                  <span className={style.coinDot} />
                </button>
              ))}

              {otherChampionsTotal > 0 && (
                <button
                  type="button"
                  className={`${style.filterPill} ${style.costFilterPill} ${style.cardCostOther} ${selectedCost === "other" ? style.filterPillActive : ""}`}
                  onClick={() => setSelectedCost("other")}
                >
                  <span className={style.costFilterDot} />
                  <span>Otros ({otherChampionsTotal})</span>
                </button>
              )}

              <button
                type="button"
                className={`${style.filterPill} ${onlyUnlockable ? style.unlockToggleActive : ""}`}
                onClick={() => setOnlyUnlockable((prev) => !prev)}
              >
                <UnlockIcon size={13} />
                <span>Solo Desbloqueables ({unlockableTotal})</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VISTA 1: CAMPEONES (siempre en el HTML inicial para SEO; se alterna con CSS) */}
      <section
        id="panel-campeones"
        role="tabpanel"
        aria-label="Campeones Set 19"
        className={activeTab !== "campeones" ? style.tabPanelHidden : ""}
        aria-hidden={activeTab !== "campeones"}
      >
        <div className={style.resultsInfo}>
          Mostrando <strong>{filteredChampions.length}</strong> de {champions.length} campeones del Set 19
        </div>

          {filteredChampions.length === 0 ? (
            <div className={style.emptyState}>
              No se encontraron campeones con los filtros seleccionados.
            </div>
          ) : (
            <>
              {regularChampions.length > 0 && (
                <div className={style.championsGrid}>
                  {regularChampions.map((champ) => {
                    const champTraits = (champ.traits || []).map(
                      (tId) => traitsMap[tId] || { apiName: tId, name: tId.replace(/^DA_|19$/g, ""), icon: "" }
                    );
                    const isUnlock = Boolean(champ.unlock?.isUnlockable);
                    const manaInitial = champ.stats?.initialMana ?? 0;
                    const manaMax = champ.stats?.mana ?? 0;
                    const attackRange = champ.stats?.range ?? 1;

                    return (
                      <article key={champ.apiName} className={`${style.championCard} ${getCostCardClass(champ.cost)}`}>
                        {/* Cabecera: Nombre + Coste en oro */}
                        <div className={style.champHeader}>
                          <h2 className={style.champName}>{champ.name}</h2>
                          <div className={style.champCost} title={`Coste ${champ.cost} de oro`}>
                            <span>{champ.cost}</span>
                            <span className={style.coinDot} />
                          </div>
                        </div>

                        {/* Banner: Imagen del campeón (ruta icon) + Sinergias superpuestas */}
                        <div className={style.champBanner}>
                          <img
                            src={`/tft/sets/19/champions/icon/${champ.icon}`}
                            alt={champ.name}
                            className={style.champSplashImg}
                            loading="lazy"
                          />
                          <div className={style.champBannerGradient} />

                          {isUnlock && (
                            <div className={style.unlockCornerBadge} title="Campeón Desbloqueable">
                              <UnlockIcon size={15} />
                            </div>
                          )}

                          <div className={style.bannerTraitsOverlay}>
                            {champTraits.map((tr) => (
                              <div key={tr.apiName} className={style.bannerTraitItem}>
                                {tr.icon && (
                                  <img
                                    src={`/tft/sets/19/traits/${tr.icon}`}
                                    alt={tr.name}
                                    className={style.bannerTraitIcon}
                                    loading="lazy"
                                  />
                                )}
                                <span>{tr.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Cuerpo de la tarjeta */}
                        <div className={style.champBody}>
                          {/* Bloque de Desbloqueo si aplica */}
                          {isUnlock && (
                            <div className={style.unlockBox}>
                              <div className={style.unlockTitle}>
                                <UnlockIcon size={14} />
                                <span>Desbloquear:</span>
                              </div>
                              <ul className={style.unlockList}>
                                {(champ.unlock.conditions || []).map((cond, idx) => (
                                  <li key={`ucond-${idx}`}>{cond}</li>
                                ))}
                                {champ.unlock.levelRequired && (
                                  <li>Nivel {champ.unlock.levelRequired}</li>
                                )}
                              </ul>
                            </div>
                          )}

                          {/* Fila de Rol (español) y Rango de ataque */}
                          <div className={style.roleRangeRow}>
                            <div className={style.rolePillsGroup}>
                              {champ.role && (
                                <span className={style.rolePill} title={champ.role_desc || champ.role}>
                                  {champ.role}
                                </span>
                              )}
                            </div>

                            <div className={style.rangeBadge} title={`Rango de ataque: ${attackRange}`}>
                              <RangeIcon />
                              <span>{attackRange}</span>
                            </div>
                          </div>

                          {/* Cabecera de la Habilidad (Imagen + Nombre + Maná) */}
                          <div className={style.abilityHeader}>
                            <div className={style.abilityTitleGroup}>
                              {champ.ability?.icon && (
                                <img
                                  src={champ.ability.icon}
                                  alt={champ.ability?.name || champ.name}
                                  className={style.abilityIcon}
                                  loading="lazy"
                                />
                              )}
                              <span className={style.abilityName}>
                                {champ.ability?.name || champ.ability_name || "Habilidad"}
                              </span>
                            </div>

                            {manaMax > 0 && (
                              <div className={style.manaBadge} title={`Maná inicial ${manaInitial} / Maná máximo ${manaMax}`}>
                                <ManaIcon />
                                <span>
                                  {manaInitial}/{manaMax}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Descripción de la Habilidad */}
                          <div className={style.abilityDesc}>
                            {renderFormattedText(champ.ability?.desc || champ.ability_desc)}
                          </div>

                          {/* Ítems recomendados según el rol del campeón */}
                          {Array.isArray(champ.recommendedItems) && champ.recommendedItems.length > 0 && (
                            <div className={style.recommendedItemsBox}>
                              {/* <span className={style.recommendedItemsLabel}>Ítems recomendados:</span> */}
                              <div className={style.recommendedItemsIcons}>
                                {champ.recommendedItems.map((item) => (
                                  <img
                                    key={`${champ.apiName}-${item.apiName}`}
                                    src={`/tft/sets/19/items/${item.icon}`}
                                    alt={item.name}
                                    title={item.name}
                                    className={style.recommendedItemIcon}
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* SECCIÓN DEDICADA: OTROS CAMPEONES (Invocaciones y mecánicas de rasgos como Aatrox y Cho'Gath) */}
              {otherChampions.length > 0 && (
                <div className={style.otherChampionsSection}>
                  <div className={style.otherSectionHeader}>
                    <div className={style.otherSectionTitleRow}>
                      <h2 className={style.otherSectionTitle}>Otros Campeones</h2>
                      <span className={style.otherSectionCount}>{otherChampions.length}</span>
                    </div>
                    <p className={style.otherSectionSubtitle}>
                      Unidades invocadas o mecánicas de rasgos que no se compran ni venden en la tienda.
                    </p>
                  </div>

                  <div className={style.otherChampionsGrid}>
                    {otherChampions.map((champ) => {
                      const linkedTraitObj = champ.linkedTrait ? traitsMap[champ.linkedTrait] : null;
                      const displayTraits =
                        (champ.traits || []).length > 0
                          ? champ.traits.map((tId) => traitsMap[tId] || { apiName: tId, name: tId, icon: "" })
                          : linkedTraitObj
                            ? [linkedTraitObj]
                            : [];
                      const manaInitial = champ.stats?.initialMana ?? 0;
                      const manaMax = champ.stats?.mana ?? 0;
                      const attackRange = champ.stats?.range ?? 1;
                      const specialItems = champ.specialItems || champ.ability?.specialItems || [];

                      return (
                        <article key={champ.apiName} className={`${style.championCard} ${style.cardCostOther}`}>
                          {/* Cabecera: Nombre + Etiqueta de origen (Gu Feng / Rock) */}
                          <div className={style.champHeader}>
                            <h3 className={style.champName}>{champ.name}</h3>
                            <div className={style.otherBadge} title="Unidad especial de rasgo (no se compra en tienda)">
                              {champ.originNote || "Otros"}
                            </div>
                          </div>

                          {/* Banner: Imagen del campeón + Rasgo vinculado */}
                          <div className={style.champBanner}>
                            <img
                              src={`/tft/sets/19/champions/icon/${champ.icon}`}
                              alt={champ.name}
                              className={style.champSplashImg}
                              loading="lazy"
                            />
                            <div className={style.champBannerGradient} />

                            <div className={style.bannerTraitsOverlay}>
                              {displayTraits.map((tr) => (
                                <div key={tr.apiName} className={style.bannerTraitItem}>
                                  {tr.icon && (
                                    <img
                                      src={`/tft/sets/19/traits/${tr.icon}`}
                                      alt={tr.name}
                                      className={style.bannerTraitIcon}
                                      loading="lazy"
                                    />
                                  )}
                                  <span>{tr.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Cuerpo de la tarjeta */}
                          <div className={style.champBody}>
                            <div className={style.roleRangeRow}>
                              <div className={style.rolePillsGroup}>
                                {champ.role && (
                                  <span className={style.rolePill} title={champ.role_desc || champ.role}>
                                    {champ.role}
                                  </span>
                                )}
                              </div>

                              <div className={style.rangeBadge} title={`Rango de ataque: ${attackRange}`}>
                                <RangeIcon />
                                <span>{attackRange}</span>
                              </div>
                            </div>

                            {/* Cabecera de la Habilidad */}
                            <div className={style.abilityHeader}>
                              <div className={style.abilityTitleGroup}>
                                {champ.ability?.icon && (
                                  <img
                                    src={champ.ability.icon}
                                    alt={champ.ability?.name || champ.name}
                                    className={style.abilityIcon}
                                    loading="lazy"
                                  />
                                )}
                                <span className={style.abilityName}>
                                  {champ.ability?.name || champ.ability_name || "Habilidad"}
                                </span>
                              </div>

                              {manaMax > 0 && (
                                <div className={style.manaBadge} title={`Maná inicial ${manaInitial} / Maná máximo ${manaMax}`}>
                                  <ManaIcon />
                                  <span>
                                    {manaInitial}/{manaMax}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Descripción de la Habilidad */}
                            <div className={style.abilityDesc}>
                              {renderFormattedText(champ.ability?.desc || champ.ability_desc)}
                            </div>

                            {/* Opciones especiales (ej. 2 Pergaminos de Gu Feng 4 en Cho'Gath) */}
                            {Array.isArray(specialItems) && specialItems.length > 0 && (
                              <div className={style.specialItemsBox}>
                                <span className={style.specialItemsTitle}>Opciones de {champ.originNote || "rasgo"}:</span>
                                <div className={style.specialItemsList}>
                                  {specialItems.map((item) => (
                                    <div key={`${champ.apiName}-${item.apiName}`} className={style.specialItemCard}>
                                      <img
                                        src={`/tft/sets/19/items/${item.icon}`}
                                        alt={item.name}
                                        title={item.name}
                                        className={style.specialItemIcon}
                                        loading="lazy"
                                      />
                                      <div className={style.specialItemInfo}>
                                        <div className={style.specialItemNameRow}>
                                          <strong className={style.specialItemName}>{item.name}</strong>
                                          {item.name_EN && item.name_EN !== item.name && (
                                            <span className={style.specialItemNameEn}>({item.name_EN})</span>
                                          )}
                                        </div>
                                        <div className={style.specialItemDesc}>
                                          {renderFormattedText(item.desc)}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
      </section>

      {/* VISTA 2: SINERGIAS / RASGOS (siempre en el HTML inicial para SEO; se alterna con CSS) */}
      <section
        id="panel-sinergias"
        role="tabpanel"
        aria-label="Rasgos del Set 19"
        className={activeTab !== "sinergias" ? style.tabPanelHidden : ""}
        aria-hidden={activeTab !== "sinergias"}
      >
        <div className={style.resultsInfo}>
          Mostrando <strong>{filteredTraits.length}</strong> de {traits.length} rasgos del Set 19
        </div>

          {filteredTraits.length === 0 ? (
            <div className={style.emptyState}>
              No se encontraron sinergias con ese criterio de búsqueda.
            </div>
          ) : (
            <div className={style.traitsGrid}>
              {filteredTraits.map((trait) => {
                const linkedChamps = championsByTrait[trait.apiName] || [];

                return (
                  <article key={trait.apiName} className={style.traitCard}>
                    <div className={style.traitCardHeader}>
                      <div className={style.traitIconBox}>
                        {trait.icon && (
                          <img
                            src={`/tft/sets/19/traits/${trait.icon}`}
                            alt={trait.name}
                            className={style.traitCardIcon}
                            loading="lazy"
                          />
                        )}
                      </div>

                      <div className={style.traitCardTitleWrap}>
                        <div className={style.traitCardNameRow}>
                          <h2 className={style.traitCardName}>{trait.name}</h2>
                          {trait.name_EN && trait.name_EN.toLowerCase() !== trait.name.toLowerCase() && (
                            <span className={style.traitCardNameEn}>({trait.name_EN})</span>
                          )}
                        </div>
                        {Array.isArray(trait.effects) && trait.effects.length > 0 && (
                          <div className={style.traitBreakpointsRow}>
                            {trait.effects.map((eff, idx) => (
                              <span
                                key={`${trait.apiName}-bp-${idx}`}
                                className={`${style.breakpointBadge} ${getBreakpointStyleClass(eff.style)}`}
                              >
                                {eff.minUnits}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Descripción de la sinergia con HTML parseado (sin etiquetas en texto plano) */}
                    <div className={style.traitDesc}>
                      {renderFormattedText(trait.desc_trait || trait.desc)}
                    </div>

                    {/* Campeones que tienen esta sinergia */}
                    {linkedChamps.length > 0 && (
                      <div className={style.traitChampsList}>
                        {linkedChamps.map((c) => (
                          <div key={`${trait.apiName}-${c.apiName}`} className={`${style.traitMiniChamp} ${getCostCardClass(c.cost)}`}>
                            <img
                              src={`/tft/sets/19/champions/tileIcon/${c.tileIcon}`}
                              alt={c.name}
                              className={style.traitMiniChampImg}
                              loading="lazy"
                            />
                            <span className={style.traitMiniChampName}>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
      </section>

      {/* VISTA 3: ENCUENTROS (siempre en el HTML inicial para SEO; se alterna con CSS) */}
      {encounters.length > 0 && (
        <section
          id="panel-encuentros"
          role="tabpanel"
          aria-label="Encuentros del Set 19"
          className={activeTab !== "encuentros" ? style.tabPanelHidden : ""}
          aria-hidden={activeTab !== "encuentros"}
        >
          <div className={style.resultsInfo}>
            Mostrando <strong>{filteredEncounters.length}</strong> de {encounters.length} encuentros del Set 19
          </div>

          {filteredEncounters.length === 0 ? (
            <div className={style.emptyState}>
              No se encontraron encuentros con ese criterio de búsqueda.
            </div>
          ) : (
            <div className={style.encountersGrid}>
              {filteredEncounters.map((enc) => (
                <article key={enc.apiName} className={style.encounterCard}>
                  <div className={style.encounterBanner}>
                    {enc.image ? (
                      <img
                        src={enc.image}
                        alt={enc.championName || enc.name}
                        className={style.encounterBannerImg}
                        loading="lazy"
                      />
                    ) : (
                      <div className={style.encounterBannerFallback}>
                        <span>{enc.championName || "Set 19"}</span>
                      </div>
                    )}
                    <div className={style.encounterBannerGradient} />
                    {enc.championName && (
                      <span className={style.encounterHostBadge}>{enc.championName}</span>
                    )}
                  </div>

                  <div className={style.encounterBody}>
                    <div className={style.encounterHeaderRow}>
                      <h2 className={style.encounterTitle}>{enc.name}</h2>
                      {enc.name_EN && enc.name_EN.toLowerCase() !== enc.name.toLowerCase() && (
                        <span className={style.traitCardNameEn}>({enc.name_EN})</span>
                      )}
                    </div>
                    <div className={style.encounterDesc}>
                      {renderFormattedText(enc.desc)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Set19Catalogo;
