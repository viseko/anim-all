// Remove class or class attrubute
export function removeClass(elem, className) {
  if (elem.classList.length === 1) {
    elem.removeAttribute("class");
  } else {
    elem.classList.remove(className);
  }
}

// Search by selector from point
export function getElemFromPoint(x, y, selector) {
  const elem = document.elementFromPoint(x, y);

  if (elem) {
    return elem.closest(selector);
  }

  return null;
}

// Convert RGB to hex
export function rgbToHex(rgbString) {
  const regex = /\d{1,3},\s*\d{1,3},\s*\d{1,3}/;
  const rgb = rgbString.match(regex);

  if (!rgb) {
    throw new Error(`String "${rgbString}" is not RGB-value.`);
  }

  const [red, green, blue] = rgb[0].replace(/\s/g, "").split(",");

  return [red, green, blue]
    .map((val) => parseInt(val).toString(16).padStart(2, 0))
    .join("")
    .replace(/^/, "#");
}

// Checking if an element's background matches
export function mathElemBackground(elem, color) {
  const backgroundColor = rgbToHex(getComputedStyle(elem).backgroundColor);
  return backgroundColor === color;
}
