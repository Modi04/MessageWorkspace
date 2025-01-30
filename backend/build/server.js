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
        FK44Dtq1pjoJQ5gUNN7WutDAND1DPMwwJTtMob8QQtjz: {
            context: ["Afg66vswxKBQvxmmXgrEA1Y9zxA2NuNWkxFEKpJAFLsL"],
        },
    };
    exports.db.contexts = {
        Afg66vswxKBQvxmmXgrEA1Y9zxA2NuNWkxFEKpJAFLsL: {
            id: "Afg66vswxKBQvxmmXgrEA1Y9zxA2NuNWkxFEKpJAFLsL",
            name: "Blockchain Enthusiasts",
            members: [
                {
                    id: "exampleIdentity1",
                    address: "0x123456789abcdef",
                    name: "Alice, Project Manager",
                    profile: "A",
                    description: "Blockchain developer and enthusiast.",
                },
                {
                    id: "exampleIdentity2",
                    address: "0xabcdef123456789",
                    name: "Bob, Engineer",
                    profile: "B",
                    description: "AI researcher focused on NLP.",
                },
                {
                    id: "exampleIdentity3",
                    address: "0xabcdef123456789",
                    name: "Charlie, Designer",
                    profile: "C",
                    description: "Creative designer specializing in UI/UX for digital platforms.",
                },
                {
                    id: "exampleIdentity4",
                    address: "0xabcdef123456789",
                    name: "Diana, Accounting Manager",
                    profile: "D",
                    description: "Expert in financial planning and budget management.",
                },
            ],
        },
        EmqW1j1ZVHALukjQa8zShf9kvkoRZquXXFQQDMYKZkx6: {
            id: "EmqW1j1ZVHALukjQa8zShf9kvkoRZquXXFQQDMYKZkx6",
            name: "Example Context2",
            members: [
                {
                    id: "exampleIdentity5",
                    address: "0x123456789abcdef",
                    name: "Ethan, Backend Guru",
                    profile: "E",
                    description: "Specialist in building scalable server-side solutions and API integrations.",
                },
                {
                    id: "exampleIdentity6",
                    address: "0x123456789abcdef",
                    name: "Fiona, Data Scientist",
                    profile: "F",
                    description: "Passionate about extracting insights from data using machine learning and statistical analysis.",
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
        "9py27fWqXuccXpzudDUhZTg6ohzAAZEceCpVLz97b1a3": {
            id: "9py27fWqXuccXpzudDUhZTg6ohzAAZEceCpVLz 97b1a3",
            address: "0x123456789abcdef",
            name: "Alice",
            profile: "A",
            description: "Blockchain developer and enthusiast.",
        },
        FK44Dtq1pjoJQ5gUNN7WutDAND1DPMwwJTtMob8QQtjz: {
            id: "FK44Dtq1pjoJQ5gUNN7WutDAND1DPMwwJTtMob8QQtjz",
            address: "0x123456789abcdef",
            name: "Bob",
            profile: "B",
            description: "AI researcher focused on NLP.",
        },
        identity3: {
            id: "identity3",
            address: "0x123456789abcdef",
            name: "SDFSDFSD",
            profile: "C",
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
