const images = document.querySelectorAll('.image');
const image7 = document.querySelector('.image7');
const mousemoveImages = [
  image7,
  images[5], // image6
  images[4], // image5
];

const speed = 0.09;
let targetX = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // scrollY / 분모 : 분모가 커야 결과값이 작아짐 → 결과값이 작으면 더 적게 움직임 → 뒷쪽 이미지가 더 적게 움직여야함
  images.forEach((image, index, array) => {
    image.style.transform = `translateY(${
      -scrollY / (4 * (array.length - index))
    }px)`;
  });
});

window.addEventListener('mousemove', (e) => {
  const x = e.pageX; // clientX  로 해도 같음(이 구현은 페이지가 스크롤되지 않는 상태에서 일어나기때문에)
  targetX += (x - targetX) * speed;
});

const animate = () => {
  const distance = targetX - window.innerWidth / 2;

  mousemoveImages.forEach((image, index) => {
    console.log(distance / ((index + 1) * 50));
    image.style.transform = `translateX(${-(
      distance /
      ((index + 1) * 25)
    )}px) scale(1.05)`;
  });

  window.requestAnimationFrame(animate);
};
animate();
