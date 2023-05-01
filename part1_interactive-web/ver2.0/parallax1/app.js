const $progress = document.querySelector('.progress');
const $filled = document.querySelector('.filled');
const $depth = document.querySelector('.depth');
const animals = document.querySelectorAll('.animal');

const directionMap = {
  0: 'left',
  1: 'center',
  2: 'right',
};

function renderDepth() {
  const depth = Math.ceil(window.scrollY / 10);
  if (depth > 10) {
    $depth.style.opacity = 1;
    $depth.querySelector('.value').textContent = `${depth}`;
  } else $depth.style.opacity = 0;
}

function handleScroll() {
  const currentRatio =
    window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);

  $filled.style.width = `${100 * currentRatio}%`;

  renderDepth();
}

function init() {
  animals.forEach(($animal) => {
    const marginTop = Math.floor(Math.random() * 150 + 100);
    const marginBottom = Math.floor(Math.random() * 150 + 100);
    const directionKey = Math.floor(Math.random() * 3);

    $animal.style.margin = `${marginTop}px 0 ${marginBottom}px`;
    $animal.classList.add(directionMap[directionKey]);
  });

  window.addEventListener('scroll', handleScroll);
  renderDepth();
}

init();
