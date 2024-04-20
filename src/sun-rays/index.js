import p5 from 'p5'

const segments = 15
let startAngle = 0

const backgroundColor = '#ffa733'
const gradientColor1 = '#f8e7b4'
const gradientColor2 = '#f2b30b'

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()

  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(0, 0, width / 12, 0, 0, width / 1.4)
  gradient.addColorStop(0, gradientColor1)
  gradient.addColorStop(1, gradientColor2)
  ctx.fillStyle = gradient
}
window.onresize = window.setup

window.draw = () => {
  background(backgroundColor)

  const centerX = (width / 20) * cos(frameCount * 0.015)
  const centerY = (height / 20) * sin(frameCount * 0.01)
  translate(width / 2 + centerX, height / 2 + centerY)

  const length = dist(0, 0, width / 2, height / 2) * 1.2

  const segmentAngle = TWO_PI / (segments * 2)
  for (let angle = startAngle; angle <= startAngle + TWO_PI; angle += 2 * segmentAngle) {
    const x1 = length * cos(angle)
    const y1 = length * sin(angle)
    const x2 = length * cos(angle + segmentAngle)
    const y2 = length * sin(angle + segmentAngle)

    beginShape()
    vertex(0, 0)
    vertex(x1, y1)
    vertex(x2, y2)
    endShape(CLOSE)
  }

  circle(0, 0, 50)

  startAngle += 0.01
}
