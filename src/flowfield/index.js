/* eslint-disable no-undef */
const particles = []
const noiseScale = 0.01
const speed = 3
let bgColor

function setup() {
  bgColor = color('#1A1B3E')
  bgColor.setAlpha(10)

  createCanvas(window.innerWidth, window.innerHeight)

  particles.length = 0
  const numberOfParticles = Math.min(height, width)
  for (let i = 0; i < numberOfParticles; i++) {
    const particle = {}
    initParticle(particle)
    particles.push(particle)
  }
}
window.onresize = setup

function draw() {
  background(bgColor)
  strokeWeight(3)
  stroke(230)

  for (const particle of particles) {
    drawParticle(particle)
    moveParticle(particle)
    if (isOffscreen(particle)) initParticle(particle)
  }
}

const initParticle = (particle) => {
  particle.position = createVector(random(width), random(height))
}

const drawParticle = (particle) => {
  point(particle.position.x, particle.position.y)
}

const moveParticle = (particle) => {
  const time = frameCount * 0.01
  const noiseValue = noise(particle.position.x * noiseScale, particle.position.y * noiseScale, time)

  const angle = 2 * PI * noiseValue
  const v = p5.Vector.fromAngle(angle).setMag(speed)
  particle.position.add(v)
}

const isOffscreen = particle => particle.position.x <= 0 || particle.position.x >= width || particle.position.y <= 0 || particle.position.y >= height
