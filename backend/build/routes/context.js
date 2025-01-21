"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const context_1 = require("../controller/context");
const server_1 = require("../server");
const router = express_1.default.Router();
// Create a new context
router.post("/", (req, res) => {
    const { userId, context } = req.body;
    const result = (0, context_1.createContextForUser)(userId, context);
    if (result) {
        res.status(201).json(result);
    }
    else {
        res.status(404).json({ error: "Failed to create context or user not found" });
    }
});
// Retrieve a specific context by ID
router.get("/:contextId", (req, res) => {
    const { contextId } = req.params;
    const context = (0, context_1.viewContext)(contextId);
    if (context) {
        res.json(context);
    }
    else {
        res.status(404).json({ error: "Context not found" });
    }
});
// Retrieve all contexts
router.get("/", (_req, res) => {
    res.json(server_1.db.contexts);
});
// Delete a specific context by ID
router.delete("/:contextId", (req, res) => {
    const { contextId } = req.params;
    if (server_1.db.contexts[contextId]) {
        delete server_1.db.contexts[contextId];
        res.status(200).json({ message: "Context deleted successfully" });
    }
    else {
        res.status(404).json({ error: "Context not found" });
    }
});
exports.default = router;
