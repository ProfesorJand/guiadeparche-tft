import { useStore } from '@nanostores/react';
import { LeagueOfLegendsConstantes } from '@stores/dataLeagueOfLegends';

export default function VersionCompo() {
  const constantes = useStore(LeagueOfLegendsConstantes);

  return (
    <span style={{display: "flex", alignItems: "center", width: "100%", justifyContent:"center", color: "#fff"}}>
      Best Meta Champs Patch {constantes.versionVisualizadorMeta}
    </span>
  );
}