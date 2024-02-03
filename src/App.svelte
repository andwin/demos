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
    },
    {
      title: 'Circes',
      description: 'Drawing random circles on a canvas',
      link: './src/circles/'
    },
    {
      title: 'Circes',
      description: 'Drawing random circles on a canvas',
      link: './src/circles/'
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
      <div>
        <a href={demo.link} class="card">
          <h2>{demo.title}</h2>
          <p>{demo.description}</p>
          <img src={demo.link + 'preview.png'} alt={demo.title} />
        </a>
      </div>
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

  .card {
    display: inline-block;
    background-color: #202127;
    padding: 20px;
    border-radius: 10px;
  }

  h1 {
    font-size: 3.2em;
    padding-bottom: 60px;
  }

  h2 {
    color: #EEE;
    margin-top: 0;
  }

  a {
    color: #CCC;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  img {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
</style>
