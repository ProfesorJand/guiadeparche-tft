import React from 'react';
import style from './tooltips.module.css';
import { urlDragon } from '@stores/dataTFT';
import { SanitizedComponent, formatChampionDescription } from './functions.jsx';

const TooltipCampeon = ({ campeon }) => {
  if (!campeon) return null;
  
  return (
    <div className={style.tooltipContent}>
      <div className={style.tooltipHeader}>
        <div className={style.tooltipImage}>
          <img src={`${urlDragon()}${campeon.icon?.replace(".tex", ".png").toLowerCase()}`} alt={campeon.name} />
        </div>
        <div className={style.tooltipTitle}>
          {campeon.name || "Campeón"}
        </div>
      </div>
      
      {campeon.ability && (
        <div className={style.abilityContainer}>
          <div className={style.abilityHeader}>
            <img 
              className={style.abilityIcon} 
              src={`${urlDragon()}${campeon.ability.icon?.replace(".tex", ".png").toLowerCase()}`} 
              alt={campeon.ability.name} 
            />
            <span className={style.abilityName}>{campeon.ability.name}</span>
          </div>
          <SanitizedComponent 
            htmlContent={formatChampionDescription(campeon.ability.desc, campeon.ability.variables)} 
          />
        </div>
      )}
    </div>
  );
};

export default TooltipCampeon;
