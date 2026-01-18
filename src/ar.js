import * as THREE from 'three'
import { ARButton } from 'three/addons/webxr/ARButton.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

export function launchAR(modelName) {
  if (!navigator.xr) {
    alert('AR non supportée sur cet appareil')
    return
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera()

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.xr.enabled = true
  document.body.appendChild(renderer.domElement)

  document.body.appendChild(
    ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
  )

  const draco = new DRACOLoader()
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

  const loader = new GLTFLoader()
  loader.setDRACOLoader(draco)

  loader.load(`/models/${modelName}`, gltf => {
    gltf.scene.scale.set(1, 1, 1)
    scene.add(gltf.scene)
  })

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
  })
}
