import { io } from "socket.io-client";
import ChatRoom from "./chat-room";
import User from "./user";
import config from "../config";

const BACKEND = config.API.LIVE_SERVER;

class VirtualSpace {
  constructor(id, { attendee, name, description }) {
    this._id = id || null;
    this._description = description || "";
    this._attendee = attendee || { username: "Karl-Johan" };
    this._socket = null;
    this._init = false;
    this._manage = false;
    this._chat_room = null;
    this._time_limit = 0;
    this._host = new User("", "");
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

  get host() {
    return this._host;
  }

  set host({ username, theme }) {
    this._host = new User(username, theme);
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get manage() {
    return this._manage;
  }

  set manage(manage) {
    this._manage = manage;
  }

  get time_limit() {
    return this._time_limit;
  }

  set time_limit(time_limit) {
    this._time_limit = time_limit;
  }

  get chat_room() {
    return this._chat_room;
  }

  set chat_room(chat_room) {
    this._chat_room = chat_room;
  }

  // Methods

  connect({ id }) {
    try {
      this._socket = io.connect(`ws://${BACKEND}/virtual-space`, {
        // reconnection: true,
        // reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        // reconnectionAttempts: 99999,
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

  end() {
    this._socket.emit("delete", { placeholder: "ending" });
  }

  create() {
    this._socket.emit("create", {
      description: this._description,
    });

    this._manage = true;
  }

  sendBlob(data) {
    this._socket.emit("send-blob", data);
  }

  sendDirectBlob(user_id) {
    this._socket.emit("send-direct-blob", { user_id });
  }
}

export default VirtualSpace;
