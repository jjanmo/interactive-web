const $container = document.querySelector('.container');
const $flexDirections = document.querySelectorAll('input[name="direction"]');
const $justifyContents = document.querySelectorAll('input[name="justify-content"]');
const $alignItems = document.querySelectorAll('input[name="align-items"]');

function addEvent($target) {
    $target.forEach(($element) =>
        $element.addEventListener('change', (e) => {
            const {
                target: {
                    name,
                    dataset: { option },
                },
            } = e;

            if (name === 'direction') {
                $container.style.flexDirection = option;
            } else if (name === 'justify-content') {
                $container.style.justifyContent = option;
            } else {
                $container.style.alignItems = option;
            }
        })
    );
}

function init() {
    addEvent($flexDirections);
    addEvent($justifyContents);
    addEvent($alignItems);
}

init();
