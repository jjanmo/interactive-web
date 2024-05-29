const COL = 8;
const ROW = 4;
const IMAGE_POSITION_ELEM_WIDTH = COL * 100;
const IMAGE_POSITION_ELEM_HEIGHT = ROW * 100;

const updateContainer = (elements) => {
  const container = document.querySelector('.image-container');
  container.innerHTML = '';
  container.appendChild(elements);
};

const makeImageBoxes = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      const delayTime = (COL - i - j * 0.5) * 0.25;

      const imageBox = document.createElement('div');
      imageBox.style.width = `${100 / COL}%`;
      imageBox.style.height = `${100 / ROW}%`;
      imageBox.style.transitionDelay = `${delayTime}s`;
      imageBox.classList.add('image-box');

      const imagePosition = document.createElement('div');
      imagePosition.style.width = `${IMAGE_POSITION_ELEM_WIDTH}%`;
      imagePosition.style.height = `${IMAGE_POSITION_ELEM_HEIGHT}%`;
      imagePosition.style.top = `-${i * 100}%`;
      imagePosition.style.left = `-${j * 100}%`;
      imagePosition.classList.add('image-position');

      imageBox.appendChild(imagePosition);
      fragment.appendChild(imageBox);

      setTimeout(() => {
        imageBox.classList.add('active');
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
