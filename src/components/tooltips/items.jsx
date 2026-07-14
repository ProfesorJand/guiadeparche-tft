import { SanitizedComponent, replaceVariables } from "./functions.jsx";
import style from "./tooltips.module.css";
import { urlDragon, dataTFTAllItems } from "@stores/dataTFT.js";
import { getLocalTftImage } from "@utils/images.js";
import { useStore } from "@nanostores/react";

const TooltipItem = ({desc_item = null, effects, name, nombre, icon, composition}) => {
  const $dataTFTAllItems = useStore(dataTFTAllItems);
  console.log({icon})
  return (
    <div className={style.tooltipContent}>
      <div className={style.tooltipHeader}>
        <div className={style.tooltipImageContainer}>
          <img className={style.tooltipImage} src={getLocalTftImage(icon, 'items')} alt={name} />
        </div>
        {
          composition?.length > 0 && 
          <div className={style.compositionItemContainer}>
            {composition.map((item, i) => (
              <img key={i} className={style.tooltipImage} src={getLocalTftImage($dataTFTAllItems.find((data)=>data.apiName === item)?.icon, 'items')} alt={item} />
            ))}
            </div>
        }
      </div>
      
      <div className={style.tooltipDataContainer}>
      <div className={style.tooltipTitle}>
        {name || nombre}
      </div>

      <SanitizedComponent
        htmlContent={replaceVariables(desc_item, effects)}
        />

      {/* {effects &&
        Object.keys(effects).map((variable, i) => (
          <div key={i} className={style.effects}>
          <span className={style.variableName}>{variable}</span>:{" "}
          <span>{effects[variable]}</span>
          </div>
          ))} */}
      </div>
    </div>
  );
};

export default TooltipItem;