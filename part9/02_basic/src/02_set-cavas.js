import * as THREE from 'three'

export default function example() {
  const canvas = document.querySelector('#three-canvas')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  console.log(window.devicePixelRatio) // 현재 표시 장치의 물리적 픽셀과 CSS 픽셀의 비율을 반환
  // devicePixelRatio = 2 라는 말은 100px을 보여주기 위해서 실제사이즈를 2배 키운뒤(200px), 이를 100px로 압축해서 보여주기때문에 화질이 더 좋아지는 것!
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1) // 이렇게 사용하는 것이 성능상 유리하다고 한다 💡

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비(화면의 가로세로비율) aspect
    0.1, // near
    1000 // far
  )
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
    //1. 카메라 조정 : 종횡비 재설정
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix() // 카메라에 변화가 있을 때 변화를 재적용해서 카메라를 업데이트하는 함수

    // 다시 랜더러 랜더링!
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  // threejs에서 화면 크기 대응
  window.addEventListener('resize', setCanvas)
}
