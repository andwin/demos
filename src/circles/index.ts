import P5 from 'p5'

const sketch = (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(400, 600)
  }

  p5.draw = () => {
    p5.circle(p5.random(p5.width), p5.random(p5.height), p5.random(50))
  }
}

// eslint-disable-next-line no-new
new P5(sketch)
