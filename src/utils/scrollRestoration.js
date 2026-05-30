export const saveScrollPosition = () => {
  sessionStorage.setItem(
    "tft-scroll-position",
    window.scrollY.toString()
  );
};

export const restoreScrollPosition = () => {
  const savedPosition = sessionStorage.getItem(
    "tft-scroll-position"
  );

  if (savedPosition) {
    window.scrollTo(0, parseInt(savedPosition));
  }
};