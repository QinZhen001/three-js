import { useRef, useEffect } from "react"
import {
  Scene, BoxGeometry, MeshBasicMaterial, WebGLRenderer,
  PerspectiveCamera, Mesh, SpotLight, AxesHelper, MeshLambertMaterial,
  AmbientLight, Vector2, Fog, FogExp2
} from "three"
import Stats from "stats.js"
import dat from 'dat.gui';


console.log("dat", dat)


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
    // 烟化效果
    // scene.fog = new Fog(0xffffff, 0.01, 100)
    scene.fog = new FogExp2(0x0000ff, 0.01)

    // 场景内所有物体采用同一材质
    scene.overrideMaterial = new MeshBasicMaterial({ color: 0x00ff00 })
    // scene.overrideMaterial = new MeshLambertMaterial({ color: 0x00ff00 })

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


    const geometry2 = new BoxGeometry(8, 8, 8)
    const material2 = new MeshLambertMaterial({ color: 0x00ff00 })
    const cube2 = new Mesh(geometry2, material2)
    cube2.castShadow = true
    cube2.position.x = -10
    cube2.position.y = 10
    cube2.position.z = 0
    cube2.name = 'cube2'
    scene.add(cube2)


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

    console.log("scene.children", scene.children)
    //  find
    const target = scene.getObjectByName('cube2', false)
    console.log("target", target)


    const ctrlObj = new function () {
      this.removeChild = () => {
        scene.remove(target)
      },
        this.addNewCube = () => {
          const geometryTemp = new BoxGeometry(8, 8, 8)
          const materialTemp = new MeshLambertMaterial({ color: 0x0000ff })
          const cubeTemp = new Mesh(geometryTemp, materialTemp)
          cubeTemp.castShadow = true
          cubeTemp.position.x = -Math.random() * 10
          cubeTemp.position.y = Math.random() * 10
          cubeTemp.position.z = Math.random() * 10
          scene.add(cubeTemp)
        }
    }

    const ctrl = new dat.GUI()
    ctrl.add(ctrlObj, "removeChild")
    ctrl.add(ctrlObj, "addNewCube")


    renderScene()

    function renderScene() {
      scene.traverse((obj) => {
        if (obj instanceof Mesh && obj != plane) {
          // 所有立方体都可以旋转
          obj.rotation.x += 0.01
          obj.rotation.y += 0.01
          obj.rotation.z += 0.01
        }
      })

      requestAnimationFrame(renderScene)
      renderer.render(scene, camera)
    }
  }


  return <div>
    <div ref={webglRef}></div>
  </div>
}



export default Animation
