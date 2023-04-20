import * as THREE from 'three'

export default function example() {
  const canvas = document.querySelector('#three-canvas')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#f9ca24')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 6
  scene.add(camera)

  const light = new THREE.DirectionalLight('#dff9fb', 5)
  scene.add(light)
  light.position.x = 1
  light.position.y = 2
  light.position.z = 5

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: '#686de0',
  })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  let d = 0

  // 애니메이션 최적화
  // → 디바이스(브라우저, 컴퓨터) 환경에 따라서 속도가 달라지지 않게 할 수 있는 방법

  // const clock = new THREE.Clock()

  let oldTime = Date.now()

  const draw = () => {
    // 성능최적화 1)
    // const time = clock.getElapsedTime() // 시계가 작동한 총 (경과시간)시간, 절대시간의 개념, 모든 기기에서 같은 값 → 이것을 애니메이션에 이용함
    // console.log(time)

    // 성능최적화 2)
    // const delta = clock.getDelta()
    // draw함수가 실행되는 간격(1번째 draw함수에서의 time과 2번째 draw함수에서의 time의 차)
    // !!주의 getElapsedTime과 getDelta를 같이 사용하면 안됨! 내부적으로 값이 꼬이는 현상(?)이 생김

    // 성능최적화 3) : JS Date 이용
    // → 장점  : 일반 캔버스 앱에서도 활용 가능, requestAnimationFrame를 사용하는 곳에서는 어느 곳에서나 사용가능
    const newTime = Date.now()
    const deltaTime = newTime - oldTime
    oldTime = newTime

    // cube.rotation.x = time // 1)
    // cube.rotation.x += delta * 2 // 2)
    cube.rotation.x += deltaTime * 0.002 // 3)

    if (cube.position.y > 4) {
      d = -(deltaTime * 0.003)
    } else if (cube.position.y <= 0) {
      d = deltaTime * 0.003
    }

    cube.position.y += d

    renderer.render(scene, camera)

    requestAnimationFrame(draw)

    // renderer.setAnimationLoop(draw)
    // → three.js에 내장된 requestAnimationFrame와 같은 기능을 하는 함수
    // → WebXR(AR|VR)을 만드는 경우엔 setAnimationLoop를 사용하라고 권장함(공식문서)
  }

  const setCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', setCanvas)

  draw()
}
