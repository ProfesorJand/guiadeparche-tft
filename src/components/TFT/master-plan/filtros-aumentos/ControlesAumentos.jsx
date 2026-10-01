import React from 'react';

export default function ControlesAumentos({
  selectedAugmentTiers,
  toggleArrayFilter,
  setSelectedAugmentTiers,
  sortAugmentsByName,
  setSortAugmentsByName,
  sortAugmentsByCount,
  setSortAugmentsByCount,
  showOnlyOP,
  setShowOnlyOP,
  style
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
      <div className={style.filterButtonsContainerRow}>
        <button
          type="button"
          className={`${style.filterOptionBox} ${selectedAugmentTiers.length === 0 ? style.filterOptionBoxActive : ''}`}
          onClick={() => setSelectedAugmentTiers([])}
        >
          Todos
        </button>
        {['Plata', 'Oro', 'Prismatico'].map(tier => (
          <button
            key={tier}
            type="button"
            className={`${style.filterOptionBox} ${selectedAugmentTiers.includes(tier) ? style.filterOptionBoxActive : ''}`}
            onClick={() => {
              if (selectedAugmentTiers.includes(tier)) {
                setSelectedAugmentTiers([]);
              } else {
                setSelectedAugmentTiers([tier]);
              }
            }}
          >
            {tier}
          </button>
        ))}
      </div>

      <div className={style.filterButtonsContainerRow}>
        <button
          type="button"
          className={`${style.filterOptionBox} ${showOnlyOP ? style.filterOptionBoxActive : ''}`}
          onClick={() => setShowOnlyOP(!showOnlyOP)}
        >
          OP / OPM
        </button>
      </div>

      <div className={style.filterButtonsContainerRow}>
        <button
          type="button"
          className={`${style.filterOptionBox} ${sortAugmentsByName ? style.filterOptionBoxActive : ''}`}
          onClick={() => {
            setSortAugmentsByCount(null);
            setSortAugmentsByName(prev => prev === 'A-Z' ? 'Z-A' : prev === 'Z-A' ? null : 'A-Z');
          }}
        >
          {sortAugmentsByName || 'A-Z / Z-A'}
        </button>

        <button
          type="button"
          className={`${style.filterOptionBox} ${sortAugmentsByCount ? style.filterOptionBoxActive : ''}`}
          onClick={() => {
            setSortAugmentsByName(null);
            setSortAugmentsByCount(prev => prev === 'DESC' ? 'ASC' : prev === 'ASC' ? null : 'DESC');
          }}
        >
          {sortAugmentsByCount ? `${sortAugmentsByCount}` : 'DESC / ASC'}
        </button>
      </div>
    </div>
  );
}
