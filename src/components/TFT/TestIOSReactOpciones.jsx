import React from 'react';
import { useStore } from '@nanostores/react';
import { activeCompId, toggleActiveComp } from '@stores/menuFiltradoAdmin';
import Composicion from '@components/main/Admin/Composicion.jsx';

// Opción 2: Reacciona al nanostore global, pero si no está abierto devuelve NULL. 
// Esto evita usar la clase ".hide" (display: none) que puede romper Safari en la hidratación.
export const TestIOSReactOpcion2 = ({ comp }) => {
  const openId = useStore(activeCompId);
  const isOpen = String(openId) === String(comp.id);

  if (!isOpen) return null;

  return (
    <div style={{ marginTop: '10px' }}>
      <Composicion id={comp.id} compo={comp} isOpen={true} client:only="react"/>
    </div>
  );
};

// Opción 3: Un componente padre React que dibuja tanto los botones como el contenido.
// Aquí Astro no tiene control de nada, todo es manejado por el Virtual DOM de React.
export const TestIOSReactOpcion3 = ({ comps }) => {
  const openId = useStore(activeCompId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {comps.map((comp) => {
        const isOpen = String(openId) === String(comp.id);
        
        return (
          <div key={comp.id}>
            {!isOpen ? (
              <button
                onClick={() => toggleActiveComp(String(comp.id))}
                style={{ background: '#333', padding: '1rem', borderRadius: '8px', width: '100%', textAlign: 'left', border: '1px solid #444', color: 'white', cursor: 'pointer' }}
              >
                🟡 Opción 3 (Puro React): COMP {comp.titulo} (ID: {comp.id})
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => toggleActiveComp(String(comp.id))}
                  style={{ background: '#555', padding: '0.5rem', borderRadius: '4px', color: 'white', cursor: 'pointer', textAlign: 'center', border: 'none' }}
                >
                  Cerrar Composición
                </button>
                <Composicion id={comp.id} compo={comp} isOpen={true} client:only="react"/>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
