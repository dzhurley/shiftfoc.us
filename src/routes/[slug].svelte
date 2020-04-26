<script context="module">
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { project: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let project;
</script>

<style>
  .info {
    height: 2rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--light-color);
  }

  a {
    text-decoration: none;
    margin-right: 1rem;
  }

  iframe {
    width: 100vw;
    height: calc(100vh - 4rem);
    overflow: hidden;
  }
</style>

<svelte:head>
  <title>shiftfoc.us | {project.title}</title>
</svelte:head>

<section class="info">
  <a class="" rel="prefetch" href="/">ᐸ</a>
  <strong>{project.title}</strong> - {project.summary}
</section>

<iframe src={project.url} title={project.title} frameborder="0"></iframe>
