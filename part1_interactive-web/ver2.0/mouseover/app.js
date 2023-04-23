let x = 0,
  y = 0,
  targetX = 0,
  targetY = 0;

const SPEED = 0.07;
const $cursor = document.querySelector('.cursor');
const $circle = document.querySelector('.circle');
const $answers = document.querySelectorAll('.answer');

window.addEventListener('mousemove', (e) => {
  x = e.pageX;
  y = e.pageY;
});

const animate = () => {
  targetX += (x - targetX) * SPEED;
  targetY += (y - targetY) * SPEED;

  $cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
  requestAnimationFrame(animate);
};

animate();

$answers.forEach(($) => {
  $.addEventListener('mouseover', () => {
    $circle.style.transform = `translate(-50%, -50%) scale(0.4)`;
  });
  $.addEventListener('mouseout', () => {
    $circle.style.transform = `translate(-50%, -50%) scale(1)`;
  });
});
