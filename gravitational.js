// Define the Gravitational Constant (G)
const G = 6.67430e-11 // Gravitational Constant in m^3/kg/s^2

// Define the masses of the objects (in kilograms)
const m1 = 5.972e24 // Mass of the Earth
const m2 = 7.342e22 // Mass of the Moon

// Define the distance between the objects (in meters)
const r = 384400000 // Distance from the Earth to the Moon

// Calculate the gravitational force
const gravitationalForce = (G * m1 * m2) / (r * r)

console.log(`
The gravitational force between the Earth and the Moon is approximately:
${gravitationalForce.toExponential(2)} Newtons.
`)
