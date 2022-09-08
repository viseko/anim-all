import { removeClass } from "./helpers.js";

const showStateClass = "_show";
const showPercentage = 0.1;
const targetElem = document.querySelector(".js-fixed-buttons");
let btnHidden = true;

const showOnScroll = () => {
  const screenHeight = document.documentElement.clientHeight;
  const scrollTop = window.pageYOffset;

  console.log(scrollTop > screenHeight * showPercentage);

  if (scrollTop > screenHeight * showPercentage && btnHidden) {
    targetElem.classList.add(showStateClass);
    btnHidden = false;
  }

  if (scrollTop <= screenHeight * showPercentage && !btnHidden) {
    removeClass(targetElem, showStateClass);
    btnHidden = true;
  }
};

document.addEventListener("scroll", showOnScroll);
