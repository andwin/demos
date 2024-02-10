const numberOfBars = 8
const speed = 0.02
const dx = 0.5
let amplitude
let barHeight

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  amplitude = window.innerHeight / 8
  barHeight = window.innerHeight / numberOfBars / 2
}
window.onresize = setup

function draw() {
  background('#6F9CDE')
  fill(255)

  for (let i = 0; i < numberOfBars; i++) {
    // yValues[i] = random(window.innerHeight)
    // yValues[i] = map(sin(frameCount * 0.05 + i * 0.5), -1, 1, 0, window.innerHeight)
    // const x = i * window.innerWidth / numberOfBars
    const y = sin(frameCount * speed + i * dx) * amplitude + window.innerHeight / 2

    rect(0, y, width, barHeight)
  }
}
