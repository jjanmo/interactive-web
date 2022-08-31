export default class Buttons {
  constructor() {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    this.wrapper = wrapper
    this.#createButtons()
  }

  #createButtons() {
    const randomBtn = document.createElement('button')
    randomBtn.textContent = 'RANDOM'
    const sphereBtn = document.createElement('button')
    sphereBtn.textContent = 'SPHERE'
    this.wrapper.append(randomBtn, sphereBtn)

    this.wrapper.style.cssText = `
      position : absolute;
      top : 2rem;
      left : 1rem;
    `
  }

  #addEvent() {}
}
