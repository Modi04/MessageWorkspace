"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllMessages = viewAllMessages;
exports.postMessage = postMessage;
const server_1 = require("../../server");
// View all messages in a chat room
function viewAllMessages(req, res) {
    const chatRoomId = req.query.chatRoomId;
    // Check if chatRoomId is provided
    if (!chatRoomId) {
        return res.status(400).json({ error: "Missing chatRoomId in query parameters" });
    }
    // Retrieve messages for the chat room
    const messages = Object.values(server_1.db.messages).filter((message) => message.chatRoomId === chatRoomId);
    if (messages.length === 0) {
        return res.status(404).json({ error: "No messages found for this chat room" });
    }
    return res.json({ messages });
}
// Post a new message to a chat room
function postMessage(req, res) {
    const { chatRoomId, userId, content } = req.body;
    // Validate request body
    if (!chatRoomId || !userId || !content) {
        return res.status(400).json({
            error: "Missing required fields: chatRoomId, userId, content",
        });
    }
    // Check if chat room exists
    const chatRoom = server_1.db.chats[chatRoomId];
    if (!chatRoom) {
        return res.status(404).json({ error: "Chat room not found" });
    }
    // Check if user exists
    const user = server_1.db.users[userId];
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
    server_1.db.messages[messageId] = newMessage;
    return res.status(201).json({ message: "Message created successfully", data: newMessage });
}
