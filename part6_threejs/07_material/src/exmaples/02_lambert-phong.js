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

  const axesHelper = new THREE.AxesHelper(8)
  scene.add(axesHelper)

  // MeshBasicMaterial를 제외하곤 모두 빛이 필요하다, 빛이 없으면 안보임
  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.y = 1
  directionalLight.position.z = 5
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.x = 1
  camera.position.y = 2
  camera.position.z = 10
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const geometry = new THREE.SphereGeometry(1.5, 15, 15)

  // MeshLambertMaterial : 하이라이트,반사광이 없는 재질
  const material1 = new THREE.MeshLambertMaterial({ color: 'orange' })

  // MeshPhongMaterial : 하이라이트,반사광이 있는 재질
  const material2 = new THREE.MeshPhongMaterial({
    color: 'orange',
    // shininess: 0, // MeshLambertMaterial와 같은 정도로 변함
    shininess: 100, // MeshLambertMaterial와 같은 정도로 변함
  })

  const shpere1 = new THREE.Mesh(geometry, material1)
  const shpere2 = new THREE.Mesh(geometry, material2)
  shpere1.position.x = 3
  shpere2.position.x = -3
  scene.add(shpere1, shpere2)

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
