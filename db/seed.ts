import { db, Usuario, eq, isDbError, Admin} from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
	// TODO
  // const all = await db.select().from(Usuario);
  // const jupe = await db.update(Usuario)
  // .set({ tier:"gold"})
  // .where(eq(Usuario.puuid, "vUvf2p8icyGAkBigkVh8oh-CTcGnn-0521Dj66vP-hS7YXr9md2IaaoboawAIUKgmqZVsGSWToR_Bw" )).returning({ invocador: Usuario.invocador });
  // console.log("jupe", jupe)
  // const rapper = await db.update(Usuario)
  // .set({ tier:"gold"})
  // .where(eq(Usuario.invocador, 'rapperboy')).returning({ invocador: Usuario.invocador });
  // console.log("rapper", rapper)
  // console.log("All", all)
  try {
    // const admins = await db.select().from(Admin);

    // console.log({admins})
    const crearAdmin = await db.insert(Admin).values([
      {
        user:"jupeson",
        password:"12345",
        email:"guiadeparche@gmail.com",
        superAdmin:true,
      },
      {
        user:"profesorjand",
        password:"12345",
        email:"profesorjand@gmail.com",
        superAdmin:true,
      }
    ])
    // console.log({crearAdmin})
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
    //     puuid: "vUvf2p8icyGAkBigkVh8oh-CTcGnn-0521Dj66vP-hS7YXr9md2IaaoboawAIUKgmqZVsGSWToR_Bw",
    //     invocador: "inf hr jupeson",
    //     etiqueta: "lan",
    //     id: "CkOkraupZ7cDU_RSY8dUbxbN5yCYHrsKy3764dIf9a6hQ-A",
    //     region: "americas",
    //     plataforma: "la1",
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
    // console.log("creado", crear)
    
  
  } catch (e) {
    if (isDbError(e)) {
      console.log("isDbError(e)",e)
      return new Response(`err ${e}`);
    }
    console.log("e",e)
    return new Response('An unexpected error occurred', { status: 500 });
  }
	
}

await seed();