import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

let renderer, scene, camera

export function initViewer(item, onLoaded) {

  if (scene) scene.clear()



  // Clean ancien renderer
  if (renderer) {
    renderer.dispose()
    renderer = null
  }

  const canvas = document.getElementById('canvas')

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  )
  camera.position.set(0, 1.1, 3)

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  })

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

  scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 3))

  // Draco
  const draco = new DRACOLoader()
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  draco.setDecoderConfig({ type: 'wasm' })

  const loader = new GLTFLoader()
  loader.setDRACOLoader(draco)

  loader.load(
    `/models/${item.model}`,
    (gltf) => {
      const model = gltf.scene
  
      const scale = item.scale ?? 10
      model.scale.set(scale, scale, scale)
  
      scene.add(model)
  
      if (onLoaded) onLoaded()
    }
  )
  
  
  

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false

  controls.autoRotate = true
controls.autoRotateSpeed = 0.4 

  renderer.setAnimationLoop(() => {
    controls.update() 
    renderer.render(scene, camera)
  })
}
