import { Server, Socket } from "socket.io";
import User from "../models/user.model";

export async function userSocketHandler(io: Server, socket: Socket) {
  socket.on("user_connected", async (userId: string) => {
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

    socket.emit("online_users_change", {
      isOnline: user.isOnline,
      userId: user._id,
      lastOnline: user.lastOnline,
    });

    console.log(`${user.name} is online`);
  });

  socket.on("user_disconnected", async () => {
    const user = await User.findOneAndUpdate(
      { socketId: socket.id },
      {
        isOnline: false,

        // lastOnline: Date.now()
      },
      { new: true }
    );

    if (user!?.name) {
      console.log(`${user.name} is offline`);
      socket.emit("online_users_change", {
        isOnline: user.isOnline,
        userId: user._id,
        lastOnline: user.lastOnline,
      });
    } else {
      console.log("An unknown user is offline");
    }
  });

  socket.on("disconnect", async () => {
    const user = await User.findOneAndUpdate(
      { socketId: socket.id },
      { isOnline: false },
      { new: true }
    );

    if (user!?.name) {
      console.log(`${user.name} is offline`);
      socket.emit("online_users_change", {
        isOnline: user.isOnline,
        userId: user._id,
        lastOnline: user.lastOnline,
      });
    } else {
      console.log("An unknown user is offline");
    }
  });
}
