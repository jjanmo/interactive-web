import * as THREE from 'three'
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
  // scene.background = new THREE.Color('#ecf0f1')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 5)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(0, 5, 10)
  scene.add(light)

  const geometry = new THREE.BufferGeometry()
  const count = 1000
  const positions = new Float32Array(count * 3) // geometry 파트 참고
  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // 3 : 3(x,y,z)개씩 반복된다는 의미
  const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 'white',
  })
  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()

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
