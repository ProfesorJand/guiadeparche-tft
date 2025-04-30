// VersionCliente.jsx
import { MetaCompVersion } from '@stores/menuFiltradoAdmin';
import Style from "./css/VersionCompo.module.css"

export default function VersionCliente() {
  const version = MetaCompVersion.get(); // o .value si es signal
  return <span className={Style.minititulo}>Tier List Set 14 / Version {version}</span>;
}
