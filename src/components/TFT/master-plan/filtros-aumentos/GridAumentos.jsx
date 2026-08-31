import React from 'react';
import ImgAugment from "@components/TFT/ImgAugment";
import { getLocalTftImage } from '@utils/images';

export default function GridAumentos({
  selectedAugmentTiers,
  opEarlyAugmentsMap,
  dbAumentos,
  sortAugmentsByName,
  sortAugmentsByCount,
  selectedSmallCats,
  earlyHighlightedAugments,
  selectedHardAugments,
  toggleArrayFilter,
  setSelectedHardAugments,
  allChampions,
  versionNumber,
  style
}) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'repeat(auto-fit, 1fr)', gap: '5px' }}>
      {['Plata', 'Oro', 'Prismatico', 'Otros'].map(tierName => {
        if (selectedAugmentTiers.length > 0 && !selectedAugmentTiers.includes(tierName)) {
          return null;
        }

        const augsInTier = opEarlyAugmentsMap.filter(aug => {
          let augTier = (dbAumentos[aug.apiName]?.categoria_tier || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

          if (tierName === "Otros") {
            return augTier !== "plata" && augTier !== "oro" && augTier !== "prismatico";
          }

          const normalizedTierName = tierName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return augTier === normalizedTierName;
        });

        if (augsInTier.length === 0) return null;

        augsInTier.sort((a, b) => {
          if (sortAugmentsByName) {
            const alphaSort = (a.name || "").localeCompare(b.name || "");
            return sortAugmentsByName === 'A-Z' ? alphaSort : -alphaSort;
          }
          if (sortAugmentsByCount) {
            const diff = (a.appearCount || 0) - (b.appearCount || 0);
            return sortAugmentsByCount === 'ASC' ? diff : -diff;
          }
          return (b.appearCount || 0) - (a.appearCount || 0) || (a.name || "").localeCompare(b.name || "");
        });

        return (
          <div key={tierName} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.15)', padding: '10px', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
              {augsInTier.map(aug => {
                let isGrayedOut = false;

                if (selectedSmallCats.length > 0) {
                  const augCatsPequenas = dbAumentos[aug.apiName]?.categoria_pequeno || [];
                  isGrayedOut = !selectedSmallCats.some(sc => augCatsPequenas.includes(sc));
                }

                const isEarlyHighlighted = earlyHighlightedAugments.has(aug.apiName);
                const isSelected = selectedHardAugments.some(a => a.apiName === aug.apiName);
                const champ = (dbAumentos[aug.apiName]?.categoria_grande === "Heroe" && aug.championApiName)
                  ? allChampions.find(c => c.apiName === aug.championApiName)
                  : null;

                return (
                  <div
                    key={aug.apiName}
                    onClick={() => toggleArrayFilter(setSelectedHardAugments, aug)}
                    title={aug.name}
                    className={isEarlyHighlighted && !isSelected ? style.earlyHighlightPulse : ''}
                    style={{
                      cursor: 'pointer',
                      opacity: isGrayedOut ? 0.3 : 1,
                      filter: isGrayedOut ? 'grayscale(100%)' : 'none',
                      border: isSelected ? '2px solid #ffcc00' : '2px solid transparent',
                      borderRadius: '6px',
                      padding: '6px 4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      background: isSelected ? 'rgba(255, 204, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.2s ease',
                      gap: '6px'
                    }}
                  >
                    <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ImgAugment augment={aug} width={40} height={40} />
                      {champ && (champ.img || champ.tileIcon) && (
                        <img
                          src={getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber)}
                          alt={champ.name}
                          style={{
                            position: 'absolute',
                            top: '-4px',
                            left: '-4px',
                            width: '30px',
                            height: '30px',
                            objectFit: 'contain',
                            borderRadius: '4px',
                            border: '1px solid #ffcc00',
                            backgroundColor: 'rgba(0,0,0,0.8)'
                          }}
                        />
                      )}
                      {aug.appearCount > 0 && (
                        <div style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.85)',
                          color: '#ffcc00',
                          border: '1px solid #ffcc00',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          zIndex: 2
                        }}>
                          {aug.appearCount}
                        </div>
                      )}
                      {aug.isOp && (
                        <div style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          backgroundColor: aug.isOpm ? '#ff4500' : '#ff9d00',
                          color: 'white',
                          borderRadius: '4px',
                          padding: '1px 3px',
                          fontSize: '0.60rem',
                          fontWeight: 'bold',
                          zIndex: 3,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                        }}>
                          {aug.isOpm ? 'OPM' : 'OP'}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '1rem', textAlign: 'center', lineHeight: '1.2', wordBreak: 'break-word', color: isSelected ? '#ffcc00' : '#ddd' }}>
                      {aug.name}{champ ? ` + ${champ.name}` : ''}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
}
