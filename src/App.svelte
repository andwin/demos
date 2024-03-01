<script>
  import Card from './Card.svelte'

  const demos = [
    {
      title: 'Flow field',
      slug: 'flowfield',
    },
    {
      title: 'Rektron logo',
      slug: 'rektron',
    },
    {
      title: 'Boubles',
      slug: 'boubles',
    },
    {
      title: 'Map generator',
      slug: 'map-generator',
    },
    {
      title: 'Horizontal raster bars',
      slug: 'rasterbars',
    },
    {
      title: 'Clouds',
      slug: 'clouds',
    },
    {
      title: 'Rain',
      slug: 'rain',
    },
  ]
</script>

<main>
  <h1>Demos</h1>

  <div class="cards">
    {#each demos as demo}
      <Card title={demo.title} slug={demo.slug} />
    {/each}
  </div>
</main>

<style>
  main {
    padding: 20px;
    color:  rgba(255, 255, 245, .86)
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  h1 {
    font-size: 3.2em;
    padding-bottom: 60px;
  }
</style>
