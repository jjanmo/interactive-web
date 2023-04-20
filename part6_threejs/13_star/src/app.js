import './style.css'

import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import star from './models/gold_star.glb'

export default function app() {
  let mesh
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 5)
  scene.add(camera)

  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(0, 2, 5)
  light.castShadow = true
  scene.add(light)

  const gltfLoader = new GLTFLoader()
  gltfLoader.load(star, (glb) => {
    mesh = glb.scene
    mesh.castShadow = true
    mesh.position.set(0, 0, 0)
    mesh.scale.set(5, 5, 5)
    camera.lookAt(mesh.position)
    scene.add(mesh)
  })

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    if (mesh) {
      const delta = clock.getDelta()
      mesh.rotation.y += THREE.MathUtils.degToRad(delta * 100)
      camera.lookAt(mesh.position)
    }
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

app()
