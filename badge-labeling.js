function insertCss(rule) {
  document.styleSheets.item(0).insertRule(rule)
}

let BADGE_CLASS = 'badge'
let BADGE_SELECTOR = `.${BADGE_CLASS}`

let unset = "unset"
let defaultOpts = { left: unset, top: unset, right: unset, bottom: unset }

init()
function init() {
  insertCss(`
  ${BADGE_SELECTOR} {
    position: relative;
  }
`)

  insertCss(`
  ${BADGE_SELECTOR} .label {
    content: attr(data-content);
    position: absolute;
  }
`)
}

function labeling(element, label, { left, top, right, bottom } = defaultOpts) {
  element.classList.add(BADGE_CLASS)

  if (element.label) {
    element.label.textContent = label
  } else {
    let labelElement = document.createElement('span')
    labelElement.classList.add("label")
    labelElement.textContent = label
    labelElement.style.left = left ?? unset
    labelElement.style.top = top ?? unset
    labelElement.style.right = right ?? unset
    labelElement.style.bottom = bottom ?? unset

    element.label = labelElement
    element.prepend(labelElement)
  }
}

export {
  labeling
}
