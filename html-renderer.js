export function defaultRender({ tagName, attributes, content }) {
  return `<${tagName} ${attributesToString(attributes)}>${escapeText(content)}</${tagName}>`
}

function escapeText(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr(attr) {
  return attr.replace(/"/g, '&quot;')
}

function attributesToString(attributes) {
  const result = []
  for (const attr in attributes) {
    const val = attributes[attr] + ''
    result.push(`${attr}="${escapeAttr(val)}"`)
  }
  return result.join(' ')
}
