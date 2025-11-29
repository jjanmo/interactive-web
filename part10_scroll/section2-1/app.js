function init() {
  const $bar = document.querySelector('.bar');
  const $percent = document.querySelector('.percent');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollableHeight = scrollHeight - clientHeight;
    const ratio = scrollTop / scrollableHeight;

    $bar.style.width = `${ratio * 100}%`;
    $percent.textContent = `${Math.floor(ratio * 100)}%`;
  });
}

init();
