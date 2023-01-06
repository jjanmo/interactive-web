(function () {
  const $leftlet = document.querySelector('.leftlet');
  const fullyOpened = false;

  const getTarget = (element, targetName) => {
    let target = element;
    while (!target.classList.contains(targetName)) {
      target = target.parentNode;

      if (target.tagName === 'BODY') return;
    }

    return target;
  };

  const zoomIn = (target) => {
    if (!fullyOpened || document.body.classList.contains('zoom-in')) return;

    const { x, y, width, height } = target.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (x + width / 2);
    const dy = window.innerHeight / 2 - (y + height / 2);

    const direction = getTarget(target, 'page').dataset.direction;
    switch (direction) {
      case 'left':
        $leftlet.style.transform = `translate3d(${dx}px, ${dy}px, 60vw) rotateY(-30deg)`;
        break;
      case 'right':
        $leftlet.style.transform = `translate3d(${dx}px, ${dy}px, 60vw) rotateY(30deg)`;
        break;
      case 'center':
        $leftlet.style.transform = `translate3d(${dx}px, ${dy}px, 60vw)`;
        break;
    }
  };

  const handleClickLeftlet = (e) => {
    const pageElem = getTarget(e.target, 'page');
    if (pageElem) {
      console.dir(pageElem, pageElem.dataset.direction);
      if (pageElem.dataset.direction === 'left') {
        pageElem.style.transform = 'rotateY(-150deg)';
      } else if (pageElem.dataset.direction === 'right') {
        pageElem.style.transform = 'rotateY(150deg)';
      }
    }

    const imageElem = getTarget(e.target, 'lecture-image');
    if (imageElem) {
      zoomIn(imageElem);
    }
  };

  $leftlet.addEventListener('click', handleClickLeftlet);
})();
