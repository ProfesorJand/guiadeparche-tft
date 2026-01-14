import { SanitizedComponent, replaceVariables } from "./functions.jsx";
import TooltipPortal from "./TooltipPortal";
import { useEffect, useRef, useState } from "react";
import style from "./tooltips.module.css"
const TooltipItem = ({desc = null, effects, name, nombre, isVisible}) => {
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let left = triggerRect.left;
    let top = triggerRect.bottom + 6;

    const viewportWidth = document.documentElement.clientWidth;
    const margin = 8;

    // 👉 si se sale a la derecha
    if (left + tooltipRect.width + margin > viewportWidth) {
      left = triggerRect.right - tooltipRect.width;
    }

    // 👉 clamp final
    if (left < margin) left = margin;

    setPos({ top, left });
  }, [isVisible]);

  return (
    <>
      {/* elemento "ancla" invisible */}
      <span ref={triggerRef} />

      {isVisible && (
        <TooltipPortal>
          <div
            ref={tooltipRef}
            className={`${style.tooltip} ${style.visible}`}
            style={{
              position: "fixed",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
            }}
          >
            <div className={style.tooltipTitle}>
              {name || nombre}
            </div>

            <SanitizedComponent
              htmlContent={replaceVariables(desc, effects)}
            />

            {effects &&
              Object.keys(effects).map((variable, i) => (
                <div key={i} className={style.effects}>
                  <span className={style.variableName}>{variable}</span>:{" "}
                  <span>{effects[variable]}</span>
                </div>
              ))}
          </div>
        </TooltipPortal>
      )}
    </>
  );
};

export default TooltipItem;