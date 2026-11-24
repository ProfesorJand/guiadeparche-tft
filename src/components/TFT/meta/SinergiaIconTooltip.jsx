import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import style from "./css/SinergiaIconTooltip.module.css";

const SinergiaIconTooltip = ({ iconSrc = "", name = "", descHtml = "" }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const margin = 12;

    let left = triggerRect.left;
    let top = triggerRect.bottom + 10;

    if (left + tooltipRect.width + margin > vw) {
      left = Math.max(margin, vw - tooltipRect.width - margin);
    }
    if (top + tooltipRect.height + margin > vh) {
      top = Math.max(margin, triggerRect.top - tooltipRect.height - 10);
    }
    if (top < margin) top = margin;

    setPos({ top, left });
  }, [visible]);

  const hasDesc = Boolean(descHtml && String(descHtml).trim());

  return (
    <>
      <div
        ref={triggerRef}
        className={style.iconTrigger}
        onMouseEnter={() => {
          if (hasDesc) setVisible(true);
        }}
        onMouseLeave={() => setVisible(false)}
      >
        {iconSrc && (
          <img
            src={iconSrc}
            alt={name}
            className={style.traitIconImg}
            crossOrigin="anonymous"
          />
        )}
        {hasDesc && (
          <span className={style.hoverHint} aria-hidden="true">
            i
          </span>
        )}
      </div>

      {visible &&
        hasDesc &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className={style.tooltipCard}
            style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
          >
            <h4 className={style.tooltipTitle}>{name}</h4>
            <div
              className={style.tooltipDesc}
              dangerouslySetInnerHTML={{ __html: descHtml }}
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default SinergiaIconTooltip;
