import { db, Usuario, eq } from 'astro:db';
import { getRank } from '../riotApi/account';

export const updateUsersScores = async ({ summonerId, plataforma }) => {
  const [{ tier, rank, leaguePoints, puuid }] = await getRank({
    summonerId,
    plataforma,
  });
  const userUpdate = await db
    .update(Usuario)
    .set({ tier, rank, leaguePoints })
    .where(eq(Usuario.puuid, puuid))
    .returning({ updatedId: Usuario.puuid });
  console.log(userUpdate);
};
