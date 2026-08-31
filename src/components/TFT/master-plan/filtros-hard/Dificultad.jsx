import React from 'react';

export default function Dificultad({ dificultades, selectedDifficulty, toggleArrayFilter, setSelectedDifficulty, style }) {
  return (
    <div className={style.filterInputGroup}>
      <label>Dificultad</label>
      <div className={style.filterButtonsContainer}>
        {dificultades?.Es?.map(d => (
          <button
            key={d}
            type="button"
            data-dificultad={d}
            className={`${style.filterOptionBox} ${selectedDifficulty.includes(d) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
            onClick={() => toggleArrayFilter(setSelectedDifficulty, d)}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
