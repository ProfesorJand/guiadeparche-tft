import React, { useState } from 'react';

export default function CampeonesCoste({ champsList, selectedSalidasEarlyChampions, toggleSelectedSalidasEarlyChampion, style }) {
  const [activeCost, setActiveCost] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  if (!champsList || champsList.length === 0) return null;

  const groupedChamps = {};
  champsList.forEach(champ => {
    const c = champ.cost || 1;
    if (!groupedChamps[c]) groupedChamps[c] = [];
    groupedChamps[c].push(champ);
  });

  const availableCosts = [1, 2, 3, 4].filter(c => groupedChamps[c] && groupedChamps[c].length > 0);
  const currentCost = availableCosts.includes(activeCost) ? activeCost : availableCosts[0];

  const champsInCost = groupedChamps[currentCost] || [];
  champsInCost.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  const normalizeSearchString = (str) => {
    return (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/['\s-]/g, "")          // Remove apostrophes, spaces, hyphens
      .toLowerCase();
  };

  const searchResults = searchTerm ? champsList.filter(c => normalizeSearchString(c.name).includes(normalizeSearchString(searchTerm))) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', boxSizing: 'border-box' }}>
      {/* Tabs and Search Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {availableCosts.map(cost => (
            <button
              key={cost}
              type="button"
              onClick={() => setActiveCost(cost)}
              style={{
                padding: '6px 12px',
                background: currentCost === cost ? `var(--color-hex-cost-${cost})` : 'rgba(0,0,0,0.5)',
                border: currentCost === cost ? '1px solid white' : '1px solid #444',
                color: currentCost === cost ? 'white' : '#aaa',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: currentCost === cost ? 'bold' : 'normal',
                transition: 'all 0.2s ease'
              }}
            >
              Coste {cost}
            </button>
          ))}
        </div>
        
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Buscar campeón..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchResults.length > 0) {
                const firstResult = searchResults[0];
                const isSelected = selectedSalidasEarlyChampions.some(sc => sc.apiName === firstResult.apiName);
                if (!isSelected) {
                  toggleSelectedSalidasEarlyChampion(firstResult);
                }
                setSearchTerm('');
              }
            }}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #444', 
              background: 'rgba(0,0,0,0.5)', 
              color: 'white',
              width: '200px',
              outline: 'none'
            }}
          />
          {searchTerm && searchResults.length > 0 && (
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              right: 0, 
              zIndex: 100, 
              background: '#1a1a1a', 
              border: '1px solid #444', 
              maxHeight: '250px', 
              overflowY: 'auto', 
              width: '100%',
              borderRadius: '4px',
              marginTop: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              {searchResults.map(c => {
                const isSelected = selectedSalidasEarlyChampions.some(sc => sc.apiName === c.apiName);
                return (
                  <div 
                    key={c.apiName}
                    onClick={() => {
                      if (!isSelected) toggleSelectedSalidasEarlyChampion(c);
                      setSearchTerm('');
                    }}
                    style={{ 
                      padding: '8px 10px', 
                      cursor: 'pointer', 
                      borderBottom: '1px solid #333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: isSelected ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = isSelected ? 'rgba(255,255,255,0.1)' : 'transparent'}
                  >
                    {c.icon && <img src={c.icon} alt={c.name} style={{ width: '24px', height: '24px', borderRadius: '3px', border: `1px solid var(--color-hex-cost-${c.cost})`, objectFit: 'contain' }} />}
                    <span style={{ fontSize: '0.9rem', color: isSelected ? '#fff' : '#ccc' }}>{c.name}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Champions Grid */}
      <div className={style.filterButtonsContainerRow} style={{ minHeight: '120px', alignContent: 'flex-start' }}>
        {champsInCost.map(champ => {
          const isSelected = selectedSalidasEarlyChampions.some(c => c.apiName === champ.apiName);
          
          return (
            <button
              key={champ.apiName}
              type="button"
              className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
              onClick={() => toggleSelectedSalidasEarlyChampion(champ)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', minWidth: '70px', gap: '6px' }}
            >
              <div style={{ position: 'relative' }}>
                {champ.icon && <img src={champ.icon} alt={champ.name} style={{ minWidth: '60px', minHeight: '60px', width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', border: `3px solid var(--color-hex-cost-${champ.cost})`, boxSizing: 'border-box' }} />}
                {champ.iconPequeno && (
                  <img 
                    src={champ.iconPequeno} 
                    alt="condición" 
                    style={{ 
                      position: 'absolute', 
                      top: '-4px', 
                      right: '-4px', 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      border: '1px solid white', 
                      background: '#000',
                      objectFit: 'contain'
                    }} 
                  />
                )}
              </div>
              <span style={{ fontSize: '1rem', textAlign: 'center', lineHeight: '1.1' }}>{champ.name}</span>
            </button>
          );
        })}
        {champsInCost.length === 0 && (
           <div style={{ width: '100%', textAlign: 'center', padding: '20px', color: '#888', fontStyle: 'italic' }}>
             No hay campeones de este coste
           </div>
        )}
      </div>

      {/* Selected Champions */}
      {selectedSalidasEarlyChampions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          <div style={{ fontSize: '0.85rem', color: '#ccc' }}>Seleccionados:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedSalidasEarlyChampions.map(champ => (
              <div 
                key={`selected-${champ.apiName}`}
                onClick={() => toggleSelectedSalidasEarlyChampion(champ)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '16px',
                  padding: '4px 8px 4px 4px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,100,100,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                title="Quitar"
              >
                {champ.icon && <img src={champ.icon} alt={champ.name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'contain', background: '#000' }} />}
                <span style={{ fontSize: '0.85rem', color: '#fff' }}>{champ.name}</span>
                <span style={{ color: '#ff6666', fontWeight: 'bold', marginLeft: '4px' }}>×</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
