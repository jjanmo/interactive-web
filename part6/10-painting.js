const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

const $controls = document.querySelector('.controls');
const $brush = document.querySelector('#brush');
const $brushValue = document.querySelector('.brush-value');
const $saveButton = document.querySelector('.save-button');
const $image = new Image();

let previousColorButton = document.querySelector('.black');
let brushWidth = 10;
let isPainting = false;
let currentMode = 'paint'; // paint | erase | image
let currentColor = '#000';
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
    } else {
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
  const posX = e.offsetX;
  const posY = e.offsetY;
  if (currentMode === 'paint') {
    if (isPainting) {
      context.lineTo(posX, posY);
      context.stroke();
    } else {
      context.beginPath();
      context.moveTo(posX, posY);
    }
  } else if (currentMode === 'image' && isPainting) {
    $image.src = currentImage;
    context.drawImage($image, posX, posY, 40, 40);
  }
});

$saveButton.addEventListener('click', () => {
  const url = canvas.toDataURL('image/png', 0.9);
  const $link = document.createElement('a');
  $link.download = 'canvas-image';
  $link.href = url;
  $link.click();
  $link.remove();
});
