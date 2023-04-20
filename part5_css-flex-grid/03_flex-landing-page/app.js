const $cardImages = document.querySelectorAll('.card-image');

$cardImages.forEach((bg) => {
  bg.style.backgroundImage = `url('./images/bg${Math.floor(
    Math.random() * 3 + 1
  )}.jpg')`;
});
