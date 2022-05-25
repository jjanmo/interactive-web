(function () {
  // let speed = 0.09;
  // // 마우스가 움직이는 위치(정해지는 값)
  // let posX = 0,
  //   posY = 0,
  //   // 궁극적으로 마우스가 posX와 posY로 가기위해서 거쳐가는 값
  //   mX = 0,
  //   mY = 0;
  const $star = document.querySelector('.star');

  // 1) 자바스크립트를 이용하는 방법
  // const move = () => {
  //   mX += (posX - mX) * speed;
  //   mY += (posY - mY) * speed;
  //   $star.style.transform = `translate3D(${mX}px, ${mY}px, 0)`;

  //   window.requestAnimationFrame(move);
  // };
  // move();

  // window.addEventListener('mousemove', (e) => {
  //   posX = e.clientX;
  //   posY = e.clientY;
  // });

  // 2) CSS를 이용하는 움직임
  window.addEventListener('click', (e) => {
    $star.style.transform = `translate3D(${e.clientX}px, ${e.clientY}px, 0)`;
  });
})();
