import React, { useEffect } from 'react';

const DynamicCarrusel = ({ composicionTFT, setComposicionTFT, allChampionsTFT, allItemsTFT }) => {
  const addCarruselRow = () => {
    const newRow = {
      grandeType: "items",
      grandeValue: "",
      pequenoType: "items",
      pequenoValue: ""
    };
    setComposicionTFT(prev => ({
      ...prev,
      Carruseles: [...(prev.Carruseles || []), newRow]
    }));
  };

  const removeCarruselRow = (rowIndex) => {
    setComposicionTFT(prev => {
      const newCarruseles = [...(prev.Carruseles || [])];
      newCarruseles.splice(rowIndex, 1);
      return { ...prev, Carruseles: newCarruseles };
    });
  };

  const updateCarrusel = (rowIndex, field, value) => {
    setComposicionTFT(prev => {
      const newCarruseles = [...(prev.Carruseles || [])];
      
      let finalValue = value;
      // Si el campo es el Value, buscar el objeto completo
      if (field === 'grandeValue') {
        const isChamp = newCarruseles[rowIndex].grandeType === "campeones";
        finalValue = isChamp ? (allChampionsTFT.find(opt => opt.name === value) || value) : (allItemsTFT.find(opt => opt.name === value) || value);
      } else if (field === 'pequenoValue') {
        const isChamp = newCarruseles[rowIndex].pequenoType === "campeones";
        finalValue = isChamp ? (allChampionsTFT.find(opt => opt.name === value) || value) : (allItemsTFT.find(opt => opt.name === value) || value);
      } else if (field === 'grandeType') {
        // Reset the value when changing the type
        newCarruseles[rowIndex].grandeValue = "";
      } else if (field === 'pequenoType') {
        newCarruseles[rowIndex].pequenoValue = "";
      }

      newCarruseles[rowIndex] = { ...newCarruseles[rowIndex], [field]: finalValue };
      return { ...prev, Carruseles: newCarruseles };
    });
  };

  // Aseguramos que haya al menos una fila si está vacío
  useEffect(() => {
    if (!composicionTFT.Carruseles || composicionTFT.Carruseles.length === 0) {
      addCarruselRow();
    }
  }, []);

  return (
    <fieldset style={{ border: '2px dashed #ff9800', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
      <legend style={{ color: '#ff9800', fontWeight: 'bold', padding: '0 10px' }}>Items de Carrusel (Dinámico)</legend>
      <button type="button" onClick={addCarruselRow} style={{ marginBottom: '15px', padding: '8px 12px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        + Añadir Fila de Carrusel
      </button>

      {composicionTFT?.Carruseles?.map((row, rowIndex) => (
        <div key={rowIndex} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, color: '#333' }}>Opción #{rowIndex + 1}</h4>
            {composicionTFT.Carruseles.length > 1 && (
              <button type="button" onClick={() => removeCarruselRow(rowIndex)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Eliminar
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* GRANDE */}
            <div style={{ flex: 1, minWidth: '250px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
              <strong>Carrusel Grande</strong>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select 
                  value={row.grandeType || "items"} 
                  onChange={(e) => updateCarrusel(rowIndex, 'grandeType', e.target.value)}
                  style={{ padding: '5px' }}
                >
                  <option value="items">Items</option>
                  <option value="campeones">Campeones</option>
                  <option value="aumentos">Aumentos</option>
                </select>

                <input 
                  type="text" 
                  list={
                    row.grandeType === "campeones" ? "listaCampeones" : 
                    row.grandeType === "aumentos" ? "listaAumentos" : "listaItemsSeparados"
                  } 
                  value={row.grandeValue?.name || row.grandeValue || ""} 
                  onChange={(e) => updateCarrusel(rowIndex, 'grandeValue', e.target.value)} 
                  placeholder={`Escribe o selecciona...`}
                  style={{ padding: '5px', flex: 1, width: '100%' }}
                />
              </div>
            </div>

            {/* PEQUEÑO */}
            <div style={{ flex: 1, minWidth: '250px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
              <strong>Carrusel Pequeño</strong>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select 
                  value={row.pequenoType || "items"} 
                  onChange={(e) => updateCarrusel(rowIndex, 'pequenoType', e.target.value)}
                  style={{ padding: '5px' }}
                >
                  <option value="items">Items</option>
                  <option value="campeones">Campeones</option>
                  <option value="aumentos">Aumentos</option>
                </select>

                <input 
                  type="text" 
                  list={
                    row.pequenoType === "campeones" ? "listaCampeones" : 
                    row.pequenoType === "aumentos" ? "listaAumentos" : "listaItemsSeparados"
                  } 
                  value={row.pequenoValue?.name || row.pequenoValue || ""} 
                  onChange={(e) => updateCarrusel(rowIndex, 'pequenoValue', e.target.value)} 
                  placeholder={`Escribe o selecciona...`}
                  style={{ padding: '5px', flex: 1, width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Datalists Independientes */}
      <datalist id="listaCampeones">
        {allChampionsTFT?.map((option) => (
          <option key={`champ-${option.apiName}`} value={option.name} data-value={JSON.stringify(option)}>
            {option.name}
          </option>
        ))}
      </datalist>
      <datalist id="listaAumentos">
        {allItemsTFT?.filter(opt => opt.apiName.toLowerCase().includes("augment")).map((option) => (
          <option key={`aum-${option.apiName}`} value={option.name} data-value={JSON.stringify(option)}>
            {option.apiName}
          </option>
        ))}
      </datalist>
      <datalist id="listaItemsSeparados">
        {allItemsTFT?.filter(opt => !opt.apiName.toLowerCase().includes("augment")).map((option) => (
          <option key={`item-${option.apiName}`} value={option.name} data-value={JSON.stringify(option)}>
            {option.apiName}
          </option>
        ))}
      </datalist>
    </fieldset>
  );
};

export default DynamicCarrusel;
