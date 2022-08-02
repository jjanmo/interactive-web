import * as THREE from 'three'
import * as dat from 'dat.gui'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.x = 1
  camera.position.y = 2
  camera.position.z = 8
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  const light = new THREE.DirectionalLight('white', 1)

  light.position.x = 1
  light.position.z = 2
  scene.add(light)

  const controls = new FlyControls(camera, renderer.domElement)
  // 기본적으로 update() 함수에 delta값을 넣어줘야함
  // wasd로 이동 |  RF | QE(근데 난 QE가 안먹는다??)

  controls.rollSpeed = 0.1
  // controls.movementSpeed = 3
  controls.dragToLook = true

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  let mesh, material
  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
          ${Math.floor(Math.random() * 200) + 50},
          ${Math.floor(Math.random() * 200) + 50},
          ${Math.floor(Math.random() * 200) + 50}
        )`,
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 7
    mesh.position.y = (Math.random() - 0.5) * 7
    mesh.position.z = (Math.random() - 0.5) * 7
    scene.add(mesh)
  }

  renderer.render(scene, camera)

  const gui = new dat.GUI()
  gui.add(camera.position, 'x', -5, 5, 0.01).name('Camera X')
  gui.add(camera.position, 'y', -5, 5, 0.01).name('Camera Y')
  gui.add(camera.position, 'z', -5, 5, 0.01).name('Camera Z')

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()

    controls.update(delta)

    renderer.render(scene, camera)
    requestAnimationFrame(draw)
  }
  draw()

  const handleResizeCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', handleResizeCanvas)
}
