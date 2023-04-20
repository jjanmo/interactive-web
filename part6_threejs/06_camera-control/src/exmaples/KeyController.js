export default class KeyController {
  constructor() {
    this.keyMap = {}
  }

  onKeydown() {
    window.addEventListener('keydown', (e) => {
      console.log(e.key, e.code)
      this.keyMap[e.key] = true
    })
  }
  onKeyup() {
    window.addEventListener('keyup', (e) => {
      delete this.keyMap[e.key]
    })
  }
}
