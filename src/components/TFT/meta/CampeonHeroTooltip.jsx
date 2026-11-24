import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import style from "./css/CampeonHeroTooltip.module.css";

const CampeonHeroTooltip = ({
  name = "",
  cost = 1,
  champColor = "var(--color-text-highlight)",
  heroImgSrc = "",
  fallbackImgSrc = "",
  activeSet = "19",
  traits = [],
  role = "",
  range = null,
  manaInitial = 0,
  manaMax = 0,
  unlock = null,
  abilityName = "",
  abilityIconSrc = "",
  abilityDescHtml = "",
}) => {
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

    // Mostrar preferentemente a la derecha del retrato del campeón
    let left = triggerRect.right + 14;
    let top = triggerRect.top;

    if (left + tooltipRect.width + margin > vw) {
      left = Math.max(margin, triggerRect.left - tooltipRect.width - 14);
    }
    if (top + tooltipRect.height + margin > vh) {
      top = Math.max(margin, vh - tooltipRect.height - margin);
    }
    if (top < margin) top = margin;

    setPos({ top, left });
  }, [visible]);

  const hasTooltipContent = Boolean(abilityName || abilityDescHtml || role || unlock?.isUnlockable);

  return (
    <>
      <div
        ref={triggerRef}
        className={style.portraitTrigger}
        style={{ "--champ-color": champColor }}
        onMouseEnter={() => {
          if (hasTooltipContent) setVisible(true);
        }}
        onMouseLeave={() => setVisible(false)}
      >
        <img
          src={heroImgSrc}
          alt={`${name} TFT Set ${activeSet}`}
          className={style.portraitImg}
          onError={(e) => {
            if (fallbackImgSrc && e.currentTarget.src !== fallbackImgSrc) {
              e.currentTarget.src = fallbackImgSrc;
            }
          }}
        />
        <div className={style.costBadge}>{cost}</div>
        {hasTooltipContent && (
          <span className={style.hoverHint} aria-hidden="true">
            i
          </span>
        )}
      </div>

      {visible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className={style.tooltipCard}
            style={{
              "--champ-color": champColor,
              top: `${pos.top}px`,
              left: `${pos.left}px`,
            }}
          >
            <div className={style.cardHeader}>
              <h4 className={style.champName}>{name}</h4>
              <span className={style.costPill}>
                <span>{cost}</span>
                <span className={style.coinDot} />
              </span>
            </div>

            {traits.length > 0 && (
              <div className={style.traitsRow}>
                {traits.map((tr, idx) => (
                  <span key={`${tr.name}-${idx}`} className={style.traitChip}>
                    {tr.iconSrc && <img src={tr.iconSrc} alt={tr.name} />}
                    <span>{tr.name}</span>
                  </span>
                ))}
              </div>
            )}

            {unlock?.isUnlockable && (
              <div className={style.unlockBox}>
                <div className={style.unlockTitle}>Desbloquear:</div>
                {Array.isArray(unlock.conditions) && unlock.conditions.length > 0 ? (
                  <div>{unlock.conditions.join(" · ")}</div>
                ) : unlock.description ? (
                  <div>{unlock.description}</div>
                ) : null}
                {unlock.levelRequired && <div>Nivel {unlock.levelRequired}</div>}
              </div>
            )}

            {(role || range) && (
              <div className={style.roleRangeRow}>
                {role ? <span className={style.rolePill}>{role}</span> : <span />}
                {range ? <span className={style.rangeBadge}>Rango {range}</span> : null}
              </div>
            )}

            {(abilityName || abilityDescHtml) && (
              <>
                <div className={style.abilityHeader}>
                  <div className={style.abilityTitleGroup}>
                    {abilityIconSrc && (
                      <img
                        src={abilityIconSrc}
                        alt={abilityName || name}
                        className={style.abilityIcon}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <span className={style.abilityName}>
                      {abilityName || "Habilidad"}
                    </span>
                  </div>
                  {manaMax > 0 && (
                    <span className={style.manaBadge}>
                      {manaInitial}/{manaMax} Maná
                    </span>
                  )}
                </div>

                {abilityDescHtml && (
                  <div
                    className={style.abilityDesc}
                    dangerouslySetInnerHTML={{ __html: abilityDescHtml }}
                  />
                )}
              </>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default CampeonHeroTooltip;
