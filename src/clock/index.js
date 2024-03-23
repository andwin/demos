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

  const minDimention = min(width, height)

  // Draw the clock face
  noFill()
  stroke('#F5F9E9')
  strokeWeight(10)
  const clockSize = minDimention * 0.9
  circle(width / 2, height / 2, clockSize)

  const now = new Date()

  // hour
  const hour = now.getHours()
  const hourAngle = map(hour % 12, 0, 12, 0, TWO_PI) - HALF_PI
  const hourLength = minDimention * 0.2
  stroke('#5FA8D3')
  strokeWeight(10)
  drawHand(hourAngle, hourLength)

  // minute
  const minute = now.getMinutes()
  const minuteAngle = map(minute, 0, 60, 0, TWO_PI) - HALF_PI
  const minuteLength = minDimention * 0.3
  strokeWeight(5)
  drawHand(minuteAngle, minuteLength)

  // second
  const second = now.getSeconds()
  const secondAngle = map(second, 0, 60, 0, TWO_PI) - HALF_PI
  const secondLength = minDimention * 0.4
  strokeWeight(2)
  drawHand(secondAngle, secondLength)
}

const drawHand = (angle, length) => {
  const x = width / 2 + cos(angle) * length
  const y = height / 2 + sin(angle) * length
  line(width / 2, height / 2, x, y)
}
