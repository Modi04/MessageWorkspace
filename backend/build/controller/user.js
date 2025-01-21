"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const server_1 = require("../server");
// Get all users
const getAllUsers = () => {
    return Object.values(server_1.db.users);
};
exports.getAllUsers = getAllUsers;
// Get a specific user by ID
const getUserById = (userId) => {
    return server_1.db.users[userId] || null;
};
exports.getUserById = getUserById;
// Create a new user
const createUser = (newUser) => {
    if (!newUser.address) {
        return null; // Invalid user data
    }
    const userId = `user-${Date.now()}`;
    server_1.db.users[userId] = Object.assign(Object.assign({}, newUser), { contexts: [] });
    return Object.assign({ userId }, newUser);
};
exports.createUser = createUser;
