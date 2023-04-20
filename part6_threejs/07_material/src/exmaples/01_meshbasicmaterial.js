import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const matarial = new THREE.MeshBasicMaterial({ color: 'orange' })
  // MeshBasicMaterial : 빛이나 조명(그림자)의 영향을 받지 않음, 입체감 없음
  // → light가 없어도 됨
  // → 아무런 처리를 안해주기때문에 성능이 가장 빠름
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
    controls.update()
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
