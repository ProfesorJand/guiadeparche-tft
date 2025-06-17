import { useEffect } from "react";

export default function Redirect({to}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(to); // Redirección sin guardar historial
    }
  }, [to]);

  return null;
}
