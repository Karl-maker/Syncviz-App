import { io } from "socket.io-client";
import ChatRoom from "./chat-room";
import User from "./user";
import config from "../config";

const BACKEND = config.API.LIVE_SERVER;

class VirtualSpace {
  constructor(id, { attendee, name, description, url }) {
    this._id = id || null;
    this._description = description || "";
    this._attendee = attendee || { username: "Guest" };
    this._socket = null;
    this._init = false;
    this._manage = false;
    this._chat_room = null;
    this._time_limit = 0;
    this._host = new User("", "");
    this._url = url;
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

  get url() {
    return this._url;
  }

  set url(url) {
    this._url = url;
  }

  get host() {
    return this._host;
  }

  set host({ username, theme }) {
    this._host = new User(username, theme);
  }

  get attendee() {
    return this._attendee;
  }

  set attendee(attenddee) {
    this._attendee = attenddee;
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
          Authorization: `{ "username": "${this._attendee.username}", "theme": "${this._attendee.theme}" }`,
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

  updateUser() {
    this._socket.emit("update-user", {
      username: this._attendee.username,
      theme: this._attendee.theme,
    });
  }

  updateAttributes({ description }) {
    this._socket.emit("attributes", { description });
  }
}

export default VirtualSpace;
