const $face = document.querySelector('.face');

$face.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('clicked');
});
