const witdh = window.innerWidth;
const height = window.innerHeight;
const COL = 20;
const ROW = 10;

const container = document.querySelector('.container');

for (let i = 0; i < COL; i++) {
  for (let j = 0; j < ROW; j++) {
    const div = document.createElement('div');
    div.style.width = `${witdh / COL}px`;
    div.style.height = `${height / ROW}px`;
    div.classList.add('.image-box');
    container.appendChild(div);
  }
}
