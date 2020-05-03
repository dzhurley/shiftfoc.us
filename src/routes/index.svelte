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
  import Portrait from '../components/Portrait.svelte';

  export let projects;

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

  .projects {
    margin: 0 -0.5rem;
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 1fr;
    list-style: none;
  }

  .projects a {
    pointer-events: auto;
    display: inline-block;
    padding: 0 0.5rem;
    text-decoration: none;
    transition: background-color 0.5s, color 0.5s;
  }

  .projects a:hover {
    background-color: var(--light-color);
    color: var(--dark-color);
  }

  @media (min-width: 1000px) {
    .projects {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1400px) {
    .projects {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>

<svelte:head>
  <title>shiftfoc.us</title>
</svelte:head>

<Portrait active={active} />

<section class="intro">
  <h1>Hallo</h1>

  <p>
    Offal 8-bit bitters, echo park mlkshk kale chips succulents pug hashtag
    subway tile venmo selfies. Thundercats messenger bag fingerstache
    kickstarter air plant. Neutra fashion axe tousled, next level readymade
    everyday carry four dollar toast tacos YOLO prism af keytar brunch ugh
    etsy. Cloud bread everyday carry cliche gentrify edison bulb typewriter,
    vice raw denim enamel pin pok pok leggings gochujang fixie artisan.
  </p>

  <ul class="projects">
    {#each projects as project}
      <li
        on:mouseover={() => handleMouseover(project.slug)}
        on:mouseout={handleMouseout}
      >
        <a rel='prefetch' href='/{project.slug}'>
          {project.title}
        </a>
      </li>
    {/each}
  </ul>
</section>
