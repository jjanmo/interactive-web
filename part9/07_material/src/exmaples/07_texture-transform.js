import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import baseColor from '../assets/skull/baseColor.jpg'

export default function example() {
  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = () => console.log('로드 시작')
  loadingManager.onProgress = (img) => console.log(`${img} 로딩중`)
  loadingManager.onLoad = () => console.log('로딩 완료')
  loadingManager.onError = () => console.log('로딩 에러')

  const textureLoader = new THREE.TextureLoader(loadingManager)
  const texture = textureLoader.load(baseColor)

  // wrapS(horizontal) | wrapT(vertical) 이미지 이동시 끝점이 늘어나서 이미지가 깨진 것처럼 보인다.
  // → 이를 보완하기 위해서 아래와 같은 속성을 사용
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  // texture.offset.x = 0.2
  // texture.offset.y = 0.2

  // texture.repeat.x = 4
  // texture.repeat.y = 4

  texture.rotation = Math.PI * 0.25 // THREE.MathUtils.degToRad(45)

  // 기준 설정(중앙)
  texture.center.x = 0.5
  texture.center.y = 0.5

  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const axesHelper = new THREE.AxesHelper(8)
  scene.add(axesHelper)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.set(1, 1, 2)
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 4)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const geometry = new THREE.BoxGeometry(2, 2, 2)

  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: texture,
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  renderer.render(scene, camera)

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
