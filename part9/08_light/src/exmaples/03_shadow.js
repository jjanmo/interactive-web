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

  // 그림자 설정
  renderer.shadowMap.enabled = true
  // 빛과 각각의 물체에서도 그림자 설정이 필요하다
  // 2가지 설정 필요
  // 1) 다른 물체에 그림자가 생기게 영향을 줄 것인지 여부 : cast shadow
  // 2) 영향을 받아서 자신에게 그림자가 그려지게 할 것인지 여부 : receive shadow

  // 그림자 성향을 설정할 수 있다
  // renderer.shadowMap.type = THREE.PCFShadowMap // 기본값
  // renderer.shadowMap.type = THREE.BasicShadowMap // light.shadow.radius 적용 ❌
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap // light.shadow.radius 적용 ❌

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 5)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  const axesHelper = new AxesHelper(5)
  scene.add(axesHelper)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const light = new THREE.DirectionalLight('red', 1)
  light.position.set(0, 3, 0)
  scene.add(ambientLight, light)

  light.castShadow = true // 그림자를 만들 수 있는 빛이 됨

  // 그림자가 그려지는 판의 크기 : 크면 클수록 해상도가 높아지면서 그림자 화질이 높아짐/성능이 떨어질수 있음
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  // light.shadow.radius = 15 // 그림자 끝을 뿌옇게 해주는 효과(blur효과)

  // 그림자의 범위를 카메라처럼 설정할 수 있다(near, far ..)
  light.shadow.camera.near = 1
  light.shadow.camera.far = 20

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

  const plain = new THREE.Mesh(plainGeometry, matarial2)
  const box = new THREE.Mesh(boxGeometry, matarial1)
  const shpere = new THREE.Mesh(shpereGeometry, matarial3)

  plain.receiveShadow = true
  box.castShadow = true
  box.receiveShadow = true
  shpere.castShadow = true
  shpere.receiveShadow = true

  box.position.set(1, 1, 0)
  plain.rotation.x = THREE.MathUtils.degToRad(-90)
  shpere.position.set(-1, 1, 0)

  scene.add(box, plain, shpere)

  renderer.render(scene, camera)

  const clock = new THREE.Clock()

  const draw = () => {
    const time = clock.getElapsedTime()

    // light.position.x = Math.cos(time) * 4
    // light.position.z = Math.sin(time) * 4

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
