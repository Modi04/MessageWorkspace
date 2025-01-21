"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing required modules
const express_1 = __importDefault(require("express"));
const server_1 = require("../../server");
const chat_1 = __importDefault(require("./chat"));
const context_1 = __importDefault(require("./context"));
const message_1 = __importDefault(require("./message"));
const user_1 = __importDefault(require("./user"));
class Routes {
    constructor(app) {
        app.use(express_1.default.json());
        // Use routers
        app.use("/users", user_1.default);
        app.use("/chats", chat_1.default);
        app.use("/contexts", context_1.default);
        app.use("/messages", message_1.default);
        // Default endpoint
        app.get("/", (_req, res) => {
            res.send({ message: "Welcome to the Chat App API!" });
        });
        app.get("/db", (_req, res) => {
            res.json(server_1.db);
        });
    }
}
exports.default = Routes;
