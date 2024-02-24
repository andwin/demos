let sections = []
let gfx
let layer
let msk

function setup() {
  createCanvas(400, 400)
  gfx = createGraphics(width, height)
  layer = createGraphics(width, height)
  msk = createGraphics(width, height)

  sections.push({ color: 'green', size: 100 })
  sections.push({ color: 'blue', size: 150 })
  sections.push({ color: 'orange', size: 200 })
  sections.push({ color: 'yellow', size: 250 })
  sections.push({ color: 'red', size: 300 })
  sections.push({ color: 'pink', size: 350 })
  sections.push({ color: 'purple', size: 400 })
  sections.push({ color: 'lightgreen', size: 450 })
  sections.push({ color: 'gray', size: 500 })
}

function draw() {
  gfx.background(220)
  gfx.noFill()

  for (const item of sections) {
    const x = 50 * sin(frameCount * 0.01 + item.size * 0.01) + width / 2
    const y = 50 * sin(frameCount * 0.01 + item.size * 0.01) + width / 2

    msk.background(item.color)
    msk.erase()
    msk.circle(x, y, item.size)

    const mskImage = msk.get()

    const layerImage = layer.get()
    layerImage.mask(mskImage)

    gfx.image(mskImage, 0, 0)

    item.size++
    if (item.size > width * 1.5) {
      item.size = 0
      sections = sections.sort((a, b) => a.size - b.size)
    }
  }

  image(gfx, 0, 0)
}
