import { atom } from 'nanostores';
import { $user } from '@stores/auth';

export const urlNoticias = 'https://api.guiadeparche.com/noticias/noticias.php';
export const NEWS_STORAGE_KEY = 'gp_news_ticker';

export const defaultEmptyConfig = {
  enabled: false,
  badgeText: 'NOTICIAS',
  speed: 'normal',
  separator: '✦',
  spacing: 'double',
  items: [],
};

// Caché en vuelo para evitar llamadas duplicadas en cliente
let clientFetchInFlight = null;

/**
 * Normaliza la estructura recibida desde la API o localStorage
 */
const normalizeNewsConfig = (raw) => {
  if (!raw || typeof raw !== 'object') return defaultEmptyConfig;
  const items = Array.isArray(raw.items) ? raw.items : [];
  return {
    enabled: Boolean(raw.enabled),
    badgeText: typeof raw.badgeText === 'string' ? raw.badgeText : 'NOTICIAS',
    speed: ['slow', 'normal', 'fast'].includes(raw.speed) ? raw.speed : 'normal',
    separator: raw.separator || '✦',
    spacing: ['normal', 'double', 'wide'].includes(raw.spacing) ? raw.spacing : 'double',
    items,
  };
};

/**
 * Lee la caché síncrona de localStorage para evitar parpadeos en navegación / View Transitions
 */
export const getSyncNewsConfig = () => {
  if (typeof window === 'undefined') return null;
  try {
    const local = localStorage.getItem(NEWS_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.items)) {
        return normalizeNewsConfig(parsed);
      }
    }
  } catch (e) {
    // Ignorar errores de almacenamiento (modo privado Safari/iOS)
  }
  return null;
};

/**
 * Guarda la configuración en localStorage de forma segura
 */
const persistLocalNewsConfig = (config) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    // Ignorar errores de cuota o modo privado
  }
};

// Store global de Nanostores para la barra de noticias
export const $newsConfig = atom(getSyncNewsConfig() || defaultEmptyConfig);
export const $newsLoaded = atom(Boolean(getSyncNewsConfig()));

// Sincronizar cambios en tiempo real entre distintas pestañas del navegador
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === NEWS_STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        $newsConfig.set(normalizeNewsConfig(parsed));
        $newsLoaded.set(true);
      } catch (err) {
        // Ignorar JSON inválido
      }
    }
  });
}

/**
 * Obtiene el correo del administrador actual desde Nanostores o localStorage
 */
export const getAdminEmail = () => {
  const storeUser = $user.get();
  if (storeUser?.email || storeUser?.correo) {
    return storeUser.email || storeUser.correo;
  }

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('gp_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email || parsed?.correo) {
          return parsed.email || parsed.correo;
        }
      }
    } catch (e) {
      // Ignorar
    }
  }
  return '';
};

/**
 * Construye las cabeceras de autenticación para operaciones de administración
 */
export const getAuthHeaders = () => {
  const headers = {};
  const localToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const envToken =
    (typeof import.meta !== 'undefined' &&
      (import.meta.env?.PUBLIC_TOKEN_META || import.meta.env?.TOKEN_META)) ||
    '';

  const token = localToken || envToken;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const email = getAdminEmail();
  if (email) {
    headers['X-Admin-Email'] = email;
  }

  return headers;
};

/**
 * Realiza el fetch a la API PHP de GoDaddy y retorna el objeto normalizado
 */
const fetchNewsFromApi = async (timeoutMs = 6000) => {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await fetch(`${urlNoticias}?t=${Date.now()}`, {
      headers: { Accept: 'application/json' },
      signal: controller?.signal,
    });

    if (!res.ok) return null;
    const json = await res.json();

    if (json && json.success && Array.isArray(json.data)) {
      return normalizeNewsConfig({
        enabled: json.config?.enabled ?? json.data.length > 0,
        badgeText: json.config?.badgeText ?? 'NOTICIAS',
        speed: json.config?.speed ?? 'normal',
        separator: json.config?.separator ?? '✦',
        spacing: json.config?.spacing ?? 'double',
        items: json.data,
      });
    }
  } catch (err) {
    // Si la API remota aún no está subida o falla la red, usar fallback silenciosamente
  } finally {
    if (timer) clearTimeout(timer);
  }
  return null;
};

/**
 * Devuelve la configuración inicial sin golpear la API remota durante `astro build`
 * (evita bloqueos WAF/403 en GitHub Actions y evita HTML estático desactualizado).
 * En el navegador, `NewsBar` hidrata desde localStorage y consulta MySQL en vivo.
 */
export const getInitialNewsConfig = async () => {
  if (typeof window !== 'undefined') {
    return loadNewsConfig();
  }

  return defaultEmptyConfig;
};

/**
 * Carga la versión más reciente desde MySQL (GoDaddy) y actualiza el store Nanostores
 */
export const loadNewsConfig = async (force = false) => {
  if (clientFetchInFlight && !force) {
    return clientFetchInFlight;
  }

  clientFetchInFlight = (async () => {
    const fresh = await fetchNewsFromApi(7000);
    if (fresh) {
      $newsConfig.set(fresh);
      $newsLoaded.set(true);
      persistLocalNewsConfig(fresh);
      return fresh;
    }

    const sync = getSyncNewsConfig();
    if (sync) {
      $newsConfig.set(sync);
      $newsLoaded.set(true);
      return sync;
    }

    $newsLoaded.set(true);
    return $newsConfig.get() || defaultEmptyConfig;
  })();

  try {
    return await clientFetchInFlight;
  } finally {
    clientFetchInFlight = null;
  }
};

/**
 * Siembra el store con datos pre-renderizados si aún no se han cargado en cliente
 */
export const seedNewsConfig = (initialConfig) => {
  if (!initialConfig || typeof initialConfig !== 'object') return;
  const current = $newsConfig.get();
  const hasCurrentItems = Array.isArray(current?.items) && current.items.length > 0;
  const hasIncomingItems = Array.isArray(initialConfig.items) && initialConfig.items.length > 0;

  if (!hasCurrentItems && hasIncomingItems) {
    $newsConfig.set(normalizeNewsConfig(initialConfig));
  }
};

/**
 * Guarda todas las noticias y configuración en la base de datos mediante POST a noticias.php
 */
export const saveNewsConfig = async (config) => {
  const normalized = normalizeNewsConfig(config);
  const adminEmail = getAdminEmail();

  const res = await fetch(urlNoticias, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      action: 'save_all',
      admin_email: adminEmail,
      config: {
        enabled: normalized.enabled,
        badgeText: normalized.badgeText,
        speed: normalized.speed,
        separator: normalized.separator,
        spacing: normalized.spacing,
      },
      items: normalized.items,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    throw new Error(data?.message || `Error del servidor (HTTP ${res.status})`);
  }

  // Solo actualizar el store global y localStorage una vez confirmado en MySQL
  const updatedConfig = normalizeNewsConfig({
    ...(data.config || normalized),
    items: Array.isArray(data.data) ? data.data : normalized.items,
  });

  $newsConfig.set(updatedConfig);
  $newsLoaded.set(true);
  persistLocalNewsConfig(updatedConfig);

  return {
    success: true,
    message: data.message,
    config: updatedConfig,
    data: updatedConfig.items,
  };
};

/**
 * Elimina una noticia por su ID mediante DELETE en noticias.php
 */
export const deleteNewsItem = async (id) => {
  try {
    const adminEmail = getAdminEmail();
    const query = new URLSearchParams({ id: String(id) });
    if (adminEmail) query.set('admin_email', adminEmail);

    const res = await fetch(`${urlNoticias}?${query.toString()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ id, admin_email: adminEmail }),
    });
    return await res.json();
  } catch (err) {
    console.error('Error al eliminar noticia en API:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Registra un clic público sobre una noticia (no bloquea la navegación)
 */
export const registerNewsClick = (id) => {
  if (!id || Number.isNaN(Number(id))) return;
  try {
    fetch(`${urlNoticias}?action=click&id=${encodeURIComponent(id)}`, {
      method: 'POST',
      keepalive: true,
    }).catch(() => {});
  } catch (e) {
    // Ignorar fallos de analítica
  }
};
