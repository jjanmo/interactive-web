function init() {
  const $bar = document.querySelector('.bar');
  const $percent = document.querySelector('.percent');

  window.addEventListener('scroll', () => {
    /** 현재 스크롤된 위치(스크롤 위치를 나타내는 값) */
    const scrollTop = document.documentElement.scrollTop;
    /** 전체 문서의 높이(보이지 않는 영역까지 포함한 전체 콘텐츠의 높이) */
    const documentHeight = document.documentElement.scrollHeight;
    /** 브라우저 창의 높이(화면에 보이는 높이) */
    const clientHeight = document.documentElement.clientHeight;
    /** 스크롤 가능한 최대 높이 */
    const scrollableHeight = documentHeight - clientHeight;
    const ratio = scrollTop / scrollableHeight;

    $bar.style.width = `${ratio * 100}%`;
    $percent.textContent = `${Math.floor(ratio * 100)}%`;
  });
}

init();
