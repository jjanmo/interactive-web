import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as CANNON from 'cannon-es'
import PreventDragControl from './PreventDragControl'
import MySphere from './MySphere'

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.enabled = THREE.PCFSoftShadowMap

  const preventDragControl = new PreventDragControl(canvas)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 3, 10)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // cannon world
  const cannonWorld = new CANNON.World()
  cannonWorld.gravity.set(0, -20, 0)

  // const defaultMaterial = new CANNON.Material('default')
  // const defaultContactMaterial = new CANNON.ContactMaterial(
  //   // 부딪칠 두 물체
  //   defaultMaterial,
  //   defaultMaterial,
  //   {
  //     friction: 0.5, // 마찰력
  //     restitution: 0.3, // 반발력
  //   }
  // )
  // cannonWorld.defaultContactMaterial = defaultContactMaterial // 기본값 셋팅

  const floorShape = new CANNON.Plane()
  const floorBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0),
    shape: floorShape,
  })
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), //
    Math.PI * 0.5
  )
  cannonWorld.addBody(floorBody)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  scene.add(ambientLight)
  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(2, 2, 5)
  scene.add(light)
  light.castShadow = true

  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: 'slategray',
      side: THREE.DoubleSide,
    })
  )
  floorMesh.rotation.x = -Math.PI * 0.5
  scene.add(floorMesh)
  floorMesh.receiveShadow = true

  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 'tomato',
    side: THREE.DoubleSide,
  })

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const spheres = []
  const draw = () => {
    const delta = clock.getDelta()
    cannonWorld.step(1 / 60, delta, 3)

    spheres.forEach((sphere) => {
      sphere.mesh.position.copy(sphere.body.position)
      sphere.mesh.quaternion.copy(sphere.body.quaternion)
    })

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

  const handleGenerateSphere = () => {
    if (!preventDragControl.isClicked) return

    const sphere = new MySphere({
      scene,
      cannonWorld,
      geometry: sphereGeometry,
      material: sphereMaterial,
      posX: (Math.random() - 0.5) * 2,
      posY: Math.random() * 5 + 2, // 2는 최소값 설정
      posZ: (Math.random() - 0.5) * 2,
      scale: Math.random() + 0.1,
    })
    spheres.push(sphere)
  }

  window.addEventListener('resize', handleResizeCanvas)

  canvas.addEventListener('click', handleGenerateSphere)
}
