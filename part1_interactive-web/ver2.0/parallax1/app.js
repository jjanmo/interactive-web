const $progress = document.querySelector('.progress');
const $filled = document.querySelector('.filled');

window.addEventListener('scroll', () => {
  const currentRatio =
    window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);

  $filled.style.width = `${100 * currentRatio}%`;
});
