// db/showAdmins.ts
import { db, Admin } from "astro:db";

export default async function showAdmins() {
  const admins = await db.select().from(Admin);
  console.log("👀 Admins en la base local:", admins);
}

await showAdmins();