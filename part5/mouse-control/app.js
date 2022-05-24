(function () {
  const $star = document.querySelector('.star');
  console.log($star);
  window.addEventListener('mousemove', (e) => {
    console.log(e.clientX, e.clientY);
    const posX = e.clientX;
    const posY = e.clientY;
    $star.style.transform = `translate3D(${posX}px, ${posY}px, 0)`;
  });
})();
