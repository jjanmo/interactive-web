let scrollTop = 0;
const width = document.documentElement.offsetWidth;
const height = document.documentElement.offsetHeight; // 전체 문서의 높이
// === document.documentElement.scrollHeight;

const $filled = document.querySelector('.filled');
const $hFilled = document.querySelector('.horizontal-filled');

window.addEventListener('scroll', () => {
  scrollTop = document.documentElement.scrollTop;
  const filled = (scrollTop / (height - window.innerHeight)) * 100;
  $filled.style.width = `${filled}%`;

  $hFilled.style.height = `${filled}%`;
});

/*
offsetHeight : (CSS에서 측정한) 요소에 대한 높이 
scrollHeight : (요소 안에 들어 있는) 컨텐츠의 전체 높이
scrollTop : 현재위치의 수직 스크롤 위치
*/
