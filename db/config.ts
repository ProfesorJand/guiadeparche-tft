import { defineDb, defineTable, column } from 'astro:db';

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
    leaguePoints: column.number(),
    puntaje: column.number(),
    eventoId: column.number({optional:true}),
    eventoNombre: column.text({optional:true}),
    eliminado: column.boolean({optional:true})
  },
  indexes: [
    { on: ["invocador", "etiqueta"], unique: true },
  ]
  // foreignKeys: [
  //   {
  //     columns: ["eventoId", "eventoNombre"],
  //     references: () => [Evento.columns.id, Evento.columns.nombre],
  //   },
  // ],
});

// https://astro.build/db/config
export default defineDb({
  tables: {Usuario, Evento}
});
