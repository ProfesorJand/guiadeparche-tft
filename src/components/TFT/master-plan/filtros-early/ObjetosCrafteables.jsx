import React from 'react';
import { getLocalTftImage } from '@utils/images';

export default function ObjetosCrafteables({ 
  condicionesGrandeItems, 
  filteredComposPrimary,
  selectedSalidasEarlyItems,
  selectedSalidasEarlyComponents = [],
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
    const allPrios = [
      ...(Array.isArray(comp.itemsPrio) ? comp.itemsPrio : []),
      ...(Array.isArray(comp.itemsPrioTanque) ? comp.itemsPrioTanque : [])
    ];

    allPrios.forEach(item => {
      const rawApiName = typeof item === 'object' && item !== null ? item.apiName : item;
      if (rawApiName) {
        const norm = normalizeItem(rawApiName);
        if (norm) {
          if (!uniqueItemsMap.has(norm)) {
            const dbItem = allItems.find(i => normalizeItem(i.apiName) === norm);
            if (dbItem) {
              uniqueItemsMap.set(norm, {
                apiName: dbItem.apiName,
                name: dbItem.name,
                icon: formatIcon(dbItem.icon || dbItem.img),
                appearCount: 1
              });
            }
          } else {
            const existing = uniqueItemsMap.get(norm);
            existing.appearCount = (existing.appearCount || 0) + 1;
          }
        }
      }
    });
  });

  const allRelevantItems = Array.from(uniqueItemsMap.values());

  if (allRelevantItems.length === 0) {
    return null;
  }

  // Filtrar todos los objetos crafteables (que tengan composición de 2 items y no sean emblemas)
  const craftableItems = allRelevantItems.filter(condItem => {
    const apiName = condItem.apiName;
    const dbItem = allItems.find(i => i.apiName === apiName);
    if (!dbItem) return false;

    const isEmblem = apiName.includes("Emblem") || dbItem?.name?.toLowerCase().includes("emblem") || dbItem?.name?.toLowerCase().includes("emblema");
    const isCraftable = dbItem?.composition && Array.isArray(dbItem.composition) && dbItem.composition.length === 2 && !isEmblem;
    
    return isCraftable;
  });

  if (craftableItems.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <legend style={{ fontSize: '0.75rem' }}>Objetos Crafteables</legend>
        <div className={style.filterButtonsContainerRow}>
          {[...craftableItems].sort((a, b) => (b.appearCount || 0) - (a.appearCount || 0)).map(item => {
            const isSelected = selectedSalidasEarlyItems.some(i => i.apiName === item.apiName);
            const fullItem = allItems.find(i => i.apiName === item.apiName) || item;
            
            const hasComposition = fullItem.composition && fullItem.composition.length > 0;
            const matchedCount = hasComposition 
              ? fullItem.composition.filter(c => 
                  selectedSalidasEarlyComponents.includes(c) || 
                  selectedSalidasEarlyComponents.some(sc => sc.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === c.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', ''))
                ).length 
              : 0;

            return (
              <button
                key={item.apiName}
                type="button"
                title={item.name}
                className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
                onClick={() => toggleArrayFilter(setSelectedSalidasEarlyItems, item)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px', gap: '4px', position: 'relative' }}
              >
                {item.icon && (
                  <div style={{ position: 'relative' }}>
                    <div className={matchedCount === 2 && !isSelected ? style.spinningHighlight : style.spinningHighlightIdle} style={{ borderRadius: '4px' }}>
                      <img src={item.icon} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'contain', borderRadius: '3px' }} />
                    </div>
                    {item.appearCount > 0 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        color: '#ffcc00',
                        border: '1px solid #ffcc00',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        zIndex: 3
                      }}>
                        {item.appearCount}
                      </div>
                    )}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '2px' }}>
                  {fullItem.composition.map((compId, idx) => {
                    const compData = softItemsList.find(i => i.apiName === compId) || allItems.find(i => i.apiName === compId);
                    const normalizedCompId = compId.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
                    const isCompSelected = selectedSalidasEarlyComponents.includes(compId) ||
                      selectedSalidasEarlyComponents.some(c => c.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedCompId);

                    return compData && compData.icon ? (
                      <div key={`${compId}-${idx}`} className={isCompSelected && matchedCount < 2 ? style.spinningHighlight : style.spinningHighlightIdle} style={{ borderRadius: '3px' }}>
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
