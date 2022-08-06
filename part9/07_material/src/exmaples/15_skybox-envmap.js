import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import px from '../assets/cubemap/px.png'
import nx from '../assets/cubemap/nx.png'
import py from '../assets/cubemap/py.png'
import ny from '../assets/cubemap/ny.png'
import pz from '../assets/cubemap/pz.png'
import nz from '../assets/cubemap/nz.png'

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
  directionalLight.position.set(1, 1, 2)
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 8)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const cubeTextureLoader = new THREE.CubeTextureLoader()
  const cubeTexture = cubeTextureLoader.load([px, nx, py, ny, pz, nz])
  scene.background = cubeTexture

  cubeTexture.magFilter = THREE.LinearFilter

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({
    envMap: cubeTexture,
  })

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
