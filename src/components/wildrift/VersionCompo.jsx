import { useStore } from '@nanostores/react';
import { WildriftConstantes } from '@stores/dataWildrift';

export default function VersionCompo() {
  const constantes = useStore(WildriftConstantes);
  return (
    <span style={{display: "flex", alignItems: "center", width: "100%", justifyContent:"center", color: "#fff"}}>
      Best Meta Champs Patch {constantes.versionVisualizadorMeta}
    </span>
  );
}