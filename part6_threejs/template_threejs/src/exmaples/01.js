import * as THREE from 'three'
import * as dat from 'dat.gui'

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
  camera.position.z = 5
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.y = 2
  light.position.z = 5
  scene.add(light)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const matarial = new THREE.MeshStandardMaterial({ color: '#3498db' })
  const cube = new THREE.Mesh(geometry, matarial)
  scene.add(cube)

  renderer.render(scene, camera)

  const gui = new dat.GUI()
  gui.add(camera.position, 'x', -5, 5, 0.01).name('Camera X')
  gui.add(camera.position, 'y', -5, 5, 0.01).name('Camera Y')
  gui.add(camera.position, 'z', -5, 5, 0.01).name('Camera Z')

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()
    cube.rotation.y += THREE.MathUtils.degToRad(delta * 100)

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
