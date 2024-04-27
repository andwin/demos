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
}
window.onresize = window.setup

window.draw = () => {
  background(backgroundColor)

  for (const bubble of bubbles) {
    drawBouble(bubble)
  }
}

const initBouble = (bubble) => {
  bubble.x = random(0, width)
  bubble.y = 0
  bubble.size = random(sizes)
  bubble.color = random(colors)
}

const drawBouble = (bubble) => {
  fill(bubble.color)
  circle(bubble.x, bubble.y, bubble.size)
}
