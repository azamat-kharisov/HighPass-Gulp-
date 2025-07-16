const burgerBtn = document.querySelector(".header__submenu-btn");

export function burger() {
  burgerBtn.addEventListener("click", () => {
    document.querySelector(".header__submenu").classList.toggle("open");
    document.body.classList.toggle("overflow");
  });
}
