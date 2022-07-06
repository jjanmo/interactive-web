const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const BALL_COUNT = 400;
const balls = [];
let mX, mY;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', scale);

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

    if (
      // 커지는 경우
      xDistance <= 50 &&
      xDistance >= -50 &&
      yDistance <= 50 &&
      yDistance >= -50 &&
      ball.radius <= ball.originalRadius + 50
    ) {
      ball.radius += 1;
    } else if (
      (xDistance > 50 && ball.radius > ball.originalRadius) ||
      (xDistance < -50 && ball.radius > ball.originalRadius) ||
      (yDistance > 50 && ball.radius > ball.originalRadius) ||
      (yDistance < -50 && ball.radius > ball.originalRadius)
    ) {
      ball.radius -= 1;
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
    const radius = Math.floor(Math.random() * 50 + 1);
    const posX = Math.random() * (canvas.width - radius * 2) + radius;
    const posY = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;
    const ball = new Ball(posX, posY, dx, dy, radius);
    balls.push(ball);
    ball.draw();
  }
}

init();
animation();
