import { getElemFromPoint, mathElemBackground } from "./helpers.js";

const defaultColor = "#2e4960";

const getSectionType = (section) => {
  return mathElemBackground(section, defaultColor) ? "contrast" : "default";
};

const fillButton = (options) => {
  const { btn, top, bottom, offset } = options;

  const bgContrast = btn.querySelector(".contrastable-btn__bg--contrast");

  if (top === "contrast") {
    bgContrast.style.top = "0px";
    bgContrast.style.bottom = "unset";
    bgContrast.style.height = offset ? `${offset}px` : "100%";

    if (bottom === "default") {
      bgContrast.style.height = offset ? `calc(100% - ${offset}px)` : "0";
    }
  } else {
    bgContrast.style.top = "unset";
    bgContrast.style.bottom = "0px";
    bgContrast.style.height = offset ? `${offset}px` : "0";
  }
};

const btnScrollFill = (btn) => {
  // Определяем координаты и ширину кнопки
  const btnHeight = btn.offsetHeight;
  const topY = btn.getBoundingClientRect().top;
  const bottomY = topY + btnHeight;

  // 1. Определение фоновых секций снизу и сверху
  const topSection = getElemFromPoint(10, topY, "section, footer");
  const bottomSection = getElemFromPoint(10, bottomY, "section, footer");

  if (!topSection && !bottomSection) {
    return;
  }

  // 2. Определяем контрастность цветов секции
  const topSectionType = getSectionType(topSection);
  const bottomSectionType = getSectionType(bottomSection);
  let offset = 0;

  // Если цвета не равны, вычисляем порох заступа нижней секции
  if (topSectionType !== bottomSectionType) {
    const bottomSectionTop = bottomSection.getBoundingClientRect().top;
    offset = bottomY - bottomSectionTop;
  }

  // Закрашиваем кнопку
  fillButton({
    btn,
    offset,
    top: topSectionType,
    bottom: bottomSectionType,
  });
};

const initBtn = (btn) => {
  btnScrollFill(btn);

  document.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
      btnScrollFill(btn);
    });
  });
};

const btns = document.querySelectorAll(".js-contrastable-btn");
btns.forEach(initBtn);
