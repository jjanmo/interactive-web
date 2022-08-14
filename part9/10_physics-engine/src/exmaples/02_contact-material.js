import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as CANNON from 'cannon-es'

// Contact Material
// 접촉재질에 따라서 마찰력과 반발력이 발생하는데 이것을 구현해보는것!

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

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(-2, 3, 5)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // cannon world
  const cannonWorld = new CANNON.World()
  cannonWorld.gravity.set(0, -20, 0)

  const defaultMaterial = new CANNON.Material('default')
  const rubberMaterial = new CANNON.Material('rubber')
  const ironMaterial = new CANNON.Material('iron')

  const defaultContactMaterial = new CANNON.ContactMaterial(
    // 부딪칠 두 물체
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.5, // 마찰력
      restitution: 0.3, // 반발력
    }
  )

  cannonWorld.defaultContactMaterial = defaultContactMaterial // 기본값 셋팅

  const rubberDefaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, rubberMaterial, {
    friction: 0.5,
    restitution: 0.8,
  })
  cannonWorld.addContactMaterial(rubberDefaultContactMaterial) // 월드에 등록
  // → 사용하려면 body의 material 속성을 위에서 등록한 ContactMaterial에 맞게 설정하면 된다

  const ironDefaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, ironMaterial, {
    friction: 0.5,
    restitution: 0,
  })
  cannonWorld.addContactMaterial(ironDefaultContactMaterial)

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

  const sphereShape = new CANNON.Sphere(0.5)
  const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 5, 0),
    shape: sphereShape,
    material: rubberMaterial,
    // material: ironMaterial,
  })
  cannonWorld.addBody(sphereBody)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  scene.add(ambientLight)
  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.x = 2
  light.position.y = 2
  light.position.z = 5
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

  const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    new THREE.MeshStandardMaterial({ color: 'tomato' })
  )
  scene.add(sphereMesh)
  sphereMesh.castShadow = true

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()

    let cannonStepTime = 1 / 60
    if (delta < 0.01) cannonStepTime = 1 / 120

    cannonWorld.step(cannonStepTime, delta, 3)

    sphereMesh.position.copy(sphereBody.position) // 물리엔지의 위치 복사
    sphereMesh.quaternion.copy(sphereBody.quaternion) // 물리엔진의 회전 복사

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
