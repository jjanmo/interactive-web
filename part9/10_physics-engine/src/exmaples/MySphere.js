import { Mesh } from 'three'
import { Body, Sphere, Vec3 } from 'cannon-es'

export default class MySphere {
  constructor(data) {
    this.scene = data.scene
    this.cannonWorld = data.cannonWorld
    this.geometry = data.geometry
    this.material = data.material
    this.posX = data.posX
    this.posY = data.posY
    this.posZ = data.posZ
    this.scale = data.scale

    this.mesh = this.#setMesh()
    this.body = this.#setCannonBody()
  }

  #setMesh() {
    const mesh = new Mesh(this.geometry, this.material)
    mesh.scale.set(this.scale, this.scale, this.scale)
    mesh.castShadow = true
    this.scene.add(mesh)

    return mesh
  }

  #setCannonBody() {
    const shape = new Sphere(1 * this.scale)
    const body = new Body({
      mass: 1,
      position: new Vec3(this.posX, this.posY, this.posZ),
      shape,
    })
    this.cannonWorld.addBody(body)

    return body
  }
}
