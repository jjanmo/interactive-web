gsap.registerPlugin(MotionPathPlugin);

const RADIUS = 17.803;
let order = 0;

const roadmap = document.querySelector('.roadmap');
const { x: rX, y: rY } = roadmap.getBoundingClientRect();

const spots = document.querySelectorAll('.spot');
const quaka = document.querySelector('#quaka');
const button = document.querySelector('#button');

const positions = [...spots].map((spot, index) => {
  const cX = Number(spot.attributes['2'].nodeValue);
  const cY = Number(spot.attributes['3'].nodeValue);
  console.log(index, cX, rX, '|', cY, rY);
  return {
    index,
    x: cX,
    y: cY - RADIUS - 10,
  };
});

const { x, y } = positions[order];

// quaka.style.top = `${y}px`;
// quaka.style.left = `${x}px`;

gsap.set('#quaka', {
  x,
  y,
});

// gsap
// const animation = gsap.to('#quaka', {
//   duration: 4,
//   ease: 'none',
//   motionPath: {
//     path: '#path',
//     align: '#path',
//     alignOrigin: [1, 1],
//   },
// });

spots.forEach((spot) => {
  spot.addEventListener('click', (e) => {
    const id = Number(e.target.id);
    order = id;
    const { x, y } = positions[order];

    gsap.to('#quaka', {
      duration: 0.5,
      ease: 'power1.inOut',
      x,
      y,
    });
  });
});
