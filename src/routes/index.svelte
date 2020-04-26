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
</script>

<style>
  .intro {
    margin-left: 10vw;
    padding-top: 10vh;
    max-width: 40vw;
  }

  .projects {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
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
  <Portrait />
</section>

<section class="intro">
  <h1>Hallo</h1>

  <p>
    Offal 8-bit bitters, echo park mlkshk kale chips succulents pug hashtag subway tile venmo selfies. Thundercats messenger bag fingerstache kickstarter air plant. Neutra fashion axe tousled, next level readymade everyday carry four dollar toast tacos YOLO prism af keytar brunch ugh etsy. Cloud bread everyday carry cliche gentrify edison bulb typewriter, vice raw denim enamel pin pok pok leggings gochujang fixie artisan.
  </p>

  <ul class="projects">
    {#each projects as project}
      <li><a rel='prefetch' href='/{project.slug}'>{project.title}</a></li>
    {/each}
  </ul>
</section>
