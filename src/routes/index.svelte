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
  .intro {
    position: absolute;
    top: 50%;
    left: 10vw;
    transform: translateY(-50%);
    max-width: 40vw;
    pointer-events: none;
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
    display: inline-block;
    padding: 0 0.35rem;
    margin: 0 -0.35rem;
    transition: background-color 0.5s, color 0.5s;
  }

  a:hover {
    background-color: var(--light-color);
    color: var(--dark-color);
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

<section class="intro">
  <h1>Hello!</h1>

  <p>
    I'm Derek Hurley, a UI engineer at <a href="https://aclima.io/" target="_blank" rel="noopener noreferrer">Aclima</a> from the Pacific Northwest. I enjoy (a lot of) tea, outdoor adventures, corny jokes, and discovering new music. In fact, I last listened to <a href={track.url} target="_blank" rel="noopener noreferrer">{track.song} by {track.artist}</a>. Here you'll find some of my projects, I hope take a look around.
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
