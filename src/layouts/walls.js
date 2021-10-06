import * as BABYLON from 'babylonjs'

const AREA_WIDTH = 80
const AREA_DEPTH = 40
const WALL_HEIGHT = 20

export const createEntranceWall = scene => {
  const bluePaintMat = new BABYLON.StandardMaterial('bluePaintMat')
  bluePaintMat.diffuseColor = new BABYLON.Color3(0, 94 / 256, 157 / 256)
  const southWall = BABYLON.MeshBuilder.CreateBox('southWall', { width: AREA_WIDTH, height: WALL_HEIGHT, depth: 1 })
  southWall.position.set(0, WALL_HEIGHT / 2, -AREA_DEPTH / 2)
  const door = BABYLON.MeshBuilder.CreateBox('door', { width: 5, height: 10, depth: 5 })
  door.position.set(-10, 5, -AREA_DEPTH / 2)

  const logo = BABYLON.MeshBuilder.CreateBox('logo', { width: 5, height: 5 })
  logo.position.set(-10, 15, -AREA_DEPTH / 2 - 0.1)
  // logo.position.set(-AREA_WIDTH / 2 + 2, WALL_HEIGHT / 2, -AREA_DEPTH / 2 - 0.1)
  const logoMat = new BABYLON.StandardMaterial('logoMat')
  logoMat.diffuseTexture = new BABYLON.Texture('/smallLogo.png')
  logo.material = logoMat

  // const gate = BABYLON.MeshBuilder.CreateBox('gate', { width: 5, height: 5 })
  // gate.position.set(-10, 15, -AREA_DEPTH / 2 - 0.1)
  // const gateMat = new BABYLON.StandardMaterial('gateMat')
  // gateMat.diffuseTexture = new BABYLON.Texture('/gateText.png')
  // gate.material = gateMat

  const outerCSG = BABYLON.CSG.FromMesh(southWall)
  const innerCSG = BABYLON.CSG.FromMesh(door)
  southWall.dispose()
  door.dispose()
  scene.removeMesh(southWall)
  scene.removeMesh(door)
  const wallCutoutCSG = outerCSG.subtract(innerCSG)
  const wallWithDoor = wallCutoutCSG.toMesh('mPipe', null, scene)
  wallWithDoor.position.set(0, WALL_HEIGHT / 2, -AREA_DEPTH / 2)
  wallWithDoor.material = bluePaintMat
}

export const createSurroundingWalls = () => {
  const bluePaintMat = new BABYLON.StandardMaterial('bluePaintMat')
  bluePaintMat.diffuseColor = new BABYLON.Color3(0, 94 / 256, 157 / 256)
  const westWall = BABYLON.MeshBuilder.CreateBox('westWall', { width: 1, height: WALL_HEIGHT, depth: AREA_DEPTH })
  westWall.position.set(-AREA_WIDTH / 2, WALL_HEIGHT / 2, 0)
  westWall.material = bluePaintMat

  const eastWall = BABYLON.MeshBuilder.CreateBox('eastWall', { width: 1, height: WALL_HEIGHT, depth: AREA_DEPTH })
  eastWall.position.set(AREA_WIDTH / 2, WALL_HEIGHT / 2, 0)
  eastWall.material = bluePaintMat

  const northWall = BABYLON.MeshBuilder.CreateBox('northWall', { width: AREA_WIDTH, height: WALL_HEIGHT, depth: 1 })
  northWall.position.set(0, WALL_HEIGHT / 2, AREA_DEPTH / 2)
  northWall.material = bluePaintMat
}

export const createCenterWall = scene => {
  const bluePaintMat = new BABYLON.StandardMaterial('bluePaintMat')
  bluePaintMat.diffuseColor = new BABYLON.Color3(0, 94 / 256, 157 / 256)
  const centerWall = BABYLON.MeshBuilder.CreateBox('centerWall', {
    width: 1,
    height: WALL_HEIGHT,
    depth: AREA_WIDTH / 2
  })
  centerWall.position.set(0, WALL_HEIGHT / 2, 0)

  const centerDoor = BABYLON.MeshBuilder.CreateBox('centerDoor', { width: 5, height: 10, depth: 5 })
  centerDoor.position.set(0, 5, -10)
  const outerCSG = BABYLON.CSG.FromMesh(centerWall)
  const innerCSG = BABYLON.CSG.FromMesh(centerDoor)
  centerWall.dispose()
  centerDoor.dispose()
  scene.removeMesh(centerWall)
  scene.removeMesh(centerDoor)
  const wallCutoutCSG = outerCSG.subtract(innerCSG)
  const wallWithDoor = wallCutoutCSG.toMesh('centreWallwDoor', null, scene)
  wallWithDoor.position.set(0, WALL_HEIGHT / 2, 0)
  wallWithDoor.material = bluePaintMat
}
