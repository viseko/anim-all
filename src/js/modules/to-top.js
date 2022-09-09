import { animate } from "./helpers.js";

const selector = ".js-to-top";

function backToTop() {
  const currentPos = window.pageYOffset;

  animate({
    timing(t) {
      return t;
    },

    duration: 500,

    draw(progress) {
      window.scrollTo(0, currentPos - currentPos * progress);
    },
  });
}

const btns = document.querySelectorAll(selector);
btns.forEach((elem) => elem.addEventListener("click", backToTop));
