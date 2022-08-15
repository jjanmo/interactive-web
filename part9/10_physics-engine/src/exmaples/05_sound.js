import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as CANNON from 'cannon-es'
import PreventDragControl from './PreventDragControl'
import MySphere from './MySphere'
import collideSound from '../sounds/boing.mp3'

// 충돌이벤트 + 충돌사운드
// → 충동이벤트 : cannonbody에서 일어나는 것

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
  const sound = new Audio(collideSound)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 30, 50)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // cannon world
  const cannonWorld = new CANNON.World()
  cannonWorld.gravity.set(0, -20, 0)

  const defaultMaterial = new CANNON.Material('default')
  const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.5,
    restitution: 0.3,
  })
  cannonWorld.defaultContactMaterial = defaultContactMaterial
  cannonWorld.allowSleep = true
  cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld)

  const floorShape = new CANNON.Plane()
  const floorBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0),
    shape: floorShape,
    material: defaultMaterial,
  })
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), //
    Math.PI * 0.5
  )
  cannonWorld.addBody(floorBody)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  scene.add(ambientLight)
  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(2, 10, 5)
  scene.add(light)
  light.castShadow = true

  // Q. 표면 전방위적인 그림자는 어떻게 생성해야지??
  // 빛을 바꿔야하나?

  // const helper = new THREE.CameraHelper(light.shadow.camera)
  // scene.add(helper)

  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
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

      // 감속
      sphere.body.velocity.x *= 0.995
      sphere.body.velocity.y *= 0.995
      sphere.body.velocity.z *= 0.995
      sphere.body.angularVelocity.x *= 0.995
      sphere.body.angularVelocity.y *= 0.995
      sphere.body.angularVelocity.z *= 0.995
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

  const handleCollide = (e) => {
    // 충돌의 강도에 관계없이 소리가 똑같이 나는 현상을 수정하기 위해서
    // 충돌시 일어나는 속도를 가지고 이를 제어할 수 있다.
    const velocity = e.contact.getImpactVelocityAlongNormal()
    if (velocity > 4) {
      sound.currentTime = 0
      sound.play()
    }
  }

  const handleGenerateSphere = () => {
    if (!preventDragControl.isClicked) return

    const sphere = new MySphere({
      scene,
      cannonWorld,
      geometry: sphereGeometry,
      material: sphereMaterial,
      posX: (Math.random() - 0.5) * 2,
      posY: Math.random() * 5 + 2,
      posZ: (Math.random() - 0.5) * 2,
      scale: Math.random() + 0.1,
      defaultMaterial,
    })

    // 충동이벤트
    sphere.body.addEventListener('collide', handleCollide)

    spheres.push(sphere)
  }

  window.addEventListener('resize', handleResizeCanvas)

  canvas.addEventListener('click', handleGenerateSphere)
}
