import * as THREE from 'three'
import * as dat from 'dat.gui'

// scene-graph : 그룹만들기

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.x = 0
  camera.position.y = 1
  camera.position.z = 5
  scene.add(camera)

  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.y = 2
  light.position.z = 5
  scene.add(light)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const matarial = new THREE.MeshStandardMaterial({ color: '#3498db' })

  // Like Solar System
  const group1 = new THREE.Group()
  const cube1 = new THREE.Mesh(geometry, matarial) // 태양

  const group2 = new THREE.Group()
  // const cube2 = new THREE.Mesh(geometry, matarial) // 1) 1 & 2는 같은 결과물
  const cube2 = cube1.clone() // 2) // 지구
  cube2.scale.set(0.3, 0.3, 0.3)
  group2.position.x = 3

  // const group3 = new THREE.Group()
  const group3 = new THREE.Object3D() // Group()대신 사용가능 // 달
  const cube3 = cube2.clone()
  cube3.scale.set(0.1, 0.1, 0.1)
  group3.position.x = 0.7

  group3.add(cube3)
  group2.add(cube2, group3)
  group1.add(cube1, group2)
  scene.add(group1)

  renderer.render(scene, camera)

  const gui = new dat.GUI()
  gui.add(camera.position, 'x', -5, 5, 0.01).name('Camera X')
  gui.add(camera.position, 'y', -5, 5, 0.01).name('Camera Y')
  gui.add(camera.position, 'z', -5, 5, 0.01).name('Camera Z')

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()
    group1.rotation.y += delta * 0.8
    group2.rotation.y += delta * 0.7
    group3.rotation.y += delta * 0.6

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
