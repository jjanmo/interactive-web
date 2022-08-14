import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as CANNON from 'cannon-es'

// 물리엔진
// 실제 물리적인 현상을 구현하기 위해서 사용하는 물리엔진으로서 우리는 cannon.js를 사용한다
// 물리적인 현상을 직접하나씩 구현하는 것은 너무 힘들기때문에 물리엔진을 이용해서 이를 구현한다
//

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.y = 10
  camera.position.z = 20
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 물리엔진이 적용될 월드 생성
  const cannonWorld = new CANNON.World()
  cannonWorld.gravity.set(0, -10, 0) // 중력 설정

  // threejs에서 만들어진 mesh와 같은 것들을 쌍으로 만들어야함
  // → 물리엔진이 적용될 body들을 threejs의 mesh가 따라서 동작하게된
  // → threejs에서의 mesh는 우리 눈에 보이는 것 ------  cannonjs에서의 body는 실제로 물리적인 동작을 하는 것
  //   이 둘을 쌍으로 묶어야 함
  const floorShape = new CANNON.Plane()
  const floorBody = new CANNON.Body({
    mass: 0, // 바닥은 바닥역할을 하기 위해서(바닥이 밑으로 떨어지지 않게)
    position: new CANNON.Vec3(0, 0, 0),
    shape: floorShape,
  })
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), //
    Math.PI * 0.5
  ) // cannonjs에서는 rotation 대신 quaternion을 사용
  cannonWorld.addBody(floorBody)

  const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 4, 0.5))
  const cubeBody = new CANNON.Body({
    mass: 1, // 무게가 무거우면 충격을 덜 받는다. 똑같이 적용이 된다
    position: new CANNON.Vec3(0, 12, 0),
    shape: cubeShape,
  })
  cannonWorld.addBody(cubeBody)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  scene.add(ambientLight)
  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.y = 2
  light.position.z = 5
  scene.add(light)

  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      color: 'slategray',
      side: THREE.DoubleSide,
    })
  )
  floorMesh.rotation.x = -Math.PI * 0.5
  scene.add(floorMesh)

  const cubeMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 8, 1),
    new THREE.MeshStandardMaterial({ color: '#3498db' })
  )
  cubeMesh.position.y = 0.5
  scene.add(cubeMesh)

  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()

    let cannonStepTime = 1 / 60
    if (delta < 0.01) cannonStepTime = 1 / 120 // 프레임 최적화 코드!!

    cannonWorld.step(cannonStepTime, delta, 3) // (업데이트 횟수(보통 초당 60프레임), ,잠정적으로 발생하게될 지연에 대한 업데이트 횟수)

    cubeMesh.position.copy(cubeBody.position) // 물리엔지의 위치 복사
    cubeMesh.quaternion.copy(cubeBody.quaternion) // 물리엔진의 회전 복사

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
