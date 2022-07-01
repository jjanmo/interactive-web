const $pupils = document.querySelectorAll('.pupil'); // 눈동자들

function getDegree(target, mouse) {
  const pupilArea = target.getBoundingClientRect(); //  눈동자 영역에 대한 정보
  const { x, y, width, height } = pupilArea;
  const centerX = x + width * 0.5; // 영역의 X 중심좌표
  const centerY = y + height * 0.5; // 영역의 Y 중심좌표
  const degree =
    (Math.atan2(mouse.y - centerY, mouse.x - centerX) * 180) / Math.PI; // 눈동가자 움직이는 각도

  return degree;
}

function moveEye(target, mouse) {
  const degree = getDegree(target, mouse);
  target.style.transform = `rotate(${degree + 90}deg)`; // + 90도 : 최초 위치 보정
}

window.addEventListener('mousemove', (e) => {
  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };

  $pupils.forEach(($pupil) => moveEye($pupil, mouse));
});
