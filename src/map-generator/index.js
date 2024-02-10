const xSpeed = 2
const ySpeed = 1

const noiseScale = 0.008
let t = 0.0
let graphics1
let graphics2

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  graphics1 = createGraphics(window.innerWidth, window.innerHeight)
  graphics2 = createGraphics(window.innerWidth, window.innerHeight)
  graphics1.noStroke()
  graphics2.noStroke()

  initGraphics(graphics2)
}
window.onresize = setup

function draw() {
  t += 0.015

  graphics1.image(graphics2, -xSpeed, ySpeed)

  for (let x = 0; x < width; x++) {
    drawPixel(graphics1, x, 0)
  }
  for (let x = width - xSpeed; x < width; x++) {
    for (let y = 0; y < height; y++) {
      drawPixel(graphics1, x, y)
    }
  }
  graphics1.updatePixels()

  graphics2.image(graphics1, 0, 0)
  image(graphics2, 0, 0)
}

const initGraphics = (gfx) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      drawPixel(gfx, x, y)
    }
  }
  gfx.updatePixels()
}

const drawPixel = (gfx, x, y) => {
  const noiseValue = noise(t + x * noiseScale, t * 0.5 - y * noiseScale)

  const c = colorForNoiseValue(noiseValue)
  gfx.set(x, y, c)
}

const colorForNoiseValue = (noiseValue) => {
  switch (true) {
    case (noiseValue < 0.3): // deep water
      return color(87, 87, 171)
    case (noiseValue < 0.4): // shallow water
      return color(115, 115, 255)
    case (noiseValue < 0.45): // beach
      return color(240, 211, 158)
    case (noiseValue < 0.5): // grass
      return color(101, 235, 134)
    case (noiseValue < 0.6): // wood
      return color(72, 138, 89)
    case (noiseValue < 0.80): // mountain
      return color(200, 200, 200)
    default: // snow
      return color(255)
  }
}
