import React, { useEffect, useRef, useState } from "react";
import style from "./css/AdminSEOIndexacion.module.css";

const API_BASE = "https://api.guiadeparche.com/seo";
const GSC_RESOURCE_ID = encodeURIComponent("https://guiadeparche.com/");

const QUICK_EXCLUSION_PRESETS = [
  { label: "/admin", pattern: "/admin" },
  { label: "/perfil", pattern: "/perfil" },
  { label: "/login", pattern: "/login" },
  { label: "/crearInfografia", pattern: "/crearInfografia" },
  { label: "/tft/master-plan/app", pattern: "/tft/master-plan/app" },
];

const formatShortPath = (fullUrl) => {
  try {
    const parsed = new URL(fullUrl);
    return parsed.pathname || "/";
  } catch {
    return fullUrl;
  }
};

const formatDateShort = (isoOrSql) => {
  if (!isoOrSql) return "—";
  try {
    const d = new Date(isoOrSql);
    if (Number.isNaN(d.getTime())) return String(isoOrSql);
    return d.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return String(isoOrSql);
  }
};

const buildBreadcrumbs = (folder) => {
  const clean = (folder || "/").replace(/^\/+|\/+$/g, "");
  if (!clean) return [{ label: "Inicio (/)", path: "/" }];
  const parts = clean.split("/");
  const crumbs = [{ label: "Inicio (/)", path: "/" }];
  let acc = "";
  parts.forEach((seg) => {
    acc += `/${seg}`;
    crumbs.push({ label: seg, path: `${acc}/` });
  });
  return crumbs;
};

const AdminSEOIndexacion = () => {
  const [urls, setUrls] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    indexed: 0,
    not_indexed: 0,
    pending: 0,
    error: 0,
    excluded: 0,
  });
  const [subfolders, setSubfolders] = useState([]);
  const [directPagesCount, setDirectPagesCount] = useState(0);
  const [excludedRules, setExcludedRules] = useState([]);
  const [quota, setQuota] = useState({
    inspections_used: 0,
    inspections_limit: 1900,
    submissions_used: 0,
    submissions_limit: 190,
  });
  const [configured, setConfigured] = useState(true);
  const [serviceEmail, setServiceEmail] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    total_pages: 1,
  });

  // Navegación por subcarpetas y filtros
  const [currentFolder, setCurrentFolder] = useState("/");
  const [directOnly, setDirectOnly] = useState(false);
  const [verdictFilter, setVerdictFilter] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Panel de exclusiones
  const [exclusionsOpen, setExclusionsOpen] = useState(false);
  const [newRulePattern, setNewRulePattern] = useState("");
  const [newRuleMatchType, setNewRuleMatchType] = useState("prefix");

  // Selección y estados de carga
  const [selectedUrls, setSelectedUrls] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [busyAction, setBusyAction] = useState("");
  const [feedback, setFeedback] = useState({ text: "", isError: false });
  const stopBatchRef = useRef(false);

  const loadUrls = async (targetPage = page, targetFolder = currentFolder) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        verdict: verdictFilter,
        folder: targetFolder,
        direct_only: directOnly ? "1" : "0",
        search: searchQuery,
        page: String(targetPage),
        limit: "50",
      });
      const resp = await fetch(`${API_BASE}/get_urls.php?${params.toString()}`, {
        cache: "no-cache",
      });
      const json = await resp.json();
      if (!json.success) {
        setFeedback({
          text: json.message || "Error al consultar el listado de URLs.",
          isError: true,
        });
        return;
      }
      setUrls(json.data || []);
      setSummary(json.summary || summary);
      setSubfolders(json.subfolders || []);
      setDirectPagesCount(json.direct_pages_count || 0);
      setExcludedRules(json.excluded_rules || []);
      setQuota(json.quota || quota);
      setConfigured(Boolean(json.configured));
      setServiceEmail(json.service_account_email || "");
      setPagination(json.pagination || pagination);
    } catch {
      setFeedback({
        text: `No se pudo conectar con ${API_BASE}/get_urls.php. Verifica haber subido la carpeta apiGuiadeparche/seo/ al servidor.`,
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls(page, currentFolder);
  }, [verdictFilter, currentFolder, directOnly, searchQuery, page]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearchQuery(searchInput.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const navigateFolder = (nextFolder) => {
    setCurrentFolder(nextFolder);
    setPage(1);
    setSelectedUrls(new Set());
  };

  const handleSyncSitemap = async () => {
    setBusyAction("sync");
    setFeedback({ text: "Leyendo sitemap-index.xml de guiadeparche.com...", isError: false });
    try {
      const resp = await fetch(`${API_BASE}/sync_sitemap.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = await resp.json();
      if (!json.success) {
        setFeedback({ text: json.message || "Error sincronizando sitemap.", isError: true });
      } else {
        setFeedback({
          text: `Sitemap sincronizado: ${json.total_sitemap} URLs detectadas (${json.nuevas_agregadas} nuevas añadidas).`,
          isError: false,
        });
        setPage(1);
        await loadUrls(1, currentFolder);
      }
    } catch {
      setFeedback({ text: "Error de red al sincronizar el sitemap.", isError: true });
    } finally {
      setBusyAction("");
    }
  };

  const handleResubmitSitemap = async () => {
    setBusyAction("sitemap");
    setFeedback({ text: "Reenviando sitemap-index.xml a Google Search Console...", isError: false });
    try {
      const resp = await fetch(`${API_BASE}/request_index.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sitemap" }),
      });
      const json = await resp.json();
      setFeedback({
        text: json.message || (json.success ? "Sitemap reenviado." : "Error reenviando sitemap."),
        isError: !json.success,
      });
    } catch {
      setFeedback({ text: "Error de red al reenviar el sitemap.", isError: true });
    } finally {
      setBusyAction("");
    }
  };

  const handleAddExclusion = async (patternValue, matchType = "prefix") => {
    const raw = (patternValue || "").trim();
    if (!raw) {
      setFeedback({ text: "Escribe una ruta o carpeta para excluir (ej. /admin).", isError: true });
      return;
    }

    setBusyAction("exclude");
    try {
      const resp = await fetch(`${API_BASE}/manage_exclusions.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          pattern: raw,
          match_type: matchType,
        }),
      });
      const json = await resp.json();
      if (!json.success) {
        setFeedback({ text: json.message || "No se pudo guardar la exclusión.", isError: true });
      } else {
        setNewRulePattern("");
        setExcludedRules(json.rules || []);
        setFeedback({
          text: `${json.message} Recuerda hacer Deploy para aplicar noindex y quitarla del sitemap.`,
          isError: false,
        });
        await loadUrls(1, currentFolder);
      }
    } catch {
      setFeedback({ text: "Error de red al guardar la regla de exclusión.", isError: true });
    } finally {
      setBusyAction("");
    }
  };

  const handleRemoveExclusion = async (rule) => {
    setBusyAction("exclude");
    try {
      const resp = await fetch(`${API_BASE}/manage_exclusions.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", id: rule.id, pattern: rule.pattern }),
      });
      const json = await resp.json();
      if (!json.success) {
        setFeedback({ text: json.message || "Error al quitar la regla.", isError: true });
      } else {
        setExcludedRules(json.rules || []);
        setFeedback({
          text: `Regla "${rule.pattern}" eliminada. Sus páginas volverán a estar permitidas.`,
          isError: false,
        });
        await loadUrls(page, currentFolder);
      }
    } catch {
      setFeedback({ text: "Error de red al eliminar la regla.", isError: true });
    } finally {
      setBusyAction("");
    }
  };

  const handleInspectBatch = async ({ specificUrls = null, totalTarget = 10, mode = "pending" }) => {
    stopBatchRef.current = false;
    setBusyAction("inspect");

    let inspectedTotal = 0;
    let remainingToRun = specificUrls ? specificUrls.length : totalTarget;
    let offset = 0;
    let hadError = false;

    try {
      while (remainingToRun > 0 && !stopBatchRef.current) {
        const chunkSize = Math.min(10, remainingToRun);
        const payload = specificUrls
          ? { urls: specificUrls.slice(offset, offset + chunkSize), batch_size: chunkSize }
          : { mode, folder: currentFolder, batch_size: chunkSize };

        setFeedback({
          text: `Inspeccionando en Google Search Console (${currentFolder})... ${inspectedTotal} revisadas`,
          isError: false,
        });

        const resp = await fetch(`${API_BASE}/inspect_urls.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await resp.json();

        if (!json.success) {
          hadError = true;
          setFeedback({
            text: json.message || "Error al inspeccionar URLs.",
            isError: true,
          });
          break;
        }

        const doneNow = json.inspected || 0;
        inspectedTotal += doneNow;
        offset += chunkSize;
        remainingToRun -= chunkSize;
        if (json.quota) setQuota(json.quota);

        const hasFatalErr = (json.results || []).some((r) => !r.ok);
        if (doneNow === 0 || hasFatalErr) {
          const firstErr = (json.results || []).find((r) => !r.ok)?.error;
          hadError = Boolean(firstErr);
          setFeedback({
            text: firstErr
              ? `Se revisaron ${inspectedTotal} URLs. Aviso de Google: ${firstErr}`
              : `Inspección finalizada: ${inspectedTotal} URLs actualizadas.`,
            isError: hadError,
          });
          break;
        }
      }

      if (!hadError && inspectedTotal > 0) {
        setFeedback({
          text: stopBatchRef.current
            ? `Proceso detenido manualmente. Se inspeccionaron ${inspectedTotal} URLs.`
            : `Listo: se inspeccionaron ${inspectedTotal} URLs y se guardaron en caché.`,
          isError: false,
        });
      }
      await loadUrls(page, currentFolder);
    } catch {
      setFeedback({ text: "Error de conexión durante la inspección.", isError: true });
    } finally {
      setBusyAction("");
      stopBatchRef.current = false;
    }
  };

  const handleRequestIndex = async (targetList, actionType = "indexing_api") => {
    const list = Array.isArray(targetList) ? targetList : Array.from(selectedUrls);
    if (list.length === 0) {
      setFeedback({ text: "Selecciona al menos una URL primero.", isError: true });
      return;
    }

    const remainingQuota = (quota.submissions_limit || 190) - (quota.submissions_used || 0);
    if (remainingQuota <= 0) {
      setFeedback({
        text: "Alcanzaste el tope gratuito de seguridad de hoy (190 envíos). Vuelve mañana.",
        isError: true,
      });
      return;
    }

    const toSend = list.slice(0, remainingQuota);
    const verb = actionType === "delete_index" ? "solicitar desindexación de" : "enviar a indexar";
    if (toSend.length > 1 || actionType === "delete_index") {
      const ok = window.confirm(
        `Se va a ${verb} ${toSend.length} URL(s) mediante Google Indexing API (cupo gratuito disponible hoy: ${remainingQuota}). ¿Continuar?`
      );
      if (!ok) return;
    }

    setBusyAction("index");
    let totalSent = 0;
    let firstError = "";

    try {
      for (let i = 0; i < toSend.length; i += 15) {
        const chunk = toSend.slice(i, i + 15);
        setFeedback({
          text: `Comunicando con Google Indexing API... (${totalSent}/${toSend.length})`,
          isError: false,
        });
        const resp = await fetch(`${API_BASE}/request_index.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: actionType, urls: chunk }),
        });
        const json = await resp.json();
        if (!json.success) {
          firstError = json.message || "Error enviando URLs.";
          break;
        }
        totalSent += json.submitted || 0;
        if (json.quota) setQuota(json.quota);

        const errRow = (json.results || []).find((r) => !r.ok);
        if (errRow) {
          firstError = errRow.error || "Google rechazó parte del lote.";
          break;
        }
      }

      setFeedback({
        text: firstError
          ? `Se procesaron ${totalSent} URLs. Aviso de Google: ${firstError}`
          : actionType === "delete_index"
            ? `¡Desindexación solicitada para ${totalSent} URL(s)!`
            : `¡Enviadas ${totalSent} URLs a Google correctamente!`,
        isError: Boolean(firstError && totalSent === 0),
      });
      setSelectedUrls(new Set());
      await loadUrls(page, currentFolder);
    } catch {
      setFeedback({ text: "Error de red al comunicarse con Google Indexing API.", isError: true });
    } finally {
      setBusyAction("");
    }
  };

  const toggleSelectUrl = (url) => {
    setSelectedUrls((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  };

  const selectNotIndexedVisible = () => {
    const next = new Set(selectedUrls);
    urls.forEach((row) => {
      if (row.verdict !== "PASS" && !row.excluded) next.add(row.url);
    });
    setSelectedUrls(next);
  };

  const clearSelection = () => setSelectedUrls(new Set());

  const renderVerdictBadge = (row) => {
    if (Number(row.excluded) === 1) {
      return <span className={style.badgeExcluded}>Excluida (No indexar)</span>;
    }
    const v = (row.verdict || "PENDING").toUpperCase();
    if (v === "PASS") return <span className={style.badgePass}>Indexada</span>;
    if (v === "PENDING") return <span className={style.badgePending}>Sin revisar</span>;
    if (v === "FAIL") return <span className={style.badgeFail}>Con error</span>;
    return <span className={style.badgeNeutral}>No indexada</span>;
  };

  const renderHighlightedUrl = (fullUrl) => {
    const fullPath = formatShortPath(fullUrl);
    const cleanFolder = currentFolder === "/" ? "/" : currentFolder;
    if (cleanFolder !== "/" && fullPath.startsWith(cleanFolder)) {
      const slugPart = fullPath.slice(cleanFolder.length);
      return (
        <>
          <span className={style.folderPrefixMuted}>{cleanFolder}</span>
          <span className={style.slugHighlight}>{slugPart || "(índice)"}</span>
        </>
      );
    }
    return fullPath;
  };

  const breadcrumbs = buildBreadcrumbs(currentFolder);
  const existingPatternsSet = new Set(
    excludedRules.map((r) => String(r.pattern || "").toLowerCase().replace(/\/+$/, ""))
  );

  const inspPercent = Math.min(
    100,
    Math.round(((quota.inspections_used || 0) / (quota.inspections_limit || 1900)) * 100)
  );
  const subPercent = Math.min(
    100,
    Math.round(((quota.submissions_used || 0) / (quota.submissions_limit || 190)) * 100)
  );

  return (
    <section className={style.container}>
      <div className={style.headerRow}>
        <div className={style.titleBlock}>
          <h2>Google Search Console — Control de Indexación</h2>
          <p className={style.subtitle}>
            Propiedad: <strong>https://guiadeparche.com/</strong> · Navega por subcarpetas hasta el slug y gestiona rutas excluidas.
          </p>
        </div>

        {configured ? (
          <span className={style.statusPillOk}>
            ● Conectado {serviceEmail ? `(${serviceEmail})` : ""}
          </span>
        ) : (
          <span className={style.statusPillWarn}>
            ⚠ Falta subir el archivo JSON de Google Cloud
          </span>
        )}
      </div>

      {!configured && (
        <div className={style.setupBanner}>
          <strong>Paso pendiente en cPanel (GoDaddy):</strong> Sube el archivo <code>.json</code> descargado desde Google Cloud dentro de <code>api.guiadeparche.com/seo/private/</code>.
        </div>
      )}

      {/* Tarjetas de resumen clicables para filtrar rápido */}
      <div className={style.summaryGrid}>
        <button
          type="button"
          className={`${style.statCard} ${verdictFilter === "ALL" ? style.statCardActive : ""}`}
          onClick={() => {
            setVerdictFilter("ALL");
            setPage(1);
          }}
        >
          <span className={style.statLabel}>Activas en Sitemap</span>
          <span className={style.statValue}>{summary.total}</span>
        </button>
        <button
          type="button"
          className={`${style.statCard} ${verdictFilter === "PASS" ? style.statCardActive : ""}`}
          onClick={() => {
            setVerdictFilter("PASS");
            setPage(1);
          }}
        >
          <span className={style.statLabel}>Indexadas</span>
          <span className={`${style.statValue} ${style.statIndexed}`}>{summary.indexed}</span>
        </button>
        <button
          type="button"
          className={`${style.statCard} ${verdictFilter === "NOT_INDEXED" ? style.statCardActive : ""}`}
          onClick={() => {
            setVerdictFilter("NOT_INDEXED");
            setPage(1);
          }}
        >
          <span className={style.statLabel}>No indexadas / Error</span>
          <span className={`${style.statValue} ${style.statNotIndexed}`}>
            {(summary.not_indexed || 0) + (summary.error || 0)}
          </span>
        </button>
        <button
          type="button"
          className={`${style.statCard} ${verdictFilter === "PENDING" ? style.statCardActive : ""}`}
          onClick={() => {
            setVerdictFilter("PENDING");
            setPage(1);
          }}
        >
          <span className={style.statLabel}>Sin revisar</span>
          <span className={`${style.statValue} ${style.statPending}`}>{summary.pending}</span>
        </button>
        <button
          type="button"
          className={`${style.statCard} ${verdictFilter === "EXCLUDED" ? style.statCardActive : ""}`}
          onClick={() => {
            setVerdictFilter("EXCLUDED");
            setPage(1);
          }}
        >
          <span className={style.statLabel}>Excluidas (No indexar)</span>
          <span className={`${style.statValue} ${style.statExcluded}`}>{summary.excluded || 0}</span>
        </button>
      </div>

      {/* Control de cuotas gratuitas de hoy */}
      <div className={style.quotaGrid}>
        <div className={style.quotaCard}>
          <div className={style.quotaHeader}>
            <span>Inspecciones usadas hoy (Gratis)</span>
            <strong>
              {quota.inspections_used} / {quota.inspections_limit}
            </strong>
          </div>
          <div className={style.progressTrack}>
            <div className={style.progressFill} style={{ width: `${inspPercent}%` }} />
          </div>
          <span className={style.quotaHint}>
            Límite diario gratuito de Google: 2,000. Los resultados quedan en caché MySQL.
          </span>
        </div>

        <div className={style.quotaCard}>
          <div className={style.quotaHeader}>
            <span>Envíos Indexing API hoy (Gratis)</span>
            <strong>
              {quota.submissions_used} / {quota.submissions_limit}
            </strong>
          </div>
          <div className={style.progressTrack}>
            <div className={style.progressFill} style={{ width: `${subPercent}%` }} />
          </div>
          <span className={style.quotaHint}>
            Límite diario gratuito de Google: 200. Tope automático para evitar errores (nunca cobra).
          </span>
        </div>
      </div>

      {/* Gestor de rutas excluidas (No indexar) */}
      <div className={style.exclusionsPanel}>
        <button
          type="button"
          className={style.exclusionsToggle}
          onClick={() => setExclusionsOpen((prev) => !prev)}
        >
          <span>
            🚫 Reglas de Exclusión — No indexar en buscadores ({excludedRules.length} reglas activas)
          </span>
          <span>{exclusionsOpen ? "▲ Ocultar" : "▼ Gestionar"}</span>
        </button>

        {exclusionsOpen && (
          <div className={style.exclusionsBody}>
            <p className={style.exclusionsNote}>
              Cualquier carpeta o ruta que agregues aquí se oculta automáticamente de las inspecciones/envíos de Google, y en tu próximo <strong>Deploy</strong> Astro la quitará del <code>sitemap</code> y le inyectará <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot; /&gt;</code> para que los buscadores no la indexen.
            </p>

            <div className={style.exclusionsForm}>
              <input
                type="text"
                className={style.searchInput}
                placeholder="Ej. /admin, /tft/master-plan/app o una URL completa..."
                value={newRulePattern}
                onChange={(e) => setNewRulePattern(e.target.value)}
              />
              <select
                className={style.selectInput}
                value={newRuleMatchType}
                onChange={(e) => setNewRuleMatchType(e.target.value)}
              >
                <option value="prefix">Carpeta y subrutas</option>
                <option value="exact">Solo esta URL exacta</option>
              </select>
              <button
                type="button"
                className={style.btnDanger}
                disabled={Boolean(busyAction)}
                onClick={() => handleAddExclusion(newRulePattern, newRuleMatchType)}
              >
                + No indexar
              </button>
            </div>

            <div className={style.presetsRow}>
              <span>Accesos rápidos:</span>
              {QUICK_EXCLUSION_PRESETS.filter(
                (p) => !existingPatternsSet.has(p.pattern.toLowerCase())
              ).map((preset) => (
                <button
                  key={preset.pattern}
                  type="button"
                  className={style.presetBtn}
                  disabled={Boolean(busyAction)}
                  onClick={() => handleAddExclusion(preset.pattern, "prefix")}
                >
                  + Excluir {preset.label}
                </button>
              ))}
            </div>

            <div className={style.rulesChips}>
              {excludedRules.length === 0 ? (
                <span className={style.quotaHint}>No hay reglas de exclusión configuradas.</span>
              ) : (
                excludedRules.map((rule) => (
                  <span key={rule.id || rule.pattern} className={style.ruleChip}>
                    <span>{rule.pattern}</span>
                    <span className={style.ruleChipType}>
                      ({rule.match_type === "exact" ? "exacta" : "carpeta"})
                    </span>
                    <button
                      type="button"
                      className={style.ruleChipRemove}
                      title="Quitar regla y volver a permitir indexación"
                      onClick={() => handleRemoveExclusion(rule)}
                    >
                      ✕
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Botones principales */}
      <div className={style.actionsBar}>
        <button
          type="button"
          className={style.btnPrimary}
          disabled={Boolean(busyAction)}
          onClick={handleSyncSitemap}
        >
          {busyAction === "sync" ? "Sincronizando..." : "1. Sincronizar Sitemap"}
        </button>

        <button
          type="button"
          className={style.btnSecondary}
          disabled={Boolean(busyAction) || !configured}
          onClick={handleResubmitSitemap}
        >
          {busyAction === "sitemap" ? "Reenviando..." : "Reenviar Sitemap a Google"}
        </button>

        <button
          type="button"
          className={style.btnWarning}
          disabled={Boolean(busyAction) || !configured}
          onClick={() => handleInspectBatch({ totalTarget: 20, mode: "pending" })}
        >
          {busyAction === "inspect"
            ? "Inspeccionando..."
            : `2. Revisar 20 pendientes${currentFolder !== "/" ? " aquí" : ""}`}
        </button>

        <button
          type="button"
          className={style.btnSecondary}
          disabled={Boolean(busyAction) || !configured}
          onClick={() => handleInspectBatch({ totalTarget: 60, mode: "pending" })}
        >
          Revisar lote de 60
        </button>

        {busyAction === "inspect" && (
          <button
            type="button"
            className={style.btnDanger}
            onClick={() => {
              stopBatchRef.current = true;
            }}
          >
            Detener
          </button>
        )}

        <button
          type="button"
          className={style.btnSuccess}
          disabled={Boolean(busyAction) || !configured || selectedUrls.size === 0}
          onClick={() => handleRequestIndex(undefined, "indexing_api")}
        >
          3. Enviar seleccionadas ({selectedUrls.size})
        </button>
      </div>

      {feedback.text && (
        <div
          className={`${style.feedbackBox} ${feedback.isError ? style.feedbackError : ""}`}
        >
          {feedback.text}
        </div>
      )}

      {/* Navegador jerárquico de subcarpetas hasta llegar al slug */}
      <div className={style.folderExplorer}>
        <div className={style.breadcrumbRow}>
          <div className={style.breadcrumbs}>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.path}>
                  {idx > 0 && <span className={style.crumbSep}>/</span>}
                  <button
                    type="button"
                    className={`${style.crumbBtn} ${isLast ? style.crumbActive : ""}`}
                    onClick={() => navigateFolder(crumb.path)}
                  >
                    {crumb.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <div className={style.folderRightControls}>
            {subfolders.length > 0 && (
              <label className={style.directToggle}>
                <input
                  type="checkbox"
                  checked={directOnly}
                  onChange={(e) => {
                    setDirectOnly(e.target.checked);
                    setPage(1);
                  }}
                />
                <span>Solo páginas directas aquí ({directPagesCount})</span>
              </label>
            )}

            {currentFolder !== "/" && (
              <button
                type="button"
                className={`${style.miniBtn} ${style.miniBtnDanger}`}
                disabled={Boolean(busyAction)}
                onClick={() => {
                  if (
                    window.confirm(
                      `¿Excluir toda la carpeta "${currentFolder}" para que los buscadores no la indexen?`
                    )
                  ) {
                    handleAddExclusion(currentFolder, "prefix");
                  }
                }}
              >
                🚫 No indexar esta carpeta
              </button>
            )}
          </div>
        </div>

        {subfolders.length > 0 ? (
          <div className={style.subfoldersGrid}>
            {subfolders.map((sf) => (
              <button
                key={sf.folder}
                type="button"
                className={style.folderCard}
                onClick={() => navigateFolder(sf.folder)}
              >
                <div className={style.folderCardTop}>
                  <span className={style.folderName}>📁 {sf.name}/</span>
                  <span className={style.folderTotal}>{sf.total}</span>
                </div>
                <div className={style.folderMiniStats}>
                  <span>✅ {sf.indexed}</span>
                  <span>⚠️ {sf.not_indexed}</span>
                  <span>🕒 {sf.pending}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className={style.leafHint}>
            Estás en el último nivel de carpeta ({currentFolder}) — mostrando directamente los slugs en la tabla inferior.
          </p>
        )}
      </div>

      {/* Filtros de estado y buscador */}
      <div className={style.filtersRow}>
        <select
          className={style.selectInput}
          value={verdictFilter}
          onChange={(e) => {
            setVerdictFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">Todos los estados activos</option>
          <option value="NOT_INDEXED">No indexadas / Error</option>
          <option value="PENDING">Sin revisar</option>
          <option value="PASS">Indexadas</option>
          <option value="EXCLUDED">Excluidas (No indexar)</option>
        </select>

        <input
          type="text"
          className={style.searchInput}
          placeholder={`Buscar slug dentro de ${currentFolder} (ej. mano-de-la-justicia, ahri)...`}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Herramientas de selección */}
      <div className={style.selectionInfo}>
        <span>
          Mostrando {urls.length} de {pagination.total} URLs en <strong>{currentFolder}</strong> (Página {pagination.page} de {pagination.total_pages})
        </span>
        <div className={style.selectionButtons}>
          {verdictFilter !== "EXCLUDED" && (
            <button type="button" className={style.miniBtn} onClick={selectNotIndexedVisible}>
              Seleccionar no indexadas visibles
            </button>
          )}
          {selectedUrls.size > 0 && (
            <button type="button" className={style.miniBtn} onClick={clearSelection}>
              Limpiar selección ({selectedUrls.size})
            </button>
          )}
        </div>
      </div>

      {/* Tabla de URLs / Slugs */}
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Sel.</th>
              <th>Ruta / Slug</th>
              <th>Estado</th>
              <th>Detalle de Google</th>
              <th>Último rastreo / Envío</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && urls.length === 0 ? (
              <tr>
                <td colSpan="6" className={style.emptyCell}>
                  Cargando URLs...
                </td>
              </tr>
            ) : urls.length === 0 ? (
              <tr>
                <td colSpan="6" className={style.emptyCell}>
                  No hay URLs para este filtro en {currentFolder}.
                </td>
              </tr>
            ) : (
              urls.map((row) => {
                const isChecked = selectedUrls.has(row.url);
                const isExcluded = Number(row.excluded) === 1;
                const rowPath = formatShortPath(row.url);
                const gscInspectDeepLink = `https://search.google.com/search-console/inspect?resource_id=${GSC_RESOURCE_ID}&id=${encodeURIComponent(
                  row.url
                )}`;

                return (
                  <tr key={row.id || row.url}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelectUrl(row.url)}
                      />
                    </td>
                    <td className={style.urlCell}>
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.urlLink}
                      >
                        {renderHighlightedUrl(row.url)}
                      </a>
                    </td>
                    <td>{renderVerdictBadge(row)}</td>
                    <td className={style.detailText}>
                      {row.coverage_state || (isExcluded ? "Bloqueada por regla de exclusión" : "Pendiente de inspección")}
                      {row.last_checked_at && (
                        <span className={style.subMeta}>
                          Revisada: {formatDateShort(row.last_checked_at)}
                        </span>
                      )}
                    </td>
                    <td className={style.detailText}>
                      <span>Rastreo: {formatDateShort(row.last_crawl_time)}</span>
                      {row.last_submitted_at && (
                        <span className={style.subMeta}>
                          {row.submit_status || `Enviada (${row.submit_count}x)`}:{" "}
                          {formatDateShort(row.last_submitted_at)}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className={style.rowActions}>
                        {!isExcluded ? (
                          <>
                            <button
                              type="button"
                              className={style.rowBtn}
                              disabled={Boolean(busyAction) || !configured}
                              onClick={() => handleInspectBatch({ specificUrls: [row.url] })}
                            >
                              Revisar
                            </button>
                            <button
                              type="button"
                              className={`${style.rowBtn} ${style.rowBtnIndex}`}
                              disabled={Boolean(busyAction) || !configured}
                              onClick={() => handleRequestIndex([row.url], "indexing_api")}
                            >
                              Indexar
                            </button>
                            <button
                              type="button"
                              className={`${style.rowBtn} ${style.rowBtnExclude}`}
                              disabled={Boolean(busyAction)}
                              title="Marcar esta URL como No indexar"
                              onClick={() => handleAddExclusion(rowPath, "exact")}
                            >
                              🚫 No indexar
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className={`${style.rowBtn} ${style.rowBtnExclude}`}
                            disabled={Boolean(busyAction) || !configured}
                            title="Avisar a Google Indexing API que esta URL debe desindexarse"
                            onClick={() => handleRequestIndex([row.url], "delete_index")}
                          >
                            Pedir borrado a Google
                          </button>
                        )}
                        <a
                          href={gscInspectDeepLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={style.rowLinkBtn}
                          title="Abrir directamente en Google Search Console"
                        >
                          GSC ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {pagination.total_pages > 1 && (
        <div className={style.paginationRow}>
          <button
            type="button"
            className={style.miniBtn}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Anterior
          </button>
          <span>
            Página {pagination.page} de {pagination.total_pages}
          </span>
          <button
            type="button"
            className={style.miniBtn}
            disabled={page >= pagination.total_pages}
            onClick={() => setPage((p) => Math.min(pagination.total_pages, p + 1))}
          >
            Siguiente →
          </button>
        </div>
      )}
    </section>
  );
};

export default AdminSEOIndexacion;
