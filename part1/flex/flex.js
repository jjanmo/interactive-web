const $container = document.querySelector('.container');
const $flexDirections = document.querySelectorAll('input[name="direction"]');
const $justifyContents = document.querySelectorAll('input[name="justify-content"]');
const $alignItems = document.querySelectorAll('input[name="align-items"]');
const $flexGrows = document.querySelectorAll('.flex-grow');
const $flexShrinks = document.querySelectorAll('.flex-shrink');
const $flexBasises = document.querySelectorAll('.flex-basis');

function addEventInItems($target) {
    $target.forEach(($element) => {
        $element.addEventListener('input', (e) => {
            const {
                target: { value, id },
            } = e;
            const splitArray = id.split('_');
            const className = splitArray[0];
            const property = splitArray[1];
            const $item = document.querySelector(`.${className}`);
            console.log(value, property);
            if (value) {
                $item.style[property] = Number(value);
            } else {
                $item.style[property] = 0;
            }
        });
    });
}

function addEventInContainer($target) {
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
    addEventInContainer($flexDirections);
    addEventInContainer($justifyContents);
    addEventInContainer($alignItems);
    addEventInItems($flexGrows);
    addEventInItems($flexShrinks);
    addEventInItems($flexBasises);
}

init();
