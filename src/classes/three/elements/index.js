class Element {
  constructor({ name, description, url, blob, scene, texture }) {
    this._name = name || "";
    this._description = description || "";
    this._url = url || "";
    this._blob = blob || null;
    this._texture = texture || null;
    this._scene = scene || null;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get url() {
    return this._url;
  }

  set url(url) {
    this._url = url;
  }

  get blob() {
    return this._blob;
  }

  set blob(blob) {
    this._blob = blob;
  }

  get scene() {
    return this._scene;
  }

  set scene(scene) {
    this._scene = scene;
  }

  get texture() {
    return this._texture;
  }

  set texture(texture) {
    this._texture = texture;
  }
}

export default Element;
