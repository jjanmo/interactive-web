/**
 * TODO
 * - 맨 앞장 : click me animtaion + 편지봉투 CSS?? 먼가 너한테 보내는 편지 느낌? 열어봐?!
 */

(function () {
  const $leftlet = document.querySelector('.leftlet');
  let fullyOpened = false;

  let selectedDirection = '';

  const getTarget = (element, targetName) => {
    let target = element;
    while (!target.classList.contains(targetName)) {
      target = target.parentNode;

      if (target.tagName === 'BODY') return;
    }

    return target;
  };

  const zoomIn = (target) => {
    if (document.body.classList.contains('zoom-in')) return;

    const { x, y, width, height } = target.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (x + width / 2);
    const dy = window.innerHeight / 2 - (y + height / 2);

    const direction = getTarget(target, 'page').dataset.direction;
    selectedDirection = direction;

    switch (direction) {
      case 'left':
        $leftlet.style.transform = `translate3d(${dx}px, ${dy}px, 55vw) rotateY(-30deg)`;
        break;
      case 'center':
        $leftlet.style.transform = `translate3d(${dx}px, ${dy}px, 55vw)`;
        break;
      case 'right':
        $leftlet.style.transform = `translate3d(${dx}px, ${dy}px, 55vw) rotateY(30deg)`;
        break;
    }

    document.body.classList.add('zoom-in');
    target.classList.add('selected');
    document
      .querySelector(`#${selectedDirection}-back-button`)
      .classList.remove('hidden');
  };

  const zoomOut = (target) => {
    $leftlet.style.transform = `translate3d(0,0,0)`;

    document.body.classList.remove('zoom-in');
    target.classList.remove('selected');
    document
      .querySelector(`#${selectedDirection}-back-button`)
      .classList.add('hidden');
  };

  const handleClickLeftlet = (e) => {
    const pageElem = getTarget(e.target, 'page');
    if (pageElem) {
      if (pageElem.dataset.direction === 'left') {
        pageElem.style.transform = 'rotateY(-150deg)';
      } else if (pageElem.dataset.direction === 'right') {
        pageElem.style.transform = 'rotateY(150deg)';
        fullyOpened = true;
      }
    }

    const imageElem = getTarget(e.target, 'lecture-image');
    if (imageElem) {
      zoomIn(imageElem);
    }

    const backButtonElem = getTarget(e.target, 'back-button');
    if (backButtonElem) {
      zoomOut(backButtonElem);
    }
  };

  $leftlet.addEventListener('click', handleClickLeftlet);
})();
