// https://astro.build/db/seed
import { db, Usuario, eq, isDbError, Admin} from 'astro:db';

const localAdmins= [
  {
    user: "profesorjand",
    password: "2222",
    email: "profesorjand@gmail.com",
    superAdmin: true,
  },
   {
    user: "relic",
    password: "abc123",
    email: "",
    superAdmin: true,
  },
  {
    user: "jupeson",
    password: "xyz789",
    email: "",
    superAdmin: true,
  },
]

export default async function seed() {
  try {
    for (const admin of localAdmins) {
      const existe = await db.select().from(Admin).where(eq(Admin.user, admin.user));
      if (existe.length === 0) {
        await db.insert(Admin).values(admin);
        console.log(`✅ Admin insertado: ${admin.user}`);
      } else {
        console.log(`⚠️ Admin ya existe: ${admin.user}`);
      }
    }

    console.log("👀 Proceso de seed completo.");
    
  } catch (e) {
    if (isDbError(e)) {
      console.log("isDbError(e)", e);
      return new Response(`err ${e}`);
    }
    console.log("e", e);
    return new Response('An unexpected error occurred', { status: 500 });
  }
}


await seed();