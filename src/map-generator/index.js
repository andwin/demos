const size = 5
const noiseScale = 0.008
let t = 0.0
let graphics

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  graphics = createGraphics(window.innerWidth, window.innerHeight)
  graphics.noStroke()
}
window.onresize = setup

function draw() {
  t += 0.015

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      const noiseValue = noise(t + x * noiseScale, t * 0.5 - y * noiseScale)
      const c = colorForNoiseValue(noiseValue)
      graphics.fill(c)
      graphics.rect(x, y, size, size)
    }
  }

  image(graphics, 0, 0)
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
