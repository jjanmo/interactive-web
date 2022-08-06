import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 각각의 이미지들이 사실은 특정한 effect를 말해준다
import baseColor from '../assets/brick/basecolor.jpg'
import ambientOcclusion from '../assets/brick/ambientOcclusion.jpg'
import height from '../assets/brick/height.png'
import normal from '../assets/brick/normal.jpg'
import roughness from '../assets/brick/roughness.jpg'

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.set(1, 2, 3)
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 2)
  scene.add(camera)

  //helper
  const axis = new THREE.AxesHelper(5)
  scene.add(axis)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const textureLoader = new THREE.TextureLoader()
  const baseColorTexture = textureLoader.load(baseColor)
  const ambientOcclusionTexture = textureLoader.load(ambientOcclusion)
  const heightTexture = textureLoader.load(height)
  const normalTexture = textureLoader.load(normal)
  const roughnessTexture = textureLoader.load(roughness)

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    map: baseColorTexture,
    side: THREE.DoubleSide,
    roughness: 0.8,
    metalness: 0.2,
    normalMap: normalTexture, // 좀 더 디테일이 살아남
    roughnessMap: roughnessTexture,
    // aoMap: ambientOcclusionTexture, // 그림자 부분을 좀 더 디테일을 줄 수 있음
    // aoMapIntensity: 8,
    color: 'yellowgreen',
  })

  const mesh = new THREE.Mesh(boxGeometry, material)
  scene.add(mesh)
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
