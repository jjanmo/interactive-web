const $boxs = document.querySelectorAll('.box');
const $buttons = document.querySelector('.buttons');
const $radios = document.querySelectorAll('.radio');

let origin = 'cc';

$buttons.addEventListener('click', (e) => {
  const target = e.target;
  const originText = target.textContent;
  const _origin = target.className;

  if (target.tagName !== 'BUTTON') return;

  document.querySelector(`.${origin}`).classList.remove('clicked');
  target.classList.add('clicked');

  origin = _origin;
  $boxs.forEach(($box) => {
    $box.style.transformOrigin = originText;
  });
});

$radios.forEach(($radio) => {
  $radio.addEventListener('click', (e) => {
    if (e.target.value === '적용') {
      $boxs.forEach(($box) => {
        $box.classList.add('transition');
      });
    } else {
      $boxs.forEach(($box) => {
        $box.classList.remove('transition');
      });
    }
  });
});
