import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { House } from './house'
import gsap from 'gsap'

const PADDING_TOP = 200
const TOTAL_HOUSE = 5
const MESH_INFO = {
  0: { x: -5, z: 20, height: 2, scale: 1, rotationZ: 0 },
  1: { x: 7, z: 10, height: 2, scale: 0.4, rotationZ: 5 },
  2: { x: -10, z: 0, height: 2, scale: 0.4, rotationZ: 1.8 },
  3: { x: 10, z: -10, height: -1, scale: 0.11, rotationZ: 0 },
  4: { x: -5, z: -20, height: 0, scale: 0.005, rotationZ: 1.57 },
}

export default function init() {
  const canvas = document.getElementById('my-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // 그림자를 부드럽게 만들어주는 옵션(기본적인 속성으로 설정해주는 것이 좋다!)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('white')

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(-5, 2, 25)
  scene.add(camera)

  const gltfLoader = new GLTFLoader()

  const ambientLight = new THREE.AmbientLight('white', 0.7)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight('white', 0.7)
  spotLight.position.set(0, 150, 100)
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024
  spotLight.shadow.camera.near = 1
  spotLight.shadow.camera.far = 200
  scene.add(spotLight)

  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: '#867d8c' })
  )
  floorMesh.receiveShadow = true
  floorMesh.rotation.x = -Math.PI / 2
  scene.add(floorMesh)

  const houses = []
  for (let i = 0; i < TOTAL_HOUSE; i++) {
    houses.push(
      new House({
        scene,
        loader: gltfLoader,
        src: `./models/house${i + 1}.glb`,
        ...MESH_INFO[i],
      })
    )
  }

  const draw = () => {
    renderer.render(scene, camera) // scene에 변화가 있을때마다 render가 작동해야함
    renderer.setAnimationLoop(draw)
  }
  draw()

  let currentSection = 0
  const handleScrollSection = () => {
    const updated = Math.ceil((window.scrollY - PADDING_TOP) / window.innerHeight)
    if (currentSection !== updated) {
      gsap.to(camera.position, {
        duration: 1,
        x: houses[updated].x,
        z: houses[updated].z + 5, // 약간 앞에서 보이려고
      })
      currentSection = updated
    }
  }

  const handleResizeCanvas = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', handleResizeCanvas)
  window.addEventListener('scroll', handleScrollSection)
}

init()
