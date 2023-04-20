import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import front from '../assets/mcstyle/front.png'
import back from '../assets/mcstyle/back.png'
import left from '../assets/mcstyle/left.png'
import right from '../assets/mcstyle/right.png'
import top from '../assets/mcstyle/top.png'
import bottom from '../assets/mcstyle/bottom.png'

/*
각 면이 다른 큐브
1) 각면에서 사용할 이미지 로드
2) 이미지를 이용하여 texture를 생성
3) texture를 이용하여 material를 생성 -> 각 면의 material 총 6개 생성 
4) materials가 들어간 mesh 생성
5) mesh를 scene에 추가

upload image -> texture -> materials -> mesh 
*/

export default function example() {
  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = () => console.log('로드 시작')
  loadingManager.onProgress = (img) => console.log(`${img} 로딩중`)
  loadingManager.onLoad = () => console.log('로딩 완료')
  loadingManager.onError = () => console.log('로딩 에러')

  const textureLoader = new THREE.TextureLoader(loadingManager)
  const frontTexture = textureLoader.load(front)
  const backTexture = textureLoader.load(back)
  const leftTexture = textureLoader.load(left)
  const rightTexture = textureLoader.load(right)
  const topTexture = textureLoader.load(top)
  const bottomTexture = textureLoader.load(bottom)

  const materials = [
    // 순서 : x,y,z축 +-
    new THREE.MeshBasicMaterial({ map: rightTexture }),
    new THREE.MeshBasicMaterial({ map: leftTexture }),
    new THREE.MeshBasicMaterial({ map: topTexture }),
    new THREE.MeshBasicMaterial({ map: bottomTexture }),
    new THREE.MeshBasicMaterial({ map: frontTexture }),
    new THREE.MeshBasicMaterial({ map: backTexture }),
  ]

  rightTexture.magFilter = THREE.NearestFilter // 작은 사이즈의 픽셀 이미지를 살려서 작업할 때 사용할 옵션
  leftTexture.magFilter = THREE.NearestFilter
  topTexture.magFilter = THREE.NearestFilter
  bottomTexture.magFilter = THREE.NearestFilter
  frontTexture.magFilter = THREE.NearestFilter
  backTexture.magFilter = THREE.NearestFilter

  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ecf0f1')

  const axesHelper = new THREE.AxesHelper(8)
  scene.add(axesHelper)

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.set(1, 1, 2)
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 2, 4)
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const geometry = new THREE.BoxGeometry(2, 2, 2)

  const cube = new THREE.Mesh(geometry, materials)
  scene.add(cube)
  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  const draw = () => {
    const delta = clock.getDelta()
    controls.update()
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
