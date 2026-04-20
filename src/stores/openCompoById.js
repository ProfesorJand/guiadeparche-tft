import { atom } from "nanostores";
import { activeCompId } from "./menuFiltradoAdmin";

export const openCompoId = atom(null);

export const setOpenCompo = (id) => {
  if (openCompoId.get() === id) {
    openCompoId.set(null); // Si es el mismo, lo cerramos
  } else {
    openCompoId.set(id);
  }
};

export const selectedComposicion = atom(null);

export const scrollToComposicion = () => {
  openCompoId.subscribe((id, oldId) => {
    if (id) {
      // Abrir la composición después de terminar el scroll 
      setTimeout(() => {
        activeCompId.set(id);
      }, 150);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerHtml = document.getElementsByClassName("bodyHeader");
          const headerHeight = headerHtml[0].clientHeight;
          
          window.scrollTo({
            top: element.getBoundingClientRect().y + scrollY - headerHeight,
            behavior: "smooth",
          });

          
        }
      }, 550);
      
    }
  });
};

scrollToComposicion();