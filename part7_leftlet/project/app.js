(function () {
  const $leftlet = document.querySelector('.leftlet');
  const $cursor = document.querySelector('.cursor');
  const position = {
    curX: 0,
    curY: 0,
    destX: 0,
    destY: 0,
  };
  let { curX, curY, destX, destY } = position;
  let $selectedMedia = null;

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

    $selectedMedia = target.parentNode;

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
    $selectedMedia.classList.add('selected');
  };

  const zoomOut = () => {
    const $video = $selectedMedia.querySelector('.lecture-video');
    $video.load();

    $leftlet.style.transform = `translate3d(0, 0, 0)`;
    document.body.classList.remove('zoom-in');
    $selectedMedia.classList.remove('selected');
    $selectedMedia = null;
  };

  const closeLeftlet = () => {
    const [$left, , $right] = document.querySelectorAll('.page');

    if ($selectedMedia) zoomOut();

    $right.style.transform = 'rotateY(0)';
    setTimeout(() => {
      $left.style.transform = 'rotateY(0)';
    }, 500);

    document.body.classList.remove('fully-opened');
    $selectedMedia = null;
  };

  const renderCursor = () => {
    curX = curX + (destX - curX) * 0.05;
    curY = curY + (destY - curY) * 0.05;

    $cursor.style.transform = `translate3d(${curX + 30}px, ${curY + 30}px, 0)`;

    requestAnimationFrame(renderCursor);
  };
  renderCursor();

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

  const handleMousemove = (e) => {
    destX = e.clientX - window.innerWidth * 0.2;
    destY = e.clientY - window.innerHeight * 0.4;
  };

  const handleLeftletAnimationend = () => {
    $leftlet.style.animation = 'none';
  };

  $leftlet.addEventListener('click', handleClickLeftlet);
  $leftlet.addEventListener('animationend', handleLeftletAnimationend);
  window.addEventListener('mousemove', handleMousemove);
})();
