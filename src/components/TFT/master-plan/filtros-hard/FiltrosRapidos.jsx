import React from 'react';

export default function FiltrosRapidos({ 
  selectedTier, 
  selectedCategory, 
  selectedDifficulty, 
  selectedDamageType, 
  resetAllFilters, 
  setSelectedTier, 
  setSelectedDifficulty, 
  style 
}) {
  return (
    <div className={style.filterInputGroup}>
      <label>Filtros Rápidos</label>
      <div className={style.filterButtonsContainer}>
        <button
          type="button"
          className={`${style.filterOptionBox} ${((selectedTier.includes("S") && selectedTier.includes("A") && selectedDifficulty.includes("Facil"))) ? '' : style.grayWhenInactive}`}
          onClick={() => {
            resetAllFilters();
            setSelectedTier(["S", "A"]);
            setSelectedDifficulty(["Facil"]);
          }}
          style={{
            padding: '8px 12px',
            background: '#d8b4fe20',
            borderColor: '#d8b4fe',
            color: 'white',
            fontWeight: 'bold',
            justifyContent: 'center'
          }}
        >
          Filtro Principiante
        </button>
        <button
          type="button"
          className={`${style.filterOptionBox} ${((selectedTier.length > 0 || selectedCategory.length > 0 || selectedDifficulty.length > 0 || selectedDamageType.length > 0)) ? '' : style.grayWhenInactive}`}
          onClick={resetAllFilters}
          style={{
            padding: '8px 12px',
            background: '#ff4d4d20',
            borderColor: '#ff4d4d',
            color: '#ffaaaa',
            justifyContent: 'center'
          }}
        >
          Resetear Filtros
        </button>
      </div>
    </div>
  );
}
