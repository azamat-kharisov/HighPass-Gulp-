export function serach() {
  const svgSearch = document.querySelector(".header__menu-search");
  const svgClose = document.querySelector(".header__menu-close");
  const input = document.querySelector(".header__menu-input");

  svgSearch.addEventListener("click", () => {
    if (!svgClose.classList.contains("menu-close-active")) {
      svgSearch.style.visibility = "hidden";
      svgSearch.style.display = "none";
      svgClose.classList.add("menu-close-active");
      input.classList.add("header__menu-input-active");
    }
  });

  svgClose.addEventListener("click", () => {
    if (svgClose.classList.contains("menu-close-active")) {
      svgSearch.style.visibility = "visible";
      svgSearch.style.display = "block";
      svgClose.classList.remove("menu-close-active");
      input.classList.remove("header__menu-input-active");
    }
  });
}


