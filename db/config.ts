import { defineDb, defineTable, column } from 'astro:db';

const Meta = defineTable({
  columns:{
    tier: column.text(),
    titulo: column.text(),
    imgTitulo: column.text(),
    composicion: column.text(),
    sinergias: column.text(),
    pestañas: column.json()
  }
})

const Evento = defineTable({
columns:{
  id: column.number({ primaryKey: true }),
  nombre:column.text()
}

}); 

const Usuario = defineTable({
  columns: {
    puuid: column.text({ primaryKey: true }),
    invocador: column.text(),
    etiqueta: column.text(),
    id: column.text(),
    region: column.text(),
    plataforma: column.text(),
    profileIconId: column.number(),
    tier: column.text(),
    rank: column.text(),
    leaguePoints: column.number(),
    puntaje: column.number({optional:true}),
    eventoId: column.number({optional:true}),
    eventoNombre: column.text({optional:true}),
    eliminado: column.boolean({optional:true})
  },
  indexes: [
    { on: ["invocador", "etiqueta"], unique: true },
  ],
  // foreignKeys: [
  //   {
  //     columns: ["eventoId", "eventoNombre"],
  //     references: () => [Evento.columns.id, Evento.columns.nombre],
  //   },
  // ],
});

const Admin = defineTable({
  columns:{
    user:column.text({ primaryKey: true }),
    password: column.text(),
    email: column.text(),
    superAdmin: column.boolean({default:false})
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {Usuario, Evento, Meta, Admin}
});
