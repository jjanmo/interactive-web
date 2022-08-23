import { Body, Box, Vec3 } from 'cannon-es'
import glb from '../models/domino.glb'

export default class Domino {
  constructor(data) {
    this.scene = data.scene
    this.cannonWorld = data.cannonWorld
    this.width = data.width || 0.6
    this.height = data.height || 1
    this.depth = data.depth || 0.2
    this.x = data.x || 0
    this.y = data.y || 0.5
    this.z = data.z || 1
    this.rotationY = data.rotationY || 0

    this.#loadModel(data.gltfLoader)
    this.#setCannonBody()
  }

  #loadModel(loader) {
    loader.load(glb, (glb) => {
      this.modelMesh = glb.scene.children[0]
      this.modelMesh.castShadow = true
      this.modelMesh.position.set(this.x, this.y, this.z)
      this.scene.add(this.modelMesh)
    })
  }

  #setCannonBody() {
    const shape = new Box(new Vec3(this.width / 2, this.height / 2, this.depth / 2))
    this.body = new Body({
      mass: 1,
      position: new Vec3(this.x, this.y, this.z),
      shape,
    })
    this.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), this.rotationY)
    this.cannonWorld.addBody(this.body)
  }
}
