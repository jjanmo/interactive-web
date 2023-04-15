export class House {
  constructor(info) {
    this.x = info.x
    this.z = info.z
    this.height = info.height || 2

    info.loader.load(info.src, (glb) => {
      this.mesh = glb.scene.children[0]
      this.mesh.castShadow = true
      this.mesh.position.set(this.x, this.height / 2, this.z)
      this.mesh.scale.set(info.scale, info.scale, info.scale)
      this.mesh.rotation.z = info.rotationZ

      info.scene.add(this.mesh)
    })
  }
}
