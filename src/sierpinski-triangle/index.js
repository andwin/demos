import p5 from 'p5'

const bgColor = '#1A1B3E'

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  frameRate(1)
  window.draw()
}
window.onresize = window.setup

window.draw = () => {
  background(bgColor)

  const length = min(width, height) * 0.95
  const maxLevel = 6

  drawLevel(width / 2, height / 2, length, maxLevel)
}

const drawLevel = (x, y, length, level) => {
  if (level === 0) {
    return triangle(x, y - length / 2, x - length / 2, y + length / 2, x + length / 2, y + length / 2)
  }

  const half = length / 2
  drawLevel(x, y - half / 2, half, level - 1)
  drawLevel(x - half / 2, y + half / 2, half, level - 1)
  drawLevel(x + half / 2, y + half / 2, half, level - 1)
}
