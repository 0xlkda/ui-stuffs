function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFromZeroTo(value) {
  return randomRange(0, value)
}

function insertCss(rule) {
  document.styleSheets.item(0).insertRule(rule)
}

let initialized = false
let BADGE_CLASS = 'badge'
let BADGE_SELECTOR = `.${BADGE_CLASS}`

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

  initialized = true
}

function labeling(element, label, { left, top, right, bottom }) {
  if (!initialized) init()

  element.setAttribute("data-content", label)
  element.classList.add(BADGE_CLASS)

  if (element.label) {
    element.label.textContent = label
  } else {
    let unset = "unset"
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

const sample = () => {
  document.addEventListener('DOMContentLoaded', () => {
    let labels = ["50% OFF", "Best Sellings", "20% OFF"]
    let randomLabel = () => labels[randomFromZeroTo(labels.length - 1)]

    document
      .querySelectorAll(".element")
      .forEach(badge => {
        labeling(badge, randomLabel(), { left: 0, top: "-50%" })
      })
  })

  return `
    <style>
      .container {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      }

      .element {
        width: 100px;
        height: 56px;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>

    <div class="container">
      <div class="element">12 x 12</div>
      <div class="element">24 x 36</div>
      <div class="element">48 x 32</div>
    </div>
  `
}

export {
  sample,
  labeling
}


