const $images = document.querySelectorAll('.image');

const TOTAL_IMAGES = $images.length;

window.addEventListener('scroll', () => {
  const scrolled = document.documentElement.scrollTop;
  console.log(scrolled);

  $images.forEach(($image, index) => {
    $image.style.transform = `perspective(500px) translateZ(${
      scrolled / (6 * (TOTAL_IMAGES - index))
    }px)`;
  });
});
