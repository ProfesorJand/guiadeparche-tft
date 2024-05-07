import { db, Usuario } from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Usuario).values([
    {puuid: "asdasd",
    invocador: "jupeson",
    etiqueta: "las",
    id: "asdsad",
    region: "americas",
    plataforma: "la1",
    profileIconId: 321,
    tier: "silver",
    leaguePoints: 123,
    eventoId: 1,
    eventoNombre: "principiante",
    eliminado: false},
  ])
}
