const $picture = document.querySelector('.picture');

document.addEventListener('click', (e) => {
  const { width, height } = $picture.getBoundingClientRect();
  const posX = e.clientX - width / 2;
  const posY = e.clientY - height / 2;

  $picture.style.transform = `translate(${posX}px, ${posY}px)`;
});
