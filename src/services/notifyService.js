import { io } from "socket.io-client";

export default class SocketService {
  constructor() {
    this.socket = null;
  }

  connect = async (url, options = {}) => {
    return new Promise((resolve, reject) => {
      this.socket = io(url, options);
      this.socket.once("connect", resolve);
      this.socket.once("connect_error", () => {
        reject(new Error("connect_error"));
      });
      this.socket.once("connect_timeout", () => {
        reject(new Error("connect_timeout"));
      });
    });
  };

  join = async () => {
    return new Promise((resolve) => {
      this.socket.emit("join", "", resolve);
    });
  };

  notifyTo = async (data) => {
    return new Promise((resolve) => {
      this.socket.emit("notification", data, resolve);
    });
  };

  sendMessage = async (data) => {
    return new Promise((resolve) => {
      this.socket.emit("message", data, resolve);
    });
  };

  checkOnline = async (data) => {
    return new Promise((resolve) => {
      this.socket.emit("check_online", data, resolve);
    });
  };

  onMessage = (cb) => this.socket.on("message", cb);

  disconnect() {
    if (this.socket?.disconnect) this.socket.disconnect();
  }
}
