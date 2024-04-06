import p5 from 'p5'

let img
let imgWidth
let imgHeight
const pixelSize = 2
const initialPoints = []
let precalculatedPixels
const animationFrames = 30

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  imgWidth = ceil(width / pixelSize)
  imgHeight = ceil(height / pixelSize)
  img = createImage(imgWidth, imgHeight)

  const numberOfPoints = (width * height) / 50000
  for (let i = 0; i < numberOfPoints; i++) {
    const point = createVector(random(imgWidth), random(imgHeight))
    initialPoints.push(point)
  }

  precalculatedPixels = new Array(animationFrames)
  for (let animationFrame = 0; animationFrame < animationFrames; animationFrame++) {
    precalculatedPixels[animationFrame] = new Array(imgWidth * imgHeight * 4)

    const points = initialPoints.map((p) => {
      const x = 50 * sin(animationFrame * (TWO_PI / animationFrames) + p.x) + p.x
      const y = 50 * cos(animationFrame * (TWO_PI / animationFrames) + p.y) + p.y

      return createVector(x, y)
    })

    for (let x = 0; x < imgWidth; x++) {
      for (let y = 0; y < imgHeight; y++) {
        const distances = points.map(point => (x - point.x) ** 2 + (y - point.y) ** 2).sort((a, b) => a - b)
        const nearestDistance = Math.sqrt(distances[0])

        const r = (nearestDistance / 14.5) ** 2.5 + 44
        const g = (nearestDistance / 21) ** 2.5 + 169
        const b = (nearestDistance / 40) ** 3.0 + 225

        const index = (x + y * imgWidth) * 4

        precalculatedPixels[animationFrame][index + 0] = r
        precalculatedPixels[animationFrame][index + 1] = g
        precalculatedPixels[animationFrame][index + 2] = b
        precalculatedPixels[animationFrame][index + 3] = 255
      }
    }
  }
}
window.onresize = window.setup

window.draw = () => {
  const animationFrame = frameCount % animationFrames

  img.loadPixels()

  for (let i = 0; i < precalculatedPixels[animationFrame].length; i++) {
    img.pixels[i] = precalculatedPixels[animationFrame][i]
  }

  img.updatePixels()

  image(img, 0, 0, width, height)
}
