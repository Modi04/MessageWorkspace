import { Request, Response } from "express";

import { db } from "../../server";

// View all messages in a chat room
export function viewAllMessages(req: Request, res: Response): Response {
  const chatRoomId = req.query.chatRoomId as string;

  // Check if chatRoomId is provided
  if (!chatRoomId) {
    return res.status(400).json({ error: "Missing chatRoomId in query parameters" });
  }

  // Retrieve messages for the chat room
  const messages = Object.values(db.messages).filter((message) => message.chatRoomId === chatRoomId);

  if (messages.length === 0) {
    return res.status(404).json({ error: "No messages found for this chat room" });
  }

  return res.json({ messages });
}

// Post a new message to a chat room
export function postMessage(req: Request, res: Response): Response {
  const { chatRoomId, userId, content } = req.body;

  // Validate request body
  if (!chatRoomId || !userId || !content) {
    return res.status(400).json({
      error: "Missing required fields: chatRoomId, userId, content",
    });
  }

  // Check if chat room exists
  const chatRoom = db.chats[chatRoomId];
  if (!chatRoom) {
    return res.status(404).json({ error: "Chat room not found" });
  }

  // Check if user exists
  const user = db.users[userId];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Create a new message
  const messageId = `msg_${Date.now()}`;
  const newMessage = {
    messageId,
    chatRoomId,
    userId,
    content,
    createdAt: new Date().toISOString(),
  };

  // Save the new message
  db.messages[messageId] = newMessage;

  return res.status(201).json({ message: "Message created successfully", data: newMessage });
}
