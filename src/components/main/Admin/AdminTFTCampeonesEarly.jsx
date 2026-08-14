import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '@nanostores/react';
import { dataTFTChampions, versionTFT, setNumberLatest, setNumberPBE, swapVersionTFT } from '@stores/dataTFT';
import { getLocalTftImage } from '@utils/images';
import style from './css/AdminTFTCampeonesEarly.module.css';

const AdminTFTCampeonesEarly = ({ onAddToComp, selectedGrupos = [], isSidebar = false }) => {
  const currentVersion = useStore(versionTFT);
  const allChampions = useStore(dataTFTChampions);
  
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const targetSet = currentVersion === "pbe" ? setNumberPBE : setNumberLatest;

  const fetchGrupos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.guiadeparche.com/tft/campeones-early.php`);
      const result = await response.json();
      if (result.status === 'success') {
        const allGrupos = result.data || [];
        setGrupos(allGrupos.filter(g => g.set_number === targetSet || g.set_number === "all"));
      }
    } catch (e) {
      console.error("Error al cargar grupos:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGrupos();
  }, [targetSet]);

  const handleCreateNew = () => {
    setEditingGrupo({
      id: crypto.randomUUID(),
      nombre: "",
      campeones: [],
      set_number: targetSet
    });
  };

  const handleEdit = (grupo) => {
    setEditingGrupo({ ...grupo });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este grupo?")) return;
    try {
      const response = await fetch(`https://api.guiadeparche.com/tft/campeones-early.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchGrupos();
        if (onGruposChanged) onGruposChanged();
      } else {
        alert(result.message);
      }
    } catch (e) {
      alert("Error al eliminar.");
    }
  };

  const handleSave = async () => {
    if (!editingGrupo.nombre.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    if (editingGrupo.campeones.length < 2 || editingGrupo.campeones.length > 5) {
      alert("Debes seleccionar entre 2 y 5 campeones.");
      return;
    }
    const campeonesOrdenados = [...editingGrupo.campeones].sort((a, b) => {
      const champA = allChampions.find(c => c.apiName === a);
      const champB = allChampions.find(c => c.apiName === b);
      const costA = champA?.cost != null ? Number(champA.cost) : 999;
      const costB = champB?.cost != null ? Number(champB.cost) : 999;
      return costA - costB;
    });

    try {
      const response = await fetch(`https://api.guiadeparche.com/tft/campeones-early.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingGrupo, campeones: campeonesOrdenados })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setEditingGrupo(null);
        fetchGrupos();
        if (onGruposChanged) onGruposChanged();
      } else {
        alert("Error al guardar: " + result.message);
      }
    } catch (e) {
      alert("Error de conexión al guardar.");
    }
  };

  const toggleChampion = (apiName) => {
    setEditingGrupo(prev => {
      let champs = prev.campeones || [];
      if (champs.includes(apiName)) {
        champs = champs.filter(c => c !== apiName);
      } else {
        if (champs.length >= 5) {
          alert("Máximo 5 campeones.");
          return prev;
        }
        champs = [...champs, apiName];
      }
      return { ...prev, campeones: champs };
    });
  };

  const filteredChampions = allChampions.filter(c => {
    if (!searchTerm) return true;
    return c.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const groupedChampions = filteredChampions.reduce((acc, c) => {
    const cost = c.cost !== undefined && c.cost !== null ? c.cost : 'extra';
    if (!acc[cost]) acc[cost] = [];
    acc[cost].push(c);
    return acc;
  }, {});

  const costsPresent = Object.keys(groupedChampions).sort((a, b) => {
    if (a === 'extra') return 1;
    if (b === 'extra') return -1;
    return Number(a) - Number(b);
  });

  return (
    <div className={style.container}>
      <div className={style.header} style={isSidebar ? { flexDirection: 'column', alignItems: 'stretch', gap: '10px' } : {}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={isSidebar ? { fontSize: '1rem', margin: 0, color: '#0af' } : {}}>Grupos Campeones Early {isSidebar ? '' : `(Set: ${targetSet})`}</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: isSidebar ? 'space-between' : 'flex-start' }}>
          {!isSidebar && (
            <>
              <button 
                className={`${style.btnSet} ${currentVersion !== 'pbe' ? style.btnSetActive : ''}`} 
                onClick={() => swapVersionTFT('latest')}>
                Set 17 (Latest)
              </button>
              <button 
                className={`${style.btnSet} ${currentVersion === 'pbe' ? style.btnSetActive : ''}`} 
                onClick={() => swapVersionTFT('pbe')}>
                Set 18 (PBE)
              </button>
            </>
          )}
          <button className={style.btnCrear} onClick={handleCreateNew} style={isSidebar ? { padding: '8px', fontSize: '0.85rem', width: '100%' } : {}}>Crear Nuevo Grupo</button>
        </div>
      </div>

      <div className={style.listado} style={isSidebar ? { padding: 0, background: 'transparent', marginTop: '10px' } : {}}>
        {loading ? <p style={isSidebar ? {fontSize: '0.8rem'} : {}}>Cargando...</p> : (
          grupos.length === 0 ? <p style={isSidebar ? {fontSize: '0.8rem'} : {}}>No hay grupos para este set.</p> : (
            <div className={style.gridGrupos} style={isSidebar ? { display: 'flex', flexDirection: 'column', gap: '10px' } : {}}>
              {grupos.map(g => (
                <div key={g.id} className={style.grupoCard} style={isSidebar ? { padding: '10px', background: '#1c1c24' } : {}}>
                  <h3 style={isSidebar ? { fontSize: '0.9rem', margin: 0, paddingBottom: '5px' } : {}}>{g.nombre}</h3>
                  <div className={style.champsList}>
                    {[...g.campeones].sort((a, b) => {
                      const champA = allChampions.find(c => c.apiName === a);
                      const champB = allChampions.find(c => c.apiName === b);
                      const costA = champA?.cost != null ? Number(champA.cost) : 999;
                      const costB = champB?.cost != null ? Number(champB.cost) : 999;
                      return costA - costB;
                    }).map(apiName => {
                      const champ = allChampions.find(c => c.apiName === apiName);
                      if (!champ) return null;
                      return (
                        <img 
                          key={apiName} 
                          src={getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', targetSet)} 
                          alt={champ.name} 
                          className={style.champIcon}
                          style={isSidebar ? { width: '30px', height: '30px' } : {}}
                          title={champ.name}
                        />
                      );
                    })}
                  </div>
                  <div className={style.grupoAcciones} style={isSidebar ? { marginTop: '5px' } : {}}>
                    {onAddToComp && (
                      <button 
                        style={{
                          background: selectedGrupos.includes(g.id) ? '#a855f7' : '#0e7213ff',
                          color: 'white',
                          border: selectedGrupos.includes(g.id) ? '1px solid #d8b4fe' : '1px solid #444',
                          padding: isSidebar ? '4px 8px' : '5px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          marginRight: isSidebar ? '0' : '10px',
                          flex: isSidebar ? '1 1 100%' : 'unset',
                          fontSize: isSidebar ? '0.8rem' : '1rem'
                        }}
                        onClick={() => onAddToComp(g.id)}
                      >
                        {selectedGrupos.includes(g.id) ? 'Quitar' : 'Añadir a la Comp'}
                      </button>
                    )}
                    <button className={style.btnEdit} onClick={() => handleEdit(g)} style={isSidebar ? { padding: '4px 8px', fontSize: '0.8rem', flex: '1' } : {}}>Editar</button>
                    <button className={style.btnDelete} onClick={() => handleDelete(g.id)} style={isSidebar ? { padding: '4px 8px', fontSize: '0.8rem', flex: '1' } : {}}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {editingGrupo && createPortal(
        <div className={style.modalOverlay} onClick={() => setEditingGrupo(null)}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            <div className={style.modalHeader}>
              <h3>{editingGrupo.id.length > 20 ? 'Editar Grupo' : 'Crear Grupo'}</h3>
              <button className={style.closeBtn} onClick={() => setEditingGrupo(null)}>&times;</button>
            </div>
            
            <div className={style.modalBody}>
              <div className={style.formGroup}>
                <label>Nombre del Grupo</label>
                <input 
                  type="text" 
                  value={editingGrupo.nombre} 
                  onChange={e => setEditingGrupo({...editingGrupo, nombre: e.target.value})}
                  className={style.textInput}
                  placeholder="Ej: Early Storyweaver"
                />
              </div>

              <div className={style.formGroupSelector}>
                <label>Seleccionar Campeones ({editingGrupo.campeones.length}/5)</label>
                <input 
                  type="text" 
                  placeholder="Buscar campeón..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className={style.textInput}
                  style={{ marginBottom: '10px' }}
                />
                <div className={style.champsSelector}>
                  {costsPresent.map(cost => (
                    <div key={cost} className={style.costSection}>
                      <h4 className={style.costTitle}>
                        {cost === 'extra' ? 'Extra (Sin coste)' : `Coste ${cost}`}
                      </h4>
                      <div className={style.costGroup}>
                        {groupedChampions[cost].map(c => {
                          const isSelected = editingGrupo.campeones.includes(c.apiName);
                          return (
                            <div 
                              key={c.apiName} 
                              className={`${style.champSelectable} ${isSelected ? style.selected : ''}`}
                              onClick={() => toggleChampion(c.apiName)}
                              title={c.name}
                            >
                              <img 
                                src={getLocalTftImage(c.img || c.tileIcon, 'champions/tileIcon', targetSet)} 
                                alt={c.name} 
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={style.modalFooter}>
              <button className={style.btnGuardar} onClick={handleSave}>Guardar Grupo</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminTFTCampeonesEarly;
