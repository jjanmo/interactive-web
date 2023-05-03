const header = document.querySelector('.header');
const brunch = document.querySelector('.brunch');
const filled = document.querySelector('.filled');
const overlay = document.querySelector('.overlay');
const logoLink = document.querySelector('.logo-link');
const icons = document.querySelector('.icons');

const setFixedHeader = () => {
  header.classList.add('fixed-header');
  brunch.classList.add('fixed-text');
  filled.classList.add('fixed-progress');
  logoLink.classList.add('fixed-logo');
  icons.classList.add('fixed-icons');
};

const removeFixedHeader = () => {
  header.classList.remove('fixed-header');
  brunch.classList.remove('fixed-text');
  filled.classList.remove('fixed-progress');
  logoLink.classList.remove('fixed-logo');
  icons.classList.remove('fixed-icons');
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  const ratio =
    scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  filled.style.width = `${ratio * 100}%`;

  overlay.style.opacity = ratio * 4;

  if (scrollY > window.innerHeight) {
    setFixedHeader();
  } else {
    removeFixedHeader();
  }
};

window.addEventListener('scroll', handleScroll);
