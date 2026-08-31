import React from 'react';
import ControlesAumentos from './ControlesAumentos';
import GridAumentos from './GridAumentos';

export default function FiltroAumentosWrapper({
  selectedAugmentTiers,
  toggleArrayFilter,
  setSelectedAugmentTiers,
  sortAugmentsByName,
  setSortAugmentsByName,
  sortAugmentsByCount,
  setSortAugmentsByCount,
  opEarlyAugmentsMap,
  dbAumentos,
  selectedSmallCats,
  earlyHighlightedAugments,
  selectedHardAugments,
  setSelectedHardAugments,
  allChampions,
  versionNumber,
  style
}) {
  return (
    <fieldset className={`${style.filtersSection}`}>
      <legend>Filtro de Aumentos (2-1)</legend>

      <div className={style.filterInputGroup}>
        <ControlesAumentos 
          selectedAugmentTiers={selectedAugmentTiers}
          toggleArrayFilter={toggleArrayFilter}
          setSelectedAugmentTiers={setSelectedAugmentTiers}
          sortAugmentsByName={sortAugmentsByName}
          setSortAugmentsByName={setSortAugmentsByName}
          sortAugmentsByCount={sortAugmentsByCount}
          setSortAugmentsByCount={setSortAugmentsByCount}
          style={style}
        />
        
        <GridAumentos 
          selectedAugmentTiers={selectedAugmentTiers}
          opEarlyAugmentsMap={opEarlyAugmentsMap}
          dbAumentos={dbAumentos}
          sortAugmentsByName={sortAugmentsByName}
          sortAugmentsByCount={sortAugmentsByCount}
          selectedSmallCats={selectedSmallCats}
          earlyHighlightedAugments={earlyHighlightedAugments}
          selectedHardAugments={selectedHardAugments}
          toggleArrayFilter={toggleArrayFilter}
          setSelectedHardAugments={setSelectedHardAugments}
          allChampions={allChampions}
          versionNumber={versionNumber}
          style={style}
        />
      </div>
    </fieldset>
  );
}
