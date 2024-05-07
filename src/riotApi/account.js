const api_key = import.meta.env.API_KEY;

export const getAccountInfo = async ({ plataforma, puuid }) => {
  // const plataformas = {
  //   BR1: 'br1.api.riotgames.com',
  //   EUN1: 'eun1.api.riotgames.com',
  //   EUW1: 'euw1.api.riotgames.com',
  //   JP1: 'jp1.api.riotgames.com',
  //   KR: 'kr.api.riotgames.com',
  //   LA1: 'la1.api.riotgames.com',
  //   LA2: 'la2.api.riotgames.com',
  //   NA1: 'na1.api.riotgames.com',
  //   OC1: 'oc1.api.riotgames.com',
  //   TR1: 'tr1.api.riotgames.com',
  //   RU: 'ru.api.riotgames.com',
  //   PH2: 'ph2.api.riotgames.com',
  //   SG2: 'sg2.api.riotgames.com',
  //   TH2: 'th2.api.riotgames.com',
  //   TW2: 'tw2.api.riotgames.com',
  //   VN2: 'vn2.api.riotgames.com',
  // };
  const ACCOUNT_LINK = `https://${plataforma}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${api_key}`;
  const resAccount = await fetch(ACCOUNT_LINK);
  const result = await resAccount.json();
  return result;
};

export const getPUUID = async ({ region, invocador, etiqueta }) => {
  const regional = {
    AMERICAS: 'americas.api.riotgames.com',
    ASIA: 'asia.api.riotgames.com',
    EUROPE: 'europe.api.riotgames.com',
    SEA: 'sea.api.riotgames.com',
  };
  const ruta = regional[region.toUpperCase()];
  const ACCOUNT_LINK = `https://${ruta}/riot/account/v1/accounts/by-riot-id/${invocador}/${etiqueta}?api_key=${api_key}`;
  const response = await fetch(ACCOUNT_LINK);
  const result = await response.json();
  return result;
};

export const getRank = async ({ summonerId, plataforma }) => {
  const url = `https://${plataforma}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${api_key}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
};

/*


*/
