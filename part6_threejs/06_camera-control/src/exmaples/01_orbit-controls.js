import * as THREE from 'three'
import * as dat from 'dat.gui'
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
  scene.background = new THREE.Color('#ecf0f1')

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.x = 1
  camera.position.y = 2
  camera.position.z = 8
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  const light = new THREE.DirectionalLight('white', 1)

  light.position.x = 1
  light.position.z = 2
  scene.add(light)

  const controls = new OrbitControls(camera, renderer.domElement)
  // controls options
  controls.enableDamping = true // 컨트롤을 부드럽게 해주는 옵션 → draw함수(애니메이션 일어나는 곳)에서 update() 추가 필요
  // controls.enableZoom = false
  // controls.maxDistance = 10
  // controls.minDistance = 2
  // controls.minPolarAngle = Math.PI / 4 // 수직방향으로 회전하는 각도
  // controls.minPolarAngle = THREE.MathUtils.degToRad(45) // 위와 같은 표현
  // controls.maxPolarAngle = THREE.MathUtils.degToRad(135) // 위와 같은 표현
  // controls.target.set(2, 2, 2) // 컨트롤 회전의 중심점을 설정
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 10

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  let mesh, material
  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
          ${Math.floor(Math.random() * 200) + 50},
          ${Math.floor(Math.random() * 200) + 50},
          ${Math.floor(Math.random() * 200) + 50}
        )`,
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 7
    mesh.position.y = (Math.random() - 0.5) * 7
    mesh.position.z = (Math.random() - 0.5) * 7
    scene.add(mesh)
  }

  renderer.render(scene, camera)

  const gui = new dat.GUI()
  gui.add(camera.position, 'x', -5, 5, 0.01).name('Camera X')
  gui.add(camera.position, 'y', -5, 5, 0.01).name('Camera Y')
  gui.add(camera.position, 'z', -5, 5, 0.01).name('Camera Z')

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
