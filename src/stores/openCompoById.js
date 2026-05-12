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
      // 1. Abrimos la compo inmediatamente para feedback rápido
      activeCompId.set(id);

      // 2. Esperar un instante para que el DOM se actualice (la compo se abra)
      setTimeout(() => {
        // Buscar el contenedor padre o el contenedor de la compo abierta
        // ya que el header (.ranking-header-seo) ahora está oculto
        const element = document.querySelector(`.containerMetaTier[data-comp-id="${id}"]`);
        
        if (element) {
          const parentContainer = element.closest('.ranking-item-container') || element;
          const headerHtml = document.getElementsByClassName("bodyHeader");
          const headerHeight = headerHtml[0] ? headerHtml[0].clientHeight : 0;

          // Hacer el scroll hacia el contenedor de la compo
          window.scrollTo({
            top: parentContainer.getBoundingClientRect().top + window.scrollY - headerHeight - 10,
            behavior: "smooth",
          });
        }
      }, 150);
    } else {
      // Si el id es null (el usuario des-seleccionó haciendo click en el mismo de nuevo)
      activeCompId.set(null);
    }
  });
};

scrollToComposicion();