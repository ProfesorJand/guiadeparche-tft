import React from 'react';

export default function TipoDeDano({ dañoTipo, selectedDamageType, toggleArrayFilter, setSelectedDamageType, style }) {
  return (
    <div className={style.filterInputGroup}>
      <label>Tipo de Daño</label>
      <div className={style.filterButtonsContainer}>
        {dañoTipo?.Es?.map(d => (
          <button
            key={d}
            type="button"
            data-tipodedano={d}
            className={`${style.filterOptionBox} ${selectedDamageType.includes(d) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
            onClick={() => toggleArrayFilter(setSelectedDamageType, d)}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
