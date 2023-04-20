import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gradient from '../assets/gradient.png'

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
  // → 마인크래프트 큐브에서 사용했던 방법과 같은 이치, 그라디언트 이미지(픽셀단위)를 살리기 위해서 색의 경계를 명확하게 해줌

  const geometry = new THREE.ConeGeometry(2, 5, 128) // 3번째 인자 : raia segment가 크면 클수록 더 잘게 쪼개서 더 원처럼 보임
  const material = new THREE.MeshToonMaterial({
    // toon 만화스러운 느낌의 mesh, 2D 애니메이션 느낌
    color: 'dodgerblue',
    gradientMap: gradientTexture,
  })

  const cone = new THREE.Mesh(geometry, material)
  scene.add(cone)
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
