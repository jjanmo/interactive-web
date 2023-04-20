import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import image from '../assets/Brick_Wall_019_basecolor.jpg'

export default function example() {
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(
    image,
    () => console.log('loading completed'),
    () => console.log('loading'),
    () => console.log('loading error')
  )

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
  const material = new THREE.MeshBasicMaterial({
    // → texture를 로딩해도 본래 가진 material의 속성은 가지고 있음
    // const material = new THREE.MeshStandardMaterial({
    // color: 'orangered',
    // roughness: 0.2,
    // metalness: 0.2,
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
