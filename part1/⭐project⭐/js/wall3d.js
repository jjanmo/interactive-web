(function () {
    const $house = document.querySelector('.house');
    const $stage = document.querySelector('.stage');
    const $progressBar = document.querySelector('.progress-bar');

    let windowSize = window.innerHeight;

    function setScrollratio() {
        // 스크롤 좌표에 대한 설명 at WIL.md
        return window.pageYOffset / (document.body.offsetHeight - windowSize);
    }

    function handleResize() {
        // 창 크기의 변화에 따라서 window.innerHeight값이 달라짐
        windowSize = window.innerHeight;
    }

    function handleScroll() {
        const posZratio = setScrollratio();
        $house.style.transform = `translateZ(${-490 + posZratio * 985}vw)`;
        $progressBar.style.width = `${posZratio * 100}%`;
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
})();
