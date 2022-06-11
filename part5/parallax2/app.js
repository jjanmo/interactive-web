const $filled = document.querySelector('.filled');
const $image1 = document.querySelector('.image1');
const $image2 = document.querySelector('.image2');
const $image3 = document.querySelector('.image3');
const $image4 = document.querySelector('.image4');
const $image5 = document.querySelector('.image5');
const $image6 = document.querySelector('.image6');
const $image7 = document.querySelector('.image7');

window.addEventListener('scroll', () => {
  const scrolled = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight;
  const filled = (scrolled / (height - window.innerHeight)) * 100;
  $filled.style.width = `${filled}%`;

  $image1.style.transform = `translate(0, ${scrolled * 0.03}px)`;
  $image2.style.transform = `translate(0, -${scrolled * 0.03}px)`;
  $image3.style.transform = `translate(0, -${scrolled * 0.12}px)`;
  $image4.style.transform = `translate(0, -${scrolled * 0.16}px)`;
  $image5.style.transform = `translate(0, -${scrolled * 0.22}px)`;
  $image6.style.transform = `translate(0, -${scrolled * 0.25}px)`;
});
