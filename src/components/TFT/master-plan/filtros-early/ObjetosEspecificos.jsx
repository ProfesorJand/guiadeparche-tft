import React from 'react';
import { getLocalTftImage } from '@utils/images';

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
  versionNumber,
  style 
}) {
  const normalizeItem = (name) => name?.replace('DA_Component_', '')?.replace('DA_', '')?.replace('TFT_Item_', '');
  const formatIcon = (iconPath) => {
    if (!iconPath) return null;
    if (iconPath.startsWith('/')) return iconPath;
    if (iconPath.includes('http')) return iconPath.replace('.tex', '.png').toLowerCase();
    return getLocalTftImage(iconPath, 'items', versionNumber);
  };
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
                {[...items].sort((a, b) => (b.appearCount || 0) - (a.appearCount || 0)).map(item => {
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
                      {hasComposition && (
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {fullItem.composition.map((compId, idx) => {
                            const normalizedCompId = normalizeItem(compId);
                            const compData =
                              softItemsList.find(i => i.apiName === compId || normalizeItem(i.apiName) === normalizedCompId) ||
                              allItems.find(i => i.apiName === compId || normalizeItem(i.apiName) === normalizedCompId);
                            const compIcon = formatIcon(compData?.icon || compData?.img);
                            const isCompSelected = selectedSalidasEarlyComponents.includes(compId) ||
                              selectedSalidasEarlyComponents.some(c => normalizeItem(c) === normalizedCompId);

                            return compData && compIcon ? (
                              <div key={`${compId}-${idx}`} className={isCompSelected && matchedCount < 2 ? style.spinningHighlight : style.spinningHighlightIdle} style={{ borderRadius: '3px' }}>
                                <img
                                  src={compIcon}
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
