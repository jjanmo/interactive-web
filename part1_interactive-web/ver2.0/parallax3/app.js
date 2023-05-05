const images = document.querySelectorAll('.image');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // scrollY / 분모 : 분모가 커야 결과값이 작아짐 → 결과값이 작으면 더 적게 움직임 → 뒷쪽 이미지가 더 적게 움직여야함
  images.forEach((image, index, array) => {
    image.style.transform = `translateY(${
      -scrollY / (4 * (array.length - index))
    }px)`;
  });
});
