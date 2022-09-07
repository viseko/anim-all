const defaultColor = "rgb(46, 73, 96)";

const fillButton = (options) => {
  const { btn, top, bottom, bottomOffset } = options;

  const bgContrast = btn.querySelector(".contrastable-btn__bg--contrast");

  if (top === "contrast") {
    bgContrast.style.top = "0px";
    bgContrast.style.bottom = "unset";
    bgContrast.style.height = bottomOffset ? `${bottomOffset}px` : "100%";

    if (bottom === "default") {
      bgContrast.style.height = bottomOffset ?
        `calc(100% - ${bottomOffset}px)` :
        "0";
    }
  } else {
    bgContrast.style.top = "unset";
    bgContrast.style.bottom = "0px";
    bgContrast.style.height = bottomOffset ? `${bottomOffset}px` : "0";
  }
};

const checkCoords = (options) => {
  const { btn, topY, bottomY } = options;

  // 1. Определение фоновых секций снизу и сверху
  const topSection = document
    .elementFromPoint(10, topY)
    .closest("section, footer");

  const bottomSection = document
    .elementFromPoint(10, bottomY)
    .closest("section, footer");

  // 2. Если верхняя === нижняя:
  if (topSection === bottomSection) {
    // -- 2.1. Определяем контраст или дефолт
    const sectionColor = getComputedStyle(topSection).backgroundColor;
    const isContrast = sectionColor === defaultColor;
    const color = isContrast ? "contrast" : "default";

    // -- 2.2. Перекрашиваем кнопку в соответствующую заливку
    fillButton({
      btn,
      top: color,
      bottom: color,
      bottomOffset: 0,
    });
  } else {
    // 3. Если верхняя !== нижняя:
    // -- 3.1. Определяем цвета обеих
    const topSectionColor = getComputedStyle(topSection).backgroundColor;
    const bottomSectionColor = getComputedStyle(bottomSection).backgroundColor;

    if (topSectionColor === bottomSectionColor) {
      // -- 3.2. Цвета равны? --> Определяем, контрастный или нет
      // -- -- 3.2.1. Перекрашиваем кнопку в соотв. заливку
      const isContrast = topSectionColor === defaultColor;
      const color = isContrast ? "contrast" : "default";

      fillButton({
        btn,
        top: color,
        bottom: null,
        bottomOffset: 0,
      });
    } else {
      // -- 3.3. Цвета не равны? --> Определяем, насколько выступает нижний элемент
      // -- -- 3.3.1. Меняем высоту и положение фонов в зависимости от выбранного цвета и порога заступа
      const bottomSectionTop = bottomSection.getBoundingClientRect().top;
      const offset = bottomY - bottomSectionTop;
      const topColorStyle =
        topSectionColor === defaultColor ? "contrast" : "default";
      const bottomColorStyle =
        bottomSectionColor === defaultColor ? "contrast" : "default";

      fillButton({
        btn,
        top: topColorStyle,
        bottom: bottomColorStyle,
        bottomOffset: offset,
      });
    }
  }
};

const initBtn = (btn) => {
  // Определяем координаты и ширину кнопки
  const btnHeight = btn.offsetHeight;
  const topY = btn.getBoundingClientRect().top;
  const bottomY = topY + btnHeight;

  // Опции, передаваемые в checkCoords
  const options = {
    btn,
    topY,
    bottomY,
  };

  // checkCoords(options); <--- не уверен, что это нужно
  // !-- возможно потребуется debounce
  document.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
      checkCoords(options);
    });
  });
};

const btns = document.querySelectorAll(".js-contrastable-btn");
btns.forEach(initBtn);
