export function removeClass(elem, className) {
  if (elem.classList.length === 1) {
    elem.removeAttribute("class");
  } else {
    elem.classList.remove(className);
  }
}
