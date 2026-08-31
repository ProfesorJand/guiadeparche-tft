import React from 'react';

export default function Categorias({ categorias, selectedCategory, toggleArrayFilter, setSelectedCategory, style }) {
  return (
    <div className={style.filterInputGroup}>
      <label>Categorías</label>
      <div className={style.filterButtonsContainer}>
        {categorias?.Es?.map(cat => (
          <button
            key={cat}
            type="button"
            data-categoria={cat}
            className={`${style.filterOptionBox} ${selectedCategory.includes(cat) ? style.filterOptionBoxActive : style.grayWhenInactive}`}
            onClick={() => toggleArrayFilter(setSelectedCategory, cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
