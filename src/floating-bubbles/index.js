import p5 from 'p5'

const backgroundColor = '#382317'
const colors = ['#F4B5B1', '#982A44', '#E56173', '#F5B16C']
const sizes = []
const bubbles = []
const numberOfBoubles = 10

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)

  sizes.lenght = 0
  sizes.push(100, 60, 20)

  noStroke()

  for (let i = 0; i < numberOfBoubles; i++) {
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

  bubble.blur = map(size, 20, 100, 6, 4)
  bubble.speed = map(size, 20, 100, 0.5, 1)
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
