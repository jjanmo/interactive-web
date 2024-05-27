const COL = 4;
const ROW = 1;
const IMAGE_POSITION_ELEM_WIDTH = COL * 100;
const IMAGE_POSITION_ELEM_HEIGHT = ROW * 100;

const customStyle = [
  'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 0.3s',
  'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 0.6s',
  'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 0.9s',
  'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 1.2s',
];

const updateContainer = (elements) => {
  const container = document.querySelector('.image-container');
  container.innerHTML = '';
  container.appendChild(elements);
};

const makeImageBoxes = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      const delayTime = (COL - i - j * 0.5) * 0.2;

      const imageBox = document.createElement('div');
      imageBox.style = customStyle[j];
      imageBox.style.width = `${100 / COL}%`;
      imageBox.style.height = `${100 / ROW}%`;
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
