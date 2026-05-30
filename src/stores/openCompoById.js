import { atom } from "nanostores";
import { activeCompId, toggleActiveComp } from "./menuFiltradoAdmin";

export const openCompoId = activeCompId;

export const setOpenCompo = toggleActiveComp;

export const selectedComposicion = atom(null);

export const scrollToComposicion = () => {
  activeCompId.subscribe((id, oldId) => {
    if (id) {
      // Esperar un poco más (350ms) para que el DOM se actualice por completo en Safari (iOS)
      // antes de ejecutar la animación de scroll. Si se hace al mismo tiempo, iOS corta el renderizado.
      setTimeout(() => {
        // Buscar el contenedor padre o el contenedor de la compo abierta
        // ya que el header (.ranking-header-seo) ahora está oculto
        const element = document?.querySelector(`.containerMetaTier[data-comp-id="${id}"]`);

        if (element) {
          const parentContainer = element.closest('.ranking-item-container') || element;
          const headerHtml = document?.getElementsByClassName("bodyHeader");
          const headerHeight = headerHtml[0] ? headerHtml[0].clientHeight : 0;

          // Hacer el scroll hacia el contenedor de la compo
          window.scrollTo({
            top: parentContainer.getBoundingClientRect().top + window.scrollY - headerHeight - 10,
            behavior: "smooth",
          });
        }
      }, 350);
    }
  });
};

scrollToComposicion();