import Camera from "../camera";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";

export default class Scene {
  constructor(props) {
    const { scene } = props;

    this._scene = scene;
    this._canvas = null;
    this._mobile = false;
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

  initializeCamera({ x, y, z, mobile }) {
    x = x || 0;
    y = y || 5;
    z = z || -10;

    this._mobile = mobile;

    if (!mobile) {
      this._camera = new Camera({ scene: this._scene }).initialize("camera1", {
        x,
        y,
        z,
      });
    } else {
      this._camera = new BABYLON.FreeCamera(
        "camera1",
        new BABYLON.Vector3(x, y, z),
        this._scene
      );

      // This targets the camera to scene origin
      this._camera.setTarget(BABYLON.Vector3.Zero());
    }
  }

  async loadScene(url) {
    var light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this._scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    return BABYLON.SceneLoader.AppendAsync("", url)
      .then((result) => {
        // if (result.cameras[0]) {
        //   // assuming only one camera was exported. otherwise select using name/id
        //   this._scene.activeCamera = result.cameras[0];
        // }

        return 1;
      })
      .catch((error) => {});
  }

  async loadLocalScene(name) {
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    BABYLON.SceneLoader.ImportMeshAsync("", "../../../examples/", name).then(
      function (scene) {
        // do something with the scene
      }
    );
  }
}
