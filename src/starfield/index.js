import p5 from 'p5'

let gfx
const stars = []
const starCount = 100
const acceleration = 0.5

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)

  stars.length = 0
  for (let i = 0; i < starCount; i++) {
    const star = initStar({})
    stars.push(star)
  }

  if (gfx) gfx.remove()
  gfx = createGraphics(width, height)
  gfx.stroke(255)
  gfx.strokeWeight(1)
  gfx.translate(width / 2, height / 2)
}
window.onresize = window.setup

window.draw = () => {
  gfx.background(0, 150)

  for (const star of stars) {
    moveStar(star)
    drawStar(star)

    if (isOffscreen(star)) {
      initStar(star)
    }
  }

  image(gfx, 0, 0)
}

const initStar = (star) => {
  const x = random(-width / 2, width / 2)
  const y = random(-height / 2, height / 2)

  star.current = createVector(x, y)
  star.previous = createVector(x, y)
  star.velocity = createVector(0, 0)
  star.angle = atan2(y, x)

  return star
}

const moveStar = (star) => {
  star.velocity.x += cos(star.angle) * acceleration
  star.velocity.y += sin(star.angle) * acceleration

  star.previous.x = star.current.x
  star.previous.y = star.current.y

  star.current.add(star.velocity)
}

const isOffscreen = star => star.current.x < -width / 2 || star.current.x > width / 2 || star.current.y < -height / 2 || star.current.y > height / 2

const drawStar = (star) => {
  const alpha = map(star.velocity.mag(), 0, 15, 0, 200)
  gfx.stroke(255, alpha)
  gfx.line(star.previous.x, star.previous.y, star.current.x, star.current.y)
}
