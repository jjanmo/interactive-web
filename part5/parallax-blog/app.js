const $cover = document.querySelector('.cover');
const $overlay = document.querySelector('.overlay');
const $text = document.querySelector('.text');

window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop;
  console.log(scroll);

  $cover.style.transform = `scale(${1 + scroll / 1000})`;
  $overlay.style.backgroundColor = `rgba(0, 0, 0, ${0.1 + scroll / 900})`;
  $text.style.transform = `translateY(-${scroll / 2}px)`;
});
