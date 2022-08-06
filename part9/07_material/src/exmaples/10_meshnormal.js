import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gradient from '../assets/gradient.png'

// normal 법선 : 면에 수직인 선
// meshnormalmeterial : 법선의 각도에 따라서 rgb값이 달라진다?? 그래서 회전할때 마다 색이 달라짐
// → 그래서?? 그냥 예뻐서 사용한다는데?? ㅎㅎ 😅

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

  const textureLoader = new THREE.TextureLoader()
  const gradientTexture = textureLoader.load(gradient)
  gradientTexture.magFilter = THREE.NearestFilter

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
  })

  const box = new THREE.Mesh(boxGeometry, material)
  box.position.set(4, 0, 0)
  const spherer = new THREE.Mesh(sphereGeometry, material)

  scene.add(box, spherer)
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
