const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const $playButton = document.querySelector('.play-button');
const $restartButton = document.querySelector('.restart-button');
const $cover = document.querySelector('.cover');
const $score = document.querySelector('.score');
const BOX_COUNT = 5;

let boxes = [];
let clickedBox = null;
let step = 1; // 1 : 게임 시작 + 진행 | 2 : 모달 그려지는 중 | 3: 게임 결과값 노출
let time = 0; // 게임 걸리는 시간 전역 변수
let isEnd = false;
let modal = null; // 점수 결과 모달 객체
let rafMethod = null; // requestAnimationFrame method

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
      context.clearRect(0, 0, canvas.width, canvas.height); // 주석처리하면 다른 효과를 줄 수 있음
      modal.scaleValue += (1 - modal.scaleValue) * 0.07; // 가속도 효과 부여
      modal.degree = 720 * modal.scaleValue; // modal.scaleValue에 이미 가속도 효과가 붙어있어서 각도에는 따로 주지 않아도 된다.
      modal.draw();

      if (modal.scaleValue > 0.9999) {
        modal.scaleValue = 1;
        modal.degree = 720;
        step = 3;
      }
      break;
    }
    case 3: {
      modal.draw();
      modal.showResult(time);
      isEnd = true;
      $restartButton.classList.remove('hidden');
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
      step = 2;
    }
  }
}

function handleClickStart() {
  $playButton.classList.add('hidden');
  $cover.classList.add('hidden');
  $cover.classList.add('fadeout');

  init(); // 게임요소 셋팅
  render(); // 게임 시작
  utils.timer(time); // 타이머 시작
}

function handleClickRestart() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  modal = null;
  rafMethod = null;
  clickedBox = null;
  boxes = [];
  step = 1;
  time = 0;
  isEnd = false;

  $playButton.click();
  $restartButton.classList.add('hidden');
}

canvas.addEventListener('click', handleClickBox);
$playButton.addEventListener('click', handleClickStart);
$restartButton.addEventListener('click', handleClickRestart);
