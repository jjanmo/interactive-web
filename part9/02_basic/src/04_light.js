import * as THREE from 'three'

export default function example() {
  const canvas = document.querySelector('#three-canvas')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#FFF000')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.x = 2
  camera.position.y = 1.5
  camera.position.z = 6
  scene.add(camera)

  const light = new THREE.DirectionalLight('dodgerblue', 5) // (광색, 광세기/강도) 0xffffff
  scene.add(light)
  // 빛의 위치
  light.position.x = 1
  light.position.y = 2
  light.position.z = 5

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 'tomato',
  })
  // 빛을 받는 재질인지 ? : MeshBasicMaterial 빛에 영향을 받지 않는 재질임
  // → MeshStandardMaterial 빛을 받는 재질임

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
