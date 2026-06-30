import React from 'react';
import style from './tooltips.module.css';

const TooltipDefault = ({ text }) => {
  if (!text) return null;
  return (
    <div className={`${style.tooltipContent}`}>
      <span>{Array.isArray(text) ? text.filter(item => item && String(item).trim() !== "").join(" + ") : text}</span>
    </div>
  );
};

export default TooltipDefault;
