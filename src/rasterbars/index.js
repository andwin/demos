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
  background(10, 9, 12)

  for (let i = 0; i < numberOfBars; i++) {
    const y = sin(frameCount * speed + i * dx) * amplitude + window.innerHeight / 2
    gradientRect(0, y, width, barHeight, color(255, 71, 218), color(143, 0, 114))
  }
}

const gradientRect = (x, y, w, h, color1, color2) => {
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, y, 0, y + h)

  gradient.addColorStop(0, color2)
  gradient.addColorStop(0.45, color1)
  gradient.addColorStop(0.55, color1)
  gradient.addColorStop(1, color2)

  ctx.fillStyle = gradient

  rect(x, y, w, h)
}
