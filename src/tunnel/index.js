import p5 from 'p5'

let gfx
let ctx
let maxSize
let t = 1.8
const sectionLimit = 10
const circleDots = 100
const minSize = 20

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)

  maxSize = Math.max(width, height) * 1.4

  if (gfx) gfx.remove()
  gfx = createGraphics(width, height)
  ctx = gfx.canvas.getContext('2d')
}
window.onresize = window.setup

window.draw = () => {
  t += 0.01

  gfx.background(0, 50)

  gfx.strokeWeight(3)
  gfx.stroke(255)
  gfx.noFill()

  for (let section = 0; section < sectionLimit; section++) {
    const sectionT = t - (sectionLimit - section)

    const size = ((maxSize / sectionLimit) * sectionT ** 2.5) / sectionLimit
    if (size < minSize) continue

    const x = 50 * sin(frameCount * 0.01 + size * 0.002) + width / 2
    const y = 50 * sin(frameCount * 0.01 + size * 0.002) + height / 2

    const circleLength = Math.PI * 2 * size
    const dotSpace = circleLength / circleDots

    ctx.setLineDash([1, dotSpace - 1])
    gfx.circle(x, y, size)
    if (size > maxSize) {
      t -= 1
    }
  }

  image(gfx, 0, 0)
}
