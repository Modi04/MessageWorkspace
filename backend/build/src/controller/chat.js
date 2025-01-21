"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUserChats = viewUserChats;
const server_1 = require("../../server");
function viewUserChats(req, res) {
    const userId = req.query.userId;
    const contextId = req.query.contextId;
    // Check if userId and contextId are provided
    if (!userId) {
        return res.status(400).json({ error: "Missing userId in query parameters" });
    }
    if (!contextId) {
        return res.status(400).json({ error: "Missing contextId in query parameters" });
    }
    // Check if context exists
    const context = server_1.db.contexts[contextId];
    if (!context) {
        return res.status(404).json({ error: "Context not found" });
    }
    // Check if user is part of the context
    const isUserInContext = context.members.some((member) => member.id === userId);
    if (!isUserInContext) {
        return res.status(403).json({ error: "User is not part of the specified context" });
    }
    // Filter chats that belong to the context and include the user
    const chatsInContext = Object.values(server_1.db.chats).filter((chat) => chat.context === contextId);
    // Filter chats where the user is a participant
    const userChats = chatsInContext.filter((chat) => context.members.some((member) => member.id === userId));
    return res.json({ chats: userChats });
}
