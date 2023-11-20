import * as THREE from 'three';

function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true, // antialias : 그래픽스를 더 부드럽게 하는 속성, 직선이 들쭉날쭉하거나 “계단” 모양으로 나타나는 현상을 없애줌(이런걸 앨리어싱현상이라고함)
  });
  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(3, 4, 5);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  // const material = new THREE.MeshBasicMaterial({ color: 'dodgerblue' }); // MeshBasicMaterial : light에 영향을 받지 않는 material
  const material = new THREE.MeshStandardMaterial({ color: 'dodgerblue' });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.lookAt(cube.position); // 카메라가 큐브만을 바라보도록 조정

  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 5); // 오브제의 한쪽 방향에서 비추는 빛
  directionalLight.position.set(1, 2, 3);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 오브제의 전 방향에서 비추는 빛(은은한 조명)
  // ambientLight.position.set(3, 2, 1); // 실질적으로 포지션 설정에 큰 의미가 없음
  scene.add(ambientLight);

  renderer.render(scene, camera);
}

window.addEventListener('load', () => {
  init();
});
