"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const context_1 = require("../controller/context");
const router = express_1.default.Router();
// View all users
router.get("/", (req, res) => {
    const users = (0, user_1.getAllUsers)();
    res.json(users);
});
// View a specific user by ID
router.get("/:userId", (req, res) => {
    const { userId } = req.params;
    const user = (0, user_1.getUserById)(userId);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: "User not found" });
    }
});
router.get("/:userId/contexts", (req, res) => {
    const { userId } = req.params;
    const user = (0, user_1.getUserById)(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const contexts = user.contexts.map((contextId) => (0, context_1.viewContext)(contextId)).filter((context) => context !== null);
    res.json(contexts);
});
// Create a new user
router.post("/", (req, res) => {
    const newUser = req.body;
    const createdUser = (0, user_1.createUser)(newUser);
    if (createdUser) {
        res.status(201).json(createdUser);
    }
    else {
        res.status(400).json({ error: "Failed to create user" });
    }
});
exports.default = router;
