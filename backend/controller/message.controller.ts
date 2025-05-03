import { Response } from "express";
import { CustomRequest } from "../middlewares/verifyToken";
import Message from "../models/message.model";
import {
  MessageDateType,
  saveMessageToDatabase,
} from "../utils/saveMessageToDatebase";
import User from "../models/user.model";
import { io } from "../lib/socket";

export async function getAllMessages(req: CustomRequest, res: Response) {
  try {
    const { senderId, receiverId } = req.query;

    console.log(senderId, receiverId);

    if (!senderId || !receiverId) {
      res
        .status(400)
        .json({ success: false, msg: "senderId and receiverId are required" });
      return;
    }

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error: any) {
    console.log("Error in getAllMessages: " + error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
}

export async function sendMessage(req: CustomRequest, res: Response) {
  try {
    const { receiverId, senderId, text } = req.body as MessageDateType;

    const message = await saveMessageToDatabase({ receiverId, senderId, text });
    const receiver = await User.findById(message.receiverId);

    if (!receiver) {
      console.log("No receiver found, but message is saved to database");
      return;
    }

    if (receiver?.isOnline) {
      console.log(receiver.socketId);
      io.to(receiver?.socketId!).emit("new_message", message);
      console.log("user is online sent message");
    } else {
      console.log(`${receiver?.name} is offline to send message`);
    }

    res.status(201).json({ success: true, msg: "Sent a message", message });
  } catch (error: any) {
    console.log("Error in sendMessage: " + error.message);
    res.status(500).json({ msg: "Internal server error", success: false });
  }
}
