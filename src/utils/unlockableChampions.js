// Mapa ligero de campeones desbloqueables (Unlock) para detección automática en el tablero sin cargar el JSON completo en el cliente.
// También detecta dinámicamente si el objeto del campeón trae `unlock.isUnlockable` desde la API (futuros sets).
export const UNLOCKABLE_CHAMPIONS_SET_19 = new Set([
  "tft19_akali_kda",
  "tft19_akali_truedamage",
  "tft19_alistar",
  "tft19_alune",
  "tft19_aphelios",
  "tft19_ashe",
  "tft19_baronnashor",
  "tft19_evelynn",
  "tft19_gwen",
  "tft19_janna",
  "tft19_jinx",
  "tft19_kayle",
  "tft19_kobuko",
  "tft19_leesin",
  "tft19_lulu",
  "tft19_mordekaiser",
  "tft19_pyke",
  "tft19_rakan",
  "tft19_samira",
  "tft19_seraphine",
  "tft19_smeech",
  "tft19_sona",
  "tft19_taliyah",
  "tft19_teemo",
  "tft19_thresh",
  "tft19_tibbers",
  "tft19_tristana",
  "tft19_vayne",
  "tft19_vladimir",
  "tft19_wukong",
  "tft19_yasuo",
  "tft19_zac",
]);

export const isChampionUnlockable = (champion) => {
  if (!champion) return false;
  if (champion.unlock?.isUnlockable || champion.ability?.unlock?.isUnlockable) {
    return true;
  }
  const apiName = String(champion.apiName || champion.apiNameCampeon || "").toLowerCase();
  return UNLOCKABLE_CHAMPIONS_SET_19.has(apiName);
};
