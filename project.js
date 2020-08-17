const setProject = (name, href, desc) => {
  const id = href.split('/').reduce((name, part) => part);
  document.querySelector('.project').innerHTML = `
    <img src="/static/images/${id}.png" alt="${name}" />
    <p>${desc}</p>
    <a class="launch" href="${href}" target="_blank" rel="noopener noreferrer">
      <button>launch</button>
    </a>
    <a class="code" href="https://github.com/dzhurley/${id}" target="_blank" rel="noopener noreferrer">
      <button>code</button>
    </a>
  `;
};

document.querySelector('.projects').addEventListener('click', evt => {
  evt.preventDefault();
  setProject(
    evt.target.textContent,
    evt.target.href,
    evt.target.parentNode.title,
  );
  return false;
});
