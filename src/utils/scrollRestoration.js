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
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, parseInt(savedPosition));
    html.style.scrollBehavior = originalScrollBehavior;
  }
};