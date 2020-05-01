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
  .wrapper {
    position: absolute;
    top: 0;
    left: 3rem;
    height: 6rem;
    background-color: var(--dark-color);
    display:flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    margin-right: 1rem;
  }

  iframe {
    position: absolute;
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - 6rem);
    height: calc(100vh - 9rem);
    border: 1px solid var(--light-color);
    overflow: hidden;
  }
</style>

<svelte:head>
  <title>shiftfoc.us | {project.title}</title>
</svelte:head>

<section class="wrapper">
  <a class="" rel="prefetch" href="/">ᐸ</a>
  <strong>{project.title}</strong>&nbsp;- {project.summary}
</section>

<iframe
  src={project.url}
  title={project.title}
  frameborder="0"
  allow="camera;microphone"
></iframe>
