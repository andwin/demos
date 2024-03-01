/* eslint-disable no-undef */
import p5 from 'p5'

let background

const gravityConstant = 1.1
let circles = []
const logoColor = '#FF7E2C'

const magThreshold = 0.15

window.setup = () => {
  stroke(0)
  createCanvas(window.innerWidth, window.innerHeight)
  background = createBackground()

  frameRate(20)

  initCircles()
}
window.onresize = window.setup

window.draw = () => {
  translate(width / 2, height / 2)

  drawCircles()

  let maxMag = 0
  for (const circle of circles) {
    const mag = moveBouble(circle)
    if (mag > maxMag) maxMag = mag
  }

  if (maxMag < magThreshold) initCircles()
}

const initCircles = () => {
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

  circles = [bigCircle, smallCircle]
}

const drawCircles = () => {
  const [largeCircle, smallCircle] = circles

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
  const ctx = bg.canvas.getContext('2d')

  const gradient = ctx.createRadialGradient(width / 2, height / 2, height / 2, width / 2, height / 2, 100)

  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)

  ctx.fillStyle = gradient
  bg.rect(0, 0, width, height)
  return bg
}
