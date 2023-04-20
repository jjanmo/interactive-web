const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const BALL_COUNT = 300;
const MAX_RADIUS = 70;
let balls = [];
let mX, mY;

window.addEventListener('resize', handleResize);
window.addEventListener('mousemove', scale);
canvas.addEventListener('click', handleClickAddBalls);

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function handleClickAddBalls() {
  for (let i = 0; i < 100; i++) {
    const radius = Math.floor(Math.random() * 10 + 1);
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;
    const ball = new Ball(mX, mY, dx, dy, radius);
    balls.push(ball);
  }
}

function scale(e) {
  mX = e.clientX;
  mY = e.clientY;
}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const xDistance = mX - ball.x;
    const yDistance = mY - ball.y;

    // 마우스 커서의 위치에서의 공 설정
    // -> 1) 공을 기준으로 마우스 커서가 들어왔는지 판단하려고 한 로직은 제대로 작동하지 않음 👎
    // -> 2) 공과 커서의 거리를 기준으로 로직을 체크 ⭕️
    if (
      xDistance <= 50 &&
      xDistance >= -50 &&
      yDistance <= 50 &&
      yDistance >= -50 &&
      ball.radius <= ball.originalRadius + MAX_RADIUS
    ) {
      ball.radius += 4;
    } else if (
      (xDistance > 50 ||
        xDistance < -50 ||
        yDistance > 50 ||
        yDistance < -50) &&
      ball.radius > ball.originalRadius
    ) {
      ball.radius -= 4;
    }

    // 공 방향 변경
    if (ball.x <= ball.radius || ball.x >= canvas.width - ball.radius) {
      ball.dx = -ball.dx;
    }
    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
      ball.dy = -ball.dy;
    }

    // 공 이동
    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.draw();
  }

  requestAnimationFrame(animation);
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < BALL_COUNT; i++) {
    const radius = Math.floor(Math.random() * 10 + 1);
    const posX = Math.random() * (canvas.width - radius * 2) + radius;
    const posY = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 3;
    const dy = (Math.random() - 0.5) * 3;
    const ball = new Ball(posX, posY, dx, dy, radius);
    balls.push(ball);
    ball.draw();
  }
}

init();
animation();
