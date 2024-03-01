import type { Graphics } from 'p5'
import P5 from 'p5'

const size = 5
const noiseScale = 0.008
const speedScale = 0.005
let t = 0.0
let graphics: Graphics

const sketch = (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight)

    p5.frameRate(20)

    graphics = p5.createGraphics(window.innerWidth, window.innerHeight)
    graphics.noStroke()
  }
  window.onresize = p5.setup

  p5.draw = () => {
    graphics.background('#6F9CDE')

    t += 0.01

    for (let x = 0; x < p5.width; x += size) {
      for (let y = 0; y < p5.height; y += size) {
        const r = (8 * p5.noise(t + x * noiseScale, y * noiseScale, p5.frameCount * speedScale)) ** 2.8

        const c = p5.color(255, r)

        graphics.fill(c)
        graphics.rect(x, y, size, size)
      }
    }

    p5.image(graphics, 0, 0)
  }
}

new P5(sketch)
