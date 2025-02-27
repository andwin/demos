import p5 from 'p5'

let segmentSize = 0

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)

  const maxSize = Math.max(width, height)
  const segments = Math.ceil(maxSize / 50)
  segmentSize = maxSize / segments

  noLoop()
}
window.onresize = () => {
  window.setup()
  window.redraw()
}

window.draw = () => {
  background('#E052C6')
  stroke(222)
  noFill()

  for (let x = 0; x < width; x += segmentSize) {
    for (let y = 0; y < height; y += segmentSize) {
      drawTile(x, y, segmentSize)
    }
  }
}

const drawTile = (x, y, size) => {
  push()

  translate(x + size / 2, y + size / 2)

  // 50% chance of rotating 90 degrees
  const tileB = Math.random() > 0.5
  if (tileB) {
    rotate(PI / 2)
  }

  translate(-size / 2, -size / 2)

  strokeWeight(5)
  arc(0, 0, size, size, 0, PI / 2)
  arc(size, size, size, size, PI, PI * (3 / 2))

  pop()
}
