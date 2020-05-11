<script context="module">
  export async function preload() {
    const res = await this.fetch('index.json');
    const data = await res.json();
    return data;
  }
</script>

<script>
  import Portrait from '../components/Portrait.svelte';

  export let projects;
  export let track;

  let active = 'me';

  function handleMouseover(project) {
    active = project;
  }

  function handleMouseout() {
    active = 'me';
  }
</script>

<style>
  .wrapper {
    padding: 0 0.75rem;
  }

  @media (min-width: 1200px) {
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
    }

    .intro {
      margin: 8vw;
      padding: 0;
      max-width: 42vw;
      pointer-events: none;
    }
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    pointer-events: auto;
  }

  .spacer {
    margin-right: 0.5rem;
  }

  li:last-of-type .spacer {
    display: none;
  }
</style>

<svelte:head>
  <title>shiftfoc.us</title>
</svelte:head>

<Portrait active={active} />

<section class="wrapper">
  <section class="intro">
    <h1>Hello!</h1>

    <p>
      I'm Derek Hurley, a UI engineer at <a href="https://aclima.io/" target="_blank" rel="noopener noreferrer">Aclima</a> from the Pacific Northwest. I enjoy (a lot of) tea, outdoor adventures, corny jokes, and discovering new music. I last listened to <a href={track.url} target="_blank" rel="noopener noreferrer">{track.title}</a> actually, you should check them out. I hope you'll take a look around my site, all my projects are <a href="https://github.com/dzhurley" target="_blank" rel="noopener noreferrer">open source</a> so feel encouraged to modify them as you want.
    </p>

    <h3>Projects</h3>

    <ul class="projects">
      {#each projects as project}
        <li
          on:mouseover={() => handleMouseover(project.slug)}
          on:mouseout={handleMouseout}
          >
          <a rel='prefetch' href='/{project.slug}'>
            {project.title}
          </a>
          <span class="spacer">/</span>
        </li>
      {/each}
    </ul>
  </section>
</section>
