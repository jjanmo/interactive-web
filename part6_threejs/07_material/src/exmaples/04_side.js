import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/*
3D  
- vertex(점)
- edge(선)
- face(면) - side
  → 면을 보이게 할지, 안보이게 할지
*/

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
  directionalLight.position.set(1, 1, 2)
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.x = 1
  camera.position.y = 2
  camera.position.z = 8
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: 'orangered',
    roughness: 0.2,
    metalness: 0.2,
    // side: THREE.FrontSide, // 기본값, 앞면만 보이는 것
    // side: THREE.BackSide, // 뒷면만 보이는 것?  이상하게 보임 😵
    side: THREE.DoubleSide, // 양쪽 다 보이는 것 , mesh 안쪽으로 들어가면 안쪽면도 볼 수 있다
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
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
