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
    top: 10vh;
    left: 10vw;
    max-width: 40vw;
    pointer-events: none;
  }

  .projects {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
  }

  .projects a {
    pointer-events: auto;
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

  .portrait {
    max-height: 100vh;
    max-width: 100vh;
    position: absolute;
    bottom: -2rem;
    right: 5vw;
  }
</style>

<svelte:head>
  <title>shiftfoc.us</title>
</svelte:head>

<section class="portrait">
  <Portrait active={active} />
</section>

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
