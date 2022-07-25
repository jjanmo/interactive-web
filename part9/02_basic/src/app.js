import './style.css'
import * as THREE from 'three'

// 1)
// 렌더러 : 화면에 그려주는 역할
// const renderer = new THREE.WebGLRenderer()

// // renderer.domElement : 랜더러가 가지고 있는 Dom요소 === 랜더러가 가진 캔버스
// // 이것을 body에 조립하는 형식으로 랜더러를 JS로 설정
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// 2) canvas 요소를 가져와서 랜더러를 설정할 수 있다 → 추천(활용범위가 더 넓다)
const canvas = document.querySelector('#three-canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
