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
  const draw = () => {
    // 각도는 라디안 단위(각도로 나타내는 60분법이 아니다)
    // 360도 = 2파이

    // cube.rotation.x += 0.1
    cube.rotation.x += THREE.MathUtils.degToRad(2) // 우리가 아는 각도 개념을 넣어서 사용할 수 있는 유틸함수

    if (cube.position.y > 4) {
      d = -0.05
    } else if (cube.position.y <= 0) {
      d = 0.05
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
