import React from 'react';

export default function ComponentesCrafteables({ softItemsList, selectedSalidasEarlyComponents, toggleArrayFilter, setSelectedSalidasEarlyComponents, style }) {
  if (!softItemsList || softItemsList.length === 0) return null;

  return (
    <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <legend style={{ fontSize: '0.75rem' }}>{'Componentes Crafteables'}</legend>
      <div className={style.filterButtonsContainerRow}>
        {softItemsList.map(item => {
          const isSelected = selectedSalidasEarlyComponents.includes(item.apiName);
          return (
            <button
              key={item.apiName}
              type="button"
              title={item.name}
              className={`${style.filterOptionBox} ${isSelected ? style.filterOptionBoxActive : ''}`}
              onClick={() => toggleArrayFilter(setSelectedSalidasEarlyComponents, item.apiName)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                opacity: 1,
                cursor: 'pointer'
              }}
            >
              {item.icon && <img src={item.icon} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'contain', borderRadius: '4px' }} />}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
