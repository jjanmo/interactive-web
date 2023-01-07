/**
 * TODO
 * - 맨 앞장 : click me animtaion + 편지봉투 CSS?? 먼가 너한테 보내는 편지 느낌? 열어봐?!
 */

(function () {
  const $leftlet = document.querySelector('.leftlet');
  let $selectedImage = null;

  const getTarget = (element, targetName) => {
    let target = element;
    while (!target.classList.contains(targetName)) {
      target = target.parentNode;

      if (target.tagName === 'BODY') return;
    }

    return target;
  };

  const flipCards = (target) => {
    if (target.dataset.direction === 'left') {
      target.style.transform = 'rotateY(-150deg)';
    } else if (target.dataset.direction === 'right') {
      target.style.transform = 'rotateY(150deg)';

      document.body.classList.add('fully-opened');
    }
  };

  const zoomIn = (target) => {
    if (document.body.classList.contains('zoom-in')) return;

    $selectedImage = target.parentNode;
    const { x, y, width, height } = target.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (x + width / 2);
    const dy = window.innerHeight / 2 - (y + height / 2);

    const direction = getTarget(target, 'page').dataset.direction;

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
    $selectedImage.classList.add('selected');
  };

  const zoomOut = () => {
    $leftlet.style.transform = `translate3d(0, 0, 0)`;
    document.body.classList.remove('zoom-in');
    $selectedImage.classList.remove('selected');
  };

  const closeLeftlet = () => {
    const [$left, , $right] = document.querySelectorAll('.page');

    zoomOut();
    $right.style.transform = 'rotateY(0)';
    setTimeout(() => {
      $left.style.transform = 'rotateY(0)';
    }, 500);

    document.body.classList.remove('fully-opened');
    $selectedImage = null;
  };

  const handleClickLeftlet = (e) => {
    const pageElem = getTarget(e.target, 'page');
    if (pageElem) {
      flipCards(pageElem);
    }

    const imageElem = getTarget(e.target, 'lecture-image');
    if (imageElem) {
      zoomIn(imageElem);
    }

    const backButtonElem = getTarget(e.target, 'back-button');
    if (backButtonElem) {
      zoomOut();
    }

    const closeButtonElem = getTarget(e.target, 'close-button');
    if (closeButtonElem) {
      closeLeftlet(closeButtonElem);
    }
  };

  $leftlet.addEventListener('click', handleClickLeftlet);
})();
