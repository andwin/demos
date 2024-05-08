import p5 from 'p5'

const backgroundColor = '#382317'
const colors = ['#F4B5B1', '#982A44', '#E56173', '#F5B16C']
const sizes = []
const bubbles = []
let numberOfBobbles
let maxSize
let minSize

window.setup = () => {
  pixelDensity(1)

  createCanvas(window.innerWidth, window.innerHeight)

  numberOfBobbles = Math.floor(Math.max(width, height) / 50)
  maxSize = Math.min(width, height) / 5
  minSize = Math.min(width, height) / 10

  sizes.lenght = 0
  sizes.length = 0
  sizes.push(minSize, minSize + (maxSize - minSize) * 0.6, maxSize)

  noStroke()

  bubbles.length = 0
  for (let i = 0; i < numberOfBobbles; i++) {
    const bubble = {}
    initBouble(bubble)
    bubble.y = random(0, height)
    bubbles.push(bubble)
  }

  sortBobbles()
}
window.onresize = window.setup

window.draw = () => {
  background(backgroundColor)

  for (const bubble of bubbles) {
    drawBouble(bubble)
    moveBouble(bubble)

    if (outOfScreen(bubble)) {
      initBouble(bubble)
      sortBobbles()
    }
  }
}

const initBouble = (bubble) => {
  const size = random(sizes)

  bubble.startX = random(0, width)
  bubble.x = bubble.startX
  bubble.y = height + size
  bubble.size = size
  bubble.color = random(colors)

  bubble.blur = map(size, minSize, maxSize, 5, 3)
  bubble.speed = map(size, minSize, maxSize, 0.5, 1)
  bubble.initialCurvePosition = random(0, 2 * PI)
}

const sortBobbles = () => {
  bubbles.sort((a, b) => a.size - b.size)
}

const drawBouble = (bubble) => {
  drawingContext.filter = `blur(${bubble.blur}px)`
  fill(bubble.color)
  circle(bubble.x, bubble.y, bubble.size)
}

const moveBouble = (bubble) => {
  bubble.y -= bubble.speed
  bubble.x = bubble.startX + sin(bubble.initialCurvePosition + (bubble.y / height) * PI) * bubble.size
}

const outOfScreen = bubble => bubble.y + bubble.size / 2 < 0
