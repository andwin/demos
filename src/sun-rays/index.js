import p5 from 'p5'

const segments = 15
let startAngle = 0

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
}

window.onresize = window.setup

window.draw = () => {
  background(220)
  translate(width / 2, height / 2)

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

  startAngle += 0.01
}
