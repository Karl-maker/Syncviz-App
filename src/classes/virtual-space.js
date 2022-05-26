import { io } from "socket.io-client";

const BACKEND = "localhost:5000";

class VirtualSpace {
  constructor(id, { attendee, name, description }) {
    this._id = id || null;
    this._attendee = attendee || { username: "" };
    this._name = name || "";
    this._description = description || "";
    this._socket = null;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get socket() {
    return this._socket;
  }

  set socket(socket) {
    this._socket = socket;
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

  // Methods

  connect() {
    try {
      this._socket = io(`ws://${BACKEND}/virtual-space`, {
        reconnectionDelayMax: 10000,
        extraHeaders: {
          Authorization: `{ "username": "${this._attendee.username}" }`,
        },
        query: { virtual_space_id: this._id || null },
      });

      return this._socket;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  join() {
    this._socket.emit("join", { place_holder: "joining..." });
  }

  create() {
    this._socket.emit("create", {
      name: this._name,
      description: this._description,
    });
  }
}

export default VirtualSpace;
