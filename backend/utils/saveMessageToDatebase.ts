import Message from "../models/message.model";

export interface MessageDateType {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp?: string;
}

export async function saveMessageToDatabase(messageData: MessageDateType) {
  const message = await Message.create({
    sender: messageData.senderId,
    receiver: messageData.receiverId,
    text: messageData.text,
  });

  return {
    _id: message._id,
    ...messageData,
    timestamp: message.timestamp,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
}
