import { useState } from 'react';

export default function TestIOSReact() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={{ marginTop: '3rem', padding: '1.5rem', border: '2px dashed #6672b1', borderRadius: '8px', background: '#1a1a2e' }}>
      <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Test 5: Componente React</h2>
      <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
        Este bloque usa React, igual que tu componente de las composiciones. Aquí probaremos si el problema es cómo React maneja los clics en iOS.
      </p>
      
      {/* Sin cursor pointer */}
      <div style={{ marginBottom: '1rem' }}>
        <div 
          onClick={() => toggle(1)} 
          style={{ background: '#333', padding: '1rem', borderRadius: '4px', color: '#fff', border: '1px solid #444' }}
        >
          🔴 Prueba 1: div (SIN cursor: pointer)
        </div>
        {openId === 1 && (
          <div style={{ background: '#222', padding: '1rem', marginTop: '5px', color: '#a8b2d1', borderLeft: '4px solid #f1fa8c' }}>
            ✅ ¡Funciona! React detectó el clic. (A veces esto falla en iOS).
          </div>
        )}
      </div>

      {/* Con cursor pointer */}
      <div style={{ marginBottom: '1rem' }}>
        <div 
          onClick={() => toggle(2)} 
          style={{ background: '#333', padding: '1rem', borderRadius: '4px', cursor: 'pointer', color: '#fff', border: '1px solid #444' }}
        >
          🟢 Prueba 2: div (CON cursor: pointer)
        </div>
        {openId === 2 && (
          <div style={{ background: '#222', padding: '1rem', marginTop: '5px', color: '#a8b2d1', borderLeft: '4px solid #50fa7b' }}>
            ✅ ¡Funciona! El cursor:pointer hace que iOS reconozca el div como clickeable.
          </div>
        )}
      </div>

      {/* Botón nativo */}
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => toggle(3)} 
          style={{ background: '#333', padding: '1rem', borderRadius: '4px', cursor: 'pointer', width: '100%', textAlign: 'left', border: '1px solid #444', color: 'white', fontSize: '1rem', fontFamily: 'inherit' }}
        >
          🔵 Prueba 3: Elemento button (Nativo)
        </button>
        {openId === 3 && (
          <div style={{ background: '#222', padding: '1rem', marginTop: '5px', color: '#a8b2d1', borderLeft: '4px solid #8be9fd' }}>
            ✅ ¡Funciona! Los botones son 100% seguros en iOS.
          </div>
        )}
      </div>

      {/* Simular Scroll + Toggle (Lo que pasa al clickear la Tierlist) */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #444' }}>
        <h3 style={{ color: '#fff' }}>Test 6: Clic en Tierlist (Scroll + Abrir Compo)</h3>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>
          Este botón simula hacer clic en la Tierlist arriba: hará scroll hacia la composición de abajo y la abrirá.
        </p>
        <button 
          onClick={() => {
            setOpenId('compo_test');
            const el = document.getElementById('simulated_compo');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          style={{ padding: '0.8rem 1.5rem', cursor: 'pointer', background: '#bd93f9', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px' }}
        >
          👉 Ir a la Composición Simulada
        </button>
      </div>

      <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', borderLeft: '2px dashed #444', marginLeft: '1rem' }}>
        (Scroll de prueba...)
      </div>

      <div id="simulated_compo" style={{ padding: '1rem', background: '#282a36', borderRadius: '8px', border: '1px solid #444' }}>
        <div 
          onClick={() => toggle('compo_test')}
          style={{ background: '#444', padding: '1rem', cursor: 'pointer', color: '#fff', borderRadius: '4px' }}
        >
          🔽 Composición Simulada (Clic para alternar)
        </div>
        {openId === 'compo_test' && (
          <div style={{ background: '#191a21', padding: '2rem', marginTop: '0.5rem', color: '#50fa7b', borderRadius: '4px' }}>
            ✅ ¡Composición Abierta!
            <p style={{ color: '#ccc', marginTop: '1rem' }}>Si esto se abrió al hacer clic en el botón de arriba después de scrollear, la lógica en sí funciona. El problema podría ser interferencia de otros eventos.</p>
          </div>
        )}
      </div>

    </div>
  );
}
