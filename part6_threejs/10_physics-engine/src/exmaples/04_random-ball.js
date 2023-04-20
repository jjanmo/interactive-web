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

  const defaultMaterial = new CANNON.Material('default')
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

  //Cannonjs Optimization
  cannonWorld.allowSleep = true
  // body가 거의 움직임이 없으면, 테스트를 안하게 하는 옵션, 이런 옵션이 없으면 매번 모든 body에 대한 테스트를 진행함
  // 주의! : 해당 body를 체크를 해야하는 것인지 여부를 잘 판단해야함(ex. 게임같은데에서는 움직이지 않더라도 체크를 해줘야하는 경우도 있음)

  cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld)
  // 뭔가 무거운 작업이 진행되는 경우, 해당 속성은 성능에 대한 적절하게 효율적인 타협 설정을 해준다(?)
  // NiveBroadphase : default
  // GridBroadphase : 구역을 쪼개서 나누어 테스트를 진행
  // SAPBroadphase : 일반적으로 이 옵션이 좋다고 함.

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
  light.position.set(2, 2, 5)
  scene.add(light)
  light.castShadow = true

  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
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
      defaultMaterial,
    })
    spheres.push(sphere)
  }

  window.addEventListener('resize', handleResizeCanvas)

  canvas.addEventListener('click', handleGenerateSphere)
}
