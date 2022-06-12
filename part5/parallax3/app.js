const $image1 = document.querySelector('.image1');
const $image2 = document.querySelector('.image2');
const $image3 = document.querySelector('.image3');
const $image4 = document.querySelector('.image4');
const $image5 = document.querySelector('.image5');
const $image6 = document.querySelector('.image6');
const $image7 = document.querySelector('.image7');

let scrolled = 0;
let posX = 0,
  posY = 0,
  mX = 0,
  mY = 0,
  speed = 0.09;

window.addEventListener('scroll', () => {
  scrolled = document.documentElement.scrollTop;
});
