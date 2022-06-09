import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeScene {
  constructor({ dimensions }) {
    // Create Scene
    this._scene = new THREE.Scene();
    // Get Dimentions
    this._dimensions = dimensions || {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    // Create Renderer
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    // Create Camera
    this._camera = new THREE.PerspectiveCamera(
      45,
      this._dimensions.width / this._dimensions.height,
      0.1,
      1000
    );
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);

    // setup
    this._renderer.setClearColor(0xecf0f1, 0);
    this._renderer.outputEncoding = THREE.sRGBEncoding;
  }

  get scene() {
    return this._scene;
  }

  set scene(scene) {
    this._scene = scene;
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(renderer) {
    this._renderer = renderer;
  }

  get camera() {
    return this._camera;
  }

  set camera(camera) {
    this._camera = camera;
  }

  get controls() {
    return this._controls;
  }

  set controls(controls) {
    this._controls = controls;
  }

  handleWindowResize({ width, height }) {
    this._camera.aspect = width / height;
    this._camera.updateProjectMatrix();

    this._renderer.setSize(width, height);
  }

  positionCamera(position) {
    const { x, y, z } = position;
    this._camera.position.x = x || this._camera.position.x;
    this._camera.position.y = y || this._camera.position.y;
    this._camera.position.z = z || this._camera.position.z;
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }

  addBox({ dimensions, color }) {
    let geometry = new THREE.BoxGeometry(
      dimensions ? dimensions.width : 5,
      dimensions ? dimensions.height : 5,
      dimensions ? dimensions.depth : 5
    );

    let material = new THREE.MeshBasicMaterial({
      color: color || 0x00ff00,
    });

    let cube = new THREE.Mesh(geometry, material);
    this._scene.add(cube);
  }
}

export default ThreeScene;
