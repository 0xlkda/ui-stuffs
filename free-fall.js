// Define constants
const g = 9.81 // Acceleration due to gravity in m/s²
const initialHeight = 1000 // Initial height in meters
const initialVelocity = 0 // Initial velocity in m/s
const timeStep = 0.01 // Time step in seconds
const totalTime = 60 // Total simulation time in seconds

// 
let height = initialHeight
let velocity = initialVelocity
let time = 0

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
  console.log(`Time: ${time.toFixed(2)}s, Height: ${height.toFixed(2)}m, Velocity: ${velocity.toFixed(2)}m/s`)
}
