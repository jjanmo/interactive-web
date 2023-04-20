import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// raycaster란
// 광선을 이용해서 클릭감지를 하는 것
// 광선을 캐스팅(던지다) 한다고해서 raycaster

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()

  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(5, 1, 2)
  scene.add(camera)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  scene.add(ambientLight)
  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(1, 0, 2)
  scene.add(light)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 광선 ray
  const lineMaterial = new THREE.LineBasicMaterial({ color: 'yellow' }) // 선을 만들때 사용
  const points = [] // 두 점을 잇는 선을 만들기 위해서 두 점의 위치를 저장
  points.push(new THREE.Vector3(0, 0, 100))
  points.push(new THREE.Vector3(0, 0, -100))
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points) // points안에 들어있는 점을 기반으로 geometry를 동적으로 구성하는 것
  const guide = new THREE.Line(lineGeometry, lineMaterial)
  scene.add(guide)

  // 광선에 맞을 물체
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 'plum' })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  box.name = 'box' // mesh에 이름 세팅
  scene.add(box)

  const torusGeometry = new THREE.TorusGeometry(2, 0.4, 16, 100)
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 'tomato' })
  const torus = new THREE.Mesh(torusGeometry, torusMaterial)
  torus.name = 'torus'
  scene.add(torus)

  const meshes = [box, torus]

  renderer.render(scene, camera)

  // raycaster 생성
  const raycaster = new THREE.Raycaster()

  const clock = new THREE.Clock()

  const draw = () => {
    const time = clock.getElapsedTime()

    box.position.y = Math.sin(time) * 3
    box.material.color.set('plum')
    torus.rotation.y = time
    torus.material.color.set('tomato')

    // raycaster 세팅
    const origin = new THREE.Vector3(0, 0, 100) // 광선의 시작점
    const direction = new THREE.Vector3(0, 0, -1) // 광선의 방향 → 정규화(1단위로 만드는과정?)하여 적어야함

    // 방향의 정규화
    // const direction = new THREE.Vector3(0, 0, -100)
    // direction.normalize() // 실제 사용한 값을 사용하기 위해선 normalize() 필수! 안하면 작동안함

    raycaster.set(origin, direction)

    // raycaster를 이용해서 물체와의 충돌체크
    const intersections = raycaster.intersectObjects(meshes) // 충돌한 메쉬를 감지하여 배열을 리턴함
    // → 움직임이 없을때, length가 2인 배열 리턴 : 광선이 하나의메쉬를 지나가지만 면 앞/뒤에 충돌하기때문에
    intersections.forEach((item) => {
      // console.log(item.object.name) // 부딪친 메쉬의 이름 출력
      item.object.material.color.set('gold')
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

  window.addEventListener('resize', handleResizeCanvas)
}
