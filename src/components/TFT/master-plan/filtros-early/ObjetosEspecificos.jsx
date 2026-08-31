import React from 'react';

export default function ObjetosEspecificos({ 
  condicionesGrandeItems, 
  condicionesGrandeSinergias, 
  condicionesGrandeItemsGrouped, 
  selectedSalidasEarlyItems, 
  selectedSalidasEarlyComponents, 
  allItems, 
  softItemsList, 
  toggleArrayFilter, 
  setSelectedSalidasEarlyItems, 
  style 
}) {
  if (!(condicionesGrandeItems.length > 0 || (condicionesGrandeSinergias && condicionesGrandeSinergias.length > 0))) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px' }}>
        {Object.entries({
          'Emblemas': condicionesGrandeItemsGrouped.emblemas,
          'Artefactos': condicionesGrandeItemsGrouped.artefactos,
          'Radiantes': condicionesGrandeItemsGrouped.radiantes,
          'Específicos / Soporte': condicionesGrandeItemsGrouped.especificos
        }).map(([groupName, items]) => {
          if (!items || items.length === 0) return null;
          return (
            <fieldset key={groupName} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <legend style={{ fontSize: '0.75rem' }}>{groupName}</legend>
              <div className={style.filterButtonsContainerRow}>
                {items.map(item => {
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
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px', gap: '4px' }}
                    >
                      {item.icon && (
                        <div className={matchedCount === 2 && !isSelected ? style.spinningHighlight : style.spinningHighlightIdle} style={{ borderRadius: '4px' }}>
                          <img src={item.icon} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'contain', borderRadius: '3px' }} />
                        </div>
                      )}
                      {hasComposition && (
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
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
