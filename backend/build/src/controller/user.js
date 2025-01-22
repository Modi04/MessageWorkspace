"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUserProfile = viewUserProfile;
const server_1 = require("../../server");
function viewUserProfile(req, res) {
    const userId = req.query.userId;
    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ error: "Missing userId in query parameters" });
    }
    // Retrieve user from the database
    const user = server_1.db.identities[userId];
    // Check if user exists
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    // Return user profile as JSON
    return res.status(200).json(user);
}
