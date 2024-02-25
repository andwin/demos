let gfx
let maxSize
let t = 1.5
const sectionLimit = 10

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  maxSize = Math.max(width, height) * 1.4

  if (gfx) gfx.remove()
  gfx = createGraphics(width, height)
}

window.onresize = setup

function draw() {
  gfx.background(220)
  gfx.noFill()

  t += 0.01

  for (let section = 0; section < sectionLimit; section++) {
    const sectionT = t - (sectionLimit - section)
    if (sectionT < 0) continue

    const size = ((maxSize / sectionLimit) * sectionT ** 2) / sectionLimit

    const x = 50 * sin(frameCount * 0.01 + size * 0.01) + width / 2
    const y = 50 * sin(frameCount * 0.01 + size * 0.01) + height / 2

    gfx.circle(x, y, size)

    if (size > maxSize) {
      t -= 1
    }
  }

  image(gfx, 0, 0)
}
