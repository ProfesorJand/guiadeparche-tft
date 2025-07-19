// VersionCompo.jsx
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { versionTFT, constantesJSON, setNumberLatest, setNumberPBE } from '@stores/dataTFT';
import Style from './css/VersionCompo.module.css';

export default function VersionCompo() {
  const version = useStore(versionTFT);
  const [constantes, setConstantes] = useState(null);

  useEffect(() => {
    const getConstantes = async () => {
      const resp = await fetch(constantesJSON, {cache:"reload"});
      const data = await resp.json();
      console.log({constantes:data})
      setConstantes(data);
    };
    getConstantes();
  }, []);

  if (!constantes) return null; // o un loader

  return (
    <span className={Style.minititulo}>
      Tier List Set {version === "pbe" ? setNumberPBE : setNumberLatest} / Version {version === "pbe" ? constantes.MetaCompVersionPBE : constantes.MetaCompVersion}
    </span>
  );
}