const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#eee';

// charater
const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};
dino.draw();

class Cactus {
  constructor() {
    this.x = window.innerWidth - 50;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const cactuses = [];
// 시간의 흐름은 항상 프레임으로 계산한다.: 타이머 변수가 필요
let timer = 0;
let jumpTimer = 0;
let isJumping = false;

function move() {
  requestAnimationFrame(move);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 60 === 0) {
    const cactus = new Cactus();
    cactuses.push(cactus);
  }

  cactuses.forEach((catcus, index) => {
    if (catcus.x < 0) {
      cactuses.splice(index, 1);
    }

    catcus.x -= 5;
    catcus.draw();
  });

  if (isJumping) {
    dino.y -= 5;
    jumpTimer++;
    if (jumpTimer > 30) {
      isJumping = false;
    }
  } else {
    if (dino.y < 200) {
      dino.y += 5;
      jumpTimer = 0;
    }
  }

  dino.draw();
}

move();

const handleKeydown = e => {
  if (e.code === 'Space') {
    isJumping = true;
  }
};

document.addEventListener('keydown', handleKeydown);
