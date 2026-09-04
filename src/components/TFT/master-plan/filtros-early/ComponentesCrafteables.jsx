import React from 'react';

export default function ComponentesCrafteables({ softItemsList, selectedSalidasEarlyComponents, setSelectedSalidasEarlyComponents, style }) {
  if (!softItemsList || softItemsList.length === 0) return null;

  const handleItemClick = (apiName) => {
    setSelectedSalidasEarlyComponents(prev => {
      const normalize = (i) => typeof i === 'object' ? i.apiName : i;
      const cleanPrev = prev.map(normalize);
      const isSelected = cleanPrev.includes(apiName);
      
      if (isSelected) {
        return prev.filter(i => normalize(i) !== apiName);
      } else {
        return [...prev, apiName];
      }
    });
  };

  return (
    <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <legend style={{ fontSize: '0.75rem' }}>{'Componentes Crafteables'}</legend>
      <div className={style.filterButtonsContainerRow}>
        {softItemsList.map(item => {
          const currentCount = selectedSalidasEarlyComponents.filter(i => (typeof i === 'object' ? i.apiName : i) === item.apiName).length;
          const isSelected = currentCount > 0;
          return (
            <button
              key={item.apiName}
              type="button"
              title={item.name}
              className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
              onClick={() => handleItemClick(item.apiName)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                opacity: 1,
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {item.icon && <img src={item.icon} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'contain', borderRadius: '4px' }} />}
              {currentCount > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  backgroundColor: '#ff3e3e',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  padding: '1px 5px',
                  borderRadius: '10px',
                  border: '1px solid #1a1a1a',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}>
                  x{currentCount}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
