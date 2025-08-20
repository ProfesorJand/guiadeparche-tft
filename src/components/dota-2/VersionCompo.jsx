import { useStore } from '@nanostores/react';
import { Dota2Constantes } from '@stores/dataDota2';

export default function VersionCompo() {
  const constantes = useStore(Dota2Constantes);
  return (
    <span style={{display: "flex", alignItems: "center", width: "100%", justifyContent:"center", color: "#fff"}}>
      Best Meta Heroes Patch {constantes.versionVisualizadorMeta}
    </span>
  );
}