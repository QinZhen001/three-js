import { useRef, useEffect } from "react"
import {
  Scene, BoxGeometry, MeshBasicMaterial, WebGLRenderer,
  PerspectiveCamera, Mesh, SpotLight, AxesHelper, MeshLambertMaterial,
  AmbientLight, Vector2
} from "three"
import Stats from "stats.js"



const Animation = () => {

  const webglRef = useRef(null)


  useEffect(() => {
    let showed = true
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    stats.begin();

    const animateStats = () => {
      if (showed) {
        stats.update();
        requestAnimationFrame(animateStats);
      }
    }

    requestAnimationFrame(animateStats);

    return () => {
      showed = false
      stats.end();
      document.body.removeChild(stats.dom);
    }

  }, [])

  useEffect(() => {
    init()
  }, [])


  const init = () => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    webglRef.current.appendChild(renderer.domElement)

    // 轴
    const axes = new AxesHelper(50)
    scene.add(axes)

    // 立方体
    const geometry = new BoxGeometry(8, 8, 8)
    const material = new MeshLambertMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    scene.add(cube)
    cube.castShadow = true
    cube.position.x = 4
    cube.position.y = 10
    cube.position.z = 20

    // 地板
    const planeGeometry = new BoxGeometry(100, 100)
    const planeMaterial = new MeshLambertMaterial({ color: 0xcccccc })
    const plane = new Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true
    scene.add(plane)


    camera.position.x = -30
    camera.position.y = 45
    camera.position.z = 35
    camera.lookAt(scene.position)

    // 聚光灯
    const spotLight = new SpotLight(0xffffff)
    spotLight.position.set(-60, 40, -65)
    spotLight.castShadow = true
    spotLight.shadow.mapSize = new Vector2(1024, 1024)
    spotLight.shadow.camera.far = 130
    spotLight.shadow.camera.near = 40
    scene.add(spotLight)

    const ambientLight = new AmbientLight(0xAAAAAA)
    scene.add(ambientLight)

    // renderer.render(scene, camera)

    let gap = 0
    renderScene()

    function renderScene() {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      cube.rotation.z += 0.01

      gap += 0.01
      cube.position.x = 25 + (20 * Math.sin(gap))
      cube.position.y = 6 + (20 * Math.abs(Math.cos(gap)))

      requestAnimationFrame(renderScene)
      renderer.render(scene, camera)
    }
  }


  return <div>
    <div ref={webglRef}></div>
  </div>
}



export default Animation
