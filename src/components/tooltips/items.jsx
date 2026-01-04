import { SanitizedComponent, replaceVariables } from "./functions.jsx";
import { useEffect, useRef } from "react";
import style from "./tooltips.module.css"
const TooltipItem = ({desc = null, effects, name, nombre, isVisible}) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const rect = tooltip.getBoundingClientRect();

    if (rect.right > window.innerWidth) {
      tooltip.classList.add(style.left);
    } else {
      tooltip.classList.remove(style.left);
    }
  }, [isVisible]);

  return (
    <div
      ref={tooltipRef}
      className={`${style.tooltip} ${
        isVisible ? style.visible : style.hidden
      }`}
    >
      <div className={style.tooltipTitle}>
        {name || nombre}
      </div>
      <SanitizedComponent
        htmlContent={replaceVariables(desc, effects)}
      />
      {effects && Object.keys(effects).length > 0 &&
        Object.keys(effects).map((variable, i) => {
          return (
            <div key={i} className={style.effects}>
              <span className={style.variableName}>{variable}</span> :{" "}
              <span>{effects[variable]}</span>
            </div>
          );
        })}
    </div>
  )
}

export default TooltipItem;