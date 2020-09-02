(function () {
    const $container = document.querySelector('.container');

    function removeClass() {
        const $doors = document.querySelectorAll('.door');
        const $imgs = document.querySelectorAll('img');
        $doors.forEach(($element) => {
            if ($element.classList.contains('open')) {
                $element.classList.remove('open');
                $element.classList.add('close');
            }
        });
        $imgs.forEach(($element) => {
            if ($element.classList.contains('show')) {
                $element.classList.remove('show');
            }
        });
    }

    function handleClick(e) {
        const { target } = e;
        removeClass();
        console.log(target.previousElementSibling);
        target.classList.add('open');
        target.classList.remove('close');
        target.previousElementSibling.classList.remove('hide');
        target.previousElementSibling.classList.add('show');
    }

    function init() {
        $container.addEventListener('click', handleClick);
    }
    init();
})();
