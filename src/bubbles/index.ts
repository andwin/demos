import type { Graphics, Vector } from 'p5'
import P5 from 'p5'

let background: Graphics

const gravityConstant = 0.9
const forceConstant = 600

const numberOfBoubles = 30
type Bouble = {
  position: Vector
  size: number
  color: string
  force: Vector
}
const boubles: Bouble[] = []
const sizes = [20, 40, 60]
const colors = ['#FF7E2C', '#AEBC98', '#FED8A8']

const magThreshold = 0.15
const createBoublesInterval = 200
let createBoublesIntervalId: number | undefined
const resetBooublesTimeout = 1000
let resetBooublesTimeoutId: number | undefined

const sketch = (p5: P5) => {
  p5.setup = () => {
    p5.stroke(0)
    p5.createCanvas(window.innerWidth, window.innerHeight)
    background = createBackground()

    p5.frameRate(20)

    initBoubles()
  }
  window.onresize = p5.setup

  p5.draw = () => {
    p5.image(background, 0, 0)

    applyForces()

    let maxMag = 0
    for (const bouble of boubles) {
      drawBouble(bouble)
      const mag = moveBouble(bouble)
      if (mag > maxMag) maxMag = mag
    }

    if (maxMag < magThreshold) {
      if (!resetBooublesTimeoutId) {
        resetBooublesTimeoutId = window.setTimeout(initBoubles, resetBooublesTimeout)
      }
    } else if (resetBooublesTimeoutId) {
      clearTimeout(resetBooublesTimeoutId)
      resetBooublesTimeoutId = undefined
    }
  }

  const initBoubles = () => {
    boubles.length = 0

    if (createBoublesIntervalId) clearInterval(createBoublesIntervalId)

    createBoublesIntervalId = window.setInterval(() => {
      if (boubles.length < numberOfBoubles) {
        const bouble = createBouble()
        boubles.push(bouble)
      }
    }, createBoublesInterval)
  }

  const createBouble = () => {
    const f = 0.02

    const x = p5.random(p5.width / 2 - p5.width * f, p5.width / 2 + p5.width * f)
    const y = p5.random(p5.height / 2 - p5.height * f, p5.height / 2 + p5.height * f)
    const bouble: Bouble = {
      position: p5.createVector(x, y),
      force: p5.createVector(0, 0),
      size: p5.random(sizes),
      color: p5.random(colors),
    }
    return bouble
  }

  const applyForces = () => {
    const center = p5.createVector(p5.width / 2, p5.height / 2)

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

  const drawBouble = (bouble: Bouble) => {
    p5.fill(bouble.color)
    p5.ellipse(bouble.position.x, bouble.position.y, bouble.size)
  }

  const moveBouble = (bouble: Bouble) => {
    const force = bouble.force.copy()
    const velocity = force.copy().div(bouble.size / 2)
    bouble.position.add(velocity)

    return velocity.mag()
  }

  const createBackground = () : Graphics => {
    const color1 = p5.color('#1A1B3E')
    const color2 = p5.color('#1A1423')

    const bg = p5.createGraphics(p5.width, p5.height)
    const ctx = (bg as any).canvas.getContext('2d')

    const gradient = ctx.createRadialGradient(p5.width / 2, p5.height / 2, p5.height / 2, p5.width / 2, p5.height / 2, 100)

    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)

    ctx.fillStyle = gradient
    bg.rect(0, 0, p5.width, p5.height)
    return bg
  }
}

// eslint-disable-next-line no-new
new P5(sketch)
