import * as THREE from 'three'

export default function example() {
  const canvas = document.querySelector('#three-canvas')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  // renderer.setClearAlpha(0.5) // 투명도 설정
  // renderer.setClearColor(0x00ff00) // '#00ff00' // renderer에서 색 설정 가능
  // renderer.setClearAlpha(0.5)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#FFF000')
  // 우선순위 : scene에 설정 > renderer에 설정 : renderer위에 scene(우리가 그리는 진짜 무대라고 생각할 수 있음)이 쌓이는 개념으로 볼 수 있다.
  // → 어디에 배경색을 설정하든 상관없다 단, ex. 화면에 투명도 설정이 필요한 경우 renderer에서 해야함, 상황에 맞게 설정!

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.x = 2
  camera.position.y = 1
  camera.position.z = 5

  camera.lookAt(0, 0, 0)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 'tomato',
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  renderer.render(scene, camera)

  const setCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', setCanvas)
}
