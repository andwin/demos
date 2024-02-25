/* global clip */
let gfx
let maxSize
let t = 1.5
const sectionLimit = 10

const colors = [
  { inner: 'green', outer: 'lightgreen' },
  { inner: 'blue', outer: 'lightblue' },
  { inner: 'orange', outer: 'lightorange' },
  { inner: 'yellow', outer: 'lightyellow' },
  { inner: 'red', outer: 'lightred' },
  { inner: 'pink', outer: 'lightpink' },
  { inner: 'purple', outer: 'lightpurple' },
  { inner: 'gray', outer: 'lightgray' },
]
let colorOffset = 0

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

    const colorIndex = Math.abs((section + colorOffset) % colors.length)
    const color = colors[colorIndex]

    gfx.push()
    // eslint-disable-next-line no-loop-func
    gfx.clip(() => {
      gfx.circle(x, y, size)
    }, { invert: true })
    gfx.background(color.inner)
    gfx.pop()

    if (size > maxSize) {
      t -= 1
      colorOffset -= 1
    }
  }

  image(gfx, 0, 0)
}
