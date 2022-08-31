import * as THREE from 'three'
import { SphereGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// image
import prague from '../assets/prague.jpg'
import riodejaneiro from '../assets/rio-de-janeiro.jpg'
import rome from '../assets/rome.jpg'
import sydney from '../assets/sydney.jpg'
import valletta from '../assets/valletta.jpg'
import vancouver from '../assets/vancouver.jpg'
import zurich from '../assets/zürich.jpg'
import ImagePanel from './ImagePanel'

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 4)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(0, 5, 10)
  scene.add(light)

  renderer.render(scene, camera)

  const textureLoader = new THREE.TextureLoader()
  const panelGeometry = new THREE.PlaneGeometry(0.3, 0.3)
  const images = [prague, riodejaneiro, rome, sydney, valletta, vancouver, zurich]
  const panels = []

  const sphereGeometry = new SphereGeometry(1, 8, 8)
  const sphereGeometryPosition = sphereGeometry.attributes.position.array

  let panel = []
  for (let i = 0; i < sphereGeometryPosition.length; i += 3) {
    panel = new ImagePanel({
      scene,
      geometry: panelGeometry,
      posX: sphereGeometryPosition[i],
      posY: sphereGeometryPosition[i + 1],
      posZ: sphereGeometryPosition[i + 2],
      textureLoader,
      image: images[Math.floor(Math.random() * images.length)],
    })

    panels.push(panel)
  }

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()

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
