import React from 'react';
import CardsMasterPlanCompos from '../CardsMasterPlanCompos';
import { getLocalTftImage } from '@utils/images';

export default function ResultadosWrapper({
  filteredCompos,
  setActiveComp,
  allCompos,
  allChampions,
  activateMissingOPM,
  selectedSoftItems,
  selectedSoftChampions,
  selectedSoftTraits,
  selectedSoftAugments,
  gruposSalidasEarly,
  selectedAugmentTiers,
  style
}) {
  return (
    <fieldset className={`${style.filtersSection}`}>
      <legend>Resultados ({filteredCompos.length})</legend>
      <div className={style.composGrid}>
        {filteredCompos.length > 0 ? (
          filteredCompos.map(compo => (
            <div key={compo.id || compo.titulo || Math.random()} className={style.cardContainer} onClick={() => setActiveComp(allCompos.find((comp) => comp.id === compo.id))}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '5px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px 8px 0px 0px', }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', minHeight: '32px' }}>
                  {compo._matchedFilters.map((f, i) => {
                    const showDivider = i > 0 && f.opStatus !== compo._matchedFilters[i - 1].opStatus;
                    return (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {showDivider && (
                          <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        )}
                        <div style={{ position: 'relative', display: 'flex' }}>
                          {f.type === 'salida' && f.campeones && f.campeones.length > 0 ? (
                            <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.1)', padding: '2px', borderRadius: '4px', border: f.opStatus === 'opm' ? '2px solid #ff4500' : f.opStatus === 'op' ? '2px solid #ff9d00' : 'none' }}>
                              {f.campeones.map(apiName => {
                                const champ = allChampions.find(c => c.apiName === apiName);
                                if (!champ || !champ.tileIcon) return null;
                                return (
                                  <img
                                    key={apiName}
                                    title={f.name}
                                    src={getLocalTftImage(champ.tileIcon, 'champions/tileIcon')}
                                    alt={champ.name}
                                    style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '3px' }}
                                  />
                                );
                              })}
                            </div>
                          ) : f.icon ? (
                            <img src={f.icon} alt={f.name} title={f.name} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain', border: f.opStatus === 'opm' ? '2px solid #ff4500' : f.opStatus === 'op' ? '2px solid #ff9d00' : f.isCore ? '2px solid #24ce02ff' : 'none' }} />
                          ) : (
                            <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 6px', borderRadius: '4px', color: 'white', border: f.opStatus === 'opm' ? '2px solid #ff4500' : f.opStatus === 'op' ? '2px solid #ff9d00' : f.isCore ? '2px solid #24ce02ff' : 'none' }}>{f.name}</span>
                          )}
                          {f.opStatus && (
                            <div style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '10px', fontWeight: 'bold', background: f.opStatus === 'opm' ? '#ff4500' : '#ff9d00', color: 'white', padding: '1px 3px', borderRadius: '4px', zIndex: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                              {f.opStatus.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              </div>
              <CardsMasterPlanCompos 
                compo={compo} 
                activateMissingOPM={activateMissingOPM} 
                filtroSoft={{ selectedSoftItems, selectedSoftChampions, selectedSoftTraits, selectedSoftAugments }} 
                gruposSalidasEarly={gruposSalidasEarly} 
                selectedAugmentTiers={selectedAugmentTiers} 
              />
            </div>
          ))
        ) : (
          <p className={style.noResults}>No se encontraron composiciones con estos filtros.</p>
        )}
      </div>
    </fieldset>
  );
}
