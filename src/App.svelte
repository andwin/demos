<script lang="ts">
  const demos = [
    {
      title: 'Horizontal raster bars',
      link: './src/rasterbars/',
    },
    {
      title: 'Clouds',
      link: './src/clouds/',
    },
    {
      title: 'Rain',
      link: './src/rain/',
    },
    {
      title: 'Lines',
      link: './src/lines/',
    },
    {
      title: 'Circes',
      link: './src/circles/',
    },
    {
      title: 'Circes',
      link: './src/circles/',
    },
    {
      title: 'Circes',
      link: './src/circles/',
    },
    {
      title: 'Circes',
      link: './src/circles/',
    },
  ]
</script>

<main>
  <h1>Demos</h1>

  <div class="cards">
    {#each demos as demo}
      <div>
        <a href={demo.link} class="card">
          <h2>{demo.title}</h2>
          <img src={`${demo.link}preview.png`} alt={demo.title} />
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
