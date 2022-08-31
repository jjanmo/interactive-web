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

    data.scene.add(this.mesh)
  }
}
