import { SanitizedComponent, replaceVariables } from "./functions.jsx";
import style from "./tooltips.module.css";
import { urlDragon, dataTFTAllItems } from "@stores/dataTFT.js";
import { getLocalTftImage } from "@utils/images.js";
import { useStore } from "@nanostores/react";

const normalizeCompApi = (api = "") =>
  String(api).replace(/^DA_Component_/i, "TFT_Item_").toLowerCase();

const TooltipItem = ({
  desc_item = null,
  desc = null,
  desc_item_EN = null,
  effects,
  name,
  nombre,
  name_EN,
  icon,
  composition,
  compositionItems = null,
  tft_set = null,
}) => {
  const $dataTFTAllItems = useStore(dataTFTAllItems);
  const displayName = name || nombre || name_EN || "";
  const finalDesc = desc_item || desc || desc_item_EN || "";
  const iconVersion = tft_set ? String(tft_set) : undefined;

  return (
    <div className={style.tooltipContent}>
      <div className={style.tooltipHeader}>
        <div className={style.tooltipImageContainer}>
          <img className={style.tooltipImage} src={getLocalTftImage(icon, 'items', iconVersion)} alt={displayName} />
        </div>
        {
          composition?.length > 0 && 
          <div className={style.compositionItemContainer}>
            {composition.map((item, i) => {
              const compObj =
                (Array.isArray(compositionItems) ? compositionItems[i] : null) ||
                $dataTFTAllItems.find(
                  (data) =>
                    data.apiName === item ||
                    normalizeCompApi(data.apiName) === normalizeCompApi(item)
                );
              return (
                <img
                  key={i}
                  className={style.tooltipImage}
                  src={getLocalTftImage(compObj?.icon, 'items', iconVersion)}
                  alt={compObj?.name || item}
                />
              );
            })}
            </div>
        }
      </div>
      
      <div className={style.tooltipDataContainer}>
      <div className={style.tooltipTitle}>
        {displayName}
      </div>
      {name_EN && name_EN.toLowerCase() !== displayName.toLowerCase() && (
        <div className={style.tooltipSubtitle}>
          {name_EN}
        </div>
      )}

      {finalDesc && (
        <SanitizedComponent
          htmlContent={replaceVariables(finalDesc, effects)}
        />
      )}

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