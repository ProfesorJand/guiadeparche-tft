import { SanitizedComponent, replaceVariables } from "./functions.jsx";
import style from "./tooltips.module.css";
import { getLocalTftImage } from "@utils/images.js";

const TooltipAugment = ({ augment }) => {
  if (!augment) return null;
  const { name, nombre, icon, desc, desc_item, effects } = augment;

  const description = desc || desc_item;

  return (
    <div className={style.tooltipContent}>
      <div className={style.tooltipImageContainer}>
        {icon && (
          <img 
            className={style.tooltipImage} 
            src={getLocalTftImage(icon, 'augments/choiceui')} 
            alt={name || nombre} 
          />
        )}
      </div>
      
      <div className={style.tooltipDataContainer}>
        <div className={style.tooltipTitle}>
          {name || nombre}
        </div>

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
