<script context="module">
  export function preload() {
    return this.fetch('index.json')
      .then(r => r.json())
      .then(projects => {
        return { projects };
      });
  }
</script>

<script>
  export let projects;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>shiftfoc.us</title>
</svelte:head>

<h1>Hallo</h1>

<ul>
  {#each projects as project}
    <li><a rel='prefetch' href='/{project.slug}'>{project.title}</a></li>
  {/each}
</ul>
