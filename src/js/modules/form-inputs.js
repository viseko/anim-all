const formInputs = document.querySelectorAll(".form-input");
const visibleClass = "_visible";

function addVisible(elem) {
  elem.classList.add(visibleClass);
  elem.setAttribute("tabindex", "0");
}

function removeVisible(elem) {
  elem.classList.remove(visibleClass);
  elem.setAttribute("tabindex", "-1");
}

function addTextFieldHandler(component) {
  const input = component.querySelector("input");
  const clearBtn = component.querySelector("button");

  const checkValue = () => {
    if (input.value.length > 0) {
      addVisible(clearBtn);
    } else {
      removeVisible(clearBtn);
    }
  };

  const clearField = () => {
    input.value = "";
    removeVisible(clearBtn);
    input.focus();
  };

  checkValue();

  input.addEventListener("input", checkValue);

  clearBtn.addEventListener("click", clearField);
}

function addFileFieldHandler(component) {
  const input = component.querySelector("input");
  const pseudoField = component.querySelector(".form-input__file");
  const placeholder = component.querySelector(".form-input__file");

  input.addEventListener("change", () => {
    const file = input.files[0];

    if (file) {
      placeholder.innerHTML = "";
      pseudoField.innerHTML = file.name;
    }
  });
}

function selectHandler(component) {
  const type = component.querySelector("input").getAttribute("type");
  const handlers = {
    text: addTextFieldHandler,
    file: addFileFieldHandler,
  };

  handlers[type](component);
}

formInputs.forEach(selectHandler);
