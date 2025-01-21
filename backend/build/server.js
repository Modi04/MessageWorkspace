"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initializeDatabase = initializeDatabase;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
const server = new index_1.default(app);
// In-memory database
exports.db = {
    users: {},
    chats: {},
    messages: {},
    contexts: {},
    identities: {},
};
// Database 초기화 함수
function initializeDatabase() {
    exports.db.users = {
        "0x123456789abcdef": {
            context: ["0x987654321abcdef", "0xabcdef987654321"],
        },
        "0xabcdef123456789": {
            context: ["0x987654321abcdef"],
        },
    };
    exports.db.contexts = {
        "0x987654321abcdef": {
            id: "0x987654321abcdef",
            name: "Blockchain Enthusiasts",
            members: [
                {
                    id: "identity1",
                    address: "0x123456789abcdef",
                    name: "Alice",
                    profileImageUrl: "https://example.com/profile1.jpg",
                    description: "Blockchain developer and enthusiast.",
                },
                {
                    id: "identity3",
                    address: "0xabcdef123456789",
                    name: "aasdas",
                    profileImageUrl: "https://example.com/profile2.jpg",
                    description: "AI researcher focused on NLP.",
                },
            ],
        },
        "0xabcdef987654321": {
            id: "0xabcdef987654321",
            name: "AI Researchers",
            members: [
                {
                    id: "identity1",
                    address: "0x123456789abcdef",
                    name: "Bob",
                    profileImageUrl: "https://example.com/profile2.jpg",
                    description: "AI researcher focused on NLP.",
                },
            ],
        },
    };
    exports.db.chats = {
        chatRoom1: {
            context: "0x987654321abcdef",
            chatRoomId: "identity1andidentity2",
            name: "Alice",
        },
        chatRoom2: {
            context: "0x987654321abcdef",
            chatRoomId: "identity1andidentity3",
            name: "BOB",
        },
    };
    exports.db.messages = {
        message1: {
            messageId: "message1",
            chatRoomId: "identity1andidentity2",
            userId: "0x123456789abcdef",
            content: "Hello, everyone! Excited to discuss blockchain here.",
            createdAt: new Date().toISOString(),
        },
        message2: {
            messageId: "message2",
            chatRoomId: "identity1andidentity3",
            userId: "0xabcdef123456789",
            content: "AI is evolving rapidly. Let's discuss recent advances.",
            createdAt: new Date().toISOString(),
        },
    };
    exports.db.identities = {
        identity1: {
            id: "identity1",
            address: "0x123456789abcdef",
            name: "Alice",
            profileImageUrl: "https://example.com/profile1.jpg",
            description: "Blockchain developer and enthusiast.",
        },
        identity2: {
            id: "identity2",
            address: "0x123456789abcdef",
            name: "Bob",
            profileImageUrl: "https://example.com/profile2.jpg",
            description: "AI researcher focused on NLP.",
        },
    };
}
initializeDatabase();
app.listen(8080).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
