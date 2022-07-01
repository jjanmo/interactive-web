(function () {
	const $images = document.querySelectorAll('.graphic-item');
	const $texts = document.querySelectorAll('.step');
	const io = new IntersectionObserver(ioCallback);
	let $currentImage;
	let actionObj;
	let ioIndex;

	function ioCallback(entries, _) {
		const { target } = entries[0];
		ioIndex = target.dataset.index;
	}

	function setIndex() {
		$images.forEach((image, index) => {
			image.setAttribute('data-index', index);
			$texts[index].dataset.index = index;
		});
	}

	function setObserver() {
		$texts.forEach((text) => io.observe(text));
	}

	function showImage(index) {
		$currentImage = $images[index];
		$currentImage.classList.add('visible');
		if ($currentImage.dataset.action) {
			callAction(true);
		}
	}

	function hideImage() {
		$currentImage.classList.remove('visible');
		if ($currentImage.dataset.action) {
			callAction(false);
		}
	}

	function callAction(flag) {
		const key = $currentImage.dataset.action;
		actionObj[key](flag);
	}

	function handleScroll() {
		for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
			if (!$texts[i]) continue;

			const textPosY = $texts[i].getBoundingClientRect().top;
			const currentIndex = $texts[i].dataset.index;
			if (textPosY > window.innerHeight * 0.1 && textPosY < window.innerHeight * 0.8) {
				hideImage();
				showImage(currentIndex);
			}
		}
	}

	function init() {
		setIndex();
		setObserver();
		showImage(0);

		window.addEventListener('scroll', handleScroll);

		//스크롤에 따른 이미지 변화를 새로고침시 마다 초기화해주기 위한 작업
		//scrollTo()가 바로 안먹는 경우가 있기 때문에 setTimeout을 사용한 것
		window.addEventListener('load', () => {
			setTimeout(() => {
				window.scrollTo(0, 0);
			}, 100);
		});

		actionObj = {
			bird: document.querySelector('[data-index="2"] .bird'),
			bird2: document.querySelector('[data-index="5"] .bird'),
			flyStraight(flag) {
				if (flag) this.bird.style.transform = 'translateX(110vw)';
				else this.bird.style.transform = 'translateX(-100%)';
			},
			flyDiagonally(flag) {
				if (flag) this.bird2.style.transform = `translate(${window.innerWidth}px, -${window.innerHeight * 0.8}px)`;
				else this.bird2.style.transform = '';
			},
		};
	}

	init();
})();
