import { Server, Socket } from "socket.io";
import { userSocketHandler } from "./user.socket";

export default function registerSocketHandlers(io: Server, socket: Socket) {
  // testHandler(io, socket);
  userSocketHandler(io, socket);
}
