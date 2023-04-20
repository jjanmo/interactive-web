import * as THREE from 'three'
import * as dat from 'dat.gui'

// GUI 컨트롤을 쉽게 할 수 있도록 도와주는 라이브러리 dat.GUI
// https://github.com/dataarts/dat.gui

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

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 6
  scene.add(camera)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.y = 2
  directionalLight.position.z = 5
  scene.add(directionalLight)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const matarial = new THREE.MeshStandardMaterial({ color: '#3498db' })
  const cube = new THREE.Mesh(geometry, matarial)
  scene.add(cube)

  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)

  const gui = new dat.GUI()
  gui.add(camera.position, 'x', -5, 5, 0.01).name('Camera X')

  // method chaining
  gui
    .add(camera.position, 'y')
    .min(-5) //
    .max(5) //
    .step(0.02) //
    .name('Camera Y')
  gui.add(cube.position, 'y', -5, 5, 0.01).name('Cube Y pos')

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    const time = clock.getDelta()
    cube.rotation.y += THREE.MathUtils.degToRad(time * 100)

    camera.lookAt(cube.position)

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
