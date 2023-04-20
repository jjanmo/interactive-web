import '../style.css'

import * as THREE from 'three'

export class App {
  constructor() {
    const _canvas = document.getElementById('my-canvas')
    this.canvas = _canvas

    const _renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    _renderer.setSize(window.innerWidth, window.innerHeight)
    _renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
    this.renderer = _renderer

    const _scene = new THREE.Scene()
    // scene.background = new THREE.Color('hotpink')
    this.scene = _scene

    this.setupCamera()
    this.setupLight()
    this.setupModel()
    this.draw()

    window.onresize = this.handleResize.bind(this)
  }

  setupCamera() {
    const _camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    _camera.position.set(0, 0, 5)
    // camera.lookAt(0, 0, 0)
    this.scene.add(_camera)
    this.camera = _camera
  }

  setupLight() {
    const _light = new THREE.DirectionalLight('#fff', 1)
    _light.position.set(-1, 2, 4)
    this.scene.add(_light)
    this.light = _light
  }

  setupModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    this.cube = cube
  }

  draw(time) {
    this.renderer.render(this.scene, this.camera)
    this.update(time) // time : requestAnimationFrame함수에서 넣어주는 인자
    requestAnimationFrame(this.draw.bind(this))
  }

  /** time 초기값 undefined */
  update(time) {
    time *= 0.001
    this.cube.rotation.x = time
    this.cube.rotation.y = time
    // THREE.MathUtils.degToRad(1) 라디안값을 각도로 변환해주는 유틸함수
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.render(this.scene, this.camera)
  }
}
