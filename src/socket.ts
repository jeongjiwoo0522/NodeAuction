import { Application } from "express";
import { Server } from "http";
import SocKetIO, { Socket } from "socket.io";

const connectSocket = (server: Server, app: Application) => {
  const io = SocKetIO(server, { path: "/socket.io" });
  app.set("io", io);
  io.on("connection", (socket: Socket) => {
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId: string = referer.split("/")[referer.split("/").length - 1];
    socket.join(roomId);
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });
}

export default connectSocket;