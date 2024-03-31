import p5 from 'p5'

const sizeX = 40
const sizeY = 55
const scale = 0.008

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  drawLines()
}
window.onresize = window.setup
window.touchStarted = () => drawLines()

const drawLines = () => {
  background(255)
  strokeWeight(4)
  noiseSeed()

  const sizeXadjusted = width / floor(width / sizeX)
  const sizeYadjusted = height / floor(height / sizeY)

  for (let x = width - sizeXadjusted; x > -1; x -= sizeXadjusted) {
    for (let y = height - sizeYadjusted; y > -1; y -= sizeYadjusted) {
      const r = noise(x * scale, y * scale)

      if (r > 0.5) {
        line(x, y, x + sizeXadjusted, y + sizeYadjusted)
      } else {
        line(x, y + sizeYadjusted, x + sizeXadjusted, y)
      }
    }
  }
}
