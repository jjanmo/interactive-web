const quote = document.querySelector('.quote-box');
const scenes = document.querySelectorAll('.scene');
const animatedImgs = document.querySelectorAll('.animated > img');
const animatedVideo = document.querySelectorAll('.animated > video');
console.log(animatedImgs, animatedVideo);
const color = ['color1', 'color2', 'color3'];

window.addEventListener('scroll', () => {
  if (window.scrollY > 650) {
    quote.style.opacity = 1;
    quote.style.transform = 'translateY(0) rotateY(0) skewY(0)';
  }

  for (let i = 0; i < scenes.length; i++) {
    if (window.scrollY <= scenes[i].offsetTop) {
      document.body.className = color[i];
      break;
    }
  }
});

let mX = 0,
  mY = 0,
  posX = 0,
  posY = 0,
  speed = 0.003;

window.addEventListener('mousemove', (e) => {
  posX = e.clientX / 4;
  posY = e.clientY / 4;
  console.log(posX, posY);
});

function animate() {
  mX += (posX - mX) * speed;
  mY += (posY - mY) * speed;

  animatedImgs[0].style.transform = `translate(-${mX / 2}px, -${mY / 2}px)`;
  animatedImgs[1].style.transform = `translate(${mX / 2}px, ${mY / 2}px)`;
  animatedImgs[2].style.transform = `translate(${mX / 4}px, -${mY / 3}px)`;
  animatedImgs[3].style.transform = `translate(${mX / 6}px, ${mY / 6}px)`;
  animatedVideo[0].style.transform = `translate(${mX}px, ${mY}px)`;

  window.requestAnimationFrame(animate);
}

animate();
