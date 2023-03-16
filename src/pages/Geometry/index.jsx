import { useRef, useEffect } from "react"
import {
  Scene, BoxGeometry, MeshBasicMaterial, WebGLRenderer,
  PerspectiveCamera, Mesh, SpotLight, AxesHelper, MeshLambertMaterial,
  AmbientLight, Vector2, TorusGeometry,
  CylinderGeometry, BufferGeometry,
  BufferAttribute, LineSegments, DoubleSide
} from "three"
import Stats from "stats.js"
import dat from 'dat.gui';

const ctrl = new dat.GUI()

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
    initData()
    initCtrl()
  }, [])




  const initData = () => {
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
    const cubegeometry = new BoxGeometry(8, 8, 8)
    const cubematerial = new MeshLambertMaterial({ color: 0x00ff00 })
    const cube = new Mesh(cubegeometry, cubematerial)
    cube.castShadow = true
    cube.position.x = 4
    cube.position.y = 10
    cube.position.z = 20
    scene.add(cube)

    // 圆环
    const torusgeo = new TorusGeometry(10, 2, 10, 10)
    const torusmaterial = new MeshLambertMaterial({ color: 0xff2288 })
    const torus = new Mesh(torusgeo, torusmaterial)
    torus.castShadow = true
    torus.position.x = 0
    torus.position.y = 10
    torus.position.z = -10
    scene.add(torus)

    // 圆柱
    const cylindergeo = new CylinderGeometry(5, 5, 20, 10)
    const cylindermaterial = new MeshLambertMaterial({ color: 0x2288ff })
    const cylinder = new Mesh(cylindergeo, cylindermaterial)
    cylinder.castShadow = true
    cylinder.position.x = -20
    cylinder.position.y = 10
    cylinder.position.z = -10
    scene.add(cylinder)

    // 自定义几何体
    const geometry = new BufferGeometry()
    const vertices = new Float32Array([
      // 第一个面
      0, 0, 0, 0, 10, 0, 10, 10, 0,
      0, 0, 0, 10, 10, 0, 10, 0, 0,
      // 第二个面
      0, 0, 10, 0, 10, 10, 10, 10, 10,
      0, 0, 10, 10, 10, 10, 10, 0, 10,
      // 第三个面
      0, 0, 0, 0, 10, 0, 0, 10, 10,
      0, 0, 0, 0, 10, 10, 0, 0, 10,
      // 第四个面
      10, 0, 0, 10, 10, 0, 10, 10, 10,
      10, 0, 0, 10, 10, 10, 10, 0, 10,
      // 第五个面
      0, 0, 0, 0, 0, 10, 10, 0, 10,
      0, 0, 0, 10, 0, 10, 10, 0, 0,
    ])
    const attributes = new BufferAttribute(vertices, 3)
    geometry.attributes.position = attributes
    const material = new MeshBasicMaterial({
      color: 0x00ff00,
      side: DoubleSide
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    // 线条
    const wireFrame = new WireframeGeometry(geometry)
    const line = new LineSegments(wireFrame)
    line.material.depthTest = false
    line.material.transparent = false
    line.material.opacity = 0.25

    // 地板
    const planeGeometry = new BoxGeometry(100, 100)
    const planeMaterial = new MeshLambertMaterial({ color: 0xcccccc })
    const plane = new Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(0, -1, 0)
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



    // let gap = 0
    renderer.render(scene, camera)

    // renderScene()


    // function renderScene() {
    //   cube.rotation.x += 0.01
    //   cube.rotation.y += 0.01
    //   cube.rotation.z += 0.01

    //   gap += 0.01
    //   cube.position.x = 25 + (20 * Math.sin(gap))
    //   cube.position.y = 6 + (20 * Math.abs(Math.cos(gap)))

    //   requestAnimationFrame(renderScene)

    // }
  }

  const initCtrl = () => {
    const ctrlObj = {
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
    }
    ctrl.add(ctrlObj, "scaleX", 0.5)
    ctrl.add(ctrlObj, "scaleY", 0.5)
    ctrl.add(ctrlObj, "scaleZ", 0.5)
    ctrl.add(ctrlObj, "positionX", -30, 30)
    ctrl.add(ctrlObj, "positionY", -30, 30)
    ctrl.add(ctrlObj, "positionZ", -30, 30)

  }


  return <div>
    <div ref={webglRef}></div>
  </div>
}



export default Animation
