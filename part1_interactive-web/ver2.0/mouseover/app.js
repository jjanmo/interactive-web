let x = 0,
  y = 0,
  targetX = 0,
  targetY = 0;

const SPEED = 0.09;
const $cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
  x = e.pageX;
  y = e.pageY;
});

const animate = () => {
  targetX += (x - targetX) * SPEED;
  targetY += (y - targetY) * SPEED;

  $cursor.style.top = `${targetY}px`;
  $cursor.style.left = `${targetX}px`;

  requestAnimationFrame(animate);
};

animate();
