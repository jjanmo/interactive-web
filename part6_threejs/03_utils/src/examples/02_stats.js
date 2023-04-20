import * as THREE from 'three'
import Stats from 'stats.js'

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
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 6
  scene.add(camera)

  // stats : 초당 프레임 수
  // → threejs에 있는 기능 X, 외부에서 가져와야함!
  // stats.js : JavaScript Performance Monitor(https://github.com/mrdoob/stats.js/#javascript-performance-monitor)
  const stats = new Stats()
  document.body.append(stats.domElement) // 동작이 일어나는 곳에서 프레임 업데이트를 해줘야함!

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

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    stats.update()

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
