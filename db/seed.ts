import { db, Usuario, eq, isDbError} from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
	// TODO
  try {
    const crear = await db.insert(Usuario).values([
      {puuid: "-u8mMIhOWx0MovcRALFX-85mSwgxsGP1LsgaZfL0eqEX1KXomvsyjUdUvM8xJuc8JVUzCFDUkzoWkw",
      invocador: "rapperboy",
      etiqueta: "las",
      id: "1blYxDABAYRv4DmYAqGp6CHtgqstohuOC0l9E2XW91PNUr0",
      region: "americas",
      plataforma: "la2",
      profileIconId: 6092,
      tier: "gold",
      leaguePoints: 22,
      puntaje:2022,
      eventoId: 1,
      eventoNombre: "principiante",
      eliminado: false},
      {puuid: "wG4u8l56ElSkeKMdxK0Xk1eYiX9bFRaYmVytfVfr_RazwpBDh59w0zfJ5qd5SbPZ2v6Avzbi26o4oQ",
      invocador: "jupeson",
      etiqueta: "las",
      id: "3SFBkhu-jC8o5oyRgBkYrBsiScWU5sihdglhnCvtO6WR5w",
      region: "americas",
      plataforma: "la2",
      profileIconId: 6092,
      tier: "gold",
      leaguePoints: 22,
      puntaje:2022,
      eventoId: 1,
      eventoNombre: "principiante",
      eliminado: false}
    ])
    console.log("creado", crear)
    // await db.update(Usuario)
    // .set({ plataforma: "la2" })
    // .where(eq(Usuario.invocador, 'jupeson'));
  } catch (e) {
    if (isDbError(e)) {
      console.log("isDbError(e)",e)
      return new Response(`err ${e}`);
    }
    console.log("e",e)
    return new Response('An unexpected error occurred', { status: 500 });
  }
	
}