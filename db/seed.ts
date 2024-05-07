import { db, Usuario, eq, isDbError} from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
	// TODO
  try {
    // await db.delete(Usuario);
    // console.log("delete", await db.select().from(Usuario))

    // const crear = await db.insert(Usuario).values([
    //   {
    //     puuid: "-u8mMIhOWx0MovcRALFX-85mSwgxsGP1LsgaZfL0eqEX1KXomvsyjUdUvM8xJuc8JVUzCFDUkzoWkw",
    //     invocador: "rapperboy",
    //     etiqueta: "las",
    //     id: "1blYxDABAYRv4DmYAqGp6CHtgqstohuOC0l9E2XW91PNUr0",
    //     region: "americas",
    //     plataforma: "la2",
    //     profileIconId: 6092,
    //     tier: "gold",
    //     rank: "II",
    //     leaguePoints: 22,
    //     puntaje: 3022,
    //     eventoId: 1,
    //     eventoNombre: "principiante",
    //     eliminado: false
    //   },
    //   {
    //     puuid: "wG4u8l56ElSkeKMdxK0Xk1eYiX9bFRaYmVytfVfr_RazwpBDh59w0zfJ5qd5SbPZ2v6Avzbi26o4oQ",
    //     invocador: "jupeson",
    //     etiqueta: "las",
    //     id: "3SFBkhu-jC8o5oyRgBkYrBsiScWU5sihdglhnCvtO6WR5w",
    //     region: "americas",
    //     plataforma: "la2",
    //     profileIconId: 6092,
    //     tier: "silver",
    //     rank: "I",
    //     leaguePoints: 22,
    //     puntaje: 2022,
    //     eventoId: 1,
    //     eventoNombre: "principiante",
    //     eliminado: false,
    // }
    // ])
    // console.log("creado")
    await db.update(Usuario)
    .set({ invocador: "INF HR Jupeson", plataforma: "la1", etiqueta:"lan", puuid: "vUvf2p8icyGAkBigkVh8oh-CTcGnn-0521Dj66vP-hS7YXr9md2IaaoboawAIUKgmqZVsGSWToR_Bw", id:"CkOkraupZ7cDU_RSY8dUbxbN5yCYHrsKy3764dIf9a6hQ-A" })
    .where(eq(Usuario.invocador, 'jupeson')).returning();
    await db.update(Usuario)
    .set({ tier:"gold"})
    .where(eq(Usuario.invocador, 'rapperboy'));
  
  } catch (e) {
    if (isDbError(e)) {
      console.log("isDbError(e)",e)
      return new Response(`err ${e}`);
    }
    console.log("e",e)
    return new Response('An unexpected error occurred', { status: 500 });
  }
	
}