import * as THREE from 'three'
import { AxesHelper } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
  // scene.background = new THREE.Color('#ecf0f1')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 5)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  const axesHelper = new AxesHelper(5)
  scene.add(axesHelper)

  // 빛, 조명, 광원 모두 같은 용어
  const ambientLight = new THREE.AmbientLight('#eee', 0.5) // 은은한 광(전체적으로 뿌려주기때문에 위치가 따로 필요하지 않다)
  const light = new THREE.DirectionalLight('#eee', 1) // 태양광같은 느낌
  light.position.set(0, 3, 0)
  scene.add(ambientLight, light)

  const lightHelper = new THREE.DirectionalLightHelper(light)
  scene.add(lightHelper)

  // GUI를 이용해서 빛의 위치 조정
  const gui = new dat.GUI()
  gui.add(light.position, 'x', -10, 10, 0.01).name('Light X')
  gui.add(light.position, 'y', -10, 10, 0.01).name('Light Y')
  gui.add(light.position, 'z', -10, 10, 0.01).name('Light Z')

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const plainGeometry = new THREE.PlaneGeometry(10, 10)
  const shpereGeometry = new THREE.SphereGeometry(0.8, 16, 16)

  const matarial1 = new THREE.MeshStandardMaterial({ color: 'plum' })
  const matarial2 = new THREE.MeshStandardMaterial({ color: '#eee', side: THREE.DoubleSide })
  const matarial3 = new THREE.MeshStandardMaterial({ color: 'dodgerblue' })

  const box = new THREE.Mesh(boxGeometry, matarial1)
  const plain = new THREE.Mesh(plainGeometry, matarial2)
  const shpere = new THREE.Mesh(shpereGeometry, matarial3)

  box.position.set(1, 1, 0)
  plain.rotation.x = THREE.MathUtils.degToRad(-90)
  shpere.position.set(-1, 1, 0)

  scene.add(box, plain, shpere)

  renderer.render(scene, camera)

  const draw = () => {
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
