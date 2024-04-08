import p5 from 'p5'

let angle = 0

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
}
window.onresize = window.setup

window.draw = () => {
  translate(width / 2, height / 2)
  background(220)

  stroke(0)
  strokeWeight(3)

  const d = Math.min(width, height) * 0.95
  circle(0, 0, d)

  const d2 = d / 2
  const x2 = cos(angle) * (d / 4)
  const y2 = sin(angle) * (d / 4)
  circle(x2, y2, d2)

  const d3 = d / 4
  const x3 = cos(angle * 2) * (d / 8)
  const y3 = sin(angle * 2) * (d / 8)
  circle(x2 + x3, y2 + y3, d3)

  angle += 0.005
}
