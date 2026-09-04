import React from 'react';
import { getLocalTftImage } from '@utils/images';

export default function ObjetosCrafteables({ 
  condicionesGrandeItems, 
  filteredComposPrimary,
  selectedSalidasEarlyItems, 
  allItems, 
  softItemsList,
  toggleArrayFilter, 
  setSelectedSalidasEarlyItems, 
  versionNumber,
  style 
}) {
  // Extraer todos los items únicos de condicionesGrandeItems y de todos los itemsPrio
  const uniqueItemsMap = new Map();
  
  const normalizeItem = (name) => name?.replace('DA_Component_', '')?.replace('DA_', '')?.replace('TFT_Item_', '');
  const formatIcon = (iconPath) => {
    if (!iconPath) return null;
    if (iconPath.includes('http')) return iconPath.replace('.tex', '.png').toLowerCase();
    return getLocalTftImage(iconPath, 'items', versionNumber);
  };

  (condicionesGrandeItems || []).forEach(condItem => {
    if (condItem && condItem.apiName) {
      const norm = normalizeItem(condItem.apiName);
      if (norm) uniqueItemsMap.set(norm, condItem);
    }
  });

  (filteredComposPrimary || []).forEach(comp => {
    if (comp.itemsPrio && Array.isArray(comp.itemsPrio)) {
      comp.itemsPrio.forEach(item => {
        const rawApiName = typeof item === 'object' && item !== null ? item.apiName : item;
        if (rawApiName) {
          const norm = normalizeItem(rawApiName);
          if (norm && !uniqueItemsMap.has(norm)) {
            const dbItem = allItems.find(i => normalizeItem(i.apiName) === norm);
            if (dbItem) {
              uniqueItemsMap.set(norm, {
                apiName: dbItem.apiName,
                name: dbItem.name,
                icon: formatIcon(dbItem.icon || dbItem.img)
              });
            }
          }
        }
      });
    }
  });

  const allRelevantItems = Array.from(uniqueItemsMap.values());

  if (allRelevantItems.length === 0) {
    return null;
  }

  // Filtrar solo crafteables que requieren componentes idénticos (ej. 2 espadones)
  const identicalComponentItems = allRelevantItems.filter(condItem => {
    const apiName = condItem.apiName;
    const dbItem = allItems.find(i => i.apiName === apiName);
    if (!dbItem) return false;

    const isEmblem = apiName.includes("Emblem") || dbItem?.name?.toLowerCase().includes("emblem") || dbItem?.name?.toLowerCase().includes("emblema");
    const isCraftable = dbItem?.composition && Array.isArray(dbItem.composition) && dbItem.composition.length > 0 && !isEmblem;
    
    if (!isCraftable) return false;

    // Verificar si los dos componentes son idénticos
    return dbItem.composition.length === 2 && dbItem.composition[0] === dbItem.composition[1];
  });

  if (identicalComponentItems.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <legend style={{ fontSize: '0.75rem' }}>Objetos Crafteables (Dobles)</legend>
        <div className={style.filterButtonsContainerRow}>
          {identicalComponentItems.map(item => {
            const isSelected = selectedSalidasEarlyItems.some(i => i.apiName === item.apiName);
            const fullItem = allItems.find(i => i.apiName === item.apiName) || item;
            
            return (
              <button
                key={item.apiName}
                type="button"
                title={item.name}
                className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
                onClick={() => toggleArrayFilter(setSelectedSalidasEarlyItems, item)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px', gap: '4px' }}
              >
                {item.icon && (
                  <div className={style.spinningHighlightIdle} style={{ borderRadius: '4px' }}>
                    <img src={item.icon} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'contain', borderRadius: '3px' }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: '2px' }}>
                  {fullItem.composition.map((compId, idx) => {
                    const compData = softItemsList.find(i => i.apiName === compId) || allItems.find(i => i.apiName === compId);
                    return compData && compData.icon ? (
                      <div key={`${compId}-${idx}`} className={style.spinningHighlightIdle} style={{ borderRadius: '3px' }}>
                        <img
                          src={compData.icon}
                          alt={compData.name}
                          title={compData.name}
                          style={{ width: '16px', height: '16px', objectFit: 'contain', borderRadius: '2px', display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
