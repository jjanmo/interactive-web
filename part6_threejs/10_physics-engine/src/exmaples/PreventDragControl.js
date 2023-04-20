export default class PreventDragControl {
  #start = {
    x: 0,
    y: 0,
    time: 0,
  }
  constructor(target) {
    this.isClicked = false

    target.addEventListener('mousedown', this.#handleMousedown.bind(this))
    target.addEventListener('mouseup', this.#handleMouseup.bind(this))
  }

  #handleMousedown(e) {
    this.#start.x = e.clientX
    this.#start.y = e.clientY
    this.#start.time = Date.now()
  }

  #handleMouseup(e) {
    const diffX = Math.abs(this.#start.x - e.clientX)
    const diffY = Math.abs(this.#start.y - e.clientY)
    const diffTime = Math.abs(this.#start.time - Date.now())
    if (diffX < 5 && diffY < 5 && diffTime < 200) {
      this.isClicked = true
      return
    }
    this.isClicked = false
  }
}
