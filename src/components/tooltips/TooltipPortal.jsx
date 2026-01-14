import { createPortal } from "react-dom";

const TooltipPortal = ({ children }) => {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
};

export default TooltipPortal;
