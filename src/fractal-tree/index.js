import p5 from 'p5'

const bgColor = '#1A1B3E'
let angle
let startLength

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)

  frameRate(25)

  startLength = min(width, height) / 3
}
window.onresize = window.setup

window.draw = () => {
  background(bgColor)

  stroke(255)
  strokeWeight(3)

  const t = frameCount
  angle = 1.025 ** -(t) * sin(0.15 * (t - 8)) + 0.6

  drawBranch(width / 2, height, startLength, 0, 6)
}

const drawBranch = (x, y, length, startAngle, level) => {
  if (level === 0) {
    return
  }

  const endX = x + cos(-PI / 2 + startAngle) * length
  const endY = y + sin(-PI / 2 + startAngle) * length

  line(x, y, endX, endY)

  drawBranch(endX, endY, length * 0.67, startAngle - angle, level - 1)
  drawBranch(endX, endY, length * 0.67, startAngle + angle, level - 1)
}
