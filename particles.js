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
  return randomRange(1, 10)
}

function randomMass() {
  return randomRange(1, 10)
}

function update() {
  let particle = this

  particle.x += randomRange(-particle.mass, particle.mass) * 2
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

function animate() {
  ctx.fillStyle = 'rgba(255, 255, 255, .01)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle
      .update()
      .draw()
  })

  requestAnimationFrame(animate)
}

animate()
