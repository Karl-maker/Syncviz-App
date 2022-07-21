import Camera from "../camera";
import * as BABYLON from "@babylonjs/core";

export default class Scene {
  constructor(props) {
    const { scene } = props;

    this._scene = scene;
    this._canvas = null;
    this._camera = new Camera({ scene: this._scene }).initialize("camera1", {
      x: 0,
      y: 5,
      z: -10,
    });
  }

  get scene() {
    return this._scene;
  }

  set scene(scene) {
    this._scene = scene;
  }

  get canvas() {
    this._canvas = this._scene.getEngine().getRenderingCanvas();
    return this._canvas;
  }

  set canvas(canvas) {
    this._canvas = canvas;
  }

  get camera() {
    return this._camera;
  }

  set camera(camera) {
    this._camera = camera;
  }

  async loadScene(url) {
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    BABYLON.SceneLoader.ImportMeshAsync(
      "semi_house",
      "https://assets.babylonjs.com/meshes/",
      "both_houses_scene.babylon"
    );
  }
}
