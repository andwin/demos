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
  const x = random(width)
  const y = random(height)

  star.current = createVector(x, y)
  star.previous = createVector(x, y)
  star.velocity = createVector(0, 0)
  star.angle = atan2(y - height / 2, x - width / 2)

  return star
}

const moveStar = (star) => {
  star.velocity.x += cos(star.angle) * acceleration
  star.velocity.y += sin(star.angle) * acceleration

  star.previous.x = star.current.x
  star.previous.y = star.current.y

  star.current.add(star.velocity)
}

const isOffscreen = star => star.current.x < 0 || star.current.x > width || star.current.y < 0 || star.current.y > height

const drawStar = (star) => {
  gfx.line(star.previous.x, star.previous.y, star.current.x, star.current.y)
}
