import p5 from 'p5'

const maxLevel = 5
let angle = 0

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  stroke(0)
  strokeWeight(3)
}
window.onresize = window.setup

window.draw = () => {
  background(220)

  const x = width / 2
  const y = height / 2
  const diameter = Math.min(width, height) * 0.95

  drawLevel(x, y, diameter, angle, 0)

  angle += 0.005
}

const drawLevel = (x, y, diameter, levelAngle, level) => {
  if (level >= maxLevel) return

  circle(x, y, diameter)

  const x2 = cos(levelAngle) * (diameter / 4)
  const y2 = sin(levelAngle) * (diameter / 4)

  drawLevel(x + x2, y + y2, diameter / 2, levelAngle * 2, ++level)
}
