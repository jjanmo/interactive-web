(function () {
	const $card1 = document.querySelector('.card1');
	const $card2 = document.querySelector('.card2');

	$card1.addEventListener('click', flipCard1);
	$card2.addEventListener('click', flipCard2);

	function flipCard1() {
		$card1.classList.toggle('is-flipped');
	}
	function flipCard2() {
		$card2.classList.toggle('is-flipped');
	}
})();
