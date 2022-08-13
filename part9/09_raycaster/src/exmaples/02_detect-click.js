import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import PreventDragControl from './PreventDragControl'

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
  camera.position.set(5, 1, 2)
  scene.add(camera)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  scene.add(ambientLight)
  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.set(1, 0, 2)
  scene.add(light)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 광선에 맞을 물체
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 'tomato' })
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
  const mouse = new THREE.Vector2() // 마우스 클릭은 2차원 좌표에서 일어나는 것(vector2 사용)
  let intersections

  const clock = new THREE.Clock()
  const draw = () => {
    const time = clock.getElapsedTime()

    box.position.y = Math.sin(time) * 3
    box.material.color.set('plum')
    torus.rotation.y = time
    torus.material.color.set('tomato')

    if (intersections) {
      for (let item of intersections) {
        item.object.material.color.set('gold')
        break
      }
    }

    renderer.render(scene, camera)
    requestAnimationFrame(draw)
  }
  draw()

  const checkIntersects = () => {
    raycaster.setFromCamera(mouse, camera)
    // 카메라 시점에서 광선을 쏜다는 의미
    // → 카메라 지점 = origin / 클릭한 지점 = direction (그래서 아래에서 1단위로 정규화한 것인듯...)

    intersections = raycaster.intersectObjects(meshes)
    // console.log(intersections) // 클릭한 곳에 있는 모든 mesh object 리턴

    // 1)
    // loop 방식의 장점 : loop 안에서 감지되는 여부에 따라서 특정 로직을 처리할 수 있다
    // for (let item of intersections) {
    //   item.object.material.color.set('gold')
    //   break
    // }

    // 2) 클릭한 최초 앞에 있는 mesh를 감지하고 싶다면 아래 코드처럼도 가능 (결국 위와 동일한 코드)
    // if (intersections[0]) {
    //   console.log(intersections[0].object)
    // }
  }

  const preventDragControl = new PreventDragControl(canvas)

  const handleResizeCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  const handleClickCanvas = (e) => {
    if (preventDragControl.isClicked) {
      // 가운데를 (0, 0) 좌표로 하여 맞추는 방법
      // 화면 중앙부터 끝까지는 각각 +방향 0 ~ 1 / -방향 0 ~ -1 사이의 값으로 맞춘다
      // → 클릭한 위치와 캔버스 전체 크기를 나눠서 비율을 구한다.
      // → *2는 총 width와 height의 최대치가 2이기 때문에 2를 곱한다
      // → -1을 빼는 것은 중앙을 (0,0)으로 표시하기 때문에
      // → 기본적으로 웹과 threejs에서의 y축 방향이 반대이다 : 웹 y축 아래 방향이 + / threejs y축 위 방향이 - → 최종 y값에 -를 붙여줘야함
      // → 위 과정은 일종의 마우스 클릭 좌표를 1단위로 정규화 시킨 것!
      const x = (e.clientX / canvas.clientWidth) * 2 - 1
      const y = -((e.clientY / canvas.clientHeight) * 2 - 1)
      mouse.x = x
      mouse.y = y

      checkIntersects()
    }
  }

  window.addEventListener('resize', handleResizeCanvas)
  canvas.addEventListener('click', handleClickCanvas)
}
