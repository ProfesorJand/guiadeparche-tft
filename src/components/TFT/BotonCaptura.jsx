import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $superAdmin, $admin } from 'src/stores/auth.js';
import { CapturarImagen } from "src/functions/CapturarImagen";

export default function BotonCaptura({ targetId, nombreCompo }) {
  const isSuperAdmin = useStore($superAdmin);
  const isAdmin = useStore($admin);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || (!isSuperAdmin && !isAdmin)) return null;

  const manejarCaptura = async () => {
    const nodo = document.getElementById(targetId);
    if (!nodo) {
        console.error("No se encontró el nodo con ID:", targetId);
        return;
    }
    const fakeRef = { current: nodo };
    await CapturarImagen({ backgroundRef: fakeRef, nombre: nombreCompo });
  };

  return (
    <button 
      onClick={manejarCaptura} 
      className="hideForCapture"
      style={{
        position: 'absolute',
        top: '-10px',
        right: '10px',
        zIndex: 100,
        padding: '5px 10px',
        background: '#ff4b4b',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      📸 Capturar
    </button>
  );
}
