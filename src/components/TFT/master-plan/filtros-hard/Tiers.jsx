import React from 'react';

export default function Tiers({ tiers, selectedTier, toggleArrayFilter, setSelectedTier, style }) {
  return (
    <div className={style.filterInputGroup}>
      <label>Tiers</label>
      <div className={style.filterButtonsContainer}>
        {tiers?.filter(t => t !== "C").map(t => (
          <button
            key={t}
            type="button"
            data-tier={t}
            className={`${style.filterOptionBox} ${selectedTier.includes(t) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
            onClick={() => toggleArrayFilter(setSelectedTier, t)}
          >
            Tier {t}
          </button>
        ))}
      </div>
    </div>
  );
}
