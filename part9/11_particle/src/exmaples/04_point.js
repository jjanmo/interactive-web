import * as THREE from 'three'
import { SphereGeometry } from 'three'
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

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 4)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(0, 5, 10)
  scene.add(light)

  renderer.render(scene, camera)

  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.3),
    new THREE.MeshBasicMaterial({
      color: 'tomato',
      side: THREE.DoubleSide,
    })
  )

  const sphereGeometry = new SphereGeometry(1, 8, 8)
  // console.log(sphereGeometry.attributes.position.array) // sphereGeometry의 점들이 들어있는 배열
  const sphereGeometryPosition = sphereGeometry.attributes.position.array

  let plane
  for (let i = 0; i < sphereGeometryPosition.length; i += 3) {
    plane = planeMesh.clone()
    plane.position.x = sphereGeometryPosition[i]
    plane.position.y = sphereGeometryPosition[i + 1]
    plane.position.z = sphereGeometryPosition[i + 2]

    plane.lookAt(0, 0, 0)
    scene.add(plane)
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
