import { db, Usuario, eq, or } from 'astro:db';
import { getRank, getPuntaje } from '../api/riotApi/account.ts';

export const updateUsersScores = async ({ summonerId, plataforma }) => {
  try {
    const rangos = await getRank({
      summonerId,
      plataforma,
    });

    const { tier, rank, leaguePoints, puuid } = rangos.find((r) => {
      return r.queueType === 'RANKED_TFT';
    }) || {
      tier: 'UNRANKED',
      rank: 'UNRANKED',
      leaguePoints: 0,
    };
    const puntaje = getPuntaje[tier.toUpperCase()][rank.toUpperCase()];
    const userUpdate = await db
      .update(Usuario)
      .set({ tier, rank, leaguePoints, puntaje })
      .where(or(eq(Usuario.puuid, puuid), eq(Usuario.id, summonerId)))
      .returning({ invocador: Usuario.invocador, puntaje: Usuario.puntaje });
    console.log(userUpdate);
  } catch (error) {
    console.log(error);
  }
};
