"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Importing required modules
const express_1 = __importDefault(require("express"));
const context_1 = __importDefault(require("./routes/context"));
const message_1 = __importDefault(require("./routes/message"));
const user_1 = __importDefault(require("./routes/user"));
// In-memory database
exports.db = {
    users: {},
    chats: {},
    messages: {},
    contexts: {},
    identities: {},
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use routers
app.use("/users", user_1.default);
app.use("/contexts", context_1.default);
app.use("/messages", message_1.default);
// Default endpoint
app.get("/", (_req, res) => {
    res.send({ message: "Welcome to the Chat App API!" });
});
// Static file service
app.use(express_1.default.static("dist"));
// Start the server
app.listen();
