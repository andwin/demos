import p5 from 'p5'

const xSpeed = 2
const ySpeed = 1

const noiseScale = 0.008
let t = 100.0
let graphics

let colors

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)

  graphics = createGraphics(window.innerWidth, window.innerHeight)
  graphics.noStroke()

  const deepWater = color('#223058')
  const shallowWater = color('#87A4E8')
  const beach = color(240, 211, 158)
  const grass = color('#55CB15')
  const wood = color('#38850E')
  const mountain = color(200, 200, 200)
  const snow = color(255)

  colors = [
    { fromValue: 0, toValue: 0.4, fromColor: deepWater, toColor: shallowWater },
    { fromValue: 0.4, toValue: 0.45, fromColor: shallowWater, toColor: beach },
    { fromValue: 0.45, toValue: 0.5, fromColor: beach, toColor: grass },
    { fromValue: 0.5, toValue: 0.6, fromColor: grass, toColor: wood },
    { fromValue: 0.6, toValue: 0.8, fromColor: wood, toColor: mountain },
    { fromValue: 0.8, toValue: 1, fromColor: mountain, toColor: snow },
  ]

  initGraphics(graphics)
}
window.onresize = window.setup

window.draw = () => {
  t += 0.015

  graphics.image(graphics, -xSpeed, ySpeed)

  graphics.loadPixels()
  for (let x = 0; x < width; x++) {
    drawPixel(graphics, x, 0)
  }
  for (let x = width - xSpeed; x < width; x++) {
    for (let y = 0; y < height; y++) {
      drawPixel(graphics, x, y)
    }
  }
  graphics.updatePixels()

  image(graphics, 0, 0)
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
  const terrain = colors.find(color => noiseValue >= color.fromValue && noiseValue < color.toValue)

  if (!terrain) {
    return color(255)
  }

  const lerpValue = map(noiseValue, terrain.fromValue, terrain.toValue, 0, 1)
  return lerpColor(terrain.fromColor, terrain.toColor, lerpValue)
}
