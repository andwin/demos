<script lang="ts">
  export let title
  export let slug
</script>

<div class="card">
  <a href={`./${slug}/`} class="card">
    <h2>{title}</h2>

    {#await import(`./${slug}/preview.png`) then { default: src }}
      <img {src} alt={title} />
    {/await}
  </a>
</div>

<style>
  .card {
    display: inline-block;
    background-color: #202127;
    padding: 20px;
    border-radius: 10px;
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
