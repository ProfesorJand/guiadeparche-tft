import { atom } from 'nanostores';
import { db, Usuario, asc, desc, sql} from 'astro:db';

export const plataforma = atom("todos");
console.log(plataforma)

export const filtro = atom('puntaje');

export const orden = atom('asc');

export const $filtrado = atom({
  plataforma: 'todos',
  filtro: 'puntaje',
  orden: 'asc',
});

export const $UsuarioDB = await db.select({
  ladder: sql`(SELECT ROW_NUMBER() 
              OVER 
              (ORDER BY puntaje ASC, leaguePoints DESC) FROM Usuario) AS ladder`,
  tier: Usuario.tier,
  etiqueta: Usuario.etiqueta,
  invocador: Usuario.invocador,
  eliminado: Usuario.eliminado,
  eventoNombre: Usuario.eventoNombre,
  leaguePoints: Usuario.leaguePoints,
  profileIconId: Usuario.profileIconId,
  plataforma: Usuario.plataforma,
  puntaje: Usuario.puntaje,
  id: Usuario.id,
}).from(Usuario);

// export const $UsuarioDBOrderBy = async ({
//   filtro = 'puntaje',
//   orden = 'asc',
// }) => {
//   function opcionesOrder({ filtro = 'puntaje', orden = 'desc' }) {
//     const variables = ['asc', 'desc', 'puntaje', 'region', 'invocador'];
//     if (
//       !variables.includes(filtro?.toLowerCase()) &&
//       !variables.includes(orden?.toLowerCase())
//     ) {
//       return asc(Usuario.puntaje), desc(Usuario.leaguePoints);
//     }
//     const order = {
//       asc: {
//         puntaje: (asc(Usuario.puntaje), desc(Usuario.leaguePoints)),
//         region: asc(Usuario.region),
//         invocador: asc(Usuario.invocador),
//       },
//       desc: {
//         puntaje: desc(Usuario.puntaje),
//         region: desc(Usuario.region),
//         invocador: desc(Usuario.invocador),
//       },
//     };
//     return order[orden?.toLowerCase()][filtro];
//   }

//   return atom(
//     await db.select().from(Usuario).orderBy(opcionesOrder({ filtro, orden }))
//   );
// };
