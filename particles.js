let canvas = document.getElementById('view')

/** @type CanvasRenderingContext2D */
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

function randomSize() {
  return randomRange(1, 100)
}

function randomMass() {
  return randomRange(1, 10)
}

function update() {
  let particle = this

  particle.x += randomRange(-particle.mass, particle.mass) * .2
  particle.y -= particle.mass

  if (particle.y < 0) {
    particle.y = canvas.height
    particle.x = randomRange(0, canvas.width)
    particle.size = randomSize()
  }

  return particle
}

function draw() {
  let particle = this
  ctx.fillStyle = particle.rgba
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}

function drawImage(image) {
  let particle = this
  ctx.drawImage(image, particle.x, particle.y, particle.size, particle.size)
}


function makeParticle() {
  let particle = {
    x: randomRange(0, canvas.width),
    y: randomRange(0, canvas.height),
    size: randomSize(),
    mass: randomMass(),
    rgba: `rgba(${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0.1, 1)})`
  }

  particle.update = update 
  particle.draw = draw 
  particle.drawImage = drawImage 

  return particle
}

function makeParticles(count) {
  let particles = []
  for (let index = 0; index < count; index++) {
    particles.push(makeParticle())
  }
  return particles
}

let particles = makeParticles(100)
let image = document.createElement('img')
image.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGJhc2VQcm9maWxlPSJiYXNpYyIgdmlld0JveD0iMCAwIDEwMCAxMDAiPjxjaXJjbGUgY3g9IjUyIiBjeT0iNTIiIHI9IjQ0IiBvcGFjaXR5PSIuMzUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NCIgZmlsbD0iI2YyZjJmMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjM3LjUiIGZpbGw9IiM3MGJmZmYiLz48cGF0aCBmaWxsPSIjZDllZWZmIiBkPSJNMjMsNTNjLTEuNjU3LDAtMy0xLjM0My0zLTNjMC0xNi41NDIsMTMuNDU4LTMwLDMwLTMwYzEuNjU3LDAsMywxLjM0MywzLDNzLTEuMzQzLDMtMywzCWMtMTMuMjMzLDAtMjQsMTAuNzY3LTI0LDI0QzI2LDUxLjY1OCwyNC42NTcsNTMsMjMsNTN6Ii8+PHBhdGggZmlsbD0iIzQwMzk2ZSIgZD0iTTUwLDg5Yy0yMS41MDUsMC0zOS0xNy40OTUtMzktMzlzMTcuNDk1LTM5LDM5LTM5czM5LDE3LjQ5NSwzOSwzOVM3MS41MDUsODksNTAsODl6IE01MCwxNAlDMzAuMTQ5LDE0LDE0LDMwLjE1LDE0LDUwczE2LjE0OSwzNiwzNiwzNnMzNi0xNi4xNDksMzYtMzZTNjkuODUxLDE0LDUwLDE0eiIvPjwvc3ZnPg=="

function animate() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle
      .update()
      .drawImage(image)
  })

  requestAnimationFrame(animate)
}

animate()
