const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

const $controls = document.querySelector('.controls');
const $brush = document.querySelector('#brush');
const $brushValue = document.querySelector('.brush-value');
const $saveButton = document.querySelector('.save-button');
const $image = new Image();

const COLOR = {
  sunflower: '#f1c40f',
  orange: '#f39c12',
  emerald: '#2ecc71',
  sky: '#87ceeb',
  midnight: '#2c3e50',
  black: ' #000',
};
const DEFAULT_WIDTH = 10;

let prevButtonId = 'black';
let isPainting = false;
let currentMode = 'paint'; // paint | erase | image
let currentColor = '#000';

function initBrush() {
  $brush.value = DEFAULT_WIDTH;
  $brushValue.textContent = DEFAULT_WIDTH;
  context.lineWidth = DEFAULT_WIDTH;
}

function changeButtonStyle(target) {
  document.querySelector(`#${prevButtonId}`).classList.remove('active');
  prevButtonId = target.id;
  target.classList.add('active');
}

function handleClickControls(e) {
  const target = e.target;
  if (target.tagName === 'BUTTON') {
    // 버튼 로직
    const mode = target.dataset.mode;
    if (mode === 'paint') {
      const id = target.id;
      currentColor = COLOR[id];
      context.strokeStyle = currentColor; // change stroke color
    } else if (mode === 'image') {
      const src = `./assets/${target.id}.png`;
      $image.src = src;
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
      initBrush();
      return;
    }
    currentMode = mode;

    changeButtonStyle(target);
  }
}

function handleChangeBrush(e) {
  const value = e.target.value;
  $brushValue.textContent = value;
  context.lineWidth = value;
}

function handleMouseup() {
  isPainting = false;
}
function handleMousedown() {
  isPainting = true;
}

function handleMousemove(e) {
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
    context.drawImage($image, posX, posY, 40, 40);
  }
}

function handleClickDownload() {
  const url = canvas.toDataURL('image/png', 0.9);
  const $link = document.createElement('a');
  $link.download = 'canvas-image';
  $link.href = url;
  $link.click();
  $link.remove();
}

function initCanvas() {
  context.lineWidth = 10;

  $controls.addEventListener('click', handleClickControls);
  $brush.addEventListener('input', handleChangeBrush);
  $saveButton.addEventListener('click', handleClickDownload);

  canvas.addEventListener('mouseup', handleMouseup);
  canvas.addEventListener('mousedown', handleMousedown);
  canvas.addEventListener('mousemove', handleMousemove);
}

initCanvas();
