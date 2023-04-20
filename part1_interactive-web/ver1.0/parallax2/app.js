const $filled = document.querySelector('.filled');
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

window.addEventListener('mousemove', (e) => {
  posX = e.clientX / 2;
  posY = e.clientY / 2;
});

const mousemove = () => {
  mX += (posX - mX) * speed;
  mY += (posY - mY) * speed;

  $image5.style.transform = `translate(${mX / 140}px, -${scrolled * 0.22}px)`;
  $image6.style.transform = `scale(1.2) translate(${mX / 50}px, -${
    scrolled * 0.25
  }px)`;
  $image7.style.transform = `scale(1.2) translate(-${mX / 30}px, -${
    mY / 20
  }px)`;

  window.requestAnimationFrame(mousemove);
};

mousemove();

// mY, mY, scrolled를 얼마만큼씩 움직일것인가를 연산(곱하기/나누기)을 통해서 구현해준다
// 이 때, 어떤 효과를 어떻게 줄것인지를 직접 값을 넣어주면서 확인해봐야할듯... 효과가 어떻게 변하는지 많이 보고 만져보는 것이 중요!
