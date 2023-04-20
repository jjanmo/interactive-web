let mX = 0,
  mY = 0,
  posX = 0,
  posY = 0;
const speed = 0.009;

const pokemon = document.querySelector('#pokemon');
const background = document.querySelector('#forest');
const pointX = document.querySelector('.pointX');
const pointY = document.querySelector('.pointY');

function move() {
  mX += (posX - mX) * speed;
  mY += (posY - mY) * speed;
  // 나누기 연산으로 통해서 이동거리 조절, +-를 통해서 방향 설정
  pokemon.style.transform = `translate(${mX / 6}px, ${mY / 6}px)`;
  background.style.transform = `translate(${-mX / 4}px, ${-mY / 4}px)`;
  pointX.innerHTML = `posX : ${posX}, mX : ${mX},`;
  pointY.innerHTML = `posY : ${posY}, mX : ${mY},`;

  window.requestAnimationFrame(move);
}

window.addEventListener('mousemove', (e) => {
  // (최종)목표값을 수정한다!
  // → 중앙값 설정(화면의 중심으로 설정한다)
  posX = e.clientX - window.innerWidth / 2;
  posY = e.clientY - window.innerHeight / 2;
});

move();
