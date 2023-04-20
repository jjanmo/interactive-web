import * as THREE from 'three'

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

  camera.position.y = 1
  camera.position.z = 7
  scene.add(camera)

  const light = new THREE.DirectionalLight('#dff9fb', 5)
  scene.add(light)
  light.position.x = 1
  light.position.y = 3
  light.position.z = 7

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: '#2c3e50',
  })

  const cubes = []
  for (let i = 0; i < 8; i++) {
    const cube = new THREE.Mesh(geometry, material)
    cube.position.x = Math.random() * 6 - 3
    cube.position.y = Math.random() * 2 - 1
    cube.position.z = Math.random() * 6 - 3
    scene.add(cube)

    cubes.push(cube)
  }

  const clock = new THREE.Clock()

  const draw = () => {
    const delta = clock.getDelta()

    cubes.forEach((cube) => {
      cube.rotation.y += delta * 2
    })

    renderer.render(scene, camera)

    requestAnimationFrame(draw)
  }

  const setCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', setCanvas)

  draw()
}
