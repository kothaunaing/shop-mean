import { Server, Socket } from "socket.io";
import User from "../models/user.model";

export async function userSocketHandler(io: Server, socket: Socket) {
  const userId = socket.handshake.query.userId;
  console.log(userId);
  if (userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        socketId: socket.id,
        isOnline: true,
        // lastOnline: Date.now,
      },
      { new: true }
    );

    if (!user) {
      console.log("Unknown user connected: " + socket.id);
      return;
    }

    io.emit("online_users_change", {
      isOnline: user.isOnline,
      userId: user._id,
      lastOnline: user.lastOnline,
    });

    console.log(`${user.name} is online`);
  }

  socket.on("disconnect", async () => {
    const user = await User.findOneAndUpdate(
      { socketId: socket.id },
      { isOnline: false },
      { new: true }
    );

    if (user!?.name) {
      console.log(`${user.name} is offline`);
      io.emit("online_users_change", {
        isOnline: user.isOnline,
        userId: user._id,
        lastOnline: user.lastOnline,
      });
    } else {
      console.log("An unknown user is offline");
    }
  });
}
