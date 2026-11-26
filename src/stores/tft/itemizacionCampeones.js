import { atom } from 'nanostores';
import { $user } from '@stores/auth';

export const urlItemizacionCampeones = 'https://api.guiadeparche.com/tft/itemizacion_campeones.php';

// Mapa global indexado por set_number: { "19": { "tft19_jinx": { bis, special_bis, extras, deleted_keys } } }
export const $itemizacionPorSet = atom({});
export const $itemizacionLoading = atom(false);

const inFlightBySet = new Map();

/**
 * Obtiene el correo del administrador actual desde Nanostores o localStorage
 */
const getAdminEmail = () => {
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
 * Construye cabeceras de autenticación para operaciones administrativas
 */
const getAuthHeaders = () => {
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
 * Actualiza el mapa de un set dentro del store global
 */
const updateSetMapInStore = (setKey, dataMap) => {
  const current = $itemizacionPorSet.get() || {};
  $itemizacionPorSet.set({
    ...current,
    [setKey]: dataMap || {},
  });
};

/**
 * Carga la itemización completa de un set desde MySQL (GoDaddy)
 */
export const loadItemizacionBySet = async (setNumber, force = false) => {
  const setKey = String(setNumber || '').trim();
  if (!setKey) return {};

  const cached = ($itemizacionPorSet.get() || {})[setKey];
  if (cached && !force) {
    return cached;
  }

  if (inFlightBySet.has(setKey) && !force) {
    return inFlightBySet.get(setKey);
  }

  const promise = (async () => {
    $itemizacionLoading.set(true);
    try {
      const res = await fetch(
        `${urlItemizacionCampeones}?set=${encodeURIComponent(setKey)}&t=${Date.now()}`,
        {
          headers: { Accept: 'application/json' },
          cache: 'no-cache',
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json && json.success && json.data && typeof json.data === 'object') {
        updateSetMapInStore(setKey, json.data);
        return json.data;
      }

      return cached || {};
    } catch (err) {
      console.warn(`No se pudo cargar itemizacion_campeones para Set ${setKey}:`, err.message);
      return cached || {};
    } finally {
      $itemizacionLoading.set(false);
      inFlightBySet.delete(setKey);
    }
  })();

  inFlightBySet.set(setKey, promise);
  return promise;
};

/**
 * Guarda la itemización completa de un campeón (BIS, BIS Especiales y extras de infografía)
 * desde la pestaña Admin "Itemizacion Campeones"
 */
export const saveChampionItemizacion = async (
  setNumber,
  campeonApiName,
  bisRows = [],
  specialBisRows = [],
  extras = null
) => {
  const setKey = String(setNumber || '').trim();
  const adminEmail = getAdminEmail();

  const res = await fetch(urlItemizacionCampeones, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      action: 'save_champion',
      admin_email: adminEmail,
      set_number: setKey,
      campeon_api_name: campeonApiName,
      bis: bisRows,
      special_bis: specialBisRows,
      extras,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || `Error del servidor (HTTP ${res.status})`);
  }

  if (data.data && typeof data.data === 'object') {
    updateSetMapInStore(setKey, data.data);
  }

  return data;
};

/**
 * Guarda múltiples campeones modificados en bloque desde "Itemizacion Campeones"
 */
export const saveBulkItemizacion = async (setNumber, championsPayload = {}) => {
  const setKey = String(setNumber || '').trim();
  const adminEmail = getAdminEmail();

  const res = await fetch(urlItemizacionCampeones, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      action: 'save_bulk',
      admin_email: adminEmail,
      set_number: setKey,
      champions: championsPayload,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || `Error del servidor (HTTP ${res.status})`);
  }

  if (data.data && typeof data.data === 'object') {
    updateSetMapInStore(setKey, data.data);
  }

  return data;
};

/**
 * Sincroniza (SOLO upsert, NUNCA borra) combinaciones nuevas o actualizadas desde el
 * editor de composiciones (FormularioVisualTFT) hacia la base de datos global de campeones.
 */
export const syncItemizacionFromComp = async (setNumber, bestBuild = []) => {
  const setKey = String(setNumber || '').trim();
  if (!setKey || !Array.isArray(bestBuild) || bestBuild.length === 0) {
    return { success: true, processed: 0 };
  }

  const adminEmail = getAdminEmail();

  const res = await fetch(urlItemizacionCampeones, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      action: 'upsert_from_comp',
      admin_email: adminEmail,
      set_number: setKey,
      bestBuild,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || `Error al sincronizar itemización (HTTP ${res.status})`);
  }

  if (data.data && typeof data.data === 'object') {
    updateSetMapInStore(setKey, data.data);
  }

  return data;
};
