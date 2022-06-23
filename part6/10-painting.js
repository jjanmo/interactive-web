const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

const $palette = document.querySelector('.palette');
const $brush = document.querySelector('#brush');
const $brushValue = document.querySelector('.brush-value');

let currentColor = '#f1c40f';
let brushWidth = 10;

$palette.addEventListener('click', (e) => {
  const target = e.target;

  if (target.tagName === 'BUTTON') {
    const color = target.id;
    currentColor = color;
  }
});

$brush.addEventListener('input', (e) => {
  const value = e.target.value;
  $brushValue.textContent = value;
  brushWidth = value;
});

canvas.addEventListener('click', (e) => {
  const posX = e.offsetX;
  const posY = e.offsetY;

  context.beginPath();
  context.arc(posX, posY, 10, 0, Math.PI * 2, false);
  context.fill();
});
