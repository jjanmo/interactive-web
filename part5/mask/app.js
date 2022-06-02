let posX = 0,
  posY = 0,
  mX = 0,
  mY = 0;
const speed = 0.1;

const $cursor = document.querySelector('.cursor');
const $circle = document.querySelector('.circle');
const $yesButton = document.querySelector('.yes');
const $noButton = document.querySelector('.no');

window.addEventListener('mousemove', (e) => {
  posX = e.clientX;
  posY = e.clientY;
});

function mousemove() {
  mX += (posX - mX) * speed;
  mY += (posY - mY) * speed;

  $cursor.style.transform = `translate(${mX}px, ${mY}px)`;
  window.requestAnimationFrame(mousemove);
}
mousemove();

$yesButton.addEventListener('mouseenter', (e) => {
  $circle.style.transform = 'scale(0.3)';
});
$yesButton.addEventListener('mouseleave', (e) => {
  $circle.style.transform = 'scale(1)';
});
$noButton.addEventListener('mouseenter', (e) => {
  $circle.style.transform = 'scale(0.3)';
});
$noButton.addEventListener('mouseleave', (e) => {
  $circle.style.transform = 'scale(1)';
});
