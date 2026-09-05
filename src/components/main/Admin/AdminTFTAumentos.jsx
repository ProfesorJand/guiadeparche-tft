import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '@nanostores/react';
import { dataTFTAllAugments, dataDBTFTAumentos, versionTFT, setNumberLatest, setNumberPBE, swapVersionTFT } from '@stores/dataTFT';
import ImgAugment from '@components/TFT/ImgAugment';
import TooltipAugment from '@components/tooltips/augment';
import style from './css/AdminTFTAumentos.module.css';

const CATEGORIAS_GRANDES = [
  "Combate", "Economia", "Item", "Otros", "Heroe", "Especificos", "Resultado_Aleatorio"
];

const CATEGORIAS_PEQUENAS = [
  "Lose_Streak", "Win_Streak", "Experiencia", "Reroll", "Fast_9", "Emblema", 
  "Artefactos", "AP", "AD", "Sinergia", "Escalado", "Loot", "Otros"
];

const CATEGORIAS_TIERS = ["Plata", "Oro", "Prismatico"];

const CATEGORIAS_ETAPAS = ["2-1", "3-2", "4-2"];

const AdminTFTAumentos = () => {
  const rawAllAugments = useStore(dataTFTAllAugments);
  const dbAumentos = useStore(dataDBTFTAumentos);
  const currentVersion = useStore(versionTFT);
  
  const [localAumentos, setLocalAumentos] = useState({});
  const [selectedAugment, setSelectedAugment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const baseAugments = currentVersion === "pbe" 
    ? rawAllAugments.filter(a => a.apiName && a.apiName.includes("DA_"))
    : rawAllAugments;

  const filteredAugments = baseAugments.filter(a => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const name = a.name?.toLowerCase() || "";
    const nameEN = a.name_EN?.toLowerCase() || "";
    const desc = (a.desc || a.desc_item || "").toLowerCase();
    const apiName = a.apiName?.toLowerCase() || "";
    return name.includes(term) || nameEN.includes(term) || desc.includes(term) || apiName.includes(term);
  });
  
  // localState to hold current edits before saving.
  // Shape: { "apiName": { Combate: 1, AP: 0, ... } }

  // Default to PBE (Set 18) only while latest is still Set 17. 
  // Once latest updates to 18 on the 28th, it will default to latest.
  useEffect(() => {
    if (setNumberLatest === "17") {
      swapVersionTFT("pbe");
    } else {
      swapVersionTFT("latest");
    }
  }, []);

  // Initialize localAumentos from the database
  useEffect(() => {
    if (dbAumentos && Object.keys(dbAumentos).length > 0) {
      setLocalAumentos(dbAumentos);
    }
  }, [dbAumentos]);

  // Func to determine if an augment has a Categoria Grande assigned
  const getCategoriaGrande = (apiName) => {
    const data = localAumentos[apiName];
    if (!data) return null;
    return data.categoria_grande || null;
  };

  // Func to determine if an augment is missing any required category (for 'Sin Categorizar' list)
  const isMissingAnyCategory = (apiName) => {
    const data = localAumentos[apiName];
    if (!data) return true;
    if (!data.categoria_grande) return true;
    if (!data.categoria_tier) return true;
    if (!data.categoria_pequeno || data.categoria_pequeno.length === 0) return true;
    return false;
  };

  // Func to determine if it has at least 1 category but is missing others (for red border)
  const hasPartialCategories = (apiName) => {
    const data = localAumentos[apiName];
    if (!data) return false;
    
    const hasGrande = !!data.categoria_grande;
    const hasTier = !!data.categoria_tier;
    const hasPequeno = data.categoria_pequeno && data.categoria_pequeno.length > 0;
    
    const count = [hasGrande, hasTier, hasPequeno].filter(Boolean).length;
    return count > 0 && count < 3;
  };

  const handleSave = async () => {
    try {
      const version = versionTFT.get();
      let targetSet = setNumberLatest;
      if (version === "pbe") {
        targetSet = setNumberPBE;
      } else if (version === "latest") {
        targetSet = setNumberLatest;
      } else if (!isNaN(version)) {
        targetSet = String(version);
      }
      
      const response = await fetch(`https://api.guiadeparche.com/tft/save-aumentos-categorias.php?set=${targetSet}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localAumentos)
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert("¡Guardado correctamente!");
      } else {
        alert("Error al guardar: " + result.message);
      }
    } catch (e) {
      alert("Error de conexión al guardar.");
    }
  };

  const openModal = (augment) => {
    setSelectedAugment(augment);
    if (!localAumentos[augment.apiName]) {
      setLocalAumentos(prev => ({ ...prev, [augment.apiName]: {} }));
    }
  };

  const updateCategoriaGrande = (apiName, catGrande) => {
    setLocalAumentos(prev => {
      const current = prev[apiName] || {};
      return { ...prev, [apiName]: { ...current, categoria_grande: catGrande } };
    });
  };

  const updateCategoriaTier = (apiName, tier) => {
    setLocalAumentos(prev => {
      const current = prev[apiName] || {};
      return { ...prev, [apiName]: { ...current, categoria_tier: tier } };
    });
  };

  const toggleCategoriaPequena = (apiName, catPequena) => {
    setLocalAumentos(prev => {
      const current = prev[apiName] || {};
      let smallCats = current.categoria_pequeno || [];
      if (smallCats.includes(catPequena)) {
        smallCats = smallCats.filter(c => c !== catPequena);
      } else {
        smallCats = [...smallCats, catPequena];
      }
      return { ...prev, [apiName]: { ...current, categoria_pequeno: smallCats } };
    });
  };

  const toggleCategoriaEtapa = (apiName, etapa) => {
    setLocalAumentos(prev => {
      const current = prev[apiName] || {};
      let etapas = current.categoria_etapa || [];
      if (etapas.includes(etapa)) {
        etapas = etapas.filter(e => e !== etapa);
      } else {
        etapas = [...etapas, etapa];
      }
      return { ...prev, [apiName]: { ...current, categoria_etapa: etapas } };
    });
  };

  const uncategorized = filteredAugments.filter(a => isMissingAnyCategory(a.apiName));

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Info Aumentos (Set: {currentVersion})</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Buscar aumento..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={style.searchInput}
          />
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
          <button className={style.btnGuardar} onClick={handleSave}>Guardar Cambios</button>
        </div>
      </div>

      <div className={style.section}>
        <h2>Sin Categorizar ({uncategorized.length})</h2>
        <div className={`${style.aumentosContainer} ${style.scrollableContainer}`}>
          {uncategorized.map(aug => (
            <div key={aug.apiName} className={`${style.augmentItem} ${hasPartialCategories(aug.apiName) ? style.incomplete : ''}`} onClick={() => openModal(aug)}>
              <ImgAugment augment={aug} width={40} height={40} />
            </div>
          ))}
        </div>
      </div>

      <div className={style.section}>
        <h2>Categorías Grandes</h2>
        <div className={style.gridGrandes}>
          {CATEGORIAS_GRANDES.map(cat => {
            const categorizedAugs = filteredAugments.filter(a => getCategoriaGrande(a.apiName) === cat);
            return (
              <div key={cat} className={style.categoriaCard}>
                <div className={style.categoriaTitle}>{cat} ({categorizedAugs.length})</div>
                <div className={style.aumentosContainer}>
                  {categorizedAugs.map(aug => (
                    <div key={aug.apiName} className={`${style.augmentItem} ${hasPartialCategories(aug.apiName) ? style.incomplete : ''}`} onClick={() => openModal(aug)}>
                      <ImgAugment augment={aug} width={40} height={40} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.section}>
        <h2>Categorías Pequeñas</h2>
        <div className={style.gridGrandes}>
          {CATEGORIAS_PEQUENAS.map(cat => {
            const categorizedAugs = filteredAugments.filter(a => {
              const smallCats = localAumentos[a.apiName]?.categoria_pequeno || [];
              return smallCats.includes(cat);
            });
            return (
              <div key={cat} className={style.categoriaCard}>
                <div className={style.categoriaTitle}>{cat} ({categorizedAugs.length})</div>
                <div className={style.aumentosContainer}>
                  {categorizedAugs.map(aug => (
                    <div key={aug.apiName} className={`${style.augmentItem} ${hasPartialCategories(aug.apiName) ? style.incomplete : ''}`} onClick={() => openModal(aug)}>
                      <ImgAugment augment={aug} width={40} height={40} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.section}>
        <h2>Categorías Tier</h2>
        <div className={style.gridGrandes}>
          {CATEGORIAS_TIERS.map(tier => {
            const categorizedAugs = filteredAugments.filter(a => localAumentos[a.apiName]?.categoria_tier === tier);
            return (
              <div key={tier} className={style.categoriaCard}>
                <div className={style.categoriaTitle}>{tier} ({categorizedAugs.length})</div>
                <div className={style.aumentosContainer}>
                  {categorizedAugs.map(aug => (
                    <div key={aug.apiName} className={`${style.augmentItem} ${hasPartialCategories(aug.apiName) ? style.incomplete : ''}`} onClick={() => openModal(aug)}>
                      <ImgAugment augment={aug} width={40} height={40} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.section}>
        <h2>Categorías de Etapa</h2>
        <div className={style.gridGrandes}>
          {CATEGORIAS_ETAPAS.map(etapa => {
            const categorizedAugs = filteredAugments.filter(a => {
              const etapas = localAumentos[a.apiName]?.categoria_etapa || [];
              return etapas.includes(etapa);
            });
            return (
              <div key={etapa} className={style.categoriaCard}>
                <div className={style.categoriaTitle}>{etapa} ({categorizedAugs.length})</div>
                <div className={style.aumentosContainer}>
                  {categorizedAugs.map(aug => (
                    <div key={aug.apiName} className={`${style.augmentItem} ${hasPartialCategories(aug.apiName) ? style.incomplete : ''}`} onClick={() => openModal(aug)}>
                      <ImgAugment augment={aug} width={40} height={40} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedAugment && createPortal(
        <div className={style.modalOverlay} onClick={() => setSelectedAugment(null)}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            <div className={style.modalHeader} style={{ justifyContent: 'flex-end', borderBottom: 'none', paddingBottom: '0', marginBottom: '0' }}>
              <button className={style.closeBtn} onClick={() => setSelectedAugment(null)}>X</button>
            </div>
            
            <div className={style.modalBody}>
              <div style={{ marginBottom: '20px' }}>
                <TooltipAugment augment={selectedAugment} />
              </div>
              
              <h4>Categoría Grande (Solo 1)</h4>
              <div className={style.radioGroup}>
                {CATEGORIAS_GRANDES.map(cat => (
                  <label key={cat} className={style.radioLabel}>
                    <input 
                      type="radio" 
                      name="catGrande" 
                      checked={getCategoriaGrande(selectedAugment.apiName) === cat}
                      onChange={() => updateCategoriaGrande(selectedAugment.apiName, cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>

              <h4>Categoría Tier (Solo 1)</h4>
              <div className={style.radioGroup}>
                {CATEGORIAS_TIERS.map(tier => (
                  <label key={tier} className={style.radioLabel}>
                    <input 
                      type="radio" 
                      name="catTier" 
                      checked={localAumentos[selectedAugment.apiName]?.categoria_tier === tier}
                      onChange={() => updateCategoriaTier(selectedAugment.apiName, tier)}
                    />
                    {tier}
                  </label>
                ))}
              </div>

              <h4>Categorías Pequeñas (Múltiples)</h4>
              <div className={style.checkboxGroup}>
                {CATEGORIAS_PEQUENAS.map(cat => (
                  <label key={cat} className={style.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={localAumentos[selectedAugment.apiName]?.categoria_pequeno?.includes(cat)}
                      onChange={() => toggleCategoriaPequena(selectedAugment.apiName, cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>

              <h4>Categorías de Etapa (Múltiples)</h4>
              <div className={style.checkboxGroup}>
                {CATEGORIAS_ETAPAS.map(etapa => (
                  <label key={etapa} className={style.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={localAumentos[selectedAugment.apiName]?.categoria_etapa?.includes(etapa)}
                      onChange={() => toggleCategoriaEtapa(selectedAugment.apiName, etapa)}
                    />
                    {etapa}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminTFTAumentos;
