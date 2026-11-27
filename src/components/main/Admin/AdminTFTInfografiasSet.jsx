import React, { useState } from 'react';
import style from './css/AdminTFTInfografiasSet.module.css';
import InfografiaCampeonesSet from '@components/Infografias/SetTFT/InfografiaCampeonesSet.jsx';

const SUB_TABS = [
  { id: 'campeones', label: 'Infografia Campeones' },
];

/**
 * Panel Admin → TFT → Infografias Set.
 * Agrupa las infografías del catálogo completo del set (Campeones, y futuras vistas del set).
 */
const AdminTFTInfografiasSet = () => {
  const [activeSubTab, setActiveSubTab] = useState('campeones');

  return (
    <div className={style.container}>
      <div className={style.subTabsBar} role="tablist" aria-label="Infografías del Set">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeSubTab === tab.id}
            className={`${style.subTabBtn} ${activeSubTab === tab.id ? style.subTabBtnActive : ''}`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={style.tabContent}>
        {activeSubTab === 'campeones' && <InfografiaCampeonesSet />}
      </div>
    </div>
  );
};

export default AdminTFTInfografiasSet;
