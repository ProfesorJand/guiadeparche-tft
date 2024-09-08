import { $UsuarioDB, plataforma, orden } from "../../store.js";
import styles from "./style.module.css";
import { useStore } from "@nanostores/react";

export default function Resultados(){
    const $plataforma = useStore(plataforma);
    const $orden = useStore(orden);

const filtroResultados = $UsuarioDB.sort((a,b)=>b.leaguePoints - a.leaguePoints).sort((a,b)=>a.puntaje - b.puntaje);

    const URL = {
        profileIcon:
          'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/',
        tierIcon:
          'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/',
        miniTierIcon:
          'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/',
      };
    const PLATAFORMAS = {
        la1: 'LAN',
        la2: 'LAS',
        euw1: 'EUW',
        br1: 'BR',
        eun1: 'EUN',
        jp1: 'JP',
        kr: 'KR',
        na1: 'NA',
        oc1: 'OC',
        tr1: 'TR',
        ru: 'RU',
        ph2: 'PH',
        sg2: 'SG',
        th2: 'TH',
        tw2: 'TW',
        vn2: 'VN',
      };

    return (
    <table id="tablaResultados">
        <thead>
            <tr>
            <th>#LADDER</th>
            <th class={styles.icono}>ICONO</th>
            <th class={styles.tablaInvocador}>INVOCADOR</th>
            <th>REGION</th>
            <th>TIER</th>
            <th>PUNTOS</th>
            </tr>
        </thead>
        <tbody>
            {
            filtroResultados.map(
                ({
                tier,
                etiqueta,
                eventoNombre,
                invocador,
                eliminado,
                leaguePoints,
                profileIconId,
                plataforma,
                puntaje,
                ladder,
                id
                }, index) => {
                return (
                    <tr class={$plataforma !== "todos" && $plataforma !== plataforma  && styles.filtroPlataforma } key={id}>
                    <td>{index + 1} </td>
                    <td class={styles.icono}>
                        <img
                        src={URL.profileIcon + profileIconId + '.jpg'}
                        alt={'RIOT profile icon'}
                        height="50"
                        width="50"
                        loading="lazy"
                        />
                    </td>
                    <td>{invocador + '#' + etiqueta}</td>
                    <td>{PLATAFORMAS[plataforma]}</td>
                    <td>
                        <img
                        src={URL.tierIcon + tier.toLowerCase() + '.png'}
                        alt={'RIOT tier icon'}
                        height="50"
                        width="50"
                        loading="lazy"
                        />
                    </td>
                    <td>{leaguePoints}</td>
                    </tr>
                );
                }
            )
            }
        </tbody>
    </table>
    )
}

