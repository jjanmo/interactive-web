let x = 0,
  targetX = 0;
const speed = 0.09;

const $panel = document.querySelector('.panel img');
const $artist = document.querySelector('.artist img');
const $text = document.querySelector('.rollbounce img');
const $date = document.querySelector('.date img');

window.addEventListener('mousemove', (e) => {
  x = e.pageX - window.innerWidth / 2;
});

const animate = () => {
  targetX += (x - targetX) * speed;

  $panel.style.transform = `translateX(${targetX / 50}px) rotateY(${
    -x / 25
  }deg)`;
  $artist.style.transform = `translateX(${-targetX / 40}px)`;
  $text.style.transform = `translateX(${-targetX / 100}px)`;
  $date.style.transform = `translateX(${targetX / 35}px)`;

  window.requestAnimationFrame(animate);
};
animate();
