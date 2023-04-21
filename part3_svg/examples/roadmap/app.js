gsap.registerPlugin(MotionPathPlugin);

const RADIUS = 17.803;
let order = 0;

const buttons = document.querySelector('.buttons');

const roadmap = document.querySelector('.roadmap');
const { x: rX, y: rY } = roadmap.getBoundingClientRect();

const spots = document.querySelectorAll('.spot');
const quaka = document.querySelector('#quaka');
const button = document.querySelector('#button');

const positions = [...spots].map((spot, index) => {
  const cX = Number(spot.attributes['2'].nodeValue);
  const cY = Number(spot.attributes['3'].nodeValue);
  return {
    index,
    x: cX,
    y: cY - RADIUS - 10,
  };
});

// 초기화
init();

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

buttons.addEventListener('click', (e) => {
  const className = e.target.className;
  init();
  gsap.to('#quaka', {
    duration: 4,
    ease: 'power1.inOut',
    repeat: 1,
    repeatDelay: 1,
    yoyo: true,
    motionPath: {
      path: '#path',
      align: '#path',
      alignOrigin: [1, 1],
      autoRotate: className === 'normal' ? false : true,
    },
  });
});

function init() {
  const { x, y } = positions[0];
  gsap.set('#quaka', { x, y });
}
