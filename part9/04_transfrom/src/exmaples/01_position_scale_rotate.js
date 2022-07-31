import * as THREE from 'three'
import * as dat from 'dat.gui'

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
  const cube = new THREE.Mesh(geometry, matarial)
  scene.add(cube)

  renderer.render(scene, camera)

  const gui = new dat.GUI()
  gui.add(camera.position, 'x', -5, 5, 0.01).name('Camera X')
  gui.add(camera.position, 'y', -5, 5, 0.01).name('Camera Y')
  gui.add(camera.position, 'z', -5, 5, 0.01).name('Camera Z')

  cube.rotation.reorder('YXZ') // 좌표계축 재설정, 문자열 순서대로
  cube.rotation.y = THREE.MathUtils.degToRad(45)
  cube.rotation.x = THREE.MathUtils.degToRad(20)

  const clock = new THREE.Clock()
  const draw = () => {
    const time = clock.getDelta()
    // cube.rotation.x += THREE.MathUtils.degToRad(1)

    // cube.position.set(3, 2, 1)
    // console.log(cube.position.length()) // 원점에서 큐브(중심(?)까지의 거리
    // console.log(cube.position.distanceTo(new THREE.Vector3(1, 2, 3))) // 큐브에서 부터 새로운벡터 좌표(1,2,3)까지의 거리
    // console.log(cube.position.distanceTo(camera.position)) // 큐브에서 카메라까지의 거리

    // scale
    // cube.scale.x = 2
    cube.scale.set(1, 1, 2)

    camera.lookAt(cube.position)

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
