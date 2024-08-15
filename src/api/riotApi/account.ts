const api_key = import.meta.env.API_KEY;

interface PARAMETROSGETPUUID{
region: string; invocador:string; etiqueta:string
}

interface GETPUUID{
  puuid:	string;
  gameName:	string;
  tagLine:	string;
}

interface GETACCOUNTINFO{
  accountId:	string;	//Encrypted account ID. Max length 56 characters.
  profileIconId:	number;	//ID of the summoner icon associated with the summoner.
  revisionDate:	number;	//Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change.
  id:	string;	//Encrypted summoner ID. Max length 63 characters.
  puuid:	string;	//Encrypted PUUID. Exact length of 78 characters.
  summonerLevel:	number;	//Summoner level associated with the summoner.
}

interface GETRANK{
  puuid:	string	//Player Universal Unique Identifier. Exact length of 78 characters. (Encrypted)
  leagueId:	string	//Not included for the RANKED_TFT_TURBO queueType.
  summonerId:	string	//Player's encrypted summonerId.
  queueType:	string
  ratedTier:	string	//Only included for the RANKED_TFT_TURBO queueType. (Legal values: ORANGE, PURPLE, BLUE, GREEN, GRAY)
  ratedRating: number	//Only included for the RANKED_TFT_TURBO queueType.
  tier:	string	//Not included for the RANKED_TFT_TURBO queueType.
  rank:	string	//The player's division within a tier. Not included for the RANKED_TFT_TURBO queueType.
  leaguePoints:	number	//Not included for the RANKED_TFT_TURBO queueType.
  wins:	number	//First placement.
  losses: number //Second through eighth placement.
  hotStreak:	boolean	//Not included for the RANKED_TFT_TURBO queueType.
  veteran:	boolean	//Not included for the RANKED_TFT_TURBO queueType.
  freshBlood:	boolean	//Not included for the RANKED_TFT_TURBO queueType.
  inactive:	boolean	//Not included for the RANKED_TFT_TURBO queueType.
}

interface GETRANK extends Array<GETRANK>{}

export const getPuntaje = {
  CHALLENGER:{I:1},
  GRANDMASTER:{I:2},
  MASTER:{I:3},
  DIAMOND:{I:4,II:5,III:6,IV:7},
  EMERALD:{I:8,II:9,III:10,IV:11},
  PLATINUM:{I:12,II:13,III:14,IV:15},
  GOLD:{I:16,II:17,III:18,IV:19},
  SILVER:{I:20,II:21,III:22,IV:23},
  BRONCE:{I:24,II:25,III:26,IV:27},
  IRON:{I:28,II:29,III:30,IV:31},
  UNRANKED:{UNRANKED:32}
}

export const getAccountInfo = async ({ plataforma, puuid }): Promise<GETACCOUNTINFO> | null => {
  try {    
    const ACCOUNT_LINK = `https://${plataforma}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${api_key}`;
    const resAccount = await fetch(ACCOUNT_LINK, {cache:"reload"});
    const result = await resAccount.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log('error en getPuuid', error.message);
    return null
  }
};

export const getPUUID = async ({ region, invocador, etiqueta }): Promise<GETPUUID> | null => {
  try {
    const regional = {
      AMERICAS: 'americas.api.riotgames.com',
      ASIA: 'asia.api.riotgames.com',
      EUROPE: 'europe.api.riotgames.com',
      SEA: 'sea.api.riotgames.com',
    };
    const ruta = regional[region?.toUpperCase()];
    const ACCOUNT_LINK = `https://${ruta}/riot/account/v1/accounts/by-riot-id/${invocador}/${etiqueta}?api_key=${api_key}`;
    const response = await fetch(ACCOUNT_LINK, {cache:"reload"});
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log('error en getPuuid', error.message);
    return null;
  }
};

export const getRank = async ({ summonerId, plataforma }): Promise<GETRANK> | null=> {
  try{
    const url = `https://${plataforma}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${api_key}`;
    const response = await fetch(url, {cache:"reload"});
    const result = await response.json();
    console.log(result);
    return result;
  }catch(error){
    console.log("Error en getRank",  error.message);
    return null
  }
};
