import { removeClass } from "./helpers.js";

const menuBtnClass = "js-menu-btn";
const menuStateClass = "_menu-open";
let isMenuOpened = false;

function menuBtnHandler() {
  isMenuOpened = !isMenuOpened;

  if (isMenuOpened) {
    document.body.classList.add(menuStateClass);
  } else {
    removeClass(document.body, menuStateClass);
  }
}

document.querySelectorAll(`.${menuBtnClass}`).forEach((menuBtn) => {
  menuBtn.addEventListener("click", menuBtnHandler);
});
