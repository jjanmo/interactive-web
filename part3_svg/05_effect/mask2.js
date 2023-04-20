window.addEventListener('DOMContentLoaded', () => {
  const glass = document.querySelector('.glass');
  const magnifier = document.querySelector('.magnifier');

  window.addEventListener('mousemove', (e) => {
    glass.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    magnifier.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
});
