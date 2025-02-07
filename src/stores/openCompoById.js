import { atom } from "nanostores";

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
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerHtml = document.getElementsByClassName("bodyHeader");
          const headerHeight = headerHtml[0].clientHeight
          window.scrollTo({
            top: element.getBoundingClientRect().y + scrollY - headerHeight, //+ element.getBoundingClientRect().y - headerHeight,
            behavior: "smooth",
          });
        }
      }, 150);
    }
  });
};