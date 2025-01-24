import { SanitizedComponent, replaceVariables } from "./functions.jsx";
import style from "./tooltips.module.css"
const TooltipItem = ({desc = null, effects, name, nombre, isVisible}) => {
  return (
    <div
      className={`${style.tooltip} ${
        isVisible ? style.visible : style.hidden
      }`}>
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