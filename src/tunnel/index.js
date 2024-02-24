let items = []
let gfx
let layer
let msk

function setup() {
  createCanvas(400, 400)
  gfx = createGraphics(width, height)
  layer = createGraphics(width, height)
  msk = createGraphics(width, height)

  items.push({ color: 'green', size: 100 })
  items.push({ color: 'blue', size: 150 })
  items.push({ color: 'orange', size: 200 })
  items.push({ color: 'yellow', size: 250 })
  items.push({ color: 'red', size: 300 })
  items.push({ color: 'pink', size: 350 })
  items.push({ color: 'purple', size: 400 })
  items.push({ color: 'lightgreen', size: 450 })
  items.push({ color: 'gray', size: 500 })
}

function draw() {
  gfx.background(220)
  gfx.noFill()

  for (const item of items) {
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
      items = items.sort((a, b) => a.size - b.size)
    }
  }

  image(gfx, 0, 0)
}
