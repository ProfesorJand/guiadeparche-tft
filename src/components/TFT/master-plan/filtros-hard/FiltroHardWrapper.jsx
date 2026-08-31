import React from 'react';
import Tiers from './Tiers';
import Categorias from './Categorias';
import Dificultad from './Dificultad';
import TipoDeDano from './TipoDeDano';
import FiltrosRapidos from './FiltrosRapidos';

export default function FiltroHardWrapper({
  tiers, selectedTier, setSelectedTier,
  categorias, selectedCategory, setSelectedCategory,
  dificultades, selectedDifficulty, setSelectedDifficulty,
  dañoTipo, selectedDamageType, setSelectedDamageType,
  toggleArrayFilter, resetAllFilters,
  style
}) {
  return (
    <fieldset className={`${style.filtersSection} ${style.filtersSectionHard}`}>
      <legend>Filtro Hard (Playstyle / Estilo de juego)</legend>
      <div className={style.hardFiltersGrid}>
        
        <Tiers 
          tiers={tiers} 
          selectedTier={selectedTier} 
          toggleArrayFilter={toggleArrayFilter} 
          setSelectedTier={setSelectedTier} 
          style={style} 
        />

        <Categorias 
          categorias={categorias} 
          selectedCategory={selectedCategory} 
          toggleArrayFilter={toggleArrayFilter} 
          setSelectedCategory={setSelectedCategory} 
          style={style} 
        />

        <Dificultad 
          dificultades={dificultades} 
          selectedDifficulty={selectedDifficulty} 
          toggleArrayFilter={toggleArrayFilter} 
          setSelectedDifficulty={setSelectedDifficulty} 
          style={style} 
        />

        <TipoDeDano 
          dañoTipo={dañoTipo} 
          selectedDamageType={selectedDamageType} 
          toggleArrayFilter={toggleArrayFilter} 
          setSelectedDamageType={setSelectedDamageType} 
          style={style} 
        />

        <FiltrosRapidos 
          selectedTier={selectedTier}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          selectedDamageType={selectedDamageType}
          resetAllFilters={resetAllFilters}
          setSelectedTier={setSelectedTier}
          setSelectedDifficulty={setSelectedDifficulty}
          style={style}
        />

      </div>
    </fieldset>
  );
}
