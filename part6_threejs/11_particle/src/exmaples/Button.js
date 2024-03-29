import gsap from 'gsap'
export default class Buttons {
  constructor(data) {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    this.wrapper = wrapper
    this.#createButtons()
    this.#addEvent()

    this.spherePosition = data.spherePosition
    this.randomPosition = data.randomPosition
    this.imagePanels = data.imagePanels
  }

  #createButtons() {
    const randomBtn = document.createElement('button')
    randomBtn.textContent = 'RANDOM'
    randomBtn.dataset.type = 'random'
    randomBtn.style.marginRight = '5px'
    const sphereBtn = document.createElement('button')
    sphereBtn.textContent = 'SPHERE'
    sphereBtn.dataset.type = 'sphere'
    this.wrapper.append(randomBtn, sphereBtn)

    this.wrapper.style.cssText = `
      position : absolute;
      top : 2rem;
      left : 1rem;
    `
  }

  #addEvent() {
    this.wrapper.addEventListener('click', (e) => {
      const type = e.target.dataset.type

      if (type === 'random') {
        this.imagePanels.forEach((panel, index) => {
          gsap.to(panel.mesh.position, {
            duration: 1,
            x: this.randomPosition[index * 3],
            y: this.randomPosition[index * 3 + 1],
            z: this.randomPosition[index * 3 + 2],
          })
        })

        this.imagePanels.forEach((panel) => {
          gsap.to(panel.mesh.rotation, {
            duration: 2,
            x: 0,
            y: 0,
            z: 0,
          })
        })
      } else if (type === 'sphere') {
        this.imagePanels.forEach((panel, index) => {
          gsap.to(panel.mesh.position, {
            duration: 1,
            x: this.spherePosition[index * 3],
            y: this.spherePosition[index * 3 + 1],
            z: this.spherePosition[index * 3 + 2],
          })
        })

        this.imagePanels.forEach((panel) => {
          gsap.to(panel.mesh.rotation, {
            duration: 2,
            x: panel.sphereRotation[0],
            y: panel.sphereRotation[1],
            z: panel.sphereRotation[2],
          })
        })
      }
    })
  }
}
