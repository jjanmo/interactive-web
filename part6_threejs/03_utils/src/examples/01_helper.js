import * as THREE from 'three'

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

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 0
  scene.add(camera)

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3) // 축 생성 (크기)
  scene.add(axesHelper)

  // GridHelper
  const gridHelper = new THREE.GridHelper(5)
  scene.add(gridHelper)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5) // 은은한 조명 추가
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.y = 2
  directionalLight.position.z = 5
  scene.add(directionalLight)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const matarial = new THREE.MeshStandardMaterial({ color: '#3498db' })
  const cube = new THREE.Mesh(geometry, matarial)
  scene.add(cube)

  camera.lookAt(cube.position) // 큐브의 위치에서 바라보게하는 방법 : lookAt

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    const time = clock.getDelta()
    cube.rotation.y += THREE.MathUtils.degToRad(time * 100)

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
