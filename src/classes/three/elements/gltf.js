import Element from ".";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class GLTFScene extends Element {
  constructor({ url, blob, scene, name, description, texture }) {
    super({ name, description, scene, url, blob, texture });
    this._gltf = null;
    this._map = null;
  }

  get gltf() {
    return this._gltf;
  }

  set gltf(gltf) {
    this._gltf = gltf;
  }

  applyTexture() {
    if (this._texture) {
      let textureLoader = new THREE.TextureLoader();
      this._map = textureLoader.load(this._texture);
    }
  }

  render() {
    // Instantiate a loader
    const scene = this._scene;
    const loader = new GLTFLoader();
    const map = this._map;
    // Load a glTF resource
    // return loader.load(
    //   this._blob,
    //   function (gltf) {
    //     let mesh = null;

    //     if (map) {
    //       mesh = gltf.scene.children[0];
    //       mesh.material = new THREE.MeshPhongMaterial({
    //         map: map,
    //         color: 0xff00ff,
    //       });
    //     } else {
    //       mesh = gltf.scene;
    //     }

    //     return scene.add(mesh);
    //   },
    //   // called while loading is progressing
    //   function (xhr) {},
    //   // called when loading has errors
    //   function (error) {
    //     console.log(error);
    //   }
    // );

    const object = loader.parse(this._blob);
    this.scene.add(object);
  }
}

export default GLTFScene;
