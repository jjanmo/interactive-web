const SIZE = 300;

const $canvas = document.querySelector('#my-canvas');
const ctx = $canvas.getContext('2d');
const dpr = window.devicePixelRatio;

$canvas.style.width = `${SIZE}px`;
$canvas.style.height = `${SIZE}px`;

$canvas.width = SIZE * dpr;
$canvas.height = SIZE * dpr;
ctx.scale(dpr, dpr);

ctx.fillRect(10, 10, 50, 50);
