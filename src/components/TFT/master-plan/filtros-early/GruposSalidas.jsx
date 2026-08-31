import React from 'react';
import { getLocalTftImage } from '@utils/images';

export default function GruposSalidas({
  availableGruposSalidasEarly,
  filteredComposPrimary,
  selectedSalidasEarly,
  selectedSalidasEarlyChampions,
  selectedSalidasEarlySinergias,
  selectedSalidasEarlyComponents,
  selectedSalidasEarlyItems,
  allItems,
  allTraits,
  allChampions,
  versionNumber,
  toggleArrayFilter,
  setSelectedSalidasEarly,
  style
}) {
  if (!availableGruposSalidasEarly || availableGruposSalidasEarly.length === 0) {
    return <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No hay salidas early disponibles</span>;
  }

  const groupedGrupos = {
    'Win Streak': [],
    'N/A': [],
    'Lose Streak': [],
  };

  availableGruposSalidasEarly.forEach(grupo => {
    const tipoStr = grupo.tipo && grupo.tipo !== '' ? grupo.tipo : 'N/A';
    if (groupedGrupos[tipoStr]) {
      groupedGrupos[tipoStr].push(grupo);
    } else {
      groupedGrupos['N/A'].push(grupo);
    }
  });

  const getGrupoScore = (grupo) => {
    let score = 0;
    const composUsingThisGroup = filteredComposPrimary.filter(c => c.salidasEarly?.map(String).includes(String(grupo.id)));

    if (selectedSalidasEarlyChampions.length > 0) {
      let matchedChamps = 0;
      selectedSalidasEarlyChampions.forEach(champ => {
        const isMatch = composUsingThisGroup.some(compo =>
          (compo.condiciones || []).some(c => c.apiNameGrande === champ.apiName || c.ApiNamePequeno === champ.apiName)
        );
        if (isMatch) matchedChamps++;
      });
      score += matchedChamps;
    }

    if (selectedSalidasEarlySinergias.length > 0) {
      let matchedTraits = 0;
      selectedSalidasEarlySinergias.forEach(traitApiName => {
        const isMatch = composUsingThisGroup.some(compo =>
          (compo.condiciones || []).some(c =>
            (c.condTypeGrande?.toLowerCase() === 'sinergia' || c.typeGrande?.toLowerCase() === 'sinergia' || c.condType?.toLowerCase() === 'sinergia') &&
            (c.apiNameGrande === traitApiName || c.ApiNamePequeno === traitApiName)
          ) || (compo.traits || []).some(t => t.name === traitApiName)
        );
        if (isMatch) matchedTraits++;
      });
      score += matchedTraits;
    }

    if (selectedSalidasEarlyComponents.length > 0 || selectedSalidasEarlyItems.length > 0) {
      const uniqueCraftedItems = new Set();
      composUsingThisGroup.forEach(c => {
        const checkItem = (apiName) => {
          if (selectedSalidasEarlyComponents.length > 0) {
            const dbItem = allItems.find(i => i.apiName === apiName);
            if (dbItem?.composition && dbItem.composition.length > 0) {
              if (dbItem.composition.every(comp => selectedSalidasEarlyComponents.includes(comp))) {
                uniqueCraftedItems.add(apiName);
              }
            } else {
              const normalizedApi = apiName.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
              if (selectedSalidasEarlyComponents.some(comp => comp.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedApi)) {
                uniqueCraftedItems.add(apiName);
              }
            }
          }
          if (selectedSalidasEarlyItems.length > 0) {
            if (selectedSalidasEarlyItems.some(i => i.apiName === apiName)) {
              uniqueCraftedItems.add(apiName);
            }
          }
        };
        (c.itemsPrio || []).forEach(prioItem => {
          const apiName = typeof prioItem === 'object' ? prioItem.apiName : prioItem;
          checkItem(apiName);
        });
        (c.condiciones || []).forEach(cond => {
          const condType = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();
          if (condType === 'item' && cond.apiNameGrande) {
            checkItem(cond.apiNameGrande);
          }
        });
      });
      score += uniqueCraftedItems.size;
    }

    return score;
  };

  Object.keys(groupedGrupos).forEach(key => {
    groupedGrupos[key].sort((a, b) => {
      const scoreA = getGrupoScore(a);
      const scoreB = getGrupoScore(b);
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
      const aLen = a.campeones ? a.campeones.length : 0;
      const bLen = b.campeones ? b.campeones.length : 0;
      if (aLen === 0 && bLen > 0) return -1;
      if (bLen === 0 && aLen > 0) return 1;
      return 0;
    });
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '10px', alignItems: 'flex-start' }}>
      {Object.entries(groupedGrupos).map(([groupName, grupos]) => {
        if (grupos.length === 0) return null;
        return (
          <fieldset key={groupName} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: 'calc(33.33% - 7px)', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
            <legend>{groupName === "N/A" ? `Tempo` : groupName}</legend>
            <div className={style.filterButtonsContainer} style={{ flexWrap: 'wrap', width: '100%' }}>
              {(() => {
                const processedGrupos = grupos.map(grupo => {
                  const isSelected = selectedSalidasEarly.includes(grupo.id);
                  const composUsingThisGroup = filteredComposPrimary.filter(c => c.salidasEarly?.map(String).includes(String(grupo.id)));

                  let matchesChampion = false;
                  const matchedChampionsForGroup = [];
                  if (selectedSalidasEarlyChampions.length > 0) {
                    selectedSalidasEarlyChampions.forEach(champ => {
                      const isDirectMatch = grupo.campeones && grupo.campeones.includes(champ.apiName);
                      const isMatch = isDirectMatch || composUsingThisGroup.some(compo =>
                        (compo.condiciones || []).some(c => c.apiNameGrande === champ.apiName || c.ApiNamePequeno === champ.apiName || c.apiNamePequeno === champ.apiName) ||
                        (compo.campeonesEarly || []).some(e => (typeof e === 'object' ? e.apiNameCampeon : e) === champ.apiName)
                      );
                      if (isMatch) {
                        matchesChampion = true;
                        matchedChampionsForGroup.push(champ);
                      }
                    });
                  }

                  const uniqueCraftedItems = new Set();
                  if (selectedSalidasEarlyComponents.length > 0 || selectedSalidasEarlyItems.length > 0) {
                    composUsingThisGroup.forEach(c => {
                      const checkItem = (apiName) => {
                        let addedByComponent = false;
                        if (selectedSalidasEarlyComponents.length > 0) {
                          const dbItem = allItems.find(i => i.apiName === apiName);
                          if (dbItem?.composition && dbItem.composition.length > 0) {
                            if (dbItem.composition.every(comp => selectedSalidasEarlyComponents.includes(comp))) {
                              addedByComponent = true;
                            }
                          } else {
                            const normalizedApi = apiName.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '');
                            if (selectedSalidasEarlyComponents.some(comp => comp.replace('DA_Component_', '').replace('DA_', '').replace('TFT_Item_', '') === normalizedApi)) {
                              addedByComponent = true;
                            }
                          }
                        }

                        let addedBySpecificItem = false;
                        if (selectedSalidasEarlyItems.length > 0) {
                          if (selectedSalidasEarlyItems.some(i => i.apiName === apiName)) {
                            addedBySpecificItem = true;
                          }
                        }

                        if (addedByComponent || addedBySpecificItem) {
                          uniqueCraftedItems.add(apiName);
                        }
                      };

                      (c.itemsPrio || []).forEach(prioItem => {
                        const apiName = typeof prioItem === 'object' ? prioItem.apiName : prioItem;
                        checkItem(apiName);
                      });

                      (c.condiciones || []).forEach(cond => {
                        const condType = (cond.condTypeGrande || cond.typeGrande || cond.condType || "").toLowerCase();
                        if (condType === 'item' && cond.apiNameGrande) {
                          checkItem(cond.apiNameGrande);
                        }
                      });
                    });
                  }

                  const craftedItemsForGroup = Array.from(uniqueCraftedItems).map(apiName => allItems.find(i => i.apiName === apiName)).filter(Boolean);

                  let matchesSinergia = false;
                  const matchedSinergiasForGroup = [];
                  if (selectedSalidasEarlySinergias.length > 0) {
                    selectedSalidasEarlySinergias.forEach(traitApiName => {
                      const isMatch = composUsingThisGroup.some(compo =>
                        (compo.condiciones || []).some(c =>
                          (c.condTypeGrande?.toLowerCase() === 'sinergia' || c.typeGrande?.toLowerCase() === 'sinergia' || c.condType?.toLowerCase() === 'sinergia') &&
                          (c.apiNameGrande === traitApiName || c.ApiNamePequeno === traitApiName)
                        ) || (compo.traits || []).some(t => t.name === traitApiName)
                      );
                      if (isMatch) {
                        matchesSinergia = true;
                        const tr = allTraits.find(t => t.apiName === traitApiName);
                        if (tr) matchedSinergiasForGroup.push(tr);
                      }
                    });
                  }

                  const isFiltersActive = selectedSalidasEarlyChampions.length > 0 || selectedSalidasEarlyComponents.length > 0 || selectedSalidasEarlyItems.length > 0 || selectedSalidasEarlySinergias.length > 0;
                  const hasCraftedItems = craftedItemsForGroup.length > 0;
                  const isVisibleByFilters = !isFiltersActive || matchesChampion || hasCraftedItems || matchesSinergia;
                  
                  const totalIndicators = matchedChampionsForGroup.length + craftedItemsForGroup.length + matchedSinergiasForGroup.length;

                  return {
                    grupo,
                    isSelected,
                    isVisibleByFilters,
                    matchedChampionsForGroup,
                    craftedItemsForGroup,
                    matchedSinergiasForGroup,
                    totalIndicators
                  };
                });

                processedGrupos.sort((a, b) => b.totalIndicators - a.totalIndicators);

                return processedGrupos.map(({ grupo, isSelected, isVisibleByFilters, matchedChampionsForGroup, craftedItemsForGroup, matchedSinergiasForGroup }) => {
                  return (
                  <button
                    key={grupo.id}
                    type="button"
                    title={grupo.nombre || `Grupo ${grupo.id}`}
                    className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
                    onClick={() => toggleArrayFilter(setSelectedSalidasEarly, grupo.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 8px',
                      opacity: isVisibleByFilters ? 1 : 0.5,
                      filter: isVisibleByFilters ? 'none' : 'grayscale(50%)',
                      maxWidth: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    {grupo.campeones && grupo.campeones.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {grupo.nombre && (
                          <span style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '4px' }}>
                            {grupo.nombre}
                          </span>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
                          {grupo.campeones.map(apiName => {
                            const champ = allChampions.find(c => c.apiName === apiName);
                            if (!champ || !champ.tileIcon) return null;
                            return (
                              <div key={apiName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                <img
                                  src={getLocalTftImage(champ.tileIcon, 'champions/tileIcon')}
                                  alt={champ.name}
                                  style={{
                                    minWidth: '40px',
                                    minHeight: '40px',
                                    width: '40px',
                                    height: '40px',
                                    objectFit: 'contain',
                                    borderRadius: '3px',
                                    boxSizing: 'border-box',
                                    border: champ.cost ? `3px solid var(--color-hex-cost-${champ.cost})` : '3px solid transparent'
                                  }}
                                />
                                <span style={{ 
                                  fontSize: '0.85rem', 
                                  textAlign: 'center', 
                                  lineHeight: '1',
                                  maxWidth: '45px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {champ.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        {(craftedItemsForGroup.length > 0 || matchedChampionsForGroup.length > 0 || matchedSinergiasForGroup.length > 0) && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px', padding: '4px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                            {matchedSinergiasForGroup.map(trait => (
                              <img
                                key={trait.apiName}
                                src={trait.icon?.includes("http") ? trait.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(trait.icon, 'traits', versionNumber)}
                                alt={trait.name}
                                title={trait.name}
                                style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid #444', boxSizing: 'border-box' }}
                              />
                            ))}
                            {matchedChampionsForGroup.map(champ => (
                              <img
                                key={champ.apiName}
                                src={champ.icon || getLocalTftImage(champ.tileIcon, 'champions/tileIcon')}
                                alt={champ.name}
                                title={champ.name}
                                style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain', border: champ.cost ? `2px solid var(--color-hex-cost-${champ.cost})` : '2px solid transparent', boxSizing: 'border-box' }}
                              />
                            ))}
                            {craftedItemsForGroup.map(item => (
                              <img
                                key={item.apiName}
                                src={getLocalTftImage(item.icon, 'items')}
                                alt={item.name}
                                title={item.name}
                                style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain' }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span>{grupo.nombre || `Grupo ${grupo.id}`}</span>
                    )}
                  </button>
                );
              })})()}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
