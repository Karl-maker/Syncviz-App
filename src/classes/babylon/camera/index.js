import { FreeCamera, Vector3 } from "@babylonjs/core";

export default class Camera {
  constructor(props) {
    const { scene } = props;

    this._scene = scene;
    this._instance = null;
  }

  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  initialize(name, position) {
    this._instance = new FreeCamera(
      name || "camera1",
      new Vector3(position.x, position.y, position.z),
      this._scene
    );

    // This targets the camera to scene origin
    this._instance.setTarget(Vector3.Zero());
  }
}
