import { SanitizedComponent, replaceVariables } from "./functions.jsx";
import style from "./tooltips.module.css";
import { getLocalTftImage } from "@utils/images.js";
import { useStore } from '@nanostores/react';
import { versionTFT, setNumberLatest, setNumberPBE } from '@stores/dataTFT';

const TooltipAugment = ({ augment }) => {
  const version = useStore(versionTFT);
  const versionNumber = version === "latest" ? setNumberLatest : setNumberPBE;

  if (!augment) return null;
  const { name, nombre, name_EN, name_en, icon, desc, desc_item, effects } = augment;

  const displayName = name || nombre || name_EN || name_en || "";
  const englishName = name_EN || name_en || "";
  const description = desc || desc_item;

  return (
    <div className={style.tooltipContent}>
      <div className={style.tooltipImageContainer}>
        {icon && (
          <img 
            className={style.tooltipImage} 
            src={getLocalTftImage(icon, 'augments/choiceui', versionNumber)} 
            alt={displayName} 
          />
        )}
      </div>
      
      <div className={style.tooltipDataContainer}>
        <div className={style.tooltipTitle}>
          {displayName}
        </div>
        {englishName && englishName.toLowerCase() !== displayName.toLowerCase() && (
          <div className={style.tooltipSubtitle}>
            {englishName}
          </div>
        )}

        {description && (
          <SanitizedComponent
            htmlContent={replaceVariables(description, effects)}
          />
        )}
      </div>
    </div>
  );
};

export default TooltipAugment;
