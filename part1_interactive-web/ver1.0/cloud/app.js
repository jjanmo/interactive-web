const $filled = document.querySelector('.filled');
const $cloudWrapper = document.querySelector('.cloudWrapper');
const height = document.documentElement.scrollHeight; // 문서 전체 높이

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop; // 문서의 스크롤 위치
  const scrolled = (scrollTop / (height - window.innerHeight)) * 100;

  $filled.style.height = `${scrolled}%`;
  $cloudWrapper.style.transform = `translate(0, ${scrollTop / 4}px)`;
});
