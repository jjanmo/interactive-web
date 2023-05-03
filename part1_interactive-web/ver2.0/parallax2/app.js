const header = document.querySelector('.header');
const brunch = document.querySelector('.brunch');
const filled = document.querySelector('.filled');

const setFixedHeader = () => {
  header.classList.add('fixed-header');
  brunch.classList.add('fixed-text');
  filled.classList.add('fixed-progress');
};

const removeFixedHeader = () => {
  header.classList.remove('fixed-header');
  brunch.classList.remove('fixed-text');
  filled.classList.remove('fixed-progress');
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  const ratio =
    scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  filled.style.width = `${ratio * 100}%`;

  if (scrollY > window.innerHeight) {
    setFixedHeader();
  } else {
    removeFixedHeader();
  }
};

window.addEventListener('scroll', handleScroll);
