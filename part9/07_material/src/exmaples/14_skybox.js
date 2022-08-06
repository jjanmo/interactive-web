import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import px from '../assets/cubemap/px.png'
import nx from '../assets/cubemap/nx.png'
import py from '../assets/cubemap/py.png'
import ny from '../assets/cubemap/ny.png'
import pz from '../assets/cubemap/pz.png'
import nz from '../assets/cubemap/nz.png'

// skybox : envmap의 반대되는 개념??
// → 쉽게 배경을 큐브맵(이미지)으로 만든다(도배한다)라는 개념, 해당 이미지가 배경이 된다라는 의미

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.set(1, 2, 3)
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 3)
  scene.add(camera)

  //helper
  const axis = new THREE.AxesHelper(10)
  scene.add(axis)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const cubeTextureLoader = new THREE.CubeTextureLoader()
  scene.background = cubeTextureLoader.load([px, nx, py, ny, pz, nz])

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial()

  const mesh = new THREE.Mesh(boxGeometry, material)
  scene.add(mesh)
  renderer.render(scene, camera)

  const draw = () => {
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
