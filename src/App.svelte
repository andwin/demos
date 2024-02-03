<script lang="ts">
  const demos = [
    {
      title: 'Lines',
      description: 'Drawing random lines on a canvas',
      link: './src/lines/'
    },
    {
      title: 'Circes',
      description: 'Drawing random circles on a canvas',
      link: './src/circles/'
    }
  ]
</script>

<main>
  <h1>Demos</h1>

  <div class="cards">
    {#each demos as demo}
      <div class="card">
        <a href={demo.link}>
          <h2>{demo.title}</h2>
          <p>{demo.description}</p>
          <img src={demo.link + 'preview.png'} alt={demo.title} />
        </a>
      </div>
    {/each}
  </div>
</main>
