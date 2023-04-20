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

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 5)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  const axesHelper = new AxesHelper(5)
  scene.add(axesHelper)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const light = new THREE.DirectionalLight('tomato', 1)
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

  const clock = new THREE.Clock()

  const draw = () => {
    const time = clock.getElapsedTime()

    // 삼각함수를 사용했더니 원운동을 하네?? How?? Why??
    // x,y 평면에서 직각삼각형을 그리면,
    // cos = 밑변 / 빗변
    // sin = 높이 / 빗변
    // → 빗변이 1이라고 하면 cos 밑변 = x, sin 높이 = y 가 된다.
    // → 직각삼각형의 각도의 변화에 따라서 cos, sin의 값이 변하고(x, y값의 변화) 이를 연결하면 원운동을 하게 된다.
    // 이처럼 x,y 평면이 아니라 x,z평면이라고 생각하면 똑같이 원운동을 하게 됨을 이해할수 있다.

    light.position.x = Math.cos(time) * 3
    light.position.z = Math.sin(time) * 3

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
