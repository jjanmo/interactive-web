import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import baseColor from '../assets/basecolor.jpg'
import ambientOcclusion from '../assets/ambientOcclusion.jpg'
import height from '../assets/height.png'
import normal from '../assets/normal.jpg'
import roughness from '../assets/roughness.jpg'

// loading manager
// → 여러 개의 텍스쳐 이미지를 로드할 때 사용 가능
// → 받드시 사용해야하는 것은 아니고, 여러 개의 이미지에 대한 이벤트 처리를 하기 쉽게 해준다.

export default function example() {
  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = () => console.log('로드 시작')
  loadingManager.onProgress = (img) => console.log(`${img} 로딩중`)
  loadingManager.onLoad = () => console.log('로딩 완료')
  loadingManager.onError = () => console.log('로딩 에러')

  const textureLoader = new THREE.TextureLoader(loadingManager)
  const baseColorTx = textureLoader.load(baseColor)
  const ambientOcclusionTx = textureLoader.load(ambientOcclusion)
  const heightTx = textureLoader.load(height)
  const normalTx = textureLoader.load(normal)
  const roughnessTx = textureLoader.load(roughness)

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
  camera.position.set(1, 2, 8)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const geometry = new THREE.BoxGeometry(2, 2, 2)

  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: baseColorTx,
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
