import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './styles/index.css'

class BasicWorldDemo {
  constructor() {
    this._Initialize()
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    })
    this._threejs.shadowMap.enabled = true
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap
    this._threejs.setPixelRatio(window.devicePixelRatio)
    this._threejs.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this._threejs.domElement)
    this._refreshButton = document.createElement('button')
    this._refreshButton.innerText = 'Move Another Place'
    this._refreshButton.className = 'refreshButton'
    document.body.appendChild(this._refreshButton)
    this._refreshButton.onclick = () => this._changeBG()

    window.addEventListener(
      'resize',
      () => {
        this._OnWindowResize()
      },
      false
    )

    const fov = 65
    const aspect = window.innerWidth / window.innerHeight
    const near = 1.0
    const far = 1000.0
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this._camera.position.set(75, 20, 0)

    this._scene = new THREE.Scene()

    this._changeBG()
    let light = new THREE.DirectionalLight(0xffffff, 1.0)
    light.position.set(20, 100, 10)
    light.target.position.set(0, 0, 0)
    light.castShadow = true
    light.shadow.bias = -0.001
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    light.shadow.camera.near = 0.1
    light.shadow.camera.far = 500.0
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500.0
    light.shadow.camera.left = 100
    light.shadow.camera.right = -100
    light.shadow.camera.top = 100
    light.shadow.camera.bottom = -100
    this._scene.add(light)

    light = new THREE.AmbientLight(0x101010)
    this._scene.add(light)

    const controls = new OrbitControls(this._camera, this._threejs.domElement)
    controls.target.set(0, 20, 0)
    controls.update()

    // const plane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(100, 100, 10, 10),
    //   new THREE.MeshStandardMaterial({
    //     color: 0xffffff,
    //   })
    // )
    // plane.castShadow = false
    // plane.receiveShadow = true
    // plane.rotation.x = -Math.PI / 2
    // this._scene.add(plane)

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(3, 1700, 10),
      new THREE.MeshStandardMaterial({
        color: 0x777777,
      })
    )
    box.position.set(0, -800, 0)
    box.castShadow = true
    box.receiveShadow = true
    this._scene.add(box)

    // for (let x = -8; x < 8; x++) {
    //   for (let y = -8; y < 8; y++) {
    //     const box = new THREE.Mesh(
    //       new THREE.BoxGeometry(2, 2, 2),
    //       new THREE.MeshStandardMaterial({
    //         color: `hsl(${Math.random() * 360}, 50%, 50%)`,
    //       })
    //     )
    //     box.position.set(
    //       Math.random() + x * 5,
    //       Math.random() * 4.0 + 2.0,
    //       Math.random() + y * 5
    //     )
    //     box.castShadow = true
    //     box.receiveShadow = true
    //     this._scene.add(box)
    //   }
    // }

    // const box = new THREE.Mesh(
    //   new THREE.SphereGeometry(2, 32, 32),
    //   new THREE.MeshStandardMaterial({
    //       color: 0xFFFFFF,
    //       wireframe: true,
    //       wireframeLinewidth: 4,
    //   }));
    // box.position.set(0, 0, 0);
    // box.castShadow = true;
    // box.receiveShadow = true;
    // this._scene.add(box);

    this._RAF()
  }

  _changeBG() {
    const getRandomNumber = () => {
      return parseInt(Math.random() * 45 + 1).toString()
    }
    const importImage = () => {
      const randomNumber = getRandomNumber()
      return [
        require(`./images/penguins_${randomNumber}/ft.jpg`),
        require(`./images/penguins_${randomNumber}/bk.jpg`),
        require(`./images/penguins_${randomNumber}/up.jpg`),
        require(`./images/penguins_${randomNumber}/dn.jpg`),
        require(`./images/penguins_${randomNumber}/rt.jpg`),
        require(`./images/penguins_${randomNumber}/lf.jpg`),
      ]
    }

    const loader = new THREE.CubeTextureLoader()
    const texture = loader.load([...importImage()])
    this._scene.background = texture
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this._threejs.setSize(window.innerWidth, window.innerHeight)
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera)
      this._RAF()
    })
  }
}

let _APP = null

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo()
})
