const size = 5
const noiseScale = 0.008
const speedScale = 0.005
let t = 0.0
let graphics

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  frameRate(20)

  graphics = createGraphics(window.innerWidth, window.innerHeight)
  graphics.noStroke()
}
window.onresize = setup

function draw() {
  graphics.background('#6F9CDE')

  t += 0.01

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      const r = (8 * noise(t + x * noiseScale, y * noiseScale, frameCount * speedScale)) ** 2.8

      const c = color(255, r)

      graphics.fill(c)
      graphics.rect(x, y, size, size)
    }
  }

  image(graphics, 0, 0)
}
