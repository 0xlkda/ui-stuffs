// Define constants
const g = 9.81 // Acceleration due to gravity in m/s²
const initialVelocity = 0 // Initial velocity in m/s

// Time step in seconds
const timeStepInput = document.querySelector('input[name="timestep"]')
const heightInput = document.querySelector('input[name="height"]')

let timeStep = parseFloat(timeStepInput.value)
let height = parseFloat(heightInput.value)

function changeTimeStep(e) {
  timeStep = parseFloat(e.value)
  calculateTime()
}

function calculateTime() {
  height = parseFloat(heightInput.value)
  timeStep = parseFloat(timeStepInput.value)

  let velocity = initialVelocity
  let time = 0
  let steps = []

  // Simulate the motion
  while (height > 0) {
    // Calculate the new height and velocity using equations of motion
    const newHeight = height - (velocity * timeStep) - (0.5 * g * timeStep * timeStep)
    const newVelocity = velocity + g * timeStep

    // Update variables
    height = newHeight < 0 ? 0: newHeight
    velocity = newVelocity
    time += timeStep

    // Output the current state of the object
    steps.push(`
    <li>
      Time: ${time.toFixed(2)}s, Height: ${height.toFixed(2)}m, Velocity: ${velocity.toFixed(2)}m/s
    </li>
    `)
  }

  document.getElementById('result').innerHTML = steps.join('')
}

calculateTime(1000)
