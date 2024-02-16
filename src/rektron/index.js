/* eslint-disable no-undef */
let background

const gravityConstant = 1.1
let boubles = []
const logoColor = '#FF7E2C'

const magThreshold = 0.15

function setup() {
  stroke(0)
  createCanvas(window.innerWidth, window.innerHeight)
  background = createBackground()

  frameRate(20)

  initBoubles()
}
window.onresize = setup

function draw() {
  translate(width / 2, height / 2)

  drawBoubles()

  let maxMag = 0
  for (const bouble of boubles) {
    const mag = moveBouble(bouble)
    if (mag > maxMag) maxMag = mag
  }

  if (maxMag < magThreshold) initBoubles()
}

const initBoubles = () => {
  const bigCircle = {
    position: createVector(-width, -height),
    target: createVector(-10, -10),
    size: 100,
  }
  const smallCircle = {
    position: createVector(width, height),
    target: createVector(18, 18),
    size: 50,
  }

  boubles = [bigCircle, smallCircle]
}

const drawBoubles = () => {
  const [largeCircle, smallCircle] = boubles

  image(background, -width / 2, -height / 2)
  fill(logoColor)

  push()
  clip(() => {
    circle(largeCircle.position.x, largeCircle.position.y, largeCircle.size)
  }, { invert: true })
  circle(smallCircle.position.x, smallCircle.position.y, smallCircle.size)
  pop()

  push()
  clip(() => {
    circle(smallCircle.position.x, smallCircle.position.y, smallCircle.size)
  }, { invert: true })
  circle(largeCircle.position.x, largeCircle.position.y, largeCircle.size)
  pop()
}

const moveBouble = (bouble) => {
  const force = bouble.target.copy().sub(bouble.position).mult(gravityConstant)
  const velocity = force.copy().div(bouble.size / 10)
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
