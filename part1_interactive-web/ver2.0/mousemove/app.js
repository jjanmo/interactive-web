const $h1 = document.querySelector('h1');
const $imageWrapper = document.querySelector('.image-wrapper');

let x = 0,
  y = 0,
  targetX = 0,
  targetY = 0;
let speed = 0.02;

window.addEventListener('mousemove', (e) => {
  $h1.textContent = `
  pageX : ${e.pageX}, pageY : ${e.pageY} ✅
  clienX : ${e.clientX}, clientY : ${e.clientY} 
  offsetX : ${e.offsetX}, offsetY : ${e.offsetY}
  screenX : ${e.screenX}, screenY : ${e.screenY}`;

  x = e.pageX;
  y = e.pageY;
});

const animate = () => {
  targetX += (x - targetX) * speed;
  targetY += (y - targetY) * speed;

  $imageWrapper.style.top = `${targetY}px`;
  $imageWrapper.style.left = `${targetX}px`;
  requestAnimationFrame(animate);
};
animate();
