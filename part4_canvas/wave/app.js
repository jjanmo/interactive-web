import { WaveGroup } from './wave.js';

const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');

const waveGroup = new WaveGroup();

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  waveGroup.draw(ctx);

  requestAnimationFrame(draw);
};

const handleResize = () => {
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  ctx.scale(2, 2);

  waveGroup.resize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', handleResize);

handleResize();
draw();
