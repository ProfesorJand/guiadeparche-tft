import React from 'react';

export default function Sinergias({ condicionesGrandeSinergias, selectedSalidasEarlySinergias, toggleArrayFilter, setSelectedSalidasEarlySinergias, style }) {
  if (!condicionesGrandeSinergias || condicionesGrandeSinergias.length === 0) return null;

  return (
    <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <legend style={{ fontSize: '0.75rem' }}>Sinergias</legend>
      <div className={style.filterButtonsContainerRow}>
        {condicionesGrandeSinergias.map(sinergia => (
          <button
            key={sinergia.apiName}
            type="button"
            title={sinergia.name}
            className={`${style.filterOptionBox} ${selectedSalidasEarlySinergias.includes(sinergia.apiName) ? style.filterOptionBoxActive : ''}`}
            onClick={() => toggleArrayFilter(setSelectedSalidasEarlySinergias, sinergia.apiName)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', minWidth: '70px', gap: '6px' }}
          >
            {sinergia.icon && <img src={sinergia.icon} alt={sinergia.name} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '3px' }} />}
            <span style={{ fontSize: '1rem', textAlign: 'center', lineHeight: '1.1' }}>{sinergia.name}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
