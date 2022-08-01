import * as THREE from 'three'
import * as dat from 'dat.gui'
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
  scene.background = new THREE.Color('#ecf0f1')

  const axesHelper = new THREE.AxesHelper(20)
  scene.add(axesHelper)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 5
  scene.add(camera)

  const light = new THREE.DirectionalLight('#eee', 1)
  light.position.y = 2
  light.position.z = 5
  scene.add(light)

  // controls : threejs에서 재공하는 블랜더의 뷰포트처럼 마우스(트랙패드)로 조작하는 유틸기능
  const controls = new OrbitControls(camera, renderer.domElement)

  /*
shading : 3d모델, 일러스트에서 명도, 빛의 어두운 정도를 달리해서 거리감을 표현하는 방법
flatShading : 3d 컴퓨터 그래픽스의 라이팅 기법으로 다각형의 표면 정규와 광원 방향 간 각도, 개별 색상, 
광원의 세기에 따라 한 물체의 각 다각형에 그림자를 넣는다 라고 말하는데, 개념적인 표현으로는 잘 모르겠고,
시각적으로 한 객체(물체)안에서 각각의 벡터?(부분)에 광원이 비치는것을 표현하는 방법, 그래서 뭔가 울퉁불퉁해 보인다.
*/

  const geometry = new THREE.SphereGeometry(5, 70, 70)
  const material = new THREE.MeshStandardMaterial({
    color: '#f9ca24',
    flatShading: true,
  })
  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)

  renderer.render(scene, camera)

  const gui = new dat.GUI()
  gui.add(camera.position, 'x', -5, 5, 0.01).name('Camera X')
  gui.add(camera.position, 'y', -5, 5, 0.01).name('Camera Y')
  gui.add(camera.position, 'z', -5, 5, 0.01).name('Camera Z')

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
