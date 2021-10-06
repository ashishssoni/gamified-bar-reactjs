import * as BABYLON from 'babylonjs'
import React from 'react'
import ReactDOM from 'react-dom'
import BottomView from './components/bottomView'
import { createCenterWall, createEntranceWall, createSurroundingWalls } from './layouts/walls'

/* Design constants */
const MOVE_SPEED = 1
const AREA_WIDTH = 80
const AREA_DEPTH = 40

/**
 * Use this to control the game state and to supply that information to the react app.
 * When keys are updated the react app reloads
 *
 * Keep this 1 level deep only
 */
let persistState = {}

const gameState = new Proxy(persistState, {
  get: function (target, key) {
    return target[key]
  },
  set: function (target, key, value) {
    target[key] = value
    ReactDOM.render(
      <BottomView data={target} updateGameState={updateGameState} />,
      document.getElementById('bottom-view')
    )
    return true
  }
})

/**
 * Initial render. Further updates controlled by the proxy
 */
ReactDOM.render(
  <BottomView data={gameState} updateGameState={updateGameState} />,
  document.getElementById('bottom-view')
)

const updateGameState = (key, value) => {
  gameState[key] = value
}

/* Initializing */
const canvas = document.getElementById('render-canvas')
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
const scene = new BABYLON.Scene(engine)
new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 1))
new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(1, 1, 0))
BABYLON.MeshBuilder.CreateGround('ground', { width: AREA_WIDTH * 2, height: AREA_DEPTH * 2 })

// const GLOBAL_GUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

// Reusables
const redPaintMat = new BABYLON.StandardMaterial('redPaintMat')
redPaintMat.diffuseColor = new BABYLON.Color3(213 / 256, 29 / 256, 37 / 256)
// Reusables ends

const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: AREA_WIDTH * 2, height: AREA_DEPTH * 2 })
ground.material = redPaintMat

/* Layout Creation */
const box = BABYLON.MeshBuilder.CreateBox('box', { width: 2, height: 7, depth: 2 })
box.enableEdgesRendering()
box.position.set(-15, 0.5, -30)
box.visibility = 0

BABYLON.SceneLoader.ImportMeshAsync('him', './src/models/', 'Dude.babylon', scene).then(result => {
  let dude = result.meshes[0]
  dude.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05)

  scene.beginAnimation(result.skeletons[0], 0, 27, false, 1.0)
  dude.position.set(-14, 0, -23)

})

BABYLON.SceneLoader.ImportMeshAsync('him', './src/models/', 'Dude.babylon', scene).then(
  result => {
    let dude = result.meshes[0]
    dude.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05)
    scene.beginAnimation(result.skeletons[0], 0, 0, false, 0)
    dude.position.set(-14.8, 0, -30)
    dude.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0)
    dude.setParent(box)
  }
)

// guardBox.enableEdgesRendering()
const guardBox = BABYLON.MeshBuilder.CreateBox('box', { width: 5, height: 20, depth: 7 })
guardBox.visibility = 0
guardBox.position.set(-10, 0, -20)

const barBox = BABYLON.MeshBuilder.CreateBox('box', {
  width: 20,
  height: 3,
  depth: 10
})
barBox.enableEdgesRendering()
barBox.position.set(-30, 1.5, 15)
barBox.visibility = 0.1

const barArea = BABYLON.MeshBuilder.CreateBox('barArea', { width: 10, height: 2 })
barArea.position.set(-30, 2, 13)
const barMat = new BABYLON.StandardMaterial('barMat')
barMat.diffuseTexture = new BABYLON.Texture('./src/models/barArea.svg')
barArea.material = barMat

const smokingBox = BABYLON.MeshBuilder.CreateBox('box1', {
  width: 8,
  height: 8,
  depth: 8
})
smokingBox.position.set(-6, 4, 16)
smokingBox.enableEdgesRendering()
smokingBox.visibility = 0.1

const smoking = BABYLON.MeshBuilder.CreateBox('smoking', { width: 7, height: 2 })
smoking.position.set(-6, 6, 12)
const smokingMat = new BABYLON.StandardMaterial('smokingMat')
smokingMat.diffuseTexture = new BABYLON.Texture('./src/models/smoking.svg')
smoking.material = smokingMat

const capsule = BABYLON.MeshBuilder.CreateCapsule('capsule', {}, scene)
capsule.position.set(-4.8, 1.8, 15.2)
capsule.rotation = new BABYLON.Vector3(1, 1, 1)
capsule.scaling.scaleInPlace(0.4)
BABYLON.SceneLoader.ImportMesh(
  '',
  'https://models.babylonjs.com/',
  'Dude/dude.babylon',
  scene,
  function (newMeshes) {
    const hero = newMeshes[0]
    hero.scaling.scaleInPlace(0.05)
    hero.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(190), 0)
    hero.position.set(-6, 0, 16)
  }
)

const dancePole = BABYLON.MeshBuilder.CreateCylinder('dancePole', { diameter: 2.5, height: 1, tessellation: 3 })
dancePole.scaling.x = 4
dancePole.rotation.z = Math.PI / 2
dancePole.position.set(-34.5, 4, -12.5)

const danceBox = BABYLON.MeshBuilder.CreateBox('box1', {
  width: 11,
  height: 3,
  depth: 15
})
danceBox.position.set(-34.5, 1.5, -12.5)
danceBox.enableEdgesRendering()
danceBox.visibility = 0.1

const poleDanceArea = BABYLON.MeshBuilder.CreateBox('poleDanceArea', { width: 13, height: 2 })
poleDanceArea.position.set(-33, 1.5, -11.5)
poleDanceArea.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0)
const poleDanceMat = new BABYLON.StandardMaterial('poleDanceMat')
poleDanceMat.diffuseTexture = new BABYLON.Texture('./src/models/poleDance.svg')
poleDanceArea.material = poleDanceMat

const doghSphere = BABYLON.MeshBuilder.CreateBox('agentBox', { width: 2, height: 6, depth: 2 })
doghSphere.position.set(-5, 0, 0)
doghSphere.enableEdgesRendering()
doghSphere.visibility = 0

BABYLON.SceneLoader.ImportMesh(
  '',
  'https://models.babylonjs.com/',
  'Dude/dude.babylon',
  scene,
  function (newMeshes) {
    const hero = newMeshes[0]
    hero.scaling.scaleInPlace(0.05)
    hero.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0)
    hero.position.set(-5, 0, 0)
  }
)

const barPeople1 = BABYLON.MeshBuilder.CreateSphere('barPeople1', { segments: 32, diameter: 1.7 })
barPeople1.position.set(-38, 0.7, 9)

const barPeople2 = BABYLON.MeshBuilder.CreateSphere('barPeople2', { segments: 32, diameter: 1.7 })
barPeople2.position.set(-33, 0.7, 9)

const barPeople3 = BABYLON.MeshBuilder.CreateSphere('barPeople3', { segments: 32, diameter: 1.7 })
barPeople3.position.set(-28, 0.7, 9)

const dancePeople1 = BABYLON.MeshBuilder.CreateSphere('dancePeople1', { segments: 32, diameter: 1.7 })
dancePeople1.position.set(-27.5, 0.7, -13)

const dancePeople2 = BABYLON.MeshBuilder.CreateSphere('dancePeople2', { segments: 32, diameter: 1.7 })
dancePeople2.position.set(-27.5, 0.7, -10)

const danceGirl = BABYLON.MeshBuilder.CreateSphere('danceGirl', { segments: 32, diameter: 1.8 })
danceGirl.position.set(-35, 4, -14)

const bartender = BABYLON.MeshBuilder.CreateSphere('bartender', { segments: 32, diameter: 1.7 })
bartender.position.set(-22, 3.5, 13)
bartender.enableEdgesRendering()
bartender.visibility = 0

BABYLON.SceneLoader.ImportMesh(
  '',
  'https://models.babylonjs.com/',
  'Dude/dude.babylon',
  scene,
  function (newMeshes) {
    const hero = newMeshes[0]
    hero.scaling.scaleInPlace(0.05)
    hero.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0)
    hero.position.set(-22, 1, 13)
  }
)

// Layout 2

const agentSphere = BABYLON.MeshBuilder.CreateBox('agentBox', { width: 2, height: 6, depth: 3 })
agentSphere.position.set(4, 0, -8)
agentSphere.enableEdgesRendering()
agentSphere.visibility = 0
BABYLON.SceneLoader.ImportMesh(
  '',
  'https://models.babylonjs.com/',
  'Dude/dude.babylon',
  scene,
  function (newMeshes) {
    const hero = newMeshes[0]
    hero.scaling.scaleInPlace(0.05)
    hero.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0)
    hero.position.set(4, 0, -8)
  }
)

BABYLON.SceneLoader.ImportMesh(
  '',
  'https://models.babylonjs.com/',
  'Dude/dude.babylon',
  scene,
  function (newMeshes) {
    const hero = newMeshes[0]
    hero.scaling.scaleInPlace(0.05)
    hero.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0)
    hero.position.set(35, 0, -7)
  }
)
const agentBox = BABYLON.MeshBuilder.CreateBox('agentBox', { width: 2, height: 6, depth: 2 })
agentBox.position.set(35, 3, -7)
agentBox.visibility = 0

createSurroundingWalls()
createEntranceWall(scene)
createCenterWall(scene)

const soupBox = BABYLON.MeshBuilder.CreateBox('soupBox', { width: 6, height: 6, depth: 6 })
soupBox.position.set(AREA_WIDTH / 8, 0, AREA_DEPTH / 3)
soupBox.enableEdgesRendering()
soupBox.visibility = 0.1

const soupArea = BABYLON.MeshBuilder.CreateBox('soupArea', { width: 5, height: 1.5 })
soupArea.position.set(10, 2, 10)
const soupAreaMat = new BABYLON.StandardMaterial('soupAreaMat')
soupAreaMat.diffuseTexture = new BABYLON.Texture('./src/models/soupArea.svg')
soupArea.material = soupAreaMat

const starterBox = BABYLON.MeshBuilder.CreateBox('starterBox', { width: 6, height: 6, depth: 6 })
starterBox.position.set(AREA_WIDTH / 4, 0, AREA_DEPTH / 3)
starterBox.enableEdgesRendering()
starterBox.visibility = 0.1

const starterArea = BABYLON.MeshBuilder.CreateBox('starterArea', { width: 5, height: 1.5 })
starterArea.position.set(20, 2, 10)
const starterMat = new BABYLON.StandardMaterial('starterMat')
starterMat.diffuseTexture = new BABYLON.Texture('./src/models/starterArea.svg')
starterArea.material = starterMat

const mainCourseBox = BABYLON.MeshBuilder.CreateBox('mainCourseBox', { width: 6, height: 6, depth: 6 })
mainCourseBox.position.set((3 * AREA_WIDTH) / 8, 0, AREA_DEPTH / 3)
mainCourseBox.enableEdgesRendering()
mainCourseBox.visibility = 0.1

const mainCourseArea = BABYLON.MeshBuilder.CreateBox('mainCourseArea', { width: 5, height: 1.5 })
mainCourseArea.position.set(30, 2, 10)
const mainCourseMat = new BABYLON.StandardMaterial('mainCourseMat')
mainCourseMat.diffuseTexture = new BABYLON.Texture('./src/models/mainCourse.svg')
mainCourseArea.material = mainCourseMat

const dessertBox = BABYLON.MeshBuilder.CreateBox('dessertBox', { width: 6, height: 6, depth: 6 })
dessertBox.position.set((3.5 * AREA_WIDTH) / 8, 0, AREA_DEPTH / 3 - AREA_WIDTH / 8)
dessertBox.enableEdgesRendering()
dessertBox.visibility = 0.1

const dessertArea = BABYLON.MeshBuilder.CreateBox('dessertArea', { width: 5, height: 1.5 })
dessertArea.position.set(33, 2, 3)
dessertArea.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0)
const dessertMat = new BABYLON.StandardMaterial('dessertMat')
dessertMat.diffuseTexture = new BABYLON.Texture('./src/models/desserts.svg')
dessertArea.material = dessertMat

// ceiling. Removed for now.
// const ceil = BABYLON.MeshBuilder.CreateBox('centerWall', { width: AREA_WIDTH, height: 1, depth: AREA_DEPTH })
// ceil.position.set(0, WALL_HEIGHT, 0)

/* Initializing the camera */
const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0))
camera.attachControl(canvas, true)
camera.parent = box

engine.runRenderLoop(function () {
  scene.render()
  gameState.isOnGuardPost = guardBox.intersectsMesh(box)
  gameState.isInBarArea = barBox.intersectsMesh(box)
  gameState.isInSmokingArea = smokingBox.intersectsMesh(box)
  gameState.isWithAgent = agentSphere.intersectsMesh(box)
  gameState.isDoghConvo = doghSphere.intersectsMesh(box)

  gameState.isOnSoupArea = soupBox.intersectsMesh(box)
  gameState.isOnStarterArea = starterBox.intersectsMesh(box)
  gameState.isOnMainCourseArea = mainCourseBox.intersectsMesh(box)
  gameState.isOnDessertArea = dessertBox.intersectsMesh(box)

  gameState.isNearAgent = agentBox.intersectsMesh(box)
})

window.addEventListener('resize', engine.resize)

window.addEventListener('keypress', event => {
  if (!gameState.isFixed) {
    switch (event.key.toLowerCase()) {
      case 'w':
        box.position.z += MOVE_SPEED
        break
      case 's':
        box.position.z -= MOVE_SPEED
        break
      case 'a':
        box.position.x -= MOVE_SPEED
        break
      case 'd':
        box.position.x += MOVE_SPEED
        break
    }
  }
})
