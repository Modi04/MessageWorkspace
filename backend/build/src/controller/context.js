"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = welcome;
exports.viewUserContexts = viewUserContexts;
exports.viewUserIdentities = viewUserIdentities;
exports.viewContextMembers = viewContextMembers;
const server_1 = require("../../server");
function welcome(req, res) {
    return res.json({ message: "Welcome to bezkoder application." });
}
// View user's contexts
function viewUserContexts(req, res) {
    const userId = req.query.userAddress;
    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ error: "Missing userId in query parameters" });
    }
    // Check if user exists
    const user = server_1.db.users[userId];
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    // Retrieve context details for the user
    const userContexts = user.context.map((contextId) => server_1.db.contexts[contextId]);
    return res.json({ contexts: userContexts });
}
// View user's identities
function viewUserIdentities(req, res) {
    const userId = req.query.userAddress; // 사용자 ID
    const contextId = req.query.contextId; // 컨텍스트 ID
    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ error: "Missing userId in query parameters" });
    }
    // Check if user exists
    const user = server_1.db.users[userId];
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    // Check if contextId is provided
    if (!contextId) {
        return res.status(400).json({ error: "Missing contextId in query parameters" });
    }
    // Check if user is part of the context
    if (!user.context.includes(contextId)) {
        return res.status(403).json({ error: "User does not belong to the specified context" });
    }
    // Retrieve all identities from the specified context
    const context = server_1.db.contexts[contextId];
    if (!context) {
        return res.status(404).json({ error: "Context not found" });
    }
    const userIdentities = context.members.filter((identity) => identity.address === userId);
    return res.json({ identities: userIdentities });
}
function viewContextMembers(req, res) {
    const contextId = req.query.contextId;
    // Check if userId is provided
    if (!contextId) {
        return res.status(400).json({ error: "Missing contextId in query parameters" });
    }
    // Check if user exists
    const context = server_1.db.contexts[contextId];
    if (!context) {
        return res.status(404).json({ error: "Context not found" });
    }
    return res.json({ members: context.members });
}
// Create a new context and link it to a user
// export const createContextForUser = (userId: string, context: Context) => {
//   const user = db.users[userId];
//   if (!user) {
//     return null; // User not found
//   }
//   const contextId = `context-${Date.now()}`;
//   db.contexts[contextId] = { ...context, id: contextId };
//   user.contexts.push(contextId);
//   return { contextId, ...context };
// };
// // View a specific context by ID
// export const viewContext = (contextId: string) => {
//   return db.contexts[contextId] || null;
// };
// // Get identities in a context matching user address and context members
// export const getFilteredContextIdentities = (contextId: string, userAddress: string) => {
//   // Step 1: Retrieve the context by ID
//   const context = db.contexts[contextId];
//   if (!context) {
//     return null; // Context not found
//   }
//   // Step 2: Filter identities by address directly from the identities database
//   const matchingIdentities = Object.values(db.identities).filter(
//     (identity) => identity.profileImageUrl === userAddress
//   );
//   // Step 3: Match identities with context members
//   const filteredIdentities = matchingIdentities.filter((identity) => context.members.includes(identity.id));
//   return filteredIdentities;
// };
