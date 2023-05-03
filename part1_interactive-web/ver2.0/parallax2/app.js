const header = document.querySelector('.header');
const filled = document.querySelector('.filled');
const dimmed = document.querySelector('.dimmed');
const title = document.querySelector('.title');
const topBackground = document.querySelector('.top-background');

const handleScroll = () => {
  const scrollY = window.scrollY;
  const ratio =
    scrollY / (document.documentElement.scrollHeight - window.innerHeight);

  filled.style.width = `${Math.floor(ratio * 100)}%`;

  if (scrollY > window.innerHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
    // ratio 대신 scrollY를 이용할수도 있음. 그럼 * 대신 / 를 사용하여 이펙트를 확인해야함
    dimmed.style.opacity = ratio * 4;
    title.style.transform = `translate(-50%, -${ratio * 1000}%)`;
    topBackground.style.transform = `translateY(-${ratio * 150}%)`;
  }
};

window.addEventListener('scroll', handleScroll);
