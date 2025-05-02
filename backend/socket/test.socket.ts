import { Server, Socket } from "socket.io";

export default function testHandler(io: Server, socket: Socket) {
  console.log("Test handler");
}
