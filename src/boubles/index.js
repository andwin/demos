let background

const gravityConstant = 0.9
const forceConstant = 600

const numberOfBoubles = 30
const boubles = []
const sizes = [20, 40, 60]
const colors = ['#FF7E2C', '#AEBC98', '#FED8A8']

const magThreshold = 0.15
const createBoublesInterval = 200
let createBoublesIntervalId
const resetBooublesTimeout = 1000
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

  applyForces()

  let maxMag = 0
  for (const bouble of boubles) {
    drawBouble(bouble)
    const mag = moveBouble(bouble)
    if (mag > maxMag) maxMag = mag
  }

  if (maxMag < magThreshold) {
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

  const x = random(width / 2 - width * f, width / 2 + width * f)
  const y = random(height / 2 - height * f, height / 2 + height * f)
  const bouble = {}
  bouble.position = createVector(x, y)
  bouble.size = random(sizes)
  bouble.color = random(colors)
  return bouble
}

const applyForces = () => {
  const center = createVector(width / 2, height / 2)

  for (const bouble of boubles) {
    bouble.force = center.copy().sub(bouble.position).mult(gravityConstant)
  }

  for (const bouble of boubles) {
    for (const other of boubles) {
      if (bouble === other) continue

      const direction = other.position.copy().sub(bouble.position)
      const force = direction.div(direction.mag() * direction.mag()).mult(forceConstant)

      bouble.force.add(force.copy().mult(-1))
      other.force.add(force)
    }
  }
}

const drawBouble = (bouble) => {
  fill(bouble.color)
  ellipse(bouble.position.x, bouble.position.y, bouble.size)
}

const moveBouble = (bouble) => {
  const force = bouble.force.copy()
  const velocity = force.copy().div(bouble.size / 2)
  bouble.position.add(velocity)

  return velocity.mag()
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
