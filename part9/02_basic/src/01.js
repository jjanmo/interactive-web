import * as THREE from 'three'

export default function example() {
  // 1)
  // 렌더러 : 화면에 그려주는 역할
  // const renderer = new THREE.WebGLRenderer()

  // // renderer.domElement : 랜더러가 가지고 있는 Dom요소 === 랜더러가 가진 캔버스
  // // 이것을 body에 조립하는 형식으로 랜더러를 JS로 설정
  // renderer.setSize(window.innerWidth, window.innerHeight)
  // document.body.appendChild(renderer.domElement)

  // 2) canvas 요소를 가져와서 랜더러를 설정할 수 있다 → 추천(활용범위가 더 넓다)
  const canvas = document.querySelector('#three-canvas')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()

  // 카메라 2종류
  // 원근카메라 PerspectiveCamera : ✅ 원근적용 O : 우리가 주로 사용할 카메라
  // 직교카메라 OrthographicCamera : 원근적용 X → 쿼터뷰(숄더뷰) 게임들 ex. LOL, 디아블로 ... 특정목적이 있을때 사용
  // https://stackoverflow.com/questions/36573283/from-perspective-picture-to-orthographic-picture

  //1)
  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각
  //   window.innerWidth / window.innerHeight, // 종횡비(화면의 가로세로비율) aspect
  //   0.1, // near
  //   1000 // far
  // )
  // camera.position.x = 2
  // camera.position.y = 1
  // camera.position.z = 5
  // 단위는 개념적으로 우리가 만들고자 하는 공간에서의 단위로 상상하면 된다.

  // 2)
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, //right
    1, // top
    -1, // bottom
    0.1, // near
    1000 // far
  )
  camera.position.x = 1
  camera.position.y = 2
  camera.position.z = 5
  // OrthographicCamera에서 줌을 조절하려면 z 축의 위치가 아니라 zoom을 조절하고 적용시켜준다!
  camera.lookAt(0, 0, 0)
  camera.zoom = 0.7
  camera.updateProjectionMatrix() // 줌바꿨기때문에 카메라 업데이트!
  scene.add(camera)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 'tomato',
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  console.log(cube)

  renderer.render(scene, camera)
}
