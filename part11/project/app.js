(function () {
  const $leftlet = document.querySelector('.leftlet');

  const getTarget = (element, targetName) => {
    let target = element;
    while (!target.classList.contains(targetName)) {
      target = target.parentNode;
      console.log(target.classList);

      if (target.tagName === 'BODY') return;
    }

    return target;
  };

  const handleClickLeftlet = (e) => {
    const pageElem = getTarget(e.target, 'page');

    if (pageElem.className.includes('left')) {
      pageElem.style.transform = 'rotateY(-150deg)';
    } else if (pageElem.className.includes('right')) {
      pageElem.style.transform = 'rotateY(150deg)';
    }
  };

  $leftlet.addEventListener('click', handleClickLeftlet);
})();
