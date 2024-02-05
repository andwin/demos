const size = 5
const noiseScale = 0.008
const speedScale = 0.005
let t = 0.0

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  frameRate(20)
  noStroke()
}
window.onresize = setup

function draw() {
  background('#6F9CDE')

  t += 0.01

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      const r = 255 * noise(t + x * noiseScale, y * noiseScale, frameCount * speedScale)

      const c = color(255, r)

      fill(c)
      rect(x, y, size, size)
    }
  }
}
