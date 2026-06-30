import React, { useState, useRef, useEffect } from "react";
import TooltipPortal from "./TooltipPortal";
import TooltipItem from "./items";
import TooltipCampeon from "./campeon";
import TooltipDefault from "./default";
import style from "./tooltips.module.css";

const Tooltip = ({ type = "default", text, item, campeon, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
    let top = triggerRect.top - tooltipRect.height - 5; // 5px por encima

    const viewportWidth = document.documentElement.clientWidth;
    const margin = 8;

    // 👉 si se sale a la derecha
    if (left + tooltipRect.width + margin > viewportWidth) {
      left = viewportWidth - tooltipRect.width - margin;
    }
    // 👉 clamp final
    if (left < margin) left = margin;

    // 👉 si no cabe arriba, ponerlo abajo
    if (top < margin) {
      top = triggerRect.bottom + 5;
    }

    setPos({ top, left });
  }, [isVisible]);

  // Si children no es un elemento de React válido, lo envolvemos en un span
  const child = React.isValidElement(children) ? React.Children.only(children) : <span>{children}</span>;

  // Clonamos el hijo para inyectarle el ref y los eventos de mouse sin crear un div extra
  const clonedChild = React.cloneElement(child, {
    ref: triggerRef,
    onMouseEnter: (e) => {
      setIsVisible(true);
      if (child.props.onMouseEnter) child.props.onMouseEnter(e);
    },
    onMouseLeave: (e) => {
      setIsVisible(false);
      if (child.props.onMouseLeave) child.props.onMouseLeave(e);
    }
  });

  return (
    <>
      {clonedChild}

      {isVisible && (
        <TooltipPortal>
          <div
            ref={tooltipRef}
            className={`${style.tooltip} ${style.visible} ${type==="default" ? style.defaultContent : ""}`}
            style={{
              position: "fixed",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
            }}
          >
            {type === "item" && item && <TooltipItem {...item} />}
            {type === "campeon" && campeon && <TooltipCampeon campeon={campeon} />}
            {type === "default" && text && <TooltipDefault text={text} />}
          </div>
        </TooltipPortal>
      )}
    </>
  );
};

export default Tooltip;
