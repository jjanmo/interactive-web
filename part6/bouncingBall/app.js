const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const BALL_COUNT = 50;
const balls = [];

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    if (ball.x <= ball.radius || ball.x >= canvas.width - ball.radius) {
      ball.dx = -ball.dx;
    }
    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
      ball.dy = -ball.dy;
    }
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
    const radius = Math.floor(Math.random() * 80 + 1);
    const posX = Math.random() * (canvas.width - radius * 2) + radius;
    const posY = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 20;
    const dy = (Math.random() - 0.5) * 20;
    const ball = new Ball(posX, posY, dx, dy, radius);
    balls.push(ball);
    ball.draw();
  }
}

init();
animation();
