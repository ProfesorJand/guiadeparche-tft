import React from 'react';

const DynamicCarries = ({ composicionTFT, setComposicionTFT, allChampionsTFT }) => {
  const addDynamicCarry = () => {
    const newCarry = {
      rol: "Carry",
      campeon: "",
      gruposImportantes: [false],
      objetos: [
        { principal: "", opcion: "", importante: false },
        { principal: "", opcion: "", importante: false },
        { principal: "", opcion: "", importante: false },
      ]
    };
    setComposicionTFT(prev => ({
      ...prev,
      Carries: [...(prev.Carries || []), newCarry]
    }));
  };

  const updateDynamicCarry = (index, field, value) => {
    setComposicionTFT(prev => {
      const newCarries = [...(prev.Carries || [])];
      newCarries[index] = { ...newCarries[index], [field]: value };
      return { ...prev, Carries: newCarries };
    });
  };

  const updateDynamicCarryObject = (carryIndex, objIndex, field, value) => {
    setComposicionTFT(prev => {
      const newCarries = [...(prev.Carries || [])];
      const newObjetos = [...newCarries[carryIndex].objetos];
      newObjetos[objIndex] = { ...newObjetos[objIndex], [field]: value };
      newCarries[carryIndex] = { ...newCarries[carryIndex], objetos: newObjetos };
      return { ...prev, Carries: newCarries };
    });
  };

  const updateDynamicCarryGroup = (carryIndex, groupIndex, value) => {
    setComposicionTFT(prev => {
      const newCarries = [...(prev.Carries || [])];
      const newGrupos = [...(newCarries[carryIndex].gruposImportantes || [])];
      newGrupos[groupIndex] = value;
      newCarries[carryIndex] = { ...newCarries[carryIndex], gruposImportantes: newGrupos };
      return { ...prev, Carries: newCarries };
    });
  };

  const addObjectsToDynamicCarry = (index) => {
    setComposicionTFT(prev => {
      const newCarries = [...(prev.Carries || [])];
      newCarries[index] = {
        ...newCarries[index],
        gruposImportantes: [...(newCarries[index].gruposImportantes || [false]), false],
        objetos: [
          ...newCarries[index].objetos,
          { principal: "", opcion: "", importante: false },
          { principal: "", opcion: "", importante: false },
          { principal: "", opcion: "", importante: false }
        ]
      };
      return { ...prev, Carries: newCarries };
    });
  };

  const removeDynamicCarry = (index) => {
    setComposicionTFT(prev => {
      const newCarries = [...(prev.Carries || [])];
      newCarries.splice(index, 1);
      return { ...prev, Carries: newCarries };
    });
  };

  const removeObjectsFromDynamicCarry = (index) => {
    setComposicionTFT(prev => {
      const newCarries = [...(prev.Carries || [])];
      if (newCarries[index].objetos.length > 3) {
        newCarries[index] = {
          ...newCarries[index],
          gruposImportantes: newCarries[index].gruposImportantes ? newCarries[index].gruposImportantes.slice(0, -1) : [false],
          objetos: newCarries[index].objetos.slice(0, -3)
        };
      }
      return { ...prev, Carries: newCarries };
    });
  };

  return (
    <fieldset style={{ border: '2px dashed #4CAF50', padding: '15px', marginBottom: '20px' }}>
      <legend style={{ color: '#4CAF50', fontWeight: 'bold' }}>Sección Dinámica Carries/Tanques (Prueba)</legend>
      <button type="button" onClick={addDynamicCarry} style={{ marginBottom: '15px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        + Añadir Carry/Tanque
      </button>

      {composicionTFT?.Carries?.map((carry, carryIndex) => (
        <div key={carryIndex} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ margin: 0 }}>Personaje {carryIndex + 1}</h4>
            <button type="button" onClick={() => removeDynamicCarry(carryIndex)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Eliminar Personaje
            </button>
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
            <label>Rol
              <select value={carry.rol} onChange={(e) => updateDynamicCarry(carryIndex, 'rol', e.target.value)}>
                <option value="Carry">Carry</option>
                <option value="Tanque">Tanque</option>
              </select>
            </label>

            <label>Campeón
              <select value={carry.campeon} onChange={(e) => updateDynamicCarry(carryIndex, 'campeon', e.target.value)}>
                <option value="">Seleccionar Campeón</option>
                {allChampionsTFT.map((option) => (
                  <option key={option.apiName} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <strong>Objetos</strong>
            {carry.objetos.map((obj, objIndex) => (
              <div key={objIndex}>
                {objIndex > 0 && objIndex % 3 === 0 && (
                  <div style={{ marginTop: '15px', marginBottom: '10px', color: '#ff9800', fontWeight: 'bold', borderBottom: '1px solid #ff9800', paddingBottom: '4px' }}>
                    Objetos Adicionales
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    list="items" 
                    value={obj.principal} 
                    onChange={(e) => updateDynamicCarryObject(carryIndex, objIndex, 'principal', e.target.value)} 
                    placeholder={`Item ${objIndex + 1}`}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.9em', margin: 0, whiteSpace: 'nowrap' }}>
                    <input 
                      type="checkbox" 
                      checked={obj.importante || false} 
                      onChange={(e) => updateDynamicCarryObject(carryIndex, objIndex, 'importante', e.target.checked)} 
                      style={{ margin: '0 5px 0 0' }}
                    /> ¿Es Importante?
                  </label>
                  <input 
                    type="text" 
                    list="items" 
                    value={obj.opcion} 
                    onChange={(e) => updateDynamicCarryObject(carryIndex, objIndex, 'opcion', e.target.value)} 
                    placeholder={`Item ${objIndex + 1} Opcion`}
                  />
                </div>
                {(objIndex + 1) % 3 === 0 && (
                  <div style={{ marginTop: '5px', marginBottom: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.95em', fontWeight: 'bold', margin: '5px 0' }}>
                      <input 
                        type="checkbox" 
                        checked={(carry.gruposImportantes && carry.gruposImportantes[Math.floor(objIndex / 3)]) || false} 
                        onChange={(e) => updateDynamicCarryGroup(carryIndex, Math.floor(objIndex / 3), e.target.checked)} 
                        style={{ margin: '0 8px 0 0' }}
                      /> ¿Todos estos 3 Items son importantes?
                    </label>
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="button" onClick={() => addObjectsToDynamicCarry(carryIndex)} style={{ padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                + Añadir 3 Objetos Más
              </button>
              {carry.objetos.length > 3 && (
                <button type="button" onClick={() => removeObjectsFromDynamicCarry(carryIndex)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  - Eliminar 3 Últimos Objetos
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </fieldset>
  );
};

export default DynamicCarries;
