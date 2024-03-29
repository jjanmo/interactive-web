import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as CANNON from 'cannon-es'
import Domino from './Domino'
import PreventDragControl from './PreventDragControl'

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
  camera.position.set(2, 8, 8)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const gltfLoader = new GLTFLoader()

  // cannon world
  const cannonWorld = new CANNON.World()
  cannonWorld.gravity.set(0, -20, 0)

  const defaultMaterial = new CANNON.Material('default')
  const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.01,
    restitution: 0.7,
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
  light.position.set(2, 2, 5)
  scene.add(light)
  light.castShadow = true

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

  renderer.render(scene, camera)

  const clock = new THREE.Clock()

  const domimos = []
  for (let i = 1; i <= 20; i++) {
    const domino = new Domino({
      index: i,
      scene,
      cannonWorld,
      // y: 2,
      z: -i * 0.8, // z축의 음의 방향(안쪽으로)
      gltfLoader,
      // rotationY: Math.random() * (Math.PI / 2) - 45,
    })

    domimos.push(domino)
  }

  const draw = () => {
    const delta = clock.getDelta()
    cannonWorld.step(1 / 60, delta, 3)

    domimos.forEach((domino) => {
      if (domino.modelMesh) {
        domino.modelMesh.position.copy(domino.body.position)
        domino.modelMesh.quaternion.copy(domino.body.quaternion)
      }
    })

    renderer.render(scene, camera)
    requestAnimationFrame(draw)
  }
  draw()

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const preventDragControl = new PreventDragControl(canvas)

  const checkIntersects = () => {
    raycaster.setFromCamera(mouse, camera)

    // 1)
    // const meshes = domimos.map((domino) => domino.modelMesh)
    // const intersections = raycaster.intersectObjects(meshes)

    // 2)
    const objectCannonBodies = domimos.map((domino) => domino.body)
    const intersections = raycaster.intersectObjects(scene.children)
    // scene.children : scene 아래 모든 객체

    const clickedIndex = intersections[0].object.name - 1
    if (objectCannonBodies[clickedIndex])
      objectCannonBodies[clickedIndex].applyForce(new CANNON.Vec3(0, 0, -100))

    // 힘은 cannonbody에 줘야함
    // 나는 도미노들의 객체 안에서 body만 파싱해서 사용하였지만,
    // 반대로 객체 생성시 객체 안에 body를 직접 넣어서 사용할수도 있음(수업에서 한 방식)
  }

  const handleClickCanavs = (e) => {
    if (!preventDragControl.isClicked) return

    const posX = (e.clientX / canvas.clientWidth) * 2 - 1
    const posY = -((e.clientY / canvas.clientHeight) * 2 - 1) // threejs에서 방향이 일반좌표와 y축이 반대
    mouse.x = posX
    mouse.y = posY

    checkIntersects()
  }

  const handleResizeCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', handleResizeCanvas)
  canvas.addEventListener('click', handleClickCanavs)
}
