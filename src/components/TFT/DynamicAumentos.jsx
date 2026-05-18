import React from 'react';

const DynamicAumentos = ({ composicionTFT, setComposicionTFT }) => {
  const addAumentosRow = () => {
    const newRow = {
      aumentos: [ { nombre: "" } ]
    };
    setComposicionTFT(prev => ({
      ...prev,
      Aumentos: [...(prev.Aumentos || []), newRow]
    }));
  };

  const removeAumentosRow = (rowIndex) => {
    setComposicionTFT(prev => {
      const newAumentos = [...(prev.Aumentos || [])];
      newAumentos.splice(rowIndex, 1);
      return { ...prev, Aumentos: newAumentos };
    });
  };

  const addAumentoToRow = (rowIndex) => {
    setComposicionTFT(prev => {
      const newAumentos = [...(prev.Aumentos || [])];
      newAumentos[rowIndex] = {
        ...newAumentos[rowIndex],
        aumentos: [...newAumentos[rowIndex].aumentos, { nombre: "" }]
      };
      return { ...prev, Aumentos: newAumentos };
    });
  };

  const removeAumentoFromRow = (rowIndex, aumIndex) => {
    setComposicionTFT(prev => {
      const newAumentos = [...(prev.Aumentos || [])];
      const row = newAumentos[rowIndex];
      const newRowAumentos = [...row.aumentos];
      newRowAumentos.splice(aumIndex, 1);
      newAumentos[rowIndex] = { ...row, aumentos: newRowAumentos };
      return { ...prev, Aumentos: newAumentos };
    });
  };

  const updateAumento = (rowIndex, aumIndex, value) => {
    setComposicionTFT(prev => {
      const newAumentos = [...(prev.Aumentos || [])];
      const row = newAumentos[rowIndex];
      const newRowAumentos = [...row.aumentos];
      newRowAumentos[aumIndex] = { ...newRowAumentos[aumIndex], nombre: value };
      newAumentos[rowIndex] = { ...row, aumentos: newRowAumentos };
      return { ...prev, Aumentos: newAumentos };
    });
  };

  return (
    <fieldset style={{ border: '2px dashed #9c27b0', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
      <legend style={{ color: '#9c27b0', fontWeight: 'bold', padding: '0 10px' }}>Sección Dinámica Aumentos (Prueba)</legend>
      <button type="button" onClick={addAumentosRow} style={{ marginBottom: '15px', padding: '8px 12px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        + Añadir Fila de Aumentos
      </button>

      {composicionTFT?.Aumentos?.map((row, rowIndex) => (
        <div key={rowIndex} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4 style={{ margin: 0, color: '#333' }}>Fila {rowIndex + 1}</h4>
            <button type="button" onClick={() => removeAumentosRow(rowIndex)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Eliminar Fila
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            {row.aumentos.map((aum, aumIndex) => (
              <div key={aumIndex} style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'white', padding: '5px 10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9em', color: '#666' }}>#{aumIndex + 1}</span>
                <input 
                  type="text" 
                  list="aumentos" 
                  value={aum.nombre} 
                  onChange={(e) => updateAumento(rowIndex, aumIndex, e.target.value)} 
                  placeholder="Nombre del Aumento"
                  style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '4px', outline: 'none' }}
                />
                {row.aumentos.length > 1 && (
                  <button type="button" onClick={() => removeAumentoFromRow(rowIndex, aumIndex)} style={{ padding: '2px 6px', backgroundColor: '#e0e0e0', color: '#333', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.8em', marginLeft: '5px' }}>
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addAumentoToRow(rowIndex)} style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              + Añadir Aumento a la Fila
            </button>
          </div>
        </div>
      ))}
    </fieldset>
  );
};

export default DynamicAumentos;
