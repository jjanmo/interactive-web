import * as THREE from 'three'
import gsap from 'gsap'

export default function example() {
  const canvas = document.querySelector('#three-canvas')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#f9ca24')
  scene.fog = new THREE.Fog('blue', 3, 7) // (색, from, to)
  // → fog를 통해서 원근감이 좀 더 살아남!

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 5
  scene.add(camera)

  const light = new THREE.DirectionalLight('#dff9fb', 5)
  scene.add(light)
  light.position.x = 1
  light.position.y = 3
  light.position.z = 7

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: '#8e44ad',
  })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // How to use GSAP(animation library)
  // https://greensock.com/gsap/

  const draw = () => {
    renderer.render(scene, camera)

    requestAnimationFrame(draw)
  }

  gsap.to(cube.position, {
    duration: 1,
    x: 3,
    y: 3,
    z: 2,
  })

  const setCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', setCanvas)

  draw()
}
