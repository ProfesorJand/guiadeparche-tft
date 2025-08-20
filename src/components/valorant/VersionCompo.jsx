import { useStore } from '@nanostores/react';
import { ValorantConstantes } from '@stores/dataValorant';

export default function VersionCompo() {
  const constantes = useStore(ValorantConstantes);
  return (
    <span style={{display: "flex", alignItems: "center", width: "100%", justifyContent:"center", color: "#fff"}}>
      Tier List Season 2025 - Patch {constantes.versionVisualizadorMeta}
    </span>
  );
}