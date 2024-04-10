import p5 from 'p5'

const maxLevel = 5
let angle = 0
const backgroundColor = '#FFFFFF'
const colors = {
  0: '#FF0000',
  1: '#00FF00',
  2: '#0000FF',
  3: '#FFFF00',
  4: '#FF00FF',
  5: '#00FFFF',
}

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  stroke(0)
  strokeWeight(3)
}
window.onresize = window.setup

window.draw = () => {
  background(backgroundColor)

  const x = width / 2
  const y = height / 2
  const diameter = Math.min(width, height) * 0.95

  drawLevel(x, y, diameter, angle, 0)

  angle += 0.005
}

const drawLevel = (x, y, diameter, levelAngle, level) => {
  if (level >= maxLevel) return

  fill(colors[level])
  circle(x, y, diameter)

  const x2 = cos(levelAngle) * (diameter / 4)
  const y2 = sin(levelAngle) * (diameter / 4)

  drawLevel(x + x2, y + y2, diameter / 2, levelAngle * 2, ++level)
}
