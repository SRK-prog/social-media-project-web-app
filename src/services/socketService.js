import { io } from "socket.io-client";

export default class SocketService {
  constructor(url, options = {}) {
    this.socket = io(url, options);
  }

  joinChat() {
    this.socket.emit("joinRoom", { username: "react", room: "JavaScript" });
  }

  onMessage(cb) {
    this.socket.on("message", (msg) => {
      cb(msg);
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
