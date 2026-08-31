import React from 'react';
import CampeonesCoste from './CampeonesCoste';
import Sinergias from './Sinergias';
import ComponentesCrafteables from './ComponentesCrafteables';
import ObjetosEspecificos from './ObjetosEspecificos';
import GruposSalidas from './GruposSalidas';

export default function FiltroEarlyWrapper({
  activeTab,
  champsList,
  selectedSalidasEarlyChampions,
  toggleSelectedSalidasEarlyChampion,
  condicionesGrandeSinergias,
  selectedSalidasEarlySinergias,
  toggleArrayFilter,
  setSelectedSalidasEarlySinergias,
  softItemsList,
  selectedSalidasEarlyComponents,
  setSelectedSalidasEarlyComponents,
  condicionesGrandeItems,
  condicionesGrandeItemsGrouped,
  selectedSalidasEarlyItems,
  setSelectedSalidasEarlyItems,
  allItems,
  availableGruposSalidasEarly,
  filteredComposPrimary,
  selectedSalidasEarly,
  setSelectedSalidasEarly,
  allTraits,
  allChampions,
  versionNumber,
  style
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
      {activeTab === 'campeones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px', marginBottom: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <CampeonesCoste 
              champsList={champsList}
              selectedSalidasEarlyChampions={selectedSalidasEarlyChampions}
              toggleSelectedSalidasEarlyChampion={toggleSelectedSalidasEarlyChampion}
              style={style}
            />
            {/* <Sinergias 
              condicionesGrandeSinergias={condicionesGrandeSinergias}
              selectedSalidasEarlySinergias={selectedSalidasEarlySinergias}
              toggleArrayFilter={toggleArrayFilter}
              setSelectedSalidasEarlySinergias={setSelectedSalidasEarlySinergias}
              style={style}
            /> */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginTop: '5px', width: '100%' }}>
            <GruposSalidas 
              availableGruposSalidasEarly={availableGruposSalidasEarly}
              filteredComposPrimary={filteredComposPrimary}
              selectedSalidasEarly={selectedSalidasEarly}
              selectedSalidasEarlyChampions={selectedSalidasEarlyChampions}
              selectedSalidasEarlySinergias={selectedSalidasEarlySinergias}
              selectedSalidasEarlyComponents={selectedSalidasEarlyComponents}
              selectedSalidasEarlyItems={selectedSalidasEarlyItems}
              allItems={allItems}
              allTraits={allTraits}
              allChampions={allChampions}
              versionNumber={versionNumber}
              toggleArrayFilter={toggleArrayFilter}
              setSelectedSalidasEarly={setSelectedSalidasEarly}
              style={style}
            />
          </div>
        </div>
      )}

      {activeTab === 'objetos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginBottom: '8px' }}>
            <ComponentesCrafteables 
              softItemsList={softItemsList}
              selectedSalidasEarlyComponents={selectedSalidasEarlyComponents}
              setSelectedSalidasEarlyComponents={setSelectedSalidasEarlyComponents}
              toggleArrayFilter={toggleArrayFilter}
              allItems={allItems}
              style={style}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', marginBottom: '8px' }}>
            <ObjetosEspecificos 
              condicionesGrandeItems={condicionesGrandeItems}
              condicionesGrandeSinergias={condicionesGrandeSinergias}
              condicionesGrandeItemsGrouped={condicionesGrandeItemsGrouped}
              selectedSalidasEarlyItems={selectedSalidasEarlyItems}
              selectedSalidasEarlyComponents={selectedSalidasEarlyComponents}
              allItems={allItems}
              softItemsList={softItemsList}
              toggleArrayFilter={toggleArrayFilter}
              setSelectedSalidasEarlyItems={setSelectedSalidasEarlyItems}
              style={style}
            />
          </div>
        </div>
      )}

    </div>
  );
}
