import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import CardsCompos from "@components/TFT/CardsCompos.jsx";
import {
  ensureSetDataLoaded,
  dataTFTItemsBySetMap,
  setNumberPBE,
  setNumberLatest,
  nameOfSet,
} from "@stores/dataTFT";
import style from "./css/CompsPorSet.module.css";

const getSetFriendlyLabel = (setNumber) => {
  const num = String(setNumber);
  if (num === String(setNumberPBE) && nameOfSet?.pbe) {
    return `Set ${num} · ${nameOfSet.pbe}`;
  }
  if (num === String(setNumberLatest) && nameOfSet?.latest) {
    return `Set ${num} · ${nameOfSet.latest}`;
  }
  return `Set ${num}`;
};

const CompsPorSet = ({
  entityName = "",
  entityType = "item",
  newestSetNumber = setNumberPBE,
  compsBySet = [],
  hideCta = false,
}) => {
  // Asegurar reactividad cuando carguen los datos de cada set en Nanostores
  useStore(dataTFTItemsBySetMap);

  const [expandedSets, setExpandedSets] = useState({});
  const [loadingSets, setLoadingSets] = useState({});

  const targetNewestSet = String(newestSetNumber);

  // Separar composiciones del set más reciente (siempre visible) y sets anteriores (colapsados)
  const currentSetEntry = compsBySet.find(
    (entry) => String(entry.setNumber) === targetNewestSet
  );
  const currentSetComps = currentSetEntry?.comps || [];

  const olderSetEntries = compsBySet
    .filter(
      (entry) =>
        String(entry.setNumber) !== targetNewestSet &&
        Array.isArray(entry.comps) &&
        entry.comps.length > 0
    )
    .sort((a, b) => Number(b.setNumber) - Number(a.setNumber));

  // Al montar, precargar datos del set más reciente para que CardsCompos muestre iconos y nombres correctamente
  useEffect(() => {
    let active = true;
    const preloadNewest = async () => {
      await ensureSetDataLoaded(targetNewestSet);
      if (!active) return;
    };
    preloadNewest();
    return () => {
      active = false;
    };
  }, [targetNewestSet]);

  const handleToggleOldSet = async (setNum) => {
    const key = String(setNum);
    const willOpen = !expandedSets[key];

    setExpandedSets((prev) => ({
      ...prev,
      [key]: willOpen,
    }));

    // Al abrir un set anterior, garantizar que sus campeones/ítems estén cargados en Nanostores
    if (willOpen) {
      setLoadingSets((prev) => ({ ...prev, [key]: true }));
      await ensureSetDataLoaded(key);
      setLoadingSets((prev) => ({ ...prev, [key]: false }));
    }
  };

  const titlePrefix =
    entityType === "campeon"
      ? `Mejores Composiciones que usan ${entityName} en TFT`
      : entityType === "sinergia"
        ? `Mejores Composiciones con ${entityName}`
        : `Mejores Composiciones con ${entityName}`;

  const subtitleText =
    entityType === "campeon"
      ? `Estas son las composiciones del Set ${targetNewestSet} que utilizan a ${entityName}. Haz clic en cualquiera para ver el tablero, ítems y plan de juego.`
      : entityType === "sinergia"
        ? `Composiciones del Set ${targetNewestSet} donde la sinergia ${entityName} está activa en el tablero final.`
        : `Composiciones del Set ${targetNewestSet} que utilizan ${entityName}.`;

  return (
    <section className={style.wrapper}>
      {/* Bloque visible por defecto: composiciones del Set más reciente */}
      <div className={style.currentSetSection}>
        <div className={style.sectionHeader}>
          <h2 className={style.sectionTitle}>{titlePrefix}</h2>
        </div>

        {currentSetComps.length > 0 && (
          <p className={style.sectionSubtitle}>{subtitleText}</p>
        )}

        {currentSetComps.length > 0 ? (
          <div className={style.compsList}>
            {currentSetComps.map((comp, index) => (
              <article
                key={`${targetNewestSet}-${comp.id || comp.urlSEO || index}`}
                className={style.compArticle}
              >
                <CardsCompos
                  comp={comp}
                  numeracion={index + 1}
                  expandInline={true}
                />
              </article>
            ))}
          </div>
        ) : (
          <div className={style.emptyState}>
            Todavía no hay composiciones publicadas con <strong>{entityName}</strong> en el{" "}
            <strong>Set {targetNewestSet}</strong>.
            {olderSetEntries.length > 0
              ? " Puedes desplegar las composiciones de sets anteriores aquí abajo."
              : ""}
          </div>
        )}
      </div>

      {/* Bloques colapsados por defecto: composiciones de sets anteriores */}
      {olderSetEntries.length > 0 && (
        <div className={style.previousSetsContainer}>
          <h3 className={style.previousHeading}>
            Composiciones de sets anteriores
          </h3>
          <p className={style.previousDescription}>
            Haz clic en un set anterior para desplegar sus composiciones históricas con{" "}
            {entityName}.
          </p>

          {olderSetEntries.map((entry) => {
            const setNum = String(entry.setNumber);
            const isOpen = Boolean(expandedSets[setNum]);
            const isLoading = Boolean(loadingSets[setNum]);
            const total = entry.comps.length;

            return (
              <div
                key={`old-set-${setNum}`}
                className={`${style.accordionCard} ${
                  isOpen ? style.accordionCardOpen : ""
                }`}
              >
                <button
                  type="button"
                  className={style.accordionTrigger}
                  onClick={() => handleToggleOldSet(setNum)}
                  aria-expanded={isOpen}
                >
                  <span className={style.triggerLeft}>
                    <span className={style.setTagOld}>
                      {getSetFriendlyLabel(setNum)}
                    </span>
                    <span>
                      Composiciones con {entityName} (Set {setNum})
                    </span>
                    <span className={style.countBadge}>
                      {total} {total === 1 ? "compo" : "compos"}
                    </span>
                  </span>

                  <span className={style.triggerRight}>
                    <span>{isOpen ? "Ocultar" : "Ver compos"}</span>
                    <span
                      className={`${style.chevron} ${
                        isOpen ? style.chevronOpen : ""
                      }`}
                    >
                      ▼
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className={style.accordionBody}>
                    {isLoading && (
                      <div className={style.loadingNotice}>
                        Cargando datos del Set {setNum}...
                      </div>
                    )}
                    <div className={style.compsList}>
                      {entry.comps.map((comp, index) => (
                        <article
                          key={`${setNum}-${comp.id || comp.urlSEO || index}`}
                          className={style.compArticle}
                        >
                          <CardsCompos
                            comp={comp}
                            numeracion={index + 1}
                            expandInline={true}
                          />
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Enlace a la Tier List completa */}
      {!hideCta && (
        <div className={style.ctaBanner}>
          ¿Buscas más opciones para subir de rango? Explora todas las{" "}
          <a
            className={style.ctaLink}
            href="/tft/meta-comps-tier-list-teamfight-tactics/"
          >
            Meta Comps de TFT
          </a>{" "}
          actualizadas al parche actual.
        </div>
      )}
    </section>
  );
};

export default CompsPorSet;
