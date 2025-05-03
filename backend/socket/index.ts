import { Server, Socket } from "socket.io";
import { userSocketHandler } from "./user.socket";
import { messageHandler } from "./message.socket";

export default function registerSocketHandlers(io: Server, socket: Socket) {
  userSocketHandler(io, socket);
  // messageHandler(io, socket);
}
