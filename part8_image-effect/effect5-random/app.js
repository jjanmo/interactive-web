const getCustomStyle = () => {
  const random = Math.floor(Math.random() * imageEffect.length);
  const selected = imageEffect[random];
  return {
    ...selected,
    imagePositionWidth: selected.col * 100,
    imagePositionHeight: selected.row * 100,
  };
};

const updateContainer = (elements) => {
  const container = document.querySelector('.image-container');
  container.innerHTML = '';
  container.appendChild(elements);
};

const makeImageBoxes = (styleObj) => {
  const { col, row, style, imagePositionWidth, imagePositionHeight } = styleObj;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const imageBox = document.createElement('div');
      imageBox.style = Array.isArray(style) ? style[j] : style(i, j);
      imageBox.style.width = `${100 / col}%`;
      imageBox.style.height = `${100 / row}%`;
      imageBox.classList.add('image-box');

      const imagePosition = document.createElement('div');
      imagePosition.style.width = `${imagePositionWidth}%`;
      imagePosition.style.height = `${imagePositionHeight}%`;
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
  const styleObj = getCustomStyle();
  const imageBoxes = makeImageBoxes(styleObj);
  updateContainer(imageBoxes);
};

const init = () => {
  window.addEventListener('resize', generateLayout);
  generateLayout();
};

init();
