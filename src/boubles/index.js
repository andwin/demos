let background

const spacing = 3
const numberOfBoubles = 10
const boubles = []
const sizes = [20, 40, 60]
const colors = ['#FF7E2C', '#AEBC98', '#FED8A8']

const createBoublesInterval = 300
let createBoublesIntervalId
const resetBooublesTimeout = 3000
let resetBooublesTimeoutId

function setup() {
  stroke(0)
  createCanvas(window.innerWidth, window.innerHeight)
  background = createBackground()

  frameRate(20)

  initBoubles()
}
window.onresize = setup

function draw() {
  image(background, 0, 0)

  for (const bouble of boubles) {
    drawBouble(bouble)
  }

  const moved = moveBoubles()
  if (!moved) {
    if (!resetBooublesTimeoutId) {
      resetBooublesTimeoutId = setTimeout(initBoubles, resetBooublesTimeout)
    }
  } else if (resetBooublesTimeoutId) {
    clearTimeout(resetBooublesTimeoutId)
    resetBooublesTimeoutId = null
  }
}

const initBoubles = () => {
  boubles.length = 0

  if (createBoublesIntervalId) clearInterval(createBoublesIntervalId)

  createBoublesIntervalId = setInterval(() => {
    if (boubles.length < numberOfBoubles) {
      const bouble = createBouble()
      boubles.push(bouble)
    }
  }, createBoublesInterval)
}

const createBouble = () => {
  const f = 0.02

  const bouble = {}
  bouble.x = random(width / 2 - width * f, width / 2 + width * f)
  bouble.y = random(height / 2 - height * f, height / 2 + height * f)
  bouble.size = random(sizes)
  bouble.color = random(colors)
  return bouble
}

const drawBouble = (bouble) => {
  fill(bouble.color)
  ellipse(bouble.x, bouble.y, bouble.size)
}

const moveBoubles = () => {
  let movedBoubles = false

  for (const bouble of boubles) {
    // Find boubles that overlap
    for (const other of boubles) {
      if (bouble !== other && dist(bouble.x, bouble.y, other.x, other.y) < bouble.size / 2 + other.size / 2 + spacing) {
        const dx = bouble.x - other.x
        const dy = bouble.y - other.y
        const moveX = dx < bouble.size / 2 + other.size / 2 + spacing
        const moveY = dy < bouble.size / 2 + other.size / 2 + spacing

        if (moveX) {
          bouble.x += pixelsToMove(dx)
        }
        if (moveY) {
          bouble.y += pixelsToMove(dy)
        }

        if (moveX || moveY) {
          movedBoubles = true
          break
        }
      }
    }
  }

  return movedBoubles
}

const pixelsToMove = (d) => {
  const move = 5 * Math.abs(d) ** -0.2
  return d > 0 ? move : -move
}

const createBackground = () => {
  const color1 = color('#1A1B3E')
  const color2 = color('#1A1423')

  const bg = createGraphics(width, height)

  bg.noFill()
  for (let i = 0; i <= height; i++) {
    const inter = map(i, 0, height, 0, 1)
    const c = lerpColor(color1, color2, inter)
    bg.stroke(c)
    bg.line(0, i, width, i)
  }

  return bg
}
