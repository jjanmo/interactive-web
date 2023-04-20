import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import px from '../assets/cubemap/px.png'
import nx from '../assets/cubemap/nx.png'
import py from '../assets/cubemap/py.png'
import ny from '../assets/cubemap/ny.png'
import pz from '../assets/cubemap/pz.png'
import nz from '../assets/cubemap/nz.png'

export default function example() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('white')

  const ambientLight = new THREE.AmbientLight('#eee', 0.5)
  const directionalLight = new THREE.DirectionalLight('#eee', 1)
  directionalLight.position.set(1, 2, 3)
  scene.add(directionalLight, ambientLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 12)
  scene.add(camera)

  //helper
  const axis = new THREE.AxesHelper(14)
  scene.add(axis)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const cubeTextureLoader = new THREE.CubeTextureLoader()
  const cubeTexture = cubeTextureLoader.load([
    // (x y z 축 | + -) 순서
    px,
    nx,
    py,
    ny,
    pz,
    nz,
  ])
  // cubeTextureLoader.setPath('assets/cubemap').load(['nx.png',~])
  // → : webpack에서는 모듈로 이미지를 읽어드릴 수 있음, 이런식으로 하려면 웹팩 설정을 다르게(강의처럼) 해야함

  const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
  // const material = new THREE.MeshBasicMaterial({
  const material = new THREE.MeshStandardMaterial({
    // 큐브 6면에 주위 공간이 비추는 것처럼 구현하는 방식
    envMap: cubeTexture,
    // MeshStandardMaterial : roughness, metalness 둘이 적절히 조화를 이루어야...잘보임. 난 아래 설정이 가장 잘보이는듯
    roughness: 0, //default 1 : 이때는 너무 밝아서 보이지 않는 듯
    metalness: 1, //default 0 : 이때도 안보임
    side: THREE.DoubleSide,
  })

  const mesh = new THREE.Mesh(boxGeometry, material)
  scene.add(mesh)
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
