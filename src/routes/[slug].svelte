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

<svelte:head>
  <title>{project.title}</title>
</svelte:head>

<a rel='prefetch' href='/'>back</a>

<h1>{project.title}</h1>
<p>{project.summary}</p>
