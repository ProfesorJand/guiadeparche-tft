import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import styles from './css/AdminNoticias.module.css';
import NewsBar from '@components/navigation/NewsBar.jsx';
import {
  $newsConfig,
  loadNewsConfig,
  saveNewsConfig,
  deleteNewsItem,
  defaultEmptyConfig,
} from '@stores/news';
import { renderFormattedNewsText } from '@utils/newsFormatter';

const separatorPresets = [
  { label: '✦ Diamante (Recomendado)', value: '✦' },
  { label: '• Punto Clásico', value: '•' },
  { label: '🔥 Fuego', value: '🔥' },
  { label: '⚡ Rayo', value: '⚡' },
  { label: '★ Estrella', value: '★' },
  { label: '| Barra vertical', value: '|' },
];

/**
 * Panel de Administración para gestionar la Barra de Noticias (News Bar) de Guiadeparche.
 * Permite configurar visibilidad, texto del badge, velocidad, separador, espaciado,
 * crear/reordenar/eliminar noticias con formato de colores y consultar clics recibidos.
 */
const AdminNoticias = () => {
  const storeConfig = useStore($newsConfig);

  const [config, setConfig] = useState(() =>
    storeConfig && Array.isArray(storeConfig.items)
      ? storeConfig
      : { ...defaultEmptyConfig, enabled: true }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('breadcrumbs'); // 'breadcrumbs' | 'standalone'
  const [statusMessage, setStatusMessage] = useState({ text: '', type: 'info' });

  // Cargar la versión más reciente desde la base de datos MySQL en GoDaddy
  const fetchFreshConfig = async (showNotice = false) => {
    setIsLoading(true);
    try {
      const freshData = await loadNewsConfig(true);
      if (freshData && Array.isArray(freshData.items)) {
        setConfig(freshData);
      }
      if (showNotice) {
        setStatusMessage({
          text: 'Datos sincronizados desde la base de datos.',
          type: 'info',
        });
        setTimeout(() => setStatusMessage({ text: '', type: 'info' }), 3000);
      }
    } catch (err) {
      console.warn('Error cargando noticias en el panel admin:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFreshConfig(false);
  }, []);

  const handleGlobalChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setConfig((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: `news-${Date.now()}`,
      text: '',
      url: '',
      openInNewTab: false,
      enabled: true,
      clicks: 0,
    };
    setConfig((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleRemoveItem = async (index) => {
    const item = config.items[index];
    if (!confirm(`¿Estás seguro de eliminar la noticia #${index + 1}?`)) return;

    if (item && item.id && !Number.isNaN(Number(item.id))) {
      try {
        await deleteNewsItem(item.id);
      } catch (err) {
        console.warn('Se confirmará la eliminación al guardar:', err);
      }
    }

    setConfig((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleMoveItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= config.items.length) return;
    setConfig((prev) => {
      const newItems = [...prev.items];
      const [moved] = newItems.splice(index, 1);
      newItems.splice(targetIndex, 0, moved);
      return { ...prev, items: newItems };
    });
  };

  const handleWrapText = (index, openTag, closeTag) => {
    const textarea = document.getElementById(`gp-news-textarea-${index}`);
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value || '';
    const selectedText = currentVal.substring(start, end);

    let newText = '';
    let selectionOffset = 0;
    let selectionLen = 0;

    if (selectedText.length > 0) {
      const leadSpace = selectedText.match(/^\s*/)[0];
      const trailSpace = selectedText.match(/\s*$/)[0];
      const trimmed = selectedText.trim();

      newText =
        currentVal.substring(0, start) +
        leadSpace +
        openTag +
        trimmed +
        closeTag +
        trailSpace +
        currentVal.substring(end);
      selectionOffset = start + leadSpace.length + openTag.length;
      selectionLen = trimmed.length;
    } else {
      const placeholder = 'texto';
      newText =
        currentVal.substring(0, start) +
        openTag +
        placeholder +
        closeTag +
        currentVal.substring(end);
      selectionOffset = start + openTag.length;
      selectionLen = placeholder.length;
    }

    handleItemChange(index, 'text', newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionOffset, selectionOffset + selectionLen);
    }, 15);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage({ text: 'Guardando barra de noticias...', type: 'info' });

    try {
      const res = await saveNewsConfig(config);
      if (res?.config) {
        setConfig(res.config);
      } else if (res?.data && Array.isArray(res.data)) {
        setConfig((prev) => ({ ...prev, items: res.data }));
      }

      setStatusMessage({
        text: '¡Barra de Noticias guardada con éxito en la base de datos de Guiadeparche!',
        type: 'success',
      });

      setTimeout(() => {
        setStatusMessage({ text: '', type: 'info' });
      }, 5000);
    } catch (err) {
      console.error('Error guardando barra de noticias:', err);
      setStatusMessage({
        text: `Error al guardar en el servidor: ${err.message || 'Verifica que noticias.php esté subido en GoDaddy.'}`,
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const activeItemsCount = (config.items || []).filter(
    (item) => item.enabled !== false && item.text && item.text.trim()
  ).length;

  return (
    <section className={styles.manager}>
      {/* CABECERA */}
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <h2>📰 Gestor de Barra de Noticias</h2>
          <p className={styles.headerSubtitle}>
            Configura avisos deslizantes con colores y enlaces junto a las migas de pan de Guiadeparche.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.refreshBtn}
            onClick={() => fetchFreshConfig(true)}
            disabled={isLoading}
          >
            <span>🔄</span>
            <span>{isLoading ? 'Cargando...' : 'Recargar desde BD'}</span>
          </button>
        </div>
      </div>

      {/* VISTA PREVIA EN VIVO */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <div className={styles.sectionTitle}>
            <span>👁️</span>
            <span>Vista Previa en Vivo</span>
          </div>
          <div className={styles.previewToggleGroup}>
            <button
              type="button"
              className={`${styles.previewModeBtn} ${
                previewMode === 'breadcrumbs' ? styles.previewModeBtnActive : ''
              }`}
              onClick={() => setPreviewMode('breadcrumbs')}
            >
              Con Migas de Pan
            </button>
            <button
              type="button"
              className={`${styles.previewModeBtn} ${
                previewMode === 'standalone' ? styles.previewModeBtnActive : ''
              }`}
              onClick={() => setPreviewMode('standalone')}
            >
              Inicio (Ancho completo)
            </button>
          </div>
        </div>
        <div className={styles.sectionSubtitle}>
          Así se verá la barra en el espacio de migas de pan debajo del header. Al pasar el cursor, el desplazamiento se pausa.
        </div>

        <div className={styles.previewBox}>
          {!config.enabled ? (
            <div className={styles.previewDisabledNotice}>
              ⚠️ La Barra de Noticias está desactivada actualmente. Actívala abajo para mostrarla en la web.
            </div>
          ) : activeItemsCount === 0 ? (
            <div className={styles.previewDisabledNotice}>
              ℹ️ La barra está oculta porque no hay noticias activas con texto. Agrega una noticia abajo para previsualizarla.
            </div>
          ) : previewMode === 'breadcrumbs' ? (
            <div className={styles.previewBarMock}>
              <div className={styles.previewBreadcrumbsMock}>
                <span className={styles.previewCrumbPill}>TFT</span>
                <span className={styles.previewCrumbSep}>›</span>
                <span className={styles.previewCrumbCurrent}>Meta Comps Tier List</span>
              </div>
              <NewsBar previewConfig={config} variant="preview" />
            </div>
          ) : (
            <NewsBar previewConfig={config} variant="preview" />
          )}
        </div>
      </div>

      {/* AJUSTES GENERALES */}
      <div className={styles.settingsCard}>
        <div className={styles.sectionTitle}>
          <span>⚙️</span>
          <span>Ajustes Generales de la Barra</span>
        </div>

        <div className={styles.settingsGrid}>
          {/* Activar / Desactivar */}
          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>Estado de la Barra</span>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                className={styles.switchInput}
                checked={Boolean(config.enabled)}
                onChange={(e) => handleGlobalChange('enabled', e.target.checked)}
              />
              <span>{config.enabled ? '🟢 Visible en la Web' : '⚪ Oculta en la Web'}</span>
            </label>
            <span className={styles.fieldHint}>
              Muestra u oculta la barra en todas las páginas del sitio
            </span>
          </div>

          {/* Etiqueta del Distintivo (Badge) */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="gp-news-badge">
              Texto del Distintivo (Badge)
            </label>
            <input
              id="gp-news-badge"
              type="text"
              className={styles.input}
              value={config.badgeText || ''}
              onChange={(e) => handleGlobalChange('badgeText', e.target.value)}
              placeholder="Ej: NOTICIAS, NUEVO PARCHE, AVISO (vacío para ocultar)"
            />
            <span className={styles.fieldHint}>
              Etiqueta fija a la izquierda con indicador luminoso parpadeante
            </span>
          </div>

          {/* Velocidad */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="gp-news-speed">
              Velocidad de Deslizamiento
            </label>
            <select
              id="gp-news-speed"
              className={styles.select}
              value={config.speed || 'normal'}
              onChange={(e) => handleGlobalChange('speed', e.target.value)}
            >
              <option value="slow">Lenta (Más tiempo para leer)</option>
              <option value="normal">Normal (Recomendada)</option>
              <option value="fast">Rápida</option>
            </select>
            <span className={styles.fieldHint}>
              Controla qué tan rápido se desliza el texto de derecha a izquierda
            </span>
          </div>

          {/* Separador */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="gp-news-separator">
              Símbolo de Separación
            </label>
            <select
              id="gp-news-separator"
              className={styles.select}
              value={config.separator || '✦'}
              onChange={(e) => handleGlobalChange('separator', e.target.value)}
            >
              {separatorPresets.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
            <span className={styles.fieldHint}>
              Ícono o carácter que separa cada noticia en la marquesina
            </span>
          </div>

          {/* Espaciado */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="gp-news-spacing">
              Distancia / Separación
            </label>
            <select
              id="gp-news-spacing"
              className={styles.select}
              value={config.spacing || 'double'}
              onChange={(e) => handleGlobalChange('spacing', e.target.value)}
            >
              <option value="normal">Normal (24px)</option>
              <option value="double">Doble (48px - Recomendada)</option>
              <option value="wide">Extra Amplia (72px)</option>
            </select>
            <span className={styles.fieldHint}>
              Espacio libre alrededor del separador entre cada anuncio
            </span>
          </div>
        </div>
      </div>

      {/* LISTADO DE ELEMENTOS */}
      <div className={styles.itemsSection}>
        <div className={styles.itemsSectionHeader}>
          <div>
            <div className={styles.sectionTitle}>
              <span>📢</span>
              <span>Elementos de Noticias ({config.items.length})</span>
            </div>
            <div className={`${styles.sectionSubtitle} ${styles.sectionSubtitleCompact}`}>
              Cada noticia puede tener texto con palabras resaltadas en color y un enlace opcional al hacer clic.
            </div>
          </div>
          <button type="button" className={styles.addItemBtn} onClick={handleAddItem}>
            <span>+</span>
            <span>Agregar Noticia</span>
          </button>
        </div>

        {config.items.length === 0 && (
          <div className={styles.emptyState}>
            <p>
              No hay elementos en la barra de noticias. Haz clic en &quot;Agregar Noticia&quot; para crear el primero.
            </p>
          </div>
        )}

        {config.items.map((item, index) => (
          <div
            key={item.id || index}
            className={`${styles.itemCard} ${item.enabled === false ? styles.disabledItem : ''}`}
          >
            {/* CABECERA DEL ELEMENTO */}
            <div className={styles.itemHeader}>
              <div className={styles.itemHeaderLeft}>
                <span className={styles.itemBadge}>#{index + 1}</span>
                <span
                  className={styles.clicksBadge}
                  title="Total de clics recibidos en esta noticia"
                >
                  👆 {item.clicks || 0} clics
                </span>
                <span className={styles.itemTitlePreview}>
                  {item.text ? renderFormattedNewsText(item.text) : '(Sin texto todavía)'}
                </span>
              </div>

              <div className={styles.itemActions}>
                <button
                  type="button"
                  className={styles.btnAction}
                  onClick={() => handleMoveItem(index, -1)}
                  disabled={index === 0}
                  title="Subir posición"
                >
                  ▲ Subir
                </button>
                <button
                  type="button"
                  className={styles.btnAction}
                  onClick={() => handleMoveItem(index, 1)}
                  disabled={index === config.items.length - 1}
                  title="Bajar posición"
                >
                  ▼ Bajar
                </button>
                <button
                  type="button"
                  className={`${styles.btnAction} ${styles.btnActionDelete}`}
                  onClick={() => handleRemoveItem(index)}
                  title="Eliminar noticia"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>

            {/* CUERPO DEL ELEMENTO */}
            <div className={styles.itemBody}>
              {/* Texto de la noticia */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor={`gp-news-textarea-${index}`}>
                  Texto de la Noticia / Anuncio <span className={styles.requiredMark}>*</span>
                </label>
                <textarea
                  id={`gp-news-textarea-${index}`}
                  className={styles.textarea}
                  rows={2}
                  value={item.text || ''}
                  onChange={(e) => handleItemChange(index, 'text', e.target.value)}
                  placeholder="Ej: 🔥 ¡Actualizado el **Meta de TFT** para el nuevo parche! Revisa las mejores compos Tier S"
                />
                {/* Barra de formato de colores */}
                <div className={styles.formatterToolbar}>
                  <span className={styles.formatterHint}>🎨 Resaltar selección:</span>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${styles.tagBtnGold}`}
                    onClick={() => handleWrapText(index, '**', '**')}
                    title="Resaltar con doble asterisco (**texto**)"
                  >
                    ✨ **Dorado**
                  </button>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${styles.tagBtnGold}`}
                    onClick={() => handleWrapText(index, '[dorado]', '[/dorado]')}
                    title="Texto en dorado"
                  >
                    🟡 [dorado]
                  </button>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${styles.tagBtnRed}`}
                    onClick={() => handleWrapText(index, '[rojo]', '[/rojo]')}
                    title="Texto en rojo vibrante (ideal para EN VIVO o ALERTAS)"
                  >
                    🔴 [rojo]
                  </button>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${styles.tagBtnGreen}`}
                    onClick={() => handleWrapText(index, '[verde]', '[/verde]')}
                    title="Texto en verde esmeralda"
                  >
                    🟢 [verde]
                  </button>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${styles.tagBtnBlue}`}
                    onClick={() => handleWrapText(index, '[azul]', '[/azul]')}
                    title="Texto en azul / cyan"
                  >
                    🔵 [azul]
                  </button>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${styles.tagBtnPurple}`}
                    onClick={() => handleWrapText(index, '[violeta]', '[/violeta]')}
                    title="Texto en violeta"
                  >
                    🟣 [violeta]
                  </button>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${styles.tagBtnOrange}`}
                    onClick={() => handleWrapText(index, '[naranja]', '[/naranja]')}
                    title="Texto en naranja"
                  >
                    🟠 [naranja]
                  </button>
                </div>
              </div>

              {/* URL destino */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor={`gp-news-url-${index}`}>
                  URL o Enlace de Destino (opcional)
                </label>
                <input
                  id={`gp-news-url-${index}`}
                  type="text"
                  className={styles.input}
                  value={item.url || ''}
                  onChange={(e) => handleItemChange(index, 'url', e.target.value)}
                  placeholder="Ej: /tft/meta-comps-tier-list-teamfight-tactics/ o https://..."
                />
                <span className={styles.fieldHint}>
                  Acepta rutas internas como <code>/tft/meta-comps-tier-list-teamfight-tactics/</code>,{' '}
                  <code>/blog/</code>, <code>/tft/master-plan/</code> o enlaces externos como{' '}
                  <code>https://...</code>
                </span>
              </div>

              {/* Opciones */}
              <div className={styles.optionsRow}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={Boolean(item.openInNewTab)}
                    onChange={(e) => handleItemChange(index, 'openInNewTab', e.target.checked)}
                  />
                  <span>Abrir enlace en pestaña nueva (target=&quot;_blank&quot;)</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={item.enabled !== false}
                    onChange={(e) => handleItemChange(index, 'enabled', e.target.checked)}
                  />
                  <span>Mostrar este elemento en la marquesina</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AVISO INFORMATIVO */}
      <div className={styles.noticeBox}>
        💡 <strong>Actualización en vivo:</strong> Al presionar <strong>&quot;Guardar Noticias&quot;</strong>,
        los cambios se guardan directamente en MySQL (GoDaddy) y se reflejan de inmediato para todos los usuarios
        de Guiadeparche sin necesidad de recompilar la web.
      </div>

      {/* BARRA INFERIOR DE GUARDADO */}
      <div className={styles.saveBar}>
        <div>
          {statusMessage.text ? (
            <span className={`${styles.saveStatus} ${styles[statusMessage.type]}`}>
              {statusMessage.text}
            </span>
          ) : (
            <span className={styles.activeCountText}>
              {activeItemsCount} de {config.items.length} noticias activas
            </span>
          )}
        </div>
        <button
          type="button"
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={isSaving}
        >
          <span>💾</span>
          <span>{isSaving ? 'Guardando...' : 'Guardar Noticias'}</span>
        </button>
      </div>
    </section>
  );
};

export default AdminNoticias;
