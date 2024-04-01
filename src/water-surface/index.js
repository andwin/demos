import p5 from 'p5'

let img
let imgWidth
let imgHeight
const pixelSize = 2
const numPoints = 20
const points = []

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  imgWidth = ceil(width / pixelSize)
  imgHeight = ceil(height / pixelSize)
  img = createImage(imgWidth, imgHeight)

  for (let i = 0; i < numPoints; i++) {
    const point = createVector(random(imgWidth), random(imgHeight))
    points.push(point)
  }
}
window.onresize = window.setup

window.draw = () => {
  img.loadPixels()

  for (let x = 0; x < imgWidth; x++) {
    for (let y = 0; y < imgHeight; y++) {
      const distances = points.map(point => dist(x, y, point.x, point.y)).sort((a, b) => a - b)
      const nearestDistance = distances[0]

      const r = (nearestDistance / 14.5) ** 2.5 + 44
      const g = (nearestDistance / 21) ** 2.5 + 169
      const b = (nearestDistance / 40) ** 3.0 + 225

      const index = (x + y * imgWidth) * 4

      img.pixels[index + 0] = r
      img.pixels[index + 1] = g
      img.pixels[index + 2] = b
      img.pixels[index + 3] = 255
    }
  }

  img.updatePixels()

  image(img, 0, 0, width, height)
}
