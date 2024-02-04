let background

const minSpeed = 6
const maxSpeed = 10
const minLength = 10
const maxLength = 25

const windK = 30
const windDx = 0.005
let wind = 0

const numberOfDrops = 100
const drops = []

function setup() {
  createCanvas(800, 600)
  background = createBackground()

  for (let i = 0; i < numberOfDrops; i++) {
    const drop = {}
    initDrop(drop)
    drops.push(drop)
  }
}

function draw() {
  image(background, 0, 0)

  stroke(200)
  for (const drop of drops) {
    drawDrop(drop)
    moveDrop(drop)
  }

  updateWind()
}

const initDrop = (drop) => {
  drop.x = random(-width, width * 2)
  drop.y = random(0, -height)
  drop.length = random(minLength, maxLength)
  drop.speed = random(minSpeed, maxSpeed)
}

const moveDrop = (drop) => {
  drop.y += drop.speed
  drop.x += wind

  if (drop.y > height) {
    initDrop(drop)
  }
}

const drawDrop = (drop) => {
  strokeWeight(map(drop.speed, minSpeed, maxSpeed, 1, 3))
  line(drop.x, drop.y, drop.x - wind, drop.y - drop.length)
}

const updateWind = () => {
  wind = (noise(windDx * frameCount) - 0.5) * windK
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
