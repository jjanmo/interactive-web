const $progress = document.querySelector('.progress');
const $filled = document.querySelector('.filled');
const $depth = document.querySelector('.depth');
const animals = document.querySelectorAll('.animal');
const $submarine = document.querySelector('.submarine');
const $octopus = document.querySelector('.octopus');

const SUBMARINE_WIDTH = 400;
const directionMap = {
  0: 'left',
  1: 'center',
  2: 'right',
};

function handleScroll() {
  const scrollY = window.scrollY;
  const currentRatio =
    scrollY / (document.documentElement.scrollHeight - window.innerHeight);

  $filled.style.width = `${100 * currentRatio}%`;

  renderDepth(scrollY);
  moveForwardSubmarine(scrollY);
  moveUpOctopus(scrollY);
}

function renderDepth(scrollY) {
  const depth = Math.ceil(scrollY / 10);
  if (depth > 10) {
    $depth.style.opacity = 1;
    $depth.querySelector('.value').textContent = `${depth}`;
  } else $depth.style.opacity = 0;
}

function moveForwardSubmarine(scrollY) {
  const height = document.documentElement.scrollHeight;
  let distance = scrollY / 4;

  $submarine.style.transform = `translateX(${distance}px)`;
  $submarine.style.opacity = (height - scrollY) / height;
}

function moveUpOctopus(scrollY) {
  $octopus.style.transform = `translateY(${-scrollY / 9}px)`;
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
}

init();
