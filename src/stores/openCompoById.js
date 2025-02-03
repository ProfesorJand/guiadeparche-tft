import { atom } from "nanostores";

export const openCompoId = atom(null);

export const setOpenCompo = (id) => {
  console.log("setOpenCompo",id)
  openCompoId.set(id);
};

export const selectedComposicion = atom(null);

export const scrollToComposicion = () => {
  console.log({openCompoId222:openCompoId})
  openCompoId.subscribe((id, oldId) => {
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        console.log({element:element.offsetTop})
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: "smooth",
          });
        }
      }, 150);
    }
  });
};