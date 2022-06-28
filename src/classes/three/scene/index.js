import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GLTFScene from "../elements/gltf";

class ThreeScene {
  constructor({ dimensions }) {
    // Create Scene
    this._scene = new THREE.Scene();
    this._view = [];
    this._dimensions = dimensions || {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
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

  get view() {
    return this._view;
  }

  set view(view) {
    this._view = view;
  }

  setupDefaultLighting() {
    let light = new THREE.DirectionalLight("#ffffff", 0.2);
    let pointLight = new THREE.PointLight("#ffffff", 0.2);
    let pointLightBack = new THREE.PointLight("#ffffff", 0.2);
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    light.position.set(0, -70, 100).normalize();
    pointLight.position.set(0, -40, 300);
    pointLightBack.position.set(0, -40, -100);

    this._scene.add(light);
    this._scene.add(pointLight);
    this._scene.add(pointLightBack);
    this._scene.add(ambientLight);
  }

  add({ blob }) {
    this._view = new GLTFScene({ blob, scene: this._scene });
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

  addMesh(mesh) {
    this._scene.add(mesh); // THREE.Mesh
  }
}

export default ThreeScene;
