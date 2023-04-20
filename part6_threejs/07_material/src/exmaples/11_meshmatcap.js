import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import matcap1 from '../assets/matcap/1.png'
import matcap2 from '../assets/matcap/2.png'
import matcap3 from '../assets/matcap/3.png'
import matcap4 from '../assets/matcap/4.jpg'

// meshmatcapmeterial
// → 그래픽 툴을 이용하여 입체감 있는 표현을 구형태로 만들어 놓은 것을 matcap 이라고 한다.
// → 이 느낌을 살려서 mesh에 그대로 표현하는 material

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()

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
  const matcapTx1 = textureLoader.load(matcap1)
  const matcapTx2 = textureLoader.load(matcap2)
  const matcapTx3 = textureLoader.load(matcap3)
  const matcapTx4 = textureLoader.load(matcap4)
  // matcapTx.magFilter = THREE.NearestFilter

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
  const con = new THREE.ConeGeometry(6, 10, 128)
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)

  const material = new THREE.MeshMatcapMaterial({
    // matcap: matcapTx1,
    // matcap: matcapTx2,
    matcap: matcapTx3,
    // matcap: matcapTx4,
  })

  const mesh = new THREE.Mesh(boxGeometry, material)
  // const mesh = new THREE.Mesh(sphereGeometry, material)

  scene.add(mesh)
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
