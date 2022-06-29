const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const $playButton = document.querySelector('.play-button');
const $cover = document.querySelector('.cover');
const $score = document.querySelector('.score');
const boxes = [];
const BOX_COUNT = 20;

context.font = 'bold 30px serif';

function init() {
  for (let i = 0; i < BOX_COUNT; i++) {
    const side = Math.floor(Math.random() * 100) + 50;
    const posX = Math.random() * (canvas.width - side);
    const posY = Math.random() * (canvas.height - side);
    const speed = Math.random() * 10 + 1;
    boxes.push(new Box(i + 1, posX, posY, side, speed));
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.x += box.speed;
    box.draw();
  }

  requestAnimationFrame(render);
}

function handleClickBox(e) {
  const posX = e.offsetX;
  const posY = e.offsetY;

  let clickedBox = '';
  for (let i = 0; i < boxes.length; i++) {
    const curBox = boxes[i];
    if (
      posX >= curBox.x &&
      posX <= curBox.x + curBox.side &&
      posY >= curBox.y &&
      posY <= curBox.y + curBox.side
    ) {
      clickedBox = curBox.text;
    }
  }

  alert(clickedBox);
}

function handleClickStart() {
  $playButton.classList.add('hidden');
  $cover.classList.add('fadeout');

  init();

  setTimeout(() => {
    $cover.classList.add('hidden');
    render();
  }, 1000);
}

canvas.addEventListener('click', handleClickBox);
$playButton.addEventListener('click', handleClickStart);
