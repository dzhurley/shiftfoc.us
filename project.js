let activeProject;

const setProject = (name, href, desc) => {
  const id = href.split('/').reduce((name, part) => part);
  document.querySelector('.project').innerHTML = `
    <span>
      <a class="launch" href="${href}" target="_blank" rel="noopener noreferrer">launch</a>
      /
      <a class="code" href="https://github.com/dzhurley/${id}" target="_blank" rel="noopener noreferrer">code</a>
    </span>
    <p>${desc}</p>
    <img src="/static/images/${id}.png" alt="${name}" />
  `;
};

document.querySelector('.projects').addEventListener('click', evt => {
  evt.preventDefault();
  const { textContent, href, parentNode } = evt.target;
  if (activeProject !== textContent) {
    setProject(textContent, href, parentNode.title);
    activeProject = textContent;
  }
  return false;
});
