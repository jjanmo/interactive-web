const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const $playButton = document.querySelector('.play-button');
const $cover = document.querySelector('.cover');
const $score = document.querySelector('.score');
const BOX_COUNT = 1;
let boxes = [];
let clickedBox = null;
let step = 1; // 1 : 게임 시작 + 진행 | 2 : 모달 그려지는 중 | 3: 게임 결과값 노출
let modal = null;
let time = 0;
let isEnd = false;
let rafMethod = null;

function init() {
  for (let i = 0; i < BOX_COUNT; i++) {
    const side = Math.floor(Math.random() * 100) + 60;
    const posX = Math.random() * (canvas.width - side);
    const posY = Math.random() * (canvas.height - side);
    boxes.push(new Box(i + 1, posX, posY, side));

    modal = new Modal();
  }
}

function render() {
  switch (step) {
    case 1: {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];

        // 상자 x축 이동
        box.x += box.speed;
        if (box.x > 1200 + box.side) {
          box.x = -box.side;
        }
        // 상자 각도 변경
        box.degree += 90 * box.scaleSpeed;

        box.draw();
      }
      break;
    }
    case 2: {
      modal.scaleValue += (1 - modal.scaleValue) * 0.07;
      modal.draw();

      if (modal.scaleValue >= 0.99) {
        step = 3;
      }
      break;
    }
    case 3: {
      modal.draw();
      modal.showResult(time);
      isEnd = true;
      break;
    }
  }

  rafMethod = requestAnimationFrame(render);
  if (isEnd) cancelAnimationFrame(rafMethod);
}

function handleClickBox(e) {
  const posX = e.offsetX;
  const posY = e.offsetY;

  for (let i = 0; i < boxes.length; i++) {
    const curBox = boxes[i];
    if (
      posX >= curBox.x &&
      posX <= curBox.x + curBox.side &&
      posY >= curBox.y &&
      posY <= curBox.y + curBox.side
    ) {
      clickedBox = curBox.index;
    }
  }

  if (clickedBox !== null) {
    boxes = boxes.filter((box) => box.index !== clickedBox);
    clickedBox = null;

    if (boxes.length === 0) {
      utils.clearTimer();
      console.log(time);
      setTimeout(() => {
        step = 2;
      }, 100);
    }
  }
}

function handleClickStart() {
  $playButton.classList.add('hidden');
  $cover.classList.add('fadeout');

  init(); // 게임요소 셋팅

  setTimeout(() => {
    $cover.classList.add('hidden');
    render(); // 게임 시작
    utils.timer(time);
  }, 500);
}

canvas.addEventListener('click', handleClickBox);
$playButton.addEventListener('click', handleClickStart);
