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

  // PointsMaterial와 Point를 사용하여 기본 Geometry에 파티클 효과를 만들 수 있음
  const geometry = new THREE.SphereGeometry(1, 64, 64)
  const matarial = new THREE.PointsMaterial({
    size: 0.02,
    // sizeAttenuation: false, // 원근에 관계없이 균일하게 보이게 하는 것 defualt true
  }) // particle을 사용할 수 있는 material
  const points = new THREE.Points(geometry, matarial)
  scene.add(points)

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
