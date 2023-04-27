let x = 0;

const $panel = document.querySelector('.panel img');
const $artist = document.querySelector('.artist img');
const $text = document.querySelector('.rollbounce img');
const $date = document.querySelector('.date img');

window.addEventListener('mousemove', (e) => {
  x = e.pageX - window.innerWidth / 2;

  $panel.style.transform = `translateX(${x / 50}px) rotateY(${-x / 70}deg)`;
  $artist.style.transform = `translateX(${-x / 40}px)`;
  $text.style.transform = `translateX(${-x / 100}px)`;
  $date.style.transform = `translateX(${x / 35}px)`;
});
