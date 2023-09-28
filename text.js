/** @type HTMLCanvasElement */
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let radians = degrees => degrees * (Math.PI / 180)
let rgba = (r, g, b, a = 1.0) => `rgba(${r}, ${g}, ${b}, ${a})`
let font = (family, size, { unit, style } = { unit: 'px', style: 'normal'}) =>
  `${style} ${size}${unit} ${family}`

canvas.width = 500
canvas.height = 500
canvas.style = 'border: 1px solid'

ctx.translate(250, 250)
ctx.scale(1, 1)
ctx.rotate(radians(45))

ctx.strokeStyle = rgba(0, 127, 0)
ctx.strokeRect(0, 0, 100, 100)
