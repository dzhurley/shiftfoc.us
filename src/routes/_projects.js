export default [
  {
    title: 'asterhulls',
    summary: 'rotating belts of convex hull asteroids',
  },
  {
    title: 'color goo',
    summary: 'gooey metaballs that mix their colors',
  },
  {
    title: 'color webs',
    summary: 'experiments in trail decays on canvas',
  },
  {
    title: 'in radium',
    summary: 'what it looks like undergoing radiation for lymphoma',
  },
  {
    title: 'laudio',
    summary: 'laud your audio with reactive visuals',
  },
  {
    title: 'orbigami',
    summary: 'give a number, take a shape',
  },
  {
    title: 'p5 experiments',
    summary: 'learning p5 through experiments in interaction and color',
  },
  {
    title: 'soundscape',
    summary: 'a planet terraformed by your music',
  },
  {
    title: 'terrashaders',
    summary: 'little planets to try shaders out on',
  },
  {
    title: 'tetraxplorer',
    summary: 'a tetrahedron exploring the space around it',
  },
  {
    title: 'the joy of data',
    summary: 'explore the joy of painting, broken down by feature',
  },
  {
    title: 'vocaGLize',
    summary: 'mic reactive field of shapes',
  },
  {
    title: 'vorannoyed',
    summary: 'an annoyed explorer in a voronoi',
  },
].map(({ title, summary }) => ({
  title,
  summary,
  slug: title.replace(/ /g, '-'),
}));
