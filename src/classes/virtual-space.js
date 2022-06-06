import { io } from "socket.io-client";
import ChatRoom from "./chat-room";

const BACKEND = "localhost:5000";

class VirtualSpace {
  constructor(id, { attendee, name, description }) {
    this._id = id || null;
    this._name = name || "";
    this._description = description || "";
    this._attendee = attendee || { username: "" };
    this._socket = null;
    this._init = false;

    this._chat_room = null;
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

  get chat_room() {
    return this._chat_room;
  }

  set chat_room(chat_room) {
    this._chat_room = chat_room;
  }

  // Methods

  connect() {
    try {
      this._socket = io.connect(`ws://${BACKEND}/virtual-space`, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99999,
        extraHeaders: {
          Authorization: `{ "username": "${this._attendee.username}" }`,
        },
        query: { virtual_space_id: this._id || null },
      });
      this._init = true;
      this._chat_room = new ChatRoom({ socket: this._socket });
      return this._socket;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  reconnect() {
    if (this._init) {
      if (!this._socket) {
      } else {
        this._socket.socket.connect();
      }
    } else {
      this._socket.disconnect();
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
