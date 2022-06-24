const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

const $controls = document.querySelector('.controls');
const $brush = document.querySelector('#brush');
const $brushValue = document.querySelector('.brush-value');

let previousColorButton = document.querySelector('.black');
let brushWidth = 10;
let isPainting = false;
let currentMode = 'none'; // none | paint | erase | image
let currentColor = 'black';
let currentImage = '';

$controls.addEventListener('click', (e) => {
  const target = e.target;

  if (target.tagName === 'BUTTON') {
    // 버튼 로직
    const mode = target.dataset.mode;

    if (mode === 'paint') {
      const color = target.id;
      currentColor = color;
      context.fillStyle = currentColor; // change fill color
    } else if (mode === 'erase') {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    } else if (mode === 'image') {
      const src = `./assets/${target.id}.png`;
      currentImage = src;
    }
    currentMode = mode;

    // 버튼 스타일 변경
    previousColorButton.classList.remove('active');
    previousColorButton = target;
    target.classList.add('active');
  }
});

$brush.addEventListener('input', (e) => {
  const value = e.target.value;
  $brushValue.textContent = value;
  brushWidth = value;
});

canvas.addEventListener('mouseup', () => {
  isPainting = false;
});
canvas.addEventListener('mousedown', () => {
  isPainting = true;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isPainting) return;

  const posX = e.offsetX;
  const posY = e.offsetY;
  if (currentMode === 'paint') {
    context.beginPath();
    context.arc(posX, posY, brushWidth / 2, 0, Math.PI * 2, false);
    context.fill();
  } else if (currentMode === 'image') {
    const image = new Image();
    image.src = currentImage;
    context.drawImage(image, posX, posY, 40, 40);
  }
});
