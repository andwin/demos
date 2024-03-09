import p5 from 'p5'

const sizeX = 40
const sizeY = 55
const maxTilesWidth = 4
const maxTilesHeight = 10

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  drawQuilt()
}
window.onresize = window.setup

const drawQuilt = () => {
  strokeWeight(3)

  const sizeXadjusted = width / floor(width / sizeX)
  const sizeYadjusted = height / floor(height / sizeY)

  const startR = random(165)
  const startG = random(165)
  const startB = random(165)

  for (let x = width - sizeXadjusted; x > -1; x -= sizeXadjusted) {
    for (let y = height - sizeYadjusted; y > -1; y -= sizeYadjusted) {
      const r = random(startR, startR + 45)
      const g = random(startG, startG + 45)
      const b = random(startB, startB + 45)
      fill(r, g, b)

      const w = sizeXadjusted * floor(random(1, maxTilesWidth))
      const h = sizeYadjusted * floor(random(1, maxTilesHeight))
      rect(x, y, w, h)
    }
  }

  noFill()
  rect(0, 0, width, height)
}
