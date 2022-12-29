(function () {
  const $picture = document.querySelector('.picture');
  const $rocket = document.querySelector('.rocket');

  document.addEventListener('click', (e) => {
    const { width, height } = $picture.getBoundingClientRect();
    const posX = e.clientX - width / 2;
    const posY = e.clientY - height / 2;

    $picture.style.transform = `translate(${posX}px, ${posY}px)`;
  });

  let loc = 0;
  let rafId;

  function launch() {
    loc = loc + 20;
    $rocket.style.bottom = `${loc}px`;

    rafId = requestAnimationFrame(launch);

    if (loc > 800) {
      cancelAnimationFrame(rafId);
    }
  }
  launch();
})();
