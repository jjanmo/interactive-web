import { DoubleSide, MeshBasicMaterial, Mesh } from 'three'

export default class ImagePanel {
  constructor(data) {
    const texture = data.textureLoader.load(data.image)
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    })

    this.mesh = new Mesh(data.geometry, material)
    this.mesh.position.set(data.posX, data.posY, data.posZ)
    this.mesh.lookAt(0, 0, 0)

    // 회전 정보 저장
    this.sphereRotation = [this.mesh.rotation.x, this.mesh.rotation.y, this.mesh.rotation.z]

    data.scene.add(this.mesh)
  }
}
