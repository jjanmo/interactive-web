const COL = 8;
const ROW = 4;

const updateContainer = (elements) => {
  const container = document.querySelector('.image-container');
  container.innerHTML = '';
  container.appendChild(elements);
};

const makeImageBoxes = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < COL; i++) {
    for (let j = 0; j < ROW; j++) {
      const div = document.createElement('div');
      div.style.width = `${100 / COL}%`;
      div.style.height = `${100 / ROW}%`;
      div.classList.add('image-box');

      fragment.appendChild(div);

      setTimeout(() => {
        div.classList.add('active');
      }, 200);
    }
  }
  return fragment;
};

const generateLayout = () => {
  const imageBoxes = makeImageBoxes();
  updateContainer(imageBoxes);
};

const init = () => {
  window.addEventListener('resize', generateLayout);
  generateLayout();
};

init();
