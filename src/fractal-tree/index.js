import p5 from 'p5'

const angle = 0.6
const bgColor = '#1A1B3E'

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  noLoop()
}
window.onresize = window.setup

window.draw = () => {
  background(bgColor)

  stroke(255)
  strokeWeight(3)

  drawBranch(width / 2, height, 250, 0, 6)
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
